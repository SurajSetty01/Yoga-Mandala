import { heal } from '@/content/pranava';
import { Mark } from './parts';

/**
 * 02 · FOUR NAMES REACHING FOR A NAME THEY HAVE NOT JOINED YET.
 *
 * THE MECHANIC. `heal.areas` holds four names and `heal.svasthya` holds the name they are
 * one day to be gathered under. The client's sentence about the relationship between them
 * is a future tense — "It will eventually connect with Pranava Svasthya and related work."
 * So the drawing is that sentence: four stems drop from the four area names and run toward
 * one point, and they stop short of it. The gap is measured, deliberate and the subject of
 * the section; the point itself is an open ring, a joint that has not been made.
 *
 * Every word in the drawing is the client's. Nothing is described, nothing is claimed, and
 * the four names are set as plain type rather than as cards, tiles or links — an area with
 * no description is not a thing you can click into, and drawing a box round it is the
 * commonest way of implying it has contents.
 *
 * THE GEOMETRY, which is measured rather than eyeballed. viewBox 0 0 1200 200; stems begin
 * at x = 150 / 450 / 750 / 1050, the centres of the four quarters, and aim at J = (600,
 * 186). Each stops 34 units short of J along its own line, so all four ends lie on a circle
 * of radius 34 about the joint and the gap is equal for all four rather than merely looking
 * it:
 *
 *     from x=150   ends (568.6, 173.0)    line length 486.9
 *     from x=450   ends (578.7, 159.5)    line length 238.9
 *     from x=750   ends (621.3, 159.5)    line length 238.9
 *     from x=1050  ends (631.4, 173.0)    line length 486.9
 *
 * `preserveAspectRatio="none"` lets the drawing take the rail's width at a fixed height,
 * and `vector-effect="non-scaling-stroke"` keeps every stroke a true hairline under that
 * non-uniform scale — without it the near-vertical stems would thicken and the near-flat
 * ones thin.
 *
 * The viewBox is 6:1 BECAUSE the block it renders into is: the rail's content width caps at
 * 76rem = 1216px and the drawing's height is `clamp(110px, 13vw, 200px)`, which gives a
 * rendered aspect of 7.04 : 1 at 900, 6.50 : 1 at 1440 and 6.08 : 1 at 2531. The anisotropy
 * the stems actually suffer is therefore between 1.01 and 1.17, not the 2× a mismatched
 * viewBox would impose. The joint is drawn as an ellipse for the same reason — a true
 * circle would render as an upright oval — at rx/ry = 0.94, which is the middle of the
 * 0.85 – 0.99 that band spans.
 *
 * The drawing is only used at 760px and up. Below that the stacked variant draws the same
 * idea vertically out of borders, which cannot distort at all.
 *
 * The drawing is `aria-hidden`. Everything it says is said in the text around it: four
 * names, one name, and one sentence about the join.
 */
export function Areas() {
  return (
    <section className="hl-s hl-s--warm hl-join" id="heal-areas">
      <div className="hl-rail">
        <Mark n="01">What this area will hold</Mark>

        {/* A statement about the material, not about the service. The four names exist;
            nothing else about them does, and saying so is the whole of what this page
            can honestly report. */}
        <p className="hl-say">
          Four areas are named. Nothing beyond the names has been written yet, so nothing
          beyond the names is shown here.
        </p>

        <div className="hl-diagram">
          <ul className="hl-areas">
            {heal.areas.map((a) => (
              <li className="hl-areas__i" key={a}>
                {a}
              </li>
            ))}
          </ul>

          {/* The four stems, and the joint that has not been made. */}
          <svg
            className="hl-wire"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M150 0 L568.6 173.0" vectorEffect="non-scaling-stroke" />
              <path d="M450 0 L578.7 159.5" vectorEffect="non-scaling-stroke" />
              <path d="M750 0 L621.3 159.5" vectorEffect="non-scaling-stroke" />
              <path d="M1050 0 L631.4 173.0" vectorEffect="non-scaling-stroke" />
            </g>
            {/* The joint, open. Drawn as an ellipse in user units so the horizontal squash
                of preserveAspectRatio="none" renders it as a circle — see the header. */}
            <ellipse
              cx="600"
              cy="186"
              rx="9.4"
              ry="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* The narrow drawing: one spine down the left with four feeders into it, and the
              spine stops short of the name. Borders only, so it cannot distort. */}
          <div className="hl-wire-n" aria-hidden="true">
            <span className="hl-wire-n__spine" />
            <span className="hl-wire-n__ring" />
          </div>

          <p className="hl-svasthya">{heal.svasthya}</p>
          <p className="hl-note">{heal.note}</p>
        </div>
      </div>
    </section>
  );
}
