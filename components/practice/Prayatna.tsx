import type { CSSProperties } from 'react';
import { FRAMES } from './frames';
import { Ask, Cap, Eyebrow, Shot } from './parts';
import { DOOR } from './sentences';

/**
 * 03 · PRAYATNA AND RELATED OFFERINGS — THE CLIENT'S SENTENCE WITH ITS GRAMMAR TURNED
 * DOWN AND THE PRACTICE TURNED UP.
 *
 * TWO THINGS ARE TRUE AT ONCE HERE AND THE SECTION HAS TO HOLD BOTH.
 *
 * The first: Prayatna is real. Blueprint §4.3 names it among Praṇava's programmes and
 * Blueprint §6 asks this page for "Prayatna and related offerings". The second: it is
 * described NOWHERE. Not a sentence, not a length, not a level, not a fee, in any of the
 * client's three documents. `programmes` in content/pranava.ts carries its name and a null
 * blurb, and null renders as nothing.
 *
 * So the name is set at size, and the honest mark under it says in one line that the
 * details are not published and opens the one channel that works. No card, no outline, no
 * "coming soon" plate, no grey box where a paragraph will go. When the description arrives
 * it goes in the space the name already occupies.
 *
 * THE OTHER FIVE PROGRAMME NAMES ARE NOT HERE. Blueprint §6 gives the full list to Learn
 * and gives this page Prayatna alone; /learn/ is this page's nearest neighbour in subject
 * and printing the same five names on both would make one of them redundant.
 *
 * "RELATED OFFERINGS" is answered by the client's own door sentence, which is the only
 * thing they have written about what a sustained practice at Praṇava is developed through.
 * Its six terms are set at display scale and the grammar between them — "Develop a
 * sustained practice through", the commas, the "and" — drops to a whisper. The sentence is
 * still there, in the client's order, punctuation and all; what changes is which half of
 * it you read first. Nothing is retyped: components/practice/sentences.ts derives the
 * terms from the string, so a rewritten door rewrites this.
 *
 * Beside it stands one more row of one shape — three people holding the same supported
 * position along a hall floor. On a page about repetition the photograph is the argument,
 * and it is the third time the page has made it, which is the point.
 */
export function Prayatna() {
  const last = DOOR.terms.length - 1;

  return (
    <section className="pc-s pc-s--deep pc-pra" id="pc-prayatna">
      <div className="pc-rail">
        <Eyebrow n="03" dark>
          Prayatna and related offerings
        </Eyebrow>

        <div className="pc-pra__top">
          <div className="pc-pra__name">
            <h3 className="pc-pra__word">Prayatna</h3>
            <Ask
              dark
              note="One of the programmes Praṇava names. No description, format or fee for it is published on this site yet."
              subject="Ask about Prayatna"
              message="Hello Praṇava. I would like to know more about Prayatna."
            />
          </div>

          <figure className="pc-pra__fig" data-pc="up">
            <Shot
              frame={FRAMES.rowHeld}
              sizes="(max-width: 899px) 86vw, (max-width: 1399px) 34vw, 30rem"
            />
            <figcaption>
              <Cap dark>Three people holding one supported position along a hall floor.</Cap>
            </figcaption>
          </figure>
        </div>

        {/*
          One sentence, two voices. The spans concatenate back to
          about.journey[1].body character for character — open + " " + terms joined by
          ", " with " and " before the last + ".".
        */}
        <p className="pc-pra__door" data-pc="fade">
          <span className="pc-pra__grammar">{DOOR.open} </span>
          {DOOR.terms.map((t, i) => (
            <span className="pc-pra__term" key={t} style={{ '--i': i } as CSSProperties}>
              {t}
              {i < last - 1 ? <span className="pc-pra__grammar">, </span> : null}
              {i === last - 1 ? <span className="pc-pra__grammar"> {DOOR.join} </span> : null}
              {i === last ? <span className="pc-pra__grammar">.</span> : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
