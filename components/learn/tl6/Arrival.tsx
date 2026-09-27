'use client';

import { useEffect, useRef } from 'react';
import { ARRIVAL } from './frames';

/**
 * The arrival, and the one script the section needs.
 *
 * 1. PROGRESS. `--p` on the section runs 0 → 1 as the four paths pass through the viewport:
 *    0 when the first panel's top is 88% down the screen, 1 when the arrival's top reaches
 *    78%, so the paths have met by the time the place they meet at is in view. One passive
 *    scroll listener, one rAF, only while the section is near. The stylesheet's default is
 *    `--p: 1`, so without script, and under reduced motion (never set), the reader gets
 *    the met state: the complete picture, not a start state waiting for a scroll.
 *
 * 2. THE CLIP. Attached when the section comes within half a screen, released (src removed,
 *    decoder freed) once it is that far past. No `poster` attribute: the visible <img>
 *    beneath is the poster, and a poster attribute would fetch the frame a second time.
 *    The video fades in on `playing`, so the reader never sees a black box. It loops before
 *    the pan at the end of the take. Reduced motion: never attached; the still stands.
 */
export function Tl6Arrival() {
  const fig = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const f = fig.current;
    const v = vid.current;
    const root = f?.closest<HTMLElement>('.tl6');
    if (!f || !v || !root) return;
    const first = root.querySelector<HTMLElement>('.tl6-path');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let last = -1;
    const measure = () => {
      raf = 0;
      if (!first) return;
      const vh = innerHeight;
      const top = first.getBoundingClientRect().top;
      const arr = f.getBoundingClientRect().top;
      const span = Math.max(1, 0.1 * vh + (arr - top));
      const t = Math.min(1, Math.max(0, (0.88 * vh - top) / span));
      const e = t * t * (3 - 2 * t);
      if (Math.abs(e - last) > 0.001) {
        last = e;
        root.style.setProperty('--p', e.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    const onPlaying = () => f.classList.add('tl6-is-playing');
    const onTime = () => {
      if (v.currentTime >= ARRIVAL.loopEnd) v.currentTime = 0;
    };
    v.addEventListener('playing', onPlaying);
    v.addEventListener('timeupdate', onTime);

    let near = false;
    const io = new IntersectionObserver(
      (entries) => {
        const now = entries.some((e) => e.isIntersecting);
        if (now === near) return;
        near = now;
        if (now) {
          if (!reduce) {
            addEventListener('scroll', onScroll, { passive: true });
            addEventListener('resize', onScroll, { passive: true });
            measure();
            if (!v.getAttribute('src')) {
              v.src = ARRIVAL.src;
              v.play().catch(() => {});
            }
          }
        } else {
          removeEventListener('scroll', onScroll);
          removeEventListener('resize', onScroll);
          if (v.getAttribute('src')) {
            v.pause();
            v.removeAttribute('src');
            v.load();
            f.classList.remove('tl6-is-playing');
          }
        }
      },
      { rootMargin: '50% 0px' },
    );
    io.observe(root);

    if (!reduce) {
      /* the section usually starts below the fold: settle the start state at once, so the
         met default from the stylesheet is never what scrolls into view */
      measure();
    }

    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('timeupdate', onTime);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure className="tl6-arrival" ref={fig}>
      <picture>
        <source type="image/avif" srcSet={ARRIVAL.posterAvif} />
        <img
          className="tl6-arrival__still"
          src={ARRIVAL.poster}
          width={ARRIVAL.w}
          height={ARRIVAL.h}
          alt={ARRIVAL.alt}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <video
        className="tl6-arrival__clip"
        ref={vid}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </figure>
  );
}
