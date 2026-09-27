import { SiteNav } from '@/components/SiteNav';
import { Tp5Pranayama } from '@/components/practice/tp5/Pranayama';

/**
 * VERIFICATION ROUTE — Practice §04 Prāṇāyāma, final section.
 *
 * The section between two plain blocks painted the grounds of its neighbours on /practice/:
 * tp4 above on deep, tp6 below on deep. `main.pc` reproduces the page wrapper, so the
 * page's own `.pc img` rules are in force here as they will be there. The page's one <h1>
 * belongs to the Practice hero, which this route does not own, so it is visually hidden.
 */
export const metadata = {
  title: 'Preview tp5 — Prāṇāyāma (final)',
  description:
    'Verification route for Practice §04: leaves moving above, a group seated still below, the word between.',
};

export default function PreviewTp5() {
  return (
    <>
      <SiteNav light />
      <main className="pc" id="top">
        <h1 className="sr">Practice</h1>
        <div className="tp5-scaffold">
          <p>tp4 ends on this ground</p>
        </div>
        <Tp5Pranayama />
        <div className="tp5-scaffold">
          <p>tp6 continues on this ground</p>
        </div>
      </main>
    </>
  );
}
