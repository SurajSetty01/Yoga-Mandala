import { SiteNav } from '@/components/SiteNav';
import { MarkedPassages } from '@/components/insights/ti2/MarkedPassages';

/**
 * VERIFICATION ROUTE — /insights/ 01 The kind of thinking that will be here, final build.
 *
 * The section between two plain blocks painted the real grounds of its neighbours on
 * /insights/: the masthead above is on --ground-deep; section 02 below is on --ground-warm.
 * The page's one <h1> belongs to the masthead, so it is carried here visually hidden.
 */
export const metadata = {
  title: 'Preview ti2 — The kind of thinking that will be here',
  description: 'Verification route for the Insights reading section.',
};

const scaffold = {
  padding: '28svh 0 8svh',
  font: '600 11px/1.4 var(--font-text)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
};

export default function PreviewTi2() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Insights</h1>
        <div style={{ ...scaffold, background: 'var(--ground-deep)', color: 'var(--ink-onDark-soft)' }}>
          <p style={{ margin: 0, textAlign: 'center' }}>Preview scaffold · the masthead ends on this ground</p>
        </div>

        <MarkedPassages />

        <div
          style={{
            ...scaffold,
            padding: '8svh 0 60svh',
            background: 'var(--ground-warm)',
            color: 'var(--ink-soft)',
          }}
        >
          <p style={{ margin: 0, textAlign: 'center' }}>Preview scaffold · section 02 continues on this ground</p>
        </div>
      </main>
    </>
  );
}
