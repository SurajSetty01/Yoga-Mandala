import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Faculty } from '@/components/preview/sx7d/Faculty';
import { Sx7dMotion } from '@/components/preview/sx7d/Motion';

/**
 * ISOLATED PREVIEW — Praṇava About §07 Faculty, concept D (spatial / compositional).
 *
 * Owned files: this page, components/preview/sx7d/**, styles/preview-sx7d.css, and the one
 * @import line in app/globals.css, added only after the stylesheet existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands say "Preview scaffold" in the
 * render so nobody reads them as part of the design:
 *  · <SiteNav light />, the pill in its paper treatment, as it is by this point on /about/;
 *  · a paper band above: §06 Founder precedes this section on paper, which is why this one
 *    is on the deep ground — neighbours never share a ground;
 *  · a warm band below, a screen tall: §08 Praṇava & Seva follows on the warm ground, and
 *    the levelling finishes as the eye-level line crosses the middle of the screen, so the
 *    page has to go on far enough for the finished state to be reached and seen.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * route still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx7d — Faculty, Eye level',
  description:
    'Isolated preview of Praṇava About §07 Faculty: eight photographs of one workshop, each turning about its own vanishing point until they share one eye level and become one room.',
  robots: { index: false, follow: false },
};

export default function PreviewSx7d() {
  return (
    <>
      <SiteNav light />
      <main className="sx7d-page" id="top">
        <h1 className="sx7d-sr">{about.hero.heading}</h1>

        <div className="sx7d-scaffold">
          <div className="sx7d-rail">
            <p>
              <span className="sx7d-scaffold__tag">Preview scaffold</span>
              §06 Founder ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Faculty />

        <div className="sx7d-scaffold sx7d-scaffold--after">
          <div className="sx7d-rail">
            <p>
              <span className="sx7d-scaffold__tag">Preview scaffold</span>
              §08 Praṇava &amp; Seva would continue here
            </p>
          </div>
        </div>
      </main>
      <Sx7dMotion />
    </>
  );
}
