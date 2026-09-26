import { SiteNav } from '@/components/SiteNav';
import { Sx3dApproach } from '@/components/preview/sx3d/Approach';

/**
 * TOURNAMENT PREVIEW — Praṇava / About / §03 "Our approach", concept sx3d.
 *
 * SPATIAL. A type scale made out of distance: one perspective constant, four
 * depths, one authored body size, and a room that three of the four terms stand
 * in while the fourth stands on your side of it.
 *
 * The section is rendered honestly: the navigation pill above it, a band of the
 * DEEP ground above where the approved §02 ends, and a full screen of paper
 * below, so the spacing either side reads true and there is enough length for
 * the view() range to resolve the way it will in place.
 *
 * `<SiteNav />` — the dark treatment — because the first thing under the pill on
 * this route is §02's deep ground, and the section's own room continues it.
 *
 * The page's single `<h1>` is visually hidden: on the real page the hero owns it
 * and this section is an `<h2>` beneath it, and changing its level for a preview
 * would misjudge the type scale. Everything on the route is a server component;
 * there is no client island of this section's own.
 */
export const metadata = {
  title: 'Our approach — sx3d',
  robots: { index: false, follow: false },
};

export default function Sx3dPreviewPage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <h1 className="sr">Praṇava — our approach</h1>

        {/* the tail of the approved §02, so the seam above the section is judged
            on the ground it will actually meet */}
        <div className="sx3d-above" aria-hidden="true" />

        <Sx3dApproach />

        {/* ground below, so the section's own bottom spacing is not the end of
            the document */}
        <div className="sx3d-below" aria-hidden="true" />
      </main>
    </>
  );
}
