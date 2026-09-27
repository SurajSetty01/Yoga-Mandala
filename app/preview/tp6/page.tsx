import { SiteNav } from '@/components/SiteNav';
import { Tp6Retreats } from '@/components/practice/tp6/Retreats';

/**
 * VERIFICATION ROUTE — Practice §05 Retreats and immersions, final section.
 *
 * The section between two plain blocks painted the grounds of its neighbours on /practice/:
 * tp5 above on paper, tp7 below on warm. The page's one <h1> belongs to the Practice hero,
 * which this route does not own, so it carries a title, visually hidden.
 */
export const metadata = {
  title: 'Preview tp6 — Retreats and immersions (final)',
  description:
    'Verification route for Practice §05: the sentence stands alone, four frames close in from the four edges, and the intention lands in the clearing.',
};

export default function PreviewTp6() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Practice</h1>
        <div className="tp6-scaffold">
          <p>tp5 ends on this ground</p>
        </div>
        <Tp6Retreats />
        <div className="tp6-scaffold tp6-scaffold--warm">
          <p>tp7 continues on this ground</p>
        </div>
      </main>
    </>
  );
}
