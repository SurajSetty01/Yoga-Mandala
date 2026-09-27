import type { CSSProperties } from 'react';
import { FORMS, INTENTION } from '../sentences';
import { TP6_FRAMES, tp6Src, tp6SrcSet } from './frames';
import { Tp6Motion } from './Tp6Motion';

/**
 * 05 · RETREATS AND IMMERSIONS — SURROUNDED.
 *
 * The client's sentence naming the forms a programme takes stands alone in the middle of a
 * held screen, ending on its colon. As the pinned run is scrolled, four outdoor photographs
 * arrive in turn from the four edges — from the top, the right, the bottom, the left — and
 * close in, pinwheel-fashion, until the sentence stands in a clearing framed by them. Only
 * then does the answer to the colon land inside it: the intention every form shares.
 * Immersion is being surrounded, and the colon's answer arrives inside the surround rather
 * than 3,000px later.
 *
 * Both sentences are the client's, imported, never retyped (About §4, body[2] and
 * intention). No retreat name, place, date, duration, itinerary, stay or fee appears: none
 * exists in the client's material, and the photographs are captioned by what they show.
 *
 * No JavaScript, reduced motion, or a viewport too short to hold the clearing: the section
 * is the enclosed state, laid out still — the four frames already around the two sentences.
 */
export function Tp6Retreats() {
  return (
    <section className="tp6" id="pc-retreats" aria-labelledby="tp6-h">
      <div className="tp6-run">
        <div className="tp6-stage">
          <div className="tp6-field">
            <div className="tp6-clear">
              <h2 className="tp6-eyebrow" id="tp6-h">
                <span className="tp6-eyebrow-n">05</span>
                <span className="tp6-eyebrow-rule" aria-hidden="true" />
                Retreats and immersions
              </h2>
              <p className="tp6-lead">{FORMS}</p>
              <p className="tp6-intent">{INTENTION}</p>
            </div>

            {TP6_FRAMES.map((f) => (
              <figure
                className={`tp6-fig tp6-fig--${f.edge}`}
                data-tp6-edge={f.edge}
                key={f.id}
              >
                <img
                  className="tp6-img"
                  src={tp6Src(f.id, 960)}
                  srcSet={tp6SrcSet(f.id)}
                  sizes="(max-width: 899px) 56vw, 30vw"
                  width={1620}
                  height={1080}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ '--tp6-pos': f.pos } as CSSProperties}
                />
                <figcaption className="tp6-cap">{f.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <Tp6Motion />
    </section>
  );
}
