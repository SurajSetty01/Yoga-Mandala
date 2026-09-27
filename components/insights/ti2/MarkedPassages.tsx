import type { CSSProperties } from 'react';
import Link from 'next/link';
import { site } from '@/content/site';
import { PASSAGES } from './passages';
import { Ti2Marks } from './Ti2Marks';

/**
 * 01 · THE KIND OF THINKING THAT WILL BE HERE — a reader's marks.
 *
 * WHAT HAPPENS. Three of Praṇava's own sentences, set as one reading column with a wide
 * margin beside it, the way a journal is laid out. Each is one paragraph at reading size with
 * the clause that carries its thought set in the display face inside the same line. As a
 * passage crosses the reading line a brass wash is drawn behind its clause like a highlighter
 * — line by line, left to right, at the pace of the words — while a pencil bracket runs down
 * the margin beside those exact lines. When the stroke finishes, the photograph that answers
 * the clause is uncovered in the margin, continuing the stroke's direction, level with the
 * marked line. By the end of the section the page is a marked-up page.
 *
 *   01  inquiry            → three people listening, one with a notebook
 *   02  the certificate    → three people holding one up to the rope
 *   03  the teacher's role → the student alone in a pose he has set up; the teacher cropped out
 *
 * HOW. The wash is a background on the inline clause with `box-decoration-break: slice` (the
 * default), so its `background-size` grows along the clause as if its lines were laid end to
 * end — which is exactly a highlighter crossing a wrapped line and carrying on below. It is a
 * one-shot CSS transition started by a class, not a scroll handler. Bracket and photograph
 * move by `transform` only. One IntersectionObserver adds the class; geometry (where the
 * clause sits, so the bracket and photograph can sit level with it) is measured on load,
 * font load and resize only. See Ti2Marks.tsx.
 *
 * WITHOUT MOTION. The server renders the finished state: every clause washed, every bracket
 * drawn, every photograph in place. The script only arms the unmarked state when motion is
 * allowed, so under prefers-reduced-motion, or with no JavaScript, the section is complete.
 */

const DISPLAY_WIDTHS = {
  a: '(min-width: 900px) clamp(15rem, 24vw, 23rem), 92vw',
  b: '(min-width: 900px) clamp(11rem, 18vw, 17rem), 62vw',
  // the crop shows 72% of the frame's width, so the image is drawn 139% of its box
  c: '(min-width: 900px) clamp(18rem, 28vw, 27rem), 100vw',
} as const;

const KEYS = ['a', 'b', 'c'] as const;

export function MarkedPassages() {
  return (
    <section className="ti2" id="insights-reading" aria-labelledby="ti2-title">
      <div className="ti2-in">
        <h2 className="ti2-mark" id="ti2-title">
          <span className="ti2-mark__n">01</span>
          The kind of thinking that will be here
        </h2>

        <div className="ti2-set">
          {PASSAGES.map((p, i) => {
            const k = KEYS[i] ?? 'a';
            const f = p.frame;
            // the stroke moves at the pace of the words: ~18ms a character, 0.95s–1.6s
            const dur = Math.round(Math.min(1600, Math.max(950, p.lit.length * 18)));
            return (
              <div
                className={`ti2-piece ti2-piece--${k}`}
                key={f.id}
                style={{ '--ti2-dur': `${dur}ms` } as CSSProperties}
              >
                <p className="ti2-folio">
                  {p.link ? (
                    <>
                      <span className="ti2-folio__k">On the About page</span>
                      <Link className="ti2-folio__a" href={p.link.href}>
                        {p.link.label}
                      </Link>
                    </>
                  ) : (
                    <span className="ti2-folio__k">From {site.name}’s writing</span>
                  )}
                </p>

                <div className="ti2-text">
                  <span className="ti2-pencil" aria-hidden="true" />
                  <p className="ti2-p">
                    {p.lead ? <span className="ti2-q">{p.lead}</span> : null}
                    <span className="ti2-lit">{p.lit}</span>
                    {p.tail ? <span className="ti2-q">{p.tail}</span> : null}
                  </p>
                </div>

                <figure className={`ti2-fig ti2-fig--${k}`}>
                  <span className="ti2-frame">
                    <img
                      src={`/media/stills/${f.id}-960.webp`}
                      srcSet={f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ')}
                      sizes={DISPLAY_WIDTHS[k]}
                      width={f.w}
                      height={f.h}
                      alt={f.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="ti2-veil" aria-hidden="true" />
                  </span>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
      <Ti2Marks />
    </section>
  );
}
