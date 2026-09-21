import { links, site } from '@/content/site';

/**
 * The two shared objects on /heal/, and nothing else. This page has no photographs, no
 * client island and no data file — see components/heal/NOTES.md for why the absence of a
 * picture is a decision rather than a shortfall.
 */

/**
 * The register mark, kept to the letter of the one the home page's section 02 introduced
 * and the About page carries: 11.5px Inter at 0.19em, uppercase, with a Fraunces numeral in
 * clay. Continuity across the site is the mark, the tokens and the type scale; what differs
 * between pages is composition.
 *
 * It is an `<h2>`, and that is structural. Two of this page's three sections open on a
 * sentence rather than a title, so marking those as headings would put prose into the
 * document outline. The mark is the only thing that IS a section title, so it carries the
 * rank and the outline reads Heal → 01 → 02 → 03.
 */
export function Mark({ n, children }: { n: string; children: string }) {
  return (
    <h2 className="hl-mark">
      <span className="hl-mark__n">{n}</span>
      <span className="hl-mark__rule" aria-hidden="true" />
      {children}
    </h2>
  );
}

/**
 * One open line, and the subject rides in the message.
 *
 * `links.whatsapp` is the only channel in content/site.ts that is not null — all three
 * email addresses are — so it is the only route that can be offered without inventing a
 * mailbox. The same construction is used on the Contact page, and this page's message is
 * word for word the one behind that page's health-oriented-guidance doorway, so a reader
 * who arrives by either route sends Praṇava the same sentence.
 *
 * Nothing is submitted by the site. The link opens WhatsApp with the text already written;
 * the reader reads it, edits it and sends it, which is the only claim this page makes about
 * what happens next.
 */
export const HEAL_MESSAGE = `Hello ${site.name}. My enquiry is about health-oriented guidance.`;
export const healHref = `${links.whatsapp}?text=${encodeURIComponent(HEAL_MESSAGE)}`;
