import { about } from '@/content/pranava';
import { A3Clip } from './Clip';

/**
 * 01 INTRODUCTION. Rebuilt from zero. The client: "the text content is the HERO in this
 * section." So the five sentences fill the middle of the screen, and as they are read each
 * word lights from faint to full (Motion.tsx, data-a3-words). Around them, never boxed, the
 * practice drifts past at its own speeds: round and arched windows, one of them the film of
 * a woman rising from her mat with a dowel, "more than a practice on the mat" taken literally.
 */
const ORBS = [
  { cls: 'o1', speed: 1.4, src: '/media/about-v3/ttc-0285-640.webp', alt: 'A study circle with notebooks open' },
  { cls: 'o2', speed: 0.7, clip: 'pr-mov-img_5659', alt: 'A woman folding forward on her mat with a dowel, then rising to standing' },
  { cls: 'o3', speed: 1.8, src: '/media/about-v3/ttc-0354-640.webp', alt: 'Two practitioners in dancer’s pose side by side' },
  { cls: 'o4', speed: 1.1, src: '/media/about-v3/ttc-0402-640.webp', alt: 'A group seated in meditation on the grass' },
];

/** wraps each word so it can be lit on its own; the text content is unchanged */
function Lit({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="a3-w">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

export function A3Introduction() {
  const [claim, ...rest] = about.intro;
  return (
    <section className="a3-sec a3-intro" aria-labelledby="a3-intro-h">
      <div className="a3-intro__orbs">
        {ORBS.map((o) => (
          <div key={o.cls} className={`a3-orb a3-orb--${o.cls}`} data-a3-float={o.speed}>
            {o.clip ? (
              <A3Clip src={`/media/clips/${o.clip}.mp4`} poster={`/media/posters/${o.clip}.jpg`} alt={o.alt} />
            ) : (
              <img src={o.src} alt={o.alt} loading="lazy" decoding="async" />
            )}
          </div>
        ))}
      </div>

      <div className="a3-rail a3-intro__in">
        <p className="a3-label" data-a3r>
          <span className="a3-label__n">01</span> Introduction
        </p>
        <h2 className="a3-intro__h" id="a3-intro-h" data-a3-words>
          <Lit text={claim ?? ''} />
        </h2>
        <div className="a3-intro__text" data-a3-words>
          {rest.map((s) => (
            <p key={s}>
              <Lit text={s} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
