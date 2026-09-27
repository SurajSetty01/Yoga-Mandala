import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { HowWeTeach } from '@/components/about-pranava/sx4/HowWeTeach';

/**
 * VERIFICATION ROUTE — About §04 How We Teach, final. The section between two plain blocks
 * painted the real grounds of its neighbours on /about/: §03 Our Approach on paper above,
 * §05 The Praṇava Journey on the deep ground below. The page's one <h1> belongs to the
 * About hero, which this route does not own, so it carries the page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx4 — How We Teach',
  description: 'Verification route for the final About §04 How We Teach section.',
  robots: { index: false, follow: false },
};

export default function PreviewSx4() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sx4-sr">{about.hero.heading}</h1>

        <div className="sx4-seam sx4-seam--above">
          <div className="sx4-rail">
            <p>
              <span className="sx4-seam__tag">Preview scaffold</span>
              §03 Our Approach ends on this ground
            </p>
          </div>
        </div>

        <HowWeTeach />

        <div className="sx4-seam sx4-seam--below">
          <div className="sx4-rail">
            <p>
              <span className="sx4-seam__tag">Preview scaffold</span>
              §05 The Praṇava Journey continues here
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
