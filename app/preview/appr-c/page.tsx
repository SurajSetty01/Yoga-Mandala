import { SiteNav } from '@/components/SiteNav';
import { ApprCApproach } from '@/components/preview/appr-c/Approach';
import { ApprCTeach } from '@/components/preview/appr-c/Teach';
import { ApprCMotion } from '@/components/preview/appr-c/Motion';

/**
 * TOURNAMENT PREVIEW — Praṇava About §03 + §04, concept C.
 *
 * THE TYPE IS THE STRUCTURE. No panels, no cards, no numbered columns, and one
 * photograph across the two sections. Praṇava is a centre for the study of a
 * text tradition, so the two sections are set as two leaves of a book and the
 * only things organising them are the things a printed page has always used.
 *
 *   §03  OUR APPROACH   warm   four terms hung out into the margin, each
 *                              standing under a rule that draws across the leaf
 *   §04  HOW WE TEACH   paper  the prompt and its eight practices set as ONE
 *                              block of display type, the list run in behind a
 *                              colon and marked off by rubricated pilcrows
 *
 * The pair is deliberately opposite. §03 separates — four entries, five rules,
 * all the air on the page, everything hung off a left margin and ragged on the
 * outside. §04 compresses — one solid block, no line break between items, every
 * element centred on a single axis. Neither could be mistaken for the other.
 *
 * `<SiteNav light />` sits above both because the first thing under it is paper,
 * not a photograph. The page's single `<h1>` is visually hidden: on the real
 * page the hero owns it and these two are `<h2>`s beneath it, and changing their
 * rank for the preview would misjudge the type scale.
 */
export const metadata = {
  title: 'Approach + How we teach — concept C',
  robots: { index: false, follow: false },
};

export default function ApprConceptCPage() {
  return (
    <>
      <SiteNav light />
      <main className="ac" id="top">
        <h1 className="sr">About Praṇava</h1>
        <ApprCApproach />
        <ApprCTeach />
        <div className="ac-tail" aria-hidden="true" />
      </main>
      <ApprCMotion />
    </>
  );
}
