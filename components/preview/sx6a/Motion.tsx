'use client';

import { useEffect } from 'react';

/**
 * The section's only client code, and it adds nothing a reader needs.
 *
 * THE LIFT. One IntersectionObserver watches a region that runs from the middle of the
 * sentence to the foot of the figure. When the sentence's middle rises above 60% of the
 * viewport, which is when its second half is being read, the figure takes `is-lifted`.
 * The upper band's photograph then makes ONE transition on `transform`: the crop rises off
 * the teacher's arm to the feet. When the sentence falls back below that line, the crop
 * returns and the arm is there again for a reader who goes back to the first half.
 *
 * There is no scroll listener, no rAF loop and no scroll-linked value, so nothing here can
 * hijack or even observe the scroll position. The reader only crosses a line. Measuring
 * the region's top (the one number CSS cannot know) happens on load and on resize.
 *
 * A single point cannot be used as the trigger, because a jump straight past it (Page Down,
 * a find-in-page, a restored scroll position) reports nothing. A region from the sentence to
 * the figure's foot is still intersecting, or is plainly above the line, wherever the reader
 * lands.
 *
 * Under `prefers-reduced-motion: reduce` nothing runs and `is-live` is never set. The crop
 * stays where the stylesheet puts it, with the arm at the band's edge above the sentence,
 * which is the still form of the same argument.
 */
export function Sx6aMotion() {
  useEffect(() => {
    const fig = document.querySelector<HTMLElement>('.sx6a-print');
    const say = fig?.querySelector<HTMLElement>('.sx6a-say');
    const line = fig?.querySelector<HTMLElement>('.sx6a-line');
    if (!fig || !say || !line) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const place = () => {
      const top = say.offsetTop + say.offsetHeight / 2;
      line.style.setProperty('--sx6a-line-top', `${Math.round(top)}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(fig);

    fig.classList.add('is-live');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const floor = e.rootBounds ? e.rootBounds.bottom : window.innerHeight * 0.6;
          fig.classList.toggle('is-lifted', e.isIntersecting || e.boundingClientRect.bottom < floor);
        }
      },
      { rootMargin: '0px 0px -40% 0px' },
    );
    io.observe(line);

    return () => {
      ro.disconnect();
      io.disconnect();
      fig.classList.remove('is-live', 'is-lifted');
    };
  }, []);

  return null;
}
