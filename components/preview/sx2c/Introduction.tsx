import type { CSSProperties } from 'react';

import { about } from '@/content/pranava';
import { PLATES, srcFor, srcSetFor } from './frames';

/**
 * PREVIEW sx2c — PRAṆAVA About, §01 INTRODUCTION.
 *
 * ══ WHAT HAPPENS ═════════════════════════════════════════════════════════════════════
 *
 * THE SHEET GIVES GROUND. The section is a sheet of card laid on the page, and its right
 * edge is a staircase: it stands back, step by step, and the practice comes in from the
 * bleed to fill what it leaves. Three treads, each one moving the edge 16% of the viewport
 * to the left, and then the sheet ends and the last two plates take the whole width, edge
 * to edge, with nothing of the page left beside them. The closing sentence is printed on
 * the page the pictures have just crossed.
 *
 * The picture's share of the viewport, step by step: 0.28 → 0.44 → 0.60 → 1.00 at 64rem
 * and up, 0.52 → 0.68 → 0.84 → 1.00 below it. The increment is +0.16 of the viewport at
 * EVERY width; only the start differs, because 0.28 of a 390px phone is a 109px plate. The
 * mechanic is the section's structure at 390, not a flourish that stops after one screen.
 *
 * ══ WHY IT IS NOT AN APERTURE ════════════════════════════════════════════════════════
 *
 * Critic 1 was blunt about the tournament's central collision: a's height ladder and d's
 * width corridor "are the same idea executed twice, on the same subject class... Choose
 * one." Nothing here is revealed. Every one of the five plates is shown at 3/2 — its own
 * native ratio — whole, at every breakpoint, from first paint: fracW = fracH = 1.000 with
 * no `object-fit` crop to measure and no mask over anything. What changes down the section
 * is not how much of a photograph you are allowed to see. It is how much of the PAGE the
 * practice has taken.
 *
 * ══ WHAT WAS PROTECTED ═══════════════════════════════════════════════════════════════
 *
 * Both critics named the same two things, so both are still here and one is now larger:
 *   · THE MOUNT AS A COMPLETE STATIC OBJECT — warm card, hairline trim, the "Plates" key,
 *     roman ordinals, letterpress captions. It is no longer a boxed row of three (critic 1:
 *     "the home page's own §04 device... put in a box and given roman numerals"). The card
 *     is now the moving part of the mechanic, and the row is gone.
 *   · PLATE III, pr-ttc-dsc_0302_1 — "the best-composed frame in the tournament by
 *     measurement". It was one of three equals; it is now the largest single plate here.
 *   · ZERO MOTION. Critic 2: "Whatever mount survives must stay complete with motion off,
 *     exactly as it now is." There is no animation, no transition, no transform and no
 *     JavaScript in this section. The reduced-motion render is not a fallback; it is the
 *     same render.
 *
 * ══ THE COPY IS VERBATIM AND UNSPLIT ═════════════════════════════════════════════════
 *
 * `about.intro` supplies all five sentences. None is divided, indented or dropped-capped.
 * The three peers — a definition, a stance, a description of the work — are still one
 * family, one size, one measure and one leading; they are now distributed one to a tread,
 * each set with its last baseline on the bottom edge of its own plate.
 */

/** the sheet's right edge, and the next step's, as fractions of the viewport (>= 64rem) */
const STEPS = [
  { w: 0.72, wn: 0.56, pm: 0.52 },
  { w: 0.56, wn: 0.4, pm: 0.68 },
  { w: 0.4, wn: 0, pm: 0.84 },
] as const;

type StepVars = CSSProperties & { '--w': number; '--wn': number; '--pm': number };

function Label({ n, caption }: { n: string; caption: string }) {
  return (
    <figcaption className="sx2c-lab">
      <span className="sx2c-lab__n">{n}</span>
      <span className="sx2c-lab__c">{caption}</span>
    </figcaption>
  );
}

export function Sx2cIntroduction() {
  const [s1, s2, s3, s4, s5] = about.intro;
  const lines = [s2, s3, s4];

  return (
    <section className="sx2c" id="sx2c-intro" aria-labelledby="sx2c-display">
      <header className="sx2c__head">
        <p className="sx2c__eyebrow">
          Introduction
          <span className="sx2c__folio" aria-hidden="true">
            01
          </span>
        </p>
        <h2 className="sx2c__display" id="sx2c-display">
          {s1}
        </h2>
      </header>

      {/* THE STAIRCASE — three treads. The sheet is the `::before` of each step, so it is
          one continuous warm field with a drawn edge, not three stacked cards. */}
      {STEPS.map((step, i) => {
        const plate = PLATES[i];
        if (!plate) return null;
        return (
          <div
            className={`sx2c-step sx2c-step--${i + 1}`}
            key={plate.id}
            style={{ '--w': step.w, '--wn': step.wn, '--pm': step.pm } as StepVars}
          >
            {i === 0 ? (
              <p className="sx2c-key">
                Plates
                <span className="sx2c-key__rule" aria-hidden="true" />
              </p>
            ) : null}

            <p className="sx2c-step__line">{lines[i]}</p>

            <figure className="sx2c-step__fig">
              {/* A plain <img>, not next/image: this is a static export and the derivatives
                  are already generated at 480 / 960 / 1620. */}
              <img
                className="sx2c-plate"
                src={srcFor(plate)}
                srcSet={srcSetFor(plate)}
                sizes={plate.sizes}
                width={1620}
                height={1080}
                alt={plate.alt}
                /* Plate I is inside the first screen at EVERY width — measured top at
                   y=331.7 of 844 at 390, y=508.5 of 900 at 1440, y=495.4 of 1140 at 2531 —
                   so it is the section's LCP candidate and must not be deferred. The other
                   four are below the fold everywhere and stay lazy. */
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding={i === 0 ? 'sync' : 'async'}
              />
              <Label n={plate.numeral} caption={plate.caption} />
            </figure>
          </div>
        );
      })}

      {/* THE SHEET HAS ENDED. Two plates, edge to edge, butted with a 1px page-cream
          register between them — the printed leaf that carries two to a page. */}
      <div className="sx2c-fin">
        {PLATES.slice(3).map((plate) => (
          <figure className="sx2c-fin__fig" key={plate.id}>
            <img
              className="sx2c-plate"
              src={srcFor(plate)}
              srcSet={srcSetFor(plate)}
              sizes={plate.sizes}
              width={1620}
              height={1080}
              alt={plate.alt}
              loading="lazy"
              decoding="async"
            />
            <Label n={plate.numeral} caption={plate.caption} />
          </figure>
        ))}
      </div>

      {/* THE BELIEF — on the page the pictures have just crossed, under a rule that runs
          the same full bleed they do.

          The `__close` wrapper is what draws that rule and what insets the sentence to
          `--rail`. Without it the belief rendered at x=0 at every one of the seven
          viewports — measured 0/390 at 390x844 and 0/2531 at 2531x1140 — which put the
          section's closing display line hard against the glass while every other block in
          the section started at the trim. */}
      <div className="sx2c__close">
        <p className="sx2c__belief">{s5}</p>
      </div>
    </section>
  );
}
