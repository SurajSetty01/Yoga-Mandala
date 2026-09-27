import { SiteNav } from '@/components/SiteNav';
import { Ti1Masthead } from '@/components/insights/ti1/Masthead';

/**
 * VERIFICATION ROUTE — /insights/ masthead (ti1), the page's first section and its one <h1>.
 *
 * Nothing sits above it: it is the page top, under the fixed pill. The pill is rendered in its
 * DARK variant here, as it is on /insights/ (the section stays on --ground-deep, so the page
 * file must keep calling <SiteNav /> without `light`). Below it is a plain block painted ti2's
 * ground, --ground (paper), so the hand-off between the two is judged here.
 */
export const metadata = {
  title: 'Preview ti1 — Insights masthead',
  robots: { index: false, follow: false },
};

export default function PreviewTi1() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Ti1Masthead />
        <div style={{ background: 'var(--ground)', minHeight: '120svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
