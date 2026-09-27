import { SiteNav } from '@/components/SiteNav';
import { SX1CHero } from '@/components/preview/sx1c/Hero';
import { SX1CMotion } from '@/components/preview/sx1c/Motion';

/**
 * PREVIEW · SX1C — the Praṇava About hero, concept C: TYPE IS THE STRUCTURE.
 *
 * Rendered as it would sit on /about/: the paper pill above (`light`, because this hero is
 * paper), the hero, and then a screen and more of plain paper below so the section's foot
 * and its scroll are judged against real ground. The ground is NOT a design for the
 * Introduction, which belongs to someone else; it is one line of harness type and space.
 *
 * The hero owns the page's single <h1>. Nothing else on this route is a heading.
 */
export const metadata = {
  title: 'About hero — concept SX1C',
  robots: { index: false, follow: false },
};

export default function PreviewSX1CPage() {
  return (
    <>
      <SiteNav light />
      <main className="sx1c-page">
        <SX1CHero />
        <div className="sx1c-ground" aria-label="Preview harness" role="note">
          <p className="sx1c-ground__note">Preview ground · the Introduction follows here</p>
        </div>
      </main>
      <SX1CMotion />
    </>
  );
}
