import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { WithinMasthead } from '@/components/within/Masthead';
import { Ideas } from '@/components/within/Ideas';
import { Initiatives } from '@/components/within/Initiatives';
import { WithinMotion } from '@/components/within/WithinMotion';
import { nav } from '@/content/site';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * PAGE 2 — What Happens Within Yoga Mandala.
 *
 * The page is mostly lists, and the whole design problem is not letting that become a column
 * of bullet points on cream. So it is built as three objects on two materials:
 *
 *   · a title page on paper, whose index is a quartered figure of the four ideas;
 *   · one dark ledger carrying all four chapters, each list set as a ruled register in the
 *     display face with its number and name held beside it by `position: sticky`;
 *   · the initiatives back on paper, in panels, with their lists set as phrases in a field —
 *     a different content type given a different instrument.
 *
 * There is no video and no type on a photograph. That is the hero's language, and the client
 * asked for each section to introduce its own visual idea; continuity here is the tokens, the
 * type scale, the caption and the reveal grammar.
 */
export const metadata = {
  title: 'What Happens Within',
  description:
    'Yoga Mandala is built around four simple ideas: Connect, Learn, Collaborate and Share — and a growing set of community initiatives.',
};

const NEXT = nav.find((n) => n.href === '/join/');

export default function WithinPage() {
  return (
    <>
      {/* No hero on this page, so the pill takes its paper treatment from the first pixel
          rather than waiting for a choreography that never runs here. */}
      <SiteNav light />

      <main className="wi" id="top">
        <WithinMasthead />
        <Ideas />
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
