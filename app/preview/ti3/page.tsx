import { SiteNav } from '@/components/SiteNav';
import { Ti3Told } from '@/components/insights/ti3/Told';

/**
 * VERIFICATION ROUTE — /insights/ section 02, When there is something to read (ti3).
 *
 * The section between two plain blocks painted the real grounds of its neighbours on
 * /insights/: paper above (ti2, Passages) and the footer's deep green below. The page's one
 * <h1> belongs to the Insights masthead, which this route does not own, so it carries a
 * visually hidden one.
 */
export const metadata = {
  title: 'Preview ti3 — When there is something to read',
  robots: { index: false, follow: false },
};

export default function PreviewTi3() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Insights</h1>
        <div style={{ background: 'var(--ground)', minHeight: '70svh' }} aria-hidden="true" />
        <Ti3Told />
        <div style={{ background: '#12201A', minHeight: '60svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
