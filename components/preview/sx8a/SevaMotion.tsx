'use client';

import { useEffect } from 'react';

/**
 * The section's only client island. It does one thing: lets each piece arrive once, and
 * lays the cut down across the page when the seam reaches the reader.
 *
 * Opt-in: `.is-live` is added here and nowhere else, so a reader whose JavaScript never
 * runs — and a reader who asks for reduced motion, for whom this returns early — keeps the
 * finished composition that the server already painted. No scroll listener at all: one
 * IntersectionObserver, and each element is released from it the moment it has arrived.
 */
export function SevaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx8a');
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-sx8a]'));
    root.classList.add('is-live');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      // Fire on first contact. A deeper margin or a ratio threshold left the bottom of a
      // tall block (the six initiatives) painted on screen at opacity 0 until the block
      // was far enough in — measured by the contrast probe as 1.08:1 at 390×844.
      { rootMargin: '0px 0px -2% 0px', threshold: 0 },
    );
    items.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove('is-live');
      items.forEach((el) => el.classList.remove('is-in'));
    };
  }, []);

  return null;
}
