'use client';

import { useEffect, useRef, useState } from 'react';
import { about } from '@/content/pranava';

/**
 * 05 WHAT WE VALUE. One great circle at the centre of the dark ground holds a photograph of the
 * value in practice; round it the four Sanskrit words sit at the four quarters, like a
 * mandala. The word you point at, tap or tab to brightens and its photograph opens into the
 * circle; while nobody is choosing, the four take turns every few seconds (never with reduced
 * motion), and a fine brass ring turns slowly round the whole figure.
 *
 * On a phone the circle sits above and the four words stack beneath it, each one tappable.
 */
const PICS = [
  {
    src: '/media/stills/pr-ttc-dsc_0569-960.webp',
    alt: 'A row of practitioners in downward-facing dog on mats in an open hall',
  },
  {
    src: '/media/stills/pr-ttc-dsc_0191-960.webp',
    alt: 'Women seated in a circle on the floor of the hall in a study session, teachers seated behind',
  },
  {
    src: '/media/about-v2/values-ss-ven0194-960.webp',
    alt: 'Praṇav Śāstrī in conversation with a student, both mid-sentence',
  },
  {
    src: '/media/about-v2/values-ss-ven0052-960.webp',
    alt: 'A teacher bending to adjust a seated participant while others practise around them',
  },
];

export function A3Values() {
  const [on, setOn] = useState(0);
  const held = useRef(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
    });
    if (root.current) io.observe(root.current);
    const t = setInterval(() => {
      if (visible && !held.current) setOn((i) => (i + 1) % PICS.length);
    }, 3800);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  const pick = (i: number) => {
    held.current = true;
    setOn(i);
  };

  return (
    <section
      ref={root}
      className="a3-sec a3-val"
      aria-labelledby="a3-val-h"
      onMouseLeave={() => (held.current = false)}
    >
      <div className="a3-rail">
        <p className="a3-label a3-label--dark" data-a3r>
          <span className="a3-label__n">05</span>
          <span id="a3-val-h">What we value</span>
        </p>

        <div className="a3-val__mandala">
          <svg className="a3-val__ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="98" />
            <circle cx="100" cy="100" r="88" strokeDasharray="1 5" />
          </svg>

          <div className="a3-val__disc">
            {PICS.map((p, i) => (
              <img
                key={p.src}
                className={i === on ? 'is-on' : ''}
                src={p.src}
                alt={i === on ? p.alt : ''}
                aria-hidden={i === on ? undefined : true}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <ul className="a3-val__words" role="list">
            {about.values.map((v, i) => (
              <li key={v.name} className={`a3-val__q a3-val__q--${i}${i === on ? ' is-on' : ''}`}>
                <button
                  type="button"
                  className="a3-val__btn"
                  aria-pressed={i === on}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  onClick={() => pick(i)}
                >
                  <span className="a3-val__word">{v.name}</span>
                  <span className="a3-val__line">{v.body}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
