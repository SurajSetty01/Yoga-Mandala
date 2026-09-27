import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { MAT, src, srcSet } from './frames';

/**
 * §01 INTRODUCTION — concept sx2c: A CONCORDANCE OF PRACTICE.
 *
 * What happens: a strip of photograph the proportion of a yoga mat is unrolled down the
 * middle of the page, and every one of the client's five sentences crosses it at the same
 * word. Before a sentence is reached only that word is on the page — "practice", five
 * times, stacked on the mat — and as the reader arrives each one opens outward into the
 * sentence it belongs to.
 *
 * Why this content behaves this way: the section's first line is a claim — "Yoga is more
 * than a practice on the mat." — and the other four are the argument for it. Read them
 * together and the word "practice" is in every one: a practice on the mat; encompassing
 * practice; its contemporary practice; sustained practice; study, practice and experience.
 * Never absent and never alone. A key-word-in-context concordance (Luhn's KWIC: the node
 * word aligned in one column, its context falling away on either side, read vertically for
 * the pattern) is the one typographic form that makes that visible without adding a word.
 * The mat is the axis; everything the client says Yoga is MORE than it, spreads out from it.
 *
 * NOTHING HERE RETYPES A CLIENT SENTENCE. Each line is cut from `about.intro` at the word
 * itself with a regex, and the four pieces concatenate back to the sentence character for
 * character — `concord()` checks that and falls back to the plain sentence if it ever
 * does not. The full sentence is also in the paragraph as screen-reader text, because a
 * paragraph whose words are three grid items is read as three fragments.
 *
 * Server component: every word and the photograph are in the static HTML, and the page is
 * complete with JavaScript off and under reduced motion. `Motion.tsx` only adds the two
 * arrivals — the unroll and the opening — and adds them to nothing already on screen.
 */

type Line = { text: string; left: string; word: string; hang: string; right: string };

const KEY = /\bpractice\b/;

function concord(text: string): Line | null {
  const m = KEY.exec(text);
  if (!m) return null;
  const left = text.slice(0, m.index).trimEnd();
  let rest = text.slice(m.index + m[0].length);
  // A mark that belongs to the key word — "practice," "practice." — travels WITH it and
  // hangs outside its box, so the word itself is what sits on the axis (SECTION-MECHANICS
  // rule 7: centre on the words, never on the punctuation).
  const hang = /^[,.;:]/.exec(rest)?.[0] ?? '';
  rest = rest.slice(hang.length).trimStart();
  const rebuilt = `${left}${left ? ' ' : ''}${m[0]}${hang}${rest ? ' ' : ''}${rest}`;
  if (rebuilt !== text) return null;
  return { text, left: bind(left), word: m[0], hang, right: bind(rest) };
}

/** Display only: a dash never starts a line. The space before an em dash becomes a
 *  no-break space in the SET text; the sentence itself, and the screen-reader copy, are
 *  untouched. Balanced wrapping at 768 otherwise put "— encompassing" on a line alone. */
const bind = (s: string) => s.replace(/ \u2014/g, '\u00a0\u2014');

export function Sx2cIntroduction() {
  const lines = about.intro.map(concord);

  return (
    <section className="sx2c-intro" id="sx2c-intro">
      <div className="sx2c-intro__rail">
        <Eyebrow n="01">Introduction</Eyebrow>
      </div>

      <div className="sx2c-conc">
        {/* THE MAT. Not IntersectionObserved through a clip: the unroll is a paper cover
            translated out of the strip, so the strip's own box is always full-size. */}
        <div className="sx2c-mat" data-sx2c="mat">
          <img
            className="sx2c-mat__img"
            src={src(MAT)}
            srcSet={srcSet(MAT)}
            sizes="(min-width: 1100px) 58vw, (min-width: 760px) 640px, (min-width: 417px) 590px, 141vw"
            alt={MAT.alt}
            loading="lazy"
            decoding="async"
            width={960}
            height={1280}
            style={{ '--sx2c-op': MAT.pos, '--sx2c-op-n': MAT.posNarrow } as CSSProperties}
          />
          <span className="sx2c-mat__cover" aria-hidden="true" />
        </div>

        {lines.map((l, i) => {
          if (!l)
            return (
              <p key={i} className="sx2c-row sx2c-row--plain">
                {about.intro[i]}
              </p>
            );
          /* Line n's key word sits on grid row 2n. What comes before it spans the gap
             above and ends on that row; what comes after starts on it and spans the gap
             below. Rows are placed explicitly so the five key words land on one pitch. */
          const n = i + 1;
          const place = {
            '--sx2c-l': `${2 * n - 1} / ${2 * n + 1}`,
            '--sx2c-k': `${2 * n}`,
            '--sx2c-r': `${2 * n} / ${2 * n + 2}`,
          } as CSSProperties;
          return (
            <p
              key={i}
              className={`sx2c-row${i === 0 ? ' sx2c-row--claim' : ''}${l.right ? '' : ' sx2c-row--ends'}`}
              style={place}
            >
              <span className="sr">{l.text}</span>
              <span className="sx2c-row__l" aria-hidden="true">
                {l.left}
              </span>
              {/* the key word is what is observed: on wide screens the paragraph is
                  `display: contents` and has no box of its own to intersect */}
              <span className="sx2c-row__k" aria-hidden="true" data-sx2c="row">
                <span className="sx2c-row__w">
                  {l.word}
                  {l.hang ? <span className="sx2c-row__hang">{l.hang}</span> : null}
                </span>
              </span>
              {l.right ? (
                <span className="sx2c-row__r" aria-hidden="true">
                  {l.right}
                </span>
              ) : null}
            </p>
          );
        })}
      </div>
    </section>
  );
}
