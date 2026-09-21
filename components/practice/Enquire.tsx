import Link from 'next/link';
import { CLIPS } from './frames';
import { Ask, Cap, Eyebrow, Loop } from './parts';

/**
 * 06 · SCHEDULE AND ENQUIRY — THE PAGE COMES BACK TO THE WINDOW IT OPENED WITH.
 *
 * THE MECHANIC IS THE ARGUMENT. The centre window of the hero appears again here, a
 * quarter the size and on paper instead of on the dark — the same practice, further down
 * the same day. A page about returning to one thing ends by returning to one thing, and
 * because it is the same URL it is the same HTTP cache entry: the return costs the reader
 * nothing, which is a fair description of what consistency is supposed to be.
 *
 * THE HONEST PART. Blueprint §6 asks this page for "schedule/enquiry" and there is no
 * schedule. Not a day, not an hour, not a session length, not a start date, not a fee, not
 * a class size, not a level, in any of the client's three documents — §16 lists all of it
 * as content still required before launch. An earlier build of this project published an
 * invented membership figure; a plausible-looking timetable would be the same failure one
 * step on, and a harder one to catch because a timetable looks like exactly what a
 * practice page is meant to have.
 *
 * So the section says plainly what is not here, and routes the question to the only
 * channel that works. `links.emailGeneral` is null in content/site.ts and null renders as
 * nothing; `links.whatsapp` is real, and the subject rides in the message rather than in a
 * mailbox that does not exist — the same device components/contact/routes.ts uses, so a
 * reader who arrives at Contact from here meets the behaviour they have already met.
 *
 * The second route is /contact/ itself, which is the page that holds every way in. This
 * one does not duplicate it.
 */
export function Enquire() {
  return (
    <section className="pc-s pc-s--warm pc-enq" id="pc-enquire">
      <div className="pc-rail pc-enq__in">
        <figure className="pc-enq__fig" data-pc="up">
          <Loop clip={CLIPS.held} className="pc-enq__loop" alt="" />
          <figcaption>
            <Cap>The window this page opened with, further down the same day.</Cap>
          </figcaption>
        </figure>

        <div className="pc-enq__say">
          <Eyebrow n="06">Schedule and enquiry</Eyebrow>

          <p className="pc-enq__lead" data-pc="up">
            There is no timetable on this page because there is not one to publish yet. Dates,
            formats and fees for Praṇava&rsquo;s practice programmes have not been set out, and
            a plausible-looking one would be worse than none.
          </p>

          <Ask
            note="What does exist is an open line. Ask what is running, and when."
            subject="Ask about practice at Praṇava"
            message="Hello Praṇava. I am looking for a regular practice. Could you tell me what is running?"
          />

          <p className="pc-enq__more">
            <Link className="pc-enq__link" href="/contact/">
              Every way to reach Praṇava
              <svg
                className="pc-enq__arw"
                width="15"
                height="10"
                viewBox="0 0 15 10"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
