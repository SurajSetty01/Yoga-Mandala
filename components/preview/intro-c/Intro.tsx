import { Fragment, type CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { LEFT, RIGHT, src, srcSet, type Print } from './frames';

/**
 * ABOUT PRAṆAVA · 01 — INTRODUCTION. Concept C.
 *
 * THE MECHANIC, in one sentence: a dark table packed edge to edge with prints from one
 * teacher training PARTS DOWN THE MIDDLE, and the client's five sentences run down the
 * channel the prints open.
 *
 * The complaint this answers is "it feels empty because there is no image on the right", and
 * the instruction is that the answer may not be an image on the right. So there is no right
 * side: there are two banks and a channel between them. Photographs are the ground the
 * section is made of, on both sides, all the way down; the type is not beside them, it is
 * IN them, running through the gap they leave. At no point is the composition divisible into
 * a text half and a picture half, which is the whole point.
 *
 * WHY THE PICTURES ARE PRINTS AND NOT WINDOWS. Each has paper around it, a bottom margin
 * wider than its sides the way a real print does, a shadow, an angle a hand left it at, and
 * a neighbour lying over its corner. Four carry the archive number pencilled in the margin —
 * the client's own file number, nothing invented — because what the reader is looking at is
 * evidence from one week at one campus rather than an illustration of an idea.
 *
 * THE EVENT IS HEIGHT AND ANGLE, NOT ARRIVAL. Nothing flies in from off-screen. Every print
 * is already on the table; what changes is that the pile is squared up and pushed together —
 * every print at 0°, overlapping, the channel closed to a seam — and then RELAXES: each settles back to
 * its own angle and its own place, the banks draw apart, and the words are what is
 * underneath. It is a pile being opened, which is the one thing you do to a pile of
 * photographs. It is not the plates dealt left to right on /about/ §09 or the home page's
 * Purpose, not a contact sheet, not a film strip, and not a scatter: the start state is a
 * closed pile and the end state is a channel through it.
 *
 * NO TYPE IS EVER SET ON A PHOTOGRAPH. Every sentence stands on the flat, known ground of
 * the table, so its contrast is a constant rather than a function of the crop and the
 * viewport — DESIGN-SYSTEM §1's rule taken at its word. The prints' shadows fall INTO the
 * channel, which only darkens an already dark ground.
 *
 * BELOW 1000px the channel turns ninety degrees: the same twelve prints become five bands
 * running off both edges of the table, and the sentences sit in the gaps between the bands.
 * The gesture is identical — the pile squares up, then opens — and the DOM does not change,
 * because the runs are `display: contents` on the wide layout and flex rows on the narrow
 * one. The reading order is the client's order at every width.
 *
 * WITHOUT JAVASCRIPT the pile is simply already open: the packed start state is scoped to
 * `.js`, which the root layout sets before first paint. With `prefers-reduced-motion` the
 * same is true and no listener is ever attached. Nothing in this section is reachable only
 * through motion.
 */

type Vars = CSSProperties & Record<string, string | number>;

/** Desktop geometry, in cqw of the capped stage — so the composition is one drawing that
 *  scales from 1000px to the 128rem cap, with no media query in between. `y` is the top
 *  edge, `w` the width of the PAPER, `k` the direction the pile squeezes from. */
type Place = { p: Print; x: number; y: number; w: number; rot: number; z: number; d: number; dr: number };

const L = LEFT;
const R = RIGHT;

const PLACED: Place[][] = [
  /* run 1 — the hall and the rope wall, the two widest prints, holding the top corners.
     The hall sits OVER the row below it rather than under: its cohort is along its lower
     edge, and a print whose subject is covered by its neighbour is a print nobody looked at. */
  [
    { p: L[0], x: -6, y: 0, w: 36, rot: -1.4, z: 6, d: 0, dr: 0.35 },
    { p: R[0], x: 67, y: 1, w: 37, rot: 1.5, z: 4, d: 70, dr: -0.4 },
  ],
  /* run 2 */
  [
    { p: L[1], x: 1, y: 17, w: 30, rot: 2.0, z: 4, d: 140, dr: -0.5 },
    { p: R[1], x: 74, y: 17, w: 30, rot: -1.8, z: 6, d: 200, dr: 0.5 },
  ],
  /* run 3 — the two portraits, one to each bank, and the grass frame lying over the left.
     ORDER MATTERS ONLY ON THE NARROW LAYOUT, where a band's middle print is the one that is
     always whole and always on top — so the prints that carry a filing note are put there. */
  [
    { p: L[2], x: -4, y: 28, w: 21, rot: -2.3, z: 5, d: 260, dr: 0.6 },
    { p: L[4], x: 13, y: 37, w: 20, rot: 2.6, z: 7, d: 320, dr: -0.3 },
    { p: R[2], x: 67, y: 28, w: 20, rot: 2.2, z: 5, d: 380, dr: -0.6 },
  ],
  /* run 4 */
  [
    { p: L[3], x: -5, y: 50, w: 28, rot: -1.0, z: 3, d: 440, dr: 0.45 },
    { p: R[3], x: 82, y: 36, w: 24, rot: -2.4, z: 7, d: 500, dr: 0.3 },
  ],
  /* run 5 — the bottom of the pile, three prints, two of them running off the edge */
  [
    { p: R[4], x: 68, y: 47, w: 30, rot: 1.2, z: 4, d: 560, dr: -0.45 },
    { p: L[5], x: 11, y: 54, w: 22, rot: 1.8, z: 6, d: 620, dr: -0.55 },
    { p: R[5], x: 86, y: 58, w: 17, rot: -2.0, z: 8, d: 680, dr: 0.5 },
  ],
];

/** `sizes` is explicit on every print: a srcset with none makes the browser assume 100vw. */
const SIZES = '(max-width: 999px) 46vw, (min-width: 2048px) 560px, 27vw';

function Sheet({ at }: { at: Place }) {
  const { p } = at;
  return (
    <div
      className={`ic-print ic-print--${p.shape}${p.mark ? ' ic-print--marked' : ''}`}
      style={
        {
          '--x': `${at.x}cqw`,
          '--y': `${at.y}cqw`,
          '--w': `${at.w}cqw`,
          '--rot': `${at.rot}deg`,
          '--k': at.x < 50 ? 1 : -1,
          '--z': at.z,
          '--d': `${at.d}ms`,
          '--dr': at.dr,
        } as Vars
      }
    >
      <div className="ic-print__p">
        <img
          className="ic-print__img"
          src={src(p)}
          srcSet={srcSet(p)}
          sizes={SIZES}
          alt={p.alt}
          loading={at.d < 150 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ '--op': p.pos, '--op-n': p.posNarrow ?? p.pos } as Vars}
        />
        {p.mark ? (
          <span className="ic-print__mark" aria-hidden="true">
            {p.mark}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function IntroC() {
  const lines = about.intro;

  return (
    <section className="ic-sec" aria-labelledby="ic-h">
      {/* The register mark sits on the paper the page is made of, exactly as it does on the
          live /about/ — so the reader knows this dark band is section 01 of that document
          and not a new page. It is the only heading here: the client's five sentences are
          prose, and marking five of them up as headings would wreck the outline. */}
      <div className="ic-lead">
        <h2 className="ic-eyebrow" id="ic-h">
          <span className="ic-eyebrow__n">01</span>
          <span className="ic-eyebrow__rule" aria-hidden="true" />
          Introduction
        </h2>
      </div>

      <div className="ic-table" data-ic-table>
        <div className="ic-stageWrap">
          {/* the container the whole drawing is measured in: capped, centred, and the only
              thing `cqw` resolves against — which is what keeps the composition identical
              at 1000px and at 2560 instead of exploding across the extra width. */}
          <div className="ic-stage">
            {/* Each run of prints is followed by the sentence that lies beside it. On the
                wide layout the runs are `display: contents` and their prints are placed
                absolutely on the two banks, so this order costs nothing; on the narrow one
                the runs become bands and the order IS the layout. Either way the reading
                order is the client's order, and it is the client's words, untouched. */}
            {PLACED.map((run, i) => (
              <Fragment key={`run-${i}`}>
                <div className={`ic-run ic-run--${run.length}`}>
                  {run.map((at) => (
                    <Sheet at={at} key={at.p.id} />
                  ))}
                </div>
                <p
                  className={`ic-l ic-l--${i + 1}`}
                  data-ic-word
                  style={{ '--d': `${700 + i * 70}ms` } as Vars}
                >
                  {lines[i]}
                </p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
