import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from './parts';
import { PRACTICE } from './sentences';

/**
 * 01 · ONGOING SĀDHANA — THE WORD SAID AGAIN AND AGAIN, A LITTLE LARGER EACH TIME, AND
 * CUT OFF AT BOTH ENDS OF THE FRAME.
 *
 * The client's first value is Sādhana and its whole definition is four words long:
 * "Consistent practice over quick results." A section that set that as a heading over a
 * paragraph would have said nothing the sentence did not already say. So the section says
 * it the only way type can: it repeats.
 *
 * Fifteen settings of one word run down a column. Each is a little larger than the one
 * above it — nothing sudden, everything cumulative, which is the difference between a
 * practice and a burst of enthusiasm. The column is TALLER THAN ITS WELL and is cut hard
 * by the top and bottom edges, so the reader can see that it did not start here and does
 * not end here. That is the entire claim of the word "ongoing", made without a number, a
 * date or a duration — none of which exist in the client's material.
 *
 * It drifts upward slower than the page as the section passes, so more of it keeps
 * arriving from below. With JavaScript off, or under prefers-reduced-motion, the column is
 * simply there, cut at both ends, and nothing has been lost.
 *
 * NO FADE AT THE CUT. A gradient mask would have been prettier and would have put pale
 * type on paper at the exact place the contrast probe samples; a hard edge is both honest
 * and measurable. Every word in the column is full ink.
 *
 * THE FACE IS INTER, AND THAT IS CORRECTNESS RATHER THAN TASTE. Sādhana carries ā, and
 * Fraunces has no precomposed ā — the browser decomposes it and Fraunces' mark positioning
 * fails, dropping the macron. DESIGN-SYSTEM §1 recorded this for the client's name and
 * /about/ §09 hit it again on these same four value words.
 *
 * The column is `aria-hidden`: a screen reader is told the section is "01 Ongoing Sādhana"
 * once, by the register mark, and then reads the two sentences. Fifteen repetitions of a
 * word are a picture, and a picture of a word is not a word.
 */
const REPEATS = 15;

export function Sadhana() {
  const word = about.values[0].name;

  return (
    <section className="pc-s pc-sad" id="pc-sadhana">
      <div className="pc-rail">
        <Eyebrow n="01">Ongoing Sādhana</Eyebrow>

        <div className="pc-sad__grid">
          <div className="pc-sad__well" data-pc="fade">
            <p className="pc-sad__col" aria-hidden="true">
              {Array.from({ length: REPEATS }, (_, i) => (
                <span className="pc-sad__w" key={i} style={{ '--i': i } as CSSProperties}>
                  {word}
                </span>
              ))}
            </p>
          </div>

          <div className="pc-sad__say">
            <p className="pc-sad__lead" data-pc="up">
              {about.values[0].body}
            </p>
            <p className="pc-sad__body" data-pc="up" style={{ '--pc-d': '120ms' } as CSSProperties}>
              {PRACTICE[0]} {PRACTICE[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
