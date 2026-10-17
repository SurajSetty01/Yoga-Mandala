'use client';

import { useEffect, useRef, useState } from 'react';
import { about } from '@/content/pranava';

/**
 * 05 WHAT WE VALUE. The client: keep the four values; Viveka should be "a teacher/student
 * discussion, reading or reflection photograph"; Sevā "community, teaching, mentorship".
 *
 * The four Sanskrit words are the section: set large in a column on the deep ground, each
 * with its one line. Beside them one photograph at a time shows the value in practice; the
 * word you point at, tap or tab to selects it, and while nobody is choosing it moves on by
 * itself every few seconds (never with reduced motion). On a phone each value carries its
 * own photograph inline and nothing changes on its own.
 */
const PICS = [
  {
    src: '/media/stills/pr-ttc-dsc_0569-960.webp',
    set: '/media/stills/pr-ttc-dsc_0569-480.webp 480w, /media/stills/pr-ttc-dsc_0569-960.webp 960w',
    alt: 'A row of practitioners in downward-facing dog on mats in an open hall',
  },
  {
    src: '/media/stills/pr-ttc-dsc_0191-960.webp',
    set: '/media/stills/pr-ttc-dsc_0191-480.webp 480w, /media/stills/pr-ttc-dsc_0191-960.webp 960w',
    alt: 'Women seated in a circle on the floor of the hall in a study session, teachers seated behind',
  },
  {
    src: '/media/about-v2/values-ss-ven0194-960.webp',
    set: '/media/about-v2/values-ss-ven0194-480.webp 480w, /media/about-v2/values-ss-ven0194-960.webp 960w',
    alt: 'Praṇav Śāstrī in conversation with a student, both mid-sentence',
  },
  {
    src: '/media/about-v2/values-ss-ven0052-960.webp',
    set: '/media/about-v2/values-ss-ven0052-480.webp 480w, /media/about-v2/values-ss-ven0052-960.webp 960w',
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
    }, 4200);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={root}
      className="a3-sec a3-val"
      aria-labelledby="a3-val-h"
      onMouseLeave={() => (held.current = false)}
    >
      <div className="a3-rail a3-val__grid">
        <div className="a3-val__copy">
          <p className="a3-label a3-label--dark" data-a3r>
            <span className="a3-label__n">05</span>
            <span id="a3-val-h">What we value</span>
          </p>
          <ul className="a3-val__list" role="list">
            {about.values.map((v, i) => (
              <li key={v.name} className={`a3-val__row${i === on ? ' is-on' : ''}`}>
                <button
                  type="button"
                  className="a3-val__btn"
                  aria-pressed={i === on}
                  onMouseEnter={() => {
                    held.current = true;
                    setOn(i);
                  }}
                  onFocus={() => {
                    held.current = true;
                    setOn(i);
                  }}
                  onClick={() => {
                    held.current = true;
                    setOn(i);
                  }}
                >
                  <span className="a3-val__word">{v.name}</span>
                  <span className="a3-val__line">{v.body}</span>
                </button>
                {/* phones: each value's own photograph, inline */}
                <img
                  className="a3-val__inline"
                  src={PICS[i]?.src}
                  srcSet={PICS[i]?.set}
                  sizes="100vw"
                  alt={PICS[i]?.alt ?? ''}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="a3-val__stage" aria-hidden="true">
          {PICS.map((p, i) => (
            <img
              key={p.src}
              className={i === on ? 'is-on' : ''}
              src={p.src}
              srcSet={p.set}
              sizes="(min-width: 1000px) 52vw, 0px"
              alt=""
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
