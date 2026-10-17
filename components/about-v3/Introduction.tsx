import { about } from '@/content/pranava';

/**
 * 01 INTRODUCTION. The client: "lose the animation and become much simpler, 2–3 of the
 * strongest photographs ... the text content is the HERO in this section."
 *
 * Text-led. The claim is set large; the three sentences that widen it run side by side; the
 * belief closes it. The belief names three things ("study, practice and experience"), so the
 * section's three photographs are exactly those three, each captioned with the client's own
 * word, read out of that sentence rather than retyped.
 */
const PICS = [
  {
    id: 'ttc-0285',
    alt: 'Women seated in a circle of chairs with notebooks open, in a study session',
  },
  {
    id: 'ttc-0354',
    alt: 'Two practitioners holding dancer’s pose side by side, fields behind them',
  },
  {
    id: 'ttc-0402',
    alt: 'A group seated in meditation on the grass under the trees',
  },
];

export function A3Introduction() {
  const [claim, ...rest] = about.intro;
  const belief = rest[rest.length - 1] ?? '';
  const middle = rest.slice(0, -1);
  /* "…between study, practice and experience." → ['study', 'practice', 'experience'] */
  const words = /between ([^,]+), ([^ ]+) and ([^.]+)\./.exec(belief)?.slice(1) ?? [];

  return (
    <section className="a3-sec a3-intro" aria-labelledby="a3-intro-h">
      <div className="a3-rail">
        <p className="a3-label" data-a3r>
          <span className="a3-label__n">01</span> Introduction
        </p>
        <h2 className="a3-intro__h" id="a3-intro-h" data-a3r>
          {claim}
        </h2>

        <div className="a3-intro__cols">
          {middle.map((s, i) => (
            <p key={s} data-a3r style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              {s}
            </p>
          ))}
        </div>

        <div className="a3-intro__end">
          <p className="a3-intro__belief" data-a3r>
            {belief}
          </p>
          <ul className="a3-intro__trio" role="list">
            {PICS.map((p, i) => (
              <li key={p.id} data-a3r style={{ '--d': `${120 + i * 90}ms` } as React.CSSProperties}>
                <figure>
                  <img
                    src={`/media/about-v3/${p.id}-640.webp`}
                    srcSet={`/media/about-v3/${p.id}-640.webp 640w, /media/about-v3/${p.id}-1280.webp 1280w`}
                    sizes="(min-width: 1000px) 18vw, 33vw"
                    width={640}
                    height={427}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  {words[i] ? <figcaption>{words[i]}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
