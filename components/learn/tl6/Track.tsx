'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Where along the pinned scroll each beat lands, as a share of it: the four clauses, then
 * the join, the resolve and the enquiry route together.
 */
const BEATS = [0.04, 0.22, 0.4, 0.58, 0.78] as const;

/** the stylesheet's condition for any motion at all; see the foot of sec-tl6.css */
const MOTION = '(prefers-reduced-motion: no-preference) and (scripting: enabled)';

/**
 * The track, and the one script the section needs. It only ever writes `--step` (0 → 5)
 * on the section; the stylesheet's default is 5, the finished composition, so reduced
 * motion, no script and a browser without the media query all get the whole thing at once.
 *
 * PIN. When the composition fits the screen below the fixed nav, the stylesheet pins the
 * stage in a tall track and each beat is a share of the pinned scroll: one clause and its
 * photograph at a time, then the join.
 *
 * FLOW. When it does not fit (most phones once their toolbars are counted, a short laptop
 * window), `.tl6--flow` unpins it and each photograph arrives with its clause as it comes
 * up into the screen; the join follows when the resolve line does.
 *
 * The steps are whole numbers and the transitions carry each arrival, so a photograph is
 * never left half-drawn when the reader stops. One passive scroll listener and one rAF,
 * attached only while the section is near. The first measure suspends the transitions, so
 * nothing animates out as the page loads.
 */
export function Tl6Track({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    const root = track?.closest<HTMLElement>('.tl6');
    const stage = track?.firstElementChild;
    const body = stage?.firstElementChild;
    if (!track || !root || !(stage instanceof HTMLElement) || !(body instanceof HTMLElement)) return;
    if (!matchMedia(MOTION).matches) return;
    const pics = [...root.querySelectorAll<HTMLElement>('.tl6-pic')];
    const resolve = root.querySelector<HTMLElement>('.tl6-resolve');

    let raf = 0;
    let step = -1;
    let pin = false;
    let dead = false;

    const measure = () => {
      raf = 0;
      const vh = innerHeight;
      let n = 0;
      if (pin) {
        const r = track.getBoundingClientRect();
        const lead = 0.3 * vh;
        const p = (lead - r.top) / Math.max(1, r.height - vh + lead);
        n = BEATS.filter((b) => p >= b).length;
      } else {
        n = pics.filter((el) => el.getBoundingClientRect().top < 0.86 * vh).length;
        if (n === pics.length && resolve && resolve.getBoundingClientRect().top < 0.94 * vh) n += 1;
      }
      if (n !== step) {
        step = n;
        root.style.setProperty('--step', String(n));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    const decide = () => {
      if (dead) return;
      root.classList.remove('tl6--flow');
      const cs = getComputedStyle(stage);
      const room =
        Math.min(innerHeight, document.documentElement.clientHeight) -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom);
      pin = cs.position === 'sticky' && body.offsetHeight <= room;
      if (!pin) root.classList.add('tl6--flow');
      root.classList.add('tl6--settle');
      measure();
      void root.offsetWidth;
      requestAnimationFrame(() => root.classList.remove('tl6--settle'));
    };

    let near = false;
    const io = new IntersectionObserver(
      (entries) => {
        const now = entries.some((e) => e.isIntersecting);
        if (now !== near) {
          near = now;
          if (now) addEventListener('scroll', onScroll, { passive: true });
          else removeEventListener('scroll', onScroll);
        }
        measure();
      },
      { rootMargin: '50% 0px' },
    );

    decide();
    io.observe(track);
    addEventListener('resize', decide, { passive: true });
    document.fonts?.ready.then(() => decide()).catch(() => {});

    return () => {
      dead = true;
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', decide);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('tl6--flow', 'tl6--settle');
      root.style.removeProperty('--step');
    };
  }, []);

  return (
    <div className="tl6-track" ref={ref}>
      <div className="tl6-stage">{children}</div>
    </div>
  );
}
