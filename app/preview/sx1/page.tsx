import { SiteNav } from '@/components/SiteNav';
import { AboutHero } from '@/components/about-pranava/sx1/AboutHero';

/**
 * VERIFICATION ROUTE — the final About §01 Hero, as it will sit on /about/: the light nav
 * pill above it, and below it a plain block painted the Introduction's ground (--ground),
 * so the seam and the scroll-away can be judged. The hero is first on the page, so nothing
 * stands above it but the nav.
 */
export const metadata = {
  title: 'Preview · About hero · final (sx1)',
  robots: { index: false, follow: false },
};

export default function Sx1PreviewPage() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <AboutHero />
        <div className="sx1-pv-next" aria-hidden="true" />
      </main>
    </>
  );
}
