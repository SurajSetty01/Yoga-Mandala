import { SiteNav } from '@/components/SiteNav';
import { Th1Notice } from '@/components/heal/th1/Notice';

/**
 * VERIFICATION ROUTE — /heal/ page hero (th1), the page's first section and its one <h1>.
 *
 * Nothing sits above it (it is the page top, under the light pill). Below it is a plain block
 * painted th2's ground, --ground-warm, so the hand-off between the two is judged here.
 */
export const metadata = {
  title: 'Preview th1 — Heal hero',
  robots: { index: false, follow: false },
};

export default function PreviewTh1() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <Th1Notice />
        <div style={{ background: 'var(--ground-warm)', minHeight: '120svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
