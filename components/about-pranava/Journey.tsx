import Link from 'next/link';
import { about } from '@/content/pranava';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 05 · THE PRAṆAVA JOURNEY — a wheel of four doors; the lit quarter turns as you scroll.
 *
 * Four equal things around one centre, which wants to be a disc and not a row of cards.
 * Each quadrant is a quarter of its own photograph: the sector carries the 90° rotation
 * AND the clip, and the picture inside it carries the equal and opposite rotation, so the
 * wedge turns while every room stays the right way up. A clay arc sweeps three quarters of
 * a turn as the four doors scroll past, and the quarter belonging to the door nearest the
 * middle of the screen is the one left undimmed.
 *
 * NOTHING HERE IS REACHABLE ONLY THROUGH MOTION. The four names, the four sentences and the
 * four links are in the static HTML; with no JavaScript, or under reduced motion, the wheel
 * simply sits still with all four quarters lit.
 *
 * The four hrefs are the client's own, and all four routes exist in this app.
 */
const QUADRANTS = [FRAMES.doorLearn, FRAMES.doorPractice, FRAMES.doorHeal, FRAMES.doorInsights];

export function Journey() {
  return (
    <section className="apr-s apr-s--deep apr-dial" id="apr-journey">
      <div className="apr-rail">
        <Eyebrow n="05" dark>
          The Praṇava journey
        </Eyebrow>

        <div className="apr-dial__stage">
          <div className="apr-dial__disc" data-ap="fade">
            <div className="apr-dial__wheel" aria-hidden="true">
              {QUADRANTS.map((f, i) => (
                <span
                  className="apr-dial__q"
                  key={f.id}
                  data-q={i}
                  style={{ ['--q' as string]: i }}
                >
                  <Shot
                    frame={f}
                    alt=""
                    sizes="(max-width: 1023px) 22rem, (max-width: 1600px) 32rem, 32rem"
                  />
                </span>
              ))}
              <span className="apr-dial__spokes" />
            </div>
            <span className="apr-dial__arc" aria-hidden="true" />
            <span className="apr-dial__hub" aria-hidden="true" />
          </div>

          <ol className="apr-dial__doors">
            {about.journey.map((d, i) => (
              <li
                className="apr-dial__door"
                key={d.name}
                data-ap="up"
                style={{ ['--apr-d' as string]: `${i * 80}ms` }}
              >
                <Link className="apr-dial__link" href={d.href}>
                  <span className="apr-dial__n" aria-hidden="true">{`0${i + 1}`}</span>
                  <h3 className="apr-dial__name">{d.name}</h3>
                  <span className="apr-dial__b">{d.body}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
