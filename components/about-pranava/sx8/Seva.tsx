import Link from 'next/link';
import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { GATHERING, HER, PLATE, setOf, srcOf } from './frames';

/**
 * 08 · PRAṆAVA & SEVA — "Rings spread from one person."
 *
 * WHAT HAPPENS. One person folding forward to a chair sits in a small disc. As the reader
 * scrolls down from the lead, six hairline rings spread out from her one at a time, each
 * travelling outward until it reaches the initiative written where it crosses the axis
 * beneath her. The band between rings five and six fills with a large seated gathering.
 * A seventh, widest ring, in Yoga Mandala's terracotta, is the mandala: it carries the
 * client's Yoga Mandala sentence and hangs the plate that links to /yoga-mandala/.
 *
 * WHY. The lead moves from one person to many — "From individual practice to collective
 * responsibility." — and the last, widest ring is the community initiative it names.
 *
 * FINISHED BY DEFAULT. Every ring's resting state is drawn. The spread is a CSS
 * scroll-driven animation, declared only under `prefers-reduced-motion: no-preference`
 * and `@supports (animation-timeline: view())`; with reduced motion, no JavaScript or an
 * older browser, every ring is simply there. The words never animate, so nothing on the
 * page is ever painted at partial opacity. No client JavaScript.
 *
 * Every word comes from `about.seva` in content/pranava.ts.
 */
const S = about.seva;

const r = (i: number) => ({ ['--i' as string]: i }) as CSSProperties;

export function Sx8Seva() {
  return (
    <section className="sx8-seva" id="seva" aria-labelledby="sx8-h">
      <div className="sx8-rail">
        <header className="sx8-head">
          <div className="sx8-head__mark" id="sx8-h">
            <Eyebrow n="08">Praṇava &amp; Seva</Eyebrow>
          </div>
          <p className="sx8-lead">{S.lead}</p>
          <div className="sx8-body">
            {S.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </header>
      </div>

      <div className="sx8-stage">
        <p className="sx8-prompt">{S.prompt}</p>

        <div className="sx8-orbit">
          <figure className="sx8-her">
            <img
              src={srcOf(HER.id, 480)}
              srcSet={setOf(HER)}
              sizes="(min-width: 960px) 222px, 140px"
              alt={HER.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <ul className="sx8-list">
            {S.initiatives.map((item, i) => (
              <li key={item} className={`sx8-list__item sx8-list__item--${i + 1}`}>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* the rings: lower halves only, clipped at her horizontal. The spans are empty,
              so only the gathering in ring six's band is announced. */}
          <div className="sx8-field">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`sx8-ring sx8-ring--${i}`} style={r(i)} />
            ))}
            <div className="sx8-band">
              <img
                className="sx8-band__img"
                src={srcOf(GATHERING.id, 960)}
                srcSet={setOf(GATHERING)}
                sizes="(min-width: 960px) min(54vw, 788px), 492px"
                alt={GATHERING.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="sx8-ring sx8-ring--6" style={r(6)} />
            <span className="sx8-ring sx8-ring--7" />
          </div>

          <p className="sx8-mandala">{S.mandala}</p>

          <Link className="sx8-plate" href="/yoga-mandala/">
            <span className="sx8-plate__frame">
              <img
                src={srcOf(PLATE.id, 480)}
                srcSet={setOf(PLATE)}
                sizes="(min-width: 540px) 480px, calc(100vw - 2.7rem)"
                alt={PLATE.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="sx8-plate__go">
              Yoga Mandala
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
                <path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
