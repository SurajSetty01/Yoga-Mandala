'use client';

import { useEffect } from 'react';

/**
 * The camera. One client island for the whole traverse.
 *
 * Rules it obeys, each of them a bug already shipped somewhere on this site:
 *
 *  · The reader's scroll position is never written to. No wheel or touch interception, no
 *    snapping, no rAF that nudges scrollY. Scroll-DRIVEN, never scroll-jacked.
 *  · One passive scroll listener; it raises a flag and nothing else. Every read of scrollY
 *    and every style write happens inside a single requestAnimationFrame.
 *  · Element geometry is measured on load and on resize only, never inside the frame loop.
 *  · Only `transform` and `opacity` are written. Masks, grounds and gradients are static CSS.
 *  · It clips nothing it observes. Chromium computes an IntersectionObserver's rect AFTER
 *    clips, so an observed element carrying a zero clip never fires and stays invisible
 *    forever — that shipped once as a blank page. The reveal here uses opacity only.
 *  · It never hides what the browser has already painted: everything on screen is marked
 *    revealed BEFORE `aa-live` (which is what turns the reveal styles on) is added, and the
 *    whole reveal is opt-in through that class, so a reader whose JavaScript never arrives
 *    keeps the entire page.
 *  · `prefers-reduced-motion: reduce` takes an early exit and adds `aa-still` instead, which
 *    anchors every plane to its own station. The room stops being a camera and becomes a set
 *    of stills. Complete, static, usable — the composition was never the animation.
 *
 * The timings below are expressed as fractions of the REAL measured stations, not as guessed
 * fractions of the section, so the station heights in the stylesheet can be retuned freely
 * without touching a number in here.
 */
