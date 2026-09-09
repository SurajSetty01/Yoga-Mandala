import type { CSSProperties } from 'react';
import { about } from '@/content/copy';
import { Print } from './Print';
import type { FrameKey } from './frames';

/**
 * 04 — OUR PURPOSE. *Four plates, dealt left to right, each laid over the last.*
 *
 * Each of the four is a mounted print: the photograph inset in a cream board, and the word
 * and the client's line printed on the board's bottom margin — never on the picture. That is
 * the concept's own rule, and it is also why every label here measures the same at every
 * viewport: the ground under the type is a constant, not whatever the crop contains.
 *
 * The hand overlaps rightward by about a quarter of a plate, so each plate covers the RIGHT
 * edge of the one before and leaves its label — set flush left on the mount — completely
 * clear. Connect is the most covered, Grow is the only one you see whole. That is the
 * argument: Grow rests on the other three.
 *
 * Four rooms, four situations: standing together, a hands-on correction under the charts,
 * three people working on one adjustment, and a whole hall with its arms up. None of them is
 * one of the four frames the approved section 02 already uses.
 *
 * The hand is dealt across the seam: its top edge hangs over the dark table above, so the
 * first plate lands half on one ground and half on the other.
 */

type P = CSSProperties & Record<string, string | number>;

const PLATES: { frame: FrameKey; s: P }[] = [
  { frame: 'three', s: { '--rot': '-1.9deg', '--dy': '2.4rem', '--gx': '-26%', '--d': '0ms' } },
  { frame: 'inversion', s: { '--rot': '1.4deg', '--dy': '0rem', '--gx': '-22%', '--d': '110ms' } },
  { frame: 'shoulder', s: { '--rot': '-1.1deg', '--dy': '3.4rem', '--gx': '-18%', '--d': '220ms' } },
  { frame: 'raised', s: { '--rot': '2.1deg', '--dy': '0.7rem', '--gx': '-14%', '--d': '330ms' } },
];

export function AboutCPurpose() {
  return (
    <section className="about-c-sec about-c-purpose" aria-labelledby="ac-purpose-h">
      <div className="about-c-rail">
        <h2 className="about-c-eyebrow" id="ac-purpose-h">
          <span className="about-c-eyebrow__n">04</span>
          {about.purpose.heading}
        </h2>
        <p className="about-c-purpose__lead">{about.purpose.lead}</p>
      </div>

      <div className="about-c-wide">
        <div className="about-c-hand" data-c-deal>
          {about.purpose.items.map((item, i) => (
            <article
              className="about-c-plate"
              key={item.name}
              style={{ ...PLATES[i]!.s, '--z': i + 1, '--mz': 4 - i } as CSSProperties}
              data-cd
            >
              <Print
                frame={PLATES[i]!.frame}
                ratio="4 / 3"
                className="about-c-plate__win"
                sizes="(max-width: 760px) 86vw, 30vw"
                deal={false}
              />
              <div className="about-c-plate__mount">
                <h3 className="about-c-plate__name">{item.name}</h3>
                <p className="about-c-plate__line">{item.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
