import { SiteNav } from '@/components/SiteNav';
import { Sx3cApproach } from '@/components/preview/sx3c/Approach';
import { Sx3cMotion } from '@/components/preview/sx3c/Sx3cMotion';

/**
 * PREVIEW — Praṇava About, "Our approach", concept sx3c.
 *
 * TYPE IS THE STRUCTURE. A column of type holds one right edge all the way down — the lead
 * sentence, then three names standing against a hairline rule in the margin — until
 * Transmission, where the rule stops on a brass tick, the name crosses the gutter into the
 * text column itself, and the section's only photograph arrives at full height in the margin
 * the words have just vacated.
 *
 * Rendered honestly rather than in isolation: `<SiteNav light />` is the real navigation, and
 * the section is sandwiched between two bands of `--ground-deep`, because on the page this is
 * built for it follows "What Praṇava is" (deep) and precedes "How we teach". The dark → paper
 * turn at the top is half of why a book page works here at all, and spacing that is only ever
 * judged against white is spacing that has not been judged.
 *
 * The bands carry no client copy — they are grey-box stand-ins and say so.
 *
 * This page's single `<h1>` is visually hidden. On the real page the hero owns it and these
 * sections sit beneath as `<h2>`; changing the section's heading level for a preview would
 * misjudge the type scale, so the harness supplies the missing one instead.
 */
export const metadata = {
  title: 'Our approach — concept sx3c',
  robots: { index: false, follow: false },
};

export default function Sx3cPreviewPage() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">About Praṇava</h1>

        <div className="sx3c-above">
          <p className="sx3c-ghost">
            <span aria-hidden="true">↑ </span>
            The end of section 02, “What Praṇava is”, on its deep ground. Stand-in.
          </p>
        </div>

        <Sx3cApproach />

        <div className="sx3c-below">
          <p className="sx3c-ghost">
            <span aria-hidden="true">↓ </span>
            The start of section 04, “How we teach”. Stand-in.
          </p>
        </div>
      </main>
      <Sx3cMotion />
    </>
  );
}
