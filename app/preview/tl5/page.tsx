import { SiteNav } from '@/components/SiteNav';
import { Tl5Register } from '@/components/learn/tl5/Register';

/**
 * VERIFICATION ROUTE — /learn/ section 04, The named programmes (tl5).
 *
 * The section between two plain blocks painted the real grounds of its neighbours on
 * /learn/: cream above (tl4) and cream below (tl6). The page's one <h1> belongs to the
 * Learn masthead, which this route does not own, so it carries a visually hidden one.
 */
export const metadata = {
  title: 'Preview tl5 — The named programmes',
  robots: { index: false, follow: false },
};

const band = {
  background: 'var(--ground)',
  minHeight: '70svh',
} as const;

export default function PreviewTl5() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Learn</h1>
        <div style={band} aria-hidden="true" />
        <Tl5Register />
        <div style={{ ...band, minHeight: '110svh' }} aria-hidden="true" />
      </main>
    </>
  );
}
