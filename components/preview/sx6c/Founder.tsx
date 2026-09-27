import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATE, stillSet, stillSrc } from './frame';

/**
 * §06 · THE FOUNDER — concept C: TYPE IS THE STRUCTURE.
 *
 * WHAT HAPPENS. The founder's life is set as a ledger: the opening words of each of the five
 * sentences hang to the left of one vertical axis as marginal heads, the rest of the
 * sentence runs to its right at a reading measure, so the heads read down the page as an
 * outline of a life — Pranav Murthy / His teaching journey / Over the years, / His approach
 * / Through Pranava, — and the page is filled by type on both sides of the axis rather than
 * by a heading on one side and air on the other. Then the section's one photograph arrives
 * under a TISSUE: a translucent guard sheet, as a book lays over its frontispiece, with the
 * teacher's sentence printed on it. The photograph holds still while the tissue travels on
 * with the page, so reading the sentence to its end is what lifts it — off two bodies
 * arched over folding chairs, each held up by a prop and by nobody's hands. The tissue
 * comes to rest over the band of shade netting at the top of the frame, still carrying the
 * caption, the way old books sometimes printed a plate's caption on its guard.
 *
 * The frontispiece of a book about a teacher traditionally carries his portrait. The archive
 * identifies no one, so this one carries what his sentence says a teacher is for: support
 * the student can stand up out of.
 *
 * WHERE THE MOVES COME FROM (researched, named, and where each one lives):
 *  · Marginal heads / outdented lead-ins — Tufte CSS and gwern.net's sidenote survey for the
 *    margin column and its narrow fallback ("not floated, simply indented"); the magazine
 *    lead-in, the first words of a paragraph set apart, pulled out into the margin.
 *  · Optical margin alignment — CSS `hanging-punctuation` is Safari-only, so a trailing
 *    comma is hung with a negative margin (`.sx6c-hang`), as InDesign's optical margin does.
 *  · Measure — Butterick's 45–90 characters, Bringhurst's ~66: the text column is 34em.
 *  · The chapter-opening lead-in — the text under a title that already names its subject
 *    opens with that name in small capitals (row 1), so the name is never set twice at size.
 *  · The tissue guard — a translucent leaf tipped in facing a frontispiece; most are blank,
 *    but some carry "a printed caption about the plate" (Tomfolio's glossary).
 *  · The sticky graphic — The Pudding's scrollytelling-with-`position: sticky`: the parent's
 *    height is the hold, no scroll listener, and it degrades to static on its own.
 *
 * NO JAVASCRIPT. The hold is `position: sticky` (the "sticky graphic" pattern), so the page
 * with scripts off has the whole mechanic, and under `prefers-reduced-motion` the plate is
 * simply set in its resting place — tissue folded back over the netting, sentence above it —
 * which is the same composition, stopped.
 *
 * EVERY WORD of the client's is sliced out of `about.founder` at render time — the heads are
 * the first N words of each sentence and the body is the remainder — so nothing is retyped
 * and `check:copy` sees the content file untouched. `about.founder.action` ("Meet Pranav")
 * names a page that does not exist and renders nothing.
 */

/** How many words of each sentence hang in the margin. The client's sentences, in order. */
const HEAD_WORDS = [2, 3, 3, 2, 2] as const;

function split(sentence: string, n: number): [string, string] {
  const words = sentence.split(' ');
  return [words.slice(0, n).join(' '), words.slice(n).join(' ')];
}

/** A head ending in a comma hangs the comma past the axis, so the WORD meets the rule.
    Row 1's head is the founder's name and is set as a small-capital lead-in, not a head. */
function Head({ text }: { text: string }) {
  const hang = /[,;:]$/.test(text);
  return hang ? (
    <>
      {text.slice(0, -1)}
      <span className="sx6c-hang">{text.slice(-1)}</span>
    </>
  ) : (
    <>{text}</>
  );
}

export function Founder() {
  const f = about.founder;
  const sentences = f.body.map((s, i) => split(s, HEAD_WORDS[i] ?? 2));

  // The founder's name, taken from his own first sentence rather than typed here.
  const name = sentences[0]![0];
  const by = f.kicker.endsWith(name) ? f.kicker.slice(0, f.kicker.length - name.length).trimEnd() : null;

  // The one date in the biography, lifted as a chronicle's shoulder note. Decorative: it is
  // already read in the sentence beside it, so it is hidden from assistive technology.
  const year = f.body[0].match(/\b(19|20)\d\d\b/)?.[0] ?? null;

  return (
    <section className="sx6c" id="sx6c-founder" aria-labelledby="sx6c-reg">
      <div className="sx6c-rail">
        <h2 className="sx6c-reg" id="sx6c-reg">
          <span className="sx6c-reg__n">06</span>
          <span className="sx6c-reg__rule" aria-hidden="true" />
          The founder
        </h2>

        {/* The kicker is the ledger's first row: its first words on the head side of the
            axis, the name on the text side. The name is Inter — DESIGN-SYSTEM §1. */}
        <p className="sx6c-title">
          {by ? (
            <>
              <span className="sx6c-title__by">{by} </span>
              <span className="sx6c-title__name">{name}</span>
            </>
          ) : (
            <span className="sx6c-title__name">{f.kicker}</span>
          )}
        </p>
        <p className="sx6c-role">{f.role}</p>

        <div className="sx6c-ledger">
          {sentences.map(([head, rest], i) => (
            <p className={`sx6c-row${i === 0 ? ' sx6c-row--name' : ''}`} key={head}>
              <span className="sx6c-head">
                <Head text={head} />{' '}
              </span>
              <span className="sx6c-body">{rest}</span>
              {i === 0 && year ? (
                <span className="sx6c-shoulder" aria-hidden="true">
                  {year}
                </span>
              ) : null}
            </p>
          ))}
        </div>
      </div>

      {/* THE PLATE AND ITS TISSUE. `sx6c-box` is the size container the plate's geometry is
          solved against; `sx6c-stage` is the sticky track. */}
      <div className="sx6c-box">
        <figure
          className="sx6c-stage"
          style={
            {
              '--sx6c-arw': PLATE.wide.ar,
              '--sx6c-arn': PLATE.narrow.ar,
              '--sx6c-posw': PLATE.wide.pos,
              '--sx6c-posn': PLATE.narrow.pos,
            } as CSSProperties
          }
        >
          <div className="sx6c-tissue">
            <blockquote className="sx6c-quote">
              <p>{f.quote}</p>
            </blockquote>
          </div>
          <div className="sx6c-plate">
            <img
              src={stillSrc(PLATE, 960)}
              srcSet={stillSet(PLATE)}
              sizes="(max-width: 767px) calc(100vw - 2.5rem), min(60rem, 87vh)"
              alt={PLATE.alt}
              width={PLATE.w}
              height={PLATE.h}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="sx6c-cap">
            <span className="sx6c-cap__what">{PLATE.shows}</span>
            <span className="sx6c-cap__where">{PLATE.at}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
