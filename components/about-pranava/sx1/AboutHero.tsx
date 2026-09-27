import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { SX1_HALL, SX1_STAMPS, sx1StampSrc } from './media';
import { Sx1HeroMotion } from './HeroMotion';

/**
 * §01 HERO · "THE WALLS ARE THE WORDS" — the final section on /about/. Owns the page's
 * single <h1>. Styles: styles/sec-sx1.css (every selector `.sx1-…`).
 *
 * WHAT HAPPENS. The hall has had its walls taken away. Its red floor still runs back into
 * the corner and five women still stand in a line along it; where the plaster and netting
 * were there is only the page's green, and the page's words are written on it. The class
 * stands in FRONT of the name — the four furthest heads cross the foot of "Pranava". The
 * sentence beside them carries its own three nouns' photographs at the size of a word, and
 * they open one after another on a hinge in the order the client wrote them. As the hero
 * scrolls away the room swells about its far corner and rises while the wall holds back,
 * so the practitioners pass up through the name.
 *
 * Reduced motion and no JavaScript get the room at rest with all three frames open — the
 * occlusion is compositional, so the depth and every word survive with nothing moving.
 *
 * Base: tournament design sx1d. Grafted: the word-sized noun photographs (sx1a), their
 * opening in reading order (sx1b's leaves), the small-capital lead-in (sx1c).
 *
 * COPY. Every string is `about.hero`, or is cut out of the client's own strings — never
 * retyped. The sub is split on its three nouns with a capturing regex, and the slots hold
 * only an <img>, so the paragraph's text is the client's sentence character for character.
 */

/** "Pranava – Center for Indian Culture & Yogic Studies was established…" → the name. */
const INSTITUTION = about.what.body[0].split(' was established')[0] ?? '';
const EYEBROW = INSTITUTION.split(' – ')[1] ?? INSTITUTION;

/** "About Pranava" split at its own space; the two spans concatenate back to it exactly. */
const [ABOUT, NAME] = about.hero.heading.split(' ');

/** The support paragraph's first four words, kept apart as its lead-in. */
const LEAD = /^(\S+\s+\S+\s+\S+\s+\S+)(\s[\s\S]*)$/.exec(about.hero.support);

export function AboutHero() {
  /* ['A space for the ', 'study', ', ', 'practice', ' and ', 'transmission', ' of Yoga …'] */
  const parts = about.hero.sub.split(/(study|practice|transmission)/);

  return (
    <section className="sx1-hero" aria-labelledby="sx1-h" data-sx1>
      <div className="sx1-stage">
        <p className="sx1-eyebrow sx1-wall">{EYEBROW}</p>

        <h1 className="sx1-h sx1-wall" id="sx1-h">
          <span className="sx1-h__about">{ABOUT}</span>{' '}
          <span className="sx1-h__name">{NAME}</span>
        </h1>

        <div className="sx1-hall">
          <img
            className="sx1-hall__img"
            src={SX1_HALL.src}
            srcSet={SX1_HALL.srcSet}
            sizes="(min-width: 900px) and (min-aspect-ratio: 5/4) min(75vw, 120vh, 1620px), min(140vw, calc(100vw + 14rem), 150vh)"
            width={SX1_HALL.w}
            height={SX1_HALL.h}
            alt={SX1_HALL.alt}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="sx1-copy sx1-wall">
          <p className="sx1-sub">
            {parts.map((p, k) => {
              const i = SX1_STAMPS.findIndex((s) => s.noun === p);
              const s = SX1_STAMPS[i];
              if (!s) return p;
              return (
                <span className="sx1-term" key={k}>
                  <span className="sx1-slot" style={{ '--sx1-i': i } as CSSProperties}>
                    <img
                      className="sx1-stamp"
                      src={sx1StampSrc(s.id)}
                      alt={s.alt}
                      width={480}
                      height={640}
                      decoding="async"
                      style={
                        {
                          '--sx1-cx': `${s.cx * 100}%`,
                          '--sx1-cy': `${s.cy * 100}%`,
                          '--sx1-z': (1 / s.w).toFixed(3),
                        } as CSSProperties
                      }
                    />
                  </span>
                  <span className="sx1-noun">{p}</span>
                </span>
              );
            })}
          </p>
          <p className="sx1-support">
            {LEAD ? (
              <>
                <span className="sx1-lead">{LEAD[1]}</span>
                {LEAD[2]}
              </>
            ) : (
              about.hero.support
            )}
          </p>
        </div>
      </div>
      <Sx1HeroMotion />
    </section>
  );
}
