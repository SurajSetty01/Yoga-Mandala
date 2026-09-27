import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Leaf } from '@/components/preview/sx7c/Leaf';
import { LeafMotion } from '@/components/preview/sx7c/LeafMotion';

/**
 * ISOLATED PREVIEW — About §07 Faculty, concept C (type is the structure).
 *
 * Nothing outside `app/preview/sx7c/`, `components/preview/sx7c/` and
 * `styles/preview-sx7c.css` is touched; the one line in app/globals.css is this concept's
 * own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION — both bands are labelled "Preview scaffold":
 *  · a paper band above: §06 The Founder ends on paper, which is why this one is deep.
 *    It is a screen tall because on the real page this section is far down, so the leaf
 *    arrives from below with its column still closed. A short band would load it
 *    half-open and the preview would hide the mechanic it exists to show;
 *  · a warm band below: §08 Praṇava Seva Trust follows on the warm ground, and the leaf
 *    has to be seen ending at a real seam, not at the bottom of the document.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx7c — Faculty',
  description:
    'Isolated preview of Praṇava About §07 Faculty: a root text and its commentary, set as one tripāṭha leaf whose binding column opens into its one picture.',
};

export default function PreviewSx7c() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx7c-scaffold sx7c-scaffold--above">
          <div className="sx7c-scaffold__rail">
            <p>
              <span className="sx7c-scaffold__tag">Preview scaffold</span>
              §06 The Founder ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Leaf />

        <div className="sx7c-scaffold sx7c-scaffold--warm">
          <div className="sx7c-scaffold__rail">
            <p>
              <span className="sx7c-scaffold__tag">Preview scaffold</span>
              §08 Praṇava Seva Trust would continue here
            </p>
          </div>
        </div>
      </main>
      <LeafMotion />
    </>
  );
}
