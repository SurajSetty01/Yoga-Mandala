'use client';

import { useEffect } from 'react';

/**
 * sx2c's only client island. Two arrivals, both one-shot, both off an IntersectionObserver
 * and a class — no scroll listener at all, so nothing here runs per frame:
 *
 *   · the MAT unrolls: a paper cover inside the strip is translated down and out of it
 *     (transform only), so the photograph appears from its top edge downward, once;
 *   · each ROW opens: until a line is reached only its key word is showing, and its left
 *     and right context slide outward from the axis (transform + opacity).
 *
 * The page is finished before this runs. Every start state lives under `.is-live`, which
 * is only added here, so with JavaScript off nothing is hidden. Anything already on screen
 * when this mounts is resolved BEFORE `.is-live` is added, so a reader who lands mid-page
 * never sees painted words blink out and back. Under reduced motion it returns at once and
 * the section is simply the finished concordance — which is the idea; the motion is only
 * the order in which the idea arrives.
 */
export function Sx2cMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx2c-intro');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = [...root.querySelectorAll<HTMLElement>('[data-sx2c]')];
    const line = (el: HTMLElement) => (el.dataset.sx2c === 'mat' ? 0.9 : 0.76);
    // A row's key word is what intersects; the class goes on its paragraph, whose
    // context spans are what move.
    const open = (el: Element) => {
      el.classList.add('is-in');
      el.closest('.sx2c-row')?.classList.add('is-in');
    };
    for (const el of items) {
      if (el.getBoundingClientRect().top < innerHeight * line(el)) open(el);
    }
    root.classList.add('is-live');

    const make = (bottom: string) =>
      new IntersectionObserver(
        (entries, obs) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            open(e.target);
            obs.unobserve(e.target);
          }
        },
        { threshold: 0, rootMargin: `0px 0px ${bottom} 0px` },
      );
    const matObs = make('-10%');
    const rowObs = make('-24%');
    for (const el of items) {
      if (el.classList.contains('is-in')) continue;
      (el.dataset.sx2c === 'mat' ? matObs : rowObs).observe(el);
    }
    return () => {
      matObs.disconnect();
      rowObs.disconnect();
    };
  }, []);

  return null;
}
