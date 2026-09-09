import { about } from '@/content/copy';

/**
 * 07 — OUR GUIDING THOUGHT.   The last word assembles as the page ends.
 *
 * Thirty-eight characters closing nine hundred words, so they get the whole plate and the
 * page's top scale. The one thing that behaves here is the final word: "together" is set
 * with its letters held apart, and they close up in proportion to how far the reader has
 * come down this last plate — the word is whole exactly when the page is. The behaviour is
 * the meaning, and it is the only moving thing in the five sections.
 *
 * It is scroll-DRIVEN, never scroll-jacked: one passive listener writes one custom property
 * inside one rAF, and every letter moves on `transform` alone. With JavaScript off, with
 * reduced motion, or before hydration the property stays at its default 1 and the sentence
 * is simply set — nothing is reachable only through motion.
 *
 * The split letters are aria-hidden and followed by the intact word for assistive tech, so
 * the sentence is never spelled out. The client's sentence is not touched.
 */

const line = about.guiding.line;
/* the sentence's own last word, kept with its full stop so the group can only ever
   expand to the RIGHT — spreading symmetrically would push the first letter back
   into the word before it. */
const cut = line.lastIndexOf(' ') + 1;
const head = line.slice(0, cut);
const tail = line.slice(cut);

export function Guiding() {
  return (
    <section className="b-sec b-guide" aria-labelledby="b-guide-h">
      <h2 className="b-eyebrow" id="b-guide-h">
        <span className="b-eyebrow__n">07</span>
        {about.guiding.heading}
      </h2>

      <p className="b-guide__line" data-br="up">
        {head}
        <span className="b-guide__word" aria-hidden="true">
          {[...tail].map((c, i) => (
            <span
              className="b-guide__c"
              key={`${c}${i}`}
              style={{ '--dx': `${(i * 0.13).toFixed(3)}em` } as React.CSSProperties}
            >
              {c}
            </span>
          ))}
        </span>
        <span className="b-sr">{tail}</span>
      </p>
    </section>
  );
}
