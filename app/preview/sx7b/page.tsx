import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Faculty } from '@/components/preview/sx7b/Faculty';
import { Motion } from '@/components/preview/sx7b/Motion';

/**
 * ISOLATED PREVIEW — About §07 Faculty, concept B (motion and scroll carry it).
 *
 * Nothing outside `app/preview/sx7b/`, `components/preview/sx7b/` and
 * `styles/preview-sx7b.css` is touched; the one line added to app/globals.css is this
 * concept's own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION — both bands are labelled "Preview scaffold" in the
 * render so nobody reads them as content:
 *  · <SiteNav light /> — the pill in its paper treatment, so the pinned stage's top
 *    clearance is judged with the pill actually over it;
 *  · a paper band above: §06 Founder precedes this section on paper, which is one reason
 *    this one is on the deep ground — neighbours never share a ground;
 *  · a warm band below: §08 Pranava & Seva follows, and a long pinned run has to be judged
 *    with the page continuing after it, not ending.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx7b — Faculty',
  description:
    'Isolated preview of Praṇava About §07 Faculty: six rooms of teaching open one after another through a single ring, each placed so its teaching hands land inside it.',
};

export default function PreviewSx7b() {
  return (
    <>
      <SiteNav light />
      <main className="sx7b-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx7b-scaffold">
          <div className="sx7b-scaffold__in">
            <p>
              <span className="sx7b-scaffold__tag">Preview scaffold</span>
              §06 Founded by Pranav Murthy ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Faculty />

        <div className="sx7b-scaffold sx7b-scaffold--warm">
          <div className="sx7b-scaffold__in">
            <p>
              <span className="sx7b-scaffold__tag">Preview scaffold</span>
              §08 Pranava &amp; Seva would continue here
            </p>
          </div>
        </div>
      </main>
      <Motion />
    </>
  );
}
