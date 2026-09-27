import { SiteNav } from '@/components/SiteNav';
import { Th2Areas } from '@/components/heal/th2/Areas';

/**
 * VERIFICATION ROUTE — /heal/ 01 · What this area will hold (th2), the page's middle section.
 *
 * Above: a plain block painted th1's ground, --ground (paper). Below: a plain block painted
 * th3's ground, also --ground.
 */
export const metadata = {
  title: 'Preview th2 — Heal areas',
  robots: { index: false, follow: false },
};

export default function PreviewTh2() {
  return (
    <>
      <SiteNav light />
      <main className="hl" id="top">
        <div style={{ background: 'var(--ground)', minHeight: '100svh' }} aria-hidden="true" />
        <Th2Areas />
        <div style={{ background: 'var(--ground)', minHeight: '60svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
