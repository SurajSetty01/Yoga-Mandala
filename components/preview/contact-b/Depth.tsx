'use client';

import { useEffect } from 'react';

/**
 * CONCEPT B's only client component.
 *
 * Two things, both optional to the page:
 *
 *  1. REVEAL. Each doorway rises as it enters. It uses the `is-live` opt-in pattern from
 *     components/within/WithinMotion.tsx: everything already on screen is marked revealed
 *     BEFORE the reveal styles exist, so nothing the browser has painted is blinked away,
 *     and with JavaScript off the CSS does nothing at all. It observes opacity only —
 *     never a clip — because Chromium computes an IntersectionObserver's rect after clips
 *     and a clipped element reports ratio 0 forever (design/DESIGN-SYSTEM.md §1).
 *
 *  2. DEPTH. The near lane and the far lane travel at slightly different rates, so the wall
 *     has a front and a back. One passive scroll listener raises a flag; every read and
 *     write happens inside one requestAnimationFrame; element tops are measured on load and
 *     on resize only. It writes a custom property, never a layout value — the CSS composes
 *     `translate3d(0, var(--py), 0) rotate(...)` so the tilt each doorway already carries is
 *     not clobbered.
 *
 * Under prefers-reduced-motion neither runs: no listener is attached, no property is set,
 * and the wall stands exactly as it is laid out.
 */
export function Depth() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.contact-b');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    for (const el of els) if (!el.classList.contains('in')) io.observe(el);

    /* ── depth ─────────────────────────────────────────────────────────────── */
    const figs = [...root.querySelectorAll<HTMLElement>('.cb-m')];
    let tops: number[] = [];
    let raf = 0;

    const measure = () => {
      const y = scrollY;
      tops = figs.map((f) => f.getBoundingClientRect().top + y + f.offsetHeight / 2);
    };

    const paint = () => {
      raf = 0;
      const mid = scrollY + innerHeight / 2;
      figs.forEach((f, i) => {
        const rate = f.dataset.lane === 'far' ? 0.055 : -0.035;
        const d = (mid - (tops[i] ?? 0)) * rate;
        f.style.setProperty('--py', `${d.toFixed(1)}px`);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    measure();
    paint();
    addEventListener('scroll', onScroll, { passive: true });
    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        measure();
        paint();
      }, 140);
    };
    addEventListener('resize', onResize);

    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      clearTimeout(rz);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('is-live');
      figs.forEach((f) => f.style.removeProperty('--py'));
    };
  }, []);

  return null;
}
