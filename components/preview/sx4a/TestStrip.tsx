import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FRAME, finishedVeil } from './frame';

/**
 * §04 HOW WE TEACH — a darkroom test strip.
 *
 * WHAT HAPPENS. One photograph is exposed while you read. A card steps across the sheet,
 * uncovering one band per practice, and every band keeps deepening for as long as it has
 * been uncovered — so "Practise consistently", uncovered first, ends fully printed, and
 * "Continue learning beyond a single course", uncovered last, ends as a ghost that is still
 * coming up. Then the same frame arrives whole, as the print, and the client's closing
 * sentence stands under the teacher whose hands are on a student in it.
 *
 * Exposure is literally time: a test strip is how a printer finds out how long a picture
 * needs, by giving each band of one sheet a different length of light. That is this
 * section's lead sentence as a photographic fact rather than as an illustration of it —
 * nothing on the strip is invented except the order of the bands, which is the client's.
 *
 * Everything here is static HTML. The finished strip is what renders with no JavaScript,
 * under reduced motion, and on a viewport too short to pin; `Sx4aMotion` only rewinds it
 * to the blank sheet and plays the exposure back against the reader's scroll.
 */
export function TestStrip() {
  const t = about.teach;
  /* the client's closing paragraph is two sentences; the first is set back, the second is
     the claim. Split on the sentence boundary — both halves stay verbatim. */
  const [closeA, ...closeRest] = t.close.split(/(?<=\.)\s+/);

  const picture = (alt: string, className?: string) => (
    <picture>
      <source type="image/avif" srcSet={FRAME.avif} />
      <img
        className={className}
        src={FRAME.jpg}
        width={FRAME.w}
        height={FRAME.h}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );

  return (
    <section className="sx4a" aria-labelledby="sx4a-title" data-sx4a="">
      <div className="sx4a-rail sx4a-head">
        {/* the site's register mark, to the letter: the one thing on the page that IS a
            section title, so it carries the h2 and the outline reads "04 How we teach".
            The title is the client's own ("6. How We Teach" in the About document); 04 is
            its place on this page, between §03 Our Approach and §05 the Journey. */}
        <h2 id="sx4a-title" className="sx4a-mark">
          <span className="sx4a-mark__n">04</span>
          <span className="sx4a-mark__rule" aria-hidden="true" />
          How we teach
        </h2>
        <p className="sx4a-lead">{t.lead}</p>
        <p className="sx4a-open">{t.open}</p>
      </div>

      <div className="sx4a-stage">
        <div className="sx4a-pin">
          <div className="sx4a-rail">
            <div className="sx4a-bench">
              <div className="sx4a-bar">
                <p className="sx4a-prompt" id="sx4a-prompt">
                  {t.prompt}
                </p>
                <p className="sx4a-cap">{FRAME.stripCap}</p>
              </div>

              <figure className="sx4a-frame">
                <span className="sx4a-easel" aria-hidden="true" />
                <div className="sx4a-sheet">
                  <div className="sx4a-carrier">{picture(FRAME.stripAlt)}</div>
                  {t.practices.map((p, i) => (
                    <span
                      key={p}
                      className="sx4a-veil"
                      aria-hidden="true"
                      style={{ '--i': i, opacity: finishedVeil(i) } as CSSProperties}
                    />
                  ))}
                  <span className="sx4a-card" aria-hidden="true" />
                </div>
              </figure>

              <ol className="sx4a-notes" aria-labelledby="sx4a-prompt">
                {t.practices.map((p, i) => (
                  <li key={p} className="sx4a-note">
                    <span className="sx4a-note__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="sx4a-text">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <figure className="sx4a-print">
        <div className="sx4a-plate">
          {picture(FRAME.alt)}
          <span className="sx4a-plate__veil" aria-hidden="true" />
        </div>
        <figcaption className="sx4a-cap">{FRAME.printCap}</figcaption>
      </figure>

      <div className="sx4a-rail sx4a-close">
        <p className="sx4a-close__p">
          <span className="sx4a-close__a">{closeA}</span> {closeRest.join(' ')}
        </p>
      </div>
    </section>
  );
}
