import { SiteNav } from '@/components/SiteNav';
import { IntroC } from '@/components/preview/intro-c/Intro';
import { IntroCMotion } from '@/components/preview/intro-c/Motion';

/**
 * TOURNAMENT PREVIEW — the Introduction of the Praṇava About page, concept C.
 *
 * Rendered the way it would arrive in the page rather than on a bare harness: the navigation
 * pill above it (carrying `light`, because on the real page the pill has already inverted to
 * paper by the time §01 is reached), a band of the page's own ground above it so the section
 * is entered rather than landed on, and enough ground beneath it that its bottom spacing
 * reads true instead of being held up by the end of the document.
 *
 * The `<h1>` is visually hidden. On the real page the hero owns it and this section is an
 * `<h2>` beneath; changing the level for the preview would misjudge the type scale, so the
 * harness supplies the missing one instead.
 */
export const metadata = {
  title: 'About · Introduction — concept C',
  robots: { index: false, follow: false },
};

export default function IntroConceptCPage() {
  return (
    <>
      <SiteNav light />
      <main className="ic-page" id="top">
        <h1 className="sr">About Pranava</h1>
        <div className="ic-above" aria-hidden="true" />
        <IntroC />
        <div className="ic-below" aria-hidden="true" />
      </main>
      <IntroCMotion />
    </>
  );
}
