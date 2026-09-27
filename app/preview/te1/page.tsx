import { SiteNav } from '@/components/SiteNav';
import { EventsMasthead } from '@/components/events/te1/Masthead';

/**
 * VERIFICATION ROUTE — /events/ masthead, final build.
 *
 * The section is the page top on /events/, so nothing sits above it but the nav pill
 * (rendered `light`). Below it the record strip runs on --ground-deep, then the route
 * section on --ground-warm; both are painted here as plain blocks.
 */
export const metadata = {
  title: 'Preview te1 — Events masthead',
  description: 'Nothing is scheduled at the moment.',
};

const scaffold = {
  padding: '10svh 0 70svh',
  font: '600 11px/1.4 var(--font-text)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
};

export default function PreviewTe1() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <EventsMasthead />
        <div
          className="te1-preview-deep"
          style={{ ...scaffold, background: 'var(--ground-deep)', color: 'var(--ink-onDark-soft)' }}
        >
          <p style={{ margin: 0 }}>Preview scaffold · the record strip continues on this ground</p>
        </div>
        <div style={{ ...scaffold, padding: '8svh 0', background: 'var(--ground-warm)', color: 'var(--ink-soft)' }}>
          <p style={{ margin: 0 }}>Preview scaffold · the route section</p>
        </div>
      </main>
    </>
  );
}
