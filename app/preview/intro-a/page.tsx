import { SiteNav } from '@/components/SiteNav';
import { Introduction } from '@/components/preview/intro-a/Introduction';
import { IntroMotion } from '@/components/preview/intro-a/IntroMotion';
import { about } from '@/content/pranava';

/**
 * ISOLATED PREVIEW — concept A for the Introduction of the Praṇava About page.
 *
 * Nothing outside `app/preview/intro-a/`, `components/preview/intro-a/` and
 * `styles/preview-intro-a.css` is touched, so three concepts can be built and judged
 * concurrently without colliding.
 *
 * The section is rendered the way the page would render it rather than on its own in a
 * void: `<SiteNav light />` — the paper treatment, which is what /about/ passes it —
 * stands above a band of the page's own ground, and the deep ground of the section that
 * follows it on the real page (§02, "an enlargement you cannot place") closes the route,
 * so the section's own padding and the seam beneath it both read true.
 */
export const metadata = { title: 'Preview A — the room is behind the page' };

export default function PreviewIntroA() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        {/* The real page's one <h1> lives in the hero, which this route does not own; the
            page still needs exactly one, so it carries the client's own page heading. */}
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="ia-lede" aria-hidden="true" />
        <Introduction />
        {/* the ground of the section that follows on the real page */}
        <div className="ia-next" aria-hidden="true" />
      </main>
      <IntroMotion />
    </>
  );
}
