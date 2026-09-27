import { heal } from '@/content/pranava';
import { Mark } from '../parts';

/**
 * /heal/ 01 · WHAT THIS AREA WILL HOLD — the seat, drawn from above.
 *
 * THE EVENT. A photograph of a painted circular seat built round a tree trunk. As it scrolls
 * into view a clay line traces the seat's rim: it starts where the rim comes out from behind
 * the trunk, runs round both sides, and stops short of meeting at the front. Two projection
 * lines drop from the rim's left and right ends, out of the photograph, down the page and
 * into a plan of the same ring drawn from above at exactly the rim's width (a technical
 * drawing's elevation-to-plan projection). In the plan the ring draws again from its top, both
 * ways round, and again stops short at the front. The four area names are inscribed around it
 * in its four quarters; 'Pranava Svasthya' stands at the centre, where the trunk is. The join
 * has not been made, and the drawing shows that rather than saying it.
 *
 * With reduced motion, or without scroll-driven animation support, both rings and the
 * projection lines are simply drawn. Nothing depends on motion: the names and the note are
 * never hidden.
 *
 * CONTENT. heal.areas, heal.svasthya and heal.note, verbatim. Nothing describes an area. The
 * names are inscription, not tiles or links. The inscription SVG is aria-hidden and the same
 * words are given to assistive technology as a plain list.
 *
 * MEDIA. pr-ttc-dsc_0014_1 alone (1620 max). One frame on purpose: a frame per area would
 * illustrate a service that has no description.
 *
 * GEOMETRY, in the frame's own pixels (1620 x 1080), measured on the image. The green seat's
 * top rim is an ellipse centred (717.5, 622), rx 267, ry 18, tilted -1.9deg, so its ends sit
 * at x 450.6 and 984.4 (width 533.8). The trunk hides the back of the rim between parametric
 * angles 258deg and 276deg. The plan's ring is r = 200 in a 490-unit viewBox, so the plan is
 * drawn at 533.8 / cropWidth x 122.5% of the stage and its equator ends fall exactly under the
 * rim's ends. The crop (and so the scale) changes at 640 and 1024px; see sec-th2.css.
 */

const IMG = 'pr-ttc-dsc_0014_1';
const srcSet = [480, 960, 1620].map((w) => `/media/stills/${IMG}-${w}.webp ${w}w`).join(', ');
/* The plate is 1620 / cropWidth times the stage: 2.25x on phones, 1.41x mid, 1x at 1024+. */
const SIZES = '(max-width: 639px) 225vw, (max-width: 1023px) 141vw, min(92vw, 1408px)';
const ALT = 'Two painted circular tree seats under spreading trees on open sandy ground';

/* The four quarters: NW, NE on the upper arc (read over the top), SW, SE on the lower arc
   (read along the bottom, upright). Order follows heal.areas read as two rows. */
const ARCS = [
  { id: 'th2-q-nw', d: 'M-214 0 A214 214 0 0 1 107 -185.33' },
  { id: 'th2-q-ne', d: 'M-107 -185.33 A214 214 0 0 1 214 0' },
  { id: 'th2-q-sw', d: 'M-222.16 -59.53 A230 230 0 0 0 59.53 222.16' },
  { id: 'th2-q-se', d: 'M-59.53 222.16 A230 230 0 0 0 222.16 -59.53' },
];

function splitName(name: string): [string, string] {
  const i = name.lastIndexOf(' ');
  return i > 0 ? [name.slice(0, i + 1), name.slice(i + 1)] : [name, ''];
}

export function Th2Areas() {
  const [sv1, sv2] = splitName(heal.svasthya);

  return (
    <section className="th2-areas" id="heal-areas">
      <div className="th2-rail">
        <Mark n="01">What this area will hold</Mark>

        <figure className="th2-fig">
          <div className="th2-photo">
            <div className="th2-plate">
              <img
                className="th2-img"
                src={`/media/stills/${IMG}-960.webp`}
                srcSet={srcSet}
                sizes={SIZES}
                width={1620}
                height={1080}
                alt={ALT}
                loading="lazy"
                decoding="async"
              />
              <svg
                className="th2-trace"
                viewBox="0 0 1620 1080"
                aria-hidden="true"
                focusable="false"
              >
                <g transform="translate(717.5 622) rotate(-1.9)">
                  <path
                    className="th2-arc"
                    d="M-55.51 -17.61 A267 18 0 0 0 -27.91 17.9"
                    pathLength={1}
                  />
                  <path
                    className="th2-arc"
                    d="M27.91 -17.9 A267 18 0 0 1 27.91 17.9"
                    pathLength={1}
                  />
                </g>
                <line className="th2-proj th2-proj--p" x1="450.6" y1="631" x2="450.6" y2="1080" />
                <line className="th2-proj th2-proj--p" x1="984.4" y1="613" x2="984.4" y2="1080" />
              </svg>
            </div>
          </div>

          <div className="th2-drop" aria-hidden="true">
            <i className="th2-drop__l th2-drop__l--l" />
            <i className="th2-drop__l th2-drop__l--r" />
          </div>

          <div className="th2-plan">
            <svg
              className="th2-plansvg"
              viewBox="-245 -245 490 490"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                {ARCS.map((a) => (
                  <path key={a.id} id={a.id} d={a.d} />
                ))}
              </defs>
              <line className="th2-proj th2-proj--r" x1="-200" y1="-245" x2="-200" y2="0" />
              <line className="th2-proj th2-proj--r" x1="200" y1="-245" x2="200" y2="0" />
              <path className="th2-ring" d="M0 -200 A200 200 0 0 0 -20.91 198.9" pathLength={1} />
              <path className="th2-ring" d="M0 -200 A200 200 0 0 1 20.91 198.9" pathLength={1} />
              <circle className="th2-origin" cx="0" cy="-200" r="3.4" />
              {heal.areas.map((name, i) => (
                <text className="th2-name" key={name}>
                  <textPath href={`#${ARCS[i % ARCS.length]!.id}`} startOffset="50%" textAnchor="middle">
                    {name}
                  </textPath>
                </text>
              ))}
              <text className="th2-sv" textAnchor="middle">
                <tspan x="0" y="-6">
                  {sv1}
                </tspan>
                {sv2 && (
                  <tspan x="0" y="58">
                    {sv2}
                  </tspan>
                )}
              </text>
            </svg>

            <ul className="th2-sr">
              {heal.areas.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p className="th2-sr">{heal.svasthya}</p>

            <p className="th2-note">{heal.note}</p>
          </div>
        </figure>
      </div>
    </section>
  );
}
