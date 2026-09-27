import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Journey } from '@/components/preview/sx5c/Journey';
import { Motion } from '@/components/preview/sx5c/Motion';

/**
 * ISOLATED PREVIEW — About §05 The Praṇava Journey, concept C (type is the structure).
 *
 * Nothing outside app/preview/sx5c/, components/preview/sx5c/ and styles/preview-sx5c.css
 * is touched, apart from the one @import line in app/globals.css — added only after the
 * stylesheet existed, because an import of a missing file returns 500 for every route.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands say "Preview scaffold" in the
 * render so nobody reads them as captions:
 *  · <SiteNav light /> — the pill in its paper treatment, as it is by this point on /about/;
 *  · a warm band above: §04 How We Teach sits on the warm ground in the page's plan, which
 *    is why this section is on the deep one — neighbours never share a ground;
 *  · a paper band below: §06 Founder follows on paper, and the last door has to be judged
 *    with the page continuing after it, not ending.
 *
 * The page's one <h1> belongs to the About hero, which this route does not own; it carries
 * the client's page title, visually hidden, so the page still has exactly one.
 */
export const metadata = {
  title: 'Preview sx5c — The Praṇava Journey',
  description:
    'Isolated preview of Praṇava About §05: four names set at the size of doors, each parting where it is cut to show the room it leads to, its sentence hung beneath the room as the plate’s caption.',
};

export default function PreviewSx5c() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sx5c-sr">{about.hero.heading}</h1>

        <div className="sx5c-scaffold">
          <div className="sx5c-rail">
            <p>
              <span className="sx5c-scaffold__tag">Preview scaffold</span>
              §04 How We Teach ends on this ground — the section starts below
            </p>
          </div>
        </div>

        <Journey />

        <div className="sx5c-scaffold sx5c-scaffold--paper">
          <div className="sx5c-rail">
            <p>
              <span className="sx5c-scaffold__tag">Preview scaffold</span>
              §06 Founder would continue here, on paper
            </p>
          </div>
        </div>
      </main>
      <Motion />
    </>
  );
}
