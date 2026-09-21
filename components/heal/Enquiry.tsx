import Link from 'next/link';
import { journeys } from '@/content/pranava';
import { links } from '@/content/site';
import { Mark, healHref, HEAL_MESSAGE } from './parts';

/**
 * 03 · THE RESPONSIBLE ROUTE.
 *
 * Blueprint §6 ends the Heal page on a "responsible consultation CTA". Responsible, here,
 * has to mean four things at once, and each of them is a line on this page:
 *
 *  1. It must not offer a consultation. Praṇava Svasthya has no published description, no
 *     named practitioner and no stated scope in any of the client's three documents. A
 *     button reading "Book a consultation" would be the page inventing a service.
 *  2. It must not read as clinical. Nothing on this page assesses, diagnoses, advises or
 *     implies capability, and the page says so in its own words rather than leaving the
 *     reader to work it out.
 *  3. It must not pretend to a mechanism it does not have. There is no form handler, no
 *     backend and no mailbox — `links.emailGeneral` is null, as are the other two. The
 *     only live channel in content/site.ts is WhatsApp, and the link states plainly that
 *     it opens a message the reader sends themselves.
 *  4. It must still be a real way in, because "I want health-oriented guidance" is one of
 *     the four visitor journeys in Blueprint §3 and turning that reader away with nothing
 *     is its own kind of failure.
 *
 * The enquiry's label is that Blueprint intent, verbatim, and the message it opens is word
 * for word the one behind the Contact page's fourth doorway. Two routes, one sentence.
 */
export function Enquiry() {
  return (
    <section className="hl-s hl-s--paper hl-ask">
      <div className="hl-rail">
        <Mark n="02">Asking about it</Mark>

        <p className="hl-ask__lead">
          Until there is something to describe, the only thing this page can honestly do is
          take a message to a person.
        </p>

        <div className="hl-ask__grid">
          <div className="hl-ask__col">
            {/* What the page is NOT. Set at reading size and before the link, because a
                caveat printed under a button is a caveat nobody reads. */}
            <p className="hl-ask__care">
              Nothing on this page is medical advice, and no assessment, treatment or
              consultation is being offered through it.
            </p>
            <p className="hl-ask__care">
              The link below opens WhatsApp with the subject already written. You read it,
              change it and send it yourself — the site submits nothing on your behalf.
            </p>
          </div>

          <div className="hl-ask__col">
            <a className="hl-cta" href={healHref} rel="noopener">
              <span className="hl-cta__intent">{journeys.heal.intent}</span>
              <span className="hl-cta__go">
                Open an enquiry
                <svg
                  className="hl-cta__arw"
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0 5h16M12 1l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </span>
            </a>
            <p className="hl-ask__msg">
              <span className="hl-ask__msgK">It opens with</span>
              <span className="hl-ask__msgV">“{HEAL_MESSAGE}”</span>
            </p>
            <p className="hl-ask__alt">
              {/* The number is already published in the footer and on the Contact page;
                  repeating it here is the honest alternative to a link for anyone who
                  would rather not open an app. */}
              Or write to {links.whatsappDisplay}, or use{' '}
              <Link className="hl-ilink" href="/contact/">
                Contact
              </Link>{' '}
              for anything else.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
