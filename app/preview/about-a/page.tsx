import { SiteNav } from '@/components/SiteNav';
import { Traverse } from '@/components/preview/about-a/Traverse';
import { about } from '@/content/copy';

/**
 * ISOLATED PREVIEW — concept A for the rejected About sections.
 *
 * Nothing outside `app/preview/about-a/`, `components/preview/about-a/` and
 * `styles/preview-about-a.css` is touched: the hero, the approved section 02, SiteNav and
 * every real page are left exactly as they are so three concepts can be judged side by side.
 *
 * <SiteNav /> is here so the pill's dark treatment can be judged against the section it now
 * has to sit over. It is NOT given `light`: this concept opens on the deep ground, because
 * stepping out of the approved cream section above and into a darker room IS the arrival.
 */
export const metadata = { title: 'Preview A — The Room' };

export default function PreviewAboutA() {
  return (
    <>
      <SiteNav />
      <main id="top">
        {/* The real page's one <h1> lives in the hero, which this route does not own. The
            page still needs exactly one, so it carries the client's own page title. */}
        <h1 className="sr">{about.title}</h1>
        <Traverse />
      </main>
    </>
  );
}
