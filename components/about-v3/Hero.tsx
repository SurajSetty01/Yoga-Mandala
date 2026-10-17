import { about } from '@/content/pranava';
import { site } from '@/content/site';

/**
 * HERO. One window tall, full width, the way the Yoga Mandala hero is. The film is Praṇav
 * seated beneath the Praṇava emblem with palms joined, his class in front of him
 * (Samskrithi Sadhana, ven0047): the centre's own name above its teacher. The title's
 * letters rise in on arrival; leaving, the film narrows into a rounded window and the words
 * lift away (components/about-v3/Motion.tsx). With reduced motion the still stands in.
 */
export function A3Hero() {
  const words = about.hero.heading.split(' ');
  return (
    <section className="a3-hero" aria-labelledby="a3-hero-h">
      <div className="a3-hero__media">
        <img
          className="a3-hero__still"
          src="/media/about-v3/hero-ven0047.jpg"
          alt="Praṇav Śāstrī seated with palms joined beneath the Praṇava emblem, his class seated in front of him"
          fetchPriority="high"
          decoding="async"
        />
        <video
          className="a3-hero__vid"
          data-a3-hero-video
          data-wide="/media/about-v3/hero-ven0047-1920.mp4"
          data-narrow="/media/about-v3/hero-ven0047-960.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="a3-hero__shade" />
      </div>

      <div className="a3-rail a3-hero__in">
        <p className="a3-hero__kicker">{site.descriptor}</p>
        <h1 className="a3-hero__h" id="a3-hero-h" aria-label={about.hero.heading}>
          {words.map((w, wi) => (
            <span className="a3-hero__word" key={w} aria-hidden="true">
              {[...w].map((ch, ci) => (
                <span
                  className="a3-hero__ch"
                  key={ci}
                  style={{ '--i': wi * 6 + ci } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="a3-hero__words">
          <p className="a3-hero__sub">{about.hero.sub}</p>
          <p className="a3-hero__support">{about.hero.support}</p>
        </div>
      </div>
      <span className="a3-hero__cue" aria-hidden="true" />
    </section>
  );
}
