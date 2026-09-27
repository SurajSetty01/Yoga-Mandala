import { SiteNav } from '@/components/SiteNav';
import { Th3Ask } from '@/components/heal/th3/Ask';

/**
 * VERIFICATION ROUTE — /heal/ 02 · Asking about it (th3), the page's last section.
 *
 * Above: a plain block painted th2's ground, --ground-warm. Below: a plain block painted the
 * SiteFooter's dark ground, --ground-deep.
 */
export const metadata = {
  title: 'Preview th3 — Heal enquiry',
  robots: { index: false, follow: false },
};

export default function PreviewTh3() {
  return (
    <>
      <SiteNav light />
      <main className="hl" id="top">
        <div style={{ background: 'var(--ground-warm)', minHeight: '100svh' }} aria-hidden="true" />
        <Th3Ask />
        <div style={{ background: 'var(--ground-deep)', minHeight: '60svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
