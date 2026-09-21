import { links, site } from '@/content/site';

/**
 * The register mark, identical in construction to the one the home page's section 02
 * introduced and About, Heal and Insights all carry. Continuity across the site is the
 * mark, the tokens and the type scale; what differs between pages is composition.
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
    <h2 className={`ev-mark${dark ? ' ev-mark--dark' : ''}`}>
      <span className="ev-mark__n">{n}</span>
      <span className="ev-mark__rule" aria-hidden="true" />
      {children}
    </h2>
  );
}

/**
 * Blueprint §6 asks Events for registration. There is nothing to register for and no
 * backend to register with, so the page does not pretend to a booking flow. The one live
 * channel in content/site.ts — every email address there is null — carries the request
 * instead, with the subject already written.
 */
export const EVENT_MESSAGE = `Hello ${site.name}. Please let me know about upcoming events.`;
export const eventHref = `${links.whatsapp}?text=${encodeURIComponent(EVENT_MESSAGE)}`;
