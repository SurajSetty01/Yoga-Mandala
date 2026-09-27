import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { HowWeTeach } from '@/components/preview/sx4b/HowWeTeach';
import { Sx4bMotion } from '@/components/preview/sx4b/Sx4bMotion';

/**
 * ISOLATED PREVIEW — §04 How We Teach, concept B (motion and scroll carry it).
 *
 * Nothing outside app/preview/sx4b/, components/preview/sx4b/ and styles/preview-sx4b.css is
 * touched, apart from the one @import line in app/globals.css — added only after the
 * stylesheet existed, because an import of a missing file returns 500 for every route.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY:
 *  · <SiteNav light /> — the pill in its paper treatment, as it is by this point on /about/,
 *    so the stage's top clearance is judged against the real pill.
 *  · a band of paper above: §03 Our Approach ended on paper in the page's ground plan, and
 *    the first thing this warm section has to survive is that seam.
 *  · a deep band below: §05 The Praṇava Journey is on the deep ground, and the pinned frame
 *    has to release into it at its true length rather than into the end of the document.
 * Both bands say "Preview scaffold" in the render so no one reads them as captions.
 *
 * The page's one <h1> belongs to the About hero, which this route does not own; it carries
 * the client's page title, visually hidden, so the page still has exactly one.
 */
export const metadata = {
  title: 'Preview sx4b — How We Teach',
  description:
    'Isolated preview of Praṇava §04 How We Teach: one held inversion photographed eight times and registered on the feet, replaced practice by practice as you scroll, then laid over itself as a long exposure.',
};

export default function PreviewSx4b() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sx4b-sr">{about.hero.heading}</h1>

        <div className="sx4b-seam sx4b-seam--above">
          <div className="sx4b-rail">
            <p>
              <span className="sx4b-seam__tag">Preview scaffold</span>
              §03 ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <HowWeTeach />

        <div className="sx4b-seam sx4b-seam--below">
          <div className="sx4b-rail">
            <p>
              <span className="sx4b-seam__tag">Preview scaffold</span>
              §05 would continue here, on the deep ground
            </p>
          </div>
        </div>
      </main>
      <Sx4bMotion />
    </>
  );
}
