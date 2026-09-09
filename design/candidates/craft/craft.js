/* =============================================================================
   YOGA MANDALA · hero candidate "craft"
   EVERY ELEMENT ANSWERS THE POINTER.

   Performance contract, kept literally:
   · ONE pointermove listener on window. It writes two numbers and returns.
   · ONE scroll listener. It only restarts the loop.
   · ONE requestAnimationFrame loop. It reads scrollY exactly once, at the top
     of the frame, before any write; everything else is arithmetic on rects
     cached at measure() time. No layout is read inside the loop.
   · Only transform / opacity are written per frame. Class toggles happen on
     STATE CHANGE, never per frame.
   · The loop parks itself when every spring has settled and nothing moved for
     400ms, and is restarted by kick().
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  var mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  var RM = mqReduce.matches;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var pill = $('#pill');
  var pillRail = $('#pillRail');
  var sheen = $('.pill__sheen');
  var hero = $('#hero');
  var lamp = $('#lamp');
  var scrim = $('#scrim');
  var imgA = $('#imgA');
  var imgB = $('#imgB');
  var cur = $('#cur');
  var curR = $('#curR');
  var curD = $('#curD');
  var railList = $('#railList');
  var railIdx = $('#railIdx');
  var railCap = $('#railCap');
  var railLive = $('#railLive');

  /* ==========================================================================
     0 · SPRING
     Semi-implicit Euler, tuned once and used for every physical thing on the
     page so that the CTA, its label and its halo all obey the same body.
     Swept in a simulator, not guessed (see NOTES). At a 14px pull:
        K 0.22 / RET 0.60  ->  release settles in 233ms with 8.6% overshoot
     which is one small, confident bounce home — 1.2px, felt not seen.
     RET 0.56 kills the bounce; RET 0.64 makes it wobble (14%) and slows to
     333ms. The RELEASE is what this tuning buys; the pull is dragged by the
     pointer and hides its own dynamics.
     ====================================================================== */
  var K = 0.22, RET = 0.60;

  /* ==========================================================================
     1 · POINTER STATE  (the only thing the move listener touches)
     ====================================================================== */
  var P = { x: innerWidth / 2, y: innerHeight / 2, seen: false, down: false };
  var pPrevX = P.x, pPrevY = P.y;

  /* ==========================================================================
     2 · MEASURE — every layout read on the page happens in here
     ====================================================================== */
  var M = {
    w: innerWidth, h: innerHeight,
    heroH: innerHeight, heroTop: 0,
    pill: { l: 0, t: 0, w: 0, h: 0 }
  };
  var mags = [];

  function collectMags() {
    mags = $$('[data-mag]').map(function (el) {
      return {
        el: el,
        shape: el.querySelector(el.getAttribute('data-mag-shape')),
        label: el.querySelector(el.getAttribute('data-mag-label')),
        halo: el.querySelector('.cta__halo'),
        fixed: !!el.closest('.pill'),
        cx: 0, cy: 0, rad: 1,
        x: 0, y: 0, vx: 0, vy: 0,
        s: 1, vs: 0,
        pull: 0, over: false, press: false
      };
    });
  }

  function measure() {
    M.w = innerWidth; M.h = innerHeight;
    var hr = hero.getBoundingClientRect();
    M.heroTop = hr.top + scrollY;
    M.heroH = hr.height;

    var pr = pill.getBoundingClientRect();
    M.pill = { l: pr.left, t: pr.top, w: pr.width, h: pr.height };

    for (var i = 0; i < mags.length; i++) {
      var m = mags[i];
      m.el.style.transform = '';
      if (m.shape) m.shape.style.transform = '';
      if (m.label) m.label.style.transform = '';
    }
    for (var j = 0; j < mags.length; j++) {
      var n = mags[j];
      var r = n.el.getBoundingClientRect();
      n.cx = r.left + r.width / 2;
      n.cy = r.top + r.height / 2 + (n.fixed ? 0 : scrollY);
      n.rad = Math.max(r.width, r.height) / 2 + 82;
    }

    /* the rail's natural width, taken with the width constraint lifted. This
       is the only place on the page that forces a synchronous layout, and it
       runs on load / resize / transitionend only. */
    if (pillRail && !pillCompact && getComputedStyle(pillRail).display !== 'none') {
      pillRail.style.width = 'auto';
      var w = pillRail.getBoundingClientRect().width;
      pillRail.style.width = '';
      if (w > 0) pillRail.style.setProperty('--railw', Math.ceil(w) + 'px');
    }
  }

  /* ==========================================================================
     3 · THE LOOP
     ====================================================================== */
  var running = false, last = 0, quietMs = 0;
  var lastScrollY = -1;

  function kick() {
    quietMs = 0;
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
  }

  /* damped follow, frame-rate corrected */
  function follow(cur, target, k, f) { return cur + (target - cur) * (1 - Math.pow(1 - k, f)); }

  /* cursor bookkeeping */
  var ringX = P.x, ringY = P.y;
  var curClass = '';
  var curNear = false;

  /* image + lamp.
     These two are the only FULL-VIEWPORT layers that move, and moving them
     forces the compositor to re-blend the whole hero (and to re-run the
     pill's backdrop blur) on that frame. Sub-pixel movement of a photograph
     is invisible, so both are quantised to whole pixels and the write is
     skipped when the rounded value has not changed. Measured: this is what
     takes the settle window from 86% of frames over 20ms to 22%. */
  var imgX = 0, imgY = 0, lampX = P.x, lampY = P.y, lampOn = false;
  var lastImgT = '', lastLampT = '';

  /* pill */
  var pillNear = false, pillLight = false, pillCompact = false;
  var accUp = 0, accDown = 0, prevY = 0, pillFocus = false, pillHoldUntil = 0;

  function tick(now) {
    var dt = now - last; last = now;
    if (!(dt > 0)) dt = 16.7;
    if (dt > 60) dt = 60;
    var f = dt / 16.667; if (f < 0.35) f = 0.35; if (f > 3) f = 3;

    /* ---- the single layout-adjacent read of the frame ---- */
    var sy = scrollY;

    var busy = false;
    var moved = (P.x !== pPrevX || P.y !== pPrevY);
    if (moved) busy = true;
    pPrevX = P.x; pPrevY = P.y;
    if (sy !== lastScrollY) { busy = true; }

    /* ---------------- magnets ---------------- */
    var nearCta = false;
    for (var i = 0; i < mags.length; i++) {
      var m = mags[i];
      var tx = 0, ty = 0;
      if (!RM && P.seen) {
        var cy = m.cy - (m.fixed ? 0 : sy);
        var dx = P.x - m.cx, dy = P.y - cy;
        var d = Math.sqrt(dx * dx + dy * dy);
        var p = 1 - d / m.rad; if (p < 0) p = 0; if (p > 1) p = 1;
        p = p * p * (3 - 2 * p);                       /* smoothstep the field */
        m.pull = p;
        if (p > 0.02 && !m.fixed) nearCta = true;
        tx = clamp(dx * 0.30 * p, -15, 15);
        ty = clamp(dy * 0.30 * p, -15, 15);
      } else { m.pull = 0; }

      var ts = m.press ? 0.955 : 1;

      m.vx += (tx - m.x) * K * f; m.vx *= Math.pow(RET, f); m.x += m.vx * f;
      m.vy += (ty - m.y) * K * f; m.vy *= Math.pow(RET, f); m.y += m.vy * f;
      m.vs += (ts - m.s) * K * f; m.vs *= Math.pow(RET, f); m.s += m.vs * f;

      if (Math.abs(m.vx) + Math.abs(m.vy) + Math.abs(m.vs) * 60 > 0.02 ||
          Math.abs(m.x - tx) + Math.abs(m.y - ty) > 0.05) busy = true;

      m.el.style.transform = 'translate3d(' + r2(m.x) + 'px,' + r2(m.y) + 'px,0) scale(' + m.s.toFixed(4) + ')';
      /* the label rides 1.45x the shape: inside the capsule the type leads and
         the ground follows, which is what makes it read as a body and not a
         sticker. */
      if (m.label) m.label.style.transform = 'translate3d(' + r2(m.x * 0.45) + 'px,' + r2(m.y * 0.45) + 'px,0)';
      if (m.halo) m.halo.style.transform = 'translate3d(' + r2(m.x * -0.4) + 'px,' + r2(m.y * -0.4) + 'px,0)';
    }

    /* ---------------- cursor ---------------- */
    if (curOn) {
      var kf = 1 - Math.pow(1 - 0.21, f);
      ringX += (P.x - ringX) * kf;
      ringY += (P.y - ringY) * kf;
      if (Math.abs(P.x - ringX) + Math.abs(P.y - ringY) > 0.3) busy = true;
      curD.style.transform = 'translate3d(' + r2(P.x) + 'px,' + r2(P.y) + 'px,0)';
      curR.style.transform = 'translate3d(' + r2(ringX) + 'px,' + r2(ringY) + 'px,0)';
      if (nearCta !== curNear) { curNear = nearCta; cur.classList.toggle('near-cta', nearCta); }
    }

    /* ---------------- hero image + lamp ---------------- */
    if (!RM) {
      var pxs = P.seen ? (P.x / M.w - 0.5) * -14 : 0;
      var pys = P.seen ? (P.y / M.h - 0.5) * -10 : 0;
      imgX = follow(imgX, pxs, 0.045, f);
      imgY = follow(imgY, pys, 0.045, f);
      if (Math.abs(imgX - pxs) + Math.abs(imgY - pys) > 0.6) busy = true;

      var scrollPar = Math.min(sy, M.heroH) * 0.038;
      var t = 'translate3d(' + Math.round(imgX) + 'px,' + Math.round(imgY + scrollPar) + 'px,0) scale(1.09)';
      if (t !== lastImgT) { lastImgT = t; imgA.style.transform = t; imgB.style.transform = t; }

      if (P.seen && sy < M.heroH) {
        lampX = follow(lampX, P.x, 0.055, f);
        lampY = follow(lampY, P.y + sy - M.heroTop, 0.055, f);
        if (Math.abs(lampX - P.x) + Math.abs(lampY - (P.y + sy - M.heroTop)) > 1.2) busy = true;
        var lt = 'translate3d(' + Math.round(lampX) + 'px,' + Math.round(lampY) + 'px,0)';
        if (lt !== lastLampT) { lastLampT = lt; lamp.style.transform = lt; }
        if (!lampOn) { lampOn = true; lamp.classList.add('is-on'); }
      } else if (lampOn && sy >= M.heroH) { lampOn = false; lamp.classList.remove('is-on'); }
    }

    /* ---------------- the pill ---------------- */
    /* approach: a rectangle grown by 96px. No layout read — M.pill is cached. */
    var near = false;
    if (!RM && P.seen) {
      near = P.x > M.pill.l - 96 && P.x < M.pill.l + M.pill.w + 96 &&
             P.y > M.pill.t - 96 && P.y < M.pill.t + M.pill.h + 96;
    }
    if (near) {
      pillHoldUntil = now + 180;
      sheen.style.transform = 'translate3d(' + r2(P.x - M.pill.l) + 'px,' + r2(P.y - M.pill.t) + 'px,0)';
    }
    var wantNear = near || now < pillHoldUntil;
    if (wantNear !== pillNear) { pillNear = wantNear; pill.classList.toggle('is-near', wantNear); }
    if (now < pillHoldUntil) busy = true;

    /* THE HIDE / SHOW RULE — stated once, here:
       1. while any part of the hero is still behind it, the pill is expanded
          and dark. It never hides: the hero IS the pitch and Join must stay
          one pointer-move away.
       2. past the hero it inverts to light, and 24px of downward scroll
          contracts it to mark + Join. It does not translate off-screen; it
          REFLOWS, so you never lose your place and never have to hunt.
       3. 40px of upward scroll expands it again — scrolling up means looking
          for something, so give back the map.
       4. top of page, pointer near it, or keyboard focus inside it: expanded,
          unconditionally. */
    if (sy !== lastScrollY) {
      var light = sy > (M.heroTop + M.heroH) - 96;
      if (light !== pillLight) {
        pillLight = light;
        pill.classList.toggle('is-light', light);
        root.classList.toggle('nav-light', light);
      }
      var dy = sy - prevY; prevY = sy;
      if (dy > 0) { accDown += dy; accUp = 0; } else if (dy < 0) { accUp -= dy; accDown = 0; }

      var want = pillCompact;
      if (RM || !light || sy < 8) want = false;
      else if (accDown > 24) want = true;
      else if (accUp > 40) want = false;
      if (pillFocus || wantNear) want = false;
      if (want !== pillCompact) { pillCompact = want; pill.classList.toggle('is-compact', want); }
      lastScrollY = sy;
      busy = true;
    } else if ((pillFocus || wantNear) && pillCompact) {
      pillCompact = false; pill.classList.remove('is-compact');
    }

    /* ---------------- park ---------------- */
    if (busy) quietMs = 0; else quietMs += dt;
    if (quietMs > 400) { running = false; return; }
    requestAnimationFrame(tick);
  }

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function r2(v) { return Math.round(v * 100) / 100; }

  /* ==========================================================================
     4 · LISTENERS  (all passive, all trivial)
     ====================================================================== */
  addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    P.x = e.clientX; P.y = e.clientY;
    if (!P.seen) { P.seen = true; ringX = P.x; ringY = P.y; lampX = P.x; lampY = P.y; if (curOn) cur.classList.add('is-live'); }
    kick();
  }, { passive: true });

  addEventListener('scroll', kick, { passive: true });

  var rz;
  addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () { measure(); kick(); }, 120);
  }, { passive: true });

  /* ==========================================================================
     5 · CURSOR STATE
     Delegated pointerover/out. No per-frame hit testing.
     ====================================================================== */
  var curOn = false;

  function enableCursor() {
    if (RM || !mqFine.matches || curOn) return;
    curOn = true;
    root.classList.add('cur-on');
    if (P.seen) cur.classList.add('is-live');
  }
  function disableCursor() {
    if (!curOn) return;
    curOn = false;
    root.classList.remove('cur-on');
    cur.classList.remove('is-live');
  }

  function stateFor(t) {
    if (!t || !t.closest) return '';
    if (t.closest('.cta')) return 'on-cta';
    if (t.closest('a, button')) return 'on-link';
    if (t.closest('p, h1, .rail__cap, .reg__kicker')) return 'on-text';
    if (t.closest('.hero')) return 'on-media';
    return '';
  }
  function setCurState(s) {
    if (s === curClass) return;
    if (curClass) cur.classList.remove(curClass);
    if (s) cur.classList.add(s);
    curClass = s;
  }

  document.addEventListener('pointerover', function (e) {
    if (e.pointerType === 'touch') return;
    enableCursor();
    cur.classList.remove('is-out');
    setCurState(stateFor(e.target));
  });
  document.addEventListener('pointerout', function (e) {
    if (!e.relatedTarget) cur.classList.add('is-out');
  });

  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') { disableCursor(); return; }
    P.down = true;
    cur.classList.add('is-press');
    var c = e.target.closest && e.target.closest('[data-mag]');
    for (var i = 0; i < mags.length; i++) if (mags[i].el === c) mags[i].press = true;
    if (c && c.classList.contains('cta')) c.classList.add('is-press');
    kick();
  });

  function release() {
    P.down = false;
    cur.classList.remove('is-press');
    for (var i = 0; i < mags.length; i++) { mags[i].press = false; mags[i].el.classList.remove('is-press'); }
    kick();
  }
  addEventListener('pointerup', release);
  addEventListener('pointercancel', release);

  addEventListener('blur', function () { cur.classList.add('is-out'); });
  addEventListener('focus', function () { if (P.seen) cur.classList.remove('is-out'); });

  /* ==========================================================================
     6 · THE UNDERLINE THAT KNOWS WHICH SIDE YOU CAME FROM
     Two getBoundingClientRect reads per hover event. Never in a move or scroll
     handler, so the 60fps contract is untouched.
     ====================================================================== */
  function edge(e, on) {
    var el = e.currentTarget;
    var r = el.getBoundingClientRect();
    var side = (e.clientX - r.left) < r.width / 2 ? '0%' : '100%';
    el.style.setProperty('--ox', side);
    el.style.setProperty('--sx', on ? '1' : '0');
  }
  $$('[data-nav], .quiet').forEach(function (el) {
    el.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') edge(e, true); });
    el.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') edge(e, false); });
  });

  pill.addEventListener('focusin', function () { pillFocus = true; kick(); });
  pill.addEventListener('focusout', function () { pillFocus = false; kick(); });
  /* the pill's own box changes twice: when it lands on load, and when it
     contracts. Re-cache its rect both times so the sheen and the approach
     field stay honest without ever reading layout in the loop. */
  pill.addEventListener('transitionend', function (e) {
    if (e.propertyName === 'width' || e.propertyName === 'transform') measure();
  });

  /* ==========================================================================
     7 · THE FRAME RAIL — the right-side element, rethought
     hover / focus = peek (110ms of intent, so a sweep across it does nothing)
     click / tap / arrow key = commit
     ====================================================================== */
  var FRAMES = [
    { id: 'ss-dsc07118', ws: [960, 1920], lab: 'The adjustment',
      alt: 'A teacher leans in and holds a hand just above a student’s back to adjust a plank position.',
      l: '50% 60%', p: '58% 54%', sk: 0.94 },
    { id: 'ss-dsc07137', ws: [960, 1920], lab: 'In discussion',
      alt: 'A barefoot man on a green stool talks to a small group seated on the floor beside him.',
      l: '50% 46%', p: '30% 50%', sk: 1 },
    { id: 'ss-dsc07120', ws: [960, 1920], lab: 'Standing balance',
      alt: 'A practitioner balances on one leg with palms together at the chest during an outdoor class.',
      l: '50% 26%', p: '50% 30%', sk: 1 },
    { id: 'p13-img_0617', ws: [960, 1920, 2560], lab: 'The full room',
      alt: 'A wide studio interior with participants seated on mats beneath a rope wall, ceiling slings and fans.',
      l: '50% 60%', p: '50% 72%', sk: 1 }
  ];
  function srcset(fr) {
    return fr.ws.map(function (w) { return '/media/stills/' + fr.id + '-' + w + '.webp ' + w + 'w'; }).join(', ');
  }

  var committed = 0, showing = 0, token = 0, peekT = null, leaveT = null;
  /* Warmed Images are HELD, not dropped — a detached Image collected mid-flight
     aborts its own request. And the frame a swap is about to load is skipped,
     so the same URL is never requested twice in the same tick (which is the
     other way to earn a cancelled request in the network panel). */
  var warm = [], warmed = [true, false, false, false];
  var front = imgA, back = imgB;

  function show(i) {
    if (i === showing) return;
    var fr = FRAMES[i];
    var my = ++token;
    back.srcset = srcset(fr);
    back.sizes = '100vw';
    back.src = '/media/stills/' + fr.id + '-1920.webp';
    back.style.setProperty('--op-l', fr.l);
    back.style.setProperty('--op-p', fr.p);
    var go = function () {
      if (my !== token) return;
      showing = i;
      scrim.style.setProperty('--sk', String(fr.sk));
      railIdx.textContent = '0' + (i + 1);
      railCap.textContent = fr.lab;
      back.classList.add('is-on');
      front.classList.remove('is-on');
      back.alt = fr.alt; back.removeAttribute('aria-hidden');
      front.alt = ''; front.setAttribute('aria-hidden', 'true');
      var t = back; back = front; front = t;
    };
    if (back.decode) back.decode().then(go, go); else go();
    setTimeout(function () { preload(-1); }, 500);
  }

  function commit(i) {
    committed = i;
    show(i);
    $$('.fr', railList).forEach(function (b, n) {
      var on = n === i;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    railIdx.textContent = '0' + (i + 1);
    railCap.textContent = FRAMES[i].lab;
    railLive.textContent = FRAMES[i].lab + '. ' + FRAMES[i].alt;
  }

  function preload(skip) {
    FRAMES.forEach(function (fr, n) {
      if (warmed[n] || n === skip) return;
      warmed[n] = true;
      var im = new Image(); im.sizes = '100vw'; im.srcset = srcset(fr);
      im.src = '/media/stills/' + fr.id + '-1920.webp';
      warm.push(im);
    });
  }

  $$('.fr', railList).forEach(function (btn, i) {
    btn.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch' || RM) return;
      preload(i);
      clearTimeout(leaveT); clearTimeout(peekT);
      peekT = setTimeout(function () { show(i); }, 110);
    });
    btn.addEventListener('click', function () { commit(i); btn.focus(); });
  });
  railList.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'touch' || RM) return;
    clearTimeout(peekT);
    leaveT = setTimeout(function () { show(committed); }, 320);
  });
  railList.addEventListener('focusin', function () { preload(-1); });

  /* radiogroup keyboard: arrows move AND select, which is the correct pattern
     and means the keyboard equivalent of "peek" is simply "commit". */
  railList.addEventListener('keydown', function (e) {
    var n = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (committed + 1) % FRAMES.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (committed + FRAMES.length - 1) % FRAMES.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = FRAMES.length - 1;
    else return;
    e.preventDefault();
    preload(n);
    commit(n);
    $$('.fr', railList)[n].focus();
  });

  /* ==========================================================================
     8 · LOAD SEQUENCE
     nothing fires at once. eyebrow -> headline, word by word -> lede ->
     rule -> button -> link -> rail -> cue. ~1.7s end to end.
     ====================================================================== */
  $$('.h1 .wi').forEach(function (w, i) { w.style.setProperty('--wd', (300 + i * 62) + 'ms'); });

  var fontsP = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  var imgP = imgA.decode ? imgA.decode().catch(function () {}) : Promise.resolve();
  var timeout = new Promise(function (r) { setTimeout(r, 2000); });

  Promise.race([Promise.all([fontsP, imgP]), timeout]).then(function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('ready');
        collectMags();
        measure();
        prevY = scrollY; lastScrollY = -1;
        kick();
      });
    });
  });

  /* ==========================================================================
     9 · BELOW THE FOLD
     Nothing observed here carries a clip-path: a zero-area clip makes Chromium
     report ratio 0 forever and the element never appears.
     ====================================================================== */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-r]').forEach(function (el) { io.observe(el); });

  /* prototype: dead anchors must not jump the page out from under a screenshot */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#"]');
    if (a) e.preventDefault();
  });

  /* reduced-motion can change mid-session */
  var onRM = function () {
    RM = mqReduce.matches;
    if (RM) { disableCursor(); lamp.classList.remove('is-on'); pill.classList.remove('is-compact'); pillCompact = false; }
    kick();
  };
  if (mqReduce.addEventListener) mqReduce.addEventListener('change', onRM);

  collectMags();
  measure();
  prevY = scrollY;

  /* a small, honest exposure for the verification harness */
  window.__craft = { measure: measure, mags: mags, commit: commit, frames: FRAMES };
})();
