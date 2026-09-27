import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx6Founder } from '@/components/about-pranava/sx6/Founder';

/**
 * VERIFICATION ROUTE — Praṇava About §06 The Founder, final (base sx6d, grafts from sx6a
 * and sx6c). The section sits between two plain blocks painted the real grounds of its
 * neighbours on /about/: §05 The Praṇava Journey and §07 Faculty are both on the deep ground.
 * The real page's <h1> belongs to the About hero; this route carries it visually hidden.
 */
export const metadata = {
  title: 'Preview sx6 — The Founder (final)',
  description: 'Verification route for the final Praṇava About §06 The Founder section.',
};

export default function PreviewSx6() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx6-scaffold" aria-hidden="true">
          <p>
            <span className="sx6-scaffold__tag">Preview scaffold</span>
            §05 The Praṇava Journey ends on this ground — the section starts below
          </p>
        </div>
        <Sx6Founder />
        <div className="sx6-scaffold sx6-scaffold--below" aria-hidden="true">
          <p>
            <span className="sx6-scaffold__tag">Preview scaffold</span>
            §07 Faculty would continue here
          </p>
        </div>
      </main>
    </>
  );
}
