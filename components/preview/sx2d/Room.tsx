import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { WALLS, src, srcSet, type Wall } from './frames';

/**
 * 01 · INTRODUCTION — the page stands up into a room.
 *
 * Three plates of one shape, 3:2, in a row: a photograph, the first sentence, a photograph.
 * When the section arrives they lie flat across the page — a frieze, which is exactly the
 * "picture beside the text" this section may not be. As it rises into the screen the two
 * photographs swing up toward the reader on hinges at the sentence's edges and stand as the
 * side walls of a hall. The page stops being a page with pictures on it and becomes a space
 * the reader is looking into, and the far wall of that space is the claim: "Yoga is more
 * than a practice on the mat." The flat surface becoming the room around it is the claim,
 * acted out.
 *
 * The two walls are ONE row of five people photographed from its two ends (see frames.ts),
 * so both rows run away from the reader into the corners where the walls meet the words.
 * The other four sentences are set on the floor in front of the room, where the reader
 * stands, in the far wall's own measure.
 *
 * Everything here is server-rendered. The fold is one custom property, `--sx2d-fold`, with a
 * FINISHED default of 1 in the stylesheet — so without JavaScript, and under reduced motion,
 * the room is simply standing, and nothing is reachable only through motion. RoomMotion.tsx
 * is the only client code.
 */
export function Room() {
  const [claim, ...rest] = about.intro;
  const belief = rest[rest.length - 1];
  const argument = rest.slice(0, -1);

  return (
    <section className="sx2d" id="sx2d-intro">
      <div className="sx2d-stage">
        {/* THE FAR WALL. A 3:2 plate, the same shape as the two photographs hinged to it, and
            the claim is set on it at a fixed fraction of its width (cqi), so its proportion
            to the room never changes. Not its line breaks: Fraunces' optical sizing draws
            the 80px claim at 2531 tighter than the 45px one at 1440, so the big room sets
            it on two lines where 1440 uses three. Measured, not assumed. */}
        <div className="sx2d-back">
          <div className="sx2d-lead">
            <Eyebrow n="01">Introduction</Eyebrow>
            <p className="sx2d-claim">{claim}</p>
          </div>
        </div>

        {/* CAPTIONED FOR WHAT THE WALLS ARE. The pairing is the point of the room and nothing
            else on the page says it: DSC_0271 and DSC_0274 are one row of five people shot
            from its two ends, in the same five colours in reverse order. A factual line about
            the photographs, in the site's caption object — the same precedent as §06's
            "A discussion circle, with no one at the front of the room." */}
        <p className="sx2d-cap">One row of five, photographed from either end.</p>

        {/* THE FLOOR. The argument is set in front of the room, where the reader stands. */}
        <div className="sx2d-body">
          {argument.map((line) => (
            <p className="sx2d-line" key={line}>
              {line}
            </p>
          ))}
          <p className="sx2d-belief">{belief}</p>
        </div>

        <WallPanel wall={WALLS.left} side="l" />
        <WallPanel wall={WALLS.right} side="r" />
      </div>
    </section>
  );
}

/**
 * One wall. The <figure> carries the hinge transform; the <img> inside it is an ordinary
 * cover-fitted photograph, and the shading is a pseudo-element whose opacity is the fold.
 *
 * Each wall is exactly the far wall's size — 3:2, like the photograph — so the picture is
 * never cropped: both rows are shown whole, end to end. `sizes` states the RENDERED width,
 * not the wall's: the perspective magnifies the near edge 1.6x, so a wall 34vw wide renders
 * up to ~54vw wide at its near end. At 1440 that is ~790px, at 2531 ~1,380px; on a phone,
 * where the wall is 60vw, ~96vw.
 */
function WallPanel({ wall, side }: { wall: Wall; side: 'l' | 'r' }) {
  return (
    <figure className={`sx2d-wall sx2d-wall--${side}`}>
      <img
        className="sx2d-wall__img"
        src={src(wall)}
        srcSet={srcSet(wall)}
        sizes="(max-width: 719px) 96vw, (max-width: 1179px) 61vw, 55vw"
        alt={wall.alt}
        loading="lazy"
        decoding="async"
        style={{ '--sx2d-op': wall.pos, '--sx2d-op-n': wall.posNarrow } as CSSProperties}
      />
    </figure>
  );
}
