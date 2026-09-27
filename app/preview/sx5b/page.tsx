import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Journey } from '@/components/preview/sx5b/Journey';
import { JourneyMotion } from '@/components/preview/sx5b/JourneyMotion';

/**
 * ISOLATED PREVIEW — About §05 The Praṇava Journey, concept B (motion and scroll carry it).
 *
 * Nothing outside app/preview/sx5b/, components/preview/sx5b/ and styles/preview-sx5b.css is
 * touched, apart from the one @import line in app/globals.css — added only after the
 * stylesheet existed, because an import of a missing file returns 500 for every route.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands say "Preview scaffold" in the
 * render so nobody reads them as captions:
 *  · <SiteNav light /> — the pill as it is by this point on /about/, so the pinned stage's
 *    top clearance is judged against the real pill.
 *  · a warm band above, a full screen tall: §04 How We Teach precedes this section on the
 *    warm ground, and the section must start below the fold, as it does on the real page,
 *    or its lazy photographs would be judged loading at the top of a document.
 *  · a paper band below: §06 Founder follows on paper, and the pinned walk has to let go
 *    into the page continuing after it, not into the end of the document.
 *
 * The page's one <h1> belongs to the About hero, which this route does not own; it carries
 * the client's page title, visually hidden, so the page still has exactly one.
 */
export const metadata = {
  title: 'Preview sx5b — The Praṇava Journey',
  description:
    'Isolated preview of Praṇava About §05: four rooms, each standing in the doorway of the last — scrolling walks you through each opening into the next room.',
};

export default function PreviewSx5b() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sx5b-sr">{about.hero.heading}</h1>

        <div className="sx5b-seam sx5b-seam--above">
          <p className="sx5b-seam__text">
            <span className="sx5b-seam__tag">Preview scaffold</span>
            §04 How We Teach ends on this ground — the section starts below
          </p>
        </div>

        <Journey />

        <div className="sx5b-seam sx5b-seam--below">
          <p className="sx5b-seam__text">
            <span className="sx5b-seam__tag">Preview scaffold</span>
            §06 Founder would continue here, on paper
          </p>
        </div>
      </main>
      <JourneyMotion />
    </>
  );
}
