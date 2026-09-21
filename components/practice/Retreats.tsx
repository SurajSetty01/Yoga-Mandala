import type { CSSProperties } from 'react';
import { FRAMES, type Frame } from './frames';
import { Cap, Eyebrow, Shot } from './parts';
import { FORMS, INTENTION } from './sentences';

/**
 * 05 · RETREATS AND IMMERSIONS — FOUR FRAMES, EACH ONE BIGGER THAN THE LAST, SO THE
 * SECTION TAKES LONGER TO READ THE FURTHER INTO IT YOU GO.
 *
 * DURATION MADE VISIBLE, with the only measure this page is allowed to use: the reader's
 * own scroll. No immersion on this site can say how many days it runs, because no client
 * document says. What the section can do is SPEND the reader's time in the shape of the
 * thing — the first frame passes in a moment and the last one holds the whole screen, so
 * the same flick of a wheel buys less and less picture as the section goes on. By the
 * bottom you are moving at a quarter of the speed you came in at, and nobody has been told
 * a number.
 *
 * The four frames are the archive's outdoor material in the order a day away would
 * happen — the path out, the pavilion at the end of it, the sitting, and one person still
 * under the banyan. They are also the only outdoor meditation frames in 1,211 images,
 * which is the whole reason this section is not four more pictures of the hall.
 *
 * THE SECTION LEAVES THE ROOM, and that is the other half of the mechanic. Sections 01 to
 * 04 are indoors on a red oxide floor; this one is grass, earth, trees and sky. An
 * immersion is somewhere else, and the page goes there.
 *
 * The words are the client's own, and they arrive in the right order for it: About §4
 * names intensives and retreats among the forms the programmes take, and then says what
 * every form is for. That second sentence is the destination the four frames walk to, set
 * under the largest of them. There is nothing else true to say about a retreat here, and
 * saying nothing else is the point.
 *
 * WIDTH RATHER THAN CROP. Each frame grows by getting WIDER at a fixed 3:2 — which is the
 * intrinsic shape of every Prabodha derivative — so none of the four is cropped harder
 * than any other and the biggest is never upscaled: capped at 84rem, a 1620px source is
 * exact at 1440 and still unstretched at 2531.
 */
const RUN: Array<{ f: Frame; cap: string }> = [
  { f: FRAMES.path, cap: 'The way out.' },
  { f: FRAMES.pavilion, cap: 'What stands at the end of it.' },
  { f: FRAMES.sitting, cap: 'Sitting, on grass, among trees.' },
  { f: FRAMES.banyan, cap: 'One person, under the banyan, not moving.' },
];

/** 0.42 → 1.0 of the section's measure, so each frame holds the reader longer than the last. */
const WIDTH = [0.42, 0.6, 0.8, 1] as const;
const SIZES = [
  '(max-width: 719px) 92vw, 36vw',
  '(max-width: 719px) 92vw, 52vw',
  '(max-width: 719px) 92vw, 68vw',
  '(max-width: 719px) 92vw, min(84rem, 88vw)',
] as const;

export function Retreats() {
  return (
    <section className="pc-s pc-s--deep pc-ret" id="pc-retreats">
      <div className="pc-rail">
        <Eyebrow n="05" dark>
          Retreats and immersions
        </Eyebrow>
        <p className="pc-ret__lead" data-pc="up">
          {FORMS}
        </p>
      </div>

      <div className="pc-ret__run">
        {RUN.map((r, i) => (
          <figure
            className="pc-ret__step"
            key={r.f.id}
            data-pc="up"
            style={{ '--w': WIDTH[i], '--i': i } as CSSProperties}
          >
            <Shot frame={r.f} sizes={SIZES[i] as string} />
            <figcaption>
              <Cap dark>{r.cap}</Cap>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="pc-rail">
        <p className="pc-ret__end" data-pc="up">
          {INTENTION}
        </p>
      </div>
    </section>
  );
}
