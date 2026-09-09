import { about } from '@/content/copy';
import { RoomMotion } from './RoomMotion';

/**
 * CONCEPT A — "THE ROOM".
 *
 * A server component: every word and every photograph is in the static HTML, and the whole
 * traverse reads as a complete page before a line of JavaScript runs. <RoomMotion /> is the
 * single client island, and it only ever writes `transform` and `opacity`.
 *
 * The five rejected sections are one continuous space here, not five panels:
 *
 *   1  you come in        — a lit doorway grows until it is the room you are standing in
 *   2  the length of it   — four things standing at four distances, GROW at the far end
 *   3  the held breath    — the only stretch with no photograph in it at all
 *   4  the room fills     — the same room from three positions at once, arriving together
 *   5  you come out       — cream rises over the room, in normal flow, and you are outside
 *
 * `about.members.lines[3]` is deliberately NOT printed. On the real page it is already the
 * approved section 02's display headline, roughly 1,200px above this; printing the page's
 * best sentence twice spends it twice. Nothing is paraphrased and nothing is added — one
 * line simply lands where it already lands hardest.
 */

/** The p13 set is ONE room photographed from several positions — the wooden floor, the white
 *  walls, the red ceiling slings, the rope wall. That is what makes a traverse possible.
 *  Its venue is not recorded in `public/media/stills.json`, and DESIGN-SYSTEM §4 forbids
 *  inventing one, so these planes carry no provenance caption. */
type PlaneSpec = {
  id: string;
  widths: number[];
  alt: string;
  position: string;
  /** where this plane rests when motion is off — a percentage of the whole traverse */
  at: number;
};

const ROOM: Record<string, PlaneSpec> = {
  door: {
    id: 'p13-img_0615',
    widths: [960, 1920, 2560],
    alt: 'A group seated on mats across a studio floor, facing the front of the room, with a rope wall and windows beyond them.',
    position: '48% 58%',
    at: 2,
  },
  mats: {
    id: 'p13-img_0617',
    widths: [960, 1920, 2560],
    alt: 'The studio from among the mats — participants sitting on coloured mats on a dark wooden floor beneath ceiling slings and fans.',
    position: '54% 56%',
    at: 13,
  },
  room: {
    id: 'p13-img_0614',
    widths: [960, 1920, 2560],
    alt: 'The same studio seen from the back of the room, the whole group seated on mats facing the front beneath the red ceiling slings.',
    position: '46% 56%',
    at: 71,
  },
  work: {
    id: 'p13-img_0513',
    widths: [960, 1920, 2560],
    alt: 'A line of students holding downward dog on mats laid in rows across the studio floor.',
    position: '52% 58%',
    at: 40,
  },
  fgA: {
    id: 'p13-img_0621',
    widths: [960, 1920, 2560],
    alt: 'A participant moving on a mat close to the camera while the class sits facing the front behind her.',
    position: '38% 74%',
    at: 27,
  },
  fgB: {
    id: 'p13-img_0620',
    widths: [960, 1920, 2560],
    alt: 'A participant kneeling on a purple mat in the near foreground of the studio class.',
    position: '46% 76%',
    at: 79,
  },
};

