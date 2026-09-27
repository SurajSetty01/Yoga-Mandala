import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { GROUND, SLICES, scale, sizes, src, srcSet, top, type Slice } from './frames';

/**
 * 01 · INTRODUCTION — the room is brought onto one floor, a sentence at a time.
 *
 * WHAT HAPPENS. The claim is set large: "Yoga is more than a practice on the mat." Along
 * the bottom of the screen lies a band of nine upright slices of one venue — a prepared
 * mat, the practice hall, the open pavilion, the banyan, the lane — cut from nine
 * photographs and meant to stand on one continuous ground line. Only the mat is in place.
 * Every other slice waits sunk below it, so the band's top edge is a broken skyline.
 *
 * Then the argument is read. Each of the four sentences after the claim rises into view
 * over the band's top edge, standing over the stretch of room it speaks for, and as it
 * rises that stretch lifts into place beside the last one: knowledge raises the hall,
 * reverence and responsibility raise the pavilion and the banyan, the work raises the
 * garden, the belief raises the lane. By the last sentence every floor — red oxide,
 * pavilion boards, concrete apron, earth — meets every other on one line, and the whole
 * room is standing under the argument. The practice on the mat was one slice of it.
 *
 * THE BAND SITS AT THE BOTTOM OF THE SCREEN, NOT THE TOP. It is the ground the page
 * stands on; the sentences are read above it at eye level and come up from behind it.
 *
 * NO JAVASCRIPT. The band is `position: sticky; bottom: 0`, each sentence publishes a view
 * timeline, and `timeline-scope` on the run lets the slices — which live in a different
 * subtree — animate against the sentence that raises them. Only `transform` moves. The
 * reader's scroll is never touched.
 *
 * NOTHING IS REACHABLE ONLY THROUGH MOTION. Every sentence is full-opacity, full-size text
 * in normal flow at every scroll position — none of it is faded, masked or animated. With
 * `prefers-reduced-motion`, with JavaScript off (nothing here needs it), or in a browser
 * without scroll-driven animations, the band is simply at rest: the four sentences step
 * down across the page from above the mat to above the lane, and the whole room stands
 * on one line beneath them. That is the finished state, and it says the same thing.
 *
 * Every sentence is `about.intro[n]`, printed whole. Nothing is split, joined or retyped.
 */

function SliceFigure({ s }: { s: Slice }) {
  const style = {
    '--w': s.weight,
    '--k': scale(s),
    '--t': top(s),
    '--x': s.x,
    '--sink': `${Math.round(s.sink * 100)}%`,
    '--lag': `${s.lag}svh`,
  } as CSSProperties;

  return (
    <figure className="sx2b-slice" data-g={s.group} data-tier={s.tier} style={style}>
      <img
        src={src(s)}
        srcSet={srcSet(s)}
        sizes={sizes(s)}
        alt={s.alt}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

export function Introduction() {
  const [claim, ...argument] = about.intro;

  return (
    <section className="sx2b" aria-labelledby="sx2b-mark" style={{ '--g': GROUND } as CSSProperties}>
      <div className="sx2b-rail sx2b-head">
        {/*
          The register mark, the same object every section on this page opens with. It is
          the section's only heading: the five sentences are the client's prose, and marking
          any of them as a heading would put an argument into the document outline.
        */}
        <h2 className="sx2b-mark" id="sx2b-mark">
          <span className="sx2b-mark__n">01</span>
          <span className="sx2b-mark__rule" aria-hidden="true" />
          Introduction
        </h2>
        <p className="sx2b-claim">{claim}</p>
      </div>

      {/*
        The run: the sentences first, in reading order, and the band last. Sticky at the
        bottom, the band waits at the foot of the screen for the whole run and the sentences
        scroll up from behind it; at the end of the run it is released where it would have
        been anyway, directly under the last sentence.
      */}
      <div className="sx2b-run">
        <div className="sx2b-rail sx2b-steps">
          {argument.map((line, i) => (
            <p
              className="sx2b-step"
              key={line}
              data-step={i + 1}
              style={{ '--i': i } as CSSProperties}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="sx2b-stage">
          <div className="sx2b-rail">
            <div className="sx2b-band">
              {SLICES.map((s) => (
                <SliceFigure key={s.id} s={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
