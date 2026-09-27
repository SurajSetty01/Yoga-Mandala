'use client';

import { useEffect } from 'react';

/**
 * The tilt. One passive scroll listener that only raises a flag, one rAF, geometry measured
 * on load and resize only. It writes three numbers on `.th1`:
 *   --th1-t  the tilt, 0 → 1 over the first 60% of the held screen (eased)
 *   --th1-c  the cut, 0 → 1 across a few percent right after it
 *   --th1-r  the crown's own continued rise, 0 → 1 over the rest
 *
 * The stylesheet only lays out the held, tilting stage under
 * `(prefers-reduced-motion: no-preference) and (min-height: 540px)`; this uses the same query,
 * so under reduced motion or on a short landscape phone it attaches nothing and the section is
 * its still, complete state.
 */
const LIVE = '(prefers-reduced-motion: no-preference) and (min-height: 540px)';

export function Th1Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-th1]');
    const stage = root?.querySelector<HTMLElement>('.th1-stage');
    if (!root || !stage) return;
    const mq = matchMedia(LIVE);

    let top = 0;
    let range = 1;
    let queued = false;
    let last = '';
    const clamp = (x: number) => Math.min(1, Math.max(0, x));
    const ease = (x: number) => x * x * (3 - 2 * x);

    const measure = () => {
      top = root.getBoundingClientRect().top + scrollY;
      range = Math.max(1, root.offsetHeight - stage.offsetHeight);
    };
    const frame = () => {
      queued = false;
      const p = clamp((scrollY - top) / range);
      const t = ease(clamp(p / 0.6)).toFixed(4);
      const c = clamp((p - 0.6) / 0.05).toFixed(3);
      const r = clamp((p - 0.6) / 0.4).toFixed(4);
      const key = `${t}|${c}|${r}`;
      if (key === last) return;
      last = key;
      root.style.setProperty('--th1-t', t);
      root.style.setProperty('--th1-c', c);
      root.style.setProperty('--th1-r', r);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    let on = false;
    const attach = () => {
      if (on) return;
      on = true;
      measure();
      frame();
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onResize);
    };
    const detach = () => {
      if (!on) return;
      on = false;
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      last = '';
      root.style.removeProperty('--th1-t');
      root.style.removeProperty('--th1-c');
      root.style.removeProperty('--th1-r');
    };
    const sync = () => (mq.matches ? attach() : detach());

    sync();
    void document.fonts?.ready.then(() => on && onResize());
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      detach();
    };
  }, []);

  return null;
}
