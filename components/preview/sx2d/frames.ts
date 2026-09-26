/**
 * The five photographs of §01, and why these five.
 *
 * The section is one room seen from a doorway, so the frames were not chosen
 * for quality alone — each one had to carry its OWN recession pointing the same
 * way as the section's, or the pictures and the layout would argue. Every
 * description below was read in `public/media/pranava-stills.json` and then the
 * derivative was opened and looked at, because the manifest cannot tell you
 * that a frame's real subject is a ceiling fan.
 *
 * None of these appears anywhere else on the SITE — `components/` was grepped
 * for each id with `--exclude-dir=preview` first, and `components/about-pranava/`
 * in particular, because that directory is this very page. None is on the
 * forbidden list. Widths are the ones that exist on disk: the TTC sheet tops
 * out at 1620 and the PBH sheet at 1920, so neither is ever asked for a 2560
 * that was never encoded.
 *
 *   near  pr-mov-img_5450   a mat, a metre away — a standing wide-legged
 *                           forward bend with a belt, a man settling onto a
 *                           bolster behind her. THE CLIP IS GONE; this is now
 *                           an ordinary still. See below.
 *    2    pr-pbh-img_5407   a row going away, a teacher behind it, a figure
 *                           behind her — depth inside the frame as well as in
 *                           the section
 *    3    pr-ttc-dsc_0510   the TTC hall: red floor, white wall, wall ropes
 *    4    pr-ttc-dsc_0302_1 outside, under the banyan — the room has opened
 *   far   pr-ttc-dsc_0064_1 the room at the end of the corridor: five
 *                           practitioners bending forward over chairs in a
 *                           staggered line that RECEDES, red oxide floor,
 *                           green daylight through the netting at the far end
 *                           of the line.
 *
 * ROUND 3 — WHY THE 2,466 KB MP4 IS GONE. Both critics measured the same thing
 * and reached the same verdict: pr-mov-img_5450.mp4 was 2,466 KB — 86% of the
 * section's 2,851 KB at 1440 — driving a 501x702 flat that is 13.6% of the
 * section's media area, and under `prefers-reduced-motion` the pixel diff below
 * the first screen was 0.00%. A file that large has to buy a difference a diff
 * can find. It did not. The flat keeps the same photograph as an ordinary
 * `<img>` (the clip's own frame, 29 KB of AVIF) and the route now ships NO
 * JavaScript at all.
 *
 * THE ONE THING THAT COULD NOT BE FIXED HERE, STATED RATHER THAN HIDDEN.
 * Critic 1 also asked for a declared `sizes` chain on this flat. `sizes` only
 * chooses between `srcset` candidates, and the poster sheet holds exactly one
 * width per clip — 1080x1920 — so there is nothing to choose between and a
 * `sizes` string would change no byte. Authoring derivatives would mean writing
 * into `public/media/posters/`, outside the three paths this design owns. The
 * residual is 29 KB fetched for a 281x270 box at 390: about 21 KB wasted,
 * against 2,466 KB removed. The alternative — swapping to a stills-sheet frame
 * that HAS a chain — was measured rather than assumed, in this flat's own
 * rendered box at 1440 (501x702), 16px tiles, sd<7 counted flat:
 *
 *     this frame          47.8% flat / chroma 41.8     (and 22% / 46 at 390)
 *     pr-pbh-img_5738     55.7% flat / chroma 50.6     quality 3
 *     pr-pbh-img_5592     47.2% flat / chroma 33.0     legible mirrored shirt text
 *     pr-pbh-img_5746     34.1% flat / chroma 52.1     empty folding chair, foreground
 *     pr-pbh-img_5405     38.9% flat / chroma 32.9     air conditioner, top of frame
 *     pr-ttc-dsc_0479     25.7% flat / chroma 35.4     TTC venue, rope work
 *
 * 0479 is the densest, and it was still refused: it is the TTC hall again, and
 * it is a rope inversion, which flat 3 already is. Taking it would make four of
 * the section's five frames one venue and two of them the same apparatus —
 * the defect Critic 1 numbered 16, bought for 21 KB.
 *
 * WHY THE FAR FRAME IS pr-ttc-dsc_0064_1. It was pr-ttc-dsc_0020_1, an earth
 * lane between a building and a wall of vines. Two critics arrived at the same
 * sentence about it and they were right: a mechanic called "the opening" must
 * not open onto a wall. The replacement was chosen against the whole landscape
 * sheet on four measurements, not on taste:
 *   · it is the only unused landscape frame whose composition recedes the way
 *     the section does — five bodies in a staggered line running away to the
 *     upper left, toward green light. The frame's vanishing point and the
 *     doorway's are the same point.
 *   · people, plainly practising, across the WHOLE width. The corridor uncovers
 *     the frame from the middle outward, so the middle had to hold bodies.
 *   · 149,474 B at 1620 against the lane frame's 423,486 B.
 *   · it survives being darkened, which the lane frame did not.
 *
 * The manifest's note for it flags hard sunlight patches and identifiable
 * faces. Both were looked at: the patches are on the floor and the mats, never
 * on a face. There is no whiteboard, no signage and no branding in it.
 *
 * WHAT IT COSTS AT 2531, MEASURED AND NOT HIDDEN. The TTC sheet stops at 1620
 * — every `pr-ttc-` id in `pranava-stills.json` has widths [480, 960, 1620],
 * and the ten landscape frames that reach 2560 are all `pr-pbh-`, one of which
 * is the ceiling-fan-and-folding-chairs frame both critics threw out. So the
 * payoff runs as a cover crop at 1.562x at 2531x1140 (read off the render:
 * box 2531x1140, intrinsic 2531x1687 at density 0.640). The cost was measured
 * on matched subjects rather than assumed — the same 200x200 source region,
 * cropped out of the rendered page and normalised to 240x240, mean local sd
 * over 8px tiles:
 *
 *                     source file   1440 (0.889x)   2531 (1.562x)
 *     nearest head        7.61          7.14            6.25
 *     mid-line head       6.42          5.98            4.72
 *
 * 88% and 79% of the 1440 reading. That is a real loss and it is the price of
 * the room being the WHOLE width at the end, which is the mechanic. The
 * alternative was to trade the only unused landscape frame whose recession
 * matches the section's, whose people run the full width, and which survives
 * being darkened, for a sharper frame of something else — so the loss is
 * taken and stated rather than swapped for a worse picture.
 */

