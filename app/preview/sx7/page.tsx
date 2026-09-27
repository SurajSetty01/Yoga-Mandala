import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Sx7Faculty } from '@/components/about-pranava/sx7/Faculty';

/**
 * VERIFICATION ROUTE — Praṇava About §07 Faculty, final (base sx7d, grafts from sx7c and
 * sx7a). The section sits between two plain blocks painted the real grounds of its
 * neighbours on /about/: §06 The Founder ends on paper, §08 Praṇava & Seva follows on warm
 * (a screen tall, so the held room can let go and the page continues past it).
 */
export const metadata = {
  title: 'Preview sx7 — Faculty (final)',
  description: 'Verification route for the final Praṇava About §07 Faculty section.',
  robots: { index: false, follow: false },
};

export default function PreviewSx7() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx7-scaffold" aria-hidden="true">
          <p>
            <span className="sx7-scaffold__tag">Preview scaffold</span>
            §06 The Founder ends on this ground — the section starts below
          </p>
        </div>
        <Sx7Faculty />
        <div className="sx7-scaffold sx7-scaffold--below" aria-hidden="true">
          <p>
            <span className="sx7-scaffold__tag">Preview scaffold</span>
            §08 Praṇava &amp; Seva would continue here
          </p>
        </div>
      </main>
    </>
  );
}
