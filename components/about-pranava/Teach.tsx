import { about } from '@/content/pranava';
import { Eyebrow } from './parts';

/**
 * 04 · HOW WE TEACH — a flight of stairs drawn in clay, one practice per tread.
 *
 * Eight items is a list, and a bulleted list on paper is exactly how the previous build of
 * this site failed. Each item here carries one left border and one bottom border — a riser
 * and a tread — and each is indented one step further than the last, so the eight of them
 * draw a real staircase walking down and to the right. The client's closing sentence is
 * set at the foot of the last riser: it is the landing the stairs arrive at, and it is the
 * only sentence in the section at reading width.
 *
 * `--apr-step` is a clamp, so the flight compresses on a phone instead of pushing the last
 * tread off the side of the page.
 */
export function Teach() {
  return (
    <section className="apr-s apr-s--warm apr-teach" id="apr-teach">
      <div className="apr-rail">
        <Eyebrow n="04">How we teach</Eyebrow>
        <p className="apr-display apr-teach__lead" data-ap="up">
          {about.teach.lead}
        </p>
        <p className="apr-teach__open" data-ap="up">
          {about.teach.open}
        </p>
        <p className="apr-teach__prompt" data-ap="up">
          {about.teach.prompt}
        </p>

        <ol className="apr-teach__stair">
          {about.teach.practices.map((p, i) => (
            <li
              className="apr-teach__step"
              key={p}
              data-ap="up"
              style={{ ['--i' as string]: i, ['--apr-d' as string]: `${i * 55}ms` }}
            >
              <span className="apr-teach__n" aria-hidden="true">{`0${i + 1}`}</span>
              <span className="apr-teach__w">{p}</span>
            </li>
          ))}
        </ol>

        <p className="apr-teach__close" data-ap="up">
          {about.teach.close}
        </p>
      </div>
    </section>
  );
}
