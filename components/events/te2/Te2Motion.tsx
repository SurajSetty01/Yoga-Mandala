'use client';

import { useEffect } from 'react';
import { PRINTS } from './frames';

/**
 * The only client code in Events 01. The section is complete before this runs.
 *
 * The live layout (a held stage, the prints stacked in one grid cell) is CSS, gated by the
 * same query as LIVE below, so there is no shift when this hydrates. This only writes each
 * print's transform from scroll progress through .te2-run: print i lifts during step i,
 * swings across with a small rise, and settles scaled down onto the aside pile.
 *
 * One passive scroll listener that only raises a flag, one rAF. Geometry is read on load
 * and on resize. Under reduced motion, or on a window too short to hold the stage, nothing
 * is written and the loose static spread is what shows.
 */
const LIVE = '(prefers-reduced-motion: no-preference) and (min-height: 560px)';

/** steps of scroll before the first lift, and held on the blank card after the last */
const LEAD_IN = 0.3;
const HOLD = 0.5;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function Te2Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.te2');
    const run = root?.querySelector<HTMLElement>('.te2-run');
    const pile = root?.querySelector<HTMLElement>('.te2-pile');
    const aside = root?.querySelector<HTMLElement>('.te2-aside');
    if (!root || !run || !pile || !aside) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-te2-i]'));
    const blank = root.querySelector<HTMLElement>('.te2-print--blank');
    const n = els.length;
    const ts: number[] = els.map(() => 0);
    const mq = matchMedia(LIVE);

    let top = 0;
    let span = 1;
    let dx = 0;
    let dy = 0;
    let s = 0.4;
    let aw = 300;
    let raf = 0;
    let live = false;
    const last: number[] = els.map(() => -1);

    const measure = () => {
      const r = run.getBoundingClientRect();
      top = r.top + window.scrollY;
      span = Math.max(1, r.height - document.documentElement.clientHeight);
      // offsetLeft/Top are layout positions, untouched by the transforms written below
      const pw = pile.offsetWidth || 1;
      const ph = pile.offsetHeight || 1;
      aw = aside.offsetWidth;
      const ah = aside.offsetHeight;
      dx = aside.offsetLeft + aw / 2 - (pile.offsetLeft + pw / 2);
      dy = aside.offsetTop + ah / 2 - (pile.offsetTop + ph / 2);
      s = Math.min(aw / pw, ah / ph);
      last.fill(-1);
    };

    const place = (el: HTMLElement, i: number, t: number) => {
      const p = PRINTS[i];
      if (!p) return;
      const e = ease(t);
      const up = Math.sin(Math.PI * t);
      const x = lerp(p.x, dx + p.ax * aw, e);
      const y = lerp(p.y, dy + p.ay * aw, e) + up * 36;
      const r = lerp(p.r, p.ar, e) + up * (i % 2 ? -3 : 3);
      const k = lerp(1, s, e) * (1 + up * 0.035);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${r.toFixed(2)}deg) scale(${k.toFixed(4)})`;
      el.style.setProperty('--lift', up.toFixed(3));
      el.style.zIndex = String(t <= 0 ? 10 - i : t >= 1 ? 20 + i : 40);
    };

    const tick = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / span));
      const u = p * (n + LEAD_IN + HOLD) - LEAD_IN;
      let done = 0;
      els.forEach((el, i) => {
        const t = Math.min(1, Math.max(0, u - i));
        ts[i] = t;
        if (t >= 1) done++;
        if (t === last[i]) return;
        last[i] = t;
        place(el, i, t);
      });
      // A caption lying under another sheet of paper is switched off, so the only captions
      // showing are the ones a reader can actually see: the top of each pile and the print
      // in the hand. The next print's caption comes up once the lifted one has cleared it.
      els.forEach((el, i) => {
        const t = ts[i] ?? 0;
        const on =
          t > 0 && t < 1
            ? true
            : t === 0
              ? i === 0 || (ts[i - 1] ?? 0) >= 0.85
              : i === n - 1 || (ts[i + 1] ?? 0) < 0.5;
        el.dataset.te2Cap = on ? 'on' : 'off';
      });
      if (blank) blank.dataset.te2Cap = (ts[n - 1] ?? 0) >= 0.85 ? 'on' : 'off';
      root.dataset.te2Lifted = String(done);
      root.dataset.te2Started = u > 0 ? '1' : '0';
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;

    const start = () => {
      if (live) return;
      live = true;
      measure();
      tick();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      ro?.observe(run);
      ro?.observe(pile);
    };

    const stop = () => {
      if (!live) return;
      live = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      els.forEach((el, i) => {
        el.style.transform = '';
        el.style.removeProperty('--lift');
        el.style.zIndex = String(10 - i);
        delete el.dataset.te2Cap;
      });
      if (blank) delete blank.dataset.te2Cap;
      delete root.dataset.te2Lifted;
      delete root.dataset.te2Started;
    };

    const onPref = () => (mq.matches ? start() : stop());
    onPref();
    mq.addEventListener('change', onPref);

    return () => {
      mq.removeEventListener('change', onPref);
      stop();
    };
  }, []);

  return null;
}
