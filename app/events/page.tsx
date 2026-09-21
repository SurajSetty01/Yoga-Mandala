import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Masthead } from '@/components/events/Masthead';
import { Strip } from '@/components/events/Strip';
import { Route } from '@/components/events/Route';

/**
 * PRAṆAVA — EVENTS.  `/events/`.
 *
 * WHAT DOES NOT EXIST. `events.upcoming` is `null`. There is no event name, date, venue,
 * fee, duration or capacity anywhere in the Blueprint, the About document or the Website
 * brief. Blueprint §6 asks for upcoming events → event details → registration → past
 * events later, and every one of those needs a fact the client has not supplied. Nothing
 * on this page is invented and no empty calendar is drawn.
 *
 * WHAT DOES EXIST is the photographic record. The media archive holds a residential
 * teacher training on a rural campus — the approach path, the pavilion, the hall, practice,
 * rest, the grass under the trees. An events page with no scheduled events but visible
 * evidence that things happen here is honest, and it is a far better page than an empty
 * calendar. The strict rule the brief sets is kept: every caption says what its frame
 * SHOWS, never what it was, and no frame is labelled with an event name the client has
 * not used.
 *
 *   —   paper   the answer first, and the strip begins directly under it
 *   01  deep    the record as an exposed strip, with one frame still blank
 *   02  warm    one line in the schedule, and the line is "ask"
 *
 * HOW THIS PAGE DIFFERS FROM ITS TWO NEIGHBOURS. Heal and Insights are the other two pages
 * the brief holds back, and the three are separated on purpose along four axes rather than
 * by decoration:
 *
 *              media        mechanic                  ground arc          the reader's move
 *   Heal       none         a drawing that stops      paper throughout    none; it is still
 *   Insights   one frame    type at two sizes at once deep → paper → warm reading
 *   Events     six frames   a strip with a blank end  paper → deep → warm leafing sideways
 *
 * The media gradient is set by what the archive can honestly supply each page — there is
 * nothing in 1,211 frames for Heal, almost nothing for Insights, and a great deal for
 * Events — so the three look unlike each other for the same reason they say different
 * things. Their three closing routes are three different objects for the same reason.
 *
 * Everything here is a server component. NO CLIENT ISLAND AND NO SCRIPT: the strip is a
 * native scroller, so the page is identical with JavaScript disabled and identical under
 * prefers-reduced-motion.
 *
 * See components/events/NOTES.md.
 */
export const metadata = {
  title: 'Events',
  description:
    'Nothing is scheduled at the moment. What this page holds is the record — photographs of gatherings that have already happened at Praṇava — and one open line for hearing about the next one.',
};

export default function EventsPage() {
  return (
    <>
      <SiteNav light />
      <main className="ev" id="top">
        <Masthead />
        <Strip />
        <Route />
      </main>
      <SiteFooter />
    </>
  );
}
