import { SiteNav } from '@/components/SiteNav';
import { Tl7Begin } from '@/components/learn/tl7/Begin';

/**
 * VERIFICATION ROUTE — /learn/ section 07, Begin where you are (tl7).
 *
 * The section between two plain blocks painted the real grounds of its neighbours on
 * /learn/: cream above (tl6) and deep below (the Next strip, then the footer). The page's
 * one <h1> belongs to the Learn masthead, which this route does not own, so it carries a
 * visually hidden one.
 */
export const metadata = {
  title: 'Preview tl7 — Begin where you are',
  robots: { index: false, follow: false },
};

export default function PreviewTl7() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Learn</h1>
        <div style={{ background: 'var(--ground)', minHeight: '90svh' }} aria-hidden="true" />
        <Tl7Begin />
        <div style={{ background: 'var(--ground-deep)', minHeight: '60svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
