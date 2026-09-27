import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { MAT, PLATES, srcOf, srcSetOf } from './frames';

/**
 * ABOUT §01 · INTRODUCTION — concept A, "The mat's width".
 *
 * WHAT HAPPENS. The claim is set in two halves with a photograph standing between them,
 * cut to the proportions of a yoga mat — "Yoga is more than | ▮ | a practice on the mat." —
 * and a pair of brass crop marks stands at that strip's two edges. Four more photographs
 * follow, one for each sentence that widens the argument. Each arrives as a strip exactly
 * the mat's width, under the same crop marks, and opens outward as it comes up the screen
 * until it is 2.5, 4.4, 7 mats wide and finally the whole width of the page. The crop marks
 * never move. By the last picture the mat's width is a narrow band in the middle of a
 * field, and there is no mat in the picture at all.
 *
 * WHY IT SURVIVES REDUCED MOTION. The widening is spatial before it is temporal: the five
 * plates ARE five widths, and the marks stand at the mat's width on every one of them. With
 * motion off, or JavaScript off, the section is the finished sequence — a strip, then
 * pictures 2.5, 4.4 and 7 strips wide, then the full bleed, each marked where the mat
 * would have cropped it. The opening only lets the reader watch each picture exceed the
 * mat; it is never the only place that happens.
 *
 * Every sentence comes out of content/pranava.ts verbatim. The claim is split by WORDS,
 * not retyped, so the two halves concatenate back to the client's sentence exactly, and
 * both halves are in one <p> — a screen reader hears one sentence, then the photograph.
 */

function Marks() {
  return (
    <>
      <span className="sx2a-tick sx2a-tick--tl" aria-hidden="true" />
      <span className="sx2a-tick sx2a-tick--tr" aria-hidden="true" />
      <span className="sx2a-tick sx2a-tick--bl" aria-hidden="true" />
      <span className="sx2a-tick sx2a-tick--br" aria-hidden="true" />
    </>
  );
}

/* The width a plate's <img> actually renders at under `object-fit: cover`. A plate narrower
   than its 3:2 source is scaled by HEIGHT, so the file it needs is set by the plate's
   height × 1.5, not its width — a `sizes` written from the box width would fetch the 480w
   file for a strip that paints 700 CSS px of photograph. */
const SIZES = [
  '(max-width: 719px) 130vw, 48vw',
  '(max-width: 719px) 130vw, 48vw',
  '(max-width: 719px) 130vw, 70vw',
  '(max-width: 719px) 170vw, 100vw',
];

export function Introduction() {
  const [claim, ...rest] = about.intro;
  const words = claim.split(' ');
  const lead = words.slice(0, 2).join(' '); // "Yoga is"
  const turn = words.slice(2, 4).join(' '); // "more than"
  const tail = words.slice(4).join(' '); //    "a practice on the mat."

  return (
    <section className="sx2a" id="sx2a" aria-labelledby="sx2a-h">
      <div className="sx2a-rail">
        <h2 className="sx2a-mark" id="sx2a-h">
          <span className="sx2a-mark__n">01</span>
          <span className="sx2a-mark__rule" aria-hidden="true" />
          Introduction
        </h2>
      </div>

      {/* THE CLAIM, split around the mat. */}
      <div className="sx2a-claim">
        <p className="sx2a-claim__p">
          <span className="sx2a-claim__a">
            {lead} <em>{turn}</em>
          </span>{' '}
          <span className="sx2a-claim__b">{tail}</span>
        </p>

        <figure className="sx2a-plate sx2a-plate--mat" data-sx2a-mat="">
          <div className="sx2a-plate__win">
            <picture>
              <source type="image/avif" srcSet={MAT.stillAvif} />
              <img
                className="sx2a-plate__img"
                src={MAT.still}
                alt={MAT.alt}
                width={1080}
                height={1920}
                decoding="async"
                style={{ objectPosition: MAT.pos }}
              />
            </picture>
            {/* No `poster`, no `src`: the picture above IS the poster, and the file is
                attached by Sx2aMotion only when the strip is within a screen. */}
            <video
              className="sx2a-plate__vid"
              data-src={MAT.src}
              muted
              playsInline
              loop
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              style={{ objectPosition: MAT.pos }}
            />
          </div>
          <Marks />
        </figure>
      </div>

      {/* THE ARGUMENT WIDENS — picture first, then the sentence that names it. */}
      <div className="sx2a-essay">
        {PLATES.map((plate, i) => {
          const last = i === PLATES.length - 1;
          return (
            <div className={`sx2a-step sx2a-step--${i + 2}`} key={plate.id}>
              <figure
                className={`sx2a-plate sx2a-plate--${i + 2}`}
                data-sx2a-plate=""
                style={{ '--sx2a-op': plate.pos, '--sx2a-op-n': plate.posNarrow } as CSSProperties}
              >
                <div className="sx2a-plate__win">
                  <img
                    className="sx2a-plate__img"
                    src={srcOf(plate)}
                    srcSet={srcSetOf(plate)}
                    sizes={SIZES[i]}
                    alt={plate.alt}
                    width={1620}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="sx2a-leaf sx2a-leaf--l" aria-hidden="true" />
                  <span className="sx2a-leaf sx2a-leaf--r" aria-hidden="true" />
                </div>
                <Marks />
              </figure>
              <div className="sx2a-rail">
                <p className={`sx2a-line${last ? ' sx2a-line--last' : ''}`} data-sx2a-r="">
                  {rest[i]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
