import { links } from '@/content/site';
import { CopyNumber } from './CopyNumber';

/**
 * THE ONE HARD PROBLEM ON THIS PAGE.
 *
 * The client's own contact document lists three ways in: a general email, a collaborations
 * email and WhatsApp. Two of the three were never supplied — `links.emailGeneral` and
 * `links.emailCollaborations` are `null`, and `null` must render as NOTHING. Not a
 * `mailto:#`, not "coming soon", not a greyed-out row, not an invented address. See
 * design/CONTENT.md.
 *
 * So the card is not a set of fixed slots with one of them filled. It is a list built from
 * a filtered array. Today that array has one entry and the card reads as a complete, single
 * open line — which is the truth. The day an address arrives it has two, the second row
 * renders with its own type size, and nothing about the page needs redesigning.
 */
export type Channel = {
  kind: 'whatsapp' | 'email';
  /** What the medium is called, in the reader's words. */
  label: string;
  /** What is actually shown — a real number, a real address. Never a stand-in. */
  value: string;
  href: string;
  /** The action's own words. */
  action: string;
};

/**
 * Build the rows for one contact block. `email` is whatever `content/site.ts` holds for
 * that block, which today is `null` for both blocks; the parameter exists so that supplying
 * one is a data change and not a code change.
 */
export function buildChannels(email: string | null): Channel[] {
  const out: Channel[] = [
    {
      kind: 'whatsapp',
      label: 'WhatsApp',
      value: links.whatsappDisplay,
      href: links.whatsapp,
      action: 'Message on WhatsApp',
    },
  ];
  if (email) {
    out.push({
      kind: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      action: 'Write an email',
    });
  }
  return out;
}

const Arrow = () => (
  <svg
    className="cx-cta__arw"
    width="15"
    height="10"
    viewBox="0 0 15 10"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/**
 * A server component: the number, the link and the words are all in the static HTML.
 * <CopyNumber /> is the page's single client island and it adds a convenience, never a
 * route to anything — with JavaScript off the number is still there to be read and the
 * link still works.
 */
export function ChannelList({ items }: { items: Channel[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="cx-ch">
      {items.map((c) => (
        <li className="cx-ch__i" key={c.kind} data-kind={c.kind}>
          <p className="cx-ch__k">{c.label}</p>
          <p className="cx-ch__v">{c.value}</p>
          <div className="cx-ch__act">
            {c.kind === 'email' ? (
              <a className="cx-cta" href={c.href}>
                {c.action}
                <Arrow />
              </a>
            ) : (
              <a className="cx-cta" href={c.href} target="_blank" rel="noopener noreferrer">
                {c.action}
                <Arrow />
              </a>
            )}
            {c.kind === 'whatsapp' ? <CopyNumber value={c.value} /> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
