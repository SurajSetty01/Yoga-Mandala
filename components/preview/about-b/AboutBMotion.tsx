'use client';

import { useEffect } from 'react';

/**
 * The concept's single client island. Everything above it is a server component, so every
 * word and photograph is in the static HTML and the page is complete before this runs.
 *
 * It does exactly two things:
 *   1. reveals `[data-br]` blocks in sequence, opt-in through `.is-live` so that a reader
 *      whose JavaScript never arrives keeps the whole page and nothing already painted is
 *      ever hidden again;
 *   2. writes ONE custom property, `--b-close`, from the closing plate's scroll position, so
 *      the last word of the page draws itself together as the reader reaches the end.
 *
 * The rules it obeys, each of them a bug already shipped on this site:
 *   - it clips nothing it observes (Chromium computes an IntersectionObserver's rect AFTER
 *     clips, so a clipped element reports ratio 0 and never fires);
 *   - one passive scroll listener that only raises a flag; all reads and all writes happen
 *     inside one requestAnimationFrame; geometry is read there and nowhere else;
 *   - only `transform` and a unitless number are ever animated;
 *   - under `prefers-reduced-motion: reduce` it attaches nothing at all and returns, leaving
 *     `--b-close` at its CSS default of 1 — the finished, readable state.
 */
export function AboutBMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.about-b');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. sequenced reveals ─────────────────────────────────────────── */
    const els = [...root.querySelectorAll<HTMLElement>('[data-br]')];
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
      { threshold: 0, rootMargin: '0px 0px -9% 0px' }
    );
    for (const el of els) if (!el.classList.contains('in')) io.observe(el);

    /* ── 2. the closing word ──────────────────────────────────────────── */
    const plate = root.querySelector<HTMLElement>('.b-guide');
    let queued = false;

    const frame = () => {
      queued = false;
      if (!plate) return;
      const r = plate.getBoundingClientRect();
      /* one full viewport of travel: measured, because a shorter span finished the
         word before the plate had risen far enough to be read, and the convergence was
         never actually seen. */
      const span = innerHeight || 1;
      const p = (innerHeight - r.top) / span;
      plate.style.setProperty('--b-close', String(p < 0 ? 0 : p > 1 ? 1 : p));
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      root.classList.remove('is-live');
      plate?.style.removeProperty('--b-close');
    };
  }, []);

  return null;
}
