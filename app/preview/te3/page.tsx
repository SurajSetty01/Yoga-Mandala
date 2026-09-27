import { SiteNav } from '@/components/SiteNav';
import { Te3Next } from '@/components/events/te3/Next';

/**
 * VERIFICATION ROUTE — Events §02 Hearing about the next one, final section.
 *
 * The section between two plain blocks painted the grounds of its neighbours on /events/:
 * te2 above on deep, the SiteFooter below on deep. The page's one <h1> belongs to the
 * Events masthead, which this route does not own, so it carries a title, visually hidden.
 */
export const metadata = {
  title: 'Preview te3 — Hearing about the next one (final)',
  description:
    'Verification route for Events §02: the next frame in the record is blank, and it is the way to ask.',
};

export default function PreviewTe3() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">Events</h1>
        <div className="te3-scaffold">
          <p>te2 ends on this ground</p>
        </div>
        <Te3Next />
        <div className="te3-scaffold">
          <p>the SiteFooter continues on this ground</p>
        </div>
      </main>
    </>
  );
}
