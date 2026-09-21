import Link from 'next/link';
import { about } from '@/content/pranava';
import { site } from '@/content/site';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 08 · PRAṆAVA & SEVA — six lines gathered under one bracket, and one door beneath it.
 *
 * The client's structure is a containment: the Trust does six kinds of work, and Yoga
 * Mandala is "one such community initiative under Praṇava Seva Trust". The section is drawn
 * as that sentence rather than described by it — a real bracket closes over the six areas,
 * a stem drops out of the middle of the bracket, and the one initiative this site can
 * actually open hangs off the bottom of the stem as a plate with a photograph and a link.
 *
 * The brief is explicit that Yoga Mandala must be presented as a community initiative under
 * the Trust and not as a Praṇava course, so it is literally underneath the Trust's bracket
 * and nowhere else on this page.
 */
export function Seva() {
  return (
    <section className="apr-s apr-s--warm apr-seva" id="apr-seva">
      <div className="apr-rail">
        <Eyebrow n="08">{site.trust}</Eyebrow>
        <p className="apr-display apr-lead" data-ap="up">
          {about.seva.lead}
        </p>

        <div className="apr-seva__body" data-ap="up">
          {about.seva.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <p className="apr-seva__prompt" data-ap="up">
          {about.seva.prompt}
        </p>

        <div className="apr-seva__gather">
          <ul className="apr-seva__set">
            {about.seva.initiatives.map((n, i) => (
              <li key={n} data-ap="up" style={{ ['--apr-d' as string]: `${i * 60}ms` }}>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="apr-seva__stem" aria-hidden="true" />

        <div className="apr-seva__plate" data-ap="up">
          <figure className="apr-seva__plateFig">
            <Shot frame={FRAMES.mandalaHall} sizes="(max-width: 899px) 100vw, 28rem" />
          </figure>
          <div>
            <p>{about.seva.mandala}</p>
            <Link className="apr-seva__go" href="/yoga-mandala/">
              Yoga Mandala
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
