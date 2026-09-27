'use client';

import { useEffect } from 'react';

/**
 * The only client code in /events/ §02. The section is complete before this runs: the
 * message is already printed in the blank frame and the caption is already there.
 *
 * If motion is allowed and the frame is still below the fold, this adds `.te3-armed`
 * (the message and caption are withheld, instantly, off-screen), then `.te3-inked` once
 * the frame is well into view, and the CSS writes them in. A frame that is already on
 * screen when this runs is left alone, so nothing that has been seen ever disappears.
 * One IntersectionObserver, released after it fires.
 */
export function Te3Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.te3');
    const frame = root?.querySelector<HTMLElement>('.te3-paper');
    if (!root || !frame || !('IntersectionObserver' in window)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (frame.getBoundingClientRect().top < window.innerHeight) return;

    root.classList.add('te3-armed');
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        root.classList.add('te3-inked');
        io.disconnect();
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.35 },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  return null;
}
