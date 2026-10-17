'use client';

import { useEffect } from 'react';

/**
 * The About page's one motion: anything marked `data-a3r` fades and rises a little when it
 * first comes into view. Nothing is pinned and nothing follows the scroll position. Without
 * JavaScript, or with reduced motion, everything is simply visible (the hidden state is only
 * applied once `.a3-js` is on the root).
 */
export function A3Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('a3-js');
    const els = [...document.querySelectorAll<HTMLElement>('[data-a3r]')];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove('a3-js');
    };
  }, []);
  return null;
}
