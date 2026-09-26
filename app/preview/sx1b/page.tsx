import { SiteNav } from '@/components/SiteNav';
import { Hero } from '@/components/preview/sx1b/Hero';

/**
 * TOURNAMENT PREVIEW — the Praṇava About page's HERO, concept sx1b: "THE STILL CENTRE".
 *
 * Isolated on its own route so four concepts can be judged side by side. Every selector is
 * namespaced `sx1b-` in styles/preview-sx1b.css — the prefix was grepped across the
 * repository before it was used — and nothing outside app/preview/sx1b/,
 * components/preview/sx1b/ and that stylesheet is touched.
 *
 * THIS ROUTE SHIPS NO JAVASCRIPT OF ITS OWN. `SiteNav` is a client component because the
 * menu sheet needs one; the hero is not. There is no scroll listener, no observer and no
 * effect anywhere in the section, so the JS-disabled render and the JS-enabled render are
 * the same pixels.
 *
 * <SiteNav light /> is included because the section has to be judged under the navigation
 * it will actually live beneath: `light` is the paper treatment, which is the state this
 * hero leaves the pill in from the first pixel, since the section's ground is paper and no
 * text of its own ever sits on a photograph.
 *
 * The ground beneath the hero is preview scaffolding, not part of the section. It exists so
 * the hero's bottom spacing is read against something rather than against the end of the
 * document.
 */
export const metadata = {
  title: 'About Praṇava — hero, concept sx1b',
  description: 'Tournament preview: the About hero as a corridor with a still centre.',
};

export default function Sx1bPreview() {
  return (
    <div className="sx1b-page">
      <SiteNav light />
      <main id="top">
        <Hero />

        <div className="sx1b-after" aria-hidden="true">
          <div className="sx1b-after__inner">
            <p className="sx1b-after__note">Preview ground · the Introduction follows here</p>
            <div className="sx1b-after__line" />
          </div>
        </div>
      </main>
    </div>
  );
}
