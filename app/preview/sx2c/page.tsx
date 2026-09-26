import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx2cIntroduction } from '@/components/preview/sx2c/Introduction';

/**
 * ISOLATED PREVIEW — PRAṆAVA About §01, concept sx2c.
 *
 * Rendered honestly rather than flatteringly: the pill above on the paper it will actually
 * sit on, real ground above the section so its top spacing is measurable, and the DEEP
 * ground below, because §02 "What Praṇava is" is a deep section and the handoff out of
 * this one has to be looked at rather than assumed.
 *
 * The page's single <h1> is visually hidden. On the real page the hero owns the <h1> and
 * this section is an <h2> beneath it; promoting the display sentence here would misjudge
 * the type scale against its neighbours, which is the whole point of the preview.
 */
export const metadata = {
  title: 'About §01 — concept sx2c',
  robots: { index: false, follow: false },
};

export default function PreviewSx2cPage() {
  return (
    <>
      <SiteNav light />
      <main className="sx2c-stage" id="top">
        <h1 className="sr">Praṇava — Introduction</h1>
        <div className="sx2c-stage__above" aria-hidden="true" />
        <Sx2cIntroduction />

        {/* THE HAND-OFF. Both critics measured this and both were right: a section that
            ends on cream has not ended. §02 "What Praṇava is" is a DEEP section, so the
            bottom of §01 is where the page changes ground, and the band carries the real
            §02 opening rather than 700px of empty dark. The eyebrow is the shipped
            section's own (components/about-pranava/WhatIs.tsx) and the lead is
            `about.what.lead`, verbatim. */}
        <aside className="sx2c-next" aria-label="What comes next">
          <p className="sx2c-next__eyebrow">
            <span className="sx2c-next__n">02</span>
            What Praṇava is
          </p>
          <p className="sx2c-next__lead">{about.what.lead}</p>
        </aside>
      </main>
    </>
  );
}
