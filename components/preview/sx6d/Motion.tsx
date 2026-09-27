'use client';

import { useEffect } from 'react';

/**
 * sx6d's only client code, and the section does not need it to be complete.
 *
 * The stylesheet's default for every moving part is "in place" (--sx6d-we, --sx6d-ray-e and
 * --sx6d-qe all default to 1), so the page with no JavaScript, and the page under reduced
 * motion, is the assembled room. This file rewinds it and plays it back against the
 * reader's scroll, measured from where the vanishing point is on screen:
 *
 *   p = 0 when the point is at 96% of the screen's height, 1 when it is at 42%.
 *   0.00–0.50  the two ends of the row close in from either side until their lines meet;
 *   0.30–0.60  the four hairlines draw from each wall's tip into the point;
 *   0.35–0.95  the sentence comes out of the point: the floor it is set on scales up about
 *              the vanishing point, so every line keeps to the perspective — baseline and
 *              size growing together — and no line ever crosses another.
 *
 * (A first version sent the lines out one at a time; each new line had to pass through
 * the ones already placed, and for a third of the scroll the sentence was a pile of
 * overlapping words. A floor that grows as one piece cannot do that.)
 *
 * Only `transform` changes. Nothing fades: a half-transparent line is a contrast failure
 * for as long as it is half-transparent, and the probe would be right to say so.
 *
 * The rules, each one a bug this site has shipped once:
 *   · one passive scroll listener that only raises a flag; every read of scrollY and every
 *     write happens inside one requestAnimationFrame;
 *   · geometry is measured on load and on resize (and when fonts or the stage change size),
 *     never per frame, and from .sx6d-room — a zero-height box that is never transformed —
 *     never from anything that moves;
 *   · only custom properties that feed `transform` are written;
 *   · the reader's scroll is never touched; nothing listens to wheel or touch;
 *   · under `prefers-reduced-motion: reduce` it attaches nothing and returns.
 */
export function Motion() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.sx6d-stage');
    const room = stage?.querySelector<HTMLElement>('.sx6d-room');
    if (!stage || !room || stage.querySelector('.sx6d-q--flat')) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pointY = 0; /* the vanishing point's page y */
    let vh = 0;
    let ticking = false;
    const last: Record<string, number> = {};

    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    /* ease-out: things decelerate into their places */
    const ease = (t: number) => 1 - (1 - t) ** 3;

    const measure = () => {
      pointY = room.getBoundingClientRect().top + scrollY;
      vh = innerHeight;
    };

    const set = (name: string, v: number) => {
      if (Math.abs(v - (last[name] ?? -1)) < 0.0005) return;
      last[name] = v;
      stage.style.setProperty(name, v.toFixed(4));
    };

    const frame = () => {
      ticking = false;
      const at = pointY - scrollY; /* the point's height on screen */
      const p = clamp((vh * 0.96 - at) / (vh * 0.54));
      set('--sx6d-we', ease(clamp(p / 0.5)));
      set('--sx6d-ray-e', ease(clamp((p - 0.3) / 0.3)));
      set('--sx6d-qe', ease(clamp((p - 0.35) / 0.6)));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };
    const refresh = () => {
      measure();
      onScroll();
    };

    measure();
    frame();

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', refresh);
    const ro = new ResizeObserver(refresh);
    ro.observe(stage);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', refresh);
      ro.disconnect();
      for (const name of ['--sx6d-we', '--sx6d-ray-e', '--sx6d-qe']) stage.style.removeProperty(name);
    };
  }, []);

  return null;
}
