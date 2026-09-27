import { SiteNav } from '@/components/SiteNav';
import { PracticeEnquire } from '@/components/practice/tp7/Enquire';

/**
 * Verification route for the final /practice/ §06, Schedule and enquiry. The section sits
 * between two plain blocks painted the grounds of its real neighbours: §05 above
 * (--ground-deep #12201A; it carries a stand-in for the page's one <h1>) and SiteFooter
 * below (--ground-deep), sized roughly as the footer is so the scroll end is realistic.
 */
export const metadata = {
  title: 'Preview tp7 — Schedule and enquiry',
  robots: { index: false, follow: false },
};

export default function PreviewTp7() {
  return (
    <>
      <SiteNav light />
      <main className="pc" id="top">
        <div style={{ background: 'var(--ground-deep)', height: '80vh' }}>
          <h1 className="sr">Practice</h1>
        </div>
        <PracticeEnquire />
      </main>
      <div style={{ background: 'var(--ground-deep)', height: 520 }} aria-hidden="true" />
    </>
  );
}
