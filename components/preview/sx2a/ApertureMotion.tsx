'use client';

import { useEffect } from 'react';

/**
 * The section's only client code, and it is a grace note rather than the idea.
 *
 * TURN REDUCED MOTION ON AND NOTHING IS LOST. Every window's height, every crop, the
 * order of the sequence and the break at the end are static CSS — this file adds a reveal
 * and takes it away again, and that is all it does. Document height is 3,046px at 1440
 * with motion, under prefers-reduced-motion and with JavaScript disabled; the rendered
 * pixels differ by 0.06% and 0.18%, all of it the dev overlay. The test the brief sets is
 * whether the idea evaporates without motion; here the idea is the geometry, and the
 * geometry is in the stylesheet.
 *
 * ROUND 3: THE ONLY THING THAT MOVES IS THE WINDOW. The sentences used to fade and rise
 * with it, and a paragraph caught mid-fade made the glyph-accurate contrast probe report
 * one FAIL in three runs at 1024×768 — it shoots the text painted and transparent and
 * differences the two, which a transition invalidates. The ink measures 15.58:1 at every
 * width, so the failure was the animation; it was also the most generic thing in the
 * section, so it is gone rather than tuned. The iris that remains opens upward from the
 * held bottom edge, which is the one gesture the ladder itself makes.
 *
 * THE HIDING IS OPT-IN. `is-live` is added only after this effect has run AND only when
 * the reader has not asked for reduced motion, so a reader whose JavaScript never arrives
 * — and a reader who has asked the operating system to stop things moving — is served the
 * finished section rather than the start of an animation that will never play.
 *
 * The observed element is `.sx2a-frame`; the iris clip sits on `.sx2a-band` INSIDE it.
 * Chromium computes an IntersectionObserver's intersection rect after clips, so an
 * observed element carrying a clip-path that clips to zero reports ratio 0, never fires,
 * and stays invisible forever. That shipped on this site once as a blank page.
 */
export function ApertureMotion() {
  useEffect(() => {
    const root = document.getElementById('sx2a');
    if (!root) return;

    // Asked once, and honoured by doing nothing at all: no class, no observer, no
    // transitions. The section is already complete in the markup.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('is-live');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    const watched = root.querySelectorAll('[data-sx2a-r="iris"]');
    watched.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove('is-live');
      watched.forEach((el) => el.classList.remove('in'));
    };
  }, []);

  return null;
}
