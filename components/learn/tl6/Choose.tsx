import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import { about } from '@/content/pranava';
import { Mark } from '../parts';
import { PHOTOS, type Tl6Photo } from './frames';
import { Tl6Track } from './Track';

/**
 * 05 · HOW TO CHOOSE. The client's sentence, written out with the scroll.
 *
 * The client never says how to choose between programmes, and nothing ties a programme to a
 * kind of reader, so there is no table, quiz or decision tree here. What the client HAS
 * written is a sentence that is already a chooser: four readers and one place.
 *
 *   Whether you are / beginning… / seeking… / preparing… / or simply… / Pranava is a space…
 *
 * Each of the four clauses stands under (on a phone: beside) a photograph of that reader.
 * While the stage is pinned, the clauses arrive one at a time, each with its photograph, left
 * to right as the sentence is read. When the fourth is in, the gaps between the four close,
 * the four frames become one band, and the main clause and the enquiry route arrive beneath.
 * Four readers, one place: the grammar of the sentence is the composition.
 *
 * Reduced motion, no script, and a screen too short to hold the stage all get that joined,
 * finished composition at once, unpinned. See Track.tsx.
 *
 * COPY. Every word is sliced out of `about.closing.body` at its own commas, so no fragment
 * can drift from the client's wording, and the commas stay with their clauses: read in
 * order, the six parts ARE the sentence, "or" included. 'Pranava' is undiacritised in that
 * sentence and stays so. Only the register mark and "Enquire" are page-written.
 *
 * All six parts are children of ONE paragraph (laid out with `display: contents`), and the
 * photographs are outside it, so a screen reader hears the sentence whole rather than
 * interrupted by four image descriptions.
 */

const S = about.closing.body;
const LEAD = 'Whether you are';
const TAIL_AT = S.lastIndexOf(', Pranava is');
/** "Pranava is a space to learn, practise and enquire." */
const RESOLVE = S.slice(TAIL_AT + 2);
/** the four clauses, each keeping the comma that closes it in the client's sentence */
const CLAUSES = S.slice(LEAD.length + 1, TAIL_AT)
  .split(', ')
  .map((c) => `${c},`);

function Photo({ photo, i }: { photo: Tl6Photo; i: number }) {
  const style = { '--i': i, '--op': photo.pos, '--op-n': photo.posNarrow } as CSSProperties;
  const { id, widths, w, h, alt } = photo;
  return (
    <figure className={`tl6-pic tl6-pic--${i}`} style={style}>
      {widths ? (
        <img
          src={`/media/stills/${id}-${widths[widths.length - 1]}.webp`}
          srcSet={widths.map((x) => `/media/stills/${id}-${x}.webp ${x}w`).join(', ')}
          sizes={photo.sizes}
          width={w}
          height={h}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <picture>
          <source type="image/avif" srcSet={`/media/posters/${id}.avif`} />
          <img
            src={`/media/posters/${id}.jpg`}
            width={w}
            height={h}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
    </figure>
  );
}

export function Tl6Choose() {
  return (
    <section className="tl6" id="how-to-choose">
      <Tl6Track>
        <div className="tl6-in">
          <Mark n="05">How to choose</Mark>

          <div className="tl6-grid">
            <p className="tl6-sentence">
              <span className="tl6-lead">{LEAD}</span>{' '}
              {CLAUSES.map((c, i) => (
                <Fragment key={c}>
                  <span
                    className={`tl6-clause tl6-clause--${i}`}
                    style={{ '--i': i } as CSSProperties}
                  >
                    {c}
                  </span>{' '}
                </Fragment>
              ))}
              <span className="tl6-resolve">{RESOLVE}</span>
            </p>

            {PHOTOS.map((p, i) => (
              <Photo photo={p} i={i} key={p.id} />
            ))}

            <Link className="tl6-cta" href="/contact/">
              Enquire
              <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>
      </Tl6Track>
    </section>
  );
}
