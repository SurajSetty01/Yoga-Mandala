import { SiteNav } from '@/components/SiteNav';
import { Hero } from '@/components/preview/sx1b/Hero';

/**
 * TOURNAMENT PREVIEW — the Praṇava About page's HERO, concept sx1b:
 * "THE BOOK THAT OPENS AS IT IS READ".
 *
 * Isolated on its own route so four concepts can be judged side by side. Every selector is
 * namespaced `sx1b-` in styles/preview-sx1b.css, and nothing outside app/preview/sx1b/,
 * components/preview/sx1b/ and that stylesheet is touched.
 *
 * <SiteNav light /> because the hero's ground is paper-family from its first pixel and no
 * text of its own ever sits on a photograph, so the pill takes its paper treatment at once.
 *
 * The ground beneath the hero is preview scaffolding, not part of the section: a paper band
 * standing in for the Introduction, then the deep ground of the client-approved "What
 * Praṇava is", so the hero's bottom edge and its handover are judged against something real
 * rather than against the end of the document.
 */
export const metadata = {
  title: 'About Praṇava — hero, concept sx1b',
  description: 'Tournament preview: the About hero as a folding book that opens as it is read.',
};

export default function Sx1bPreview() {
  return (
    <div className="sx1b-page">
      <SiteNav light />
      <main id="top">
        <Hero />

        <div className="sx1b-after" aria-hidden="true">
          <div className="sx1b-after__paper">
            <p className="sx1b-after__note">Preview ground · the Introduction follows here</p>
          </div>
          <div className="sx1b-after__deep">
            <p className="sx1b-after__note sx1b-after__note--deep">
              Preview ground · What Praṇava is (deep)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
