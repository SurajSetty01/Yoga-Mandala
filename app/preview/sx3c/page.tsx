import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { WhatIs } from '@/components/about-pranava/WhatIs';
import { Sx3cApproach } from '@/components/preview/sx3c/Approach';

/**
 * PREVIEW — Praṇava About, "Our approach", concept sx3c: two leaves of a commented
 * manuscript. See components/preview/sx3c/Approach.tsx.
 *
 * Rendered in place rather than in isolation. Above it is the REAL approved §02, "What
 * Praṇava is", on its deep ground — imported, not copied, and inside `.apr` so its own
 * stylesheet applies. Its motion island is deliberately absent, so it shows its finished
 * state; the seam between that section's last line and this section's first leaf is the
 * thing being judged here, and it is only judgeable against the real neighbour.
 *
 * Below is a stand-in for "How we teach" — a band of paper, marked as a stand-in, long
 * enough that this section's foot margin and last scroll positions read true.
 *
 * The hero owns the page's `<h1>` on /about/ and is not rendered here, so the harness
 * supplies one, visually hidden, from the client's own heading.
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
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="apr">
          <WhatIs />
        </div>

        <Sx3cApproach />

        <div className="sx3c-next">
          <p className="sx3c-next__label">Stand-in · the next section, “How we teach”, begins here</p>
        </div>
      </main>
    </>
  );
}
