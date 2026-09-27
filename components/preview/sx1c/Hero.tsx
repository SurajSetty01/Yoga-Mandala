import { about } from '@/content/pranava';
import { PLATE } from './plate';

/**
 * PREVIEW · SX1C — the Praṇava About hero.   TYPE IS THE STRUCTURE.
 *
 * WHAT HAPPENS
 * The page opens as a book opens: on a SPREAD. The title runs across the gutter — "About"
 * on the left-hand page, "Pranava" on the right, the fold standing where the word space
 * would be. The right-hand page is the title page: subtitle, a paragraph set to a reading
 * measure, and the imprint at its foot. The left-hand page carries the frontispiece — one
 * photograph of teaching — and as the reader begins to scroll it is SET DOWN: held above the
 * paper at first, casting a shadow and overlapping its own printer's marks, it is lowered
 * onto the page until its edges come to rest inside the marks and the shadow is gone.
 *
 * WHY IT IS BUILT FROM TYPE
 *  · the spread's margins are the Van de Graaf canon's: inner 1/9 of the page, outer 2/9;
 *  · the photograph is exactly as deep as the text it faces — its top on the subtitle's
 *    line, its foot on the imprint's — so the picture takes its size from the type, not the
 *    other way round;
 *  · two lines cross the gutter: the title's baseline at the head of the spread, and the
 *    caption's and the imprint's at its foot;
 *  · the caption is a marginal note in the verso's outer margin, joined to the plate by a
 *    hairline, the way Tufte's margin notes sit beside their text (and fall inline under it
 *    on a phone, the way his do).
 *
 * WITHOUT MOTION AND WITHOUT JAVASCRIPT the plate is already down, in its marks. The spread,
 * the title across the gutter and the plate the depth of the text are all in the still
 * picture; motion adds the act of setting it down, not the fact that it is set.
 *
 * Every client sentence comes out of content/pranava.ts. Two are cut, never retyped:
 *  · the paragraph's first four words are its small-capital lead-in (a split at the fourth
 *    space; the two halves concatenate back to the sentence character for character);
 *  · the imprint is the client's own name for the centre, as it opens `about.what.body[0]`,
 *    cut at " was established".
 */
export function SX1CHero() {
  const { heading, sub, support } = about.hero;

  // "About Pranava" → the two words that sit either side of the gutter
  const [wordV, ...rest] = heading.split(' ');
  const wordR = rest.join(' ');

  // the lead-in: the paragraph's first four words, kept with the space that follows them
  const lead = support.match(/^(\S+\s+\S+\s+\S+\s+\S+)(\s[\s\S]*)$/);
  const leadIn = lead ? lead[1] : '';
  const body = lead ? lead[2] : support;

  // the imprint: "Pranava – Center for Indian Culture & Yogic Studies"
  const cut = about.what.body[0].indexOf(' was established');
  const imprint = cut > 0 ? about.what.body[0].slice(0, cut) : null;

  return (
    <section className="sx1c-hero" aria-labelledby="sx1c-title">
      <div className="sx1c-spread">
        <h1 className="sx1c-title" id="sx1c-title">
          <span className="sx1c-title__v">{wordV}</span>{' '}
          <span className="sx1c-title__r">{wordR}</span>
        </h1>

        <div className="sx1c-leaf">
          <p className="sx1c-sub">{sub}</p>
          <p className="sx1c-support">
            {leadIn ? <span className="sx1c-lead">{leadIn}</span> : null}
            {body}
          </p>
          {imprint ? <p className="sx1c-imprint">{imprint}</p> : null}
        </div>

        <figure className="sx1c-plate">
          <div className="sx1c-frame">
            <span className="sx1c-shadow" aria-hidden="true" />
            <span className="sx1c-mark sx1c-mark--tl" aria-hidden="true" />
            <span className="sx1c-mark sx1c-mark--tr" aria-hidden="true" />
            <span className="sx1c-mark sx1c-mark--bl" aria-hidden="true" />
            <span className="sx1c-mark sx1c-mark--br" aria-hidden="true" />
            <div className="sx1c-sheet">
              <picture>
                <source type="image/avif" srcSet={PLATE.avif} />
                <img
                  className="sx1c-img"
                  src={PLATE.jpg}
                  width={PLATE.w}
                  height={PLATE.h}
                  alt={PLATE.alt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  style={{ objectPosition: PLATE.pos }}
                />
              </picture>
            </div>
          </div>
          <figcaption className="sx1c-cap">{PLATE.caption}</figcaption>
        </figure>
      </div>
      {/* the scroll the spread is held for while the plate is set down — 0 tall without
          JavaScript and under reduced motion, where there is nothing to hold it for */}
      <div className="sx1c-hold" aria-hidden="true" />
    </section>
  );
}
