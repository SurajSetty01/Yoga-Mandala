import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '../parts';
import { VALUE_FRAMES, stillSet, stillSrc } from './frames';
import { Sx9Motion } from './Motion';

/**
 * 09 · WHAT WE VALUE — four slits that open.
 *
 * Each value is a thin horizontal slit cut through a photograph of it being done, veiled
 * pale as the page, with the word set large across it. The stack is held on screen while
 * the reader scrolls; one slit at a time reaches the reading line and opens to the whole
 * frame, the veil lifts, the word steps down out of the picture to name it, and its one
 * line appears beneath. The others stay slits. The word is the glimpse; the line is the
 * view.
 *
 * THE WORDS ARE SET IN INTER, ALL FOUR, AND THAT IS A CORRECTNESS DECISION. Fraunces has
 * no precomposed ā, so the browser decomposes it and the macron is dropped or orphaned —
 * DESIGN-SYSTEM §1 recorded it for the client's name, and Sādhana and Sevā both carry one.
 * Setting two of the four in another face would rank them; all four share Inter. The lines
 * carry no diacritics and are in Fraunces.
 *
 * WITHOUT SCRIPT, AND UNDER REDUCED MOTION, all four stand open at 3:2, each word and line
 * beneath its photograph, in the client's order. That is the finished state; Motion.tsx
 * only ever closes slits it is about to open.
 */
export function Sx9Values() {
  return (
    <section className="sx9" id="sx9-values" aria-labelledby="sx9-h">
      <div className="sx9-rail">
        <div id="sx9-h">
          <Eyebrow n="09">What we value</Eyebrow>
        </div>
      </div>

      <div className="sx9-track">
        <div className="sx9-stage">
          <ol className="sx9-list">
            {about.values.map((v, i) => {
              const f = VALUE_FRAMES[v.name];
              return (
                <li
                  className="sx9-v"
                  key={v.name}
                  data-band={f?.band ?? 0.5}
                  style={{ ['--sx9-i' as string]: i } as CSSProperties}
                >
                  <h3 className="sx9-word" lang="sa-Latn">
                    {v.name}
                  </h3>
                  <p className="sx9-line">{v.body}</p>
                  {f && (
                    <div className="sx9-win">
                      <img
                        className="sx9-img"
                        src={stillSrc(f.id, 960)}
                        srcSet={stillSet(f.id)}
                        sizes="(max-width: 719px) 92vw, (max-width: 1599px) 56vw, 1040px"
                        width={1620}
                        height={1080}
                        alt={f.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="sx9-veil" aria-hidden="true" />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <Sx9Motion />
    </section>
  );
}
