import type { CSSProperties } from 'react';
import { about } from '@/content/copy';
import { Print } from './Print';
import type { FrameKey } from './frames';

/**
 * 04 — OUR PURPOSE.   *Four plates, dealt left to right, each laid over the last.*
 *
 * The client's chosen concept, carried over from `/preview/about-c/` with its selectors
 * re-namespaced and nothing else changed.
 *
 * Each of the four is a mounted print: the photograph inset in a cream board, the word and
 * the client's line printed on the board's bottom margin — never on the picture. That is the
 * idea's own rule, and it is also why every label here measures the same at every viewport:
 * the ground under the type is a constant, not whatever the crop contains.
 *
 * The hand overlaps rightward by about a quarter of a plate, so each plate covers the RIGHT
 * edge of the one before and leaves its label, set flush left on the mount, completely clear.
 * Connect is the most covered; Grow is the only one you see whole. That is the argument:
 * Grow rests on the other three, and the client's tagline ends on Grow.
 *
 * Four rooms, four situations: standing together, a hands-on correction, three people working
 * on one adjustment, and a whole hall with its arms up.
 */

type P = CSSProperties & Record<string, string | number>;

const PLATES: { frame: FrameKey; s: P }[] = [
  { frame: 'three', s: { '--rot': '-1.9deg', '--dy': '2.4rem', '--gx': '-26%', '--d': '0ms' } },
  { frame: 'inversion', s: { '--rot': '1.4deg', '--dy': '0rem', '--gx': '-22%', '--d': '110ms' } },
  { frame: 'shoulder', s: { '--rot': '-1.1deg', '--dy': '3.4rem', '--gx': '-18%', '--d': '220ms' } },
  { frame: 'raised', s: { '--rot': '2.1deg', '--dy': '0.7rem', '--gx': '-14%', '--d': '330ms' } },
];

export function Purpose() {
  return (
    <section className="ab-sec ab-purp" aria-labelledby="ab-purp-h">
      <div className="ab-rail">
        <h2 className="ab-eyebrow" id="ab-purp-h">
          <span className="ab-eyebrow__n">04</span>
          {about.purpose.heading}
        </h2>
        <p className="ab-purp__lead" data-r="up">
          {about.purpose.lead}
        </p>
      </div>

      <div className="ab-wide">
        {/*
          The deal rides the site's own reveal primitive: hero-choreography observes every
          [data-r] on the page and adds `.in`. The start states below are scoped to `.js`, so
          with JavaScript off the hand is simply already dealt, and globals.css forces every
          [data-r] complete under prefers-reduced-motion.
        */}
        <div className="ab-hand" data-r="deal">
          {about.purpose.items.map((item, i) => (
            <article
              className="ab-plate"
              key={item.name}
              style={{ ...PLATES[i]!.s, '--z': i + 1, '--mz': 4 - i } as CSSProperties}
            >
              <Print
                frame={PLATES[i]!.frame}
                ratio="4 / 3"
                className="ab-plate__win"
                sizes="(max-width: 900px) 86vw, 30vw"
              />
              <div className="ab-plate__mount">
                <h3 className="ab-plate__name">{item.name}</h3>
                <p className="ab-plate__line">{item.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
