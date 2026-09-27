import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { WhatIs } from '@/components/about-pranava/WhatIs';
import { Introduction } from '@/components/preview/sx2a/Introduction';
import { Sx2aMotion } from '@/components/preview/sx2a/Sx2aMotion';

/**
 * ISOLATED PREVIEW — concept A for About §01, Introduction: "The mat's width".
 *
 * Owns only app/preview/sx2a/, components/preview/sx2a/ and styles/preview-sx2a.css.
 * /about/, SiteNav, content/ and public/media/ are untouched.
 *
 * Below the section sits the REAL approved §02, imported from the live page unchanged and
 * wrapped in the `.apr` root it expects, so the seam — paper handing to #12201A, and this
 * section's last photograph against §02's first — is judged against the thing it will
 * actually meet, not a stand-in. AboutMotion is deliberately not mounted: §02 renders in its
 * finished state, which its stylesheet guarantees without JavaScript.
 *
 * The real page's <h1> belongs to the hero, which this route does not own; the page still
 * needs exactly one, so it carries the client's page heading off-screen.
 */
export const metadata = {
  title: 'Preview sx2a — The mat’s width',
  description:
    'Concept A for Pranava About §01: the claim split around a photograph cut to a yoga mat, then four photographs that open from the mat’s width to the whole page.',
};

export default function PreviewSx2a() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <Introduction />
        <div className="apr">
          <WhatIs />
        </div>
      </main>
      <Sx2aMotion />
    </>
  );
}
