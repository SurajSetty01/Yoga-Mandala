import type { CSSProperties } from 'react';
import { FRAMES, src, srcSet, type Frame } from './frames';

/**
 * The two objects every section on this page shares. Continuity across the site is the
 * register mark, the tokens and the type scale; the mechanics are what differ.
 */

/**
 * The register mark — section 02 of the home page's own object, to the letter.
 *
 * It is an `<h2>`, and that is a structural decision rather than a stylistic one. Most of
 * this page's sections open on a sentence of the client's prose rather than on a label, so
 * marking those up as headings would put ten of the client's sentences into the document
 * outline. The register mark is the only thing on the page that IS a section title, so it
 * carries the rank: the outline reads "About Pranava" → "01 Introduction" → "02 What
 * Praṇava is" → … → "10 Begin", which is a usable table of contents, and the four approach
 * terms and four door names sit under it at h3. Without this the page skips h1 → h3.
 */
export function Eyebrow({
  n,
  children,
  dark = false,
}: {
  n: string;
  children: string;
  dark?: boolean;
}) {
  return (
    <h2 className={`apr-eyebrow${dark ? ' apr-eyebrow--dark' : ''}`}>
      <span className="apr-eyebrow__n">{n}</span>
      <span className="apr-eyebrow__rule" aria-hidden="true" />
      {children}
    </h2>
  );
}

/**
 * One photograph.
 *
 * `sizes` is always explicit — a `srcset` with no `sizes` makes the browser assume 100vw,
 * so a phone pulls a 2560 derivative for a 92px thumbnail.
 *
 * BOTH crops travel with the element as custom properties and the stylesheet picks between
 * them at 719px. A portrait viewport crops a landscape frame hard, and this site has
 * already shipped a hero with the teacher out of shot and an air cooler centre-frame
 * because the mobile `object-position` was left to the default (DESIGN-SYSTEM §1).
 *
 * `loading` defaults to lazy; the hero passes `eager` so the first frame is not deferred.
 * No <video> and no `poster` attribute appears anywhere on this page — a poster is fetched
 * even when `src` is never set, which cost this site 948 KB on every device once already.
 */
export function Shot({
  frame,
  sizes,
  eager = false,
  className,
  alt,
  style,
}: {
  frame: Frame;
  sizes: string;
  eager?: boolean;
  className?: string;
  /** override the frame's own description — `""` for a slice of a picture described once */
  alt?: string;
  style?: CSSProperties;
}) {
  const set = srcSet(frame);
  return (
    <img
      className={className}
      src={src(frame)}
      {...(set ? { srcSet: set, sizes } : {})}
      alt={alt ?? frame.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      style={
        {
          '--op': frame.pos,
          '--op-n': frame.posNarrow ?? frame.pos,
          ...style,
        } as CSSProperties
      }
    />
  );
}

export { FRAMES };
