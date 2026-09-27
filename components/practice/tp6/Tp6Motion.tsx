'use client';

import { useEffect } from 'react';

/**
 * The only client code in /practice/ §05. The section is complete before this runs: both
 * sentences, with the four frames already around them — the enclosed state.
 *
 * Motion allowed, and only when the clearing fits the viewport whole: adds `.tp6-live`,
 * which pins the stage for a run about 1.6 viewports long. Progress through the run slides
 * each frame in from its own edge — top, right, bottom, left, overlapping in time — and
 * then lets the intention land in the clearing. Transforms and opacity only, written in one
 * rAF from one passive scroll listener; geometry is read on load and on resize.
 *
 * Frames that start outside a clipped stage are invisible to native lazy loading, so the
 * four images are switched to eager as the section approaches. Under
 * `prefers-reduced-motion: reduce` nothing is added, and turning it on mid-visit takes the
 * live layout away again.
 */

type Edge = 'top' | 'right' | 'bottom' | 'left';

/** When each frame travels, as fractions of the run: clockwise, overlapping. */
const WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [0.05, 0.31],
  [0.22, 0.48],
  [0.39, 0.65],
  [0.56, 0.82],
];
const INTENT: readonly [number, number] = [0.8, 0.94];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const phase = (p: number, [a, b]: readonly [number, number]) => ease(clamp01((p - a) / (b - a)));

export function Tp6Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tp6');
    const run = root?.querySelector<HTMLElement>('.tp6-run');
    const stage = root?.querySelector<HTMLElement>('.tp6-stage');
    const field = root?.querySelector<HTMLElement>('.tp6-field');
    const intent = root?.querySelector<HTMLElement>('.tp6-intent');
    if (!root || !run || !stage || !field || !intent) return;

    const figs = Array.from(root.querySelectorAll<HTMLElement>('.tp6-fig'));
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('.tp6-img'));
    const mq = matchMedia('(prefers-reduced-motion: reduce)');

    // A frame parked outside the clipped stage never intersects, so lazy would never fire.
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              if (!entries.some((e) => e.isIntersecting)) return;
              for (const img of imgs) img.loading = 'eager';
              io?.disconnect();
            },
            { rootMargin: '150% 0px 150% 0px' },
          )
        : null;
    io?.observe(root);

    let top = 0;
    let span = 1;
    let raf = 0;
    let live = false;
    let from: Array<[number, number]> = figs.map(() => [0, 0]);

    const clearInline = () => {
      for (const f of figs) f.style.transform = '';
      intent.style.opacity = '';
      intent.style.transform = '';
    };

    /** Does the enclosed state fit the held screen? Measured with nothing displaced. */
    const fits = () => field.scrollHeight <= stage.clientHeight + 2;

    const measure = () => {
      clearInline();
      const r = run.getBoundingClientRect();
      top = r.top + window.scrollY;
      span = Math.max(1, r.height - document.documentElement.clientHeight);
      const W = field.clientWidth;
      const H = field.clientHeight;
      const pad = 12;
      from = figs.map((f) => {
        const edge = f.dataset.tp6Edge as Edge;
        if (edge === 'top') return [0, -(f.offsetTop + f.offsetHeight + pad)];
        if (edge === 'bottom') return [0, H - f.offsetTop + pad];
        if (edge === 'right') return [W - f.offsetLeft + pad, 0];
        return [-(f.offsetLeft + f.offsetWidth + pad), 0];
      });
    };

    const tick = () => {
      raf = 0;
      if (!live) return;
      const p = clamp01((window.scrollY - top) / span);
      figs.forEach((f, i) => {
        const k = 1 - phase(p, WINDOWS[i] ?? [0, 1]);
        const [dx, dy] = from[i] ?? [0, 0];
        f.style.transform = k ? `translate3d(${(dx * k).toFixed(1)}px, ${(dy * k).toFixed(1)}px, 0)` : '';
      });
      const e = phase(p, INTENT);
      intent.style.opacity = String(Number(e.toFixed(3)));
      intent.style.transform = e < 1 ? `translate3d(0, ${((1 - e) * 14).toFixed(1)}px, 0)` : '';
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const goLive = () => {
      root.classList.add('tp6-live');
      clearInline();
      if (!fits()) {
        root.classList.remove('tp6-live');
        return false;
      }
      return true;
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      live = false;
      root.classList.remove('tp6-live');
      clearInline();
    };

    const refresh = () => {
      if (mq.matches) {
        stop();
        return;
      }
      live = goLive();
      if (!live) {
        stop();
        return;
      }
      measure();
      tick();
    };

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(refresh, 120);
    };

    // The page moving under the run (images above loading, say) only needs re-reading; the
    // fit itself is re-judged when the viewport or the type changes, never from here, so a
    // section that does not fit cannot toggle itself in and out.
    const onReflow = () => {
      if (!live) return;
      measure();
      tick();
    };

    refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    mq.addEventListener('change', refresh);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onReflow) : null;
    ro?.observe(document.body);

    return () => {
      clearTimeout(rt);
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', refresh);
      stop();
    };
  }, []);

  return null;
}
