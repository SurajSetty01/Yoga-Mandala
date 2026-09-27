import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { COURSE, DAYS, PLATE, still, stillSet } from './frames';

/**
 * HOW WE TEACH, concept sx4c: a ruled page that writes itself while five days pass in
 * its margin.
 *
 * WHAT HAPPENS. The eight practices come up the measure one at a time, set large. Each one
 * slides under the top of the page, and the same words come out below it at reading size
 * and stay there, ruled like a ledger, under the client's own stem ("Our educational
 * approach encourages students to:"). The list is built line by line by the reader's own
 * scrolling. In the left margin, meanwhile, one real course goes by: Prabhava, 2-6 October
 * 2023, one photograph a day, each dated and timed from the camera's own clock, and all
 * five taken at about the same hour. The margin's rule stops on the fifth day. The eighth
 * practice, "Continue learning beyond a single course", is the only one that arrives after
 * the course has ended, and its ledger line is the only one whose rule runs on past the
 * measure and off the page. Then the finished list lets go, and the page's one moving
 * photograph grows out of the margin to meet the closing sentence.
 *
 * TYPE IS THE STRUCTURE. There is no box, card, step or tread here. The structure is:
 *   · a MEASURE for the prose (the opening and closing sentences sit at ~60 characters);
 *   · a MARGIN on the left, as in Butterick's Practical Typography, carrying marginalia —
 *     the course's side-head and five dated figures on a rule — rather than decoration;
 *   · a HANGING INDENT for the list: the numerals dangle in the gutter, so the practices
 *     themselves hold one flush edge;
 *   · a SCALE HIERARCHY that changes with time: the practice being read is display size;
 *     the practices already read are reading size, and permanent.
 *
 * THE STACK IS PURE CSS, and that is what makes it survive reduced motion and a reader
 * with no JavaScript: every ledger line is `position: sticky` with its own `top`, all of
 * them share one containing grid, and the grid's end is what releases them together
 * (the accumulating-sticky-heading pattern, bounded by its parent as The Pudding
 * describes). Nothing is animated to build the list; the reader's scroll builds it. The
 * island in Motion.tsx adds only the plate's growth and its video.
 *
 * ACCESSIBILITY. The large arrivals are aria-hidden echoes; the list is one real <ol> of
 * eight, labelled by the stem. `display: contents` on the <ol> is what lets its <li>s be
 * placed in the course grid beside the margin figures; `role="list"` is restated because
 * engines have dropped list semantics from `display: contents` before.
 */

const lead = about.teach.lead;
// "Learning happens over time." — split, never retyped, so the last two words can be set
// in italic. The join is asserted so a content edit cannot silently break the sentence.
const LEAD_BREAK = lead.lastIndexOf(' over ');
const leadHead = LEAD_BREAK > 0 ? lead.slice(0, LEAD_BREAK) : lead;
const leadTail = LEAD_BREAK > 0 ? lead.slice(LEAD_BREAK) : '';

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Desktop row of each day, and its row in the one-column layout. See the stylesheet. */
const DAY_ROWS: ReadonlyArray<readonly [number, number]> = [
  [3, 4],
  [6, 6],
  [9, 10],
  [12, 12],
  [15, 16],
];
const rowsFor = (i: number) => DAY_ROWS[i] ?? DAY_ROWS[DAY_ROWS.length - 1] ?? [3, 4];

export function Sx4cTeach() {
  const { open, prompt, practices, close } = about.teach;

  return (
    <section className="sx4c">
      <div className="sx4c-page">
        {/* ── the head ─────────────────────────────────────────────────────── */}
        <header className="sx4c-head">
          <Eyebrow n="04">How we teach</Eyebrow>
          <p className="sx4c-lead">
            {leadHead}
            {leadTail ? <em>{leadTail}</em> : null}
          </p>
          <p className="sx4c-open">{open}</p>
        </header>

        {/* ── the course: a ledger in the measure, five days in the margin ─── */}
        <div className="sx4c-course">
          <div className="sx4c-side">
            <p className="sx4c-side__name">{COURSE.name}</p>
            <p className="sx4c-side__kind">{COURSE.kind}</p>
            <p className="sx4c-side__span">{COURSE.span}</p>
          </div>

          <span className="sx4c-spine" aria-hidden="true" />

          <p className="sx4c-prompt" id="sx4c-prompt">
            {prompt}
          </p>

          {practices.map((p, i) => (
            <span
              key={`big-${p}`}
              className="sx4c-big"
              aria-hidden="true"
              style={{ '--row': 2 * i + 3 } as Vars}
            >
              {p}
            </span>
          ))}

          <ol className="sx4c-ledger" role="list" aria-labelledby="sx4c-prompt">
            {practices.map((p, i) => (
              <li
                key={p}
                className={`sx4c-line${i === practices.length - 1 ? ' sx4c-line--on' : ''}`}
                style={{ '--k': i + 1, '--row': 2 * i + 4 } as Vars}
              >
                <span className="sx4c-line__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="sx4c-line__t">{p}</span>
              </li>
            ))}
          </ol>

          {DAYS.map((d, i) => (
            <figure
              key={d.id}
              className="sx4c-day"
              style={{ '--r': rowsFor(i)[0], '--rm': rowsFor(i)[1], '--op': d.pos } as Vars}
            >
              <div className="sx4c-day__frame">
                <img
                  src={still(d.id, 960)}
                  srcSet={stillSet(d)}
                  sizes="(max-width: 719px) 15rem, 17rem"
                  alt={d.alt}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                />
              </div>
              <figcaption className="sx4c-cap">
                <span className="sx4c-cap__when">
                  <span className="sx4c-cap__time">{d.time}</span>
                  <span className="sx4c-cap__date">{d.date}</span>
                </span>
                <span className="sx4c-cap__shows">{d.shows}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ── the coda: the one moving photograph, and the closing sentence ── */}
        <div className="sx4c-coda">
          <figure className="sx4c-plate">
            <div className="sx4c-plate__grow">
              <picture>
                <source type="image/avif" srcSet={PLATE.avif} />
                <img
                  className="sx4c-plate__img"
                  src={PLATE.jpg}
                  alt={PLATE.alt}
                  loading="lazy"
                  decoding="async"
                  width={1080}
                  height={1920}
                  style={{ '--op': PLATE.pos } as Vars}
                />
              </picture>
              {/* No poster attribute: the <img> above IS the poster. src is attached by
                  the island on approach and released a screen past. */}
              <video
                className="sx4c-plate__vid"
                data-src={PLATE.src}
                data-trim={PLATE.trim}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                style={{ '--op': PLATE.pos } as Vars}
              />
            </div>
            <figcaption className="sx4c-cap sx4c-cap--plate">
              <span className="sx4c-cap__when">
                <span className="sx4c-cap__time">{PLATE.time}</span>
                <span className="sx4c-cap__date">
                  {COURSE.name} · {PLATE.date}
                </span>
              </span>
              <span className="sx4c-cap__shows">{PLATE.shows}</span>
            </figcaption>
          </figure>

          <p className="sx4c-close">{close}</p>
        </div>
      </div>
    </section>
  );
}
