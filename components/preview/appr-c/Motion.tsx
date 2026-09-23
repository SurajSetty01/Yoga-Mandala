'use client';

import { useEffect } from 'react';

/**
 * The pair's only client code, and it is opt-in.
 *
 * Everything on both leaves is a server component: every word, the photograph
 * and all five rules are in the static HTML, finished, before this file runs.
 * The reveal start states live behind `.ac.is-live`, a class only this island
 * adds — so a reader whose JavaScript never arrives is not looking at a hidden
 * page, they are looking at the finished one.
 *
 * It obeys the rules this site learned the hard way:
 *   · no scroll listener at all — one IntersectionObserver, one class write per
 *     element, then unobserve. Nothing reads layout in a frame loop.
 *   · only `transform`, `opacity` and `clip-path` change, and the clip is on the
 *     `<img>` INSIDE the observed `<figure>`, never on the observed element —
 *     Chromium computes the intersection rect after clips, so an element clipped
 *     to zero reports ratio 0 and never fires.
 *   · under `prefers-reduced-motion: reduce` it attaches nothing and returns
 *     before `.is-live` is ever added, so every start state stays inert.
 *   · anything already on screen when it mounts is resolved BEFORE `.is-live`
 *     goes on, so a reader who lands mid-page never watches a block that was
 *     already painted fade back in.
 */
export function ApprCMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ac');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = [...root.querySelectorAll<HTMLElement>('[data-ac]')];
    for (const el of targets) {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('ac-on');
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('ac-on');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    for (const el of targets) if (!el.classList.contains('ac-on')) io.observe(el);

    root.classList.add('is-live');
    return () => {
      io.disconnect();
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
