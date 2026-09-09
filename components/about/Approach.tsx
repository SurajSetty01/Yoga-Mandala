import { about } from '@/content/copy';

/**
 * 05 — OUR APPROACH.   The refusal whispers; the answer speaks.
 *
 * The client's chosen concept, carried over from `/preview/about-b/` with its selectors
 * re-namespaced. Two things changed on promotion and neither is the idea (see NOTES.md):
 * the ground moved from `--ground-warm` to `--ground` because section 04 above now owns warm,
 * and the figure moved from `ss-dsc07120` to `ss-dsc07126` because `ss-dsc07120` is already
 * the fourth still in the client-approved section 02, a screen and a half up this same page.
 *
 * The three lines are not three equal statements. Line 1 is a refusal ("not one particular
 * school, lineage, organisation or methodology"), line 2 is what the community actually is,
 * line 3 is the conduct that follows. So the plate is set in two voices drawn from ONE
 * typeface: the refusal thin, wide-tracked and soft (wght 250 / SOFT 100 / opsz 144), the
 * answer heavy, sharp and wonky (wght 600 / SOFT 0 / WONK 1, italic). Yoga Mandala defines
 * itself by what it is, so the affirmative sentence is the loudest thing here even though the
 * sentence above it is longer.
 *
 * One figure stands behind the type, feathered out of the paper on every edge so there is no
 * frame anywhere — one teacher, for the sentence that refuses to be about one of anything.
 * At 0.40 over `--ground` the darkest pixel it can produce is #96948F, which is 5.45:1
 * against `--ink`: any size of ink may cross it. The one coloured element on the plate, the
 * teal register mark, is kept off the picture by geometry at every width instead — teal on
 * that same worst pixel is 2.42:1, and no tint fixes that, exactly as the nav pill's opaque
 * ground was the fix rather than a gradient.
 */
export function Approach() {
  const [refusal, answer, conduct] = about.approach.lines;

  return (
    <section className="ab-sec ab-appr" aria-labelledby="ab-appr-h">
      <img
        className="ab-appr__figure"
        src="/media/stills/ss-dsc07126-1920.webp"
        alt="A practitioner in a blue shirt balances on one leg with both arms lifted overhead during an outdoor class."
        loading="lazy"
        decoding="async"
        width={1280}
        height={1920}
      />

      <div className="ab-appr__in ab-rail">
        <h2 className="ab-eyebrow" id="ab-appr-h">
          <span className="ab-eyebrow__n">05</span>
          {about.approach.heading}
        </h2>

        <p className="ab-appr__refusal" data-r="up">
          {refusal}
        </p>

        <p className="ab-appr__answer" data-r="up" style={{ '--d': '120ms' } as React.CSSProperties}>
          {answer}
        </p>

        <p className="ab-appr__conduct" data-r="up" style={{ '--d': '200ms' } as React.CSSProperties}>
          {conduct}
        </p>
      </div>
    </section>
  );
}
