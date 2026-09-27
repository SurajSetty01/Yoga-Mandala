import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Founder } from '@/components/preview/sx6b/Founder';
import { Sx6bMotion } from '@/components/preview/sx6b/Motion';

/**
 * ISOLATED PREVIEW — About §06 The Founder, designer B (motion and scroll carry it).
 *
 * Nothing outside `app/preview/sx6b/`, `components/preview/sx6b/` and
 * `styles/preview-sx6b.css` is touched; the one line added to app/globals.css is this
 * concept's own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION — both bands are labelled "Preview scaffold":
 *  · <SiteNav light /> so the pinned stage's top clearance is judged with the pill over it;
 *  · a deep band above: §05 The Praṇava Journey ends on the deep ground;
 *  · a deep band below: §07 Faculty follows on the deep ground, and a pinned section has to
 *    be judged with the page continuing after it, not ending.
 *
 * The page's one <h1> belongs to the About hero, which this route does not own; it still
 * needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx6b — The Founder',
  description:
    'Isolated preview of Praṇava About §06 The Founder: six moments from one workshop, sorted by how much the teacher is doing, walked past on a wall while the quotation lights clause by clause.',
};

export default function PreviewSx6b() {
  return (
    <>
      <SiteNav light />
      <main className="sx6b-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx6b-scaffold">
          <div className="sx6b-rail">
            <p>
              <span className="sx6b-scaffold__tag">Preview scaffold</span>
              §05 The Praṇava Journey ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Founder />

        <div className="sx6b-scaffold sx6b-scaffold--after">
          <div className="sx6b-rail">
            <p>
              <span className="sx6b-scaffold__tag">Preview scaffold</span>
              §07 Faculty would continue here, on the deep ground
            </p>
          </div>
        </div>
      </main>
      <Sx6bMotion />
    </>
  );
}
