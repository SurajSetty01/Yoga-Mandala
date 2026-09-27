import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { EventsMasthead } from '@/components/events/te1/Masthead';
import { Te2Record } from '@/components/events/te2/Record';
import { Te3Next } from '@/components/events/te3/Next';

/**
 * PRAṆAVA — EVENTS.  `/events/`.
 *
 * WHAT DOES NOT EXIST. `events.upcoming` is `null`. There is no event name, date, venue,
 * fee, duration or capacity anywhere in the client's material, so nothing on this page is
 * invented and no empty calendar is drawn. What does exist is the photographic record, and
 * the page is built out of it.
 *
 * Each section is its own component with its own stylesheet (styles/sec-te<n>.css) and,
 * where it moves by script, its own client island:
 *
 *   —   te1  the class leaves the hall; the answer lands on the empty room   paper
 *   01  te2  a pile of prints gone through by hand; a blank card at the end  deep
 *   02  te3  the next frame is blank, and writing into it is the way to ask  warm
 *
 * Grounds run paper · deep · warm, and the footer's dark is the ending — no two neighbours
 * share a ground. Every section is complete with reduced motion and with no script.
 */
export const metadata = {
  title: 'Events',
  description:
    'Nothing is scheduled at the moment. Until then the page keeps the record of gatherings that have already happened.',
};

export default function EventsPage() {
  return (
    <>
      <SiteNav light />
      <main className="ev" id="top">
        <EventsMasthead />
        <Te2Record />
        <Te3Next />
      </main>
      <SiteFooter />
    </>
  );
}
