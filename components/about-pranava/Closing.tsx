import Link from 'next/link';
import { about } from '@/content/pranava';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 10 · BEGIN WHERE YOU ARE — the last line, and two roads leaving it.
 *
 * The page ends on the client's own instruction, set as the largest thing in the section,
 * and the two routes below it are two reversed bands whose photographs pull apart in
 * opposite directions as they arrive — so the last thing the page does is open. Two roads,
 * not three doors of unequal size: that composition already belongs to the Join page, and
 * the client supplied exactly two routes here.
 *
 * Each label stands on the navigation pill's own material — an opaque ground with a cream
 * hairline and a blur — rather than on a gradient. DESIGN-SYSTEM §1: a fixed-geometry
 * gradient cannot guarantee a ratio over an arbitrary crop at an arbitrary viewport, and
 * reusing the pill's material instead of inventing a third surface is cohesion rather than
 * repetition.
 */
const ROUTE_FRAMES = [FRAMES.routeLearn, FRAMES.routePractice];

export function Closing() {
  return (
    <section className="apr-s apr-s--warm apr-close" id="apr-begin">
      <div className="apr-rail">
        <Eyebrow n="10">Begin</Eyebrow>
        <p className="apr-display apr-close__lead" data-ap="up">
          {about.closing.lead}
        </p>
        <p className="apr-close__body" data-ap="up">
          {about.closing.body}
        </p>
        <p className="apr-close__call" data-ap="up">
          {about.closing.call}
        </p>

        <nav className="apr-close__routes" aria-label="Where to go next">
          {about.closing.actions.map((a, i) => (
            <Link
              className="apr-close__route"
              href={a.href}
              key={a.href}
              data-ap="fade"
              style={{ ['--dir' as string]: i === 0 ? -1 : 1, ['--apr-d' as string]: `${i * 110}ms` }}
            >
              <Shot frame={ROUTE_FRAMES[i]!} sizes="(max-width: 719px) 100vw, 50vw" />
              <span className="apr-close__label">{a.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
