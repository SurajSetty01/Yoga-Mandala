import type { CSSProperties } from 'react';
import { frames, src, srcSet, avif, type FrameKey } from './frames';

/**
 * ONE PRINT — carried over unchanged from the winning concept, re-namespaced.
 *
 * A `<figure>` with a paper edge holding an image cropped to the window's ratio at the
 * audit's focal point. It is deliberately NOT a container for a caption: nothing in section
 * 04 prints type over a photograph, which is both the idea (a label belongs on the mount,
 * which is what a print actually is) and the reason every text run in that section measures
 * the same at every viewport instead of depending on what the crop happens to contain.
 */
export function Print({
  frame,
  ratio,
  className = '',
  style,
  sizes = '32vw',
  want = 960,
}: {
  frame: FrameKey;
  /** the window this print is cut to, e.g. '4 / 3' */
  ratio: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  want?: number;
}) {
  const f = frames[frame];
  const a = avif(f);
  const ss = srcSet(f);
  return (
    <figure className={`ab-print ${className}`} style={{ aspectRatio: ratio, ...style }}>
      <picture>
        {a ? <source type="image/avif" srcSet={a} /> : null}
        <img
          src={src(f, want)}
          {...(ss ? { srcSet: ss, sizes } : {})}
          alt={f.alt}
          style={{ objectPosition: f.pos }}
          decoding="async"
          loading="lazy"
        />
      </picture>
    </figure>
  );
}
