'use client';

import { useEffect } from 'react';

/** clears the fixed pill: its bottom edge is 68px at 390 and 85px at 1440 */
const PILL = 104;
/** the hold, as a fraction of the screen — must match `.tl4-hold` in sec-tl4.css */
const HOLD = 0.7;

/**
 * The section's only client island.
 *
 * One passive scroll listener raises a flag; one requestAnimationFrame writes ONE number per
 * list item, `--q`, from 0 (scattered) to 1 (packed). The CSS default of `--q` is 1, so this
 * file can only ever START the band scattered; it can never leave it unfinished. The
 * listener only works while the section is near the viewport. Under reduced motion it
 * writes nothing at all, and if the preference switches on mid-visit every figure is
 * returned to the band and the hold is dropped.
 *
 * HELD (wide band, and the whole stage fits below the pill): the stage is sticky for 70% of
 * a screen and the five close left to right across the hold, the last landing at 90% of it.
 * NOT HELD (phones, short screens): each item closes as its own top climbs from the bottom
 * of the screen to 62% of it, so a phone's column closes row by row, top to bottom.
 */
export function Tl4Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tl4-forms');
    const track = root?.querySelector<HTMLElement>('.tl4-track');
    const stage = root?.querySelector<HTMLElement>('.tl4-in');
    if (!root || !track || !stage) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.tl4-it'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 900px)');

    let raf = 0;
    let near = false;
    let live = false;
    let held = false;
    let top = PILL;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

    const measure = () => {
      const vh = window.innerHeight;
      const h = stage.offsetHeight;
      held = wide.matches && h <= vh - PILL - 16;
      top = Math.max(PILL, Math.round((vh - h) / 2 + 24));
      root.classList.toggle('is-held', held);
      root.style.setProperty('--tl4-top', `${top}px`);
    };

    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (held) {
        const p = (top - track.getBoundingClientRect().top) / (vh * HOLD);
        items.forEach((el, i) => {
          el.style.setProperty('--q', ease(clamp01((p - i * 0.075) / 0.6)).toFixed(4));
        });
        return;
      }
      const lagStep = wide.matches ? 0.03 : 0;
      items.forEach((el, i) => {
        const t = (vh * 0.98 - el.getBoundingClientRect().top - i * lagStep * vh) / (vh * 0.36);
        el.style.setProperty('--q', ease(clamp01(t)).toFixed(4));
      });
    };
    const request = () => {
      if (live && near && !raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      request();
    };

    const io = new IntersectionObserver(
      (entries) => {
        near = entries.some((e) => e.isIntersecting);
        request();
      },
      { rootMargin: '30% 0px 30% 0px' },
    );

    const start = () => {
      if (live) return;
      live = true;
      root.classList.add('is-live');
      measure();
      io.observe(root);
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', onResize);
      tick();
    };
    const stop = () => {
      live = false;
      io.disconnect();
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      root.classList.remove('is-live', 'is-held');
      items.forEach((el) => el.style.removeProperty('--q'));
    };
    const onPref = () => (reduce.matches ? stop() : start());

    if (!reduce.matches) start();
    reduce.addEventListener('change', onPref);
    return () => {
      reduce.removeEventListener('change', onPref);
      stop();
    };
  }, []);

  return null;
}