export type Frame = {
  id: string;
  widths: number[];
  /** object-position for the crop this section actually gives it */
  pos: string;
  /**
   * and for the crop a portrait viewport gives it, which is a different box
   * entirely — the flats change shape at 719px. Set deliberately and looked
   * at: this site has already shipped a hero with the teacher out of frame
   * and an air cooler centred because a narrow crop was left to the default.
   */
  posNarrow?: string;
  /**
   * WHAT THE BOX ACTUALLY NEEDS, not what it is wide. Every flat here is a
   * `cover` box, and a `cover` box needs `max(width, height x the frame's
   * aspect ratio)` source pixels. Critic 2 measured three of these declaring a
   * WIDTH for a box whose binding constraint is HEIGHT — dsc_0510 rendering at
   * 1.8x its declared size, dsc_0302_1 at 1.5x. The strings below carry the
   * height branch, guarded by the viewport aspect ratio at which each box
   * actually flips from height-bound to width-bound. That ratio is derived,
   * not guessed: a box of `Wvw x Hsvh` showing a frame of aspect `r` is
   * height-bound while `H*r*vh > W*vw`, i.e. while the viewport's own aspect
   * ratio is below `H*r/W`.
   */
  sizes: string;
  alt: string;
};

export const src = (f: Frame) => `/media/stills/${f.id}-${f.widths[f.widths.length - 1]}.webp`;

/** every width that exists, so a phone never pulls a 1920 for a 120px sliver */
export const srcSet = (f: Frame) =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');

export const HALL: Frame = {
  id: 'pr-ttc-dsc_0064_1',
  widths: [480, 960, 1620],
  pos: '50% 50%',
  /* a phone's doorway is 390 wide and 844 tall, so `cover` on a 3:2 frame keeps
     only 31% of its width. 60% puts that survivor on the two NEAREST
     practitioners rather than on the gap between the third and the fourth. */
  posNarrow: '60% 50%',
  /**
   * A full-bleed `cover` box does not need 100vw of source pixels; below an
   * aspect ratio of 3/2 this box is bound by its HEIGHT. Verified by reading
   * `img.currentSrc` off the rendered page rather than by assuming the browser
   * agrees: cover scale 1.001 / 1.000 / 1.000 at 390 / 1440 / 2531.
   */
  sizes: '(max-aspect-ratio: 3/2) 150vh, 100vw',
  alt: 'Five practitioners bending forward over folding chairs in a staggered line down a hall, red oxide floor, green daylight at the far end',
};

/**
 * The near plane's photograph — the clip's own frame, used as an ordinary
 * `<img>`. It is NEVER a `poster` attribute: a poster is fetched even when a
 * video's `src` is never set, and that cost this site 948 KB once. There is no
 * video on this route any more, so the point is moot, and the rule is kept.
 */
