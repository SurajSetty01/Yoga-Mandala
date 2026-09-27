'use client';

import { useEffect } from 'react';

/**
 * The masthead's focus pull. One passive scroll listener that only raises a flag, one rAF,
 * geometry cached on load, resize and font load, nothing measured in the scroll path.
 *
 * It writes three numbers on `.tl1`:
 *   --d   the settle, 0 → 1 over ~0.9 screens: the veil collapses to the floor band and the
 *         words ride down into it. Eased out so the landing is slow.
 *   --s   the focus, 0 → 1 across the middle of the same distance: the sharp frame's opacity
 *         over the blurred one.
 * and, per resize, the caption and band heights (--tl1-capH, --tl1-band, --tl1-bandR) and how far the words sit
 * above their landing place at rest (--tl1-lift), so the words start centred in the space
 * below the navigation whatever the viewport.
 *
 * Under `prefers-reduced-motion: reduce` it does nothing: the stylesheet has already laid the
 * section out as its finished, static state.
 */
export function Tl1Motion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.querySelector<HTMLElement>('[data-tl1]');
    const stage = root?.querySelector<HTMLElement>('.tl1-stage');
    const frameEl = root?.querySelector<HTMLElement>('.tl1-frame');
    const band = root?.querySelector<HTMLElement>('.tl1-band');
    const say = root?.querySelector<HTMLElement>('.tl1-say');
    const cap = root?.querySelector<HTMLElement>('.tl1-cap');
    if (!root || !stage || !frameEl || !band || !say || !cap) return;

    let top = 0;
    let range = 1;
    const measure = () => {
      const H = frameEl.offsetHeight || innerHeight;
      top = stage.getBoundingClientRect().top + scrollY;
      range = Math.max(1, (stage.offsetHeight - H) * 0.9);
      /* the caption sits in the foot of the band; its wrapped height is reserved first */
      root.style.setProperty('--tl1-capH', `${cap.offsetHeight + 14}px`);
      const bandH = band.offsetHeight;
      /* the navigation pill's foot; the words must start below it */
      const pill = document.getElementById('pill');
      const pillB = Math.max(84, pill ? pill.getBoundingClientRect().bottom + 12 : 0);
      const sayTop = band.offsetTop + say.offsetTop;
      const sayH = say.offsetHeight;
      const target = pillB + Math.max(0, (H - pillB - sayH) / 2) * 0.92;
      const lift = Math.max(0, sayTop - target);
      root.style.setProperty('--tl1-band', `${bandH}px`);
      root.style.setProperty('--tl1-bandR', String(Math.min(1, bandH / H)));
      root.style.setProperty('--tl1-lift', `${Math.round(lift)}px`);
    };

    let queued = false;
    let lastD = -1;
    let lastS = -1;
    const smooth = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const frame = () => {
      queued = false;
      const p = Math.min(1, Math.max(0, (scrollY - top) / range));
      const d = Math.round((1 - (1 - p) ** 3) * 1000) / 1000;
      const s = Math.round(smooth(0.06, 0.72, p) * 1000) / 1000;
      if (d !== lastD) {
        lastD = d;
        root.style.setProperty('--d', String(d));
      }
      if (s !== lastS) {
        lastS = s;
        root.style.setProperty('--s', String(s));
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    frame();
    void document.fonts?.ready.then(onResize);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
