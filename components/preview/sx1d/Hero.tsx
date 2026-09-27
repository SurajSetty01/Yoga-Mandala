import { about } from '@/content/pranava';
import { HALL } from './media';

/**
 * HERO · "THE WALLS ARE THE WORDS"
 *
 * The hall has had its walls taken away. Its red floor still runs back into the corner and
 * five women still stand in a line along it, a step deeper each; but where the white plaster
 * and the green netting were, there is only the page's own ground — and the page's words
 * are written on it. The class stands in FRONT of the name: the heads of the four furthest
 * practitioners cross the foot of "Pranava", so the name is plainly on the far wall and the
 * people are in the room between it and you.
 *
 * As the section scrolls away the camera walks in. The room swells about its far corner and
 * rises, the wall keeps its place a little longer, and the practitioners pass up through the
 * name. Reduced motion, and no JavaScript, get the room at rest — which is the design, not
 * its start state: the occlusion is compositional, so the depth survives with nothing moving.
 *
 * THREE PLANES, and only three. Wall: the green ground, the eyebrow, the h1 and the two
 * paragraphs. Room: one photograph, `HALL`, which is floor and people in a single file — so
 * the floor and the figures can never slip against each other. Viewer: you.
 *
 * Every word below is `about.hero` or is derived from the client's own sentence by slicing,
 * never retyped — see `EYEBROW`.
 */

/**
 * The eyebrow is the client's name for the institution, cut out of the client's own §4
 * sentence rather than typed, so it cannot drift: "Pranava – Center for Indian Culture &
 * Yogic Studies was established as a space…" → "Center for Indian Culture & Yogic Studies".
 * The page's h1 already says "Pranava", so the eyebrow carries only what the h1 does not.
 */
const INSTITUTION = about.what.body[0].split(' was established')[0] ?? '';
const EYEBROW = INSTITUTION.split(' – ')[1] ?? INSTITUTION;

/** "About Pranava" split at its own space; the two spans concatenate back to it exactly. */
const [ABOUT, NAME] = about.hero.heading.split(' ');

export function Hero() {
  return (
    <section className="sx1d" aria-labelledby="sx1d-h" data-sx1d>
      <div className="sx1d-stage">
        <p className="sx1d-eyebrow sx1d-wall">{EYEBROW}</p>

        <h1 className="sx1d-h sx1d-wall" id="sx1d-h">
          <span className="sx1d-h__about">{ABOUT}</span>{' '}
          <span className="sx1d-h__name">{NAME}</span>
        </h1>

        <div className="sx1d-hall">
          {/* a plain <img>: static export, pre-encoded derivatives, `images.unoptimized` */}
          <img
            className="sx1d-hall__img"
            src={HALL.src}
            srcSet={HALL.srcSet}
            sizes="(min-width: 900px) and (min-aspect-ratio: 5/4) min(75vw, 120vh, 1620px), min(140vw, calc(100vw + 14rem), 150vh)"
            width={HALL.w}
            height={HALL.h}
            alt={HALL.alt}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="sx1d-copy sx1d-wall">
          <p className="sx1d-sub">{about.hero.sub}</p>
          <p className="sx1d-support">{about.hero.support}</p>
        </div>
      </div>
    </section>
  );
}
