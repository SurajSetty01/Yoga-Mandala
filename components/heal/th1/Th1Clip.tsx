'use client';

import { useEffect } from 'react';

/**
 * Plate 1's clip. The still frame is always in the page; the video is laid over it only
 * while it can be seen.
 *
 *   near     (within half a screen)  the source is attached and buffering starts
 *   visible  (on screen)             it plays; off screen it pauses
 *   not near                         the source is released and the decoder freed
 *
 * The video fades in over the still once it is actually playing (`is-playing`), and out
 * again when released, so the plate never shows an empty or half-loaded video. Under
 * reduced motion nothing is attached at all, and a change of that setting while the page
 * is open is honoured.
 */
const REDUCE = '(prefers-reduced-motion: reduce)';

export function Th1Clip() {
  useEffect(() => {
    const plate = document.querySelector<HTMLElement>('[data-th1-held]');
    const video = plate?.querySelector<HTMLVideoElement>('video[data-src]');
    if (!plate || !video) return;
    const src = video.dataset.src!;
    const mq = matchMedia(REDUCE);
    let near = false;
    let visible = false;

    const onPlaying = () => plate.classList.add('is-playing');
    video.addEventListener('playing', onPlaying);

    const release = () => {
      plate.classList.remove('is-playing');
      video.pause();
      if (video.hasAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
    };
    const sync = () => {
      if (!near || mq.matches) return release();
      if (!video.hasAttribute('src')) {
        video.muted = true;
        video.preload = 'auto';
        video.src = src;
      }
      if (visible) void video.play().catch(() => {});
      else video.pause();
    };

    const approach = new IntersectionObserver(
      (entries) => {
        for (const e of entries) near = e.isIntersecting;
        sync();
      },
      { rootMargin: '50% 0px' },
    );
    const onScreen = new IntersectionObserver((entries) => {
      for (const e of entries) visible = e.isIntersecting;
      sync();
    });
    approach.observe(plate);
    onScreen.observe(plate);
    mq.addEventListener('change', sync);

    return () => {
      approach.disconnect();
      onScreen.disconnect();
      mq.removeEventListener('change', sync);
      video.removeEventListener('playing', onPlaying);
      release();
    };
  }, []);

  return null;
}
