import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATES, TRANSMISSION, src, srcSet, type Plate } from './media';

/**
 * §03 · OUR APPROACH — THE APERTURE OPENS.
 *
 * Describe it as something that happens: **the picture opens three times toward the
 * reader, and at the fourth it crosses the page and starts moving.**
 *
 * The client's argument in this section is about time — "Practice allows knowledge to
 * become experience. It requires consistency, observation, refinement and time." So the
 * four terms are set as four moments of one occasion rather than four ideas in four boxes.
 * The type column never moves: one left axis, one measure, all the way down. The only
 * thing that changes is how much of the page the photograph has taken — 26%, 44%, 66% of
 * the measure — and the void between the words and the picture is the time not yet spent.
 *
 * THE FOURTH IS NOT THE FOURTH STEP. The client's lead names three of the four, and
 * Transmission is the one that changes what the other three are for: it is not an idea
 * but a thing that passes between two people. So it leaves the series — full bleed, off
 * the left edge the other three never touch, taller than anything in either section, and
 * the only moving image on the route. The lead keeps an open line beneath its three
 * clauses for it, marked by a hairline and nothing else. No word is invented to fill it.
 *
 * WHAT THIS REPLACES. The section it is a concept for puts Transmission in a beam sliced
 * by the section edge — "an image that is mostly cut off and barely visible", a hand on a
 * back and nothing else. Here that frame is portrait at every viewport, 820px tall on a
 * laptop and 560px on a phone, and the type stands beside it rather than on it.
 *
 * MOTION IS A DEEPENING, NEVER THE IDEA. With `prefers-reduced-motion: reduce`, with no
 * JavaScript, or in a still screenshot, every width above is already the finished width
 * and the fourth frame is already the tall photograph the video's first frame is. Nothing
 * on this page is reachable only by moving.
 */

/** the three widths, as a fraction of the measure, and what carries each one */
const STANDING = [PLATES.lane, PLATES.row, PLATES.banyan] as const;

/** rendered widths, not 100vw: 26/44/66% of the measure above 900px, 62/80/100% below */
const SIZES = [
  '(max-width: 899px) 62vw, (max-width: 1600px) 24vw, 383px',
  '(max-width: 899px) 80vw, (max-width: 1600px) 41vw, 648px',
  '(max-width: 899px) 94vw, (max-width: 1600px) 62vw, 972px',
] as const;

const crop = (p: Plate): CSSProperties =>
  ({ '--ab-op': p.pos, '--ab-op-n': p.posNarrow ?? p.pos }) as CSSProperties;

export function ApprBApproach() {
  /* The lead is split, never retyped: `content/pranava.ts` holds one string and this takes
     its sentences out of it, so `npm run check:copy` still walks the client's own value. */
  const clauses = (about.approach.lead.match(/[^.]+\./g) ?? [about.approach.lead]).map((s) =>
    s.trim(),
  );
  const [tradition, practice, inquiry, transmission] = about.approach.items;
  /* the three that stand, each with the frame that opens beside it and the width that
     frame is actually rendered at. Paired here rather than indexed in the markup so the
     three arrays cannot drift apart. */
  const standing = [tradition, practice, inquiry].flatMap((item, i) => {
    const plate = STANDING[i];
    const sizes = SIZES[i];
    return item && plate && sizes ? [{ item, plate, sizes }] : [];
  });

  return (
    <section className="apb-s apb-s--deep apb-ap" id="apb-approach" aria-labelledby="apb-ap-h">
      <div className="apb-rail">
        <h2 className="apb-eyebrow apb-eyebrow--onDeep" id="apb-ap-h">
          <span className="apb-eyebrow__n">03</span>
          <span className="apb-eyebrow__rule" aria-hidden="true" />
          Our approach
        </h2>

        <p className="apb-ap__lead" data-ab="up">
          {clauses.map((c) => (
            <span className="apb-ap__clause" key={c}>
              {c}
            </span>
          ))}
          {/* the fourth line, left open. Transmission is what stands in it. */}
          <span className="apb-ap__open" aria-hidden="true" />
        </p>

        <ol className="apb-ap__run">
          {standing.map(({ item, plate, sizes }, i) => (
            <li className="apb-ap__row" key={item.name}>
              <div className="apb-ap__txt" data-ab="up">
                <span className="apb-ap__n" aria-hidden="true">{`0${i + 1}`}</span>
                <h3 className="apb-ap__name">{item.name}</h3>
                <p className="apb-ap__body">{item.body}</p>
              </div>
              {/* the figure is observed; the <img> inside it is what is clipped. An
                  element clipped to zero reports intersection ratio 0 in Chromium and
                  never fires its own reveal — that shipped as a blank page once. */}
              <figure className="apb-ap__fig" data-ab="open">
                <img
                  src={src(plate)}
                  srcSet={srcSet(plate)}
                  sizes={sizes}
                  alt={plate.alt}
                  loading="lazy"
                  decoding="async"
                  style={crop(plate)}
                />
              </figure>
            </li>
          ))}
        </ol>
      </div>

      {/* 04 · TRANSMISSION — out of the series, across the page, and moving. */}
      <div className="apb-ap__last">
        <figure className="apb-ap__stage">
          <picture>
            <source srcSet={TRANSMISSION.stillAvif} type="image/avif" />
            <img
              src={TRANSMISSION.still}
              alt={TRANSMISSION.alt}
              loading="lazy"
              decoding="async"
              style={
                { '--ab-op': TRANSMISSION.pos, '--ab-op-n': TRANSMISSION.posNarrow } as CSSProperties
              }
            />
          </picture>
          {/* NO `poster` ATTRIBUTE. The <img> above is the poster; a poster attribute is
              fetched even when `src` is never set. `src` arrives as `data-src` so a reader
              with no JavaScript downloads nothing here at all. */}
          <video
            className="apb-ap__vid"
            data-src={TRANSMISSION.clip}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            style={
              { '--ab-op': TRANSMISSION.pos, '--ab-op-n': TRANSMISSION.posNarrow } as CSSProperties
            }
          />
        </figure>

        <div className="apb-ap__lastTxt" data-ab="up">
          <span className="apb-ap__n" aria-hidden="true">
            04
          </span>
          <h3 className="apb-ap__name">{transmission.name}</h3>
          <p className="apb-ap__body">{transmission.body}</p>
        </div>
      </div>
    </section>
  );
}
