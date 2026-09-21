import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Mark } from './parts';

/**
 * 02 — THE HEAP STRAIGHTENS.
 *
 * The client's argument here is a refusal: Yoga "is best understood not merely by
 * collecting techniques, but through a relationship between study, practice and
 * experience", and "a certificate alone" does not make a teacher. Then they answer it with
 * eight things a student is asked to do.
 *
 * So the mechanic is the argument: the eight practices arrive SCATTERED across the width of
 * the section — loose, tilted, out of order, a collection — and as the reader comes to them
 * they draw into one ordered column against a single rule. A heap of techniques becoming a
 * sequence of study, performed rather than described.
 *
 * Two decisions that are the point rather than an omission:
 *
 *  · THERE IS NO PHOTOGRAPH IN THIS SECTION. It sits between a full-width window and a
 *    section built from two frames at two distances; a third picture here would flatten all
 *    three. The eight lines are set in display type, at a size where they read as a canon
 *    rather than as a bulleted list.
 *  · THE SCATTER IS FIXED, NOT RANDOM. Every offset and angle below is a literal, so the
 *    server and the client render the same thing and the composition can be judged from a
 *    screenshot. A random scatter cannot be reviewed, and would hydrate differently.
 *
 * Under `prefers-reduced-motion`, or with no JavaScript, the start state never exists: the
 * eight are already the column. Nothing here is reachable only through motion.
 */

/** x, y and rotation each line starts at. Chosen by looking at the rendered scatter at
 *  1440 and then checked at 320, where the x offsets are scaled down by the stylesheet
 *  rather than clipped — a heap that overflows is a horizontal scrollbar. */
const SCATTER: Array<{ x: number; y: number; r: number }> = [
  { x: 0.46, y: -14, r: 2.4 },
  { x: 0.13, y: 10, r: -1.8 },
  { x: 0.61, y: -6, r: 1.2 },
  { x: 0.05, y: 16, r: 2.9 },
  { x: 0.5, y: 8, r: -2.6 },
  { x: 0.22, y: -12, r: 1.7 },
  { x: 0.66, y: 14, r: -1.1 },
  { x: 0.31, y: -8, r: 2.2 },
];

export function Method() {
  return (
    <section className="ln-me" id="what-structured-learning-means">
      <div className="ln-me__in">
        <Mark n="01">What structured learning means</Mark>

        <p className="ln-me__lead">{about.teach.lead}</p>

        <div className="ln-me__argue">
          {/* the refusal, and then its sharper form */}
          <p className="ln-me__claim" data-ln="up">
            {about.intro[4]}
          </p>
          <p className="ln-me__sub" data-ln="up" style={{ '--d': '90ms' } as CSSProperties}>
            {about.teach.open}
          </p>
        </div>

        <p className="ln-me__prompt">{about.teach.prompt}</p>

        <ol className="ln-me__eight">
          {about.teach.practices.map((p, i) => {
            const s = SCATTER[i] ?? { x: 0, y: 0, r: 0 };
            return (
              <li
                key={p}
                className="ln-me__one"
                data-ln="heap"
                style={
                  {
                    '--sx': s.x,
                    '--sy': `${s.y}px`,
                    '--sr': `${s.r}deg`,
                    '--d': `${i * 55}ms`,
                  } as CSSProperties
                }
              >
                <span className="ln-me__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="ln-me__t">{p}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
