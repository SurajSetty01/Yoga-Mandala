import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Seva } from '@/components/preview/sx8a/Seva';
import { SevaMotion } from '@/components/preview/sx8a/SevaMotion';

/**
 * ISOLATED PREVIEW — About §08 Praṇava & Seva, concept A (photography leads).
 *
 * Nothing outside `app/preview/sx8a/`, `components/preview/sx8a/` and
 * `styles/preview-sx8a.css` is touched; the one line added to app/globals.css is this
 * concept's own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION — both bands are labelled "Preview scaffold" in the
 * render so nobody reads them as captions:
 *  · <SiteNav light /> — the pill over the section, so its clearance is judged for real;
 *  · a deep band above: §07 Faculty ends on the reversed ground, which is why this section
 *    is on the warm one — neighbours never share a ground;
 *  · a paper band below, long enough that the section's last door is judged with the page
 *    continuing after it: §09 What We Value follows on paper.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx8a — Praṇava & Seva',
  description:
    'Isolated preview of Praṇava About §08: one photograph cut once, at the line where a climber’s weight passes to the three people holding her, with the lead sentence set in the cut — and a row of teachers under the Praṇava mark as the door to Yoga Mandala.',
};

export default function PreviewSx8a() {
  return (
    <>
      <SiteNav light />
      <main className="sx8a-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx8a-scaffold">
          <div className="sx8a-rail">
            <p>
              <span className="sx8a-scaffold__tag">Preview scaffold</span>
              §07 Faculty ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Seva />

        <div className="sx8a-scaffold sx8a-scaffold--paper">
          <div className="sx8a-rail">
            <p>
              <span className="sx8a-scaffold__tag">Preview scaffold</span>
              §09 What We Value would continue here, on paper
            </p>
          </div>
        </div>
      </main>
      <SevaMotion />
    </>
  );
}
