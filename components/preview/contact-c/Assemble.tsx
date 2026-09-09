'use client';

import { useEffect } from 'react';

/**
 * CONCEPT C's only client component, and it adds exactly one thing: the statement
 * ASSEMBLES. Each subject arrives a beat after the one before as the block enters, so a
 * sentence that is already complete in the HTML is spoken rather than displayed.
 *
 * It uses the `is-live` opt-in pattern from components/within/WithinMotion.tsx:
 *   · anything already on screen is marked revealed BEFORE the reveal styles exist, so
 *     nothing the browser has painted is blinked away;
 *   · the CSS does nothing at all until `is-live` is added, so with JavaScript off the whole
 *     statement is simply there;
 *   · it observes opacity only and clips nothing — a clipped element reports intersection
 *     ratio 0 in Chromium and never fires (design/DESIGN-SYSTEM.md §1);
 *   · it adds no scroll listener and never touches the scroll position.
 *
 * Under prefers-reduced-motion it returns before adding `is-live`, so the statement is
 * static, whole and identical to the no-JS render.
 */
export function Assemble() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.contact-c');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = [...root.querySelectorAll<HTMLElement>('[data-cr]')];
    for (const el of els) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('in');
    }
    root.classList.add('is-live');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' }
    );
    for (const el of els) if (!el.classList.contains('in')) io.observe(el);

    return () => {
      io.disconnect();
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
