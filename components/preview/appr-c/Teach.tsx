import { about } from '@/content/pranava';
import { RunningHead } from './RunningHead';

/**
 * §04 · HOW WE TEACH — *the prompt and its eight practices set as one block of
 * display type, the list run in behind a colon and marked off by rubricated
 * pilcrows instead of line breaks.*
 *
 * The client's own punctuation is the argument for this. "Our educational
 * approach encourages students to:" ends on a colon, which means the eight
 * practices are the rest of that sentence — so they are set as the rest of that
 * sentence. Nothing breaks to a new line; each new practice opens on a pilcrow,
 * which is what a mark of paragraph was for before items were given lines of
 * their own. Eight things that were a staircase become one solid block, and it
 * is the largest type in the pair rather than the smallest.
 *
 * This is the deliberate opposite of §03 next door, which separates four terms
 * with four rules and all the air on the page, and hangs everything off a left
 * margin. This leaf is symmetric: lead, plate, argument and colophon all sit on
 * one centred axis, and nothing is in a margin.
 *
 * SEMANTICS SURVIVE THE COMPRESSION. The eight are a real `<ol>`; `role="list"`
 * is explicit because Safari drops list semantics once the marker is removed;
 * each `<li>` is `display: inline`. Every pilcrow is an `aria-hidden` span, so a
 * screen reader hears eight list items and no punctuation, and each one carries
 * a NO-BREAK SPACE after the mark so the mark can never be stranded at the end
 * of a line — it always travels down with the phrase it opens.
 *
 * THE PAIR'S ONE PHOTOGRAPH is here and it is reproduced whole: the figure
 * carries the frame's own 3:2 ratio at its native 1620px, so nothing is cropped
 * at any viewport. It is the only picture in two sections, and it arrives after
 * a full section of nothing but type.
 */

/* pr-ttc-dsc_0020_1 — 1620x1080 on disk, widths 480/960/1620, used nowhere else
   on the site. A lane at the training venue running away into light: no people,
   no faces, no whiteboard, nothing in the frame that is not the lane. It is the
   picture of "Learning happens over time." and there is no second one. */
const PLATE = {
  id: 'pr-ttc-dsc_0020_1',
  widths: [480, 960, 1620],
  alt: 'A narrow earth lane between a white building and a wall of hanging vines, opening into light',
};

export function ApprCTeach() {
  return (
    <section className="ac-sec ac-teach" aria-labelledby="ac-c-teach">
      <RunningHead folio="§ 04" title="How we teach" id="ac-c-teach" />

      <div className="ac-leaf">
        <p className="ac-teach__lead" data-ac="up">
          {about.teach.lead}
        </p>

        <figure className="ac-plate" data-ac="plate">
          <img
            className="ac-plate__img"
            src={`/media/stills/${PLATE.id}-1620.webp`}
            srcSet={PLATE.widths.map((w) => `/media/stills/${PLATE.id}-${w}.webp ${w}w`).join(', ')}
            sizes="(max-width: 1100px) 92vw, min(1536px, 92vw)"
            alt={PLATE.alt}
            width={1620}
            height={1080}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="ac-legend">A lane at the training venue, opening into light</figcaption>
        </figure>

        {/* the opening sentence and the run-in block share one measure, so the
            refusal begins on exactly the left edge of the block it introduces */}
        <div className="ac-arg">
          <p className="ac-teach__open" data-ac="up">
            {about.teach.open}
          </p>

          <div className="ac-run" data-ac="up">
            {/* a NO-BREAK SPACE, so the colon can never be the last thing on a
                line: the first practice is glued to the prompt it belongs to and
                the block reads as a run-in at every width, never as a heading
                sitting above a list */}
            <p className="ac-run__prompt">{about.teach.prompt}</p>
            {' '}
            <ol className="ac-run__items" role="list">
              {about.teach.practices.map((p, i) => (
                <li className="ac-run__item" key={p}>
                  {i > 0 ? (
                    <>
                      {' '}
                      {/* pilcrow + NO-BREAK SPACE: the mark travels down with the
                          phrase it opens and can never end a line by itself */}
                      <span className="ac-pil" aria-hidden="true">
                        {'¶ '}
                      </span>
                    </>
                  ) : null}
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* the colophon — what teacher education actually is, set where a book
            puts the note about what the book actually is */}
        <div className="ac-colo">
          <div className="ac-colo__rule" data-ac="rule" aria-hidden="true" />
          <p className="ac-colo__text" data-ac="up">
            {about.teach.close}
          </p>
        </div>
      </div>
    </section>
  );
}
