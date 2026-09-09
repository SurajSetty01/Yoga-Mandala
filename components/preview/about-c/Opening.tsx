import type { CSSProperties } from 'react';
import { about } from '@/content/copy';
import { frames, src } from './frames';
import { Print } from './Print';
import type { FrameKey } from './frames';

/**
 * 03 — WHY WE BEGAN. *One frame is not the tradition.*
 *
 * The section opens on an ENLARGEMENT: a 3.5× crop of a single frame, close enough that you
 * cannot place the room. Then the pile it came out of is dealt around it and down across the
 * table — five more prints, five more rooms, overlapping and occluding each other and running
 * off both edges, because the table is bigger than the screen. That is the middle paragraph
 * made physical: *no single teacher can know everything*, and no single frame is the
 * tradition either.
 *
 * The enlarged frame is deliberately NOT in the pile. It comes back at the bottom of the page
 * — whole, small, squared, with the crop marked on it — as the last object in 07. The page
 * picks a photograph up and puts it back.
 *
 * The crop is placed by arithmetic, not by eye: 350% width inside a 3:4 window, offset so the
 * centre of the window lands on (0.46, 0.655) of the source. The figure that fills it is whole
 * from hands to feet; nobody has been cropped out to make the shape work.
 *
 * THE HANDOFF. One last print is dealt so far it goes over the edge of the table and lands on
 * the paper of section 04. It is a whole class standing with their arms up — the picture of
 * the third paragraph, which is the one about growing past what you began as.
 */

type P = CSSProperties & Record<string, string | number>;

/** `--x/--y/--w` are per cent of the table; `--mx/--my/--mw` are the phone's. */
const PILE: { frame: FrameKey; ratio: string; s: P }[] = [
  {
    frame: 'wall',
    ratio: '16 / 9',
    s: { '--x': '22%', '--y': '-3%', '--w': '27%', '--rot': '-1.1deg', '--gx': '-30%', '--gy': '18%', '--d': '150ms', '--z': 3,
         '--mx': '45%', '--my': '5%', '--mw': '54%' },
  },
  {
    frame: 'balance',
    ratio: '2 / 3',
    s: { '--x': '45%', '--y': '12%', '--w': '14%', '--rot': '1.9deg', '--gx': '-34%', '--gy': '-42%', '--d': '230ms', '--z': 6,
         '--mx': '40%', '--my': '32%', '--mw': '30%' },
  },
  {
    frame: 'charts',
    ratio: '16 / 9',
    s: { '--x': '56%', '--y': '6%', '--w': '46%', '--rot': '1.4deg', '--gx': '-38%', '--gy': '16%', '--d': '310ms', '--z': 4,
         '--mx': '28%', '--my': '62%', '--mw': '74%' },
  },
  {
    frame: 'hall',
    ratio: '9 / 15',
    s: { '--x': '19%', '--y': '26%', '--w': '12%', '--rot': '2.6deg', '--gx': '-62%', '--gy': '-30%', '--d': '90ms', '--z': 5,
         '--mx': '2%', '--my': '53%', '--mw': '29%' },
  },
  {
    frame: 'mural',
    ratio: '9 / 15',
    s: { '--x': '58%', '--y': '40%', '--w': '13%', '--rot': '-2.7deg', '--gx': '-20%', '--gy': '-46%', '--d': '390ms', '--z': 7,
         '--mx': '68%', '--my': '24%', '--mw': '29%' },
  },
];
export function AboutCOpening() {
  const [definition, premise, becoming] = about.opening;
  const room = frames.room;

  return (
    <section className="about-c-sec about-c-open" aria-labelledby="ac-open-h">
      <div className="about-c-rail" data-c-deal>
        <h2 className="about-c-eyebrow" id="ac-open-h">
          <span className="about-c-eyebrow__n">03</span>
          Why we began
        </h2>
        <p className="about-c-open__def">{definition}</p>
      </div>

      {/* THE TABLE. Objects are placed as percentages of a fixed-ratio field, so the whole
          composition scales instead of reflowing, and they are allowed outside it. */}
      <div className="about-c-pile" data-c-deal>
        <div className="about-c-pile__enl" data-cd>
          <div className="about-c-enl">
            <img
              className="about-c-enl__img"
              src={src(room, 2560)}
              alt="A student holding downward dog with one hand reaching towards a block, others folding forward on mats behind."
              decoding="async"
              fetchPriority="high"
            />
          </div>
          {/* the label is printed on the table, never on the picture */}
          <p className="about-c-label">Detail</p>
        </div>

        {PILE.map((p) => (
          <Print
            key={p.frame}
            frame={p.frame}
            ratio={p.ratio}
            className="about-c-pile__p"
            style={p.s}
            sizes="(max-width: 760px) 70vw, 32vw"
          />
        ))}
      </div>

      <div className="about-c-rail about-c-open__foot" data-c-deal>
        <p className="about-c-open__premise" data-cd>
          {premise}
        </p>
        <p className="about-c-open__now" data-cd>
          {becoming}
        </p>

        {/* dealt over the edge of the table, onto the paper of 04. Positioned against the
            section, not the foot — it only lives in this group so it is dealt with it. */}
        <Print
          frame="wider"
          ratio="16 / 10"
          className="about-c-open__cross"
          sizes="(max-width: 760px) 52vw, 21vw"
        />
      </div>
    </section>
  );
}
