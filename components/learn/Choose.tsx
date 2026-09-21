import type { CSSProperties } from 'react';
import Link from 'next/link';
import { about } from '@/content/pranava';
import { PATH } from './frames';
import { Mark, Says, Shot } from './parts';

/**
 * 06 — THE SENTENCE NARROWS TO A DOOR.
 *
 * The Blueprint asks Learn to explain "how to choose". There are no prerequisites, levels
 * or entry criteria anywhere in the client's material, so a comparison table would have to
 * be invented. What the client HAS written is a sentence that is already a chooser:
 *
 *   "Whether you are beginning your journey with Yoga, seeking to deepen an established
 *    practice, preparing to teach, or simply wishing to understand these traditions more
 *    deeply, Pranava is a space to learn, practise and enquire."
 *
 * Four beginnings, one destination. So the section sets it as what it is: the four clauses
 * step in, each one indented further than the last and each preceded by a rule that is
 * shorter than the last, so the block itself TAPERS — and it tapers at the vanishing point
 * of the photograph beside it, a paved path running away between trees. The sentence walks
 * down the path, and where it arrives is the client's own resolving clause with the enquiry
 * route under it.
 *
 * The type size does NOT taper. Drawing perspective with shrinking words would put the
 * fourth clause below a readable size and below its measured contrast; the wedge is drawn
 * by the rules and the indents, which cost a reader nothing.
 *
 * The clauses are sliced out of the client's sentence at its own commas rather than
 * retyped, so no fragment can drift from their wording. Read top to bottom, the original
 * sentence is intact.
 *
 * `pr-ttc-dsc_0364` has one derivative, 960 wide, so the column it fills is capped at
 * 30rem and centred inside its own track. At 2560 it is a tall window in a wide sheet of
 * paper, which is what the composition wants anyway — not a soft enlargement.
 */

const S = about.closing.body;
const LEAD = 'Whether you are ';
const TAIL_AT = S.lastIndexOf(', Pranava is');
const RESOLVE = S.slice(TAIL_AT + 2);
const CLAUSES = S.slice(LEAD.length, TAIL_AT)
  .split(', ')
  .map((c) => c.replace(/^or /, ''));

export function Choose() {
  return (
    <section className="ln-ch" id="how-to-choose">
      <div className="ln-ch__in">
        <Mark n="05">How to choose</Mark>

        <div className="ln-ch__grid">
          <div className="ln-ch__wedge">
            <p className="ln-ch__lead">{LEAD.trim()}</p>

            <ul className="ln-ch__steps">
              {CLAUSES.map((c, i) => (
                <li
                  className="ln-ch__step"
                  key={c}
                  data-ln="step"
                  style={{ '--i': i, '--d': `${i * 110}ms` } as CSSProperties}
                >
                  <span className="ln-ch__tick" aria-hidden="true" />
                  <span className="ln-ch__txt">{c}</span>
                </li>
              ))}
            </ul>

            <p className="ln-ch__resolve" data-ln="up" style={{ '--d': '480ms' } as CSSProperties}>
              {RESOLVE}
            </p>

            <Link className="ln-ch__cta" href="/contact/">
              Enquire
              <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>

          <figure className="ln-ch__fig" data-ln="fig">
            <div className="ln-ch__mask">
              <Shot className="ln-ch__img" frame={PATH} sizes="(max-width: 899px) 78vw, 30rem" />
            </div>
            <figcaption>
              <Says>{PATH.alt}</Says>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
