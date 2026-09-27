import type { ReactNode } from 'react';
import { about } from '@/content/pranava';
import { Mark } from '../parts';
import { Tl2Reader } from './Tl2Reader';

/**
 * 01 — WHAT STRUCTURED LEARNING MEANS · the movement advances only while you read.
 *
 * Two movements, and the second is the argument performed.
 *
 *  1. THE REFUSAL, FIRST AND LARGEST. `teach.open` is the sharpest claim the client makes
 *     about education, so it is the biggest type in the section, beside a still of the tool
 *     before the practice: a stick laid along a mat, a foot on a block. `intro[4]` answers it
 *     underneath: what they do believe.
 *  2. OVER TIME. The eight practices, in the client's order, down one rule. Beside them a
 *     clip waits on one frame: a woman folded forward holding a dowel. It plays ONLY while
 *     the reader moves through the list and stops when they stop, so she rises to standing
 *     with the dowel overhead exactly as far as the list has been read. Each practice lights
 *     as it crosses the reading line and the rule fills to it. Progress is kept: reading back
 *     up does not undo what was read. "Learning happens over time", made literal.
 *
 * Under `prefers-reduced-motion`, or with no JavaScript, nothing waits: the eight are lit,
 * the rule is full, and the clip's pane is its still. Nothing is reachable only by motion.
 *
 * The clip carries `data-tl2-src`, NOT `data-src`: components/learn/LearnMotion.tsx takes
 * the first `video[data-src]` under `.ln` as its own loop, and this section sits above it.
 */

const STILL = {
  id: 'pr-pbh-img_5372',
  widths: [480, 960, 1920],
  w: 1920,
  h: 2560,
  alt: 'A woman folding forward with her foot on a wooden block and a stick laid along the mat',
};

const CLIP = {
  src: '/media/clips/pr-mov-img_5659.mp4',
  avif: '/media/posters/pr-mov-img_5659.avif',
  jpg: '/media/posters/pr-mov-img_5659.jpg',
  alt: 'A woman folding forward holding a wooden dowel, then rising to standing with it stretched overhead',
};

/** Set the named phrases of a client sentence in italic without touching a character of
 *  it. A phrase that is not found leaves the sentence plain rather than altered. */
function stress(sentence: string, phrases: string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = sentence;
  let k = 0;
  for (const ph of phrases) {
    const at = rest.indexOf(ph);
    if (at < 0) continue;
    if (at > 0) out.push(rest.slice(0, at));
    out.push(
      <em key={k++} className="tl2-stress">
        {ph}
      </em>,
    );
    rest = rest.slice(at + ph.length);
  }
  if (rest) out.push(rest);
  return out;
}

export function LearningOverTime() {
  const t = about.teach;
  return (
    <section className="tl2" id="what-structured-learning-means">
      <div className="tl2-in">
        <Mark n="01">What structured learning means</Mark>

        {/* ── 1 · the refusal, and what is believed instead ── */}
        <div className="tl2-refuse">
          <p className="tl2-no">{stress(t.open, ['a certificate alone', 'collecting techniques'])}</p>

          <figure className="tl2-tool">
            <img
              src={`/media/stills/${STILL.id}-960.webp`}
              srcSet={STILL.widths.map((w) => `/media/stills/${STILL.id}-${w}.webp ${w}w`).join(', ')}
              sizes="(min-width: 900px) min(34vw, 30rem), 44vw"
              width={STILL.w}
              height={STILL.h}
              alt={STILL.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="tl2-cap">Prabhava 5-day Hatha-Iyengar Immersion, 2 to 6 October 2023</figcaption>
          </figure>

          <p className="tl2-yes">{about.intro[4]}</p>
        </div>

        {/* ── 2 · over time ── */}
        <div className="tl2-time">
          <p className="tl2-lead">{t.lead}</p>
          <p className="tl2-prompt" id="tl2-prompt">
            {t.prompt}
          </p>

          <div className="tl2-col">
            <div className="tl2-list">
              <span className="tl2-track" aria-hidden="true">
                <span className="tl2-fill" />
              </span>
              <ol className="tl2-eight" aria-labelledby="tl2-prompt">
                {t.practices.map((p, i) => (
                  <li key={p} className="tl2-one">
                    <span className="tl2-n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="tl2-t">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <figure className="tl2-pane">
            <div className="tl2-win">
              <picture>
                <source srcSet={CLIP.avif} type="image/avif" />
                <img
                  className="tl2-poster"
                  src={CLIP.jpg}
                  width={1080}
                  height={1920}
                  alt={CLIP.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              {/* no `poster` attribute: the <img> above IS the poster, and a poster
                  attribute is fetched even when `src` is never set */}
              <video
                className="tl2-vid"
                data-tl2-src={CLIP.src}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                disablePictureInPicture
              />
            </div>
          </figure>
        </div>
      </div>
      <Tl2Reader />
    </section>
  );
}
