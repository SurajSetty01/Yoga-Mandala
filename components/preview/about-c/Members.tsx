import type { CSSProperties } from 'react';
import { about } from '@/content/copy';
import { Print } from './Print';
import type { FrameKey } from './frames';

/**
 * 06 — A COMMUNITY BUILT BY ITS MEMBERS. *The whole table, dealt flat.*
 *
 * "Yoga Mandala is not meant to be a platform where a few people provide everything for
 * everyone else." So this composition has no biggest picture. Eight prints, none more than a
 * third larger than the smallest, dealt across a dark table at eight different angles, corners
 * overlapping, nothing centred and nothing featured. The unglamorous frames belong here on
 * purpose — a man spreading a blanket over a mat, a room being settled into — beside the panel
 * and the full class. Whoever is holding the room that day.
 *
 * And the client's three lines are dealt into the same pile, as three cream cards rotated like
 * everything else. Type is not the label on this table; it is another object on it. That is
 * the whole difference between this and a caption.
 *
 * THE HANDOFF is a ninth print laid over the seam, half on the paper of 05 and half on this
 * table — the full class, which is the thing the section is about.
 *
 * THE FOURTH LINE IS NOT PRINTED. `about.members.lines[3]` — "Everyone has something to
 * learn. Everyone has something to contribute." — is already the display headline of the
 * approved section 02, twelve hundred pixels up the same page. Printing it twice would spend
 * the page's best sentence twice and flatten both. Nothing is paraphrased and nothing is
 * added; the line simply stays where it already lands hardest.
 */

type P = CSSProperties & Record<string, string | number>;

/** `--a` is `row / col / row-end / col-end` on a 12 × 10 field; `--ma` is the phone's 6-col one. */
const PRINTS: { frame: FrameKey; ratio: string; s: P }[] = [
  { frame: 'studio',     ratio: '4 / 3',  s: { '--a': '1 / 4 / 3 / 7',   '--ma': '1 / 1 / 3 / 5',   '--rot': '-2.3deg', '--gx': '-30%', '--gy': '-40%', '--d': '40ms',  '--z': 3 } },
  { frame: 'whiteboard', ratio: '3 / 4',  s: { '--a': '1 / 7 / 4 / 9',   '--ma': '2 / 4 / 5 / 7',   '--rot': '1.8deg',  '--gx': '20%',  '--gy': '-45%', '--d': '120ms', '--z': 5 } },
  { frame: 'blanket',    ratio: '3 / 4',  s: { '--a': '1 / 10 / 4 / 12', '--ma': '5 / 1 / 8 / 3',   '--rot': '-1.2deg', '--gx': '40%',  '--gy': '-30%', '--d': '190ms', '--z': 4 } },
  { frame: 'kneeling',   ratio: '3 / 4',  s: { '--a': '3 / 1 / 6 / 3',   '--ma': '6 / 3 / 9 / 6',   '--rot': '2.6deg',  '--gx': '-52%', '--gy': '-6%',  '--d': '250ms', '--z': 6 } },
  { frame: 'mic',        ratio: '3 / 2',  s: { '--a': '4 / 8 / 6 / 12',  '--ma': '9 / 2 / 11 / 7',  '--rot': '-1.5deg', '--gx': '34%',  '--gy': '10%',  '--d': '300ms', '--z': 4 } },
  { frame: 'study',      ratio: '3 / 4',  s: { '--a': '5 / 3 / 8 / 5',   '--ma': '11 / 1 / 14 / 4', '--rot': '-2.8deg', '--gx': '-38%', '--gy': '26%',  '--d': '360ms', '--z': 7 } },
  { frame: 'lunge',      ratio: '16 / 9', s: { '--a': '6 / 6 / 8 / 10',  '--ma': '14 / 2 / 16 / 7', '--rot': '1.4deg',  '--gx': '18%',  '--gy': '34%',  '--d': '420ms', '--z': 3 } },
  { frame: 'oneToOne',   ratio: '16 / 9', s: { '--a': '8 / 1 / 10 / 5',  '--ma': '16 / 1 / 18 / 6', '--rot': '2.1deg',  '--gx': '-44%', '--gy': '38%',  '--d': '520ms', '--z': 5 } },
];

const CARDS: P[] = [
  { '--a': '1 / 1 / 3 / 4',   '--ma': '3 / 1 / 4 / 6',   '--rot': '1.6deg',  '--gx': '-20%', '--gy': '-30%', '--d': '80ms',  '--z': 9 },
  { '--a': '4 / 3 / 6 / 8',   '--ma': '8 / 1 / 9 / 6',   '--rot': '-1.3deg', '--gx': '-6%',  '--gy': '18%',  '--d': '330ms', '--z': 10 },
  { '--a': '7 / 8 / 10 / 13', '--ma': '12 / 2 / 13 / 7', '--rot': '1.9deg',  '--gx': '26%',  '--gy': '30%',  '--d': '560ms', '--z': 11 },
];

export function AboutCMembers() {
  const lines = about.members.lines.slice(0, 3);

  return (
    <section className="about-c-sec about-c-members" aria-labelledby="ac-members-h">
      <div className="about-c-rail about-c-members__head" data-c-deal>
        <h2 className="about-c-eyebrow" id="ac-members-h">
          <span className="about-c-eyebrow__n">06</span>
          {about.members.heading}
        </h2>

        {/* laid over the seam: half on the paper of 05, half on this table */}
        <Print
          frame="klass"
          ratio="16 / 9"
          className="about-c-members__cross"
          sizes="(max-width: 760px) 54vw, 26vw"
        />
      </div>

      <div className="about-c-wide">
        <div className="about-c-table" data-c-deal>
          {PRINTS.map((p) => (
            <Print
              key={p.frame}
              frame={p.frame}
              ratio={p.ratio}
              className="about-c-table__p"
              style={p.s}
              sizes="(max-width: 760px) 48vw, 26vw"
            />
          ))}

          {lines.map((line, i) => (
            <p className="about-c-card" key={line} style={CARDS[i] as CSSProperties} data-cd>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
