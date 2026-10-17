import { about } from '@/content/pranava';
import { Eyebrow } from '../parts';
import { VALUE_FRAMES, frameSet, frameSrc } from './frames';

/**
 * 05 · WHAT WE VALUE: four values, each a photograph of it being done, its word and its
 * one line.
 *
 * Narrow screens stack each photograph above its word and line. On a wide screen the
 * section spans the page measure its neighbours use: the frames take the left of it and
 * each word and line stand in a column to the right, set down to the lower edge of their
 * photograph.
 *
 * MOTION. None of its own. Each value carries `data-ap`, the page's shared gentle fade and
 * rise (components/about-pranava/AboutMotion.tsx), which is inert without script and under
 * reduced motion. The earlier pinned sequence of slits was retired on the client's review.
 *
 * THE WORDS ARE SET IN INTER, ALL FOUR. Fraunces has no precomposed ā, so the browser
 * decomposes it and the macron is dropped or orphaned (DESIGN-SYSTEM §1); Sādhana and Sevā
 * both carry one, and setting two of the four in another face would rank them.
 */
export function Sx9Values() {
  return (
    <section className="sx9" id="sx9-values" aria-labelledby="sx9-h">
      <div className="sx9-rail">
        <div id="sx9-h">
          <Eyebrow n="05">What we value</Eyebrow>
        </div>
      </div>

      <div className="sx9-track">
        <div className="sx9-stage">
          <ol className="sx9-list">
            {about.values.map((v) => {
              const f = VALUE_FRAMES[v.name];
              return (
                <li className="sx9-v" key={v.name} data-ap="up">
                  <h3 className="sx9-word" lang="sa-Latn">
                    {v.name}
                  </h3>
                  <p className="sx9-line">{v.body}</p>
                  {f && (
                    <div className="sx9-win">
                      <img
                        className="sx9-img"
                        src={frameSrc(f)}
                        srcSet={frameSet(f)}
                        sizes="(max-width: 1023px) 92vw, min(54vw, 960px)"
                        width={1620}
                        height={1080}
                        alt={f.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
