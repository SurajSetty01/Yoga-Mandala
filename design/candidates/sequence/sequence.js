/* ═══════════════════════════════════════════════════════════════════
   SEQUENCE — hero choreography.

   Rules this file obeys, deliberately:
   · The user's scroll position is never written to except by an
     explicit click on a sequence mark. No wheel/touch interception,
     no scroll snapping, no rAF that nudges scrollY.
   · One passive scroll listener; it only raises a flag. All reads of
     scrollY and all writes happen inside one rAF. Element geometry is
     measured on load/resize only, never inside the frame loop.
   · Only transform and opacity are animated.
   · No dependency. GSAP was not needed; this is ~90 lines of maths.
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');

  const $ = (s) => document.querySelector(s);
  const hero   = $('#hero');
  const stage  = $('#stage');
  const frame  = $('#frame');
  const scrim  = $('#scrim');
  const type   = $('#type');
  const pill   = $('#pill');
  const within = $('#within');
  const idx    = $('#idx');
  const idxFill = $('#idxFill');
  const marks  = [...document.querySelectorAll('.idx__mark')];
  const labels = [...document.querySelectorAll('.idx__now span')];
  const idxNow = document.querySelector('.idx__now');
  const movs   = [...document.querySelectorAll('.mov')];
  const vids   = [...document.querySelectorAll('.mov__vid')];

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  /* smoothstep: eases both ends of every hand-off so no dissolve
     starts or stops with a visible corner. */
  const seg = (a, b, p) => { const t = clamp((p - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  /* ── capability gates ─────────────────────────────────────────────
     Three separate questions, answered separately:
       reduce   -> no choreography at all
       lite     -> choreography, but stills instead of video
       else     -> video                                            */
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqNarrow = matchMedia('(max-width: 860px)');
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const thin = !!(conn && (conn.saveData === true ||
                  /^(slow-2g|2g|3g)$/.test(conn.effectiveType || '')));
  const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');

  let reduce = mqReduce.matches;
  /* MOBILE IS STILLS, MEASURED, NOT ASSUMED.
     ss-ven0096.mp4 is 2,597,784 B. Its AVIF poster is 144,104 B — 5.5%
     of it. The three posters together are 259,914 B, a tenth of ONE
     clip. Re-encoding to 960w only reaches 710,884 B, still 2.7x the
     whole still sequence. There is no width at which the video wins on
     a thin Indian mobile connection, so the phone gets the same
     three-movement choreography built out of stills. */
  let lite = reduce || thin || !canMp4 || mqNarrow.matches;

  /* ── geometry, measured once per layout change ────────────────── */
  let heroTop = 0, range = 1, withinTop = 0, pillBottom = 0, dotY = [0, 0, 0];
  function measure() {
    const r = hero.getBoundingClientRect();
    heroTop = r.top + scrollY;
    range = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    withinTop = within.getBoundingClientRect().top + scrollY;
    pillBottom = pill.getBoundingClientRect().bottom;
    if (mqNarrow.matches) { dotY = [0, 0, 0]; }
    else {
      const c = idxNow.getBoundingClientRect();
      const mid = c.top + c.height / 2;
      dotY = marks.map((m) => { const r = m.getBoundingClientRect(); return Math.round(r.top + r.height / 2 - mid); });
    }
  }

  /* ── the timeline ─────────────────────────────────────────────────
     p is progress through the hero's STUCK range, 0 -> 1.
       0.00-0.16  the picture at rest, everything legible
       0.16-0.36  the type lifts away and the scrim opens
       0.20-0.42  FOLD dissolves into SETTLE
       0.42-0.69  the photograph alone, nothing on it. the payoff.
       0.50-0.72  SETTLE dissolves into REST
       0.69-1.00  the cream climbs; both sections move as one
     The narrow build compresses the first two phases because there is
     less scroll to spend.                                            */
  const T = () => (mqNarrow.matches
    ? { typeOut: [0.12, 0.30], d1: [0.16, 0.36], d2: [0.44, 0.64], scrim: [0.24, 0.48], zoom: 0.82 }
    : { typeOut: [0.16, 0.36], d1: [0.20, 0.42], d2: [0.50, 0.72], scrim: [0.30, 0.55], zoom: 0.86 });
  let t = T();

  let active = -1, light = null, away = null, lastY = scrollY, queued = false;

  function render() {
    queued = false;
    const y = scrollY;                       // one read
    const p = clamp((y - heroTop) / range, 0, 1);

    if (!reduce) {
      /* the room opens out as you descend — 1.10 to 1.00, the reverse
         of the usual parallax push-in, so the hall gets wider as the
         class settles. */
      frame.style.transform = 'scale(' + (1.10 - 0.10 * seg(0, t.zoom, p)).toFixed(4) + ')';

      movs[1].style.opacity = seg(t.d1[0], t.d1[1], p).toFixed(3);
      movs[2].style.opacity = seg(t.d2[0], t.d2[1], p).toFixed(3);

      const gone = seg(t.typeOut[0], t.typeOut[1], p);
      type.style.opacity = (1 - gone).toFixed(3);
      type.style.transform = 'translate3d(0,' + (-52 * gone).toFixed(1) + 'px,0)';
      type.style.pointerEvents = gone > 0.85 ? 'none' : '';
      scrim.style.opacity = (1 - 0.62 * seg(t.scrim[0], t.scrim[1], p)).toFixed(3);

      idxFill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
      const a = p < (t.d1[0] + t.d1[1]) / 2 ? 0 : p < (t.d2[0] + t.d2[1]) / 2 ? 1 : 2;
      if (a !== active) {
        active = a;
        marks.forEach((m, i) => i === a ? m.setAttribute('aria-current', 'true') : m.removeAttribute('aria-current'));
        labels.forEach((l, i) => l.classList.toggle('is-on', i === a));
        idxNow.style.transform = 'translateY(' + dotY[a] + 'px)';
        if (!lite) demand(a);
      }
      if (!lite) { if (p > 0.015) demand(1); if (p > 0.12) demand(2); pace(); }
    }

    /* the pill. It inverts the moment the cream reaches it, and lifts
       away ONLY while scrolling down through the picture — never while
       something inside it has focus (CSS :focus-within wins), never on
       the cream, and it comes back on the first upward pixel. */
    const wantLight = (withinTop - y) <= pillBottom;
    if (wantLight !== light) { light = wantLight; pill.classList.toggle('is-light', wantLight); }

    const down = y > lastY + 2, up = y < lastY - 2;
    if (down || up) lastY = y;
    const wantAway = !reduce && !wantLight && p > 0.30 && p < 0.70 && (down || (away && !up));
    if (wantAway !== away) { away = wantAway; pill.classList.toggle('is-away', wantAway); }
  }

  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(render); } };

  /* ── video: poster first, always ──────────────────────────────────
     The <img> underneath is never removed. A <video> is only faded in
     once it is genuinely running — readyState >= 3 AND currentTime has
     actually advanced past 0 — so a stall, an eviction or a blocked
     autoplay leaves a photograph on screen, never a black flash. The
     <video> is absolutely positioned over the poster at 100%/100%, so
     it can contribute exactly zero layout shift.                     */
  const asked = new Set();
  function demand(i) {
    const v = vids[i];
    if (!v || asked.has(i)) return;
    asked.add(i);
    v.src = v.dataset.src;
    v.load();
    const live = () => {
      if (v.readyState >= 3 && v.currentTime > 0) { v.classList.add('is-live'); clearInterval(poll); }
    };
    const poll = setInterval(live, 120);
    v.addEventListener('timeupdate', live);
    v.addEventListener('canplay', () => { const q = v.play(); if (q) q.catch(() => {}); }, { once: true });
    v.addEventListener('error', () => { clearInterval(poll); v.classList.remove('is-live'); });
    const q = v.play(); if (q) q.catch(() => {});
  }
  /* Only the movement you can actually see is allowed to decode.
     A layer is dead once ANY layer above it is fully opaque — at the end
     of the sequence all three are stacked at opacity 1, and decoding
     three 1080p streams to show one of them is just heat. */
  const opOf = (i) => (i === 0 ? 1 : +(movs[i].style.opacity || 0));
  function pace() {
    for (let i = 0; i < vids.length; i++) {
      const v = vids[i];
      if (!v.src) continue;
      let vis = opOf(i) > 0.02;
      for (let j = i + 1; j < movs.length; j++) if (opOf(j) >= 0.995) { vis = false; break; }
      if (vis && onStage) { if (v.paused) { const q = v.play(); if (q) q.catch(() => {}); } }
      /* never pause a clip that has not yet PROVEN it plays: is-live needs
         currentTime to advance past 0, and a clip parked at 0 can never
         earn it — it would sit behind its poster for the whole page. */
      else if (!v.paused && v.classList.contains('is-live')) v.pause();
    }
  }
  let onStage = true;
  new IntersectionObserver(([e]) => {
    onStage = e.isIntersecting;
    if (!onStage) vids.forEach((v) => { if (v.src && !v.paused) v.pause(); });
    else if (!lite && !reduce) pace();
  }, { threshold: 0 }).observe(stage);
  addEventListener('visibilitychange', () => {
    if (document.hidden) vids.forEach((v) => { if (v.src && !v.paused) v.pause(); });
    else onScroll();
  });

  /* ── the sequence marks: user-initiated scrolling, never hijacked ── */
  marks.forEach((m) => m.addEventListener('click', () => {
    const to = [0.03, 0.34, 0.64][+m.dataset.go];
    scrollTo({ top: Math.round(heroTop + range * to), behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ── the mobile sheet ─────────────────────────────────────────── */
  const btn = $('#menuBtn'), sheet = $('#sheet');
  const setSheet = (open) => {
    sheet.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) sheet.querySelector('a').focus();
    else btn.focus();
  };
  btn.addEventListener('click', () => setSheet(sheet.hidden));
  sheet.addEventListener('click', (e) => { if (e.target.tagName === 'A') setSheet(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) setSheet(false); });

  /* ── section-02 reveals (the shared primitive) ────────────────── */
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-r]').forEach((el) => io.observe(el));

  /* ── boot / re-boot ───────────────────────────────────────────── */
  function apply() {
    reduce = mqReduce.matches;
    lite = reduce || thin || !canMp4 || mqNarrow.matches;
    t = T();
    doc.classList.toggle('is-static', reduce);
    if (reduce || lite) {
      vids.forEach((v) => { if (!v.paused) v.pause(); });
    }
    if (reduce) {
      frame.style.transform = ''; type.style.cssText = ''; scrim.style.opacity = '';
      movs[1].style.opacity = '0'; movs[2].style.opacity = '0';
      pill.classList.remove('is-away');
      idxNow.style.transform = '';
    } else if (!lite) {
      demand(0);
    }
    measure(); render();
  }

  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { t = T(); measure(); render(); }, 140); }, { passive: true });
  addEventListener('orientationchange', () => setTimeout(() => { measure(); render(); }, 260));
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('load', () => { measure(); render(); });
  mqReduce.addEventListener('change', apply);
  mqNarrow.addEventListener('change', apply);
  document.fonts && document.fonts.ready.then(() => { measure(); render(); });

  apply();
})();
