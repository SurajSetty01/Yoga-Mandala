import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Hero } from '@/components/preview/sx1d/Hero';
import { HeroMotion } from '@/components/preview/sx1d/HeroMotion';

/**
 * PREVIEW · sx1d — the Praṇava About hero, designer D (spatial / compositional).
 *
 * "The walls are the words." One photograph of the TTC hall with its walls taken away: the
 * red floor and the five practitioners on it stand in front of the page's own green, and the
 * page's words are written on that green where the walls were. The heads of the furthest
 * four cross the foot of "Pranava". As the hero scrolls away the room swells about its far
 * corner and rises, and they pass up through the name.
 *
 * Rendered as it would sit on /about/: the light nav pill above, and below it a plain ground
 * standing in for the Introduction so the seam and the scroll-away can be judged honestly.
 */
export const metadata = { title: 'Preview sx1d — The walls are the words' };

export default function PreviewSx1d() {
  return (
    <>
      <SiteNav light />
      <main id="top">
        <Hero />

        {/*
          GROUND, NOT DESIGN. The Introduction is another designer's section; this band only
          gives the hero a real seam and enough scroll for its motion to be seen. Its two
          lines are the client's first two Introduction sentences, set plainly.
        */}
        <section className="sx1d-after" aria-label="The page continues">
          <div className="sx1d-after__in">
            <p>{about.intro[0]}</p>
            <p>{about.intro[1]}</p>
          </div>
        </section>
      </main>
      <HeroMotion />
    </>
  );
}
