'use client';

import { useEffect } from 'react';

/**
 * The only client code in /practice/ §02. The section is complete before this runs: the
 * sentence and all four frames, laid out still in a row.
 *
 * Motion allowed: adds `.tp3-live`, which (on viewports tall enough to hold it) pins the
 * stage and stacks the four frames in one window. As the pinned run is scrolled, the step
 * (0–3) is derived from progress through it and written as `data-step` on the root, and
 * `.is-on` goes on the frame and the term for that step. The cut itself is CSS: an opacity
 * switch with no transition.
 *
 * One passive scroll listener that only raises a flag; geometry is read on load and when
 * the page or the run changes size. Under `prefers-reduced-motion: reduce` nothing is added,
 * and turning it on mid-visit takes the live layout away again.
 */
export function Tp3Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tp3');
    const run = root?.querySelector<HTMLElement>('.tp3-run');
    if (!root || !run) return;

    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-tp3-i]'));
    const count = new Set(items.map((el) => el.dataset.tp3I)).size || 1;

    let top = 0;
    let span = 1;
    let step = -1;
    let raf = 0;
    let live = false;

    const set = (n: number) => {
      if (n === step) return;
      step = n;
      root.dataset.step = String(n);
      for (const el of items) el.classList.toggle('is-on', el.dataset.tp3I === String(n));
    };

    const measure = () => {
      const r = run.getBoundingClientRect();
      top = r.top + window.scrollY;
      span = Math.max(1, r.height - document.documentElement.clientHeight);
    };

    const tick = () => {
      raf = 0;
      const p = (window.scrollY - top) / span;
      set(Math.min(count - 1, Math.max(0, Math.floor(p * count))));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;

    const start = () => {
      if (live) return;
      live = true;
      set(0);
      root.classList.add('tp3-live');
      measure();
      tick();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      ro?.observe(run);
      ro?.observe(document.body);
    };

    const stop = () => {
      if (!live) return;
      live = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      root.classList.remove('tp3-live');
      delete root.dataset.step;
      for (const el of items) el.classList.remove('is-on');
      step = -1;
    };

    const onPref = () => (mq.matches ? stop() : start());
    onPref();
    mq.addEventListener('change', onPref);

    return () => {
      mq.removeEventListener('change', onPref);
      stop();
    };
  }, []);

  return null;
}
