import { within } from '@/content/copy';

/**
 * FOUR ROOMS.
 *
 * Not four sections stacked on a page: four places. Each is a sticky full-viewport stage
 * inside its own scroll track, and each track is pulled up by exactly one viewport height so
 * the next room RISES OVER the one before it while that one is still held still. The reader
 * does not scroll past a section break — a new place covers the old one, edge to edge, with
 * a different ground and a different light. The last thing room N does is get covered.
 *
 * The four lights alternate deliberately: dark hall, bright plaster, dark stage, open paper.
 * Rooms 01 and 03 are enclosed and reversed out; 02 and 04 are lit. Moving between them is a
 * change of light, which is the cheapest and most convincing signal that you have moved.
 *
 * The 5–7 items of each pillar live IN the room as something the room actually contains,
 * never as a bulleted column:
 *
 *   01 CONNECT      five phrase-plates that arrive scattered across the hall and pack into
 *                   one group. "The Yoga teaching profession can sometimes feel isolated"
 *                   is the start state; the community is the end state. The mechanic IS the
 *                   sentence. Reduced motion ships the end state, which is a shape, not a list.
 *
 *   02 LEARN        the seven longest items set at display scale on a paper board standing in
 *                   front of the class — the type IS the graphic, and the board occludes the
 *                   photograph rather than sitting beside it. Seven lines write in one after
 *                   another as you descend, because "continue studying" is accumulation.
 *
 *   03 COLLABORATE  seven placards hung on wires above the panel, at seven different drops.
 *                   Collaboration is the things people make together, hung on the wall behind
 *                   the people who made them. The lowest placards overlap the photograph.
 *
 *   04 SHARE        six steps that walk across the floor toward a doorway, each reaching a
 *                   little further than the last. Sharing is a hand-off; reading down the
 *                   list moves you across the room and out of it.
 *
 * Every animated property is transform or opacity. Every room's static state is complete.
 */

const [CONNECT, LEARN, COLLABORATE, SHARE] = within.pillars;

/** Provenance, not a claim: `ss-` frames are the Samskrithi Sadhana collection. The `p13`
 *  set has no venue recorded in public/media/stills.json, so room 01 carries no caption. */
const SS = 'Samskrithi Sadhana · Bengaluru';

