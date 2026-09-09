import { about } from '@/content/copy';

/**
 * Three treatments of the closing quotation, for the client to choose between.
 *
 * Shared across all three, because the client asked for them regardless of the fill:
 *  · the marks are INLINE — the opening one immediately before the first letter and the
 *    closing one immediately after the last, rather than hung above and below the sentence.
 *  · TWO lines, not three. "Yoga is better when / we learn together." splits at 19 and 18
 *    characters, which is as even as this sentence divides.
 *  · centred.
 *
 * What differs is only which words carry a photograph inside their letterforms.
 *
 * CONTRAST. The plate is paper, so a filled glyph must be DARKER than about 140/255 to clear
 * 3:1 — the inverse of the same treatment on a dark ground, and the reason the fill uses the
 * deepened, saturated derivative rather than the plain one. Darkening deepens colour where a
 * white veil washes it out. Unfilled words are --ink at 15.6:1 and the marks are clay, which
 * is ornament and large enough here to need only 3:1 (it measures 3.90:1).
 */

const line = about.guiding.line; // "Yoga is better when we learn together."
const words = line.split(' ');
/** the split point: 4 words, then 3. Both lines land within a character of each other. */
const HEAD = words.slice(0, 4); // Yoga is better when
const TAIL = words.slice(4); // we learn together.

export type Fill = 'word' | 'all' | 'bookends';

const LABEL: Record<Fill, string> = {
  word: 'A · “Yoga” only',
  all: 'B · the whole quotation',
  bookends: 'C · “Yoga” and “together.”',
};

/** which words carry the photograph, by index across the whole sentence */
const FILLED: Record<Fill, (i: number) => boolean> = {
  word: (i) => i === 0,
  all: () => true,
  bookends: (i) => i === 0 || i === words.length - 1,
};

function Word({ text, filled }: { text: string; filled: boolean }) {
  return <span className={filled ? 'qv__w qv__w--fill' : 'qv__w'}>{text}</span>;
}

export function QuoteVariant({ fill }: { fill: Fill }) {
  const isFilled = FILLED[fill];
  return (
    <section className={`qv qv--${fill}`} aria-label={about.guiding.heading}>
      <p className="qv__tag">{LABEL[fill]}</p>

      <blockquote className="qv__q">
        <p className="qv__line">
          <span className="qv__row">
            {/* inline, tight against the first letter — not a block above the sentence */}
            <span className="qv__mk" aria-hidden="true">
              {'“'}
            </span>
            {HEAD.map((w, i) => (
              <Word key={w + i} text={w + (i < HEAD.length - 1 ? ' ' : '')} filled={isFilled(i)} />
            ))}
          </span>
          <span className="qv__row">
            {TAIL.map((w, i) => (
              <Word
                key={w + i}
                text={w + (i < TAIL.length - 1 ? ' ' : '')}
                filled={isFilled(HEAD.length + i)}
              />
            ))}
            <span className="qv__mk" aria-hidden="true">
              {'”'}
            </span>
          </span>
        </p>
      </blockquote>
    </section>
  );
}
