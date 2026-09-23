import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATES, src, srcSet } from './media';

/**
 * §04 · HOW WE TEACH — THE RULED LEAF.
 *
 * Describe it as something that happens: **eight practices are written onto one evenly
 * ruled page at intervals that keep lengthening, and after the eighth the ruling carries
 * on without them, off the foot of the page.**
 *
 * The client's lead is "Learning happens over time." The ruling is the time: one pitch,
 * never varying, the same line after line — that is the clock, and it is the only regular
 * thing in the section. What varies is how often anything is written on it. The eight
 * practices sit at rows 1, 3, 5, 8, 11, 15, 20 and 26, so the gaps run 2, 2, 3, 3, 4, 5,
 * 6: a reader descending at one speed meets the first four almost together and waits
 * progressively longer for each of the last four. Eight phrases, eight different rates,
 * and not one pixel of it depends on JavaScript or on movement.
 *
 * NOTHING IS LABELLED WITH A DURATION. The client has supplied no schedule, no course
 * length and no timetable, and an interval that is drawn is not a claim that anything
 * takes six weeks. The rhythm is the whole statement.
 *
 * THEN THE RULING OUTLASTS THE LIST. The closing sentence is written on the same lines —
 * "Teacher education, for us, is not only about learning how to conduct a class" — and
 * below it the rules run on blank and fade off the bottom edge. The eighth practice is
 * "Continue learning beyond a single course", and this is that sentence as a layout: the
 * page has more lines on it than there are entries to write.
 *
 * WHY THIS IS NOT THE SECTION IT REPLACES. That one is a staircase: eight treads indented
 * one step further right each time, which reads as a descent with a bottom. This has one
 * left axis, one margin gauge with a tick per entry, and no bottom at all.
 *
 * WHY IT DOES NOT REPEAT §03. §03 opens — width, dark ground, photographic, monotonic.
 * This measures — interval, paper, written, and the picture is a single plate tipped in
 * over the ruling rather than the subject. Neither could be mistaken for the other, and
 * neither could be swapped with the other's neighbour.
 *
 * Row positions are custom properties rather than margins so that a phrase which wraps on
 * a 390px phone puts its second line on the next rule, exactly as it would on real ruled
 * paper, and never on top of the entry below it.
 */

/** the eight intervals. Gaps of 2, 2, 3, 3, 4, 5, 6 — the same at every viewport. */
const ROWS = [1, 3, 5, 8, 11, 15, 20, 26] as const;

export function ApprBTeach() {
  const plate = PLATES.restorative;

  return (
    <section className="apb-s apb-s--warm apb-te" id="apb-teach" aria-labelledby="apb-te-h">
      <div className="apb-rail">
        <h2 className="apb-eyebrow" id="apb-te-h">
          <span className="apb-eyebrow__n">04</span>
          <span className="apb-eyebrow__rule" aria-hidden="true" />
          How we teach
        </h2>

        <div className="apb-te__head">
          <p className="apb-te__lead" data-ab="up">
            {about.teach.lead}
          </p>
          <p className="apb-te__open" data-ab="up">
            {about.teach.open}
          </p>
        </div>

        <p className="apb-te__prompt" data-ab="up">
          {about.teach.prompt}
        </p>

        <div className="apb-te__leaf">
          <span className="apb-te__gauge" aria-hidden="true" />

          <ol className="apb-te__entries">
            {about.teach.practices.map((p, i) => (
              <li
                className="apb-te__entry"
                key={p}
                data-ab="up"
                style={{ ['--ab-r' as string]: ROWS[i] } as CSSProperties}
              >
                {/* the tick and its number are one element so the margin reads as a
                    measure rather than as a bullet list: eight marks, spreading. */}
                <span className="apb-te__n" aria-hidden="true">{`0${i + 1}`}</span>
                <span className="apb-te__w">{p}</span>
              </li>
            ))}
          </ol>

          {/* one plate, tipped in over the ruling: a class at work in one room, which is
              the only thing in this section that is not a sentence */}
          <figure className="apb-te__plate" data-ab="up">
            <img
              src={src(plate)}
              srcSet={srcSet(plate)}
              sizes="(max-width: 999px) 94vw, (max-width: 1600px) 33vw, 520px"
              alt={plate.alt}
              loading="lazy"
              decoding="async"
              style={
                { '--ab-op': plate.pos, '--ab-op-n': plate.posNarrow } as CSSProperties
              }
            />
          </figure>

          <p className="apb-te__close" data-ab="up">
            {about.teach.close}
          </p>

          {/* forces the leaf to the full number of ruled lines, so the rules continue
              past everything written on them and fade off the foot of the page */}
          <span className="apb-te__tail" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
