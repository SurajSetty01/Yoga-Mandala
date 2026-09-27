import Link from 'next/link';
import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { HELD, ROW, setOf, srcOf } from './frames';

/**
 * PRAṆAVA & SEVA — concept A, photography leads.
 *
 * THE EVENT: the sentence is driven through a photograph at the line where the weight
 * changes hands. One frame, cut once, at her shins. Above the cut a woman climbs alone
 * into the roof rope — "From individual practice". The cut is a band of paper carrying
 * "to collective responsibility." Below it her shins arrive on a man's shoulder and in two
 * women's hands, and the Trust's words stand on either side of the people holding her up.
 * Then the section turns on its side, from a vertical stack of four to a horizontal row of
 * four teachers under the Praṇava mark, and that row is the door to Yoga Mandala.
 *
 * Why it survives reduced motion and no JavaScript: the idea is WHERE the sentence breaks
 * and WHERE the photograph breaks, and those are the same place in the static layout.
 * Motion only lays the cut down and lets each piece arrive.
 *
 * Every word comes from `about.seva` in content/pranava.ts. The lead's two halves are cut
 * out of the client's own string at run time, never retyped; the whole sentence is also
 * present, unbroken, for assistive technology, and the two visual halves are hidden from
 * it so it is not read twice.
 */
const LEAD = about.seva.lead;
const TURN = LEAD.indexOf(' to ');
const LEAD_A = LEAD.slice(0, TURN);
const LEAD_B = LEAD.slice(TURN + 1);

/** the whole photograph's rendered width, mirrored from `--sx8a-W` for `sizes` */
const HELD_SIZES = '(min-width: 1000px) clamp(560px, 54vw, 1040px), min(137vw, 930px)';

const d = (ms: number) => ({ ['--sx8a-d' as string]: `${ms}ms` }) as CSSProperties;

export function Seva() {
  return (
    <section className="sx8a" id="sx8a-seva" aria-labelledby="sx8a-h">
      <div className="sx8a-rail">
        <div className="sx8a-grid">
          <h2 className="sx8a-eyebrow" id="sx8a-h">
            <span className="sx8a-eyebrow__n">08</span>{' '}
            <span className="sx8a-eyebrow__rule" aria-hidden="true" />
            Praṇava &amp; Seva
          </h2>

          {/* the sentence, whole, for anyone not reading it off the layout */}
          <p className="sr">{LEAD}</p>

          {/* ABOVE THE CUT — her, and nobody else */}
          <div className="sx8a-top">
            <figure className="sx8a-crop sx8a-strip" data-sx8a="fade" style={d(0)}>
              <img
                src={srcOf(HELD.id, 960)}
                srcSet={setOf(HELD)}
                sizes={HELD_SIZES}
                alt={HELD.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <p className="sx8a-lead sx8a-lead--a" aria-hidden="true" data-sx8a style={d(160)}>
              {LEAD_A}
            </p>
          </div>

          {/* THE CUT — the line the photograph was severed along, run on across the page */}
          <div className="sx8a-seam">
            <span className="sx8a-cut" aria-hidden="true" data-sx8a="cut" />
            <p className="sx8a-lead sx8a-lead--b" aria-hidden="true" data-sx8a style={d(260)}>
              {LEAD_B}
            </p>
          </div>

          {/* BELOW THE CUT — the three of them. A slice of the picture described above. */}
          <figure className="sx8a-crop sx8a-hold" data-sx8a="fade" style={d(80)}>
            <img
              src={srcOf(HELD.id, 960)}
              srcSet={setOf(HELD)}
              sizes={HELD_SIZES}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="sx8a-body" data-sx8a style={d(120)}>
            {about.seva.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="sx8a-work" data-sx8a style={d(220)}>
            <p>{about.seva.prompt}</p>
            <ul className="sx8a-list">
              {about.seva.initiatives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* THE DOOR — the second cut, at the floor they stand on, and under it a row of
              four teachers under the Praṇava mark: the widest frame in the stack. The whole
              door is one link, in Yoga Mandala's own terracotta. */}
          <div className="sx8a-door">
            <span className="sx8a-cut sx8a-cut--floor" aria-hidden="true" data-sx8a="cut" />
            <div className="sx8a-door__words" data-sx8a>
              <p>{about.seva.mandala}</p>
              <Link className="sx8a-door__go" href="/yoga-mandala/">
                Yoga Mandala
                <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
                  <path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </div>
            <figure className="sx8a-door__plate" data-sx8a="fade" style={d(120)}>
              <img
                src={srcOf(ROW.id, 960)}
                srcSet={setOf(ROW)}
                sizes="(min-width: 1000px) min(1123px, 117vw - 10rem), (min-width: 720px) calc(117vw - 10rem), 117vw"
                alt={ROW.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
