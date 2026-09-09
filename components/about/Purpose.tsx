import { about } from '@/content/copy';

/**
 * 04 — OUR PURPOSE, as a mandala.
 *
 * Four things arranged around a centre is what this community is called, so the four are laid
 * out as quadrants: the rules break in the middle, the client's lead sentence sits in the
 * break, and each quadrant's type is pushed away from the centre so the void reads as a ring.
 *
 * It has to be unmistakably NOT two other things:
 *   · section 02, directly above, is already four names in a row above four narrow stills;
 *   · page 2's four pillars are a numbered 01–04 register with lists under each.
 * So this set is unnumbered, radial, reversed out on the deep ground, and its names are set
 * in Fraunces ROMAN at 2.35rem where section 02's are Fraunces italic at 1.6rem. Same family,
 * nothing else shared.
 *
 * The names are `Connect · Learn · Collaborate · Grow` — the About page's tagline. Page 2
 * ends on Share. They are two different lists and both are the client's.
 *
 * Headings rather than a list, deliberately: `display: contents` on a <ul> drops list
 * semantics in some screen readers, and h3 + p is the honest shape for a named block anyway.
 */
export function Purpose() {
  return (
    <section className="ab ab--deep ab-purpose">
      <div className="ab__inner">
        <h2 className="ab-eyebrow">
          <span>04</span>
          {about.purpose.heading}
        </h2>

        <div className="ab-mandala">
          <p className="ab-mandala__lead">{about.purpose.lead}</p>

          {about.purpose.items.map((item, i) => (
            <div
              className={`ab-q ab-q--${i + 1}`}
              key={item.name}
              data-r="up"
              style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
            >
              <h3>{item.name}</h3>
              <p>{item.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
