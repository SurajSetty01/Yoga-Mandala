import type { CSSProperties } from 'react';

import { about } from '@/content/pranava';
import { HALL, NEAR, WINGS, src, srcSet, type Frame } from './frames';

/**
 * §01 · INTRODUCTION — "the opening".
 *
 * A doorway-shaped hole is cut in the paper and widens all the way down the
 * section until it is the full width of the page. Behind it is one room —
 * five practitioners in a line that recedes toward green daylight — held still
 * while the reader scrolls, so the widening does not move the picture, it
 * uncovers more of it. The room starts far away and dim and comes up to full
 * strength as you reach it. Four photographic flats stand in the paper on
 * alternating sides with their inner edges lying exactly on the two lines of
 * the hole, each smaller, paler and further out than the last. The client's
 * five sentences are read inside the hole, and each is wider than the one
 * before it — because the hole is. The last screen is the room at full width
 * and full colour, with no type on it and nothing over it, handing straight to
 * the ground §02 stands on.
 *
 * The client's note on the deleted version was that it felt empty because
 * nothing was on the right. The answer here is not to move a photograph there.
 * There is no left and right in this section: there is a near, a middle and a
 * far, and at every scroll position both margins are carrying a picture while
 * the centre carries the room.
 *
 * DOM ORDER IS READING ORDER. The flats are absolutely positioned, so they can
 * be interleaved with the sentences in the source — heading, the far frame,
 * then sentence, flat, sentence, flat — and a reader on a screen reader or
 * with styles off gets the argument in the client's sequence with a described
 * photograph between its steps.
 *
 * ROUND 3: THIS ROUTE NOW SHIPS NO JAVASCRIPT. The 2,466 KB clip on the near
 * plane is gone — both critics measured it as 86% of the section's bytes
 * buying a reduced-motion pixel diff of 0.00% — and with it went the island
 * that attached it. The widening is a clip-path that is a function of height,
 * the stillness is `position: sticky`, and the room coming up to strength is a
 * linear-gradient on a block that scrolls past a picture that does not. All
 * three are layout. There is nothing left to disable, and nothing left to
 * start.
 */

function Wing({
  n,
  side,
  frame,
}: {
  n: 2 | 3 | 4;
  side: 'l' | 'r';
  frame: Frame;
}) {
  return (
    <div className={`sx2d-wing sx2d-wing--${side} sx2d-wing--${n}`}>
      <figure className="sx2d-wing__fig">
        <img
          src={src(frame)}
          srcSet={srcSet(frame)}
          sizes={frame.sizes}
          alt={frame.alt}
          loading="lazy"
          decoding="async"
          style={
            {
              '--op': frame.pos,
              '--op-n': frame.posNarrow ?? frame.pos,
            } as CSSProperties
          }
        />
      </figure>
    </div>
  );
}

export function Opening() {
  const lines = about.intro;

  return (
    <section className="sx2d-open" id="sx2d-open">
      <h2 className="sx2d-eyebrow sx2d-open__mark">
        <span className="sx2d-eyebrow__n">01</span>
        <span className="sx2d-eyebrow__rule" aria-hidden="true" />
        Introduction
      </h2>

      {/* the cut edge, one layer behind the opening and 1.5px wider on every side */}
      <div className="sx2d-open__rim" aria-hidden="true" />

      {/* THE ROOM AT THE FAR END. The <img> is sticky, so it stops while the
          page keeps going. The haze is NOT on it — it is a sibling that scrolls
          normally, which is what turns a flat wash into distance. */}
      <div className="sx2d-open__hall">
        <div className="sx2d-open__still">
          <img
            className="sx2d-open__hallImg"
            src={src(HALL)}
            srcSet={srcSet(HALL)}
            sizes={HALL.sizes}
            alt={HALL.alt}
            loading="eager"
            decoding="async"
            style={
              {
                '--op': HALL.pos,
                '--op-n': HALL.posNarrow ?? HALL.pos,
              } as CSSProperties
            }
          />
        </div>
        <span className="sx2d-open__haze" aria-hidden="true" />

        {/* THE LIGHT IN THE ROOM IS LOWER WHERE YOU ARE READING.

            Round 4. The contrast under the type used to be bought by a box
            behind each sentence — and in the render that box was a hard-edged
            dark rectangle at every width (see the stylesheet: a radial
            gradient sized 145% x 165% never reaches its own transparent stop
            inside a 100% x 100% box, so the "fade" was painted entirely
            outside the element and what shipped was a solid rectangle with
            four corners). These five pools do the same job with the same
            alpha, but they live INSIDE the opening, so the doorway's own
            clip-path is their left and right edge and they fade to nothing
            above and below. There is no boundary that is not already a line
            of the section.

            They are placed by the same function as the sentences: each one's
            --pu is the sentence's own depth, and the shared rule lifts it
            13svh and runs it 46svh so the plateau covers the tallest wrap at
            every viewport. Move a sentence and you must move its pool. */}
        <span className="sx2d-open__pool sx2d-open__pool--1" aria-hidden="true" />
        <span className="sx2d-open__pool sx2d-open__pool--2" aria-hidden="true" />
        <span className="sx2d-open__pool sx2d-open__pool--3" aria-hidden="true" />
        <span className="sx2d-open__pool sx2d-open__pool--4" aria-hidden="true" />
        <span className="sx2d-open__pool sx2d-open__pool--5" aria-hidden="true" />
      </div>

      <p className="sx2d-line sx2d-line--1">{lines[0]}</p>

      {/* THE NEAR PLANE — the largest flat, a metre from the reader. It was a
          2,466 KB loop; it is now the same photograph as a 29 KB still. */}
      <div className="sx2d-wing sx2d-wing--l sx2d-wing--1">
        <figure className="sx2d-wing__fig">
          <picture>
            <source srcSet={NEAR.avif} type="image/avif" />
            <img
              src={NEAR.jpg}
              alt={NEAR.alt}
              width={NEAR.w}
              height={NEAR.h}
              loading="eager"
              decoding="async"
              style={{ ['--op' as string]: NEAR.pos }}
            />
          </picture>
        </figure>
      </div>

      <p className="sx2d-line sx2d-line--2">{lines[1]}</p>

      <Wing n={2} side="r" frame={WINGS[0]} />

      <p className="sx2d-line sx2d-line--3">{lines[2]}</p>

      <Wing n={3} side="l" frame={WINGS[1]} />

      <p className="sx2d-line sx2d-line--4">{lines[3]}</p>

      <Wing n={4} side="r" frame={WINGS[2]} />

      <p className="sx2d-line sx2d-line--5">{lines[4]}</p>
    </section>
  );
}
