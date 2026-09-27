import type { CSSProperties, ReactNode } from 'react';
import { about } from '@/content/pranava';
import { MAT, PLATES, srcOf, srcSetOf } from './frames';
import { Sx2Motion } from './Sx2Motion';

/**
 * ABOUT §01 · INTRODUCTION — "The mat's width". Base: preview concept sx2a.
 *
 * WHAT HAPPENS. The claim is split around a moving photograph cut to a yoga mat's
 * proportions — "Yoga is more than | ▮ | a practice on the mat." — with brass crop marks at
 * the strip's edges. Each of the four sentences that follow is preceded by a photograph
 * that arrives as a strip exactly the mat's width, under crop marks at the same x, and
 * opens outward as it comes up the screen: 2.5, 4.4, 7 mats wide, then the whole page.
 * The marks never move. One mat; a pavilion of study; the banyan; a row of five mats; and
 * last, practice on grass with no mat at all.
 *
 * GRAFTED from concept sx2c: its concordance found that "practice" is in every one of the
 * five sentences. Here that word is picked out in forest italic wherever it falls, so the
 * one thing that stays constant as the pictures widen is named in the text as well as
 * marked by the crop marks. The sentence is not split or retyped — `keyed()` cuts
 * `about.intro[n]` at the word and the pieces concatenate back to it exactly.
 * GRAFTED from concept sx2d: plate IV, its row of five practitioners in the hall.
 *
 * REDUCED MOTION / NO JAVASCRIPT: the plates ARE five widths, each marked where the mat
 * would have cropped it, so the finished sequence says the same thing still. Sx2Motion
 * only lets the reader watch each picture exceed the mat.
 */

const KEY = /\bpractice\b/;

function keyed(text: string | undefined): ReactNode {
  if (!text) return null;
  const m = KEY.exec(text);
  if (!m) return text;
  return (
    <>
      {text.slice(0, m.index)}
      <em className="sx2-key">{m[0]}</em>
      {text.slice(m.index + m[0].length)}
    </>
  );
}

function Marks() {
  return (
    <>
      <span className="sx2-tick sx2-tick--tl" aria-hidden="true" />
      <span className="sx2-tick sx2-tick--tr" aria-hidden="true" />
      <span className="sx2-tick sx2-tick--bl" aria-hidden="true" />
      <span className="sx2-tick sx2-tick--br" aria-hidden="true" />
    </>
  );
}

/* The width a plate's <img> renders at under object-fit: cover — a plate narrower than
   its 3:2 source is scaled by HEIGHT, so the file it needs follows height × 1.5. */
const SIZES = [
  '(max-width: 719px) 130vw, 48vw',
  '(max-width: 719px) 130vw, 48vw',
  '(max-width: 719px) 130vw, 70vw',
  '(max-width: 719px) 170vw, 100vw',
];

export function AboutIntroduction() {
  const [claim, ...rest] = about.intro;
  const words = claim.split(' ');
  const lead = words.slice(0, 2).join(' '); // "Yoga is"
  const turn = words.slice(2, 4).join(' '); // "more than"
  const tail = words.slice(4).join(' '); //    "a practice on the mat."

  return (
    <section className="sx2-intro" id="introduction" aria-labelledby="sx2-h">
      <div className="sx2-rail">
        <h2 className="sx2-mark" id="sx2-h">
          <span className="sx2-mark__n">01</span>
          Introduction
        </h2>
      </div>

      {/* THE CLAIM, split around the mat. One <p>: a screen reader hears one sentence. */}
      <div className="sx2-claim">
        <p className="sx2-claim__p">
          <span className="sx2-claim__a">
            {lead} <em>{turn}</em>
          </span>{' '}
          <span className="sx2-claim__b">{keyed(tail)}</span>
        </p>

        <figure className="sx2-plate sx2-plate--mat" data-sx2-mat="">
          <div className="sx2-plate__win">
            <picture>
              <source type="image/avif" srcSet={MAT.stillAvif} />
              <img
                className="sx2-plate__img"
                src={MAT.still}
                alt={MAT.alt}
                width={1080}
                height={1920}
                decoding="async"
                style={{ objectPosition: MAT.pos }}
              />
            </picture>
            {/* No poster, no src: the picture above IS the poster; Sx2Motion attaches the
                file within a screen of the strip and releases it a screen past. */}
            <video
              className="sx2-plate__vid"
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
      <div className="sx2-essay">
        {PLATES.map((plate, i) => {
          const last = i === PLATES.length - 1;
          return (
            <div className={`sx2-step sx2-step--${i + 2}`} key={plate.id}>
              <figure
                className={`sx2-plate sx2-plate--${i + 2}`}
                data-sx2-plate=""
                style={{ '--sx2-op': plate.pos, '--sx2-op-n': plate.posNarrow } as CSSProperties}
              >
                <div className="sx2-plate__win">
                  <img
                    className="sx2-plate__img"
                    src={srcOf(plate)}
                    srcSet={srcSetOf(plate)}
                    sizes={SIZES[i]}
                    alt={plate.alt}
                    width={1620}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="sx2-leaf sx2-leaf--l" aria-hidden="true" />
                  <span className="sx2-leaf sx2-leaf--r" aria-hidden="true" />
                </div>
                <Marks />
              </figure>
              <div className="sx2-rail">
                <p className={`sx2-line${last ? ' sx2-line--last' : ''}`} data-sx2-r="">
                  {keyed(rest[i])}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Sx2Motion />
    </section>
  );
}
