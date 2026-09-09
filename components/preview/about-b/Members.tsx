import { about } from '@/content/copy';

/**
 * 06 — A COMMUNITY BUILT BY ITS MEMBERS.   The sentence stands on the members.
 *
 * The inverse of 05: there, one figure for a sentence about one of anything; here, a whole
 * room, and the display line's baseline IS the horizon it fades in on. The photograph is
 * masked upward into --ground-deep so it has no top edge and no side edges, bleeds off the
 * bottom of the plate, and never becomes a rectangle beside anything.
 *
 * The last sentence describes one teacher in four roles on four different days, so it is set
 * as four steps walking down and to the right — one <p>, one string, split on its own commas
 * and never rewritten. Each step is dimmer and further in than the one before it.
 *
 * `about.members.lines[3]` — "Everyone has something to learn. Everyone has something to
 * contribute." — is NOT printed. It is already section 02's display headline on this same
 * page, at a larger size than anything available here. Printing the page's best sentence
 * twice spends it twice. Nothing is paraphrased and nothing is added; one line is simply
 * left where it already lands hardest.
 */
export function Members() {
  const [refusal, answer, roles] = about.members.lines;

  /* the sentence's own clause boundaries — split on its commas, not rewritten */
  const steps = roles.split(/(?<=,)\s+/);

  return (
    <section className="b-sec b-sec--deep b-mem" aria-labelledby="b-mem-h">
      <img
        className="b-mem__horizon"
        src="/media/stills/p13-img_0617-2560.webp"
        alt="A wide view of a full studio: participants seated on coloured mats beneath ceiling slings, a rope wall along the left."
        loading="lazy"
        decoding="async"
        width={2560}
        height={1707}
      />

      <div className="b-mem__in">
        <h2 className="b-eyebrow b-eyebrow--dark" id="b-mem-h">
          <i className="b-eyebrow__rule" aria-hidden="true" />
          <span className="b-eyebrow__n">06</span>
          {about.members.heading}
        </h2>

        <p className="b-mem__refusal" data-br="up">
          {refusal}
        </p>

        <p className="b-mem__answer" data-br="up" style={{ '--d': '90ms' } as React.CSSProperties}>
          {answer}
        </p>

        <p className="b-mem__stair" data-br="up" style={{ '--d': '170ms' } as React.CSSProperties}>
          {steps.map((s, i) => (
            <span className="b-mem__step" key={s} style={{ '--i': i } as React.CSSProperties}>
              {s}
              {i < steps.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
