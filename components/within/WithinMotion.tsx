'use client';

import { useEffect } from 'react';

/**
 * The only client component this page has.
 *
 * Everything above it is a server component, so every word, list and photograph is in the
 * static HTML and the page is complete before any JavaScript runs. This adds one thing: the
 * register rows arrive in sequence instead of all at once, which is what turns twenty-five
 * bullet points into something with a rhythm.
 *
 * THREE THINGS IT WILL NOT DO, each of them a bug someone has already shipped on this site:
 *
 *  1. It never hides anything the browser has already painted. `is-live` is added only after
 *     the elements already on screen have been marked revealed, so nothing flashes out and
 *     back in, and a reader whose JS never arrives keeps the whole page. The reveal is opt-in
 *     through that class — the CSS does nothing at all without it.
 *  2. It clips nothing. Chromium computes an IntersectionObserver's rect AFTER clips, so an
 *     element carrying `clip-path: inset(...)` reports ratio 0 and never fires. Opacity is
 *     ignored by IntersectionObserver v1 and is therefore safe; that is all this uses.
 *  3. It never touches the scroll position and adds no scroll listener.
 */
export function WithinMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.wi');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = [...root.querySelectorAll<HTMLElement>('[data-wr]')];

    // Anything already on screen is marked revealed BEFORE the reveal styles exist, so the
    // class that arrives on the next line cannot blink it away.
    for (const el of els) {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('in');
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
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    for (const el of els) if (!el.classList.contains('in')) io.observe(el);

    return () => {
      io.disconnect();
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
