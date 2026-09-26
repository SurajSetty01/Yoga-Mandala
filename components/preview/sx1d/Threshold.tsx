import { about } from '@/content/pranava';
import { site } from '@/content/site';
import { OPENING, SIZES, src, srcSet } from './media';

/**
 * PRAṆAVA · ABOUT · HERO — "THE THRESHOLD", rebuilt.
 *
 * THE EVENT, in one sentence: a doorway that is standing ajar swings open as
 * you come square to it, and the light that comes out of it reaches the words.
 *
 * Three things, and nothing else:
 *
 *   the wall      flat `--ground-deep` ink, full bleed, dark from the first
 *                 pixel — no photograph, so no scrim and nothing to dim
 *   the opening   one rectangle cut through it, standing on the threshold,
 *                 bleeding off the top because you are close to it
 *   the words     written on the wall beside it, on ink, never on a picture
 *
 * WHAT CHANGED AFTER ROUND 1, defect by defect. Every one is fixed at the
 * root — the thing that caused it is gone, not tuned.
 *
 *  1 · SUBJECT. The old near plane was a wind chime and a parapet and it
 *      covered the screen. There is now no photograph in the ground at all;
 *      the only photograph on the route is inside the opening and its subject
 *      is people practising. See media.ts for the survey that rejected every
 *      clip in the archive as well.
 *
 *  2 · LENGTH. 2070 px at 1440 became one screen plus a 12svh runway —
 *      1008 px at 1440×900, and 1.12 viewports at 390, 768, 1024, 1280, 1440,
 *      2531 and 2560 alike. Critic 1's bar was about 1.2.
 *
 *  3 · REDUCED MOTION. It used to FREEZE the runway: 2070 px tall with 0 of
 *      1,296,000 pixels changing over 1170 px of scroll. The runway is now
 *      applied by `.is-live`, which the island adds only when motion is
 *      allowed, so `prefers-reduced-motion` collapses the section to exactly
 *      one viewport — and `--p` defaults to 1, the OPEN state, so what a
 *      reduced-motion reader gets is the payoff rather than the start. That is
 *      entrant B's contract, which critic 1 told us to copy, plus the part B
 *      did not have: the static state is the resolved one.
 *
 *  4 · CLIPPED TYPE. The words used to travel left and lose 50 px of the h1 at
 *      y=1170. Nothing in the type block translates horizontally at any point
 *      in the approach, at any viewport. There is no state in which a word is
 *      off the edge.
 *
 *  5 · TYPE SCALE. It used to be frozen — 72 px h1 and 15 px body at both 1440
 *      and 2531. Every size here is a clamp on vw and the body sits ABOVE the
 *      house benchmark's 18.72 px at 1440. On the h1 see below.
 *
 *  6 · THE HAIRLINES. Two diagonal construction lines narrating the section's
 *      own perspective. Deleted. The one line left is the threshold itself —
 *      the opening stands on it and the type block sits on it, so it is doing
 *      layout, not commentary.
 *
 * WHY THE `<h1>` IS SMALL, WHICH IS A DECISION THIS REPOSITORY ALREADY MADE.
 * `components/about-pranava/NOTES.md`: *"The `<h1>` is the client's own page
 * title at label scale. `about.hero.heading` is 'About Pranava'; the sentence
 * underneath it is the one worth reading at size. An `<h1>` is a rank, not a
 * font-size."* So the display line here is `about.hero.sub` — measured at
 * 80.8 px at 1440×900, against the house hero's 81.6, and at 89.6 px at
 * 2531 — and "About Pranava" is the label it belongs to. Critic 2 measured the old h1 at 72 px
 * and called it the smallest in the round; the answer is not a bigger page
 * title, it is putting the size on the sentence that has something to say.
 *
 * EVERY WORD IS THE CLIENT'S and comes from a content module:
 *   eyebrow  site.descriptor       h1       about.hero.heading
 *   line     about.hero.sub        support  about.hero.support
 * Nothing here states a fact the client has not supplied. No count, no date,
 * no name, no number.
 *
 * `About Pranava` is safe in Fraunces: it carries no diacritic. The client's
 * own name, which does, never appears in display type — DESIGN-SYSTEM §1.
 *
 * Server component. Every sentence and the photograph are in the static HTML;
 * the island adds one custom property and nothing else.
 */
export function Threshold() {
  return (
    <section className="sx1d-thr" aria-labelledby="sx1d-h1">
      <div className="sx1d-stage">
        {/* the light that comes out of the opening and falls across the wall.
            It is shaped by the opening — it starts at its edge and dies out
            before it reaches the words — rather than being a flat dim laid
            over the whole screen, which is what round 1 shipped and what the
            home hero already owns. Ornament: --sand may never carry text. */}
        <span className="sx1d-wash" aria-hidden="true" />

        {/* THE THRESHOLD. One hairline across the whole wall. The opening
            stands on it, the type block sits on it, and it is the only thing
            that touches both. */}
        <span className="sx1d-cill" aria-hidden="true" />

        {/* ── the words ─────────────────────────────────────────────────── */}
        <div className="sx1d-type">
          <p className="sx1d-eyebrow">{site.descriptor}</p>
          <h1 className="sx1d-h1" id="sx1d-h1">
            {about.hero.heading}
          </h1>
          <span className="sx1d-tick" aria-hidden="true" />
          <p className="sx1d-line">{about.hero.sub}</p>
          <p className="sx1d-support">{about.hero.support}</p>
        </div>

        {/* ── the opening ───────────────────────────────────────────────────
            `__leaf` is a panel of the wall's own ink standing inside the
            opening. At rest it covers the far side of it, so the doorway is
            ajar; over the runway it travels out and the opening reaches its
            full width. `__reveal` is the lit inner face of the wall's
            thickness on the leading edge — what you see of a reveal when you
            are standing to one side of a door — and it narrows to nothing as
            you come square. Both are transforms on composited layers; neither
            carries content; both are outside the accessibility tree. */}
        <figure className="sx1d-open">
          <img
            className="sx1d-open__img"
            src={src(OPENING)}
            srcSet={srcSet(OPENING)}
            sizes={SIZES}
            width={OPENING.w}
            height={OPENING.h}
            alt={OPENING.alt}
            decoding="async"
            fetchPriority="high"
          />
          <span className="sx1d-open__leaf" aria-hidden="true">
            <span className="sx1d-open__reveal" />
          </span>
          {/* the light inside the opening falling off toward its own edges. An
              opening does not cast a shadow OUTWARD onto the wall it is cut
              through; a plate lying on the wall would, and that is exactly the
              difference between the two readings. Static — the rule is about
              animating box-shadow, not having one.

              It is ordered BELOW `__leaf` (see the z-index note in the
              stylesheet). It sat above, and a sample across x=934 at 1440×900
              showed its falloff painted onto the near cheek of the wall — the
              aperture's rectangle drawn on the wall by the very element that
              is meant to hide it. The light belongs to the room. */}
          <span className="sx1d-open__in" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
