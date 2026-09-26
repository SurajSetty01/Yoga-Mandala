import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';

/**
 * OUR APPROACH — set as a page of a book.
 *
 * WHAT HAPPENS: a column of type holds one right edge all the way down — the lead sentence,
 * then three names standing against a hairline rule in the margin — until Transmission, where
 * the rule stops on a brass tick, the name crosses the gutter into the text column itself, and
 * the section's only photograph arrives in exactly the column the words have vacated. Below
 * 900px the page is turned over rather than flattened: the gutter goes to the right of the
 * measure, the lead's hung stops and the three names go on holding one optical edge against
 * the rule in it, and Transmission still crosses — the name to the far side, the picture over
 * the rule's own line and off the page.
 *
 * WHY. The client's lead names three things and the section has four items. Transmission is
 * not a fourth peer; it is what the other three move through. So it is the only one without a
 * margin head, and the type carries the argument rather than a caption explaining it. The
 * version this replaces made all four equal numbered panels in a row, which is precisely the
 * reading the copy contradicts.
 *
 * NOTHING IS RETYPED. Both of the client's multi-sentence values are split at their OWN full
 * stops with a lookbehind, so the pieces concatenate back character for character — the same
 * technique components/about-pranava/WhatIs.tsx already uses. `npm run check:copy` walks
 * content/pranava.ts, and no sentence in this file is a copy of one.
 */

/** The one frame. See NOTES.md for why this one, why it is the only frame in the section,
    and why it is a STILL after the clip of the same id was cut on evidence. */
const PLATE = {
  id: 'pr-mov-img_5681',
  /* The intrinsic size of the FILE, which is what these attributes are for. The plate's box
     is a 1080x1200 window on it — see the crop note in styles/preview-sx3c.css. Nothing here
     is scaled by a transform, so the painted width IS the box width: 370px at 390, 616 at
     768, 307 at 1024, 432 at 1440, 640 at 2531, against a 1080px source. Every one of those
     is a downsample (0.28x-0.59x), and there is no `sizes` to get wrong because there is one
     file, one box, and no transform between them. */
  w: 1080,
  h: 1920,
  /* Written from LOOKING at the frame, not from the manifest — which calls the shirt white,
     says "two", and describes only the inversion. What is actually in it is a teacher
     mid-sentence with his hands shaping the instruction, a student inverted at the wall, and
     three people sitting on the floor watching. Nobody is named: the archive does not record
     who is in which frame.

     Alt written against the CROP THAT SHIPS, not the whole file: the tube lamp, the door head
     and the two A4 notices above them are outside the box, so they are not described. */
  alt:
    'A teacher standing on a mat, hands open as he speaks, while a student holds a supported ' +
    'headstand against the wall and three people sit watching from the floor.',
  cap: 'One teacher, one student at the wall, and the room watching',
} as const;

/** 'Rooted in tradition.' -> ['Rooted in ', 'tradition', '.'] — the stop is hung by CSS. */
function hangStop(clause: string): [string, string, string] {
  const m = /^([\s\S]*?)(\S+)(\.)$/.exec(clause);
  /* if a clause ever arrives without a final stop the whole clause is simply set, unhung —
     the alignment is lost and not one character of the client's sentence is. */
  if (!m) return ['', clause, ''];
  return [m[1] ?? '', m[2] ?? clause, m[3] ?? ''];
}

export function Sx3cApproach() {
  const { lead, items } = about.approach;
  const clauses = lead.split(/(?<=\.)\s+/);
  const three = items.slice(0, 3);
  const fourth = items[3];
  const [stand, ...rest] = fourth.body.split(/(?<=\.)\s+/);

  return (
    <section className="sx3c" id="sx3c-approach" aria-label="Our approach">
      <div className="sx3c-rail">
        <Eyebrow n="03">Our approach</Eyebrow>
      </div>

      {/* ── the spine: the lead, three names, one rule ───────────────────────────── */}
      <div className="sx3c-block">
        {/* The rule and its terminal are ornament and carry no meaning a reader needs, so
            they are hidden from assistive technology. The rule draws itself in CSS against
            this block's own view progress — there is no scroll listener on this page. */}
        <span className="sx3c-rule" aria-hidden="true" />
        <span className="sx3c-tick" aria-hidden="true" />

        <p className="sx3c-lead" data-sx3c="up">
          {clauses.map((c) => {
            const [head, noun, stop] = hangStop(c);
            return (
              <span className="sx3c-lead__l" key={c}>
                {head}
                {noun}
                <span className="sx3c-lead__stop">{stop}</span>
              </span>
            );
          })}
        </p>

        {three.map((it, i) => (
          <div className="sx3c-item" key={it.name}>
            <h3 className="sx3c-name" data-sx3c="name">
              <span className="sx3c-name__in">{it.name}</span>
            </h3>
            <p
              className="sx3c-said"
              data-sx3c="up"
              style={{ ['--sx3c-d' as string]: `${120 + i * 40}ms` } as CSSProperties}
            >
              {it.body}
            </p>
          </div>
        ))}
      </div>

      {/* ── the turn: the paper changes, the margin loses its words ──────────────── */}
      <div className="sx3c-turn">
        <div className="sx3c-block">
          <figure className="sx3c-fig" data-sx3c="fade">
            {/* the aspect box is a CHILD of the observed figure: it carries `overflow: clip`,
                and Chromium computes an IntersectionObserver's rect AFTER clips, so an
                observed element that clips can report ratio 0 and never fire. */}
            <div className="sx3c-plate">
              <picture>
                <source type="image/avif" srcSet={`/media/posters/${PLATE.id}.avif`} />
                <img
                  className="sx3c-plate__img"
                  src={`/media/posters/${PLATE.id}.jpg`}
                  width={PLATE.w}
                  height={PLATE.h}
                  alt={PLATE.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="sx3c-cap">
              <span className="sx3c-cap__t">{PLATE.cap}</span>
            </figcaption>
          </figure>

          <div className="sx3c-say">
            <h3 className="sx3c-name" data-sx3c="name">
              <span className="sx3c-name__in">{fourth.name}</span>
            </h3>
            <p className="sx3c-stand" data-sx3c="up" style={{ ['--sx3c-d' as string]: '90ms' } as CSSProperties}>
              {stand}
            </p>
            {rest.map((s, i) => (
              <p
                className="sx3c-rest"
                key={s}
                data-sx3c="up"
                style={{ ['--sx3c-d' as string]: `${170 + i * 60}ms` } as CSSProperties}
              >
                {s}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