export function RoomMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.about-a');
    if (!root) return;

    const reveals = [...root.querySelectorAll<HTMLElement>('[data-ar]')];

    /* ── reduced motion: no camera at all ─────────────────────────────── */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('aa-still');
      return () => root.classList.remove('aa-still');
    }

    const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s);
    const door = q('.aa-pl--door');
    const mats = q('.aa-pl--mats');
    const room = q('.aa-pl--room');
    const work = q('.aa-pl--work');
    const fgA = q('.aa-fg--a');
    const fgB = q('.aa-fg--b');
    const veil = q('.aa-veil');
    const pool = q('.aa-pool');
    if (!door || !mats || !room || !work || !fgA || !fgB || !veil || !pool) return;

    const stops = [...root.querySelectorAll<HTMLElement>('.aa-stop')];

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    /* smoothstep, so no hand-off starts or stops on a corner */
    const seg = (a: number, b: number, p: number) => {
      const t = clamp((p - a) / (b - a || 1), 0, 1);
      return t * t * (3 - 2 * t);
    };

    /* ── geometry. Measured on load and resize; never inside the frame. ── */
    let top = 0;
    let range = 1;
    let B: number[] = [0, 0.2, 0.55, 0.75, 0.95, 1];
    let startScale = 0.55;
    let endScale = 3;
    /* the progress at which GROW — the far end of the room — has entered the frame */
    let pClear = 0.4;

    function measure() {
      const r = root!.getBoundingClientRect();
      top = r.top + scrollY;
      range = Math.max(1, root!.offsetHeight - innerHeight);
      B = stops.map((s) => clamp((s.getBoundingClientRect().top + scrollY - top) / range, 0, 1));
      B.push(1);
      /* the doorway has to end up larger than the viewport in both axes, whatever the
         viewport is — a portrait phone needs a very different number from a 2560 desktop,
         so it is derived from the measured box rather than guessed in the stylesheet. */
      const w = door!.offsetWidth || 1;
      const h = door!.offsetHeight || 1;
      endScale = Math.max(innerWidth / w, innerHeight / h) * 1.06;
      startScale = Math.min(0.72, (innerWidth * 0.42) / w);
      /* Derived from where GROW actually is, not from a fraction of the station: the
         foreground has to be out of the way before the reader reaches the one purpose they
         arrive at. Retuning the station heights cannot break this. */
      const grow = root!.querySelector<HTMLElement>('.aa-thing--4');
      pClear = grow
        ? clamp((grow.getBoundingClientRect().top + scrollY - innerHeight * 0.98 - top) / range, 0.05, 1)
        : 0.4;
    }

    /** progress at fraction `f` between station `i` and the one after it */
    const at = (i: number, f: number) => B[i]! + f * ((B[i + 1] ?? 1) - B[i]!);

    function frame() {
      const p = clamp((scrollY - top) / range, 0, 1);

      /* 1 — the doorway grows until you are standing inside it */
      const dIn = seg(at(0, 0), at(0, 0.58), p);
      door!.style.transform = `translate3d(0, ${4 - 11 * dIn}svh, 0) scale(${startScale + (endScale - startScale) * dIn})`;
      door!.style.opacity = `${1 - seg(at(0, 0.5), at(0, 0.78), p)}`;

      /* 2 — the room proper, still dollying forward the whole length of it */
      const mT = seg(at(0, 0.46), at(2, 0.1), p);
      mats!.style.transform = `translate3d(0, ${10 - 22 * mT}svh, 0) scale(${1.16 - 0.16 * mT})`;
      mats!.style.opacity = `${seg(at(0, 0.46), at(0, 0.72), p) * (1 - seg(at(1, 0.88), at(2, 0.1), p))}`;

      /* The near foreground, moving fastest because it is closest, and passing in FRONT of
         the words as the reader goes by the first two purposes. It is gone well before GROW:
         occlusion is only worth having if the thing occluded is readable when you reach it,
         and GROW is the one purpose you arrive AT rather than pass. */
      const aT = seg(at(1, 0), pClear, p);
      fgA!.style.transform = `translate3d(0, ${50 - 78 * aT}svh, 0)`;
      fgA!.style.opacity = `${seg(at(1, 0.02), at(1, 0.14), p) * (1 - seg(pClear - 0.055, pClear, p))}`;

      /* 3 — the held breath: everything above has faded, nothing below has arrived. The
             one stretch of this room with no photograph in it. */

      /* 4 — the room fills: the same place from three positions, arriving together */
      const rT = seg(at(3, 0), at(4, 0.06), p);
      room!.style.transform = `translate3d(0, ${14 - 26 * rT}svh, 0) scale(${1.12 - 0.12 * rT})`;
      room!.style.opacity = `${seg(at(2, 0.86), at(3, 0.16), p) * (1 - seg(at(3, 0.9), at(4, 0.1), p))}`;

      const wT = seg(at(3, 0.08), at(4, 0.08), p);
      work!.style.transform = `translate3d(0, ${20 - 34 * wT}svh, 0) scale(${1.08 - 0.1 * wT})`;
      work!.style.opacity = `${0.9 * seg(at(3, 0.12), at(3, 0.3), p) * (1 - seg(at(3, 0.92), at(4, 0.12), p))}`;

      const bT = seg(at(3, 0.2), at(3, 0.86), p);
      fgB!.style.transform = `translate3d(0, ${46 - 70 * bT}svh, 0)`;
      fgB!.style.opacity = `${seg(at(3, 0.26), at(3, 0.42), p) * (1 - seg(at(3, 0.68), at(3, 0.84), p))}`;

      /* The room's ground. It has to arrive WITH the doorway, not after it: at 1024x768 a
         late ramp left the first paragraph sitting on a half-grown, still-bright picture and
         measured 2.78:1. It now completes by the time the doorway is a third of the way in,
         which is also the honest thing physically — the light is outside, and your eyes
         adjust as you step through. Off again once the far light takes over. */
      const lit = seg(at(0, 0.05), at(0, 0.32), p) * (1 - seg(at(4, 0), at(4, 0.34), p));
      veil!.style.opacity = `${lit}`;
      pool!.style.opacity = `${lit}`;
    }

    /* ── the loop: one flag, one frame ────────────────────────────────── */
    let queued = false;
    const tick = () => {
      queued = false;
      frame();
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    frame();

    /* Anything already on screen is marked revealed BEFORE the class that creates the
       reveal's start state exists, so nothing the browser has painted can blink away. */
    for (const el of reveals) {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('aa-in');
    }
    root.classList.add('aa-live');

    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const e of entries) {
                if (!e.isIntersecting) continue;
                e.target.classList.add('aa-in');
                io!.unobserve(e.target);
              }
            },
            { threshold: 0, rootMargin: '0px 0px -8% 0px' }
          );
    if (io) for (const el of reveals) if (!el.classList.contains('aa-in')) io.observe(el);
    else for (const el of reveals) el.classList.add('aa-in');

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      io?.disconnect();
      root.classList.remove('aa-live');
    };
  }, []);

  return null;
}
