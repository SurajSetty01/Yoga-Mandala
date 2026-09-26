import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { about } from '@/content/pranava';
import { Sx3bApproach } from '@/components/preview/sx3b/Approach';
import { Sx3bMotion } from '@/components/preview/sx3b/Motion';

/**
 * PREVIEW sx3b — Praṇava About §03, "Our approach". Round two, rebuilt from the ground up.
 *
 * THE SHEET IS CUT. Three terms are printed as one body of text under one photograph of the
 * room, on a sheet that runs off the right edge of the page. Then the paper stops at a brass
 * rule across the full width, the ground past it is the deep one, and the fourth term stands
 * over there — beside the one frame in the section that crosses the cut, and the only one
 * that moves.
 *
 * Round one's stacked sheets and travelling edge are GONE, not tuned: there is no clip-path,
 * no pinning, no scroll listener and no rAF anywhere in this section now. Every word is in
 * normal flow at every viewport, so nothing can occlude a paragraph and nothing evaporates
 * when `prefers-reduced-motion` is on — the document height is identical either way.
 *
 * Everything is namespaced `.sx3b-` and lives in `styles/preview-sx3b.css`. Nothing outside
 * `app/preview/sx3b/`, `components/preview/sx3b/` and that one stylesheet is touched.
 *
 * The section's real neighbour above is §02, "What Praṇava is", on the deep ground; it is
 * not re-rendered here, but this section opens on paper for that reason. `<SiteNav light />`
 * is included so the pill can be judged over this ground, and a field of paper below it so
 * the section's own spacing reads true rather than sitting on nothing.
 *
 * The page's single `<h1>` is visually hidden: on the real page the hero owns it and this
 * section is an `<h2>` beneath it, and changing its level for the preview would misjudge the
 * type scale. Its words are the client's own page heading, verbatim.
 */
export const metadata = {
  title: 'Our approach — sx3b',
  robots: { index: false, follow: false },
};

export default function Sx3bPreviewPage() {
  return (
    <>
      <SiteNav light />
      <main className="sx3b-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <Sx3bApproach />
        <div className="sx3b-after">
          <div className="sx3b-rail">
            <p>Preview route · section 03 of the About page</p>
          </div>
        </div>
      </main>
      <Sx3bMotion />
      <SiteFooter />
    </>
  );
}
