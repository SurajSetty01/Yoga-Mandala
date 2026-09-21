import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Masthead } from '@/components/learn/Masthead';
import { Method } from '@/components/learn/Method';
import { Spine } from '@/components/learn/Spine';
import { Forms } from '@/components/learn/Forms';
import { Register } from '@/components/learn/Register';
import { Choose } from '@/components/learn/Choose';
import { Begin } from '@/components/learn/Begin';
import { LearnMotion } from '@/components/learn/LearnMotion';
import { journeys } from '@/content/pranava';

/**
 * LEARN — "I want structured education."
 *
 * THE CONSTRAINT THIS PAGE IS BUILT AROUND. Praṇava's material names five programmes and
 * says nothing else about any of them: no description, duration, fee, schedule,
 * prerequisite, intake date, outcome or testimonial exists in the Blueprint, the About
 * document or the Website brief. `content/pranava.ts` carries all five with `blurb: null`.
 * So this page is NOT a course catalogue, and nothing on it has been filled in from
 * imagination. An earlier build on this project published "700+ teachers across India and
 * abroad" — a figure in none of the client's material — and every decision here is aimed
 * at the opposite failure mode.
 *
 * What it is instead: the client's own ARGUMENT about education, evidenced by the archive,
 * with a register of real names and a real route at the end of it.
 *
 *   01  the window opens          a narrow slot widens into the room as you scroll
 *   02  the heap straightens      eight scattered practices draw into one ordered column
 *   03  the sentence turns        one claim, two frames, two distances; the close one moves
 *   04  five forms, one line      five apertures of five shapes standing on one baseline
 *   05  the register              a ruled book: names entered, details honestly on enquiry
 *   06  the sentence narrows      four beginnings taper to a path's vanishing point
 *   07  a place is taken          the room set out, nobody in it, and the first seat yours
 *
 * FAQs. Blueprint §6 asks Learn for them and the client has supplied none. Writing eight
 * plausible questions and answering them would be the same class of error as inventing a
 * fee, so the page has no FAQ section. It is recorded here so the omission reads as a
 * decision rather than an oversight.
 *
 * `<SiteNav light />` because the masthead is paper from its first pixel — the pill takes
 * its paper treatment immediately rather than waiting on a hero choreography that does not
 * run on this route.
 */
export const metadata = {
  title: 'Learn',
  description: journeys.learn.indicative,
};

export default function LearnPage() {
  return (
    <>
      <SiteNav light />

      <main className="ln" id="top">
        <Masthead />
        <Method />
        <Spine />
        <Forms />
        <Register />
        <Choose />
        <Begin />

        {/* the rule belongs to the measure, not to the page: on the padded outer box a
            border-top draws edge to edge and reads as a stray line under a phone. */}
        <nav className="ln-next" aria-label="Continue">
          <div className="ln-next__in">
            <p className="ln-next__lbl">Next</p>
            <Link className="ln-next__a" href="/practice/">
              Practice
              <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </nav>

        <LearnMotion />
      </main>

      <SiteFooter />
    </>
  );
}
