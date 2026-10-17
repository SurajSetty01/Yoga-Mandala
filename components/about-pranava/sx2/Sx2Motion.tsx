'use client';

import { useEffect } from 'react';

/**
 * The Introduction's only client code: one gentle fade and rise as each block enters.
 * The section is complete before this runs. Under prefers-reduced-motion it does nothing
 * and never adds `.sx2-is-live`, so no hidden start state ever applies. No scroll listener,
 * nothing pinned, nothing tied to scroll position.
 */
export function Sx2Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx2-intro');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-sx2-r]'));
    const vh = window.innerHeight;
    // anything already on screen stays as it is; only what is still below the fold rises
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('sx2-in');
    });
    root.classList.add('sx2-is-live');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('sx2-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    items.forEach((el) => {
      if (!el.classList.contains('sx2-in')) io.observe(el);
    });

    return () => {
      io.disconnect();
      root.classList.remove('sx2-is-live');
      items.forEach((el) => el.classList.remove('sx2-in'));
    };
  }, []);

  return null;
}
