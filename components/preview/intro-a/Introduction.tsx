import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';

/**
 * PRAṆAVA · ABOUT · 01 INTRODUCTION — CONCEPT A.
 *
 * THE ROOM IS BEHIND THE PAGE. A sheet of paper is laid over one photograph of the hall,
 * and the only way the room is ever seen is through the slits the paragraph's own leading
 * leaves and past the ragged ends of its lines. The picture is not beside the words: its
 * top is where sentence two begins, its bottom is where sentence five ends, its left is
 * the text's left, and its right edge is wherever each line happens to stop. Delete the
 * words and there is no photograph at all, only cream.
 *
 * THE APERTURE IS SHAPED BY THE TYPE, AND THAT IS NOW THE COMPOSITION rather than a
 * by-product of it. The two display sentences run the full width of the page; the three
 * prose sentences hold a reading measure of at most 42rem however wide the screen gets.
 * The difference between those two widths is a wedge of room standing open down the
 * right-hand side of the block — pinched shut at the top by "Yoga is a vast body of
 * knowledge —" and at the bottom by the belief, both of which cross the whole page — and
 * its left-hand boundary is a staircase, because it is the rag. That wedge is what lets
 * the photograph resolve as a PLACE instead of a texture: at 1440 it is 238px wide and at
 * 2531 it is 608px, which is a window rather than a gap between two lines.
 *
 * NOT A WORD IS ALTERED. Two sentences are sliced and set in two voices, at the client's
 * own punctuation: sentence two at its em dash, sentence five at its "but". Both slices
 * are `String.prototype.slice` on the source string, so the characters that reach the page
 * are the characters in content/pranava.ts by construction, and `npm run check:copy` has
 * nothing new to find.
 */

const [say, turn, work, brings, belief] = about.intro;

/* "Yoga is a vast body of knowledge —" / " encompassing practice, philosophy, …".
   The space after the dash is KEPT on the second half rather than trimmed: CSS drops
   white space at the start of a line, so it costs nothing on screen, and it means the
   two halves concatenate back to the client's sentence character for character — which
   is what a reader who copies the paragraph, or a screen reader that runs the two
   fragments together, actually gets. */
const dash = turn.indexOf('—');
const turnSay = turn.slice(0, dash + 1);
const turnList = turn.slice(dash + 1);

/* "We believe that Yoga is best understood not merely by collecting techniques, " /
   "but through a relationship between study, practice and experience." */
const but = belief.indexOf('but through');
const beliefHead = belief.slice(0, but);
const beliefTurn = belief.slice(but);

/* TWO FRAMES, ONE ROOM, ONE APPARATUS — and the narrow one is a NATIVE PORTRAIT.
   The aperture this section cuts is the shape of the passage, so it changes shape with
   the viewport: at 1440 the page is 893 wide and the four sentences 561 tall, an aspect
   of 1.59 that a 3:2 frame fills almost exactly; at 320 the same block is 277 by 770, an
   aspect of 0.36. Feeding a 1.50 landscape source into that keeps 24% of its width and
   throws the other 76% away, which is how the first build turned a photograph into noise
   on a phone. A 0.67 portrait source into the same aperture keeps 54%, and — because the
   subject in it is vertical — the part that survives is the part that matters.

   Both frames are the same hall on the same day: red oxide floor, white walls, rope
   anchors in the roof. Both are supported inversions, one on chairs and one on the wall
   ropes, which is why a single honest `alt` covers whichever one the browser fetches —
   and only one is ever fetched, because this is `<picture>` and not two images with one
   of them hidden.

   Neither appears anywhere else on the site: `pr-ttc-dsc_0284_1` was spent twice already
   (/learn/'s hero and /contact/ 01), and a section whose entire idea is ONE photograph
   cannot spend a frame the site has spent twice. These two are checked against every
   other component in the tree.

   1620 (landscape) and 1080 (portrait) are the largest derivatives that exist for these
   TTC frames; nothing here assumes 2560. */
