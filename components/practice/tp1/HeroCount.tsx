'use client';

import { useEffect } from 'react';

/**
 * The hero's only client island: it attaches the take, proves it is playing, and lets the
 * film's own clock draw the strokes under the value line.
 *
 *   · Nothing runs under prefers-reduced-motion, on saveData or a 2G/3G connection, where
 *     MP4 cannot play, or at ≤760px (the phone shows a still). Each of those keeps the
 *     static state: the poster or the portrait, and three strokes already set.
 *   · Nothing is fetched before `load`: the take is on screen at scroll 0, and a 3.17 MB
 *     loop must not compete with the page's own fonts and pictures.
 *   · The figure is observed, never the clipped aperture (DESIGN-SYSTEM §1). The take plays
 *     only while the figure is on screen and the tab is visible, and is released — src
 *     dropped, load() — once it is a viewport and a half away, unless it has fully arrived.
 *   · The in-progress stroke is `transform: scaleX(currentTime / duration)`, written in one
 *     requestAnimationFrame that runs only while the take is playing. A loop is detected as
 *     the clock falling back, and sets the stroke down. When every slot is set the row is
 *     marked whole and the strokes join into one rule; counting stops, the film does not.
 */
export function HeroCount() {
  useEffect(() => {
    const root = document.getElementById('tp1-hero');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (matchMedia('(max-width: 760px)').matches) return;

    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (conn && (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))) return;
    if (!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"')) return;

    const host = root.querySelector<HTMLElement>('.tp1-film');
    const v = root.querySelector<HTMLVideoElement>('video.tp1-film__vid');
    const row = root.querySelector<HTMLElement>('.tp1-strokes');
    if (!host || !v || !row) return;
    const strokes = [...row.querySelectorAll<HTMLElement>('.tp1-stroke')];

    let next = strokes.findIndex((s) => !s.classList.contains('is-set'));
    let near = false;
    let ready = document.readyState === 'complete';
    let raf = 0;
    let last = -1;
    let settle: ReturnType<typeof setTimeout> | undefined;
    let poll: ReturnType<typeof setInterval> | undefined;
    let bound: AbortController | null = null;

    /* ── the count ─────────────────────────────────────────────────────────── */
    const commit = () => {
      const s = strokes[next];
      if (!s) return;
      s.style.transform = '';
      s.classList.add('is-set');
      next = strokes.findIndex((x) => !x.classList.contains('is-set'));
      if (next < 0) row.classList.add('is-whole');
    };

    const draw = () => {
      raf = 0;
      if (v.paused || next < 0 || !v.classList.contains('is-live')) return;
      const d = v.duration;
      const t = v.currentTime;
      if (d > 0 && Number.isFinite(d)) {
        if (last >= 0 && t + 0.5 < last) commit();
        last = t;
        const s = strokes[next];
        if (s) s.style.transform = `scaleX(${Math.min(1, t / d).toFixed(4)})`;
      }
      if (next >= 0) raf = requestAnimationFrame(draw);
    };
    const run = () => {
      if (!raf && next >= 0) raf = requestAnimationFrame(draw);
    };

    /* ── the take ──────────────────────────────────────────────────────────── */
    const stopPoll = () => {
      if (poll !== undefined) clearInterval(poll);
      poll = undefined;
    };

    const demand = () => {
      if (v.src) {
        if (v.paused && !document.hidden) void v.play()?.catch(() => {});
        return;
      }
      if (!ready) return;
      bound = new AbortController();
      const { signal } = bound;
      last = -1;
      v.src = v.dataset.src ?? '';
      v.load();

      /* proof, not optimism: the loop covers the poster only once it has decoded enough
         to play AND its clock has moved. */
      const prove = () => {
        if (v.readyState >= 3 && v.currentTime > 0) {
          v.classList.add('is-live');
          stopPoll();
          run();
        }
      };
      poll = setInterval(prove, 120);
      v.addEventListener('timeupdate', prove, { signal });
      v.addEventListener('play', run, { signal });
      v.addEventListener('canplay', () => void v.play()?.catch(() => {}), { once: true, signal });
      v.addEventListener(
        'error',
        () => {
          stopPoll();
          v.classList.remove('is-live');
        },
        { signal },
      );
      void v.play()?.catch(() => {});
    };

    /** has the whole file arrived? then nothing is in flight and nothing is dropped. */
    const settled = () => {
      const b = v.buffered;
      return v.duration > 0 && b.length > 0 && b.start(0) <= 0.05 && b.end(b.length - 1) >= v.duration - 0.25;
    };

    const release = () => {
      if (!v.src) return;
      v.pause();
      if (settled()) return;
      stopPoll();
      bound?.abort();
      bound = null;
      v.classList.remove('is-live');
      /* removeAttribute + load() aborts the transfer; src = '' would re-request the page */
      v.removeAttribute('src');
      v.load();
    };

    const onLoad = () => {
      ready = true;
      if (near) demand();
    };
    if (!ready) addEventListener('load', onLoad, { once: true });

    const film = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          near = e.isIntersecting;
          if (near) {
            if (v.src) demand();
            else if (settle === undefined)
              settle = setTimeout(() => {
                settle = undefined;
                if (near) demand();
              }, 180);
          } else {
            if (settle !== undefined) clearTimeout(settle);
            settle = undefined;
            if (v.src && !v.paused) v.pause();
          }
        }
      },
      { threshold: 0 },
    );
    const keep = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (!e.isIntersecting) release();
      },
      { rootMargin: '150% 0px 150% 0px', threshold: 0 },
    );
    film.observe(host);
    keep.observe(host);

    const onVis = () => {
      if (!v.src) return;
      if (document.hidden) v.pause();
      else if (near) void v.play()?.catch(() => {});
    };
    addEventListener('visibilitychange', onVis);

    return () => {
      removeEventListener('load', onLoad);
      removeEventListener('visibilitychange', onVis);
      film.disconnect();
      keep.disconnect();
      if (settle !== undefined) clearTimeout(settle);
      stopPoll();
      bound?.abort();
      if (raf) cancelAnimationFrame(raf);
      if (!v.paused) v.pause();
    };
  }, []);

  return null;
}
