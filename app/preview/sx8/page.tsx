import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx8Seva } from '@/components/about-pranava/sx8/Seva';

/**
 * VERIFICATION ROUTE — Praṇava About §08 Praṇava & Seva, final. The section sits between
 * two plain blocks painted the real grounds of its neighbours on /about/: §07 Faculty ends
 * on the deep ground, §09 What We Value follows on paper (a screen tall, so the last ring
 * and its plate are judged with the page continuing after them).
 */
export const metadata = {
  title: 'Preview sx8 — Praṇava & Seva (final)',
  description: 'Verification route for the final Praṇava About §08 Praṇava & Seva section.',
  robots: { index: false, follow: false },
};

export default function PreviewSx8() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx8-scaffold" aria-hidden="true">
          <p>
            <span className="sx8-scaffold__tag">Preview scaffold</span>
            §07 Faculty ends on this ground — the section starts below
          </p>
        </div>
        <Sx8Seva />
        <div className="sx8-scaffold sx8-scaffold--below" aria-hidden="true">
          <p>
            <span className="sx8-scaffold__tag">Preview scaffold</span>
            §09 What We Value would continue here, on paper
          </p>
        </div>
      </main>
    </>
  );
}
