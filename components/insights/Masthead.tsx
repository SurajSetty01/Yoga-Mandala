import { about, journeys } from '@/content/pranava';

/**
 * — · THE MASTHEAD.
 *
 * A journal's masthead, on the reversed ground, and the only place on this page where
 * anything is said about the future. The display line is the client's own description of
 * this area (About §7's fourth door) and the standing notice beneath it is a plain
 * statement of fact about the page, set at reading size on its own rule so it cannot be
 * mistaken for either a promise or an apology.
 *
 * The `<h1>` is the navigation's label at label scale, because an `<h1>` is a rank and not
 * a font size, and there is exactly one on the page.
 *
 * Blueprint §6 asks Insights for a featured article, categories, latest articles, a search
 * and a resource list. All five need articles. None renders, and none is stubbed — see
 * components/insights/NOTES.md for the list and what each needs before it can exist.
 */
export function Masthead() {
  return (
    <section className="in-s in-s--deep in-top">
      <div className="in-rail">
        <h1 className="in-h1">
          <span className="in-h1__rule" aria-hidden="true" />
          Insights
        </h1>

        <p className="in-lede">{about.journey[3].body}</p>

        <div className="in-notice">
          <p className="in-notice__now">Nothing has been published here yet.</p>
          <p className="in-notice__then">
            So this page does the only honest version of itself: it reads three passages
            Praṇava has already written, and says where each of them lives.
          </p>
        </div>

        {/* The visitor intent this page answers, from Blueprint §3, in the Blueprint's own
            words. It is a running head rather than a heading — the reader's sentence, not
            Praṇava's — so it sits at the foot of the masthead in the folio's own type. */}
        <p className="in-intent">
          <span className="in-intent__k">Written for</span>
          <span className="in-intent__v">“{journeys.insights.intent}”</span>
        </p>
      </div>
    </section>
  );
}
