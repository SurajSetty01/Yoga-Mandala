import { SiteNav } from '@/components/SiteNav';
import { Tp3Regular } from '@/components/practice/tp3/Regular';

/**
 * VERIFICATION ROUTE — Practice §02 Regular practice, final section.
 *
 * The section between two plain blocks painted the grounds of its neighbours on /practice/:
 * tp2 above on paper, tp4 below on deep. The page's one <h1> belongs to the Practice hero,
 * which this route does not own, so it carries a title, visually hidden.
 */
export const metadata = {
  title: 'Preview tp3 — Regular practice (final)',
  description:
    'Verification route for Practice §02: four nouns, four steps closer, one hard cut for each.',
};

export default function PreviewTp3() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Practice</h1>
        <div className="tp3-scaffold">
          <p>tp2 ends on this ground</p>
        </div>
        <Tp3Regular />
        <div className="tp3-scaffold tp3-scaffold--deep">
          <p>tp4 continues on this ground</p>
        </div>
      </main>
    </>
  );
}
