import { about } from '@/content/pranava';
import { RunningHead } from './RunningHead';

/**
 * §03 · OUR APPROACH — *four terms hung out into the margin, each standing under
 * a rule that draws across the whole leaf.*
 *
 * The four are not columns, cards or a three-plus-one: they are four entries of
 * a lexicon, and the only things organising them are things a printed page has
 * always had. Each head-word is set at display size and RIGHT-aligned to the
 * left edge of its own argument, so the four hang into the margin by four
 * different amounts and the ragged edge of the page is the outer one. That is
 * deliberately the inverse of stretching four words to a single measure, which
 * /about/ already does once in its Values section.
 *
 * The rule above each entry crosses the entire leaf, edge to edge, and draws
 * left to right as you reach it — the section's only motion, `transform` alone,
 * and its finished state is the CSS default so a reader with no JavaScript gets
 * five drawn rules rather than none.
 *
 * THE CLIENT'S LEAD IS ONE STRING AND STAYS ONE STRING. It is split on its own
 * sentence boundaries and set one clause to a line, which is typesetting, not
 * editing — the words, their order and their punctuation are untouched. It is
 * indented to the argument column rather than to the edge of the leaf, so the
 * margin is empty when you arrive and the first head-word is the first thing
 * that ever drops into it.
 *
 * There is no photograph in this section at all. The client's complaint was an
 * image here "mostly cut off and barely visible"; the pair answers that with
 * exactly one photograph, reproduced whole, and it is in §04.
 */

/** i, ii, iii, iv — the marginal folio, in the client's own order. */
const FOLIO = ['i', 'ii', 'iii', 'iv'];

export function ApprCApproach() {
  /* '. ' is the only boundary in this sentence; the trailing full stop is kept
     on the clause it belongs to, so nothing is added and nothing is lost. */
  const clauses = about.approach.lead.split(/(?<=\.)\s+/);

  return (
    <section className="ac-sec ac-sec--warm ac-sec--first" aria-labelledby="ac-c-approach">
      <RunningHead folio="§ 03" title="Our approach" id="ac-c-approach" />

      <div className="ac-leaf">
        <p className="ac-lead" data-ac="up">
          {clauses.map((c) => (
            <span className="ac-lead__line" key={c}>
              {c}
            </span>
          ))}
        </p>
      </div>

      <div className="ac-entries">
        {about.approach.items.map((item, i) => (
          <article
            className="ac-entry ac-leaf"
            key={item.name}
            data-ac="up"
            style={{ ['--ac-d' as string]: `${i * 90}ms` }}
          >
            <div className="ac-entry__in">
              <h3 className="ac-entry__word">{item.name}</h3>
              <p className="ac-entry__gloss">{item.body}</p>
              <span className="ac-entry__folio" aria-hidden="true">
                {FOLIO[i]}
              </span>
            </div>
          </article>
        ))}
        {/* the foot rule, so the four entries are ruled off at both ends rather
            than trailing away into the ground */}
        <div className="ac-leaf">
          <div className="ac-entries__close" data-ac="rule" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
