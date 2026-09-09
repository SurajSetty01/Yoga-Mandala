import type { CSSProperties } from 'react';
import { frames, src, srcSet, avif, type FrameKey } from './frames';

/**
 * ONE PRINT.
 *
 * A `<figure>` with a paper edge and a shadow, holding an image cropped to the window's
 * ratio at the audit's focal point. It is not a container for a caption — nothing on this
 * page prints type over a photograph, which is both the concept (a label belongs on the
 * mount, not on the picture) and the reason every text run measures the same at every
 * viewport instead of depending on what the crop happens to contain.
 */
export function Print({
  frame,
  ratio,
  className = '',
  style,
  sizes = '32vw',
  want = 960,
  eager = false,
  deal = true,
}: {
  frame: FrameKey;
  /** the window this print is cut to, e.g. '3 / 4' */
  ratio: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  want?: number;
  eager?: boolean;
  /** false when an ancestor already carries the deal transform — they must not nest */
  deal?: boolean;
}) {
  const f = frames[frame];
  const a = avif(f);
  const ss = srcSet(f);
  return (
    <figure
      className={`about-c-print ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      {...(deal ? { 'data-cd': '' } : {})}
    >
      <picture>
        {a ? <source type="image/avif" srcSet={a} /> : null}
        <img
          src={src(f, want)}
          {...(ss ? { srcSet: ss, sizes } : {})}
          alt={f.alt}
          style={{ objectPosition: f.pos }}
          decoding="async"
          {...(eager ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
        />
      </picture>
    </figure>
  );
}
