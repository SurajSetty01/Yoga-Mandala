'use client';

import { useEffect } from 'react';

/**
 * The route's only client island. Both sections are server components, so every one of the
 * client's sentences and the photograph are in the static HTML and the page is finished
 * before this file runs at all.
 *
 * It does ONE thing: reveals `[data-aa]` blocks, opt in through `.is-live` on the section
 * root. Nothing already painted is ever hidden by CSS that is not gated on that class, so
 * a reader whose JavaScript never arrives keeps the complete pair — and under
 * `prefers-reduced-motion: reduce` this returns before attaching anything, so `.is-live` is
 * never added and every start state stays inert.
 *
 * Neither section's idea lives in motion. §03 is four apertures cut at four scales and a
 * photograph shown whole; §04 is a sentence whose type grows and whose spacing opens. Turn
 * the animation off and both are exactly what they were, which is the point: the motion is
 * a fade, not the design.
 *
 * No scroll listener, no rAF loop, no scroll-linked custom property, nothing sticky. The
 * one rule it still has to obey is the one that has shipped as a blank page before:
 * nothing observed here carries a clip, because Chromium computes an IntersectionObserver's
 * rect after clips and an element clipped to zero reports ratio 0 for ever. The clipped
 * elements in §03 are the apertures, which are children of the observed rows.
 */
export function AaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.aa');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealables = [...root.querySelectorAll<HTMLElement>('[data-aa]')];
    /* anything already on screen when the island mounts is resolved BEFORE `.is-live` is
       added, so a reader who lands mid-page never sees a block that was painted a moment
       ago fade back in. */
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('aa-in');
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('aa-in');
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );

    root.classList.add('is-live');
    for (const el of revealables) if (!el.classList.contains('aa-in')) reveal.observe(el);

    return () => {
      reveal.disconnect();
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
