import Link from 'next/link';
import { about } from '@/content/pranava';

/**
 * 06 THE PRAṆAVA JOURNEY. The client: "Keep the three areas: Learn, Practice, Heal. Make it
 * visually lighter ... use the previous boxes section ... and just add a photograph each.
 * Insights ... need not come in this section."
 *
 * IMAGE-LED. Three doors, each a whole photograph you can walk into: the name and its line
 * set over the lower part of the picture, the whole door one link. Insights is filtered out
 * here; the client's content is untouched.
 */
const PICS: Record<string, { src: string; set: string; alt: string; pos: string }> = {
  '/learn/': {
    src: '/media/about-v2/learn-p27-0854-960.webp',
    set: '/media/about-v2/learn-p27-0854-480.webp 480w, /media/about-v2/learn-p27-0854-960.webp 960w, /media/about-v2/learn-p27-0854-1620.webp 1620w',
    alt: 'A study session: participants seated on mats with handouts while the teacher demonstrates at the front of the hall',
    pos: '50% 60%',
  },
  '/practice/': {
    src: '/media/stills/pr-ttc-dsc_0046_1-960.webp',
    set: '/media/stills/pr-ttc-dsc_0046_1-480.webp 480w, /media/stills/pr-ttc-dsc_0046_1-960.webp 960w, /media/stills/pr-ttc-dsc_0046_1-1620.webp 1620w',
    alt: 'Five practitioners in warrior one with arms raised on mats across a red floor',
    pos: '45% 50%',
  },
  '/heal/': {
    src: '/media/stills/pr-pbh-img_5808-960.webp',
    set: '/media/stills/pr-pbh-img_5808-480.webp 480w, /media/stills/pr-pbh-img_5808-960.webp 960w, /media/stills/pr-pbh-img_5808-1920.webp 1920w',
    alt: 'Three women resting in a supported restorative pose on bolsters and belts',
    pos: '50% 50%',
  },
};

export function A3Journey() {
  const doors = about.journey.filter((d) => d.href !== '/insights/');
  return (
    <section className="a3-sec a3-jour" aria-labelledby="a3-jour-h">
      <div className="a3-rail">
        <div className="a3-jour__head">
          <p className="a3-label" data-a3r>
            <span className="a3-label__n">06</span>
            <span id="a3-jour-h">The Praṇava journey</span>
          </p>
        </div>
        <ul className="a3-jour__doors" role="list">
          {doors.map((d, i) => {
            const p = PICS[d.href];
            return (
              <li key={d.href} data-a3r style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
                <Link className="a3-jour__door" href={d.href}>
                  {p ? (
                    <img
                      src={p.src}
                      srcSet={p.set}
                      sizes="(min-width: 900px) 32vw, 100vw"
                      alt={p.alt}
                      style={{ objectPosition: p.pos }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="a3-jour__text">
                    <span className="a3-jour__name">
                      {d.name}
                      <span className="a3-jour__arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                    <span className="a3-jour__line">{d.body}</span>
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
