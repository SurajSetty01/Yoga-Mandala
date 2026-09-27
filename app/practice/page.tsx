import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { PracticeHero } from '@/components/practice/tp1/PracticeHero';
import { PracticeSadhana } from '@/components/practice/tp2/Sadhana';
import { Tp3Regular } from '@/components/practice/tp3/Regular';
import { Tp4Prayatna } from '@/components/practice/tp4/Prayatna';
import { Tp5Pranayama } from '@/components/practice/tp5/Pranayama';
import { Tp6Retreats } from '@/components/practice/tp6/Retreats';
import { PracticeEnquire } from '@/components/practice/tp7/Enquire';

/**
 * PRAṆAVA — PRACTICE.  Blueprint §6, in the Blueprint's own order: ongoing Sādhana →
 * regular practice → Prayatna and related offerings → Prāṇāyāma → retreats/immersions →
 * schedule/enquiry. Visitor intent, from §3: "I want consistent Sādhana."
 *
 * Each section is its own component with its own stylesheet (styles/sec-tp<n>.css) and,
 * where it moves, its own client island:
 *
 *   hero  tp1  a class held in one pose; each loop of the film lays a stroke    deep
 *   01    tp2  a still and its twin; the twin wakes on "experience"             paper
 *   02    tp3  one sentence pinned, four nouns, four frames, each crop closer   warm
 *   03    tp4  a wall rope becomes a thread that strings the client's sentence  deep
 *   04    tp5  only the air moves: leaves on a clock, the sitters still          paper
 *   05    tp6  four frames close in around the lead sentence                    deep
 *   06    tp7  the room dims toward the footer and one thing stays lit          warm
 *
 * Grounds run deep · paper · warm · deep · paper · deep · warm, and the footer's dark is
 * the ending — no two neighbours share a ground.
 *
 * NOTHING ON THIS PAGE STATES A FACT THE CLIENT HAS NOT SUPPLIED. Every client sentence is
 * read out of content/pranava.ts.
 */
export const metadata = {
  title: 'Practice',
  description:
    'Sustained practice at Praṇava: ongoing Sādhana, regular practice, Prayatna, Prāṇāyāma, retreats and immersions. Consistent practice over quick results.',
};

export default function PracticePage() {
  return (
    <>
      <SiteNav light />
      <main className="pc" id="top">
        <PracticeHero />
        <PracticeSadhana />
        <Tp3Regular />
        <Tp4Prayatna />
        <Tp5Pranayama />
        <Tp6Retreats />
        <PracticeEnquire />
      </main>
      <SiteFooter />
    </>
  );
}
