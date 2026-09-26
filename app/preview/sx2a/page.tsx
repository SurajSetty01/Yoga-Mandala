import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Aperture } from '@/components/preview/sx2a/Aperture';
import { ApertureMotion } from '@/components/preview/sx2a/ApertureMotion';

/**
 * ISOLATED PREVIEW — concept A for the deleted About §01, Introduction.
 *
 * Nothing outside `app/preview/sx2a/`, `components/preview/sx2a/` and
 * `styles/preview-sx2a.css` is touched. /about/, the approved §02, SiteNav, content/ and
 * public/media/ are all left exactly as they are, so four concepts can be judged against
 * each other without any of them having quietly changed the thing they share.
 *
 * `<SiteNav light />` because this section opens on paper: the pill's paper treatment is
 * the one that has to survive over it, and it is the one the real page would give it here.
 *
 * The real page's single <h1> lives in the hero, which this route does not own. The page
 * still needs exactly one, so it carries the client's own page heading, verbatim from
 * content/pranava.ts, off-screen — not a substitute headline invented for a preview.
 *
 * THE HAND-OFF BAND, and what changed in round 2. It used to be 62svh of empty deep green —
 * 558px of dead ink at 1440, which a critic counted as the largest unforced waste in this
 * concept and noted that exactly one of the four rivals had fixed it, by putting the REAL
 * next section's opening in the band instead of a void pretending to be a transition. That
 * is right, and it costs nothing: §02 is "02 · What Praṇava is", and it opens on
 * `about.what.lead` — "A place to learn. A place to practise. A place to grow." Both come
 * out of content/pranava.ts and out of the live `components/about-pranava/WhatIs.tsx`
 * verbatim, in the register mark and the display face the real page gives them.
 *
 * It is deliberately NOT designed further than that. §02 has a mechanic of its own on the
 * real page and this route does not own it; the band's job is to show that §01 hands over
 * to something, and to be judged on whether the last screen of §01 is empty or not. The
 * <h2> is real, so the document outline reads "About Pranava" → "01 Introduction" →
 * "02 What Praṇava is", which is the outline the live page has.
 */
export const metadata = {
  title: 'Preview sx2a — The Aperture',
  description:
    'Concept A for Pranava About §01: one photograph shown four times, every showing ending on the same edge of it and opening further up — 26%, 44%, 72%, all of it.',
};

export default function PreviewSx2a() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <Aperture />

        <div className="sx2a-after">
          <div className="sx2a-after__rail">
            <h2 className="sx2a-after__mark">
              <span className="sx2a-after__n">02</span>
              <span className="sx2a-after__rule" aria-hidden="true" />
              What Praṇava is
            </h2>
            <p className="sx2a-after__lead">{about.what.lead}</p>
          </div>
        </div>
      </main>
      <ApertureMotion />
    </>
  );
}
