import Link from 'next/link';
import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';

/**
 * §06 THE PRAṆAVA JOURNEY: three boxes (the client's review, October 2026).
 *
 * "Keep the three areas: Learn, Practice, Heal. Make it visually lighter... use the previous
 * boxes section and just add a photograph each." Insights is becoming a blog page and is not
 * one of the areas here, so it is filtered out of the client's list (content is untouched).
 *
 * Each box is one link: a photograph, the area's name and its one line, verbatim. Motion is
 * the page's shared reveal only (`data-ap`, driven by AboutMotion).
 */
const PHOTOS: Record<string, { src: string; set: string; alt: string; pos: string }> = {
  '/learn/': {
    src: '/media/about-v2/learn-p27-0854-960.webp',
    set: '/media/about-v2/learn-p27-0854-480.webp 480w, /media/about-v2/learn-p27-0854-960.webp 960w, /media/about-v2/learn-p27-0854-1620.webp 1620w',
    alt: 'A study session: participants seated on mats with handouts while the teacher demonstrates at the front of the hall',
    pos: '50% 62%',
  },
  '/practice/': {
    src: '/media/stills/pr-ttc-dsc_0046_1-960.webp',
    set: '/media/stills/pr-ttc-dsc_0046_1-480.webp 480w, /media/stills/pr-ttc-dsc_0046_1-960.webp 960w, /media/stills/pr-ttc-dsc_0046_1-1620.webp 1620w',
    alt: 'Five practitioners standing in warrior one with arms raised on mats across a red floor',
    pos: '50% 50%',
  },
  '/heal/': {
    src: '/media/stills/pr-pbh-img_5808-960.webp',
    set: '/media/stills/pr-pbh-img_5808-480.webp 480w, /media/stills/pr-pbh-img_5808-960.webp 960w, /media/stills/pr-pbh-img_5808-1920.webp 1920w',
    alt: 'Three women lying in a row with knees open, belts around their feet and bolsters under their heads',
    pos: '50% 74%',
  },
};

export function PranavaJourney() {
  const areas = about.journey.filter((d) => d.href !== '/insights/');

  return (
    <section className="sx5-journey" id="sx5-journey">
      <div className="sx5-rail">
        <Eyebrow n="06" dark>
          The Praṇava journey
        </Eyebrow>

        <ul className="sx5-boxes">
          {areas.map((d, i) => {
            const ph = PHOTOS[d.href];
            return (
              <li
                className="sx5-box"
                key={d.name}
                data-ap="up"
                style={{ '--apr-d': `${i * 90}ms` } as CSSProperties}
              >
                <Link className="sx5-box__link" href={d.href}>
                  {ph ? (
                    <span className="sx5-box__pic">
                      <img
                        src={ph.src}
                        srcSet={ph.set}
                        sizes="(min-width: 900px) min(27rem, 30vw), min(40rem, 92vw)"
                        width={1620}
                        height={1215}
                        alt={ph.alt}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: ph.pos }}
                      />
                    </span>
                  ) : null}
                  <span className="sx5-box__text">
                    <span className="sx5-box__head">
                      <h3 className="sx5-box__name">{d.name}</h3>
                      <svg
                        className="sx5-box__go"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M4 12h15M13 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="sx5-box__body">{d.body}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
