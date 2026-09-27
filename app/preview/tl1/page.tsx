import { SiteNav } from '@/components/SiteNav';
import { Tl1Masthead } from '@/components/learn/tl1/Masthead';

/**
 * VERIFICATION ROUTE — /learn/ masthead (tl1), the page's first section and its one <h1>.
 *
 * Nothing sits above it (it is the page top, under the fixed pill). Below it is a plain block
 * painted tl2's ground, --ground-warm, so the hand-off between the two is judged here.
 */
export const metadata = {
  title: 'Preview tl1 — Learn masthead',
  robots: { index: false, follow: false },
};

export default function PreviewTl1() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <Tl1Masthead />
        <div style={{ background: 'var(--ground-warm)', minHeight: '120svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
