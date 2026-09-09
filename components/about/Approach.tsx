import { about } from '@/content/copy';

/**
 * 05 — OUR APPROACH.
 *
 * Three lines that decide what this community is not, and therefore what it is. It is the
 * shortest block on the page and the one that matters most per word, so it is given the
 * page's only quiet composition: pushed to the right of the measure — everything else here
 * is left-aligned — with a clay change-bar in the margin, the mark an editor puts beside a
 * passage that must not be lost. Clay stays a hairline; it is 3.90:1 and can never be text.
 *
 * The scale descends across the three: the claim, the correction, the invitation.
 */
export function Approach() {
  const [claim, correction, invitation] = about.approach.lines;

  return (
    <section className="ab ab-approach">
      <div className="ab__inner">
        <h2 className="ab-eyebrow">
          <span>05</span>
          {about.approach.heading}
        </h2>

        <div className="ab-approach__body" data-r="up">
          <p className="ab-approach__one">{claim}</p>
          <p className="ab-approach__two">{correction}</p>
          <p className="ab-approach__three">{invitation}</p>
        </div>
      </div>
    </section>
  );
}
