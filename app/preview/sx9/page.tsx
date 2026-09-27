import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx9Values } from '@/components/about-pranava/sx9/Values';

/**
 * VERIFICATION ROUTE — Praṇava About §09 What We Value, final. The section sits between two
 * plain blocks painted the real grounds of its neighbours on /about/: §08 Praṇava & Seva
 * ends on warm, §10 Begin (the approved Closing) follows on warm.
 */
export const metadata = {
  title: 'Preview sx9 — What We Value (final)',
  description: 'Verification route for the final Praṇava About §09 What We Value section.',
  robots: { index: false, follow: false },
};

export default function PreviewSx9() {
  return (
    <>
      <SiteNav light />
      <main className="apr" id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx9-scaffold" aria-hidden="true">
          <p>
            <span className="sx9-scaffold__tag">Preview scaffold</span>
            §08 Praṇava &amp; Seva ends on this ground — the section starts below
          </p>
        </div>
        <Sx9Values />
        <div className="sx9-scaffold sx9-scaffold--below" aria-hidden="true">
          <p>
            <span className="sx9-scaffold__tag">Preview scaffold</span>
            §10 Begin (the approved Closing) would continue here
          </p>
        </div>
      </main>
    </>
  );
}