function Plane({
  spec,
  className,
  eager = false,
}: {
  spec: PlaneSpec;
  className: string;
  eager?: boolean;
}) {
  return (
    <figure
      className={className}
      style={{ ['--aa-at' as string]: spec.at }}
    >
      <img
        src={`/media/stills/${spec.id}-${spec.widths[spec.widths.length - 1]}.webp`}
        srcSet={spec.widths.map((w) => `/media/stills/${spec.id}-${w}.webp ${w}w`).join(', ')}
        sizes="100vw"
        alt={spec.alt}
        decoding="async"
        style={{ objectPosition: spec.position }}
        {...(eager ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      />
    </figure>
  );
}

export function Traverse() {
  const { opening, purpose, approach, members, guiding } = about;

  return (
    <section className="about-a" id="aa">
      {/* ── the room, behind the words ─────────────────────────────────── */}
      <div className="aa-far">
        {/* `.aa-space` is the room's own walls: an `overflow: clip` box the size of the
            viewport. Planes are deliberately bled past its edges — a scaled doorway, a
            plane hung off the right — and this is what stops that bleed from becoming
            horizontal page overflow. It clips a CHILD of the sticky element, never the
            sticky element itself, so the pinning is untouched. */}
        <div className="aa-space">
          <Plane spec={ROOM.door!} className="aa-pl aa-pl--door" eager />
          <Plane spec={ROOM.mats!} className="aa-pl aa-pl--mats" />
          <Plane spec={ROOM.room!} className="aa-pl aa-pl--room" />
          <Plane spec={ROOM.work!} className="aa-pl aa-pl--work" />
          <div className="aa-veil" aria-hidden="true" />
          <div className="aa-pool" aria-hidden="true" />
          <div className="aa-glow" aria-hidden="true" />
        </div>
      </div>

      {/* ── THE INTERIOR — everything that happens inside the room.
             The near foreground lives in here with the words it passes in front of, so the
             arrival, which is a LATER sibling, paints over the whole of it. That is a
             structural guarantee rather than a timing one: no foreground plane can ever
             be caught on top of the light at the far end. */}
      <div className="aa-interior">
        <div className="aa-near">
          <div className="aa-space">
            <Plane spec={ROOM.fgA!} className="aa-fg aa-fg--a" />
            <Plane spec={ROOM.fgB!} className="aa-fg aa-fg--b" />
          </div>
        </div>

        <div className="aa-path">
          {/* 1 — YOU COME IN */}
          <div className="aa-stop aa-stop--thr">
            <p className="aa-outside" data-ar="up">
              {opening[0]}
            </p>
            <p className="aa-premise" data-ar="up">
              {opening[1]}
            </p>
            <p className="aa-becoming" data-ar="up">
              {opening[2]}
            </p>
          </div>

          {/* 2 — THE LENGTH OF THE ROOM */}
          <div className="aa-stop aa-stop--pur">
            <h2 className="aa-mark" data-ar="up">
              {purpose.heading}
            </h2>
            <p className="aa-lead" data-ar="up">
              {purpose.lead}
            </p>
            {purpose.items.map((item, i) => (
              <div className={`aa-thing aa-thing--${i + 1}`} key={item.name} data-ar={i === 3 ? 'far' : 'up'}>
                <h3 className="aa-name">{item.name}</h3>
                <p className="aa-line">{item.line}</p>
              </div>
            ))}
          </div>

          {/* 3 — THE HELD BREATH. No photograph. The room shows you nothing. */}
          <div className="aa-stop aa-stop--app">
            <h2 className="aa-mark" data-ar="up">
              {approach.heading}
            </h2>
            <p className="aa-breath aa-breath--1" data-ar="up">
              {approach.lines[0]}
            </p>
            <p className="aa-breath aa-breath--2" data-ar="up">
              {approach.lines[1]}
            </p>
            <p className="aa-breath aa-breath--3" data-ar="up">
              {approach.lines[2]}
            </p>
          </div>

          {/* 4 — THE ROOM FILLS */}
          <div className="aa-stop aa-stop--mem">
            <h2 className="aa-mark" data-ar="up">
              {members.heading}
            </h2>
            <p className="aa-refusal" data-ar="up">
              {members.lines[0]}
            </p>
            <p className="aa-strength" data-ar="up">
              {members.lines[1]}
            </p>
            <p className="aa-rotation" data-ar="up">
              {members.lines[2]}
            </p>
          </div>

        </div>
      </div>

      {/* 5 — YOU COME OUT. The cream is not a section: it is the light at the far end, and
          it rises over the pinned room because it is in normal flow while the room is not.
          No JavaScript is involved in the arrival at all. */}
      <div className="aa-arrival">
        <div className="aa-stop aa-stop--gui">
          <h2 className="aa-mark" data-ar="up">
            {guiding.heading}
          </h2>
          <p className="aa-guiding" data-ar="up">
            {guiding.line}
          </p>
        </div>
      </div>

      <RoomMotion />
    </section>
  );
}
