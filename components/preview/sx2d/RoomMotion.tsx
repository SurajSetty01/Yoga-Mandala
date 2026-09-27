'use client';

import { useEffect } from 'react';

/**
 * The section's only client code. It writes ONE custom property, `--sx2d-fold`, on the
 * section: 0 while the section's top is at the bottom of the screen (the two photographs
 * lying flat beside the words), 1 by the time the room's centre is a little below the
 * middle of the screen (both walls standing). The stylesheet's default is 1, so the page
 * without this file, and the page under reduced motion, is the finished room.
 *
 * The rules, each one a bug this site has already shipped once:
 *   · one passive scroll listener that only raises a flag; every read of scrollY and every
 *     write happens inside one requestAnimationFrame;
 *   · geometry is measured on load, on resize and on a ResizeObserver tick, never per frame;
 *   · the property feeds `transform` and `opacity` only;
 *   · the reader's scroll position is never written to, and nothing intercepts wheel or
 *     touch;
 *   · under `prefers-reduced-motion: reduce` it attaches nothing and returns.
 */
export function RoomMotion() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.sx2d');
    const stage = section?.querySelector<HTMLElement>('.sx2d-stage');
    if (!section || !stage) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let top = 0;
    let height = 0;
    let vh = 0;
    let ticking = false;
    let last = -1;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      top = r.top + scrollY;
      height = r.height;
      vh = innerHeight;
    };

    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const ease = (t: number) => t * t * (3 - 2 * t);

    const frame = () => {
      ticking = false;
      const y = scrollY;
      /* from: the stage's top edge at the bottom of the screen
         to:   the stage's centre at 58% of the screen height          */
      const from = top - vh;
      const to = top + height / 2 - vh * 0.58;
      const fold = ease(clamp((y - from) / Math.max(1, to - from)));
      if (Math.abs(fold - last) < 0.0005) return;
      last = fold;
      section.style.setProperty('--sx2d-fold', fold.toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    const refresh = () => {
      measure();
      last = -1;
      onScroll();
    };

    measure();
    frame();

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', refresh);
    const ro = new ResizeObserver(refresh);
    ro.observe(stage);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', refresh);
      ro.disconnect();
      section.style.removeProperty('--sx2d-fold');
    };
  }, []);

  return null;
}
