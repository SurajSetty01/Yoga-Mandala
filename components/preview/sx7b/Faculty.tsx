import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import {
  HAND_BOTTOM,
  HAND_TOP,
  PLATES,
  PROVENANCE,
  clipSrc,
  posterAvif,
  posterJpg,
  stillSet,
  stillSrc,
  type Plate,
} from './frames';

/**
 * 07 · FACULTY — concept B: six rooms, one point of contact.
 *
 * WHAT HAPPENS. A small ring sits still on a thread across the stage. As the reader scrolls,
 * the ring opens like an iris and a room appears through it: a class kneeling with palms
 * joined, and the ring is on a pair of those palms. Scroll on and the ring opens again from
 * the same spot into a different room — a teacher crouched at the far end of a row of
 * shoulderstands, and his hands are exactly where the palms were. Then a hand reaching for a
 * back; practitioners setting each other's pose; open hands explaining a headstand; and last,
 * two hands taking a practitioner's whole weight, as the sentence about "the larger intention
 * of Pranava" arrives beside it. Six rooms, six ways of teaching, every one of them placed so
 * that its teaching hands land on the one point that never moves.
 *
 * WHY. The client's two sentences are about many (teachers and practitioners with different
 * experience and expertise) held within one (the larger intention of Pranava). Every frame
 * is a different room shape, a different distance, a different act — and each is registered
 * by the same thing. The frames jump around the point to make that happen, which is the
 * sentence made visible: each brings their own, and they meet in one place.
 *
 * THE RULE THAT SHAPED THE LAYOUT. tools/contrast-probe.mjs skips any text that overlaps a
 * `position: sticky` box, so text inside a pinned stage is never measured. Nothing that is
 * text lives inside the stage: on desktop the words run in their own column beside it (the
 * Pudding/Scrollama "sticky graphic + steps" pattern); on a phone the stage is the top 62% of
 * the screen and the words scroll up beneath it, readable in the band below.
 *
 * WITH MOTION OFF (reduced motion, no JavaScript, or a viewport shorter than 560px) this
 * markup renders as-is: the six frames hung side by side, each dropped so that its teaching
 * hands lie on one hairline, with a ring on every pair. The point becomes a line; the idea —
 * six different rooms registered by one thing — is intact, and only the arrival is lost.
 *
 * Every word of client copy comes from `about.faculty` untouched. The first paragraph is
 * split at its own full stop so each sentence can be its own step, and the second at its own
 * colon to set the clause after it in italic; no word is retyped.
 */

function Pic({ p, i }: { p: Plate; i: number }) {
  /* Live plates are sized by height (80svh on a desktop, 54svh on a phone), so their width
     is the aspect times that; the static sheet's plates are smaller than either. */
  const sizes =
    p.ar > 1
      ? '(min-width: 1024px) min(107vh, 1580px), 72vh'
      : '(min-width: 1024px) min(60vh, 890px), 41vh';
  if (p.kind === 'still') {
    return (
      <img
        className="sx7b-f__img"
        src={stillSrc(p, 960)}
        srcSet={stillSet(p)}
        sizes={sizes}
        alt={p.alt}
        loading={i < 2 ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }
  return (
    <>
      <picture>
        <source type="image/avif" srcSet={posterAvif(p)} />
        <img
          className="sx7b-f__img"
          src={posterJpg(p)}
          alt={p.alt}
          loading="lazy"
          decoding="async"
          width={1080}
          height={1920}
        />
      </picture>
      {p.play ? (
        /* No `poster` attribute: the visible <img> above IS the poster, and a poster is
           fetched even when `src` is never set (948 KB once on this site). No `src` either:
           Motion attaches it on approach and releases it a screen past. */
        <video
          className="sx7b-f__vid"
          data-src={clipSrc(p)}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}
    </>
  );
}

export function Faculty() {
  const { lead, body } = about.faculty;
  const [first, second] = body;
  const stop = first.indexOf('. ');
  const firstA = stop > -1 ? first.slice(0, stop + 1) : first;
  const firstB = stop > -1 ? first.slice(stop + 2) : '';
  const cut = second.indexOf(': ');
  const secondHead = cut > -1 ? second.slice(0, cut + 1) : second;
  const secondTail = cut > -1 ? second.slice(cut + 2) : '';

  return (
    <section
      className="sx7b"
      id="sx7b-faculty"
      aria-labelledby="sx7b-h"
      data-sx7b
      style={
        {
          '--sx7b-top': HAND_TOP,
          '--sx7b-bot': HAND_BOTTOM,
        } as CSSProperties
      }
    >
      <div className="sx7b-run">
        <div className="sx7b-head">
          <h2 className="sx7b-eyebrow" id="sx7b-h">
            <span className="sx7b-eyebrow__n">07</span>
            <span className="sx7b-eyebrow__rule" aria-hidden="true" />
            Faculty
          </h2>
          <p className="sx7b-lead">{lead}</p>
        </div>

        <div className="sx7b-one">
          <p className="sx7b-body">{firstA}</p>
        </div>

        <div className="sx7b-oneb">
          {firstB ? <p className="sx7b-body">{firstB}</p> : null}
          <p className="sx7b-prov" id="sx7b-prov">
            {PROVENANCE}
          </p>
        </div>

        <div className="sx7b-rail">
          <div className="sx7b-stage">
            <div className="sx7b-thread" aria-hidden="true" />
            <ol className="sx7b-strip" aria-describedby="sx7b-prov">
              {PLATES.map((p, i) => (
                <li
                  className="sx7b-f"
                  key={p.id}
                  style={
                    {
                      '--ar': p.ar.toFixed(4),
                      '--hx': p.hx,
                      '--hy': p.hy,
                    } as CSSProperties
                  }
                >
                  <div className="sx7b-f__pic">
                    <Pic p={p} i={i} />
                    <span className="sx7b-f__dim" aria-hidden="true" />
                  </div>
                  <span className="sx7b-f__ring" aria-hidden="true" />
                </li>
              ))}
            </ol>
            <span className="sx7b-point" aria-hidden="true" />
          </div>
        </div>

        <div className="sx7b-two">
          <p className="sx7b-close">
            {secondHead}
            {secondTail ? (
              <>
                {' '}
                <em>{secondTail}</em>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
}
