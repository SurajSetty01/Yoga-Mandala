import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { WhatIs } from '@/components/about-pranava/WhatIs';
import { Introduction } from '@/components/preview/sx2b/Introduction';

/**
 * TOURNAMENT PREVIEW — Praṇava About, section 01 "Introduction", concept B.
 *
 * The section under the navigation it will live beneath (`light` is the state the hero
 * leaves the pill in), and above the REAL section that follows it on /about/ — the
 * approved "What Praṇava is", rendered by its own component on its own #12201A ground —
 * so the seam at the bottom is the seam that will ship, not an imitation of it. That
 * component is imported, not copied or changed; without the About page's motion island
 * it renders in its finished state, which is also what it shows under reduced motion.
 *
 * Styles: styles/preview-sx2b.css, every selector `.sx2b-`.
 */
export const metadata = {
  title: 'Introduction — concept B',
  description:
    'Section preview: the room is brought onto one floor, a sentence at a time.',
};

export default function Sx2bPreview() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        {/*
          The page's one <h1>, visually hidden. On /about/ the hero above this section owns
          it; this route does not render the hero, and a preview with no <h1> would be a
          different document outline from the one being judged.
        */}
        <h1 className="sr">{about.hero.heading}</h1>
        <Introduction />
        <div className="apr">
          <WhatIs />
        </div>
      </main>
    </>
  );
}
