'use client';

import { useEffect } from 'react';

/**
 * The section's only client island. It writes ONE custom property, `--sx1c-land`, from 0
 * (the plate held above the paper) to 1 (set down in its marks), and — in the spread layout
 * only — one length, `--sx1c-stick`, the sticky offset that keeps a spread taller than the
 * viewport pinned by its foot instead of by its head.
 *
 * The stylesheet owns every start state, under `html.js` (added pre-paint by the root
 * layout), so the first paint is already the lifted plate and nothing jumps when this file
 * mounts. It also owns every finished state: with no JavaScript `--sx1c-land` is 1; under
 * `prefers-reduced-motion: reduce` the stylesheet pins it to 1 and this file returns before
 * attaching anything.
 *
 * Rules kept, each one a bug this site has already shipped:
 *   · ONE passive scroll listener that only raises a flag; every read of scrollY and every
 *     write is inside one requestAnimationFrame.
 *   · Geometry is measured on load, on resize and on a ResizeObserver tick — never per frame.
 *   · The property feeds `transform` and `opacity` only.
 *   · The reader's scroll position is never written. No wheel or touch interception.
 */
export function SX1CMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.sx1c-hero');
    const spread = hero?.querySelector<HTMLElement>('.sx1c-spread');
    const frameEl = hero?.querySelector<HTMLElement>('.sx1c-frame');
    if (!hero || !spread || !frameEl) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wide = matchMedia('(min-width: 960px) and (min-aspect-ratio: 1/1)');
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    /* smoothstep: nothing starts or stops on a corner, so the plate eases off the hand and
       eases onto the page, and the middle of the move is where the reader is looking */
    const settle = (t: number) => t * t * (3 - 2 * t);

    let isWide = wide.matches;
    let heroTop = 0; // document y of the section
    let lead = 0; // scroll before the spread sticks (spread taller than the viewport)
    let hold = 1; // scroll the spread is held for
    let frameTop = 0; // document y of the plate, stacked layout
    let vh = 1;

    function measure() {
      if (!hero || !spread || !frameEl) return;
      isWide = wide.matches;
      vh = innerHeight || 1;
      const y = scrollY;
      heroTop = hero.getBoundingClientRect().top + y;
      if (isWide) {
        const h = spread.offsetHeight;
        lead = Math.max(0, h - vh);
        hero.style.setProperty('--sx1c-stick', `${Math.min(0, vh - h)}px`);
        /* the hold is 42svh in the stylesheet; read it back rather than trusting a copy */
        hold = Math.max(1, hero.offsetHeight - h);
      } else {
        hero.style.removeProperty('--sx1c-stick');
        frameTop = frameEl.getBoundingClientRect().top + y;
      }
    }

    function frame() {
      queued = false;
      if (!hero) return;
      const y = scrollY; // the one read
      let p: number;
      if (isWide) {
        /* 0 at the top of the page, 1 at the end of the hold */
        p = (y - heroTop - lead) / hold;
      } else {
        /* 0 as the plate's head enters the foot of the screen, 1 when it is a quarter of the
           way down it — so the middle of the landing happens in the middle of the screen */
        p = (y + vh - frameTop) / (vh * 0.75);
      }
      hero.style.setProperty('--sx1c-land', settle(clamp(p)).toFixed(4));
    }

    let queued = false;
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
    hero.classList.add('is-live');

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);
    wide.addEventListener('change', onResize);
    /* fonts re-wrap the leaf and the photograph decodes after first paint: re-measure on
       the section's own size rather than guessing when that has settled */
    const ro = new ResizeObserver(onResize);
    ro.observe(hero);

    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      wide.removeEventListener('change', onResize);
      hero.classList.remove('is-live');
      hero.style.removeProperty('--sx1c-land');
      hero.style.removeProperty('--sx1c-stick');
    };
  }, []);

  return null;
}
