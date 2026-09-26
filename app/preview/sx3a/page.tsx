import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Approach } from '@/components/preview/sx3a/Approach';
import { Sx3aMotion } from '@/components/preview/sx3a/Sx3aMotion';

/**
 * ISOLATED PREVIEW — §03 Our Approach, concept A (photography leads).
 *
 * Nothing outside `app/preview/sx3a/`, `components/preview/sx3a/` and
 * `styles/preview-sx3a.css` is touched. /about/, /yoga-mandala/ and every other route are
 * left exactly as they are, and the one line added to app/globals.css is the import of
 * this concept's own stylesheet — written only after the file existed, because adding the
 * import first returns 500 for every route on the site.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY:
 *
 *  · <SiteNav light /> — the pill in its paper treatment, because on /about/ this section
 *    is reached from §02 and the navigation is already light by then. It is here so that
 *    the section's top spacing is judged with the pill actually over it rather than with
 *    an empty strip standing in for it.
 *  · a short deep band above the section. §03 sits directly after "What Praṇava is",
 *    which is on the DEEP ground, and the first thing this section has to survive is the
 *    seam out of that ground onto paper. Judging it against white would be judging a
 *    different section.
 *  · ground below it, so the fall out of the dark stage reads at its true length rather
 *    than being cut off by the end of the document.
 *
 * BOTH SCAFFOLD RAILS ARE LABELLED "Preview scaffold" IN THE RENDER. An unlabelled line of
 * small caps on a dark ground reads as a photographic caption, and a review read these two
 * exactly that way and counted them among the section's captions. They are not captions —
 * they are the seam either side of it — so the render now says so, and the section's one
 * real caption is inside its <figure>, flush to the frame it describes.
 *
 * The real page's one <h1> lives in the About hero, which this route does not own. The
 * page still needs exactly one, so it carries the client's own page title, visually
 * hidden.
 */
export const metadata = {
  title: 'Preview sx3a — Our Approach',
  description:
    'Isolated preview of Praṇava §03 Our Approach: three photographs standing on one line at increasing size until the third leaves the page, and a fourth frame that moves.',
};

export default function PreviewSx3a() {
  return (
    <>
      <SiteNav light />
      <main className="sx3a" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx3a-head">
          <div className="sx3a-rail">
            <p>
              <span className="sx3a-scaffold">Preview scaffold</span>
              §02 ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Approach />

        <div className="sx3a-tail">
          <div className="sx3a-rail">
            <p>
              <span className="sx3a-scaffold">Preview scaffold</span>
              §04 would continue here
            </p>
          </div>
        </div>
      </main>
      <Sx3aMotion />
    </>
  );
}
