import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Faculty } from '@/components/preview/sx7a/Faculty';
import { Sx7aMotion } from '@/components/preview/sx7a/Motion';

/**
 * TOURNAMENT PREVIEW — Praṇava About, FACULTY, designer A (photography leads).
 *
 * Isolated route. Owned files: this page, components/preview/sx7a/**, styles/preview-sx7a.css
 * and its one @import in app/globals.css. Every selector in that sheet is `.sx7a-`.
 *
 * What is here that is NOT the section, and why — both bands say "Preview scaffold" in the
 * render so nobody reads them as design:
 *  · <SiteNav light /> — the pill as it is by this point on /about/, so the pinned pane is
 *    judged with the real bar crossing it;
 *  · a paper band above: §06 The Founder ends on paper, so the seam into this deep section
 *    is the real one;
 *  · a warm band below, over a screen tall: Praṇava & Seva follows on warm, and the stage
 *    only lets go once the section's end has passed, so the page must continue past it.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * route still needs exactly one, so it carries the page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx7a — Faculty',
  description:
    'Isolated preview of Praṇava About · Faculty: five photographs registered on the student, in which the teacher’s hand lets go, frame by frame.',
  robots: { index: false, follow: false },
};

export default function PreviewSx7a() {
  return (
    <>
      <SiteNav light />
      <main className="sx7a-page" id="top">
        <h1 className="sx7a-sr">{about.hero.heading}</h1>

        <div className="sx7a-scaffold">
          <p>
            <span className="sx7a-scaffold__tag">Preview scaffold</span>
            §06 The Founder ends on this paper ground — Faculty starts below
          </p>
        </div>

        <Faculty />

        <div className="sx7a-scaffold sx7a-scaffold--after">
          <p>
            <span className="sx7a-scaffold__tag">Preview scaffold</span>
            Praṇava &amp; Seva would continue here, on the warm ground
          </p>
        </div>
      </main>
      <Sx7aMotion />
    </>
  );
}
