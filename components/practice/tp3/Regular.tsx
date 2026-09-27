import type { CSSProperties, ReactNode } from 'react';
import { PRACTICE } from '../sentences';
import { TP3_FRAMES, tp3Src, tp3SrcSet } from './frames';
import { Tp3Motion } from './Tp3Motion';

/**
 * 02 · REGULAR PRACTICE — FOUR NOUNS, FOUR STEPS CLOSER.
 *
 * The client's sentence names what regular practice asks of someone: consistency,
 * observation, refinement and time. It stays whole at the top of a pinned stage. As the run
 * is scrolled, each noun in turn is lit, and a hard cut puts its frame in the one window
 * beside it — a long row seen low along the hall; a teacher bending over a student; a back
 * foot set on a block at a chair — each crop closer than the last, while a viewfinder's
 * corners close in with it. On "time" the corners open to the edges and the picture pulls
 * back to a room in window daylight.
 *
 * The sentence is not retyped: it is PRACTICE[2], and the four nouns are found by splitting
 * the client's own list at its commas and its "and". Joined, the spans reproduce the
 * sentence character for character. If the sentence ever changes shape, it renders plainly.
 *
 * No JavaScript or reduced motion: the four frames stand in a row under the sentence, each
 * at its own crop and with its own corners, so the four steps closer are still read — left
 * to right instead of in time. No timetable, day, hour, level or place appears anywhere:
 * none exists in the client's material.
 */

const SENTENCE = PRACTICE[2] ?? '';

function splitTerms(s: string): { head: string; parts: string[]; tail: string } | null {
  const m = s.match(/^(.*?\s)((?:[^,\s]+,\s+)+[^,\s]+\s+and\s+[^.\s]+)(\.)$/);
  const [, head, list, tail] = m ?? [];
  if (head === undefined || list === undefined || tail === undefined) return null;
  const parts = list.split(/(,\s+|\s+and\s+)/);
  return parts.length === 7 ? { head, parts, tail } : null;
}

export function Tp3Regular() {
  const split = splitTerms(SENTENCE);
  const terms = split ? split.parts.filter((_, i) => i % 2 === 0) : [];

  let line: ReactNode = SENTENCE;
  if (split) {
    line = (
      <>
        <span className="tp3-seg">{split.head}</span>
        {split.parts.map((p, i) =>
          i % 2 === 0 ? (
            <span className="tp3-seg" key={i}>
              <span className="tp3-term" data-tp3-i={i / 2}>
                {p}
              </span>
              {split.parts[i + 1] ?? split.tail}
            </span>
          ) : null,
        )}
      </>
    );
  }

  return (
    <section className="tp3" id="pc-regular" aria-labelledby="tp3-h">
      <div className="tp3-run">
        <div className="tp3-stage">
          <div className="tp3-copy">
            <h2 className="tp3-eyebrow" id="tp3-h">
              <span className="tp3-eyebrow-n">02</span>
              <span className="tp3-eyebrow-rule" aria-hidden="true" />
              Regular practice
            </h2>
            <p className="tp3-line">{line}</p>
          </div>

          <div className="tp3-frames">
            {TP3_FRAMES.map((f, i) => (
              <figure
                className="tp3-fig"
                data-tp3-i={i}
                key={f.id}
                style={{ '--tp3-s': f.s, '--tp3-o': f.o, '--tp3-mark': f.mark } as CSSProperties}
              >
                <div className="tp3-win">
                  <img
                    className="tp3-img"
                    src={tp3Src(f.id, 960)}
                    srcSet={tp3SrcSet(f.id)}
                    sizes="(max-width: 899px) 94vw, 44vw"
                    width={1920}
                    height={2560}
                    alt={f.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="tp3-marks" aria-hidden="true" />
                </div>
                <figcaption className="tp3-cap">
                  {terms[i] ? <span className="tp3-cap-term">{terms[i]}</span> : null}
                  {f.cap}
                </figcaption>
              </figure>
            ))}
            <span className="tp3-view" aria-hidden="true" />
          </div>
        </div>
      </div>
      <Tp3Motion />
    </section>
  );
}
