import { about } from '@/content/pranava';
import { site } from '@/content/site';

/**
 * HERO. The client's review: keep the heading and statement, change the image to "Pranav
 * teaching, a teacher with students ... photos under Samskriti & Sadhana with our logo
 * behind". ss-dsc07130 is exactly that: the Praṇava emblem centred on the wall, Praṇav
 * seated beneath it, students in the foreground. The title sits above the picture on paper;
 * the picture runs edge to edge beneath it, framed on the emblem and on him, and closes
 * the section.
 */
export function A3Hero() {
  return (
    <section className="a3-hero" aria-labelledby="a3-hero-h">
      <div className="a3-rail a3-hero__top">
        <div className="a3-hero__title" data-a3r>
          <p className="a3-kicker">{site.descriptor}</p>
          <h1 className="a3-hero__h" id="a3-hero-h">
            {about.hero.heading}
          </h1>
        </div>
        <div className="a3-hero__words" data-a3r style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="a3-hero__sub">{about.hero.sub}</p>
          <p className="a3-hero__support">{about.hero.support}</p>
        </div>
      </div>

      <figure className="a3-hero__pic">
        <img
          src="/media/about-v3/ss-dsc07130-1920.webp"
          srcSet="/media/about-v3/ss-dsc07130-640.webp 640w, /media/about-v3/ss-dsc07130-1280.webp 1280w, /media/about-v3/ss-dsc07130-1920.webp 1920w, /media/about-v3/ss-dsc07130-2560.webp 2560w"
          sizes="100vw"
          width={2560}
          height={1707}
          alt="Praṇav Śāstrī seated with palms joined beneath the Praṇava emblem, two practitioners beside him and students seated in front"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    </section>
  );
}
