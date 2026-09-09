import { about } from '@/content/copy';

/**
 * 07 — OUR GUIDING THOUGHT.
 *
 * Thirty-seven characters closing a page of about nine hundred words, so they get the page's
 * top type scale and the whole plate to themselves. This is the only centred composition on
 * the page — everything above it is ranged left — and that alone is what makes it read as an
 * ending rather than as one more section.
 *
 * Fraunces italic is this page's emphatic voice: the hero's second line and section 02's
 * second line are both set in it, so the close is spoken in the same register the page opened
 * with. The sentence is not split and no word is picked out; it is short enough to carry
 * itself.
 *
 * The bottom of the page is left open for the site footer.
 */
export function Guiding() {
  return (
    <section className="ab ab--deep ab-guiding">
      <div className="ab__inner">
        <h2 className="ab-eyebrow">
          <span>07</span>
          {about.guiding.heading}
        </h2>
        <p className="ab-guiding__line" data-r="up">
          {about.guiding.line}
        </p>
      </div>
    </section>
  );
}
