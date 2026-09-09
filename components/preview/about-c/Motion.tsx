'use client';

import { useEffect } from 'react';

/**
 * The concept's only client code. Two jobs, both cheap.
 *
 *  1. THE DEAL. An IntersectionObserver adds `.is-in` to each `[data-c-deal]` group; CSS then
 *     transitions every `[data-cd]` object inside it from the gathered stack (square, small,
 *     offset toward where the pile came from) to where it was dealt. Transform and opacity
 *     only, no scroll listener, one class write per group, then unobserve.
 *
 *  2. THE SEAMS. One passive scroll listener raises a flag; a single rAF writes ONE custom
 *     property, `--p` (−1 → 1), on the splice band. Each strip multiplies it by its own `--k`
 *     so the four slide against one another by at most 20px. Geometry is measured on load and
 *     resize, never inside the handler.
 *
 * Under `prefers-reduced-motion: reduce` neither runs: the groups are marked `.is-in`
 * immediately so nothing is ever hidden, and the scroll listener is never attached. The page
 * with JavaScript disabled is the same page — the start states are scoped to `.js`, which the
 * root layout sets before first paint.
 */
export function AboutCMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.about-c');
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-c-deal]'));
    const band = root.querySelector<HTMLElement>('[data-c-splice]');

    let raf = 0;
    let pending = false;
    let bandTop = 0;
    let bandH = 1;

    const measure = () => {
      if (!band) return;
      const r = band.getBoundingClientRect();
      bandTop = r.top + window.scrollY;
      bandH = r.height || 1;
    };

    const apply = () => {
      pending = false;
      if (!band) return;
      const vh = window.innerHeight;
      // 0 when the band's top edge first touches the bottom of the viewport,
      // 1 when its bottom edge leaves the top. Remapped to −1 … 1.
      const t = (window.scrollY + vh - bandTop) / (vh + bandH);
      band.style.setProperty('--p', String(Math.max(0, Math.min(1, t)) * 2 - 1));
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      apply();
    };

    if (reduce.matches) {
      groups.forEach((g) => g.classList.add('is-in'));
      return;
    }

    /* Declared here rather than above the reduced-motion early return: on that path no
       observer is ever created, so there is nothing to hold or to disconnect. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    );
    groups.forEach((g) => io.observe(g));

    if (band) {
      measure();
      apply();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
