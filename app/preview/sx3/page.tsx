import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { OurApproach } from '@/components/about-pranava/sx3/Approach';

/**
 * VERIFICATION ROUTE for the final §03 Our Approach (components/about-pranava/sx3/,
 * styles/sec-sx3.css). Not linked from anywhere.
 *
 * The section stands where it will stand on /about/: inside `main.apr` (the page's type
 * scale and register-mark styles), under the pill in its light treatment, between two plain
 * blocks painted the real grounds of its neighbours: §02 "What Praṇava is" above (deep) and
 * §04 How we teach below (warm). The page's one <h1> belongs to the About hero, which this
 * route does not own, so it carries the page title visually hidden.
 */
export const metadata = {
  title: 'Preview sx3 · Our Approach (final)',
  description: 'Verification route for the final Praṇava About §03 Our Approach.',
};

export default function PreviewSx3() {
  return (
    <>
      <SiteNav light />
      <main className="apr" id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div aria-hidden="true" style={{ minHeight: '60svh', background: 'var(--ground-deep)' }} />
        <OurApproach />
        <div aria-hidden="true" style={{ minHeight: '60svh', background: 'var(--ground-warm)' }} />
      </main>
    </>
  );
}
