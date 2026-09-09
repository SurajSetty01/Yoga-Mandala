import type { CSSProperties } from 'react';
import { about } from '@/content/copy';
import { frames, src, avif } from './frames';
import type { FrameKey } from './frames';

/**
 * 05 — OUR APPROACH. *One picture cut from four.*
 *
 * "Yoga Mandala is not intended to represent one particular school, lineage, organisation or
 * methodology." So the picture underneath that sentence is not one picture. It is four
 * strips, from four rooms, butted together with the paper showing between them: a rope-wall
 * shala, a courtyard correction, a bare foot on concrete, an orange mat in the foreground.
 * Different floors, different light, different distances — and the strips are cut to
 * different lengths and hung at different heights, so the band's top and bottom edges are
 * ragged and the horizons deliberately refuse to line up.
 *
 * As the band crosses the viewport each strip travels at its own rate (±20px, transform
 * only), so the seams slide against one another. That is the only scroll-linked motion on
 * the page and it exists for one reason: to prove the four are separate pieces of material,
 * not one photograph with lines drawn on it. With reduced motion the listener is never
 * attached and the strips stay where they were cut.
 *
 * The claim is set above the band; the correction — "It is a community for the wider Yoga
 * teaching ecosystem" — directly beneath it, so you read it having just seen four rooms.
 */

type P = CSSProperties & Record<string, string | number>;

const STRIPS: { frame: FrameKey; s: P }[] = [
  { frame: 'seated', s: { '--fx': '1.18', '--h': '100%', '--al': 'flex-start', '--k': '18' } },
  { frame: 'adjust', s: { '--fx': '0.86', '--h': '84%', '--al': 'flex-end', '--k': '-13' } },
  { frame: 'foot', s: { '--fx': '1.02', '--h': '93%', '--al': 'flex-start', '--k': '9' } },
  { frame: 'orange', s: { '--fx': '1.32', '--h': '79%', '--al': 'center', '--k': '-20' } },
];

export function AboutCApproach() {
  const [claim, correction, invitation] = about.approach.lines;

  return (
    <section className="about-c-sec about-c-approach" aria-labelledby="ac-approach-h">
      <div className="about-c-rail" data-c-deal>
        <h2 className="about-c-eyebrow" id="ac-approach-h">
          <span className="about-c-eyebrow__n">05</span>
          {about.approach.heading}
        </h2>
        <p className="about-c-approach__claim" data-cd>
          {claim}
        </p>
      </div>

      <div className="about-c-splice" data-c-deal data-c-splice>
        {STRIPS.map(({ frame, s }) => {
          const f = frames[frame];
          const a = avif(f);
          return (
            <figure className="about-c-strip" key={frame} style={s as CSSProperties}>
              <picture>
                {a ? <source type="image/avif" srcSet={a} /> : null}
                <img
                  src={src(f, 960)}
                  alt={f.alt}
                  style={{ objectPosition: f.pos }}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          );
        })}
      </div>

      <div className="about-c-rail about-c-approach__foot" data-c-deal>
        <p className="about-c-approach__correct" data-cd>
          {correction}
        </p>
        <p className="about-c-approach__invite">{invitation}</p>
      </div>
    </section>
  );
}
