import type { CSSProperties } from 'react';
import { FRAMES } from './frames';
import { Cap, Eyebrow, Shot } from './parts';
import { PRACTICE } from './sentences';

/**
 * 02 · REGULAR PRACTICE — THE ROOM, SET OUT AGAIN, RUNNING OFF BOTH EDGES OF THE SCREEN.
 *
 * THE HARD CONSTRAINT IS THIS SECTION'S WHOLE PROBLEM. Blueprint §6 asks Practice to
 * explain "regular practice"; Blueprint §16 lists schedules among the content that does
 * not exist yet; and there is no timetable, day, hour, session length, class size or level
 * anywhere in the client's three documents. A week laid out in seven columns would be the
 * single easiest invention on this whole site, and it would be a lie.
 *
 * What the archive has instead is the truest picture of regularity it could have: three
 * frames of a practice room PREPARED AND EMPTY. Mats, folded blankets, bolsters, blocks
 * and folding chairs, set out in a row, with nobody in them. Somebody laid those out.
 * Somebody will lay them out again. That is what "regular" means, and it commits to
 * nothing the client has not shown us.
 *
 * So the section is a FRIEZE: the three frames repeated along a strip that is wider than
 * any viewport and is cut by both edges of the screen, drifting sideways as the section
 * passes. Same room, again, and again, and no beginning or end in shot. It is the page's
 * only lateral movement, which is what keeps it distinct from §01's column above it.
 *
 * The client's sentence over it is the third of the three in About §5's Practice
 * paragraph — the only sentence in the material that names what regularity actually asks
 * for. §01 took the first two; joined back together they are the client's paragraph,
 * unaltered.
 *
 * The strip's drift has a finished default of zero, so with no JavaScript the frieze is a
 * complete, still row of prepared rooms cut by both screen edges — which is the same
 * picture, just not moving.
 */
const TILES = [FRAMES.setRow, FRAMES.setClose, FRAMES.setEmpty] as const;

export function Regular() {
  return (
    <section className="pc-s pc-s--warm pc-reg" id="pc-regular">
      <div className="pc-rail">
        <Eyebrow n="02">Regular practice</Eyebrow>
        <p className="pc-reg__lead" data-pc="up">
          {PRACTICE[2]}
        </p>
      </div>

      {/* Two passes of the same three frames. The second pass carries an empty alt and is
          therefore decorative: it is the SAME three photographs, and a screen reader that
          meets each of them twice has been told the room is six rooms. */}
      <div className="pc-reg__strip" data-pc="strip">
        <div className="pc-reg__track">
          {[0, 1].map((pass) =>
            TILES.map((f, i) => (
              <figure className="pc-reg__tile" key={`${pass}-${f.id}`} style={{ '--i': i } as CSSProperties}>
                <Shot
                  frame={f}
                  sizes="(max-width: 719px) 62vw, (max-width: 1099px) 38vw, 28rem"
                  {...(pass === 1 ? { alt: '' } : {})}
                />
              </figure>
            )),
          )}
        </div>
      </div>

      <div className="pc-rail">
        <Cap>
          A practice room prepared before anyone arrives: mats, folded blankets, bolsters,
          blocks and chairs, set out in a row.
        </Cap>
      </div>
    </section>
  );
}
