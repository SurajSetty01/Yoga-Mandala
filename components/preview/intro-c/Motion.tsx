'use client';

import { useEffect } from 'react';

/**
 * The section's only client code. Two jobs, both cheap, and the page is complete without
 * either of them.
 *
 *  1. THE OPENING. One IntersectionObserver adds `.is-open` to the table. CSS then relaxes
 *     every print from the squared-up pile (0°, pushed toward the middle, very slightly
 *     enlarged) to where a hand left it, on its own delay, and the five sentences come up
 *     underneath. One class write, then unobserve. No scroll listener is involved in
 *     revealing anything, so nothing can be left hidden by a missed frame.
 *
 *  2. THE DEPTH. One passive scroll listener raises a flag; a single rAF writes ONE custom
 *     property, `--ic-drift` (−1 → 1), on the table. Each print multiplies it by its own
 *     `--dr`, so twelve prints ride at twelve slightly different heights above the surface
 *     and the pile has a thickness when you go past it. At most ±9px, transform only, on an
 *     element that is not the one carrying the opening transition — so the two never fight.
 *     Geometry is measured on load and resize, never inside the handler.
 *
 * Under `prefers-reduced-motion: reduce` neither runs: the table is marked open immediately
 * so nothing is ever hidden, and the listener is never attached. The media query is watched,
 * so changing the system setting with the page open does the right thing rather than
 * stranding the reader in whichever state they started in.
 */
export function IntroCMotion() {
  useEffect(() => {
    const table = document.querySelector<HTMLElement>('[data-ic-table]');
    if (!table) return;

    const mq = matchMedia('(prefers-reduced-motion: reduce)');

    let io: IntersectionObserver | null = null;
    let raf = 0;
    let pending = false;
    let top = 0;
    let height = 1;
    let scrollBound = false;

    const measure = () => {
      const r = table.getBoundingClientRect();
      top = r.top + scrollY;
      height = r.height || 1;
    };

    const write = () => {
      raf = 0;
      pending = false;
      // −1 when the table's top edge is a viewport below the fold line, +1 when its bottom
      // edge has risen a viewport above it. Clamped, so the ends are still rather than drifting.
      const mid = top + height / 2 - (scrollY + innerHeight / 2);
      const span = (height + innerHeight) / 2;
      const p = Math.max(-1, Math.min(1, mid / span));
      table.style.setProperty('--ic-drift', p.toFixed(4));
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(write);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    const bind = () => {
      if (scrollBound) return;
      scrollBound = true;
      measure();
      write();
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onResize, { passive: true });
    };

    const unbind = () => {
      if (!scrollBound) return;
      scrollBound = false;
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      table.style.removeProperty('--ic-drift');
    };

    const apply = () => {
      if (mq.matches) {
        io?.disconnect();
        io = null;
        unbind();
        table.classList.add('is-open');
        return;
      }
      if (!io) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              e.target.classList.add('is-open');
              io?.unobserve(e.target);
            }
          },
          // a little of the table has to be on screen before the pile opens, so the gesture
          // is not spent off the bottom of the viewport on a tall screen
          { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
        );
        io.observe(table);
      }
      bind();
    };

    apply();
    mq.addEventListener('change', apply);

    return () => {
      mq.removeEventListener('change', apply);
      io?.disconnect();
      unbind();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
