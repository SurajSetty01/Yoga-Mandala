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
 * THE FRAME. `pr-ttc-dsc_0284_1` — the discussion circle in the open pavilion, notebooks
 * open, one woman mid-sentence, daylight and trees beyond the columns. The vision audit
 * calls it "the clearest 'people studying' frame in the archive", and that is why it is
 * here rather than an asana frame: the passage opens by saying Yoga is *more than a
 * practice on the mat* and closes on *a relationship between study, practice and
 * experience*. The picture the sentences let through has to be people studying, or the
 * section illustrates the opposite of what it says.
 *
 * It also survives being seen in slits, which most frames do not. Read through horizontal
 * bands a photograph keeps only its large structure, and this one is built of bands —
 * bright trees across the top, the dark ring of seated people through the middle, warm
 * floor below — with the pavilion's columns running vertically through all of them, so the
 * eye carries the room across the paper from one slit to the next.
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

/* The one photograph, and both of its crops. A portrait viewport crops a landscape frame
   hard enough to lose the subject — this site has shipped a hero with the teacher out of
   shot and an air cooler centre-frame for want of the second value (DESIGN-SYSTEM §1).
   1620 is the largest derivative that exists for every TTC frame; nothing here assumes
   2560, and the srcset names only the three widths on disk. */
const ROOM = {
  id: 'pr-ttc-dsc_0284_1',
  widths: [480, 960, 1620],
  alt: 'A discussion circle in an open pavilion with several people writing in notebooks as one speaks',
  /* Chosen by rendering the crop behind the real slit pattern and looking at it,
     not by trusting the manifest's focal point: at 50% the aperture is filled with
     the empty floor and the trees, and the people the sentence is about are off to
     the right. At 72% the seated row, the open notebooks and the woman speaking
     are where the reader's eye already is. */
  pos: '72% 58%',
  posNarrow: '64% 58%',
};

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
              <img
                className="ia-room__img"
                src={`/media/stills/${ROOM.id}-1620.webp`}
                srcSet={ROOM.widths.map((w) => `/media/stills/${ROOM.id}-${w}.webp ${w}w`).join(', ')}
                /* the room is never wider than the page, and the page is capped at 68rem */
                sizes="(min-width: 1100px) min(62vw, 68rem), calc(100vw - 2 * clamp(1.35rem, 4.2vw, 4.25rem))"
                alt={ROOM.alt}
                loading="lazy"
                decoding="async"
                style={{ '--ia-op': ROOM.pos, '--ia-op-n': ROOM.posNarrow } as CSSProperties}
              />
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
