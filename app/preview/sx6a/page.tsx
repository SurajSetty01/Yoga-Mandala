import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Founder } from '@/components/preview/sx6a/Founder';
import { Sx6aMotion } from '@/components/preview/sx6a/Motion';

/**
 * ISOLATED PREVIEW — Praṇava About §06 The Founder, concept A (photography leads).
 *
 * Owned files: this page, components/preview/sx6a/**, styles/preview-sx6a.css, and the
 * one @import line in app/globals.css.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY. Both bands say "Preview scaffold" in the
 * render so nobody reads them as part of the design:
 *  · <SiteNav light /> — the pill in its paper treatment, as it is by this point on /about/;
 *  · a deep band above: §05 The Praṇava Journey precedes this section on the deep ground,
 *    which is why this one is on paper. Neighbours never share a ground;
 *  · a deep band below, over a screen tall: §07 Faculty follows on the deep ground, and the
 *    page has to continue far enough past the section for the lift to be triggered and its
 *    finished state to be seen with the section still on screen.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own. The
 * route still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx6a — The Founder',
  description:
    'Isolated preview of Praṇava About §06 The Founder: one photograph of two handstands, cut at the waist, with the founder’s sentence set in the cut.',
};

export default function PreviewSx6a() {
  return (
    <>
      <SiteNav light />
      <main className="sx6a-page" id="top">
        <h1 className="sx6a-sr">{about.hero.heading}</h1>

        <div className="sx6a-scaffold">
          <div className="sx6a-rail">
            <p>
              <span className="sx6a-scaffold__tag">Preview scaffold</span>
              §05 The Praṇava Journey ends on this ground. The section starts below.
            </p>
          </div>
        </div>

        <Founder />

        <div className="sx6a-scaffold sx6a-scaffold--after">
          <div className="sx6a-rail">
            <p>
              <span className="sx6a-scaffold__tag">Preview scaffold</span>
              §07 Faculty would continue here
            </p>
          </div>
        </div>
      </main>
      <Sx6aMotion />
    </>
  );
}
