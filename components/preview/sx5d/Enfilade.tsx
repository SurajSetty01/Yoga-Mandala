import Link from 'next/link';
import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { ROOMS, nest, stillSet, stillSrc } from './rooms';

/**
 * 05 · THE PRAṆAVA JOURNEY — an enfilade you walk through.
 *
 * WHAT HAPPENS. Four rooms, each seen through the far doorway of the one before: Learn's
 * room has an opening in its far wall, and through it is Practice's room, where someone is
 * moving; through Practice's far wall is Heal; through Heal's, a speck of daylight that is
 * Insights. Scrolling walks you through the doorways one at a time. The room you leave
 * grows past you and darkens into the doorframe you are standing in; the next room arrives
 * at full size; the next door's name hangs beside its opening like a sign. The walk ends
 * outside, under trees.
 *
 * THE STILL VERSION IS THE SAME IDEA, NOT A FALLBACK. With no JavaScript, or under
 * prefers-reduced-motion, the section is the view from the first threshold: all four rooms
 * nested one through the next at once, and the four doors listed beside them. Every name,
 * sentence, photograph and link is in this server-rendered HTML; the client island only
 * moves the camera.
 *
 * STRUCTURE. The four rooms are siblings, not nested elements. Each is the same 4:5 box,
 * placed by `translate(x%, y%) scale(s)` from its origin at 0 0, where (x, y, s) is its
 * position in the first room's coordinates (see rooms.ts). Because every box is the same
 * size, those percentages are exact at every viewport with nothing measured — and the
 * client island only has to change three numbers per room.
 */
const PLACED = nest();

export function Enfilade() {
  const doors = about.journey;
  return (
    <section className="sx5d-journey" id="sx5d-journey" data-sx5d aria-labelledby="sx5d-title">
      <div className="sx5d-track">
        <div className="sx5d-stage">
          <div className="sx5d-frame">
            {/* the slot is the space the view may take; while the walk runs it is a size
                container, so the view fills whatever the words leave — measured by the
                browser at every viewport, never guessed */}
            <div className="sx5d-slot">
            <div className="sx5d-view">
              {/* the doorway the reader stands in: one crisp frame that never scales,
                  which every room settles into as it becomes the room you are in */}
              <span className="sx5d-view__frame" aria-hidden="true" />
              {ROOMS.map((room, k) => {
                const at = PLACED[k] ?? { x: 0, y: 0, s: 1 };
                const next = doors[k + 1];
                return (
                  <div
                    className={`sx5d-room sx5d-room--${room.key}`}
                    key={room.id}
                    data-room={k}
                    style={{ '--x': at.x, '--y': at.y, '--s': at.s } as CSSProperties}
                  >
                    {room.kind === 'still' ? (
                      <img
                        className="sx5d-room__img"
                        src={stillSrc(room, 1920)}
                        srcSet={stillSet(room)}
                        sizes="(min-width: 900px) and (min-aspect-ratio: 1/1) 42vw, 92vw"
                        alt={room.alt}
                        loading={k === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        style={{ objectPosition: room.pos }}
                      />
                    ) : (
                      <>
                        {/* The <img> IS the poster: the video below carries no `poster`
                            attribute, because a poster is fetched even when `src` is never
                            set. Under reduced motion or with no JavaScript this still is
                            all that loads. */}
                        <picture>
                          <source type="image/avif" srcSet={`/media/posters/${room.id}.avif`} />
                          <img
                            className="sx5d-room__img"
                            src={`/media/posters/${room.id}.jpg`}
                            width={1080}
                            height={1920}
                            alt={room.alt}
                            loading="lazy"
                            decoding="async"
                            style={{ objectPosition: room.pos }}
                          />
                        </picture>
                        <video
                          className="sx5d-room__vid"
                          data-src={`/media/clips/${room.id}.mp4`}
                          muted
                          playsInline
                          loop
                          preload="none"
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ objectPosition: room.pos }}
                        />
                      </>
                    )}

                    {/* the reveal of the doorway this room is seen through: shadow on the
                        two inner faces a viewer below and to the left of it can see */}
                    {k > 0 && <span className="sx5d-room__jamb" aria-hidden="true" />}
                    <span className="sx5d-room__dim" aria-hidden="true" />
                    {/* the rim: once a room is behind you, its edges dissolve into the
                        ground, so the room you walked out of surrounds the doorway instead
                        of standing behind it as a dark card with four hard edges */}
                    {room.opening && <span className="sx5d-room__rim" aria-hidden="true" />}

                    {room.opening && next && (
                      <>
                        <span
                          className="sx5d-room__door"
                          aria-hidden="true"
                          style={
                            {
                              '--ox': room.opening.x,
                              '--oy': room.opening.y,
                              '--or': room.opening.r,
                            } as CSSProperties
                          }
                        />
                        <span
                          className="sx5d-room__plaque"
                          aria-hidden="true"
                          style={
                            {
                              '--ox': room.opening.x,
                              '--oy': room.opening.y,
                              '--or': room.opening.r,
                            } as CSSProperties
                          }
                        >
                          <span className="sx5d-room__plaque-n">{`0${k + 2}`}</span>
                          <span className="sx5d-room__plaque-name">{next.name}</span>
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            </div>

            <div className="sx5d-text">
              <h2 className="sx5d-eyebrow" id="sx5d-title">
                <span className="sx5d-eyebrow__n">05</span>
                <span className="sx5d-eyebrow__rule" aria-hidden="true" />
                The Praṇava journey
              </h2>

              <ol className="sx5d-doors">
                {doors.map((d, i) => (
                  <li className="sx5d-door" key={d.name} data-door={i}>
                    <Link className="sx5d-door__link" href={d.href}>
                      <span className="sx5d-door__n" aria-hidden="true">{`0${i + 1}`}</span>
                      <div className="sx5d-door__head">
                        <h3 className="sx5d-door__name">{d.name}</h3>
                        <span className="sx5d-door__go" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                            <path
                              d="M4 12h15M13 6l6 6-6 6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <span className="sx5d-door__body">{d.body}</span>
                    </Link>
                  </li>
                ))}
              </ol>

              {/* where you are in the suite — drawn only while the walk is running */}
              <div className="sx5d-where" aria-hidden="true">
                {doors.map((d, i) => (
                  <span className="sx5d-where__i" key={d.name} data-where={i}>
                    {`0${i + 1}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
