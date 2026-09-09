import { about } from '@/content/copy';

/**
 * 07 — THE GUIDING THOUGHT.   *The sentence arrives, and the marks close around it.*
 *
 * Thirty-eight characters closing nine hundred words, so they get the whole plate and the
 * page's top scale. None of the three tournament concepts was kept here; this is new.
 *
 * NO REGISTER MARK AND NO HEADING. Every other section on this page is numbered and named,
 * and this one deliberately is not: a saying introduced by a label is a heading with a
 * quotation under it, not a saying. The page has been counting all the way down and simply
 * stops counting for its last line. The section keeps an accessible name from the quotation
 * itself, so nothing is lost to assistive technology.
 *
 * THE IDEA. Nobody said this sentence. It is not a testimonial, it has no author, and there
 * is deliberately no attribution — so the quotation marks cannot point at a speaker. Instead
 * they behave like a community adopting a saying: the marks start wide of the sentence and
 * settle IN onto it as it lands, in the order a sentence is spoken — open, three clauses,
 * close. The last thing that moves on the page is the closing mark, which is the full stop of
 * the whole document.
 *
 * They are typographic marks, U+201C and U+201D, not straight quotes, and they are treated as
 * a designed element rather than punctuation: set in clay at roughly three times the display
 * size, hung outside the measure so they never touch a letter, and `aria-hidden` because the
 * <blockquote> already carries the quotation to assistive technology and "left double
 * quotation mark" is not something anybody needs read to them.
 *
 * Clay is ornament, and this is ornament. At this size it is also large text by every
 * definition the probe uses: #C1613C on #FBF7F2 is 3.90:1 where the bar is 3.0. The marks are
 * placed clear of the sentence at every width, so no ink ever crosses them.
 *
 * The sentence is split into three groups at its OWN spaces so the clauses can arrive in
 * sequence; the spans concatenate back to the client's line exactly, spaces included, and
 * nothing is retyped. Under `prefers-reduced-motion` and with JavaScript off the plate is
 * complete and still — the start states are scoped to `.js` and globals.css forces every
 * [data-r] to its finished state.
 */

const line = about.guiding.line;

/**
 * Three clauses at the sentence's own word boundaries: "Yoga is better / when we learn /
 * together." The split is a line break, not an edit — each group keeps the space that
 * followed it, so the concatenation is character-for-character the client's sentence.
 */
const words = line.split(' ');
const BREAKS = [3, 6];
const groups = [
  words.slice(0, BREAKS[0]).join(' ') + ' ',
  words.slice(BREAKS[0], BREAKS[1]).join(' ') + ' ',
  words.slice(BREAKS[1]).join(' '),
];

export function Guiding() {
  return (
    <section className="ab-sec ab-guide" aria-label={about.guiding.heading}>
      <div className="ab-rail">
        <blockquote className="ab-quote" data-r="quote">
          <span className="ab-quote__mk ab-quote__mk--o" aria-hidden="true">
            {'“'}
          </span>

          <p className="ab-quote__line">
            {groups.map((g, i) => (
              <span className="ab-quote__row" key={g} style={{ '--i': i } as React.CSSProperties}>
                {g}
                {i === groups.length - 1 ? (
                  <span className="ab-quote__mk ab-quote__mk--c" aria-hidden="true">
                    {'”'}
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
