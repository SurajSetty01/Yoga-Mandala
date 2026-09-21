import type { CSSProperties } from 'react';
import { src, srcSet, type Frame } from './frames';

/**
 * The two objects every section on /learn/ shares. Continuity across this site comes from
 * the tokens, the type scale and the register mark; the mechanics are what differ, and no
 * two sections here share one.
 */

/**
 * The register mark.
 *
 * It is an `<h2>` and that is structural, not decorative. Most sections here open on a
 * sentence of the client's own prose, and marking those up as headings would put eight of
 * the client's sentences into the document outline. The register mark is the only thing on
 * the page that IS a section title, so it carries the rank, and the outline reads
 * "Learn · Study Yoga through…" → "01 What structured learning means" → … → "06 Begin",
 * which is a usable table of contents. The five format labels and the five programme names
 * sit beneath it at h3.
 */
export function Mark({
  n,
  children,
  dark = false,
}: {
  n: string;
  children: string;
  dark?: boolean;
}) {
  return (
    <h2 className={`ln-mark${dark ? ' ln-mark--dark' : ''}`}>
      <span className="ln-mark__n">{n}</span>
      <span className="ln-mark__rule" aria-hidden="true" />
      <span className="ln-mark__t">{children}</span>
    </h2>
  );
}

/**
 * One photograph.
 *
 * `sizes` is always explicit. A `srcset` with no `sizes` makes the browser assume 100vw, so
 * a phone pulls a 1620 derivative for a 250px aperture.
 *
 * BOTH crops travel with the element as custom properties and the stylesheet chooses
 * between them at 719px. A portrait viewport crops a 3:2 frame hard, and this site has
 * already shipped a hero with the teacher out of shot because the narrow `object-position`
 * was left at its default — DESIGN-SYSTEM §1.
 *
 * `width`/`height` are the intrinsic pixels of the largest derivative, so the box is
 * reserved before the bytes arrive and the page does not shift under the reader.
 */
export function Shot({
  frame,
  sizes,
  className,
  alt,
  style,
}: {
  frame: Frame;
  sizes: string;
  className?: string;
  /** override the frame's own description — `""` only for a repeat of one described above */
  alt?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      className={className}
      src={src(frame)}
      srcSet={srcSet(frame)}
      sizes={sizes}
      width={frame.w}
      height={frame.h}
      alt={alt ?? frame.alt}
      /*
       * EVERY image on this page is `lazy`, INCLUDING THE MASTHEAD, and that is a
       * measurement rather than an oversight.
       *
       * The header prefetches all eight routes. In the static export those prefetches
       * pull each route's HTML, and an image marked `loading="eager"` in one of those
       * documents is then fetched by every OTHER page on the site. Measured on the
       * production build served out of `out/`: with the masthead frame eager, the fold of
       * /yoga-mandala/within/ — a page that has nothing to do with this one — was 3,108 KB;
       * with it lazy it is 2,849 KB. 259 KB of /learn/ was being posted to every reader of
       * every other page.
       *
       * The cost on the page that owns the frame is nil: an image inside the viewport is
       * fetched during the initial load whatever its `loading` value, and the masthead
       * frame still completes at 258 ms on the production build. `fetchPriority="high"`
       * was tried and made no difference to either number.
       */
      loading="lazy"
      decoding="async"
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

/** What the picture shows. No date and no place: the archive records neither, and a
 *  provenance line invented to look like one is the failure this project already had. */
export function Says({ children }: { children: string }) {
  return <p className="ln-says">{children}</p>;
}
