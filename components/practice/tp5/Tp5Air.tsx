'use client';

import { useEffect, useRef } from 'react';

/**
 * §04's one client island, and it only runs the leaves, under the site's video contract:
 *
 *  · Nothing is attached under reduced motion, Save-Data or a 2G connection: the poster
 *    stands, and the section is complete.
 *  · The source is attached on approach (900px out) and plays only while the window is on
 *    screen and the tab is visible. The loop is a clock, not a scroll position: nothing here
 *    reads scrollY.
 *  · The video fades in only once it is really moving, so a stall or a blocked autoplay
 *    leaves the poster on screen.
 *  · It is released when well past (2200px out), unless the whole file is already buffered,
 *    because then a reader coming back would pay for it twice.
 */
export function Tp5Air() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('.tp5');
    const win = root?.querySelector<HTMLElement>('.tp5-air-win');
    const video = win?.querySelector<HTMLVideoElement>('.tp5-air-vid');
    if (!win || !video) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? ''))) return;

    let attached = false;
    let seen = false;

    const settle = () => {
      if (attached && seen && !document.hidden) {
        const p = video.play();
        if (p) p.catch(() => {});
      } else if (attached) {
        video.pause();
      }
    };

    const attach = () => {
      if (attached) return;
      const s = video.dataset.src;
      if (!s) return;
      video.src = s;
      video.preload = 'auto';
      video.load();
      attached = true;
      settle();
    };

    const release = () => {
      if (!attached) return;
      const b = video.buffered;
      const done =
        b.length > 0 &&
        Number.isFinite(video.duration) &&
        b.end(b.length - 1) >= video.duration - 0.2;
      video.pause();
      video.classList.remove('is-live');
      if (done) return;
      video.removeAttribute('src');
      video.load();
      attached = false;
    };

    const onPlaying = () => {
      const check = () => {
        if (!video.paused && video.readyState >= 3 && video.currentTime > 0) {
          video.classList.add('is-live');
        } else if (!video.paused) {
          requestAnimationFrame(check);
        }
      };
      check();
    };
    video.addEventListener('playing', onPlaying);

    const near = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) attach();
      },
      { rootMargin: '900px 0px' },
    );
    const view = new IntersectionObserver((es) => {
      for (const e of es) seen = e.isIntersecting;
      settle();
    });
    const far = new IntersectionObserver(
      (es) => {
        for (const e of es) if (!e.isIntersecting) release();
      },
      { rootMargin: '2200px 0px' },
    );
    near.observe(win);
    view.observe(win);
    far.observe(win);

    const onVis = () => settle();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      near.disconnect();
      view.disconnect();
      far.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      video.removeEventListener('playing', onPlaying);
      video.pause();
    };
  }, []);

  return <span ref={ref} hidden />;
}
