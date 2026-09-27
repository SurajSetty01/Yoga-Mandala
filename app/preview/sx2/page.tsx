import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { AboutIntroduction } from '@/components/about-pranava/sx2/Introduction';

/**
 * Verification route for the final About §01, Introduction. The section sits between two
 * plain blocks painted the grounds of its real neighbours on /about/: the hero above
 * (paper, --ground, the ground of three of the four hero concepts; it carries the page's
 * one <h1>, off-screen) and "What Pranava is" below (--ground-deep #12201A).
 */
export const metadata = {
  title: 'Preview sx2 — Introduction',
  robots: { index: false, follow: false },
};

export default function PreviewSx2() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <div style={{ background: 'var(--ground)', height: '40vh' }}>
          <h1 className="sr">{about.hero.heading}</h1>
        </div>
        <AboutIntroduction />
        <div style={{ background: 'var(--ground-deep)', height: '60vh' }} />
      </main>
    </>
  );
}
