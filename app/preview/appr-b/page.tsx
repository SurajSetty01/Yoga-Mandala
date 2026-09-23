import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { ApprBApproach } from '@/components/preview/appr-b/Approach';
import { ApprBTeach } from '@/components/preview/appr-b/Teach';
import { ApprBMotion } from '@/components/preview/appr-b/Motion';

/**
 * TOURNAMENT PREVIEW — Praṇava About §03 and §04, concept B.
 *
 * TIME IS THE SUBJECT OF BOTH SECTIONS, SO TIME IS WHAT THE LAYOUT IS MADE OF.
 *
 *   §03  deep   THE APERTURE OPENS — three pictures step across the measure, each wider
 *               than the one above it, and at Transmission the frame crosses the page,
 *               stands taller than anything else here, and is the only thing that moves.
 *   §04  warm   THE RULED LEAF — eight practices written on one evenly ruled page at
 *               intervals that keep lengthening, and after the eighth the ruling carries
 *               on blank, off the foot of the page.
 *
 * One opens, one measures. Dark against paper, photographic against written, width
 * against interval: neither section could be swapped for the other, which is the test
 * DESIGN-SYSTEM §5 sets.
 *
 * BOTH ARE COMPLETE WITHOUT MOTION AND WITHOUT JAVASCRIPT. Every width, every interval and
 * every photograph is in the static HTML; `ApprBMotion` reveals what is already painted
 * and attaches one clip on a desktop with the bandwidth for it. Turn reduced motion on and
 * the argument is untouched, because the argument was never the movement.
 *
 * Everything is namespaced `.ab-` and lives in `styles/preview-appr-b.css`. `<SiteNav
 * light />` is included so the pill can be judged over these two grounds.
 */
export const metadata = {
  title: 'Our approach · How we teach — concept B',
  robots: { index: false, follow: false },
};

export default function ApprBPage() {
  return (
    <>
      <SiteNav light />

      <main className="ab" id="top">
        {/* the page's one <h1>. These are two sections of the About page, so the document
            takes that page's own heading and the two register marks sit under it at h2. */}
        <h1 className="sr">{about.hero.heading}</h1>

        <ApprBApproach />
        <ApprBTeach />

        {/* ground below, so the pair can be driven past its own end */}
        <div className="ab-foot">
          <div className="ab-rail">
            <span className="ab-foot__mark" aria-hidden="true" />
          </div>
        </div>
      </main>

      <ApprBMotion />
    </>
  );
}
