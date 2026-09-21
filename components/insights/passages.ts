import { about } from '@/content/pranava';

/**
 * WHAT THIS PAGE READS, AND WHY IT IS NOT INVENTED.
 *
 * `insights.articles` is `null`. There is not one article, title, date, author or excerpt
 * anywhere in the Blueprint, the About document or the Website brief, and a grid of empty
 * article cards is the worst possible version of this page — it manufactures the exact
 * impression ("there is writing here") that the absent content would have earned.
 *
 * But the client HAS written the kind of thinking that will appear here. It is in the About
 * document, it is already published on `/about/`, and it is exactly what a reader arriving
 * with Blueprint §3's "I want to understand more" came for. So this page reads three
 * passages that already exist rather than promising three that do not, and every one of
 * them carries a link back to where it is published in full.
 *
 * NOTHING BELOW IS RETYPED. Each passage is the string out of `content/pranava.ts`, and the
 * emphasised clause is located inside it by `indexOf` at build time. `mark()` throws if the
 * clause is not found character for character, so if the client revises one of these
 * sentences the build FAILS rather than silently shipping a clause that is no longer theirs.
 * That is the same failure this project's `npm run check:copy` exists to prevent, one layer
 * closer to the page.
 *
 * The editorial act on this page is the CHOICE of which clause carries the thought — which
 * is what an editor does and what a journal is. It adds no words.
 */

export type Passage = {
  /** what precedes the emphasised clause, '' if it starts the passage */
  lead: string;
  /** the clause the section sets at display size */
  lit: string;
  /** what follows it, '' if it ends the passage */
  tail: string;
  /** where this already is, in the About page's own section name */
  from: string;
  href: string;
};

/**
 * Split `src` at `clause`, which must appear in it exactly once.
 *
 * This runs in a server component during the build, so a mismatch is a build error and not
 * a runtime surprise. `indexOf`/`lastIndexOf` rather than a regex: these sentences carry
 * typographic apostrophes and em dashes that a hand-written pattern gets wrong.
 */
function mark(src: string, clause: string, from: string, href: string): Passage {
  const at = src.indexOf(clause);
  if (at === -1) {
    throw new Error(
      `insights/passages.ts: the clause "${clause.slice(0, 48)}…" is not in the client's sentence. ` +
        `content/pranava.ts has changed; re-read it and re-choose the clause rather than editing the sentence.`,
    );
  }
  if (src.indexOf(clause, at + 1) !== -1) {
    throw new Error(
      `insights/passages.ts: the clause "${clause.slice(0, 48)}…" appears twice; it cannot be located.`,
    );
  }
  return { lead: src.slice(0, at), lit: clause, tail: src.slice(at + clause.length), from, href };
}

export const PASSAGES: Passage[] = [
  /* About §5, the third of the four principles. Inquiry is the one of the four that is
     about the reader rather than about Praṇava, and the middle sentence is the whole of
     what an Insights page would be for. */
  mark(
    about.approach.items[2].body,
    'To understand why something is practised, not simply how it is performed.',
    'Our approach',
    '/about/#apr-approach',
  ),

  /* About §6, the opening refusal. The clause set at size is a complete statement on its
     own; the rest of the sentence continues at reading size, which is the point of the
     mechanic — one paragraph, read at two distances. */
  mark(
    about.teach.open,
    'We do not believe that a certificate alone makes someone a Yoga teacher,',
    'How we teach',
    '/about/#apr-teach',
  ),

  /* About §8, the founder's sentence. It is the page's last passage because it is the one
     that says what all the writing would be for. */
  mark(
    about.founder.quote,
    'but to help the student develop the capacity to see, understand and practise for themselves.',
    'The founder',
    '/about/#apr-founder',
  ),
];
