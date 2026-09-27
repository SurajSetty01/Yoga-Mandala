import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Founder } from '@/components/preview/sx6d/Founder';
import { Motion } from '@/components/preview/sx6d/Motion';

/**
 * ISOLATED PREVIEW — About §06 The Founder, concept D (spatial / compositional).
 *
 * Owned files: this page, components/preview/sx6d/**, styles/preview-sx6d.css, plus the one
 * @import line for that stylesheet in app/globals.css, added after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands are labelled "Preview scaffold":
 *  · <SiteNav light /> — the real pill, so the section's top clearance is judged under it;
 *  · a deep band above: §05 The Praṇava Journey precedes this section on the deep ground,
 *    which is why this one is on paper — neighbours never share a ground;
 *  · a deep band below: §07 Faculty follows on the deep ground, and the motion needs page
 *    after the section to finish against, as it would on the real page.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx6d — The Founder',
  description:
    'Isolated preview of Praṇava About §06 The Founder: one row photographed from both ends becomes the two walls of a corridor, and the founder’s sentence opens out of the point they vanish to.',
};

export default function PreviewSx6d() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx6d-scaffold" aria-hidden="true">
          <p>
            <span className="sx6d-scaffold__tag">Preview scaffold</span>
            §05 The Praṇava Journey ends on this ground — the section starts below
          </p>
        </div>

        <Founder />

        <div className="sx6d-scaffold sx6d-scaffold--below" aria-hidden="true">
          <p>
            <span className="sx6d-scaffold__tag">Preview scaffold</span>
            §07 Faculty would continue here
          </p>
        </div>
      </main>
      <Motion />
    </>
  );
}
