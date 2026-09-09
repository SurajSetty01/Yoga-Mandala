import { links } from '@/content/site';

/**
 * THE TWO MISSING LINKS, AND WHY THEY ARE NOT A HOLE IN THE PAGE.
 *
 * `links.emailGeneral` and `links.submitOffering` are both `null`: the client's own document
 * brackets them as [EMAIL ADDRESS] and [SUBMIT AN OFFERING] and they have not been supplied.
 * A `null` must render as *nothing* — never `href="#"`, never a greyed-out button that looks
 * broken, never an invented address (content law §4). But this is the page that has to
 * convert, and a block whose action simply vanishes reads as unfinished.
 *
 * So the action SLOT is a constant. It always holds exactly one real, working link, at one
 * size and one weight. When the client's own address is missing the slot falls back to the
 * WhatsApp community — the one door on this site that is genuinely open — and it is
 * labelled for where it actually goes, never for where the absent link would have gone.
 * Nothing is disabled, nothing is dead, and nothing pretends.
 *
 * Supplying an address later is a one-line change in content/site.ts. The slot does not
 * move, resize or reflow: the label swaps and the href swaps. That is the whole diff.
 */
export type Action = {
  href: string;
  label: string;
  /** leaves the site over http(s), so it needs target/rel */
  external: boolean;
  /** true while we are standing in for an address the client has not sent */
  fallback: boolean;
};

export function resolveAction(href: string | null, label: string, standIn: string): Action {
  if (href) {
    // A supplied value is either a URL or a bare email address; both become a real href.
    const web = /^https?:\/\//i.test(href);
    return {
      href: web || /^mailto:/i.test(href) ? href : `mailto:${href}`,
      label,
      external: web,
      fallback: false,
    };
  }
  return { href: links.whatsapp, label: standIn, external: true, fallback: true };
}
