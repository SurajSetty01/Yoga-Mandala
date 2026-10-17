import { about } from '@/content/pranava';

/**
 * 02 WHAT IS PRAṆAVA? The client: "a teaching/study photograph could communicate the
 * institutional character even better." A MIXED section on the deep ground, so it answers
 * the warm Introduction above it: the copy on one side, and two photographs of the centre
 * at work on the other, one large above one smaller. The large one is a panel at
 * Samskrithi Sadhana under the Praṇava emblem (the centre speaking in public), the small
 * one a study circle at the Prabodha teacher training (the centre teaching). The intention
 * closes the section on its own line, as the client's text does.
 */
export function A3WhatIs() {
  const w = about.what;
  return (
    <section className="a3-sec a3-what" aria-labelledby="a3-what-h">
      <div className="a3-rail a3-what__grid">
        <div className="a3-what__copy">
          <p className="a3-label a3-label--dark" data-a3r>
            <span className="a3-label__n">02</span> What is Praṇava?
          </p>
          <h2 className="a3-what__h" id="a3-what-h" data-a3r>
            {w.lead}
          </h2>
          <div className="a3-what__body">
            {w.body.map((s, i) => (
              <p key={s} data-a3r style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                {s}
              </p>
            ))}
          </div>
        </div>

        <div className="a3-what__pics" data-a3r>
          <img
            className="a3-what__big"
            src="/media/about-v3/ss-dsc07144-1280.webp"
            srcSet="/media/about-v3/ss-dsc07144-640.webp 640w, /media/about-v3/ss-dsc07144-1280.webp 1280w, /media/about-v3/ss-dsc07144-1920.webp 1920w"
            sizes="(min-width: 1000px) 46vw, 100vw"
            width={1280}
            height={853}
            alt="Praṇav Śāstrī speaking on a panel of four beneath the Praṇava emblem at Samskrithi Sadhana"
            loading="lazy"
            decoding="async"
          />
          <img
            className="a3-what__small"
            src="/media/about-v3/ttc-0280-640.webp"
            srcSet="/media/about-v3/ttc-0280-640.webp 640w, /media/about-v3/ttc-0280-1280.webp 1280w"
            sizes="(min-width: 1000px) 22vw, 50vw"
            width={640}
            height={427}
            alt="A teacher seated in a study circle with students holding notes, in an open veranda"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p className="a3-what__intent" data-a3r>
          {w.intention}
        </p>
      </div>
    </section>
  );
}
