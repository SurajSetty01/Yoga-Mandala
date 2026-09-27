'use client';

import { useEffect } from 'react';

/**
 * §04's only client code. The section is complete without it: the stylesheet's default shows
 * the first hold in the frame, and the row of eight closes the section.
 *
 * THREE THINGS, all optional, and only when motion is allowed and the viewport is tall enough
 * to hold the stage (≥ 600px):
 *
 * 1. THE SWAP. `sx4--live` pins the frame and gives each practice its own stretch of scroll.
 *    The practice nearest the reading line is current, and its photograph is the one on show.
 *    A change is a short timed fade: the arriving photograph fades in over the one it
 *    replaces, which stays whole beneath it until it is covered and is then hidden. The fade
 *    runs on the clock, not on the scroll, so no scroll position ever holds two photographs.
 *
 * 2. THE LOOPS. A layer that carries `data-clip` gets a muted, looping <video> laid over its
 *    own first frame when the reader comes within one practice of it, plays while it is the
 *    frame on show, wraps back to its first frame at `data-hold` seconds (fading to the still
 *    beneath and back, so the seam is the still itself), and is released (src dropped,
 *    element removed) when the reader moves on or leaves the section. No <video> carries a
 *    poster attribute: the <img> beneath it is its still.
 *
 * 3. THE ROW ARRIVES. When the closing row first comes into view its eight photographs arrive
 *    left to right, in the order they were taken. Once in, they stay in.
 *
 * The rules it keeps, each learned on this site by breaking it:
 *   · one passive scroll listener that only raises a flag; every read and write inside one rAF
 *   · geometry measured on load, resize, font load and ResizeObserver, never in the frame
 *   · no wheel or touch interception, ever
 */
