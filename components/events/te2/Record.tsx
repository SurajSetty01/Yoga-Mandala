import type { CSSProperties } from 'react';
import { BLANK, PRINTS, src, srcSet } from './frames';
import { Te2Motion } from './Te2Motion';

/**
 * EVENTS 01 · WHAT HAS HAPPENED HERE — a pile of prints, gone through by hand.
 *
 * WHAT HAPPENS. Six large prints lie in one pile on the deep ground, their edges showing
 * where they do not quite line up. As the reader scrolls, the stage holds still and the top
 * print lifts off, swings across and settles on a second, smaller pile at the side, exposing
 * the next. Under the sixth lies a card of the same paper with nothing printed on it:
 * "Nothing scheduled". Ordinary vertical scrolling reaches it, so everyone reaches it.
 *
 * WHY A PILE. The record is something you go through, one print at a time, and the blank
 * card is reached rather than left off-screen. The empty state is inside the object.
 *
 * NO SCRIPT, OR REDUCED MOTION, OR A SHORT WINDOW: the same prints lie spread loose across
 * the table, slightly askew and overlapping at the edges, the blank card last. Every
 * photograph and every caption is there; nothing is reachable only through motion.
 *
 * The DOM order is the reading order (top print first, the card last) in both layouts.
 */
type Vars = CSSProperties & Record<`--${string}`, string>;

export function Te2Record() {
  return (
    <section className="te2" id="events-record" aria-labelledby="te2-h">
      <div className="te2-run">
        <div className="te2-stage">
          <div className="te2-head">
            <h2 className="te2-mark" id="te2-h">
              <span className="te2-mark__n">01</span>
              <span className="te2-mark__rule" aria-hidden="true" />
              What has happened here
            </h2>
            <p className="te2-lead">
              Everything in this pile has already happened. The card at the bottom is blank
              because the next one hasn&rsquo;t.
            </p>
            <p className="te2-hint" aria-hidden="true">
              Scroll, and lift the top print
              <svg width="9" height="22" viewBox="0 0 9 22" focusable="false">
                <path
                  d="M4.5 0v19M1 15.5l3.5 4 3.5-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </p>
          </div>

          {/* where the prints settle once looked at; empty until they arrive */}
          <div className="te2-aside" aria-hidden="true" />

          <ol className="te2-pile">
            {PRINTS.map((p, i) => (
              <li
                className="te2-print"
                key={p.id}
                data-te2-i={i}
                style={
                  {
                    '--r': `${p.r}deg`,
                    '--x': `${p.x}px`,
                    '--y': `${p.y}px`,
                    zIndex: 10 - i,
                  } as Vars
                }
              >
                <figure className="te2-paper">
                  <img
                    className="te2-img"
                    src={src(p)}
                    srcSet={srcSet(p)}
                    sizes="(max-width: 959px) min(calc(100vw - 2.5rem), 640px), min(62vw, 1240px)"
                    alt={p.alt}
                    width={1620}
                    height={1080}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ objectPosition: p.focal }}
                  />
                  <figcaption className="te2-cap">
                    <span className="te2-cap__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="te2-cap__t">{p.caption}</span>
                  </figcaption>
                </figure>
              </li>
            ))}

            <li
              className="te2-print te2-print--blank"
              style={
                {
                  '--r': `${BLANK.r}deg`,
                  '--x': `${BLANK.x}px`,
                  '--y': `${BLANK.y}px`,
                  zIndex: 1,
                } as Vars
              }
            >
              <div className="te2-paper">
                <div className="te2-blank">
                  <p className="te2-blank__p">Nothing scheduled</p>
                </div>
                <p className="te2-cap">
                  <span className="te2-cap__n" aria-hidden="true">
                    07
                  </span>
                  <span className="te2-cap__t">The next one is not here yet</span>
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <p className="te2-prov">
        <span className="te2-prov__k">From Praṇava&rsquo;s own archive</span>
        <span className="te2-prov__v">Prabodha TTC</span>
      </p>

      <Te2Motion />
    </section>
  );
}
