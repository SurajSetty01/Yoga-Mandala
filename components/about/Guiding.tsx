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
/**
 * TWO lines, split 4/3: "Yoga is better when" / "we learn together." — 19 characters and 18,
 * which is as evenly as this sentence divides. It was three; the client asked for two, and
 * two lets the setting be larger for the same measure.
 */
const ROWS = [words.slice(0, 4), words.slice(4)];

/**
 * Only the first word carries the photograph — variant A of three the client compared.
 *
 * Worth recording, because it is a real trade and it was chosen with it visible: a filled
 * glyph must be DARKER than the paper it stands on but cannot be as dark as solid --ink, so
 * "Yoga" reads slightly lighter than the words around it. Filling the whole sentence avoids
 * that (nothing is competing) and was the recommendation; the client preferred the ink to
 * stay punchy and the picture to be an accent. If it is ever revisited, the fix is not to
 * lighten the ink — it is to fill more words, not fewer.
 */
const FILLED_INDEX = 0;

export function Guiding() {
  return (
    <section className="ab-sec ab-guide" aria-label={about.guiding.heading}>
      <div className="ab-rail">
        <blockquote className="ab-quote" data-r="quote">
          <p className="ab-quote__line">
            {ROWS.map((row, r) => {
              const offset = r === 0 ? 0 : ROWS[0]!.length;
              return (
                <span className="ab-quote__row" key={r} style={{ '--i': r } as React.CSSProperties}>
                  {/* INLINE marks, tight against the text: the opening one immediately before
                      the first letter and the closing one immediately after the last, rather
                      than hung as blocks above and below the sentence. */}
                  {r === 0 ? (
                    <span className="ab-quote__mk ab-quote__mk--o" aria-hidden="true">
                      {'“'}
                    </span>
                  ) : null}
                  {row.map((w, i) => (
                    <span
                      key={`${r}-${i}`}
                      className={offset + i === FILLED_INDEX ? 'ab-quote__w ab-quote__w--fill' : 'ab-quote__w'}
                    >
                      {w + (i < row.length - 1 ? ' ' : '')}
                    </span>
                  ))}
                  {r === ROWS.length - 1 ? (
                    <span className="ab-quote__mk ab-quote__mk--c" aria-hidden="true">
                      {'”'}
                    </span>
                  ) : null}
                </span>
              );
            })}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
