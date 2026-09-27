import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { PranavaJourney } from '@/components/about-pranava/sx5/PranavaJourney';

/**
 * VERIFICATION ROUTE — About §05 The Praṇava Journey, final section.
 *
 * The section between two plain blocks painted the grounds of its neighbours on /about/:
 * How We Teach above on the warm ground, the Founder below on paper. The lower block is
 * long enough that the clip's release a screen past the section can be seen to happen.
 * The page's one <h1> belongs to the About hero, which this route does not own, so it
 * carries the page title, visually hidden.
 */
export const metadata = {
  title: 'Preview sx5 — The Praṇava Journey (final)',
  description:
    'Verification route for Praṇava About §05: an enfilade of four rooms walked through one doorway at a time.',
};

export default function PreviewSx5() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <div className="sx5-scaffold">
          <p>§04 How we teach ends on this ground</p>
        </div>
        <PranavaJourney />
        <div className="sx5-scaffold sx5-scaffold--paper">
          <p>§06 The founder continues on this ground</p>
        </div>
      </main>
    </>
  );
}
