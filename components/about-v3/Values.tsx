'use client';

import { useEffect, useRef, useState } from 'react';
import { about } from '@/content/pranava';

/**
 * WHAT WE VALUE. Four tall photographs side by side, one per value, each showing the value
 * in the centre's own life: Praṇav seated alone under the banyan (Sādhana), Praṇav seated
 * before a listening group (Adhyayana), the panel in dialogue under the Praṇava emblem
 * (Viveka), a teacher's hand guiding a student in class (Sevā).
 *
 * One panel is open at a time: it widens to show its whole photograph with the word and its
 * line; the other three stay narrow with their word running up the edge. Pointing, tapping
 * or tabbing opens a panel, and while nobody is choosing they take turns. On a phone all four
 * are simply open, one full-width photograph after another, with nothing to trigger.
 */
const PICS = [
  {
    src: '/media/about-v2/approach-seated-1620.webp',
    set: '/media/about-v2/approach-seated-960.webp 960w, /media/about-v2/approach-seated-1620.webp 1620w',
    alt: 'Praṇav Śāstrī seated cross-legged at the foot of a banyan tree in the morning light',
    pos: '58% 60%',
  },
  {
    src: '/media/about-v3/ss-dsc07139-1280.webp',
    set: '/media/about-v3/ss-dsc07139-1280.webp 1280w, /media/about-v3/ss-dsc07139-1920.webp 1920w',
    alt: 'Praṇav Śāstrī seated on a stool before a group of students listening',
    pos: '32% 45%',
  },
  {
    src: '/media/about-v3/ss-dsc07144-1280.webp',
    set: '/media/about-v3/ss-dsc07144-1280.webp 1280w, /media/about-v3/ss-dsc07144-1920.webp 1920w',
    alt: 'A panel of four in conversation beneath the Praṇava emblem, Praṇav Śāstrī speaking',
    pos: '72% 50%',
  },
  {
    src: '/media/about-v3/values-seva-1080.webp',
    set: '/media/about-v3/values-seva-640.webp 640w, /media/about-v3/values-seva-1080.webp 1080w',
    alt: 'A teacher guiding a student with a hand on her back during a class',
    pos: '50% 40%',
  },
];

export function A3Values() {
  const [on, setOn] = useState(0);
  const held = useRef(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const narrow = matchMedia('(max-width: 899px)');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* wide screens: take turns while in view and nobody is choosing */
    let visible = false;
    const vis = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
    });
    vis.observe(el);
    const t = reduce
      ? 0
      : window.setInterval(() => {
          if (visible && !held.current && !narrow.matches) setOn((i) => (i + 1) % PICS.length);
        }, 4800);

    return () => {
      vis.disconnect();
      if (t) clearInterval(t);
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
        <h2 className="a3-val__h" id="a3-val-h">
          What we value
        </h2>
        <ul className="a3-val__panels" role="list">
          {about.values.map((v, i) => {
            const p = PICS[i];
            return (
              <li
                key={v.name}
                data-i={i}
                className={`a3-val__panel${i === on ? ' is-on' : ''}`}
              >
                <button
                  type="button"
                  className="a3-val__btn"
                  aria-expanded={i === on}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  onClick={() => pick(i)}
                >
                  {p ? (
                    <img
                      src={p.src}
                      srcSet={p.set}
                      sizes="(min-width: 900px) 60vw, 100vw"
                      alt={p.alt}
                      style={{ objectPosition: p.pos }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="a3-val__shade" aria-hidden="true" />
                  <span className="a3-val__tab" aria-hidden="true">
                    {v.name}
                  </span>
                  <span className="a3-val__text">
                    <span className="a3-val__word">{v.name}</span>
                    <span className="a3-val__line">{v.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
