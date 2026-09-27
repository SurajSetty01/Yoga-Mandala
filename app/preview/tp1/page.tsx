import { SiteNav } from '@/components/SiteNav';
import { PracticeHero } from '@/components/practice/tp1/PracticeHero';

/**
 * VERIFICATION ROUTE — /practice/ hero (tp1), in the page's own context: the light nav
 * pill over it, the `.pc` page root around it, and the paper ground of the section that
 * follows it (tp2) below. Nothing sits above the hero on the real page, so nothing does
 * here. The hero carries the page's one <h1>.
 */
export const metadata = {
  title: 'Preview tp1 — Practice hero',
};

export default function PreviewTp1() {
  return (
    <>
      <SiteNav light />
      <main className="pc" id="top">
        <PracticeHero />
        <div
          style={{
            background: 'var(--ground)',
            color: 'var(--ink-soft)',
            minHeight: '110svh',
            padding: '4rem var(--rail)',
            font: '400 0.9rem/1.5 var(--font-text)',
          }}
        >
          <p style={{ margin: 0 }}>Preview scaffold · the next section (tp2) continues here, on paper</p>
        </div>
      </main>
    </>
  );
}
