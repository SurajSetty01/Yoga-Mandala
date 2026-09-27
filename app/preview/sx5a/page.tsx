import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Journey } from '@/components/preview/sx5a/Journey';
import { JourneyMotion } from '@/components/preview/sx5a/JourneyMotion';

/**
 * ISOLATED PREVIEW — About §05 The Praṇava Journey, concept A (photography leads).
 *
 * Only `app/preview/sx5a/`, `components/preview/sx5a/` and `styles/preview-sx5a.css` belong
 * to this concept; the one line added to app/globals.css is this concept's stylesheet
 * import, written after the file existed. /about/ and every other route are untouched.
 *
 * WHAT IS HERE THAT IS NOT THE SECTION, AND WHY — both bands say "Preview scaffold" in the
 * render so nobody reads them as captions:
 *  · <SiteNav light />, the pill in its paper treatment, so the pinned stage is judged with
 *    the pill actually over it;
 *  · a warm band above: §04 How We Teach precedes this section on the warm ground, which is
 *    why this one is on the reversed ground — neighbours never share a ground;
 *  · a paper band below, a screen tall: §06 Founder follows on paper, and the last room is
 *    released by the page sliding up over it, which can only be judged if the page goes on.
 *
 * The real page's one <h1> belongs to the About hero, which this route does not own; the
 * page still needs exactly one, so it carries the client's page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx5a — The Praṇava Journey',
  description:
    'Isolated preview of Praṇava About §05: four rooms, each with a door cut into its wall that already shows the next, walked through one after another.',
};

export default function PreviewSx5a() {
  return (
    <>
      <SiteNav light />
      <main className="sx5a-page" id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx5a-scaffold">
          <p>
            <span className="sx5a-scaffold__tag">Preview scaffold</span>
            §04 How we teach ends on this ground — the section starts below
          </p>
        </div>
        <Journey />
        <div className="sx5a-scaffold sx5a-scaffold--paper">
          <p>
            <span className="sx5a-scaffold__tag">Preview scaffold</span>
            §06 The founder would continue here
          </p>
        </div>
      </main>
      <JourneyMotion />
    </>
  );
}
