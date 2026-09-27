import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { CLIP, FRAMES, src, srcSet, type Face } from './frames';

/**
 * PRAṆAVA · ABOUT · §03 — OUR APPROACH.   Concept sx3d, the spatial one.
 *
 * WHAT HAPPENS
 *   A room arrives drawn flat, and stands up around a teacher and a student.
 *
 *   The section opens on a laid-out drawing: five photographs lying in one plane in the
 *   shape of a cross — the convention Robert Adam's office used for interiors, "a box with
 *   the walls flattened open". It rises into view lying flat, and once the whole of it is
 *   on screen the four outer pictures fold up on their hinges in the order the lead names them: the
 *   floor first (Rooted in tradition), then the two walls (Alive in practice), then the
 *   ceiling (Open to inquiry). What they fold up AROUND is the fifth picture, which never
 *   moves and is the only one that does: a teacher talking a student through a headstand
 *   while the class watches — Transmission, on the far wall, facing the reader.
 *
 * WHY THE LEAD LINE BECOMES A ROOM
 *   The client's sentence is already spatial. ROOTED is down; ALIVE is at your own height,
 *   on either side of you; OPEN is up. So Tradition is the floor, an earth lane running
 *   away toward the back wall; Practice is both walls, two rows of people working against
 *   the walls they are photographed on; Inquiry is the ceiling, a palm crown photographed
 *   looking straight up. Transmission is not in the lead because it is not a direction of
 *   the room. It is who you face in it — and the reader, standing at the open fourth side,
 *   is standing where the student stands. That is the asymmetry the content carries, and
 *   it is carried here without a number, a panel or a row.
 *
 * WHAT IS STILL
 *   Everything but the far wall. Under reduced motion, with JavaScript off, or before the
 *   island runs, the room is simply standing and the far wall is its still: the stylesheet
 *   default of every fold value is 1. Nothing is reachable only through motion, and the
 *   idea — a room made of the three, with the fourth in it — is whole in the static state.
 *
 * TEXT IS NEVER ON A PICTURE. Every word stands on paper beside the room, so contrast here
 * is ink on --ground and nothing else. Each term carries a KEY PLAN — the small shaded
 * diagram an architect puts in the corner of a sheet to say which part of the building you
 * are looking at — with its own surface filled in. It is the legend between the prose and
 * the room, and it is drawn, not described.
 *
 * COPY. Every sentence comes out of content/pranava.ts untouched.
 */

const K = {
  /* the key plan, in the room's own proportions: a front opening of 95 × 118.75 and a back
     wall 1/1.75 of it, scaled to 38 × 47.5 */
  W: 38,
  H: 47.5,
  x0: 8.143,
  y0: 10.179,
  x1: 29.857,
  y1: 37.321,
};

const POLY: Record<Face, string> = {
  floor: `0,${K.H} ${K.W},${K.H} ${K.x1},${K.y1} ${K.x0},${K.y1}`,
  ceiling: `0,0 ${K.W},0 ${K.x1},${K.y0} ${K.x0},${K.y0}`,
  left: `0,0 ${K.x0},${K.y0} ${K.x0},${K.y1} 0,${K.H}`,
  right: `${K.W},0 ${K.x1},${K.y0} ${K.x1},${K.y1} ${K.W},${K.H}`,
  back: `${K.x0},${K.y0} ${K.x1},${K.y0} ${K.x1},${K.y1} ${K.x0},${K.y1}`,
};

function KeyPlan({ lit }: { lit: Face[] }) {
  return (
    <svg
      className="sx3d-key"
      viewBox={`-0.5 -0.5 ${K.W + 1} ${K.H + 1}`}
      aria-hidden="true"
      focusable="false"
    >
      {(Object.keys(POLY) as Face[]).map((f) => (
        <polygon key={f} points={POLY[f]} className={lit.includes(f) ? 'sx3d-key__on' : 'sx3d-key__off'} />
      ))}
    </svg>
  );
}

/** which surface(s) each of the client's four terms is, in the client's order */
const SURFACES: Face[][] = [['floor'], ['left', 'right'], ['ceiling'], ['back']];

function Wall({ face }: { face: Exclude<Face, 'back'> }) {
  const f = FRAMES[face];
  return (
    <div className={`sx3d-face sx3d-face--${face}`}>
      <img
        src={src(f)}
        srcSet={srcSet(f)}
        sizes={f.sizes}
        alt={f.alt}
        loading="lazy"
        decoding="async"
        style={{ '--sx3d-op': f.pos } as CSSProperties}
      />
    </div>
  );
}

export function Sx3dApproach() {
  const { lead, items } = about.approach;
  const three = items.slice(0, 3);
  const fourth = items[3];

  return (
    <section className="sx3d" aria-labelledby="sx3d-mark">
      <div className="sx3d-rail">
        <h2 className="sx3d-mark" id="sx3d-mark">
          <span className="sx3d-mark__n">03</span>
          <span className="sx3d-mark__rule" aria-hidden="true" />
          Our approach
        </h2>

        <p className="sx3d-lead">{lead}</p>

        <div className="sx3d-body">
          {/* THE ROOM. One perspective, one vanishing point at the centre of the stage,
              and every length in container units so it is the same room at 320 and 2560.
              Faces are listed back-to-front so the paint order agrees with the depth
              order even where a browser flattens the scene. */}
          <figure className="sx3d-stage">
            <div className="sx3d-view">
              <div className="sx3d-room">
                <div className="sx3d-face sx3d-face--back">
                  <picture>
                    <source srcSet={CLIP.avif} type="image/avif" />
                    <img
                      src={CLIP.jpg}
                      alt={CLIP.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ '--sx3d-op': CLIP.pos } as CSSProperties}
                    />
                  </picture>
                  {/* no `src`, no `poster`: the island attaches the file on approach and
                      releases it a screen past. The still above IS the poster. */}
                  <video
                    className="sx3d-clip"
                    data-src={CLIP.mp4}
                    muted
                    playsInline
                    loop
                    preload="none"
                    aria-hidden="true"
                    tabIndex={-1}
                    style={{ '--sx3d-op': CLIP.pos } as CSSProperties}
                  />
                </div>
                <Wall face="floor" />
                <Wall face="ceiling" />
                <Wall face="left" />
                <Wall face="right" />
              </div>
            </div>
          </figure>

          <div className="sx3d-terms">
            {three.map((it, i) => (
              <div className="sx3d-term" key={it.name}>
                <h3 className="sx3d-term__name">
                  <KeyPlan lit={SURFACES[i] ?? []} />
                  {it.name}
                </h3>
                <p className="sx3d-term__body">{it.body}</p>
              </div>
            ))}

            <div className="sx3d-term sx3d-term--turn">
              <h3 className="sx3d-term__name">
                <KeyPlan lit={['back']} />
                {fourth.name}
              </h3>
              <p className="sx3d-term__body">{fourth.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
