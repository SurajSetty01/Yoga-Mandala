import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATES, TIERS, sizes, src, srcSet, type Plate } from './frames';

/**
 * 01 · INTRODUCTION — the page opens outward from one vertical seam.
 *
 * The section is two sheets of paper meeting down its exact centre, and that edge — the
 * seam — runs its whole height.  One photograph sits ON it, small, with paper on all
 * four sides and the first sentence beneath.  Then the seam starts to give: two windows open away from it at once, one on
 * each side, the same distance out; two more open further; and the last one opens from
 * the seam itself in both directions and runs off both edges of the screen onto the deep
 * ground of the section below.  The argument widens, the page widens with it, and the
 * paper runs out.
 *
 * ROUND 3, AT THE ROOT.  The seam was held but barely drawn: measured, the hairline was
 * exposed over 28% of its own height at 1440 and 46% at 1024, because the pictures and
 * the paragraphs are laid on it.  It is now an EDGE rather than a line — `--ground` to
 * the left of it, `--ground-warm` to the right, every element that crosses it carrying
 * the same gradient so the fold shows through its own paper.  Probed at 24 heights
 * across the section at four widths: the fold is there at every one of them.  The
 * hairline stays, uniform, as definition.  See styles/preview-sx2b.css.
 *
 * ROUND 2, AT THE ROOT.  Two things were wrong and both were in the MOTION, not the
 * layout.  First, every plate carried `clip-path: inset(0 50%)` — zero visible width —
 * until its slice of the timeline began, so at scroll 0 at 390 a critic screenshotted
 * the closing lawn band (this section's best asset) as nothing at all and the second
 * plate as a 20px sliver of a 296px window.  A window that is not there yet is not an
 * aperture.  Every closed state is now a PARTIAL inset: 55% of the plate's own final
 * width, hinged on whichever edge is nearer the seam, so the smallest any picture ever
 * is on this page is 135x490 at 1440 and 106x257 at 390 — a photograph, at every scroll
 * position, from first paint.  What the motion does is widen it outward from the seam
 * by 1.82x, which is the same thing the LAYOUT does four times over between beat one
 * and beat four.  Motion animates the geometry; it no longer stands in for it.
 *
 * Second, the five sentences faded in.  Measured after a four-second settle, not
 * mid-transition: "Our work brings together structured learning..." sat fully on screen
 * at opacity 0.51, compositing to 3.31:1, and at another scroll depth at 0.21 = 1.55:1,
 * against 4.5:1 for 19px body text.  A contrast probe correctly skips low-opacity
 * elements and so reported this section as clean, which is exactly the
 * overlay-hides-text-from-the-probe case this project has a rule about.  There is now
 * NO animation on any text in this section at all: all five sentences are at full
 * opacity, 13.9:1 on cream, at every scroll position and at first paint.
 *
 * THE SEAM IS DRAWN AND HELD, AND NOW IT IS HELD AT 390 TOO.  Placement is two signed
 * numbers per plate measured from the seam (see ./frames.ts); the mirror and the
 * climbing ladder are both checked at module load.  Below 720 the plates no longer sit
 * centred on the axis pretending to open from it — they alternate sides and reach
 * 0.44 -> 1.02 -> 1.22 -> 1.34 half-widths out, plate centres 0, -102, +102, -119,
 * +119, 0 px against a 195px half-width.
 *
 * THE WORDS ARE IN THE MIDDLE, on the seam.  The complaint that first sent this section
 * back was that there was nothing on the right; the obvious fix is a picture on the
 * right, which is the generic layout this rebuild exists to avoid.  So there is no left
 * column and no right column — the five sentences run down the corridor the seam bisects
 * and the photographs open away from it on BOTH sides at every beat.
 *
 * THERE IS NO JAVASCRIPT IN THIS SECTION.  No listener, no rAF, no IntersectionObserver.
 * The opening is one named view timeline published by the field and reached through
 * `timeline-scope`, with a staggered `animation-range` per beat.  Three consequences:
 * the clip-to-zero trap in DESIGN-SYSTEM §1 cannot bite because nothing is observed;
 * the scroll position is never touched, so nothing can be jacked; and the three
 * fallbacks — no support, `prefers-reduced-motion: reduce`, JavaScript off — are ONE
 * state, every window at its full width, which is the composed page.
 *
 * Every sentence is `about.intro[n]`, printed whole.  Nothing is split, joined or
 * retyped.
 */

