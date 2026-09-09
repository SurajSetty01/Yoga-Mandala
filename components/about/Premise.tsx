import { about } from '@/content/copy';

/**
 * 03 — THE PREMISE.
 *
 * Concept B's treatment, taken as the client chose it: the founding sentence is not set ON a
 * photograph and not set BESIDE one. The photograph is INSIDE it — the letterforms are the
 * only aperture onto a room full of teachers, so the sentence saying no single teacher can
 * know everything is literally made out of a room full of them.
 *
 * An earlier attempt narrowed this to the single word "vast" on a paper plate, on the theory
 * that one word gives each letter more room to hold a legible piece of picture. It measured
 * better and the client preferred this. The whole sentence stays.
 *
 * CONTRAST BY CONSTRUCTION, not by luck. The glyph fill is a 0.50 cream layer over the
 * photograph, so the darkest pixel a letter can ever contain is 0.50 x #FBF7F2 = #7D7B79,
 * which measures 4.25:1 against --ground-deep. Display type at this size needs 3:1. The frame
 * can therefore be swapped for any other in the archive without re-measuring.
 *
 * The paragraph is one string from copy.ts sliced at its own full stop: both sentences are the
 * client's, unaltered and in order, and only their size differs — so the paragraph decelerates
 * from a shout into speech rather than sitting as a block.
 */

const [definition, premise, becoming] = about.opening;

/** the paragraph's own sentence boundary — no string is retyped, nothing is added */
const cut = premise.indexOf('. ') + 1;
const premiseHead = premise.slice(0, cut);
const premiseTail = premise.slice(cut).trimStart();

export function Premise() {
  return (
    <section className="ab-sec ab-sec--deep ab-prem" aria-labelledby="ab-prem-h">
      {/* The hero owns the page's <h1>, so the register mark here is an <h2>. */}
      <h2 className="ab-eyebrow ab-eyebrow--dark" id="ab-prem-h">
        <i className="ab-eyebrow__rule" aria-hidden="true" />
        <span className="ab-eyebrow__n">03</span>
        {about.title}
      </h2>

      <div className="ab-prem__body">
        {/* the definition. A whisper: it is a dictionary entry, not an argument. */}
        <p className="ab-prem__def" data-r="up">
          {definition}
        </p>

        <p className="ab-prem__p">
          <span className="ab-prem__mega" data-r="up">
            {premiseHead}
          </span>{' '}
          <span
            className="ab-prem__tail"
            data-r="up"
            style={{ '--d': '140ms' } as React.CSSProperties}
          >
            {premiseTail}
          </span>
        </p>
      </div>

      {/* the third paragraph is the widening, and the only italic on the plate. */}
      <p className="ab-prem__now" data-r="up" style={{ '--d': '80ms' } as React.CSSProperties}>
        {becoming}
      </p>
    </section>
  );
}
