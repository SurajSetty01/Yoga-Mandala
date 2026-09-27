import { SiteNav } from '@/components/SiteNav';
import { Tl4Forms } from '@/components/learn/tl4/Forms';

/**
 * VERIFICATION ROUTE — Learn §03 Programme categories, final section.
 *
 * The section between two plain blocks painted the grounds of its neighbours on /learn/:
 * tl3 above and tl5 below, both on --ground-deep. The page's one <h1> belongs to the Learn
 * masthead, which this route does not own, so it carries a title, visually hidden.
 */
export const metadata = {
  title: 'Preview tl4 — Programme categories (final)',
  description:
    'Verification route for Learn §03: five forms arrive scattered, then close into one band under one intention.',
};

export default function PreviewTl4() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Learn</h1>
        <div className="tl4-scaffold">
          <p>tl3 ends on this ground</p>
        </div>
        <Tl4Forms />
        <div className="tl4-scaffold tl4-scaffold--long">
          <p>tl5 continues on this ground</p>
        </div>
      </main>
    </>
  );
}
