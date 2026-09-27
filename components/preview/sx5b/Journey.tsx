import Link from 'next/link';
import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { ROOMS, restPlacement, srcOf, srcSetOf } from './rooms';

/**
 * §05 · THE PRAṆAVA JOURNEY — four rooms, each one standing in the doorway of the last.
 *
 * WHAT HAPPENS. Every photograph here has a real opening in it — a corridor, an alcove, a
 * door — and in that opening stands the next room. Scrolling walks you into the opening:
 * the room you are in grows past you while the room beyond grows more slowly, as a room
 * seen through a doorway does when you approach it, until the opening is the whole frame
 * and you are in the next room, looking at ITS door. Learn opens onto Practice, Practice
 * onto Heal, Heal onto a balcony — and the balcony has no door, because Insights is where
 * the walk stops.
 *
 * While you stand in a room, the room beyond its opening drifts slowly across it and the
 * room you are in does not — the parallax that tells you the opening is a way through and
 * not a picture on the wall. And the names never fade: all four roll through one window, the
 * room you are leaving rising out of it as the room you are entering rises in, in step with
 * the doorway sweeping past the frame.
 *
 * WITH MOTION OFF, OR NO SCRIPT, the same idea is on the page standing still: four rooms in
 * order, and in each one's doorway the room that follows it. Nothing here is reachable
 * only through motion — every word, every link and every photograph (with a real
 * description) is in this static HTML. `JourneyMotion` is the only client code.
 *
 * TWO RENDERINGS OF ONE NEST, AND EXACTLY ONE IS EVER DISPLAYED:
 *  · `.sx5b-still` inside each door — the static page: room i with room i+1 in its opening.
 *    The copy in the opening has alt="" because it is described in its own door below.
 *  · `.sx5b-aperture` — the moving page: all four rooms nested inside one another, each
 *    with its full description, shown only when the motion script has taken over (and
 *    `display: none` otherwise, so its images are never fetched on a static visit).
 */

/** Every box in the nest is full-size at the origin; custom properties carry the placement. */
type Vars = CSSProperties & Record<`--${string}`, string | number>;

const NEST_SIZES =
  '(orientation: landscape) and (min-width: 900px) calc((100vh - 136px) * 0.75), 92vw';
const STILL_SIZES = '(min-width: 900px) min(36vw, 32rem), 92vw';

function RoomLayers({
  i,
  depth,
  sizes,
  described,
  inner,
}: {
  i: number;
  /** how many openings deep to keep going */
  depth: number;
  sizes: string;
  /** false = this image is a look-through copy described elsewhere */
  described: boolean;
  /** whether the rooms seen through the opening are described here too */
  inner: boolean;
}) {
  const room = ROOMS[i];
  if (!room) return null;
  const next = ROOMS[i + 1];
  const hole = room.hole;
  const rest = next ? restPlacement(next) : null;

  return (
    <>
      <img
        className="sx5b-img"
        data-img={i}
        src={srcOf(room)}
        srcSet={srcSetOf(room)}
        sizes={sizes}
        alt={described ? room.alt : ''}
        loading="lazy"
        decoding="async"
      />
      {hole && next && rest && depth > 0 ? (
        <span
          className="sx5b-portal"
          style={{ '--hx': hole.x, '--hy': hole.y, '--hs': hole.s } as Vars}
        >
          <span
            className="sx5b-room sx5b-room--in"
            data-room={i + 1}
            style={{ '--ox': rest.ox, '--oy': rest.oy, '--k': rest.k } as Vars}
          >
            <RoomLayers i={i + 1} depth={depth - 1} sizes={sizes} described={inner} inner={inner} />
          </span>
          <span className="sx5b-portal__edge" data-edge={i} aria-hidden="true" />
        </span>
      ) : null}
    </>
  );
}

export function Journey() {
  const doors = about.journey;

  return (
    <section className="sx5b" id="sx5b-journey" aria-labelledby="sx5b-title">
      <div className="sx5b-track">
        <div className="sx5b-stage">
          <div className="sx5b-frame">
            <h2 className="sx5b-eyebrow" id="sx5b-title">
              <span className="sx5b-eyebrow__n">05</span>
              <span className="sx5b-eyebrow__rule" aria-hidden="true" />
              The Praṇava journey
            </h2>

            <ol className="sx5b-doors">
              {doors.map((d, i) => (
                <li className="sx5b-door" key={d.name} data-door={i}>
                  <div className="sx5b-door__head">
                    <span className="sx5b-door__n" aria-hidden="true">
                      <span className="sx5b-door__nn">{`0${i + 1}`}</span>
                    </span>
                    <h3 className="sx5b-door__name">
                      <span className="sx5b-door__word">{d.name}</span>
                    </h3>
                  </div>

                  <figure className="sx5b-still">
                    <span className="sx5b-still__frame">
                      <span className="sx5b-room" data-room={i}>
                        <RoomLayers i={i} depth={1} sizes={STILL_SIZES} described inner={false} />
                      </span>
                    </span>
                    {/* Standing still, the nest has to be read rather than walked, so the
                        static page says what is in the opening. The last room has none. */}
                    {ROOMS[i]?.through && doors[i + 1] ? (
                      <figcaption className="sx5b-still__cap">
                        {ROOMS[i]?.through}
                        <span className="sx5b-still__to">
                          {`0${i + 2}`} {doors[i + 1]?.name}
                        </span>
                      </figcaption>
                    ) : null}
                  </figure>

                  <div className="sx5b-door__foot">
                    <p className="sx5b-door__body">{d.body}</p>
                    <Link className="sx5b-door__link" href={d.href}>
                      Enter {d.name}
                      <span className="sx5b-door__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ol>

            {/* The moving page's single aperture: the whole nest, room 0 outermost. */}
            <div className="sx5b-aperture">
              <span className="sx5b-room" data-room={0}>
                <RoomLayers i={0} depth={3} sizes={NEST_SIZES} described inner />
              </span>
            </div>

            {/* How far along the walk you are. Decoration — the four doors are the content. */}
            <div className="sx5b-route" aria-hidden="true">
              <span className="sx5b-route__line">
                <span className="sx5b-route__fill" />
              </span>
              {doors.map((d, i) => (
                <span className="sx5b-route__stop" key={d.name} data-stop={i}>
                  {`0${i + 1}`}
                </span>
              ))}
            </div>

            <p className="sx5b-cap">
              Prabhava, a Hatha-Iyengar immersion · 2–6 October 2023
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
