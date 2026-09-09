import { about } from '@/content/copy';

/**
 * 05 — OUR APPROACH.   The refusal whispers; the answer speaks.
 *
 * The three lines are not three equal statements. Line 1 is a refusal ("not one particular
 * school, lineage, organisation or methodology"), line 2 is what the community actually is,
 * line 3 is the conduct that follows. So the plate is set in two voices drawn from ONE
 * typeface: the refusal thin, wide-tracked and soft (wght 250 / SOFT 100 / opsz 144), the
 * answer heavy, sharp and wonky (wght 600 / SOFT 0 / WONK 1, italic). Yoga Mandala defines
 * itself by what it is, so the affirmative sentence is the loudest thing here even though
 * the sentence above it is longer.
 *
 * One figure stands behind the type, feathered out of the paper on every edge so there is no
 * frame anywhere — one teacher, for the sentence that refuses to be about one of anything.
 * At 0.40 opacity over --ground-warm the darkest pixel it can produce is #9D9790, which is
 * 5.00:1 against --ink: ANY size of body text may cross it. Measured, not assumed.
 */
export function Approach() {
  const [refusal, answer, conduct] = about.approach.lines;

  return (
    <section className="b-sec b-appr" aria-labelledby="b-appr-h">
      <img
        className="b-appr__figure"
        src="/media/stills/ss-dsc07120-1920.webp"
        alt="A practitioner balances on one leg with palms together at the chest during a class."
        loading="lazy"
        decoding="async"
        width={1280}
        height={1920}
      />

      <div className="b-appr__in">
        <h2 className="b-eyebrow" id="b-appr-h">
          <span className="b-eyebrow__n">05</span>
          {about.approach.heading}
        </h2>

        <p className="b-appr__refusal" data-br="up">
          {refusal}
        </p>

        <p className="b-appr__answer" data-br="up" style={{ '--d': '120ms' } as React.CSSProperties}>
          {answer}
        </p>

        <p className="b-appr__conduct" data-br="up" style={{ '--d': '200ms' } as React.CSSProperties}>
          {conduct}
        </p>
      </div>
    </section>
  );
}
