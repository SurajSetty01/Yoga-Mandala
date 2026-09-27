import { SiteNav } from '@/components/SiteNav';
import { Sx1aHero } from '@/components/preview/sx1a/Hero';
import { Sx1aMotion } from '@/components/preview/sx1a/Motion';

/**
 * TOURNAMENT PREVIEW — Praṇava About, HERO, designer A (photography leads).
 *
 * Isolated route. Nothing outside `app/preview/sx1a/`, `components/preview/sx1a/` and
 * `styles/preview-sx1a.css` belongs to it, and every selector in that sheet is `.sx1a-`.
 *
 * `<SiteNav light />` is the real bar, so the pill is judged where it actually lands: over
 * the photograph band, on its own paper ground.
 *
 * Below the hero is scaffold ground only — the Introduction that follows on the real page
 * is being designed separately — so there is a screen of paper for the handoff to read
 * against and enough page for the sticky stage to release. The hero owns the page's
 * single `<h1>`, as it will on /about/.
 */
export const metadata = {
  title: 'Preview · About hero · sx1a',
  robots: { index: false, follow: false },
};

export default function Sx1aPreviewPage() {
  return (
    <>
      <SiteNav light />
      <main className="sx1a-page" id="top">
        <Sx1aHero />
        <div className="sx1a-scaffold" aria-hidden="true" />
      </main>
      <Sx1aMotion />
    </>
  );
}
