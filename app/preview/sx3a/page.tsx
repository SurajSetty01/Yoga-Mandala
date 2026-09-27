import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { WhatIs } from '@/components/about-pranava/WhatIs';
import { Approach } from '@/components/preview/sx3a/Approach';
import { Sx3aMotion } from '@/components/preview/sx3a/Sx3aMotion';

/**
 * ISOLATED PREVIEW: §03 Our Approach, concept A (photography leads).
 *
 * Only `app/preview/sx3a/`, `components/preview/sx3a/` and `styles/preview-sx3a.css`
 * belong to this concept. /about/ and every other route are untouched.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY
 *  · <SiteNav light />, the pill in its paper treatment, as it is by the time a reader
 *    reaches §03 on /about/.
 *  · The REAL §02 "What Praṇava is", imported unchanged from components/about-pranava and
 *    wrapped in `.apr` so it gets its own page's type scale. This section's first job is
 *    the seam out of that deep ground onto paper, and judging it against a stand-in band
 *    would be judging a different seam. It carries no reveal: AboutMotion is not mounted
 *    here, and `.apr` without `.is-live` shows everything.
 *  · A warm band below, labelled as scaffold, so the section's bottom spacing reads at its
 *    true length instead of running into the end of the document.
 *
 * The real page's one <h1> lives in the About hero, which this route does not own. The
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx3a · Our Approach',
  description:
    'Isolated preview of Praṇava §03 Our Approach: an open book whose gutter closes spread by spread, until Transmission is one photograph laid across the spine.',
};

export default function PreviewSx3a() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="apr">
          <WhatIs />
        </div>
        <Approach />
        <div className="sx3a-tail">
          <div className="sx3a-rail">
            <p>
              <span className="sx3a-scaffold">Preview scaffold</span>
              §04 How we teach would continue here
            </p>
          </div>
        </div>
      </main>
      <Sx3aMotion />
    </>
  );
}
