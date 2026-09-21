import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { Masthead } from '@/components/within/Masthead';
import { Pillars } from '@/components/within/Pillars';
import { Share } from '@/components/within/Share';
import { Initiatives } from '@/components/within/Initiatives';
import { WithinMotion } from '@/components/within/WithinMotion';
import { ymNav } from '@/content/site';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * PAGE 2 — What Happens Within Yoga Mandala.
 *
 *      SHOW IT HAPPENING. DO NOT DESCRIBE IT.
 *
 * The build this replaced told the reader that this community connects, learns, collaborates
 * and shares, in twenty-five bullet points. But every one of those twenty-five phrases names
 * something that has already happened in front of a camera — community discussions, teacher
 * introductions, workshops, expert conversations — and the archive holds the frames. So the
 * page is built as evidence rather than as a prospectus:
 *
 *   · four narrow windows across the masthead, one per idea, crossing the horizon into the
 *     paper below — a contents page made of the footage each section opens into;
 *   · 01–03 as tall arches on paper, each holding a silent loop that drifts inside it, with
 *     that pillar's items pinned across the frame's inner edge as chips that straddle
 *     photograph and paper at once;
 *   · 04, SHARE, opening the page out into the only wide frame — one teacher, one student,
 *     the room watching — and the client's own closing line set directly beneath it;
 *   · the initiatives standing in the one room in the archive with nobody in it, where the
 *     relationship inverts: the evidence hangs in the margin of the type instead.
 *
 * Every frame carries a wall label: what is in it, and the day it was shot. Nothing on this
 * page is counted, estimated or attributed to an event it did not come from — see the header
 * of components/within/frames.ts.
 *
 * <SiteNav light /> because this page has no hero and the pill takes its paper treatment
 * from the first pixel rather than waiting for a choreography that never runs here;
 * <SiteFooter /> because the last section hands over to it on the same dark ground.
 */
export const metadata = {
  title: 'What Happens Within',
  description:
    'Yoga Mandala is built around four simple ideas: Connect, Learn, Collaborate and Share — and a growing set of community initiatives.',
};

const NEXT = ymNav.find((n) => n.href === '/yoga-mandala/join/');

export default function WithinPage() {
  return (
    <>
      <SiteNav light />

      <main className="wi" id="top">
        <Masthead />
        <Pillars />
        <Share />
        <Initiatives />

        {NEXT ? (
          <nav className="wi-next" aria-label="Continue">
            {/* the rule belongs to the measure, not to the page: on the padded outer box a
                border-top draws edge to edge and reads as a stray line under a phone. */}
            <div className="wi-next__in">
              <p className="wi-next__lbl">Next</p>
              <Link className="wi-next__a" href={NEXT.href}>
                {NEXT.full}
                <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                  <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </nav>
        ) : null}
      </main>
      <SiteFooter />

      <WithinMotion />
    </>
  );
}
