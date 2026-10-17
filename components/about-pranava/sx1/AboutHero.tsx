import { about } from '@/content/pranava';
import { SX1_TEACHING } from './media';

/**
 * §01 HERO. Owns the page's single <h1>. Styles: styles/sec-sx1.css (every selector `.sx1-…`).
 *
 * IMAGE-LED, CALM. The client's review asked for a hero that says "a centre for Indian
 * culture and yogic studies" rather than "asana practice": the photograph is now the teacher
 * seated before his students with the Praṇava emblem and the painted tree on the wall
 * behind him. On a phone the words come first and the photograph runs edge to edge beneath
 * the name; from 900px the words take the left five twelfths and the photograph the rest.
 *
 * MOTION. Nothing is scroll-linked. The three blocks fade and rise once on load, in CSS,
 * and only when the reader has not asked for reduced motion.
 *
 * COPY. Every string is `about.hero`, or is cut out of the client's own strings, never
 * retyped. The sub is split on its three nouns with a capturing regex and only wrapped,
 * so the paragraph's text is the client's sentence character for character.
 */

/** "Pranava – Center for Indian Culture & Yogic Studies was established…" → the name after
    the dash. The client's About review (28 Sep 2026) asked for this exact wording back, so
    the eyebrow is still read out of the client's own sentence. */
const INSTITUTION = about.what.body[0].split(' was established')[0] ?? '';
const EYEBROW = INSTITUTION.split(' – ')[1] ?? INSTITUTION;

/** "About Pranava" split at its own space; the two spans concatenate back to it exactly. */
const [ABOUT, NAME] = about.hero.heading.split(' ');

/** The support paragraph's first four words, kept apart as its lead-in. */
const LEAD = /^(\S+\s+\S+\s+\S+\s+\S+)(\s[\s\S]*)$/.exec(about.hero.support);

export function AboutHero() {
  /* ['A space for the ', 'study', ', ', 'practice', ' and ', 'transmission', ' of Yoga …']:
     a capturing split puts the three nouns at the odd indices */
  const parts = about.hero.sub.split(/(study|practice|transmission)/);

  return (
    <section className="sx1-hero" aria-labelledby="sx1-h">
      <div className="sx1-stage">
        <div className="sx1-head sx1-in">
          <p className="sx1-eyebrow">{EYEBROW}</p>
          <h1 className="sx1-h" id="sx1-h">
            <span className="sx1-h__about">{ABOUT}</span>{' '}
            <span className="sx1-h__name">{NAME}</span>
          </h1>
        </div>

        <figure className="sx1-fig sx1-in">
          <img
            className="sx1-fig__img"
            src={SX1_TEACHING.src}
            srcSet={SX1_TEACHING.srcSet}
            sizes="(min-width: 900px) min(58vw, 1030px), 100vw"
            width={SX1_TEACHING.w}
            height={SX1_TEACHING.h}
            alt={SX1_TEACHING.alt}
            fetchPriority="high"
            decoding="async"
          />
        </figure>

        <div className="sx1-copy sx1-in">
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
    </section>
  );
}
