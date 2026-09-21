import { links, site } from '@/content/site';

/**
 * The register mark, identical in construction to the one the home page's section 02
 * introduced and the About and Heal pages carry — 11.5px Inter at 0.19em uppercase with a
 * Fraunces numeral in clay. Continuity across the site is the mark, the tokens and the
 * type scale; what differs between pages is composition.
 *
 * `dark` is the reversed variant: on the warm-black ground teal measures 2.44:1 and clay
 * 4.2:1, so neither can carry an 11.5px label. The mark goes cream and the numeral takes
 * the sand, which is the one thing sand is allowed to be.
 */
export function Mark({
  n,
  children,
  dark = false,
}: {
  n: string;
  children: string;
  dark?: boolean;
}) {
  return (
    <h2 className={`in-mark${dark ? ' in-mark--dark' : ''}`}>
      <span className="in-mark__n">{n}</span>
      <span className="in-mark__rule" aria-hidden="true" />
      {children}
    </h2>
  );
}

/**
 * Blueprint §6 asks Insights for a subscription. There is no backend, no mailing list and
 * no mailbox — `links.emailGeneral` is null — so a form with an email field would collect
 * addresses into nothing. The one live channel takes the request instead, with the subject
 * already written; the reader sends it themselves.
 */
export const TELL_MESSAGE = `Hello ${site.name}. Please let me know when writing is published on Insights.`;
export const tellHref = `${links.whatsapp}?text=${encodeURIComponent(TELL_MESSAGE)}`;
