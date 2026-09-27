import { SiteNav } from '@/components/SiteNav';
import { Tl6Choose } from '@/components/learn/tl6/Choose';

/**
 * VERIFICATION ROUTE — Learn §05 How to choose (final tl6). The section sits between two
 * plain blocks painted the real grounds of its neighbours on /learn/: the named programmes
 * (tl5) end on --ground-deep above, and Begin (tl7) follows on --ground-deep below.
 */
export const metadata = {
  title: 'Preview tl6 — How to choose',
  description: 'Verification route for the final Learn §05 How to choose section.',
  robots: { index: false, follow: false },
};

export default function PreviewTl6() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Learn</h1>
        <div className="tl6-scaffold" aria-hidden="true">
          <p>Preview scaffold · the named programmes end on this ground</p>
        </div>
        <Tl6Choose />
        <div className="tl6-scaffold tl6-scaffold--below" aria-hidden="true">
          <p>Preview scaffold · Begin would continue here</p>
        </div>
      </main>
    </>
  );
}
