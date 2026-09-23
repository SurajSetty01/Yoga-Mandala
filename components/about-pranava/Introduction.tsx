import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from './parts';
import { FRAMES, src, srcSet } from './frames';

/**
 * 01 · INTRODUCTION — THE ROOM IS BEHIND THE PAGE.
 *
 * A sheet of paper is laid over one photograph of the hall, and the only way the room is
 * ever seen is through the slits the paragraph's own leading leaves and past the ragged
 * ends of its lines. The picture is not beside the words: its top is where sentence two
 * begins, its bottom is where sentence five ends, its left is the text's left, and its
 * right edge is wherever each line happens to stop. Delete the words and there is no
 * photograph at all, only cream.
 *
 * THE APERTURE IS SHAPED BY THE TYPE, AND THAT IS THE COMPOSITION rather than a by-product
 * of it. The two display sentences run the full width of the page; the three prose
 * sentences hold a reading measure of at most 42rem however wide the screen gets. The
 * difference between those two widths is a wedge of room standing open down the right of
 * the block — pinched shut above by "Yoga is a vast body of knowledge —" and below by the
 * belief, both of which cross the whole page — and its left boundary is a staircase,
 * because it is the rag. 213px wide at 1440 and 608px at 2531: a window, not a gap.
 *
 * WHY IT IS NOT §03 OF THE HOME PAGE, which clips a photograph INTO the letterforms of one
 * word. Both are type shaping a picture, and the resemblance is worth naming. There the
 * glyphs ARE the photograph; here they are opaque ink on opaque paper and the photograph
 * survives only in the space between them — which is why contrast in this section is
 * structural rather than tuned: no glyph ever touches the picture, so every run measures
 * ink-on-cream at 15.58:1 at every viewport, and a re-wrap can never change that.
 *
 * NOT A WORD IS ALTERED. Two sentences are sliced and set in two voices, at the client's
 * own punctuation: sentence two at its em dash, sentence five at its "but". Both slices
 * are `String.prototype.slice` on the source string, so the characters that reach the page
 * are the characters in content/pranava.ts by construction.
 */

const [say, turn, work, brings, belief] = about.intro;

/* "Yoga is a vast body of knowledge —" / " encompassing practice, philosophy, …".
   The space after the dash is KEPT on the second half rather than trimmed: CSS drops white
   space at the start of a line, so it costs nothing on screen, and it means the two halves
   concatenate back to the client's sentence character for character — which is what a
   reader who copies the paragraph, or a screen reader running the two fragments together,
   actually gets. */
const dash = turn.indexOf('—');
const turnSay = turn.slice(0, dash + 1);
const turnList = turn.slice(dash + 1);

/* "We believe that Yoga is best understood not merely by collecting techniques, " /
   "but through a relationship between study, practice and experience." */
const but = belief.indexOf('but through');
const beliefHead = belief.slice(0, but);
const beliefTurn = belief.slice(but);

export function Introduction() {
  const wide = FRAMES.introHall;
  const tall = FRAMES.introRopes;
  /* The room is never wider than the page, and the page is capped at 82rem. */
  const sizes = '(min-width: 720px) min(62vw, 82rem), calc(100vw - 2 * var(--rail))';

  return (
    <section className="apr-s apr-intro" id="apr-intro">
      {/* THE REGISTER MARK SITS ON THE PAGE'S OWN RAIL, not on this section's narrower
          one. Measured across /about/: every other mark on the page lands at 43px at
          1024, 60 at 1440 and 530 at 2531, and a mark that stepped 214px right for one
          section and back again for the next is a discontinuity a reader sees while
          scrolling. So the label keeps the page's axis and the paper plate is centred
          inside it — which is also what makes the wide margin read as a margin. */}
      <div className="apr-rail">
        <Eyebrow n="01">Introduction</Eyebrow>
      </div>

      <div className="apr-intro__rail">
        <div className="apr-intro__page">
          {/* 1 · the claim, on bare paper. The room has not arrived yet. */}
          <p className="apr-intro__l apr-intro__l--say">
            <span className="apr-intro__t">{say}</span>
          </p>

          {/* 2-5 · the body, and the exact extent of the photograph. `data-ap` is the
              page's own reveal hook, and the stylesheet redefines what `.in` means for
              this one block: instead of a fade and a rise it flips --apr-intro-open from
              0 to 1, which draws the five blocks apart and brings the room up through the
              slits that opening makes. No second client island, and no new JavaScript —
              under prefers-reduced-motion `.is-live` is never added, so the property keeps
              its finished default and the section is simply composed. */}
          <div className="apr-intro__body" data-ap="fade">
            <div className="apr-intro__room">
              <picture>
                <source media="(max-width: 719px)" srcSet={srcSet(tall)} sizes={sizes} />
                <img
                  className="apr-intro__img"
                  src={src(wide)}
                  srcSet={srcSet(wide)}
                  sizes={sizes}
                  alt={wide.alt}
                  loading="lazy"
                  decoding="async"
                  /* the page's own crop convention: `--op` wide, `--op-n` below 719 —
                     which is the same breakpoint the <source> swaps on, so the frame and
                     its crop change together. */
                  style={{ '--op': wide.pos, '--op-n': tall.pos } as CSSProperties}
                />
              </picture>
            </div>

            {/* One sentence, two voices, split at the client's own em dash. Each voice is
                a block so it starts its own line; the paper is the INLINE span inside it,
                so it hugs that line's rag rather than the block's rectangle. */}
            <p className="apr-intro__l apr-intro__l--turn">
              <span className="apr-intro__say">
                <span className="apr-intro__t">{turnSay}</span>
              </span>
              <span className="apr-intro__list">
                <span className="apr-intro__t">{turnList}</span>
              </span>
            </p>

            <p className="apr-intro__l apr-intro__l--work">
              <span className="apr-intro__t">{work}</span>
            </p>

            <p className="apr-intro__l apr-intro__l--brings">
              <span className="apr-intro__t">{brings}</span>
            </p>

            <p className="apr-intro__l apr-intro__l--belief">
              <span className="apr-intro__t">
                {beliefHead}
                <em className="apr-intro__em">{beliefTurn}</em>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
