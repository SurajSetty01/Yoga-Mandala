import { SiteNav } from '@/components/SiteNav';
import { Tp4Prayatna } from '@/components/practice/tp4/Prayatna';

/**
 * VERIFICATION ROUTE — /practice/ section 03, Prayatna and related offerings (tp4).
 *
 * The section between two plain blocks painted the real grounds of its neighbours on
 * /practice/: warm above (tp3) and paper below (tp5). The page's one <h1> belongs to the
 * Practice hero, which this route does not own, so it carries a visually hidden one.
 */
export const metadata = {
  title: 'Preview tp4 — Prayatna and related offerings',
  robots: { index: false, follow: false },
};

export default function PreviewTp4() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Practice</h1>
        <div style={{ background: 'var(--ground-warm)', minHeight: '70svh' }} aria-hidden="true" />
        <Tp4Prayatna />
        <div style={{ background: 'var(--ground)', minHeight: '110svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
