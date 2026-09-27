'use client';

import { useEffect } from 'react';

/**
 * The strike. Adds `is-struck` to `.th3` for one swing (the CSS keyframes do the rest) and
 * takes it off when the swing ends, so a strike is never cut short or restarted mid-swing.
 *
 * Struck by: the plate scrolling into view (once, so touch readers see it too), a mouse or
 * pen entering the plate, keyboard focus reaching the link, and a tap on it.
 *
 * Under prefers-reduced-motion it attaches nothing; the stylesheet already shows the
 * complete, still section.
 */
export function Th3Strike() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.querySelector<HTMLElement>('[data-th3]');
    const plate = root?.querySelector<HTMLElement>('.th3-plate');
    const hang = root?.querySelector<HTMLElement>('.th3-hang');
    const go = root?.querySelector<HTMLAnchorElement>('.th3-go');
    if (!root || !plate || !hang || !go) return;

    let busy = false;
    let timer = 0;
    const done = () => {
      busy = false;
      root.classList.remove('is-struck');
      clearTimeout(timer);
    };
    const strike = () => {
      if (busy) return;
      busy = true;
      root.classList.add('is-struck');
      timer = window.setTimeout(done, 3400);
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.animationName === 'th3-swing') done();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') strike();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') strike();
    };
    const onFocus = () => {
      if (go.matches(':focus-visible')) strike();
    };

    hang.addEventListener('animationend', onEnd);
    plate.addEventListener('pointerenter', onEnter);
    plate.addEventListener('pointerdown', onDown, { passive: true });
    go.addEventListener('focus', onFocus);

    let arrival = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          io.disconnect();
          arrival = window.setTimeout(strike, 350);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(plate);

    return () => {
      io.disconnect();
      clearTimeout(arrival);
      clearTimeout(timer);
      hang.removeEventListener('animationend', onEnd);
      plate.removeEventListener('pointerenter', onEnter);
      plate.removeEventListener('pointerdown', onDown);
      go.removeEventListener('focus', onFocus);
      root.classList.remove('is-struck');
    };
  }, []);

  return null;
}
