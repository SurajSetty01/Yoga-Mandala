import type { ReactNode } from 'react';
import { about } from '@/content/pranava';
import { CLASS_CLIP, GUIDE_CLIP, type Clip } from './clips';
import { Tl3Motion } from './Tl3Motion';

/**
 * /learn/ §02 — WHAT TEACHER EDUCATION IS. The page's spine, and the client's sentence:
 *
 *   "Teacher education, for us, is not only about learning how to conduct a class.
 *    It is about developing the understanding, discernment and responsibility required
 *    to guide another person's practice."
 *
 * THE EVENT. Two panes share one frame, and a divider stands between them. At first the
 * left pane holds two thirds of the frame: a man demonstrating a pose while three people
 * watch — a class, conducted — playing, with the first clause beside it in large type.
 * The right pane is a still sliver of a man steadying one person inverted at a wall. As the
 * reader scrolls, the divider walks from two thirds across to one third. It wipes the
 * refusal away and uncovers the answer; the class stops, the one person starts to move.
 * The sentence moves its weight from "not only" to "it is about", and the divider moves it
 * physically.
 *
 * Only the wider pane's clip ever plays. Both clips keep a visible poster <img> beneath
 * them and carry no `poster` attribute (it is fetched even when `src` is never set).
 *
 * WITHOUT MOTION the section is the same argument laid out rather than performed: the
 * class pane sits upper left, the guiding pane lower right, each with its clause. On a
 * phone the panes stack with the two clauses meeting across the divider, and each clip
 * plays while it is in view unless the reader has asked to save data.
 *
 * The clauses are sliced out of `about.teach.close` at its own sentence boundary, never
 * retyped, so neither half can drift from the client's wording.
 */

const CLOSE = about.teach.close;
const CUT = CLOSE.indexOf('. ') + 1;
const CLAUSE_A = CLOSE.slice(0, CUT);
const CLAUSE_B = CLOSE.slice(CUT).trim();

/** Set one phrase of a clause in the accent voice. The phrase is found in the client's own
 *  string, so if the wording ever changes the clause simply renders plain. */
function accent(text: string, phrase: string): ReactNode {
  const i = text.indexOf(phrase);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <em className="tl3-em">{phrase}</em>
      {text.slice(i + phrase.length)}
    </>
  );
}

function Pane({ clip, side }: { clip: Clip; side: 'a' | 'b' }) {
  return (
    <figure className="tl3-clip" data-tl3-clip={side}>
      <picture>
        <source type="image/avif" srcSet={`/media/posters/${clip.id}.avif`} />
        <img
          className="tl3-media"
          src={`/media/posters/${clip.id}.jpg`}
          width={clip.w}
          height={clip.h}
          alt={clip.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: clip.pos }}
        />
      </picture>
      <video
        className="tl3-media tl3-vid"
        muted
        playsInline
        loop
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
        data-src={`/media/clips/${clip.id}.mp4`}
        width={clip.w}
        height={clip.h}
        style={{ objectPosition: clip.pos }}
      />
      <span className="tl3-veil" aria-hidden="true" />
    </figure>
  );
}

export function LearnTeacherEducation() {
  return (
    <section className="tl3" id="what-teacher-education-is" aria-labelledby="tl3-title">
      <div className="tl3-run">
        <div className="tl3-stage">
          <h2 className="tl3-mark" id="tl3-title">
            <span className="tl3-mark__n">02</span>
            <span className="tl3-mark__rule" aria-hidden="true" />
            <span className="tl3-mark__t">What teacher education is</span>
          </h2>

          <div className="tl3-frame">
            <div className="tl3-pane tl3-pane--a tl3-act" data-tl3-pane="a">
              <div className="tl3-body">
                <Pane clip={CLASS_CLIP} side="a" />
                <div className="tl3-say">
                  {/* what the picture beside it shows — the img's own alt, so hidden from
                      assistive tech rather than read twice */}
                  <p className="tl3-shows" aria-hidden="true">
                    {CLASS_CLIP.alt}
                  </p>
                  <p className="tl3-clause">{accent(CLAUSE_A, 'not only')}</p>
                </div>
              </div>
            </div>

            <div className="tl3-pane tl3-pane--b" data-tl3-pane="b">
              <div className="tl3-body">
                <div className="tl3-say">
                  <p className="tl3-shows" aria-hidden="true">
                    {GUIDE_CLIP.alt}
                  </p>
                  <p className="tl3-clause">{accent(CLAUSE_B, 'guide another person')}</p>
                </div>
                <Pane clip={GUIDE_CLIP} side="b" />
              </div>
            </div>

            <span className="tl3-divider" aria-hidden="true" />
          </div>
        </div>
      </div>
      <Tl3Motion />
    </section>
  );
}
