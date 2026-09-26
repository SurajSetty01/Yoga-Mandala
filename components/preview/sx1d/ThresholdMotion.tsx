'use client';

import { useEffect } from 'react';

/**
 * The section's only client code, and the only thing on the route that is not
 * already in the static HTML. It writes ONE custom property, `--sx1d-p`, and
 * adds ONE class. There is no video on this route, so there is no observer,
 * no `src` swap and no 3.1 MB of clip on a phone.
 *
 * THE REDUCED-MOTION CONTRACT, which is what round 1 got wrong.
 *
 *   The stylesheet's standing value is `--p: 1` — the doorway OPEN, the
 *   reveal closed, the light at full reach. That is the resolved composition,
 *   and it is what a reader gets with no JavaScript, with JavaScript that
 *   fails, and under `prefers-reduced-motion: reduce`. `.is-live` is what
 *   turns the section into a scroll-driven one: it re-points `--p` at
 *   `--sx1d-p`, and it is also what adds the runway and makes the stage
 *   sticky. Add nothing and the section is exactly one viewport tall with
 *   nothing to scroll through.
 *
 *   Round 1 had this inverted. The runway was in the stylesheet, so reduced
 *   motion FROZE it: the hero stayed 2070 px at 1440×900 and the screen was
 *   pixel-identical between y=0 and y=878 — 1170 px of scroll past a picture
 *   that never moved. Critic 1: *"B's RM collapse to exactly one viewport is
 *   the correct behaviour; copy that."* This is that, with the difference that
 *   the static state here is the END of the range rather than the start, so
 *   the reader who cannot have the motion is given the payoff and not the
 *   set-up.
 *
 * THE RULES IT OBEYS, each of which is a bug already shipped on this project:
 *   · ONE passive scroll listener, and it only raises a flag. `scrollY` is
 *     read once inside one `requestAnimationFrame` and the only write is the
 *     property. Geometry is measured on load, on resize and on a
 *     ResizeObserver tick — never inside the frame loop.
 *   · The reader's scroll position is never written to; no wheel or touch
 *     event is intercepted or cancelled.
 *   · Only `transform` and `opacity` are driven. `--sx1d-p` feeds nothing
 *     else — grep the stylesheet for `var(--p)`.
 *   · Everything is undone on unmount, including the class and the property,
 *     so the preview route can be navigated away from cleanly.
 */
export function ThresholdMotion() {
  useEffect(() => {
    const sec = document.querySelector<HTMLElement>('.sx1d-thr');
    if (!sec) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* The stylesheet suppresses the runway below 700 px of viewport height —
       on a short phone the stage is already taller than the screen and a
       sticky stage would hide its own bottom. Matching that here means the
       property is never written for a layout that cannot use it. */
    const tall = matchMedia('(min-height: 700px)');
    if (!tall.matches) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    /* smoothstep, so the door neither starts nor stops on a corner */
    const ease = (t: number) => t * t * (3 - 2 * t);

    let top = 0;
    let span = 1;
    function measure() {
      const r = sec!.getBoundingClientRect();
      top = r.top + scrollY;
      /* the stage is one viewport and sticks; the travel is whatever is left
         of the section's height once the stage has been subtracted */
      span = Math.max(1, r.height - innerHeight);
    }

    let queued = false;
    let last = -1;
    function frame() {
      queued = false;
      const p = ease(clamp((scrollY - top) / span, 0, 1));
      /* four decimals is finer than a pixel at 2560 and stops the property
         churning on sub-pixel scrolls */
      const v = +p.toFixed(4);
      if (v === last) return;
      last = v;
      sec!.style.setProperty('--sx1d-p', String(v));
    }

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      last = -1;
      onScroll();
    };

    /* the first value is written BEFORE the class that starts reading it, so
       the live state is never shown for a frame with a stale number behind it */
    measure();
    frame();
    sec.classList.add('is-live');
    /* the runway only exists once the class is on, so the section just grew;
       re-measure before the reader can scroll into the part that changed */
    measure();
    last = -1;
    frame();

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);
    /* the photograph arrives after first paint and the fonts re-wrap the type
       under it; one observer re-measures rather than guessing when it settles */
    const ro = new ResizeObserver(onResize);
    ro.observe(sec);

    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      sec.classList.remove('is-live');
      sec.style.removeProperty('--sx1d-p');
    };
  }, []);

  return null;
}