const ROOM = {
  /* WIDE — `pr-ttc-dsc_0566`. The open-sided hall with five practitioners standing, arms
     raised, low sun raking across the red oxide floor and green fields through the open
     side. Chosen by rendering four candidates behind these actual slits at 1440 and
     looking: it is the only one that stays a PLACE from the first slit to the last,
     because it is built in bands the block can cut across — corrugated roof and hanging
     ropes at the top, white wall, standing bodies through the middle, lit floor beneath —
     and because the wedge beside the prose lands on two whole figures and the trees
     rather than on an anonymous patch. The audit calls its light the best in the archive.
     TALL — `pr-ttc-dsc_0493`, the same hall: two practitioners hanging inverted from the
     wall ropes with the roof beams and anchors above them. Vertical subject, vertical
     apparatus, so the narrow crop keeps the part that carries the picture.
     Derivatives are NOT symmetrical and were checked on disk, not assumed: the wide frame
     has 480/960/1620, the tall one only 480/960. */
  wide: { id: 'pr-ttc-dsc_0566', widths: [480, 960, 1620], pos: '44% 50%' },
  tall: { id: 'pr-ttc-dsc_0493', widths: [480, 960], pos: '50% 46%' },
  /* ONE alt for two photographs, and it is written to be true of whichever the browser
     actually fetches — both are the same hall, both show a class at work under the same
     roof beams and the same hanging ropes on the same floor. An <img> has one alt and
     `<source>` cannot carry its own; the alternative is two <img>s with one hidden, which
     downloads both. */
  alt: 'A class at work in the training hall, under its roof beams and hanging ropes, on the red oxide floor',
};
const set = (f: { id: string; widths: number[] }) =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');

/* The page is capped at 82rem and the room is 97.5% of it; below 1100 the rail decides. */
const SIZES =
  '(min-width: 720px) min(62vw, 82rem), calc(100vw - 2 * clamp(1.35rem, 4.2vw, 4.25rem))';

export function Introduction() {
  return (
    <section className="ia" id="ia-intro">
      <div className="ia-rail">
        <h2 className="ia-eyebrow">
          <span className="ia-eyebrow__n">01</span>
          <span className="ia-eyebrow__rule" aria-hidden="true" />
          Introduction
        </h2>

        <div className="ia-page">
          {/* 1 · the claim, on bare paper. The room has not arrived yet. */}
          <p className="ia-l ia-l--say">
            <span className="ia-t">{say}</span>
          </p>

          {/* 2-5 · the body, and the exact extent of the photograph. */}
          <div className="ia-body">
            <div className="ia-room">
              <picture>
                <source media="(max-width: 719px)" srcSet={set(ROOM.tall)} sizes={SIZES} />
                <img
                  className="ia-room__img"
                  src={`/media/stills/${ROOM.wide.id}-1620.webp`}
                  srcSet={set(ROOM.wide)}
                  sizes={SIZES}
                  alt={ROOM.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ '--ia-op': ROOM.wide.pos, '--ia-op-n': ROOM.tall.pos } as CSSProperties}
                />
              </picture>
            </div>

            {/* One sentence, two voices, split at the client's own em dash. Each voice is a
                block so it starts its own line; the paper is the INLINE span inside it, so
                it hugs that line's rag rather than the block's rectangle. */}
            <p className="ia-l ia-l--turn">
              <span className="ia-turn__say">
                <span className="ia-t">{turnSay}</span>
              </span>
              <span className="ia-turn__list">
                <span className="ia-t">{turnList}</span>
              </span>
            </p>

            <p className="ia-l ia-l--work">
              <span className="ia-t">{work}</span>
            </p>

            <p className="ia-l ia-l--brings">
              <span className="ia-t">{brings}</span>
            </p>

            <p className="ia-l ia-l--belief">
              <span className="ia-t">
                {beliefHead}
                <em className="ia-belief__turn">{beliefTurn}</em>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
