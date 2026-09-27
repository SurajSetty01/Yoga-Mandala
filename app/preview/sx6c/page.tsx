import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Founder } from '@/components/preview/sx6c/Founder';

/**
 * ISOLATED PREVIEW — About §06 The Founder, concept C (type is the structure).
 *
 * Nothing outside `app/preview/sx6c/`, `components/preview/sx6c/` and
 * `styles/preview-sx6c.css` is touched; the one line added to app/globals.css is this
 * concept's own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands are labelled "Preview
 * scaffold" in the render so nobody reads them as content:
 *  · <SiteNav light /> — the pill in its paper treatment, over the section as it will be;
 *  · a deep band above: §05 The Praṇava Journey precedes this section on the deep ground,
 *    which is why this one is paper;
 *  · a deep band below: §07 Faculty follows on the deep ground, and the tissue's resting
 *    place has to be judged with the page continuing after it.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx6c — The Founder',
  description:
    'Isolated preview of Praṇava About §06 The Founder: a biography set as a ledger of marginal heads, and one photograph uncovered by the tissue its sentence is printed on.',
};

export default function PreviewSx6c() {
  return (
    <>
      <SiteNav light />
      <main className="sx6c-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx6c-scaffold sx6c-scaffold--above">
          <div className="sx6c-rail">
            <p>
              <span className="sx6c-scaffold__tag">Preview scaffold</span>
              §05 The Praṇava Journey ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Founder />

        <div className="sx6c-scaffold sx6c-scaffold--below">
          <div className="sx6c-rail">
            <p>
              <span className="sx6c-scaffold__tag">Preview scaffold</span>
              §07 Faculty would continue here
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