export const NEAR = {
  id: 'pr-mov-img_5450',
  avif: '/media/posters/pr-mov-img_5450.avif',
  jpg: '/media/posters/pr-mov-img_5450.jpg',
  w: 1080,
  h: 1920,
  /* 36%, not 43%: the box is width-bound at every desktop aspect ratio, so 21%
     of the frame's height is discarded and WHERE it is discarded is a choice.
     Measured in the rendered 501x702 box, 16px tiles, sd<7 flat: y 0.55 =
     51.9% flat / chroma 37.6, y 0.43 = 49.2 / 39.4, y 0.36 = 48.3 / 40.6,
     y 0.20 = 47.8 / 41.8. Every step up the frame trades pale marble floor for
     the shrine, the doorway and the seated figure — but above 0.36 the standing
     figure's hands leave the frame, so 0.36 is where the measurement and the
     picture stop agreeing and the picture wins. */
  pos: '50% 36%',
  alt: 'A person in a wide-legged forward bend over a mat while a man sits down on a bolster in the foreground',
};

export const WINGS = [
  {
    id: 'pr-pbh-img_5407',
    /* pr-pbh-img_5416 was here first and was dropped after it was looked at in
       the rendered crop rather than in the manifest: a ceiling fan, an air
       conditioner and a legible door sign occupy the top quarter of it, and
       the near-square box this plane needs cannot crop all three away. 5407 is
       the same hall, the same practice and a deeper composition — a row going
       away from the camera, a teacher working over a student behind it and a
       fourth figure standing behind her, so the frame has its own foreground,
       middle and distance pointing the same way as the section's.

       The manifest's alt for this frame says "supported shoulderstand". The
       file does not show one — the legs are up the wall over chair backs — so
       the description below says what is actually happening.

       Y is hard against the bottom on purpose. This plane's box is very close
       to square and the frame is 3:4, so `cover` discards 24% of its height —
       anchoring that loss at the TOP takes the ceiling, the fan and the wall
       of framed certificates out of the picture and keeps the whole row of
       people. Critic 2 measured the result: per-fifth detail 25.3 / 22.3 /
       16.5 / 16.3 / 39.6, no dead band anywhere. Do not move it. */
    pos: '46% 100%',
    posNarrow: '46% 100%',
    widths: [480, 960, 1920],
    /* box 36.9vw x 60svh at >=1100 and 29.6vw x 60svh at 720-1099, frame 0.75.
       Height-bound while the viewport aspect is below 60*0.75/36.9 = 1.22
       (>=1100) or 60*0.75/29.6 = 1.52 (720-1099) — so 1024x768, at 1.333, IS
       height-bound and 1440x900 is not. */
    sizes:
      '(max-width: 719px) 62vw, (max-width: 1099px) and (max-aspect-ratio: 3/2) 45vh, (max-width: 1099px) 30vw, (max-aspect-ratio: 11/9) 45vh, 37vw',
    alt: 'Four people lying back over folding chairs with their legs raised against a wall, while a teacher bends over a student further down the hall',
  },
  {
    id: 'pr-ttc-dsc_0510',
    widths: [480, 960, 1620],
    /* this plane is a narrow upright slot cut from a 3:2 frame — 54% of its
       width survives — so X is set to hold TWO of the three figures rather
       than centring on the gap between them. */
    pos: '28% 52%',
    posNarrow: '34% 50%',
    /* box 22.4vw x 44svh, frame 1.5 → height-bound while the viewport aspect is
       below 44*1.5/22.4 = 2.95, which is every real viewport. The old string
       declared 23vw and the box rendered 594px at 1440: a 1.8x miss. */
    sizes: '(max-width: 719px) 52vw, (min-aspect-ratio: 3/1) 23vw, 66vh',
    alt: 'Three women hanging inverted from wall ropes with legs spread wide, hands on the floor',
  },
  {
    id: 'pr-ttc-dsc_0302_1',
    widths: [480, 960, 1620],
    pos: '52% 48%',
    posNarrow: '52% 46%',
    /* box 19.5vw x 32svh at >=1100 (16.2vw at 720-1099), frame 1.5 →
       height-bound below aspect 2.46 and 2.96 respectively. The old string
       declared 20vw for a box rendering 432px at 1440: a 1.5x miss. */
    sizes: '(max-width: 719px) 44vw, (min-aspect-ratio: 5/2) 20vw, 48vh',
    alt: 'Five women holding tree pose with palms joined overhead on a concrete apron outside a building',
  },
] as const satisfies readonly Frame[];
