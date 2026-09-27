'use client';

import { useEffect } from 'react';

/**
 * The only client code in /practice/ §06. The section is complete before this runs, resting
 * at a fixed dusk (`--tp7-dim: 0.55` in the stylesheet).
 *
 * Motion allowed: one passive scroll listener raises a flag; one rAF writes `--tp7-dim`
 * (0 to 1, smoothstep) on the root as the section moves from 20% down the viewport (read lit first) to the
 * point where the footer has taken the lower part of the screen, clamped to the page's real
 * scroll end. CSS turns that one number into opacity on three layers. The loop slows with
 * it, from 1x to 0.55x. Geometry is measured on load and resize only.
 *
 * The clip is attached when it comes within 600px of the viewport and released (paused,
 * `src` removed) when it is 600px past; it fades in only once it is actually playing, over
 * its poster <img>, which is never removed. Save-Data leaves it unattached. Under
 * `prefers-reduced-motion: reduce` nothing runs, and switching it on mid-visit stops it all.
 */
export function Tp7Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tp7');
    if (!root) return;
    const vid = root.querySelector<HTMLVideoElement>('.tp7-vid');
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = !!conn?.saveData;

    let top = 0;
    let h = 0;
    let vh = 0;
    let maxY = 0;
    let raf = 0;
    let live = false;
    let near = false;
    let rate = 1;

    const measure = () => {
      const r = root.getBoundingClientRect();
      top = r.top + window.scrollY;
      h = r.height;
      vh = window.innerHeight;
      maxY = document.documentElement.scrollHeight - vh;
    };

    const tick = () => {
      raf = 0;
      const start = top - vh * 0.2;
      let end = Math.min(top + h - vh * 0.6, maxY);
      if (end - start < 80) end = start + 80;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const d = p * p * (3 - 2 * p);
      root.style.setProperty('--tp7-dim', d.toFixed(3));
      const want = 1 - 0.45 * d;
      if (Math.abs(want - rate) > 0.04) {
        rate = want;
        if (vid && near && vid.getAttribute('src')) vid.playbackRate = rate;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;

    const onPlaying = () => {
      if (!vid) return;
      vid.playbackRate = rate;
      vid.classList.add('is-on');
    };
    const attach = () => {
      if (!vid || saveData || vid.getAttribute('src') || !vid.dataset.src) return;
      vid.src = vid.dataset.src;
      vid.play().catch(() => {});
    };
    const release = () => {
      if (!vid || !vid.getAttribute('src')) return;
      vid.pause();
      vid.classList.remove('is-on');
      vid.removeAttribute('src');
      vid.load();
    };
    const io =
      vid && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const e = entries[entries.length - 1];
              if (!e) return;
              near = e.isIntersecting;
              if (near) attach();
              else release();
            },
            { rootMargin: '600px 0px' },
          )
        : null;

    const start = () => {
      if (live) return;
      live = true;
      measure();
      tick();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      ro?.observe(root);
      ro?.observe(document.body);
      vid?.addEventListener('playing', onPlaying);
      if (vid) io?.observe(vid);
    };

    const stop = () => {
      if (!live) return;
      live = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      near = false;
      release();
      vid?.removeEventListener('playing', onPlaying);
      root.style.removeProperty('--tp7-dim');
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
