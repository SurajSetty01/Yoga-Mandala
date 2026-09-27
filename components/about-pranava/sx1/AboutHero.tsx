import { about } from '@/content/pranava';
import { SX1_HALL } from './media';
import { Sx1HeroMotion } from './HeroMotion';

/**
 * §01 HERO · "THE WALLS ARE THE WORDS" — the final section on /about/. Owns the page's
 * single <h1>. Styles: styles/sec-sx1.css (every selector `.sx1-…`).
 *
 * WHAT HAPPENS. The hall has had its walls taken away. Its red floor still runs back into
 * the corner and five women still stand in a line along it; where the plaster and netting
 * were there is only the page's green, and the page's words are written on it. The class
 * stands in FRONT of the name — the four furthest heads cross the foot of "Pranava". The
 * sentence beside them sets its three nouns in italic. As the hero scrolls away the room
 * swells about its far corner and rises while the wall holds back, so the practitioners
 * pass up through the name.
 *
 * Reduced motion and no JavaScript get the room at rest — the occlusion is compositional,
 * so the depth and every word survive with nothing moving.
 *
 * Base: tournament design sx1d. Grafted: the small-capital lead-in (sx1c). The word-sized
 * noun photographs once grafted from sx1a/sx1b were removed at the owner's review.
 *
 * COPY. Every string is `about.hero`, or is cut out of the client's own strings — never
 * retyped. The sub is split on its three nouns with a capturing regex and only wrapped,
 * so the paragraph's text is the client's sentence character for character.
 */

/** "Pranava (Center for Indian Culture & Yogic Studies) was established…" → the bracketed
    name. The client's dash became brackets on 2026-09-27 (no dashes on the site); the
    words are unchanged, so the eyebrow is still read out of the client's sentence. */
const INSTITUTION = about.what.body[0].split(' was established')[0] ?? '';
const EYEBROW = /\(([^)]+)\)/.exec(INSTITUTION)?.[1] ?? INSTITUTION;

/** "About Pranava" split at its own space; the two spans concatenate back to it exactly. */
const [ABOUT, NAME] = about.hero.heading.split(' ');

/** The support paragraph's first four words, kept apart as its lead-in. */
const LEAD = /^(\S+\s+\S+\s+\S+\s+\S+)(\s[\s\S]*)$/.exec(about.hero.support);

export function AboutHero() {
  /* ['A space for the ', 'study', ', ', 'practice', ' and ', 'transmission', ' of Yoga …']:
     a capturing split puts the three nouns at the odd indices */
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
            {parts.map((p, k) =>
              k % 2 ? (
                <span className="sx1-noun" key={k}>
                  {p}
                </span>
              ) : (
                p
              ),
            )}
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
