import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Enfilade } from '@/components/preview/sx5d/Enfilade';
import { EnfiladeMotion } from '@/components/preview/sx5d/EnfiladeMotion';

/**
 * ISOLATED PREVIEW — About §05 The Praṇava Journey, concept D (spatial).
 *
 * Nothing outside `app/preview/sx5d/`, `components/preview/sx5d/` and
 * `styles/preview-sx5d.css` is touched; the one line added to app/globals.css is this
 * concept's own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION — both bands are labelled "Preview scaffold" in
 * the render so nobody reads them as content:
 *  · <SiteNav light /> — the pill in its paper treatment, so the pinned stage's top
 *    clearance is judged with the pill actually over it;
 *  · a warm band above: §04 How We Teach precedes this section on the warm ground, which
 *    is why this one is on the deep ground — neighbours never share a ground;
 *  · a paper band below: §06 The Founder follows on paper, and the long pinned walk has to
 *    be judged with the page continuing after it, not ending.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx5d — The Praṇava Journey',
  description:
    'Isolated preview of Praṇava About §05 The Praṇava Journey: four rooms, each seen through the far doorway of the last, walked through on scroll.',
};

export default function PreviewSx5d() {
  return (
    <>
      <SiteNav light />
      <main className="sx5d-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx5d-scaffold">
          <p>
            <span className="sx5d-scaffold__tag">Preview scaffold</span>
            §04 How We Teach ends on this ground — the section starts below
          </p>
        </div>

        <Enfilade />

        <div className="sx5d-scaffold sx5d-scaffold--paper">
          <p>
            <span className="sx5d-scaffold__tag">Preview scaffold</span>
            §06 The Founder would continue here
          </p>
        </div>
      </main>
      <EnfiladeMotion />
    </>
  );
}
