/* ═══════════════════════════════════════════════════════════════════════════
   CANDIDATE · FRAME — behaviour
   One rAF per scroll tick. All layout reads happen in measure(), which runs on
   load, on resize and after fonts settle — never inside a scroll listener.
   Every value written from the loop feeds a transform, an opacity, or one
   clip-path on a small non-observed child.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var doc  = document;
  var root = doc.documentElement;
  root.classList.add('js');

  var mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  var mqWide   = matchMedia('(min-width: 720px)');

  var hero   = doc.getElementById('hero');
  var pin    = doc.getElementById('pin');
  var stage  = doc.getElementById('stage');
  var typeL  = doc.querySelector('.type--light');
  var mast   = doc.getElementById('mast');
  var nav    = doc.getElementById('nav');
  var ind    = doc.getElementById('ind');
  var burger = doc.getElementById('burger');
  var sheet  = doc.getElementById('sheet');
  var vid    = doc.getElementById('vid');
  var still  = doc.getElementById('still');
  var four   = doc.querySelector('.four');

  /* ── the two art directions carry different pictures, so they carry
        different alt text. <picture> has one alt; keep it truthful. ───────── */
  var ALT = {
    wide:   'A class folding forward in two rows down a plant-lined hall, daylight coming through the skylight roof.',
    narrow: 'A practitioner balances on one leg with palms together at the chest during an outdoor class.'
  };
  function syncAlt() { still.alt = mqWide.matches ? ALT.wide : ALT.narrow; }
  syncAlt();

  /* ── measurements ──────────────────────────────────────────────────────── */
  var M = {
    heroTop: 0, range: 1, stageH: 1, hTop: 0, hH: 0,
    ctMax: 0.07, cbMax: 0.42, rest: 0, poSafe: true
  };

  function num(v, fallback) { var n = parseFloat(v); return isNaN(n) ? fallback : n; }

  function measure() {
    var cs = getComputedStyle(stage);
    M.ctMax = num(cs.getPropertyValue('--ct-max'), 0.07);
    M.cbMax = num(cs.getPropertyValue('--cb-max'), 0.42);

    pin.style.removeProperty('--type-b');      /* read what CSS wanted, not what
                                                  the last measurement wrote */
    var hRect = hero.getBoundingClientRect();
    var sRect = stage.getBoundingClientRect();
    var tRect = typeL.getBoundingClientRect();

    M.heroTop = hRect.top + window.scrollY;
    M.range   = Math.max(1, hero.offsetHeight - pin.offsetHeight);
    M.stageH  = sRect.height;
    M.hH      = tRect.height;

    /* The panel is sized from the type it carries — never guessed — AND it is
       guaranteed to be fully eaten by the time the aperture finishes closing.
       Otherwise a black strip of empty panel survives under the picture, which
       is what the first build of this shipped. Both numbers fall out of the
       same three measurements, so no viewport can produce the strip. */
    var headroom = Math.max(24, Math.min(48, M.stageH * 0.055));
    var maxPanel = M.cbMax * M.stageH - 10;
    var below    = Math.min(sRect.bottom - tRect.bottom, maxPanel - M.hH - headroom);
    if (below < 12) { headroom = Math.max(10, headroom + below - 12); below = 12; }
    pin.style.setProperty('--type-b', Math.round(below) + 'px');
    pin.style.setProperty('--plinth-h', Math.round(M.hH + below + headroom) + 'px');
    M.hTop = M.stageH - below - M.hH;

    /* On a viewport too short for the aperture to clear the headline, fading
       the panel would strand cream type on a photograph. So the fade is only
       ARMED when the bottom rule provably gets above the headline. */
    M.poSafe = (M.stageH * (1 - M.cbMax)) < (M.hTop - 4);

    /* reduced motion rests at the resolved shape: aperture open at its widest,
       headline already in ink on the mat, second plate already tipped in. */
    M.rest = 1;
  }

  /* ── the loop ──────────────────────────────────────────────────────────── */
  function apply(p) {
    var ct = p * M.ctMax * M.stageH;
    var cb = p * M.cbMax * M.stageH;
    var edge = M.stageH - cb;                       /* the bottom rule, in stage coords */
    var cut  = Math.max(0, Math.min(M.hH, edge - M.hTop));
    /* the panel exists to carry the headline. The instant the bottom rule has
       passed the headline's top, the panel has no job left, so it goes rather
       than leaving a black remnant strip under the picture. */
    var po = M.poSafe ? Math.max(0, Math.min(1, (edge - M.hTop + 26) / 26)) : 1;

    pin.style.setProperty('--p',  p.toFixed(4));
    pin.style.setProperty('--ct', ct.toFixed(2) + 'px');
    pin.style.setProperty('--cb', cb.toFixed(2) + 'px');
    pin.style.setProperty('--hcut', cut.toFixed(2) + 'px');
    pin.style.setProperty('--plinth-o', po.toFixed(3));
  }

  var ticking = false, lastY = window.scrollY, p = 0;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (mqReduce.matches) { p = M.rest; }
      else { p = Math.max(0, Math.min(1, (y - M.heroTop) / M.range)); apply(p); }
      updateMast(y);
      lastY = y;
      ticking = false;
    });
  }

  /* ── masthead ──────────────────────────────────────────────────────────────
     Bar while it belongs to the frame; pill once it has left it. It hides on
     the way down as soon as the aperture starts to move — so nothing competes
     with the reshaping — and returns on any upward scroll. */
  var heroBottom = 0;
  function updateMast(y) {
    /* The bar is only honest while the pin is actually parked at top:0 — the
       moment the composition starts scrolling away, the bar would be ink over
       a photograph, which is the contrast trap this codebase already paid for.
       So the pill (which owns a ground) takes over exactly at the unpin. */
    mast.dataset.state = y > heroBottom ? 'pill' : 'mast';
    /* and once the frame's top rule has moved off the mat, the bar stops
       claiming to be that rule. */
    mast.dataset.flat = p > 0.04 ? '1' : '0';

    var down = y > lastY + 2;
    var up   = y < lastY - 2;
    if (mqReduce.matches) return;          /* no vanishing bar without motion */
    if (sheet.dataset.open === '1' || y < 40) { mast.dataset.hidden = '0'; }
    else if (up) { mast.dataset.hidden = '0'; }
    else if (down && p > 0.10) { mast.dataset.hidden = '1'; }
  }

  /* ── nav indicator: one rule that slides, not four that blink ───────────── */
  var links = Array.prototype.slice.call(nav.querySelectorAll('.lnk'));
  function indTo(el) {
    if (!el || !mqWide.matches) { ind.style.setProperty('--iw', 0); return; }
    ind.style.setProperty('--ix', el.offsetLeft + 'px');
    ind.style.setProperty('--iw', el.offsetWidth);
  }
  function indHome() { indTo(nav.querySelector('.lnk[aria-current]')); }
  links.forEach(function (a) {
    a.addEventListener('pointerenter', function () { indTo(a); });
    a.addEventListener('focus', function () { indTo(a); });
    a.addEventListener('blur', indHome);
  });
  nav.addEventListener('pointerleave', indHome);

  /* ── mobile sheet ──────────────────────────────────────────────────────── */
  function setSheet(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      sheet.hidden = false;
      requestAnimationFrame(function () { sheet.dataset.open = '1'; });
      var first = sheet.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    } else {
      sheet.dataset.open = '0';
      var hide = function () { if (sheet.dataset.open !== '1') sheet.hidden = true; };
      if (mqReduce.matches) hide(); else setTimeout(hide, 520);
    }
  }
  burger.addEventListener('click', function () {
    setSheet(burger.getAttribute('aria-expanded') !== 'true');
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setSheet(false); burger.focus();
    }
  });
  doc.addEventListener('click', function (e) {
    if (burger.getAttribute('aria-expanded') !== 'true') return;
    if (sheet.contains(e.target) || burger.contains(e.target)) return;
    setSheet(false);
  });

  /* ── the loop inside the frame ─────────────────────────────────────────────
     Muted, playsinline, looped, postered. Never under reduced motion, never
     on a narrow viewport (the portrait crop wants the standing figure, not a
     slice of a 16:9 hall), never on save-data. Paused off-screen. */
  function initVideo() {
    var c = navigator.connection || {};
    var thrifty = c.saveData === true || /(^|-)2g$/.test(c.effectiveType || '');
    if (mqReduce.matches || !mqWide.matches || thrifty || !vid) return;
    if (vid.src) return;
    vid.src = '/media/clips/ss-ven0096.mp4';
    var go = vid.play();
    if (go && go.then) go.then(function () { vid.dataset.on = '1'; }).catch(function () {});
    else vid.dataset.on = '1';

    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { var q = vid.play(); if (q && q.catch) q.catch(function () {}); }
        else vid.pause();
      });
    }, { threshold: 0.01 }).observe(pin);   /* pin is never clipped — see below */
  }

  /* ── reveals for the section below ─────────────────────────────────────────
     NOTE, and this one has cost this project real time: never observe an
     element that carries a clip-path clipping to zero area. Chromium computes
     the intersection rect AFTER clips, so it reports ratio 0 forever. Nothing
     observed here is clipped: not .four's items, not #pin, not .four itself. */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  doc.querySelectorAll('[data-r]').forEach(function (el) { io.observe(el); });

  if (four) {
    new IntersectionObserver(function (es) {
      mast.dataset.dark = es[0].isIntersecting ? '1' : '0';
    }, { rootMargin: '-72px 0px -85% 0px' }).observe(four);
  }

  /* ── wiring ────────────────────────────────────────────────────────────── */
  function recalc() {
    measure();
    /* the bar is honest only while the frame's top rule is still parked on the
       mat: that is the unpin point with motion, and 2px of scroll without it. */
    heroBottom = mqReduce.matches ? 2 : M.heroTop + M.range - 4;
    indHome();
    if (mqReduce.matches) { p = M.rest; apply(p); }
    else { p = Math.max(0, Math.min(1, (window.scrollY - M.heroTop) / M.range)); apply(p); }
    updateMast(window.scrollY);
  }

  var rTimer;
  addEventListener('resize', function () {
    clearTimeout(rTimer);
    rTimer = setTimeout(function () { syncAlt(); recalc(); }, 120);
  }, { passive: true });

  addEventListener('orientationchange', function () { setTimeout(recalc, 260); });

  /* the masthead needs the scroll position under reduced motion too: without
     it the bar stays parked over a photograph once the page moves. */
  addEventListener('scroll', onScroll, { passive: true });
  mqReduce.addEventListener('change', function () { location.reload(); });

  recalc();
  initVideo();
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(recalc);
  addEventListener('load', recalc);
})();