function Ord({ index, name, id }: { index: string; name: string; id: string }) {
  return (
    <div className="within-a__head">
      <p className="within-a__ord">{index}</p>
      <h2 className="within-a__name" id={id}>
        {name}
      </h2>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════════════════
   01 · CONNECT — the hall, and five things standing apart in it.
   ═══════════════════════════════════════════════════════════════════════════════════ */

/** Where each plate starts before the room gathers it in. Read as: five people who came
 *  from five different places. Clipped by the stage, so no overflow escapes. */
const SCATTER = [
  { x: '-30vw', y: '-16svh' },
  { x: '26vw', y: '-22svh' },
  { x: '-24vw', y: '20svh' },
  { x: '30vw', y: '14svh' },
  { x: '2vw', y: '28svh' },
];

function RoomConnect() {
  const p = CONNECT!;
  return (
    <section
      className="within-a__track within-a__track--1"
      id="within-a-connect"
      aria-labelledby="within-a-connect-h"
      data-track
    >
      <div className="within-a__stage within-a__stage--dark">
        <div className="within-a__ground" data-par="7">
          <img
            className="within-a__ground-img"
            src="/media/stills/p13-img_0516-1920.webp"
            srcSet="/media/stills/p13-img_0516-960.webp 960w, /media/stills/p13-img_0516-1920.webp 1920w, /media/stills/p13-img_0516-2560.webp 2560w"
            sizes="100vw"
            loading="lazy"
            decoding="async"
            alt="A studio class standing apart on their own mats with arms stretched overhead, one participant close to the camera with his back to the room."
          />
        </div>
        <div className="within-a__scrim within-a__scrim--1" aria-hidden="true" />

        <div className="within-a__in within-a__in--1">
          <div className="within-a__say" data-wa="up">
            <Ord index={p.index} name={p.name} id="within-a-connect-h" />
            {p.lines.map((l) => (
              <p className="within-a__line" key={l}>
                {l}
              </p>
            ))}
            {p.listLead ? <p className="within-a__cue">{p.listLead}</p> : null}
          </div>

          <ul className="within-a__cluster" data-wa-group>
            {p.items.map((item, i) => (
              <li
                className="within-a__node"
                key={item}
                data-wa="gather"
                style={
                  {
                    '--sx': SCATTER[i]?.x ?? '0vw',
                    '--sy': SCATTER[i]?.y ?? '0svh',
                    '--d': `${i * 70}ms`,
                  } as React.CSSProperties
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════════════════════
   02 · LEARN — the board at the front of the room, and the class in front of it.
   ═══════════════════════════════════════════════════════════════════════════════════ */

function RoomLearn() {
  const p = LEARN!;
  return (
    <section
      className="within-a__track within-a__track--2"
      id="within-a-learn"
      aria-labelledby="within-a-learn-h"
      data-track
    >
      <div className="within-a__stage within-a__stage--warm">
        <div className="within-a__in within-a__in--2">
          <div className="within-a__say within-a__say--2" data-wa="up">
            <Ord index={p.index} name={p.name} id="within-a-learn-h" />
            {p.lines.map((l) => (
              <p className="within-a__line" key={l}>
                {l}
              </p>
            ))}
            {p.listLead ? <p className="within-a__cue">{p.listLead}</p> : null}
          </div>

          {/* The board. Paper, standing in the room, overlapping the class below it — the
              type is the graphic and the photograph is what it is standing in front of. */}
          <ol className="within-a__slate" data-wa-group>
            {p.items.map((item, i) => (
              <li
                className="within-a__chalk"
                key={item}
                data-wa="write"
                style={{ '--d': `${140 + i * 80}ms` } as React.CSSProperties}
              >
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* the class, full-bleed along the floor of the room */}
        <div className="within-a__floor" data-par="9">
          <img
            className="within-a__floor-img"
            src="/media/stills/ss-dsc07137-1920.webp"
            srcSet="/media/stills/ss-dsc07137-960.webp 960w, /media/stills/ss-dsc07137-1920.webp 1920w"
            sizes="100vw"
            loading="lazy"
            decoding="async"
            alt="A barefoot teacher in a light blue kurta sitting on a stool and talking, with listeners seated on the floor around him."
          />
        </div>
        <p className="within-a__cap within-a__cap--dark within-a__cap--plate">{SS}</p>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════════════════════
   03 · COLLABORATE — the panel, and the things hung on the wall above it.
   ═══════════════════════════════════════════════════════════════════════════════════ */

/** Seven wires of seven lengths, generally lengthening toward the stage: a hang steps
 *  down across a wall, it does not sit on a level. */
const DROPS = [0.05, 0.3, 0.16, 0.48, 0.63, 0.85, 1];

function RoomCollaborate() {
  const p = COLLABORATE!;
  return (
    <section
      className="within-a__track within-a__track--3"
      id="within-a-collaborate"
      aria-labelledby="within-a-collaborate-h"
      data-track
    >
      <div className="within-a__stage within-a__stage--deep">
        <div className="within-a__in within-a__in--3">
          {/* the stage, in the middle band of the room, bleeding off the right wall */}
          <div className="within-a__panel-fig" data-par="8">
            <img
              src="/media/stills/ss-dsc07143-1920.webp"
              srcSet="/media/stills/ss-dsc07143-960.webp 960w, /media/stills/ss-dsc07143-1920.webp 1920w"
              sizes="(max-width: 900px) 100vw, 78vw"
              loading="lazy"
              decoding="async"
              alt="Four panellists on wooden chairs on a green-painted stage beside a small table with a plant, in front of a white wall carrying a painted tree, a circular emblem and a colour-wheel chart."
            />
          </div>

          {/* seven wires from the ceiling, stepping down toward the stage. The deepest
              placards hang IN FRONT of the photograph — the layering is the point. */}
          <ul className="within-a__hang" data-wa-group>
            {p.items.map((item, i) => (
              <li
                className="within-a__hang-i"
                key={item}
                style={{ '--drop': DROPS[i] ?? 0.5, '--d': `${i * 65}ms` } as React.CSSProperties}
              >
                <span className="within-a__wire" aria-hidden="true" data-wa="wire" />
                <span className="within-a__card" data-wa="drop">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="within-a__say within-a__say--3" data-wa="up">
            <Ord index={p.index} name={p.name} id="within-a-collaborate-h" />
            {p.lines.map((l) => (
              <p className="within-a__line" key={l}>
                {l}
              </p>
            ))}
            {p.listLead ? <p className="within-a__cue">{p.listLead}</p> : null}
          </div>

          <p className="within-a__cap within-a__cap--dark">{SS}</p>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════════════════════════════
   04 · SHARE — the floor, six steps across it, and the way out.
   ═══════════════════════════════════════════════════════════════════════════════════ */

function RoomShare() {
  const p = SHARE!;
  return (
    <section
      className="within-a__track within-a__track--4"
      id="within-a-share"
      aria-labelledby="within-a-share-h"
      data-track
    >
      <div className="within-a__stage within-a__stage--paper">
        {/* the doorway: a portrait frame masked to an arch and bled off the bottom edge, so
            it is a way out of the room rather than a picture printed on the page */}
        <div className="within-a__arch" data-par="5">
          <img
            src="/media/stills/ss-dsc07118-1920.webp"
            srcSet="/media/stills/ss-dsc07118-960.webp 960w, /media/stills/ss-dsc07118-1920.webp 1920w"
            sizes="(max-width: 900px) 88vw, 42vw"
            loading="lazy"
            decoding="async"
            alt="A teacher leaning over a student, holding a hand just above the student's back to correct the line of a plank position."
          />
        </div>

        <div className="within-a__in within-a__in--4">
          <div className="within-a__say within-a__say--4" data-wa="up">
            <Ord index={p.index} name={p.name} id="within-a-share-h" />
            {p.lines.map((l) => (
              <p className="within-a__line" key={l}>
                {l}
              </p>
            ))}
            {p.listLead ? <p className="within-a__cue">{p.listLead}</p> : null}
          </div>

          <ol className="within-a__stair" data-wa-group>
            {p.items.map((item, i) => (
              <li
                className="within-a__step"
                key={item}
                data-wa="reach"
                style={{ '--i': i, '--d': `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="within-a__reach" aria-hidden="true" />
                <span className="within-a__step-t">{item}</span>
              </li>
            ))}
          </ol>

          <p className="within-a__closing" data-wa="up">
            {p.closing}
          </p>
          <p className="within-a__cap">{SS}</p>
        </div>
      </div>
    </section>
  );
}

export function Rooms() {
  return (
    <>
      <RoomConnect />
      <RoomLearn />
      <RoomCollaborate />
      <RoomShare />
    </>
  );
}
