import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { PracticeMotion } from '@/components/practice/PracticeMotion';
import { Hero } from '@/components/practice/Hero';
import { Sadhana } from '@/components/practice/Sadhana';
import { Regular } from '@/components/practice/Regular';
import { Prayatna } from '@/components/practice/Prayatna';
import { Breath } from '@/components/practice/Breath';
import { Retreats } from '@/components/practice/Retreats';
import { Enquire } from '@/components/practice/Enquire';

/**
 * PRAṆAVA — PRACTICE.  Blueprint §6, in the Blueprint's own order: ongoing Sādhana →
 * regular practice → Prayatna and related offerings → Prāṇāyāma → retreats/immersions →
 * schedule/enquiry. Visitor intent, from §3: "I want consistent Sādhana."
 *
 * THE PAGE'S SUBJECT IS DURATION AND RETURN, not a list of offerings, and every section
 * expresses one of them in a different way:
 *
 *   hero  three windows onto one practice; the middle one is still going     deep
 *   01    one word said again and again, larger each time, cut at both ends  paper
 *   02    the room set out again, running off both edges of the screen       warm
 *   03    the client's sentence with its grammar whispered and its practice
 *         set at size, beside a name with nothing published under it         deep
 *   04    two rules that breathe on a clock, not on the reader               paper
 *   05    four frames, each bigger than the last, so the reading slows       deep
 *   06    the page comes back to the window it opened with                   warm
 *
 * Grounds run deep · paper · warm · deep · paper · deep · warm, and the footer's dark is
 * the ending — no two neighbours share a ground or a move.
 *
 * NOTHING ON THIS PAGE STATES A FACT THE CLIENT HAS NOT SUPPLIED. There is no timetable,
 * no session length, no fee, no start date, no class size, no level and no testimonial
 * anywhere in the client's three documents, so there is none here; where a description
 * would go, the page says so in one line and opens the one channel that works. Every
 * client sentence is read out of content/pranava.ts and split only at the client's own
 * full stops. See components/practice/NOTES.md.
 *
 * Everything above is a server component. `PracticeMotion` is the page's only client
 * island, and the page is complete without it.
 */
export const metadata = {
  title: 'Practice — Praṇava',
  description:
    'Sustained practice at Praṇava: ongoing Sādhana, regular practice, Prayatna, Prāṇāyāma, retreats and immersions. Consistent practice over quick results.',
};

export default function PracticePage() {
  return (
    <>
      <SiteNav light />
      <main className="pc" id="top">
        <Hero />
        <Sadhana />
        <Regular />
        <Prayatna />
        <Breath />
        <Retreats />
        <Enquire />
      </main>
      <PracticeMotion />
      <SiteFooter />
    </>
  );
}
