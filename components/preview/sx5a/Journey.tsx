import type { CSSProperties } from 'react';
import Link from 'next/link';
import { about } from '@/content/pranava';
import { CLIP, ENTRANCE, PROVENANCE, ROOMS, still, stillSet, type Box, type Room } from './rooms';

/**
 * 05 · THE PRAṆAVA JOURNEY — concept A, photography leads.
 *
 * WHAT HAPPENS. You walk into four photographs, one inside the next. Each room is a
 * photograph, and hung on a stretch of its bare wall is a mounted print of the NEXT room —
 * a tall slice of it, cropped to the one detail that says what it is. Scrolling carries
 * you in: the room swells past you about the print while the room inside it grows more
 * slowly, as a far wall does when you walk towards it, until you are standing in the
 * picture. Then a print of the next room appears on its wall. The first print hangs on the
 * page itself. The third room hangs no picture: its own glass door stands open and empty,
 * and the terrace is laid into that doorway — outside, nothing on its walls, because the
 * last of the four is the one the client calls "a growing space".
 *
 * WITHOUT MOTION IT IS STILL THE SAME ARGUMENT. Every room is server-rendered with its
 * print already hung and the next room in it, so with no JavaScript, or under
 * prefers-reduced-motion, the section is five photographs stacked down the page, each
 * holding the next — the chain is visible whether or not you can move through it.
 * JourneyMotion only adds the walking.
 *
 * Every word is `about.journey` verbatim; the one line not from the client is the
 * provenance caption, whose basis is in rooms.ts.
 */

const cls = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/* the stage is ~60% of a desktop viewport and all of a phone's; the file that fills it is
   picked on that, and the image in the door ASKS FOR THE SAME FILE, so the moment the door's
   picture becomes the room it is the same decoded bitmap, not a second download */
const SIZES = '(min-width: 900px) min(60vw, 105vh), 100vw';

function boxVars(b: Box, p: string): Record<string, string> {
  return {
    [`--${p}l`]: `${b[0] * 100}%`,
    [`--${p}t`]: `${b[1] * 100}%`,
    [`--${p}w`]: `${(b[2] - b[0]) * 100}%`,
    [`--${p}h`]: `${(b[3] - b[1]) * 100}%`,
  };
}

/** One room's picture: a still, or a clip's first frame with the clip attached later. */
function Picture({ room, alt, inDoor = false }: { room: Room; alt: string; inDoor?: boolean }) {
  const m = room.media;
  if (m.kind === 'still') {
    return (
      <img
        className={inDoor ? 'sx5a-door__img' : 'sx5a-room__img'}
        src={still(m.id, m.widths.includes(960) ? 960 : (m.widths[0] ?? 960))}
        srcSet={stillSet(m.id, m.widths)}
        sizes={SIZES}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  }
  const c = CLIP(m.id);
  return (
    <picture>
      <source srcSet={c.avif} type="image/avif" />
      <img
        className={inDoor ? 'sx5a-door__img' : 'sx5a-room__img'}
        src={c.jpg}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

/** The way into the next room: a mounted print of it hung on this room's wall, or — once —
    the room's own door standing open. `sign` is the name plate on its top edge. */
function Door({
  box,
  next,
  n,
  name,
  kind,
}: {
  box: Box;
  next: Room;
  n: number;
  name: string;
  kind: 'print' | 'open';
}) {
  return (
    <span
      className={`sx5a-door sx5a-door--${kind}`}
      style={boxVars(box, 'd') as CSSProperties}
      aria-hidden="true"
    >
      <span
        className="sx5a-door__view"
        style={{ ['--au' as string]: next.anchor[0], ['--av' as string]: next.anchor[1] } as CSSProperties}
      >
        <Picture room={next} alt="" inDoor />
      </span>
      <span className="sx5a-door__jamb" />
      <span className="sx5a-door__sign">
        <span className="sx5a-door__n">{`0${n}`}</span>
        {name}
      </span>
    </span>
  );
}

export function Journey() {
  const first = ROOMS[0]!;
  return (
    <section className="sx5a" id="sx5a" aria-labelledby="sx5a-title" data-sx5a>
      <div className="sx5a-track">
        {/* ── the entrance: the page is the first wall ─────────────────────────── */}
        <article className="sx5a-step sx5a-step--in" data-step="0">
          <div className="sx5a-copy">
            <div className="sx5a-copy__in">
              <h2 className="sx5a-mark" id="sx5a-title">
                <span className="sx5a-mark__n">05</span>
                <span className="sx5a-mark__rule" aria-hidden="true" />
                The Praṇava journey
              </h2>
              <ol className="sx5a-index">
                {about.journey.map((d, i) => (
                  <li key={d.name}>
                    <a className="sx5a-index__a" href={`#sx5a-${ROOMS[i]?.key ?? ''}`}>
                      <span className="sx5a-index__n">{`0${i + 1}`}</span>
                      {d.name}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <figure className="sx5a-fig sx5a-fig--wall" data-fig="0">
            <span className="sx5a-room sx5a-room--wall">
              <span
                className="sx5a-wallDoors"
                style={
                  {
                    ...boxVars(ENTRANCE.wide, 'w'),
                    ...boxVars(ENTRANCE.narrow, 'n'),
                    ...boxVars(ENTRANCE.narrowLive, 'm'),
                  } as CSSProperties
                }
              >
                <Door box={[0, 0, 1, 1]} next={first} n={1} name={about.journey[0].name} kind="print" />
              </span>
            </span>
          </figure>
        </article>

        {/* ── the four rooms ───────────────────────────────────────────────────── */}
        {ROOMS.map((room, i) => {
          const d = about.journey[i];
          const next = ROOMS[i + 1];
          const nextDoor = about.journey[i + 1];
          if (!d) return null;
          const isClip = room.media.kind === 'clip';
          return (
            <article
              className={cls('sx5a-step', i === ROOMS.length - 1 && 'sx5a-step--last')}
              data-step={i + 1}
              key={room.key}
            >
              <div className="sx5a-copy">
                <div className="sx5a-copy__in sx5a-plate" id={`sx5a-${room.key}`}>
                  <p className="sx5a-plate__n" aria-hidden="true">
                    <span>{`0${i + 1}`}</span>
                    <span className="sx5a-plate__rule" />
                  </p>
                  <h3 className="sx5a-plate__name">
                    <Link className="sx5a-plate__a" href={d.href}>
                      {d.name}
                      <span className="sx5a-plate__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </h3>
                  <p className="sx5a-plate__body">{d.body}</p>
                  {!next && <p className="sx5a-cap">{PROVENANCE}</p>}
                </div>
              </div>
              <figure className="sx5a-fig" data-fig={i + 1}>
                <span
                  className="sx5a-room"
                  style={
                    {
                      '--ar': room.ar,
                      '--px': room.pos[0],
                      '--py': room.pos[1],
                      '--pxn': room.posN[0],
                      '--pyn': room.posN[1],
                    } as CSSProperties
                  }
                >
                  <Picture room={room} alt={room.alt} />
                  {isClip && (
                    <video
                      className="sx5a-room__video"
                      data-clip={CLIP(room.media.id).mp4}
                      muted
                      playsInline
                      loop
                      preload="none"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  )}
                  {next && nextDoor && room.door && (
                    <Door
                      box={room.door}
                      next={next}
                      n={i + 2}
                      name={nextDoor.name}
                      kind={room.doorKind ?? 'print'}
                    />
                  )}
                </span>
              </figure>
            </article>
          );
        })}
      </div>
    </section>
  );
}
