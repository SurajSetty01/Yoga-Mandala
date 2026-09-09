import { about } from '@/content/copy';

/**
 * 03 — THE PREMISE.
 *
 * The hero's headline ("Yoga is vast. / No one holds it all.") is drawn from the middle
 * paragraph here, and section 02 signs off by whispering its first sentence in italic at
 * 1.35rem. So this paragraph has been circled twice before the reader reaches it. It is set
 * whole, unsplit, at twice that size and in full ink — the arrival, not a reprise. Nothing is
 * paraphrased and nothing is cut; the escalation is entirely typographic.
 *
 * A spread with a rule down the middle, and no photograph at all. Four stills in a row have
 * just gone past; the page needs a page of type, and the silence here is what makes the
 * full-bleed frame in 06 land.
 */
export function Opening() {
  const [definition, premise, becoming] = about.opening;

  return (
    <section className="ab ab--warm ab-open">
      <div className="ab__inner">
        <h2 className="ab-eyebrow">
          <span>03</span>
          Why we began
        </h2>

        <div className="ab-open__grid">
          <p className="ab-open__def">{definition}</p>

          <div className="ab-open__r" data-r="up">
            <p className="ab-open__premise">{premise}</p>
            <p className="ab-open__now">{becoming}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
