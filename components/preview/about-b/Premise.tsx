import { about } from '@/content/copy';

/**
 * 03 — THE PREMISE.   Concept B · "the words are the graphic".
 *
 * The founding sentence is not set on a photograph and not set beside one. The photograph is
 * INSIDE it: the letterforms are the only aperture onto a room full of teachers, so the
 * sentence that says no single teacher can know everything is literally made out of a room
 * full of them. Nothing else on this plate is a picture.
 *
 * CONTRAST BY CONSTRUCTION, not by luck. The glyph fill is
 *   linear-gradient(cream 0.50) over the photograph
 * so the darkest pixel a letter can ever contain is 0.50 x #FBF7F2 = #7D7B79, which measures
 * 4.25:1 against --ground-deep. The requirement for 100px display type is 3:1. The image can
 * therefore be swapped for any frame in the archive without re-measuring — see NOTES.md.
 *
 * The paragraph is one <p> and one string from copy.ts, sliced at its own full stop. Both
 * sentences are the client's, unaltered and in order; only their size differs, so the
 * paragraph decelerates from a shout into speech instead of sitting as a block.
 */

const [definition, premise, becoming] = about.opening;

/** the paragraph's own sentence boundary — no string is retyped, nothing is added */
const cut = premise.indexOf('. ') + 1;
const premiseHead = premise.slice(0, cut);
const premiseTail = premise.slice(cut).trimStart();

export function Premise() {
  return (
    <section className="b-sec b-sec--deep b-prem" aria-labelledby="b-prem-h">
      {/*
        The page's only <h1>. On the real page the hero owns it and this becomes an <h2>;
        in this isolated preview the hero is absent, so the register mark carries it.
      */}
      <h1 className="b-eyebrow b-eyebrow--dark" id="b-prem-h">
        <i className="b-eyebrow__rule" aria-hidden="true" />
        <span className="b-eyebrow__n">03</span>
        {about.title}
      </h1>

      <div className="b-prem__body">
        {/* the definition. A whisper: it is a dictionary entry, not an argument. */}
        <p className="b-prem__def" data-br="up">
          {definition}
        </p>

        <p className="b-prem__p">
          <span className="b-prem__mega" data-br="up">
            {premiseHead}
          </span>{' '}
          <span className="b-prem__tail" data-br="up" style={{ '--d': '140ms' } as React.CSSProperties}>
            {premiseTail}
          </span>
        </p>
      </div>

      {/* the third paragraph is the widening, and it is the only italic on the plate. */}
      <p className="b-prem__now" data-br="up" style={{ '--d': '80ms' } as React.CSSProperties}>
        {becoming}
      </p>
    </section>
  );
}
