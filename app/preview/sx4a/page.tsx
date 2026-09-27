import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { TestStrip } from '@/components/preview/sx4a/TestStrip';
import { Sx4aMotion } from '@/components/preview/sx4a/Sx4aMotion';

/**
 * ISOLATED PREVIEW — About §04 How We Teach, concept A (photography leads).
 *
 * Nothing outside `app/preview/sx4a/`, `components/preview/sx4a/` and
 * `styles/preview-sx4a.css` is touched; the one line added to app/globals.css is this
 * concept's own stylesheet import, written after the file existed.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands are labelled "Preview
 * scaffold" in the render so nobody reads them as captions:
 *  · <SiteNav light /> — the pill in its paper treatment, so the pinned stage's top
 *    clearance is judged with the pill actually over it;
 *  · a paper band above: §03 Our Approach precedes this section and its concepts sit on
 *    paper, which is why this one is on the warm ground — neighbours never share a ground;
 *  · a deep band below: §05 The Praṇava Journey follows on the deep ground, and the long
 *    pinned stage has to be judged with the page continuing after it, not ending.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx4a — How We Teach',
  description:
    'Isolated preview of Praṇava About §04 How We Teach: one photograph exposed as a darkroom test strip, one band per practice, then printed whole.',
};

export default function PreviewSx4a() {
  return (
    <>
      <SiteNav light />
      <main className="sx4a-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>

        <div className="sx4a-scaffold">
          <div className="sx4a-rail">
            <p>
              <span className="sx4a-scaffold__tag">Preview scaffold</span>
              §03 Our Approach ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <TestStrip />

        <div className="sx4a-scaffold sx4a-scaffold--deep">
          <div className="sx4a-rail">
            <p>
              <span className="sx4a-scaffold__tag">Preview scaffold</span>
              §05 The Praṇava Journey would continue here
            </p>
          </div>
        </div>
      </main>
      <Sx4aMotion />
    </>
  );
}