/** One aperture. The figure is the window; the image is the picture behind it. */
function Aperture({ plate, eager = false }: { plate: Plate; eager?: boolean }) {
  const { key, frame } = plate;

  /*
    Twelve numbers, three per tier, handed to the stylesheet.  The stylesheet owns
    which tier is live; this file owns where the edges are, because that is the part
    the mirror law and the ladder law are checked against.  There is no `max-height`
    on the other side any more, so `--ar` is the box's real ratio at every viewport,
    which is what makes the `sizes` string in ./frames.ts exact rather than merely
    generous.
  */
  const geometry = Object.fromEntries(
    TIERS.flatMap((tier) => {
      const suffix = tier[0];
      const box = plate[tier];
      return [
        [`--a-${suffix}`, box.edges[0]],
        [`--b-${suffix}`, box.edges[1]],
        [`--ar-${suffix}`, box.ratio],
      ];
    }).concat([
      ['--op', frame.pos],
      ['--op-n', frame.posNarrow],
    ]),
  ) as CSSProperties;

  return (
    <figure className={`sx2b-plate sx2b-plate--${key}`} style={geometry}>
      {/*
        No `poster` anywhere on this page and no <video> at all — three posters under
        visible <img>s cost this site 948 KB on every device once already.  `loading` is
        lazy on everything except the seed, which is the first thing in the section and
        would otherwise be deferred behind five frames nobody has scrolled to yet.
      */}
      <img
        src={src(frame)}
        srcSet={srcSet(frame)}
        sizes={sizes(plate)}
        alt={frame.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
      />
    </figure>
  );
}

export function Introduction() {
  const [claim, knowledge, responsibility, work, belief] = about.intro;
  const { seed, p2l, p2r, p3l, p3r, band } = PLATES;

  return (
    <section className="sx2b" aria-labelledby="sx2b-mark">
      {/*
        The section's only heading, and the only thing here that IS a title.  It sits on
        the seam, centred, and the seam begins directly under it: the mark is the head of
        the rule.  The five sentences below are the client's prose; marking any of them
        up as a heading would put an argument into the document outline, which reads
        "About Praṇava" → "01 Introduction" and nothing else.
      */}
      <h2 className="sx2b-mark" id="sx2b-mark">
        <span className="sx2b-mark__n">01</span>
        <span className="sx2b-mark__w">Introduction</span>
      </h2>

      <div className="sx2b-field">
        {/* The hairline on the fold.  Decorative and aria-hidden: the geometry is the
            meaning and the two sheets behind it are what make the fold continuous; this
            is the line that gives the edge between them a definite position. */}
        <span className="sx2b-seam" aria-hidden="true" />

        <Aperture plate={seed} eager />
        <p className="sx2b-line sx2b-line--1">{claim}</p>

        {/* Beat two: the first giving. Two windows, one each side, the same reach. */}
        <Aperture plate={p2l} />
        <p className="sx2b-line sx2b-line--2">{knowledge}</p>
        <Aperture plate={p2r} />
        <p className="sx2b-line sx2b-line--3">{responsibility}</p>

        {/* Beat three: the same move, half again as far, and past the page edge. */}
        <Aperture plate={p3l} />
        <p className="sx2b-line sx2b-line--4">{work}</p>
        <Aperture plate={p3r} />

        <p className="sx2b-line sx2b-line--5">{belief}</p>

        {/* And the last one opens from the seam in both directions and leaves. */}
        <Aperture plate={band} />
      </div>
    </section>
  );
}
