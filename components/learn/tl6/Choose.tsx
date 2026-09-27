import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import { about } from '@/content/pranava';
import { Mark, Shot } from '../parts';
import { PATHS } from './frames';
import { Tl6Arrival } from './Arrival';

/**
 * 05 — HOW TO CHOOSE. Four paths meet at one arrival.
 *
 * The client never says how to choose between programmes, and nothing ties a programme to a
 * kind of reader, so there is no table, quiz or decision tree here. What the client HAS
 * written is a sentence that is already a chooser: four beginnings and one destination.
 *
 *   Whether you are / beginning… / seeking… / preparing… / or simply… / Pranava is a space…
 *
 * Each clause stands over its own tall photograph of a path. As the reader scrolls, the
 * feet of the four panels swing inward and narrow until the four touch, a fan of paths whose
 * lines all run to one point, and that point is the top edge of a moving frame of shaded
 * paving. The resolve and the enquiry route are set at that arrival. The grammar of the
 * sentence is the geometry: four subordinate clauses, one main clause.
 *
 * On phones the four are short bands stacked down the axis, each narrower at its foot than
 * its head, so the stack tapers into the arrival. Reduced motion, and no script, give the
 * met state, which is the whole picture.
 *
 * COPY. Every word is sliced out of `about.closing.body` at its own commas, so no fragment
 * can drift from the client's wording, and the commas stay with their clauses: read in
 * order, the six parts ARE the sentence, "or" included. 'Pranava' is undiacritised in that
 * sentence and stays so. Only the register mark and "Enquire" are page-written.
 *
 * All six parts are children of ONE paragraph (laid out with `display: contents`), and the
 * photographs are outside it, so a screen reader hears the sentence whole rather than
 * interrupted by four image descriptions.
 */

const S = about.closing.body;
const LEAD = 'Whether you are';
const TAIL_AT = S.lastIndexOf(', Pranava is');
/** "Pranava is a space to learn, practise and enquire." */
const RESOLVE = S.slice(TAIL_AT + 2);
/** the four clauses, each keeping the comma that closes it in the client's sentence */
const CLAUSES = S.slice(LEAD.length + 1, TAIL_AT)
  .split(', ')
  .map((c) => `${c},`);

export function Tl6Choose() {
  return (
    <section className="tl6" id="how-to-choose">
      <div className="tl6-in">
        <Mark n="05">How to choose</Mark>

        <div className="tl6-stage">
          <p className="tl6-sentence">
            <span className="tl6-lead">{LEAD}</span>{' '}
            {CLAUSES.map((c, i) => (
              <Fragment key={c}>
                <span className={`tl6-clause tl6-clause--${i}`}>{c}</span>{' '}
              </Fragment>
            ))}
            <span className="tl6-resolve">{RESOLVE}</span>
          </p>

          {PATHS.map((fr, i) => (
            <div
              className={`tl6-path tl6-path--${i}`}
              key={fr.id}
              style={{ '--i': i } as CSSProperties}
            >
              <Shot
                className="tl6-path__img"
                frame={fr}
                sizes={fr.w < fr.h ? '(max-width: 819px) 100vw, 27rem' : '(max-width: 819px) 100vw, 60rem'}
              />
            </div>
          ))}

          <Tl6Arrival />

          <Link className="tl6-cta" href="/contact/">
            Enquire
            <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
              <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
