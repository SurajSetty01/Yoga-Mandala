import type { CSSProperties, ReactNode } from 'react';
import { about } from '@/content/pranava';
import { PLATES, srcOf, srcSetOf } from './frames';
import { Sx2Motion } from './Sx2Motion';

/**
 * ABOUT §01 · INTRODUCTION. TEXT-LED.
 *
 * The client's review: "This section can lose the animation and become much simpler ...
 * The text content is the HERO in this section." So the claim is set large across the
 * measure, the four sentences that follow read down one offset column with whitespace
 * around them, and three photographs (study, practice, a group) sit beneath in one quiet
 * row. The only motion is a single fade and rise as each block enters.
 *
 * The word "practice" is in every one of the five sentences; it is picked out in forest
 * italic wherever it falls. `keyed()` cuts `about.intro[n]` at the word and the pieces
 * concatenate back to it exactly, so nothing is retyped.
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

        <p className="sx2-claim" data-sx2-r="">
          {lead} <em>{turn}</em> {keyed(tail)}
        </p>

        <div className="sx2-essay">
          {rest.map((line, i) => (
            <p
              className={`sx2-line${i === rest.length - 1 ? ' sx2-line--last' : ''}`}
              key={line}
              data-sx2-r=""
            >
              {keyed(line)}
            </p>
          ))}
        </div>

        <div className="sx2-row" data-sx2-r="">
          {PLATES.map((plate) => (
            <figure className="sx2-tile" key={plate.id}>
              <img
                className="sx2-tile__img"
                src={srcOf(plate)}
                srcSet={srcSetOf(plate)}
                sizes="(min-width: 720px) min(31vw, 520px), (min-width: 480px) 50vw, 100vw"
                alt={plate.alt}
                width={1620}
                height={1080}
                loading="lazy"
                decoding="async"
                style={{ '--sx2-op': plate.pos } as CSSProperties}
              />
            </figure>
          ))}
        </div>
      </div>
      <Sx2Motion />
    </section>
  );
}
