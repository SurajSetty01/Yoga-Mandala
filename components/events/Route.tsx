import Link from 'next/link';
import { Mark, eventHref, EVENT_MESSAGE } from './parts';

/**
 * 02 · THE ROUTE, SET AS A LINE IN A LEDGER.
 *
 * Deliberately NOT the filled plate the Heal page ends on, and not the inline link the
 * Insights page ends on. Three near-empty pages that all finish with the same button
 * would be three versions of one page, so each of the three closes on a different object:
 * Heal on a clay plate carrying the visitor's own sentence, Insights on a quiet underlined
 * line inside its reading column, and this one on a full-measure ruled row — label left,
 * arrow right, hairlines above and below — which is the shape an entry in a schedule has.
 * The schedule has one entry, and it is "ask".
 *
 * WHAT IS NOT HERE. Blueprint §6 asks Events for registration and, later, a past-events
 * archive. There is nothing to register for, no backend to register with, and no way to
 * caption an archive frame with an event the client has not named — so neither is built
 * and neither is stubbed. See components/events/NOTES.md.
 */
export function Route() {
  return (
    <section className="ev-s ev-s--warm ev-route">
      <div className="ev-rail">
        <Mark n="02">Hearing about the next one</Mark>

        <div className="ev-route__grid">
          <p className="ev-route__lead">
            There is no mailing list, and nothing on this site takes a booking.
          </p>
          <p className="ev-route__body">
            One line is open, and it is the same one the rest of the site uses. The link
            below opens WhatsApp with the subject already written; you read it, change it
            and send it yourself.
          </p>
        </div>

        <a className="ev-row" href={eventHref} rel="noopener">
          <span className="ev-row__label">Ask about upcoming events</span>
          <span className="ev-row__msg">{EVENT_MESSAGE}</span>
          <svg
            className="ev-row__arw"
            width="26"
            height="12"
            viewBox="0 0 26 12"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0 6h23M19 1.5 23.5 6 19 10.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </a>

        <p className="ev-route__alt">
          For anything that is not an event, use{' '}
          <Link className="ev-ilink" href="/contact/">
            Contact
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
