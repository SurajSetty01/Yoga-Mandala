import type { CSSProperties } from 'react';
import { about, journeys } from '@/content/pranava';
import { CLIPS, FRAMES } from './frames';
import { Cap, Loop, Shot } from './parts';

/**
 * HERO — THREE WINDOWS ONTO THE SAME PRACTICE, AND THE MIDDLE ONE IS STILL GOING.
 *
 * The page's subject is duration and return, and the first thing it does is repeat itself.
 * Three tall apertures stand side by side; all three hold a row of people holding one
 * identical shape, receding down a hall until you stop counting them. Two are photographs.
 * The third is the same thing moving — which is the only way a web page can show that
 * something is still happening.
 *
 * The apertures OPEN: each starts at 0.62 of its width and widens to full as the hero
 * arrives, the moving one first and its neighbours a beat behind. Nothing else on this site
 * does that, and the reading of it is the right one — the practice comes into view rather
 * than sliding, fading or zooming in.
 *
 * THE TYPE IS NEVER ON THE PICTURE. The home page's hero already owns type-inside-a-moving-
 * photograph on a shaped scrim, and putting this page's on the reversed ground makes its
 * contrast a constant instead of a bet on where the daylight falls at 1024x768 — the
 * viewport DESIGN-SYSTEM §1 records as the hard case.
 *
 * The `<h1>` is the page's name and it is the only one on the page. The line above it is
 * the Blueprint's own visitor intent for this journey, verbatim; the line below is the
 * first of Praṇava's four values, verbatim. Neither is retyped here — both are read out of
 * content/pranava.ts.
 */
const delay = (ms: number) => ({ '--pc-d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="pc-s pc-s--deep pc-hero" id="pc-hero">
      <div className="pc-rail pc-hero__in">
        <p className="pc-hero__intent">{journeys.practice.intent}</p>
        <h1 className="pc-hero__h1">Practice</h1>

        {/*
          The opening is a CSS load animation and not a JavaScript reveal, deliberately.
          A reveal has to be switched on by the island after hydration, which means the
          start state lands AFTER the browser has already painted the finished one — a
          visible snap on exactly the element a reader is looking at when the page
          arrives. As keyframes with `both`, the start state is in the first paint, no
          JavaScript is needed for it at all, and the global reduced-motion rule
          (`* { animation: none }`) leaves the windows simply open.
        */}
        <div className="pc-hero__row">
          <figure className="pc-win" style={delay(130)}>
            <Shot
              frame={FRAMES.rowFold}
              sizes="(max-width: 719px) 33vw, (max-width: 1099px) 30vw, 22rem"
              eager
            />
          </figure>

          <figure className="pc-win pc-win--mid" style={delay(0)}>
            <Loop clip={CLIPS.held} eager />
          </figure>

          <figure className="pc-win" style={delay(260)}>
            <Shot
              frame={FRAMES.rowLong}
              sizes="(max-width: 719px) 33vw, (max-width: 1099px) 30vw, 22rem"
              eager
            />
          </figure>
        </div>

        <div className="pc-hero__foot">
          <p className="pc-hero__lead">{about.values[0].body}</p>
          <Cap dark>Three rows of one shape. The centre window is moving.</Cap>
        </div>
      </div>
    </section>
  );
}
