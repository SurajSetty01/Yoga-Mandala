import { about } from '@/content/copy';
import { Print } from './Print';

/**
 * 07 — OUR GUIDING THOUGHT. *The table is cleared. One print is put back, square.*
 *
 * Same dark ground as 06, no seam between them, because this is the end of the same gesture:
 * everything that was dealt out is gone and a single small print is left on the table. It is
 * the frame section 03 opened with at 3.5× — the one you could not place. Here it is whole,
 * captioned as such, and it is the only object on the page sitting at exactly 0°. Every other
 * print is a degree or two off true; this one has been squared up.
 *
 * The sentence is thirty-seven characters closing nine hundred words, so it takes the page's
 * top type scale, ranged to the same left edge as the print. It is not set on the picture:
 * nothing on this page is. The print's own arrival is the squaring — it settles from −5° to
 * true — and with reduced motion it is simply already straight.
 */
export function AboutCGuiding() {
  return (
    <section className="about-c-sec about-c-guiding" aria-labelledby="ac-guiding-h">
      <div className="about-c-rail">
        <h2 className="about-c-eyebrow" id="ac-guiding-h">
          <span className="about-c-eyebrow__n">07</span>
          {about.guiding.heading}
        </h2>

        <div className="about-c-guiding__body" data-c-deal>
          <div className="about-c-guiding__put" data-cd>
            <div className="about-c-guiding__sheet">
              <Print
                frame="room"
                ratio="16 / 9"
                className="about-c-guiding__plate"
                sizes="(max-width: 760px) 62vw, 340px"
                want={1920}
                deal={false}
              />
              {/* the grease-pencil crop mark a contact sheet carries: exactly the region
                  section 03 enlarged, so the two objects are legibly the same frame. */}
              <span className="about-c-guiding__mark" aria-hidden="true" />
            </div>
            <p className="about-c-label about-c-label--dark">The same frame, whole</p>
          </div>

          <p className="about-c-guiding__line" data-cd>
            {about.guiding.line}
          </p>
        </div>
      </div>
    </section>
  );
}
