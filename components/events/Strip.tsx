import { CELLS, src, srcSet } from './frames';
import { Mark } from './parts';

/**
 * 01 · THE RECORD, AS AN EXPOSED STRIP WITH ONE FRAME STILL BLANK.
 *
 * THE MECHANIC. Six photographs butted along one continuous band, each sitting between a
 * rebate above carrying its number and a rebate below carrying what it shows — the edge
 * markings of a strip of film, which is what a record looks like and is emphatically not
 * what a programme looks like. You leaf along it; at the end of it the exposures stop and
 * the seventh place is blank paper on the dark band, which is where the next event is not
 * yet. The empty state is INSIDE the object rather than printed underneath it, which is
 * the difference between an honest page and an apology.
 *
 * WHY A STRIP AND NOT A GRID. A grid of six photographs is a gallery, and a gallery of
 * past events on a page with no future ones reads as nostalgia. A strip is a record: it
 * has an order, it has an end, and the end is the point.
 *
 * WHY IT IS THE READER WHO MOVES IT. No script runs on this page. The band is a native
 * horizontal scroller with proximity snapping, focusable and keyboard-scrollable, which
 * means it behaves identically with JavaScript disabled, under prefers-reduced-motion and
 * on a touch screen — and nothing on the page is reachable only through motion, because
 * there is no motion. Below 760px the strip becomes a vertical stack: a region that can
 * only be read by scrolling sideways is a reflow problem on a phone, and the same six
 * frames read perfectly well as a column.
 *
 * THE BLANK CELL CARRIES NO LINK, on purpose. A focusable element inside a horizontal
 * scroller drags the whole band sideways the moment a keyboard user tabs past it. The
 * route out lives in section 02, where it can be reached without the page moving.
 *
 * MEASUREMENTS. Cells are 3:2 because every landscape frame in this collection is exactly
 * 1620 × 1080 on disk. The cell height is `clamp(190px, 30vh, 340px)`, so a cell is
 * 285–510px wide and the track is 7 cells plus six 4px gaps: 2019px at the floor and
 * 3594px at the cap, against viewports of 320 to 2560. The strip therefore always
 * overflows its own container and never the page.
 */
export function Strip() {
  return (
    <section className="ev-s ev-s--deep ev-strip" id="events-record">
      <div className="ev-rail">
        <Mark n="01" dark>
          What has happened here
        </Mark>
        <div className="ev-strip__head">
          <p className="ev-strip__lead">
            Seven places on the strip. Six of them are exposed.
          </p>
          {/* The affordance, stated rather than implied. A band that runs off the right
              edge says "there is more" to a mouse; it says nothing to a reader who has
              never met a horizontal scroller. `aria-hidden` because the region below
              already announces itself and a screen reader does not scroll sideways. */}
          <p className="ev-strip__hint" aria-hidden="true">
            Leaf along
            <svg width="26" height="9" viewBox="0 0 26 9" focusable="false">
              <path
                d="M0 4.5h23M19 1l4 3.5-4 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </p>
        </div>
      </div>

      {/*
        A scrollable region needs a name and needs to be focusable, or a keyboard user
        cannot reach what is inside it. `role="region"` + `aria-label` + `tabindex` is the
        combination that gives it both without claiming it is a widget it is not.
      */}
      <div
        className="ev-reel"
        role="region"
        aria-label="Photographs from Praṇava’s archive"
        tabIndex={0}
      >
        <ol className="ev-track">
          {CELLS.map((c, i) => (
            <li className="ev-cell" key={c.id}>
              <span className="ev-cell__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <img
                className="ev-cell__img"
                src={src(c)}
                srcSet={srcSet(c)}
                sizes="(max-width: 759px) 100vw, min(510px, 45vw)"
                alt={c.alt}
                width={1620}
                height={1080}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                style={{ objectPosition: c.focal }}
              />
              <span className="ev-cell__cap">{c.caption}</span>
            </li>
          ))}

          {/* The seventh place. Blank paper on the dark band — the frame that has not
              been exposed, and the honest end of the record. */}
          <li className="ev-cell ev-cell--blank">
            <span className="ev-cell__n" aria-hidden="true">
              07
            </span>
            <div className="ev-blank">
              <p className="ev-blank__p">Nothing scheduled</p>
            </div>
            <span className="ev-cell__cap">The next one is not here yet</span>
          </li>
        </ol>
      </div>

      <div className="ev-rail">
        <p className="ev-strip__prov">
          <span className="ev-strip__provK">From Praṇava&rsquo;s own archive</span>
          <span className="ev-strip__provV">Prabodha TTC</span>
        </p>
      </div>
    </section>
  );
}
