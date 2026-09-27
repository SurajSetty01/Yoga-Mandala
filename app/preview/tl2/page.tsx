import { SiteNav } from '@/components/SiteNav';
import { journeys } from '@/content/pranava';
import { LearningOverTime } from '@/components/learn/tl2/LearningOverTime';

/**
 * VERIFICATION ROUTE — /learn/ 01 What structured learning means, final build.
 *
 * The section between two plain blocks painted the real grounds of its neighbours on
 * /learn/: the masthead above ends on --ground (#FBF7F2); section 02 below is on
 * --ground-deep. The page's one <h1> belongs to the masthead, so it is carried here
 * visually hidden.
 */
export const metadata = {
  title: 'Preview tl2 — What structured learning means',
  description: journeys.learn.indicative,
};

const scaffold = {
  padding: '28svh 0 8svh',
  font: '600 11px/1.4 var(--font-text)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
};

export default function PreviewTl2() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Learn</h1>
        <div style={{ ...scaffold, background: 'var(--ground)', color: 'var(--ink-soft)' }}>
          <p style={{ margin: 0, textAlign: 'center' }}>Preview scaffold · the masthead ends on this ground</p>
        </div>

        <LearningOverTime />

        <div
          style={{
            ...scaffold,
            padding: '8svh 0 60svh',
            background: 'var(--ground-deep)',
            color: 'var(--ink-onDark-soft)',
          }}
        >
          <p style={{ margin: 0, textAlign: 'center' }}>Preview scaffold · section 02 continues on this ground</p>
        </div>
      </main>
    </>
  );
}
