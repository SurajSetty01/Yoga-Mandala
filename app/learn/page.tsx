import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Tl1Masthead } from '@/components/learn/tl1/Masthead';
import { LearningOverTime } from '@/components/learn/tl2/LearningOverTime';
import { LearnTeacherEducation } from '@/components/learn/tl3/TeacherEducation';
import { Tl4Forms } from '@/components/learn/tl4/Forms';
import { Tl5Register } from '@/components/learn/tl5/Register';
import { Tl6Choose } from '@/components/learn/tl6/Choose';
import { Tl7Begin } from '@/components/learn/tl7/Begin';
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
 *   hero  the room comes into focus  a blurred room sharpens as the veil drops to a paper band
 *   01  the list is read in time    a clip plays only while the eight practices are read
 *   02  one frame, two clips        a sand divider wipes one clause off and uncovers the other
 *   03  the scatter closes          five forms at five depths close into one band under a bar
 *   04  the register                choosing a name rewrites the WhatsApp slip letter by letter
 *   05  the path meets              four panels swing their feet in onto one strip of paving
 *   --  a place is taken            a window rises from the floor; a man sits on a bolster
 *
 * Each section owns its own client script and its own styles/sec-tl<n>.css; grounds run
 * paper / warm / deep / paper / deep / paper / warm, then the deep Next strip.
 *
 * FAQs. Blueprint §6 asks Learn for them and the client has supplied none. Writing eight
 * plausible questions and answering them would be the same class of error as inventing a
 * fee, so the page has no FAQ section. It is recorded here so the omission reads as a
 * decision rather than an oversight.
 *
 * `<SiteNav light />` — the pill reads on the masthead's veiled photograph and on its paper band.
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
        <Tl1Masthead />
        <LearningOverTime />
        <LearnTeacherEducation />
        <Tl4Forms />
        <Tl5Register />
        <Tl6Choose />
        <Tl7Begin />

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
      </main>

      <SiteFooter />
    </>
  );
}
