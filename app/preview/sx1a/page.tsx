import { SiteNav } from '@/components/SiteNav';
import { Sx1aHero } from '@/components/preview/sx1a/Hero';

/**
 * TOURNAMENT PREVIEW — Praṇava About, HERO only, concept SX1A.
 *
 * Isolated route. Nothing outside `app/preview/sx1a/`, `components/preview/sx1a/` and
 * `styles/preview-sx1a.css` is touched, and every selector in that sheet is `.sx1a-`.
 *
 * `<SiteNav light />` is the real bar, so the pill can be judged where it actually lands:
 * on paper, over the masthead, for the whole of this hero — which is one screen, so the
 * pill never has to negotiate with a photograph.
 *
 * The band below the hero is scaffold. It is DEEP GREEN because that is what the live
 * /about/ page does next — its first section is `.apr-s--deep` and its §02 is a full-bleed
 * landscape group shot of a hall. The handoff a hero here has to make is paper → dark
 * green, and it cannot be judged against more paper.
 *
 * The hero owns the page's single `<h1>`, as it does on the real page.
 */
export const metadata = {
  title: 'About Praṇava — hero, concept SX1A',
  robots: { index: false, follow: false },
};

export default function Sx1aPreviewPage() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <Sx1aHero />
        <div className="sx1a-after">
          <p className="sx1a-note">Preview scaffold — the Introduction follows here</p>
        </div>
      </main>
    </>
  );
}
