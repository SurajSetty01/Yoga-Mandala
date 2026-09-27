import { SiteNav } from '@/components/SiteNav';
import { Te2Record } from '@/components/events/te2/Record';

/**
 * VERIFICATION ROUTE — Events §01 What has happened here (final te2). The section sits
 * between two plain blocks painted the real grounds of its neighbours on /events/: the
 * masthead (te1) on paper above, and the route (te3) on --ground-warm below.
 */
export const metadata = {
  title: 'Preview te2 — What has happened here',
  description: 'Verification route for the final Events §01 section.',
  robots: { index: false, follow: false },
};

export default function PreviewTe2() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Events</h1>
        <div className="te2-scaffold" aria-hidden="true">
          <p>Preview scaffold · the masthead ends on this ground</p>
        </div>
        <Te2Record />
        <div className="te2-scaffold te2-scaffold--below" aria-hidden="true">
          <p>Preview scaffold · the route to the next one would continue here</p>
        </div>
      </main>
    </>
  );
}