export function Sx4Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx4-sec');
    if (!root) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const tall = matchMedia('(min-height: 600px)');
    const wide = matchMedia('(min-width: 900px)');

    const layers = [...root.querySelectorAll<HTMLElement>('.sx4-frame .sx4-layer')];
    const steps = [...root.querySelectorAll<HTMLElement>('.sx4-step')];
    const caps = [...root.querySelectorAll<HTMLElement>('.sx4-cap__v')];
    type Loop = { layer: HTMLElement; src: string; hold: number; v: HTMLVideoElement | null; wrapping: boolean };
    const loops: Loop[] = layers.flatMap((el) =>
      el.dataset.clip ? [{ layer: el, src: el.dataset.clip, hold: Number(el.dataset.hold) || 8, v: null, wrapping: false }] : [],
    );
    const stage = root.querySelector<HTMLElement>('.sx4-stage');
    const seq = root.querySelector<HTMLElement>('.sx4-seq');
    const N = layers.length;
    if (N < 2 || steps.length !== N || caps.length !== N || !stage || !seq) return;

    /** how long the arriving photograph takes to cover the one it replaces; matches the CSS */
    const FADE = 450;

    let live = false;
    let queued = false;
    let centres: number[] = [];
    let line = 0;
    let top = 0;
    let bottom = 0;
    let cur = -1;
    let settle = 0;

    /* ── the loops ─────────────────────────────────────────────────────────── */
    function attach(L: Loop) {
      const v = document.createElement('video');
      v.className = 'sx4-loop';
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('loop', '');
      v.setAttribute('aria-hidden', 'true');
      v.tabIndex = -1;
      v.addEventListener('playing', () => {
        if (!L.wrapping) v.classList.add('sx4-loop--on');
      });
      v.addEventListener('timeupdate', () => {
        if (L.wrapping || v.currentTime < L.hold) return;
        L.wrapping = true;
        v.classList.remove('sx4-loop--on');
        window.setTimeout(() => {
          if (L.v === v) v.currentTime = 0;
        }, 650);
      });
      v.addEventListener('seeked', () => {
        if (!L.wrapping) return;
        L.wrapping = false;
        if (!v.paused) v.classList.add('sx4-loop--on');
      });
      v.src = L.src;
      L.layer.appendChild(v);
      L.v = v;
    }
    function release(L: Loop) {
      const v = L.v;
      if (!v) return;
      L.v = null;
      L.wrapping = false;
      v.pause();
      v.removeAttribute('src');
      v.load();
      v.remove();
    }
    const releaseAll = () => loops.forEach(release);
    function steer(k: number) {
      loops.forEach((L) => {
        const d = Math.abs(layers.indexOf(L.layer) - k);
        if (d > 1) return release(L);
        if (!L.v) attach(L);
        const v = L.v;
        if (!v) return;
        if (d === 0) {
          if (v.paused) v.play().catch(() => {});
        } else if (!v.paused) v.pause();
      });
    }

    function measure() {
      const y = scrollY;
      centres = steps.map((s) => {
        const r = s.getBoundingClientRect();
        return r.top + y + r.height / 2;
      });
      const rr = root!.getBoundingClientRect();
      top = rr.top + y;
      bottom = rr.bottom + y;
      /* the line a practice has to cross to become current: the middle of the screen when the
         frame stands beside the words, the middle of the space under the band when it pins
         above them */
      line = wide.matches ? innerHeight * 0.5 : (stage!.offsetHeight + innerHeight) / 2;
    }

    /* ── the swap ──────────────────────────────────────────────────────────── */
    const hide = (el: HTMLElement) => {
      el.style.zIndex = '';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
    };
    function show(k: number) {
      if (k === cur) return;
      const from = cur;
      cur = k;
      window.clearTimeout(settle);
      layers.forEach((el, i) => {
        if (i === k) {
          el.style.zIndex = '2';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        } else if (i === from) {
          el.style.zIndex = '1'; // whole, beneath the one arriving, until it is covered
        } else hide(el);
      });
      settle = window.setTimeout(() => layers.forEach((el, i) => i !== cur && hide(el)), FADE + 60);
      steps.forEach((el, i) => el.toggleAttribute('data-on', i === k));
      caps.forEach((el, i) => el.toggleAttribute('data-on', i === k));
    }
    /** back to the stylesheet's own state: the first hold, nothing marked */
    function reset() {
      window.clearTimeout(settle);
      cur = -1;
      for (const el of layers) {
        el.style.zIndex = '';
        el.style.opacity = '';
        el.style.visibility = '';
      }
      steps.forEach((el) => el.removeAttribute('data-on'));
      caps.forEach((el, i) => el.toggleAttribute('data-on', i === 0));
    }

    function frame() {
      queued = false;
      if (!live) return;
      const y = scrollY;
      const vh = innerHeight;
      if (y + vh < top - vh || y > bottom + vh) return releaseAll(); // far away: nothing to do

      /* the current practice is the one whose centre is nearest the reading line */
      const m = y + line;
      let k = 0;
      for (let i = 1; i < N; i++) {
        const a = centres[i - 1] ?? 0;
        const b = centres[i] ?? 0;
        if (m >= (a + b) / 2) k = i;
      }
      /* the loops play only while the frame is actually on screen (read before any write) */
      const sr = stage!.getBoundingClientRect();
      show(k);
      if (sr.bottom < 0 || sr.top > vh) releaseAll();
      else steer(k);
    }

    /* ── the row arrives ─────────────────────────────────────────────────────── */
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (es, obs) => {
              if (!es.some((e) => e.isIntersecting)) return;
              seq.setAttribute('data-in', '');
              obs.disconnect();
            },
            { threshold: 0.2 },
          )
        : null;

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const remeasure = () => {
      if (!live) return;
      measure();
      onScroll();
    };

    function enable() {
      if (live) return;
      /* a row already on screen (or already passed) does not hide itself to arrive again */
      if (!io || seq!.getBoundingClientRect().top < innerHeight) seq!.setAttribute('data-in', '');
      else io.observe(seq!);
      live = true;
      root!.classList.add('sx4--live');
      measure();
      frame();
    }
    function disable() {
      releaseAll();
      io?.disconnect();
      seq!.setAttribute('data-in', '');
      if (live) {
        live = false;
        root!.classList.remove('sx4--live');
      }
      reset();
    }
    const decide = () => (!reduce.matches && tall.matches ? enable() : disable());

    decide();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', remeasure);
    addEventListener('load', remeasure);
    reduce.addEventListener('change', decide);
    tall.addEventListener('change', decide);
    wide.addEventListener('change', remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    ro?.observe(root);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', remeasure);
      removeEventListener('load', remeasure);
      reduce.removeEventListener('change', decide);
      tall.removeEventListener('change', decide);
      wide.removeEventListener('change', remeasure);
      ro?.disconnect();
      io?.disconnect();
      live = false;
      releaseAll();
      root.classList.remove('sx4--live');
      seq.removeAttribute('data-in');
      reset();
    };
  }, []);

  return null;
}
