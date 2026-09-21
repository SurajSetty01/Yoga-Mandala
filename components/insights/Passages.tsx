import Link from 'next/link';
import { Mark } from './parts';
import { PASSAGES } from './pieces';

/**
 * 01 · THREE PARAGRAPHS, EACH READ AT TWO DISTANCES AT ONCE.
 *
 * THE MECHANIC. Every paragraph here is one continuous sentence of the client's, and the
 * clause inside it that carries the thought is set in the display face at three times the
 * size of the rest — inside the same paragraph, on the same baseline grid, wrapping with
 * it. The paragraph therefore swells where the point is and drops back to reading size
 * around it. Nothing is added, nothing is removed and nothing is reordered: the only
 * editorial act is the choice of which clause is the point, which is what an editor does
 * and what a journal is.
 *
 * That is also why this page can exist at all with no articles. What a journal promises is
 * not a number of posts, it is a standard of attention, and this section shows the standard
 * by applying it to sentences that already exist rather than by describing it.
 *
 * THE FOLIO. Each passage carries a margin note naming the page it is already published on
 * and linking to it. The note is `position: sticky` inside its own article, so while you
 * are reading a passage its source stays beside you and is replaced by the next one when
 * you leave it — the running head of a printed page, done in CSS with no script. It is the
 * page's only behaviour, and being layout rather than animation it is unaffected by
 * prefers-reduced-motion, which is correct: nothing about it moves under its own power.
 *
 * `lead`, `lit` and `tail` are slices of one string taken by `indexOf` at build time, so
 * the three spans concatenate back to the client's sentence character for character. See
 * components/insights/pieces.ts.
 */
export function Passages() {
  return (
    <section className="in-s in-s--paper in-read" id="insights-reading">
      <div className="in-rail">
        <Mark n="01">The kind of thinking that will be here</Mark>

        <div className="in-read__set">
          {PASSAGES.map((p, i) => (
            <article className="in-piece" key={p.href}>
              <div className="in-folio">
                <span className="in-folio__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="in-folio__k">Already published in</span>
                <Link className="in-folio__a" href={p.href}>
                  {p.from}
                </Link>
              </div>

              <p className="in-passage">
                {p.lead ? <span className="in-passage__q">{p.lead}</span> : null}
                <span className="in-passage__lit">{p.lit}</span>
                {p.tail ? <span className="in-passage__q">{p.tail}</span> : null}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
