'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '@/content/pranava';

/**
 * WHAT WE VALUE. A circle in four quarters, one for each value, each quarter a slice of its
 * own photograph. The section holds still while the reader scrolls through it: with each
 * quarter of the scroll the lit quarter turns to the next value, that value's photograph
 * opens whole in the centre, a brass arc sweeps a further quarter round the rim, and the word
 * and its line take the stage beside it. Then the page moves on.
 *
 * With reduced motion nothing holds: the circle sits still with all four quarters lit and the
 * four values are listed beside it.
 */
const PICS = [
  { src: '/media/stills/pr-ttc-dsc_0569-960.webp', alt: 'A row of practitioners in downward-facing dog on mats in an open hall' },
  { src: '/media/stills/pr-ttc-dsc_0191-960.webp', alt: 'Women seated in a circle in a study session, teachers seated behind' },
  { src: '/media/about-v2/values-ss-ven0194-960.webp', alt: 'Praṇav Śāstrī in conversation with a student' },
  { src: '/media/about-v2/values-ss-ven0052-960.webp', alt: 'A teacher bending to adjust a seated participant while others practise' },
];
/* quarter wedges, clockwise from the top-right */
const WEDGE = [
  'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)',
  'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
  'polygon(50% 50%, 50% 100%, 0 100%, 0 50%)',
  'polygon(50% 50%, 0 50%, 0 0, 50% 0)',
];

export function A3Values() {
  const [on, setOn] = useState(0);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLElement>(null);
  const arc = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        setOn(Math.min(3, Math.floor(p * 4)));
        if (arc.current) arc.current.style.strokeDashoffset = String(100 - p * 100);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={root} className={`a3-val${still ? ' is-still' : ''}`} aria-labelledby="a3-val-h">
      <div className="a3-val__stage">
        <div className="a3-rail a3-val__grid">
          <div className="a3-val__disc-wrap">
            <svg className="a3-val__rim" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="48" className="a3-val__rim-bg" />
              <circle
                ref={arc}
                cx="50"
                cy="50"
                r="48"
                pathLength={100}
                className="a3-val__rim-arc"
                style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
              />
            </svg>
            <div className="a3-val__disc" aria-hidden="true">
              {PICS.map((p, i) => (
                <span
                  key={p.src}
                  className={`a3-val__q${still || i === on ? ' is-on' : ''}`}
                  style={{ clipPath: WEDGE[i] }}
                >
                  <img src={p.src} alt="" loading="lazy" decoding="async" />
                </span>
              ))}
            </div>
            <div className="a3-val__core">
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
          </div>

          <div className="a3-val__copy">
            <p className="a3-label a3-label--dark">
              <span id="a3-val-h">What we value</span>
            </p>
            <ol className="a3-val__list">
              {about.values.map((v, i) => (
                <li key={v.name} className={still || i === on ? 'is-on' : ''}>
                  <span className="a3-val__word">{v.name}</span>
                  <span className="a3-val__line">{v.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
