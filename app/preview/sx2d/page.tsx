import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Room } from '@/components/preview/sx2d/Room';
import { RoomMotion } from '@/components/preview/sx2d/RoomMotion';
import { WhatIs } from '@/components/about-pranava/WhatIs';

/**
 * ISOLATED PREVIEW — designer D's §01 Introduction for the Praṇava About page.
 *
 * Owned files: this page, components/preview/sx2d/**, styles/preview-sx2d.css. Nothing else
 * is touched.
 *
 * Rendered honestly in place: the light pill above; a plain deep block where the hero will
 * stand (the hero is being built separately and is not imported here), so the fold can be
 * watched from its start as the section rises into the screen; and below it the REAL,
 * approved §02 "What Praṇava is", imported unchanged, so the seam into the deep ground is
 * the true seam. `AboutMotion` is deliberately not mounted, so §02 renders in its finished,
 * static state.
 */
export const metadata = { title: 'Preview sx2d — The page stands up into a room' };

export default function PreviewSx2d() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        {/* the real page's one <h1> is in the hero, which this route does not own */}
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx2d-standin" aria-hidden="true">
          <span className="sx2d-standin__label">hero · built separately</span>
        </div>
        <Room />
        <div className="apr">
          <WhatIs />
        </div>
      </main>
      <RoomMotion />
    </>
  );
}
