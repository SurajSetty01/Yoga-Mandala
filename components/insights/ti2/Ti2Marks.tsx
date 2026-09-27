'use client';

import { useEffect, useRef } from 'react';

/**
 * The reader for MarkedPassages. It does two things and nothing else.
 *
 * 1. GEOMETRY, always (motion or not). Where the marked clause starts inside its paragraph
 *    and how tall its lines are, written to `--ti2-at` / `--ti2-h` on the piece so the margin
 *    bracket spans exactly the marked lines and the photograph sits level with the first of
 *    them. Measured on mount, after fonts load and on resize — never on scroll.
 *
 * 2. THE MARKING, only when motion is allowed. It arms the section (`ti2--armed`: clauses
 *    unwashed, brackets undrawn, photographs veiled), then one IntersectionObserver adds
 *    `is-marked` to each piece as its paragraph crosses the reading line, 62% down the
 *    viewport. CSS does the rest as one-shot transitions. A piece already above the line when
 *    the section arms (a reload part-way down) is marked at once with no animation, so nothing
 *    above the reader is ever left unmarked.
 */
export function Ti2Marks() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('.ti2');
    if (!root) return;
    const pieces = Array.from(root.querySelectorAll<HTMLElement>('.ti2-piece'));

    /* ── 1 · geometry ── */
    let raf = 0;
    const measure = () => {
      raf = 0;
      for (const piece of pieces) {
        const text = piece.querySelector<HTMLElement>('.ti2-text');
        const lit = piece.querySelector<HTMLElement>('.ti2-lit');
        if (!text || !lit) continue;
        const rects = lit.getClientRects();
        const first = rects[0];
        const last = rects[rects.length - 1];
        if (!first || !last) continue;
        const top = text.getBoundingClientRect().top;
        piece.style.setProperty('--ti2-at', `${Math.max(0, Math.round(first.top - top))}px`);
        piece.style.setProperty('--ti2-h', `${Math.round(last.bottom - first.top)}px`);
      }
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    document.fonts?.ready.then(queue).catch(() => {});
    const ro = new ResizeObserver(queue);
    ro.observe(root);

    /* ── 2 · the marking ── */
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | null = null;
    if (!reduce && 'IntersectionObserver' in window) {
      const line = window.innerHeight * 0.62;
      const pending: HTMLElement[] = [];
      for (const piece of pieces) {
        const p = piece.querySelector<HTMLElement>('.ti2-p');
        if (!p) continue;
        if (p.getBoundingClientRect().top < line) piece.classList.add('is-marked', 'is-instant');
        else pending.push(p);
      }
      root.classList.add('ti2--armed');

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            (e.target as HTMLElement).closest('.ti2-piece')?.classList.add('is-marked');
            io?.unobserve(e.target);
          }
        },
        { rootMargin: '0px 0px -38% 0px', threshold: 0 },
      );
      for (const p of pending) io.observe(p);
    }

    return () => {
      io?.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('ti2--armed');
    };
  }, []);

  return <span ref={ref} hidden />;
}
