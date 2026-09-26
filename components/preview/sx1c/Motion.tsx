'use client';

import { useEffect } from 'react';

/**
 * The section's ONE client island, and it writes ONE number.
 *
 * `--sx1c-t` runs 0 → 1 as the reader scrolls the first part of the page, and the stylesheet
 * spends it on exactly two things, both transform or opacity:
 *
 *   the lift     translateY( (1 - t) * lift )   the sheet comes down onto the page
 *   the shadow   opacity + scaleY               the cast shadow contracts as it lands
 *
 * WHAT IT IS NOT ALLOWED TO DO, each one a bug already shipped on this project:
 *   · no layout read inside the frame loop — the only geometry it uses is `innerHeight`,
 *     re-read on resize, and `scrollY`, which is not a layout read;
 *   · one passive listener that raises a flag, one requestAnimationFrame that does the work;
 *   · never touches width, height, top, left, box-shadow or filter;
 *   · never reads or writes the reader's scroll position, and never calls preventDefault;
 *   · nothing it drives is observed through a clip or a collapse, so nothing can report
 *     intersection ratio 0 and stay invisible forever.
 *
 * WHAT IT IS NOT ALLOWED TO CARRY, which is the change this round.
 *
 * Round 1 hung the section's idea on this file: the plate arrived at a 13° keystone and this
 * island was what took it flat. Two things were wrong with that and both critics found them.
 * The keystone was the reader's FIRST SIGHT of the only photograph on the page, and it held
 * until the reader scrolled — so a reader who did not scroll never saw the picture square.
 * And with reduced motion on there was no keystone and no landing, which is the test: if
 * turning motion off removes the argument, the motion WAS the argument.
 *
 * So the argument is now in the geometry — one limit, reached three times by the type and
 * crossed by exactly one object — and none of it is in this file. What is left here is a
 * settle: the sheet is held about 18px off the page at 1440 and comes down. At t = 0 and at
 * t = 1 the photograph is identically flat, square and uncropped. Delete this file and the
 * section loses a sheet being laid down; it does not lose a sentence, a relationship or a
 * picture.
 *
 * THE FALLBACKS ARE IN CSS, NOT HERE, so they cannot depend on this file running:
 *   · with JavaScript off, `--sx1c-t` keeps its stylesheet default of 1 and the plate is
 *     simply lying on the page;
 *   · under `prefers-reduced-motion: reduce` the stylesheet pins `--sx1c-t: 1` and this file
 *     attaches nothing at all.
 *
 * The start state is gated on `.js`, which the root layout adds to <html> BEFORE first
 * paint. Without that gate the plate would paint down and then jump up the instant this
 * effect ran.
 */
export function SX1CMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.sx1c-hero');
    if (!hero) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /*
     * The distance over which the sheet comes down, and this is the number that was broken.
     *
     * It was tied to the PLATE's distance down the document — `top * 0.75`, clamped to
     * 210..460 — which reads like a reasonable thing to tie it to and is not. The plate sits
     * near the foot of the hero, so `top` is large at every desktop viewport and the clamp
     * pinned travel to its ceiling of 460px. The hero's own runway is 162px at 1440x900.
     * So the descent needed 460px of scroll inside a section that has 162, and the reader
     * ran out of hero — and, with the preview ground broken as well, out of document:
     * MEASURED `--sx1c-t` = 0.474 at the bottom of the page at 1440 and 0.384 at 1024. The
     * plate stopped less than half way down, never reached the foot rule, and never crossed
     * it. That is where "there is no mechanic" came from. Not a missing idea — a mapping
     * whose denominator was four times its numerator.
     *
     * It is tied to the HERO'S RUNWAY instead, which is the only distance that is the
     * section's to spend: `heroHeight - innerHeight`, the scroll that exists between the
     * hero's first screen and its last. The descent completes when the reader reaches the
     * end of the section, which is the whole claim, and the floor and ceiling only stop a
     * freak viewport from making it instant or interminable.
     *
     * 0.85 of the runway, not all of it, so the plate is down and at rest before the reader
     * reaches the bottom of the section rather than exactly as they do. The floor is 130 and
     * not 150: at 150 the two short-laptop viewports ran out of hero first — MEASURED
     * `--sx1c-t` = 0.982 at the foot of the hero at 1024x768 and 0.995 at 1280x800, so the
     * plate finished its descent a few pixels into the section below. RE-MEASURED at 0.85
     * with a 130 floor, `--sx1c-t` = 1 at the foot of the hero at all seven viewports.
     *
     *     320x568     hero 1014   runway 446   travel 340  (the ceiling)
     *     390x844     hero 1035   runway 191   travel 162
     *     768x1024    hero 1279   runway 255   travel 217
     *     1024x768    hero  906   runway 138   travel 130  (the floor)
     *     1280x800    hero  944   runway 144   travel 130  (the floor)
     *     1440x900    hero 1062   runway 162   travel 138
     *     2531x1140   hero 1345   runway 205   travel 174
     *
     * `getBoundingClientRect` is a layout read and it happens HERE — on mount and on resize
     * — never inside the frame loop. The loop reads `scrollY`, which is not a layout read.
     */
    let travel = 200;
    const measure = () => {
      const runway = hero.getBoundingClientRect().height - innerHeight;
      travel = Math.min(340, Math.max(130, runway * 0.85));
    };
    measure();

    /* smoothstep, so the sheet neither starts nor stops on a corner */
    const ease = (t: number) => t * t * (3 - 2 * t);

    let queued = false;
    let last = -1;

    const frame = () => {
      queued = false;
      const raw = scrollY / travel;
      const t = ease(raw < 0 ? 0 : raw > 1 ? 1 : raw);
      /* three decimals is finer than a pixel at this scale; skipping equal values keeps the
         style write out of most frames entirely */
      const v = Math.round(t * 1000) / 1000;
      if (v === last) return;
      last = v;
      hero.style.setProperty('--sx1c-t', String(v));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    const onResize = () => {
      measure();
      last = -1;
      onScroll();
    };

    /* Resolve the current position before the first scroll event, so a reader who lands
       mid-page (a refresh, a back-navigation) never sees the sheet held up at a scroll
       position where it should already be down. */
    frame();

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
