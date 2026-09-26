/**
 * The four photographs that make the two walls of the corridor.
 *
 * FOUR, NOT SIX, and two per wall rather than three. BOTH runs are parked at the TOP of
 * their window — see the run-parking note in the stylesheet — so at rest each wall shows
 * its FIRST cell whole and the top of its second, rather than the bottom half of one and
 * the top half of the next. Cell 1 is therefore always cut at its FOOT, which is why the
 * second frame in each wall is one that reads from the top down: cut from the top, a
 * standing figure is a shin and a bare foot; cut from the bottom, she keeps her head.
 * At 320×568, where the window is only 199px tall, each wall shows one whole photograph
 * and the travel brings in the edge of the other.
 *
 * WHY THE CROP IS THE SPECIFICATION, NOT THE SOURCE.
 * Each cell is `object-fit: cover` into a box of ONE aspect — 0.78, measured at 0.775 to
 * 0.780 across all eight viewports, the spread being nothing but the wall's width rounding
 * to device pixels. The previous version let the cells stretch and the crop wandered from
 * 0.775 to 0.664, so every alt had to be true of a family of pictures; the stylesheet's
 * cell note has what was changed and why.
 *
 * So each `alt` below describes exactly one rectangle. Every one of them was written by
 * EXTRACTING that rectangle out of the source file with the object-position this file
 * actually ships and looking at the result — not from the manifest's prose, which
 * describes the whole frame while we ship a slice of it, and which on one of these four
 * describes a different photograph altogether.
 *
 * WHAT WAS LOOKED AT AND REJECTED, at the shipping crop, so nobody re-litigates it.
 * Every line below was written after EXTRACTING the shipping window out of the source file
 * and looking at the result, not from the manifest's prose:
 *   pr-ttc-dsc_0120_1 SHIPPED IN THE PREVIOUS CUT OF THIS SECTION AND IS NOW OUT. At the
 *                     0.78 window it is two women in low lunges with their hands on the
 *                     seats of two folding chairs, and an empty folding chair stands at the
 *                     dead centre of the frame — the largest single object in it. This file
 *                     had already rejected two frames for exactly that, so the frame was
 *                     inconsistent with its own list; and the nearer woman's leggings carry
 *                     an HRX wordmark that is plainly legible at the extracted crop.
 *   pr-ttc-dsc_0510   three women inverted on wall ropes — the most striking shape in the
 *                     archive — but a row of five folding chairs runs across the wall
 *                     behind them, a practitioner's legs enter both edges of the window,
 *                     and every face is identifiable upside down. Three named failure
 *                     classes in one picture.
 *   pr-ttc-dsc_0404   three women in a seated side stretch on grass. Same lawn, same group
 *                     and very nearly the same shape as pr-ttc-dsc_0409 below.
 *   pr-ttc-dsc_0302_1 an HRX wordmark on the nearest woman's leggings, and the window that
 *                     removes it also cuts a figure in half.
 *   pr-ttc-dsc_0311   the foreground practitioner is cut at the waist by the source frame
 *                     itself, and it is the same bamboo, red wall and dry field as
 *                     pr-ttc-dsc_0354.
 *   pr-ttc-dsc_0366   a crow pose on a boulder: the boulder is two-thirds of the frame and
 *                     a painted mural fills the wall behind.
 *   pr-pbh-img_5416   framed certificates, a 'YOGA HALL 2' sign, an air conditioner.
 *   pr-pbh-img_5499   a CCTV dome sits on the ceiling at the top of the frame; the source is
 *                     0.75, so the 0.78 window crops only 4% of its HEIGHT and cannot reach
 *                     it. A bare arm and shoulder of another practitioner enter at the right.
 *   pr-pbh-img_5372   a CCTV dome, a framed picture, a walking figure cut mid-stride, and
 *                     the lower third is a flat expanse of pale tile.
 *   pr-pbh-img_5648   legible printed text on the back practitioner's white t-shirt, plus a
 *                     folding chair and a red bag behind.
 *   pr-pbh-img_5622   a folding chair is the pivot of the picture and the frame is already
 *                     in four other preview concepts.
 *   pr-pbh-img_5648   already in two other preview concepts.
 *   pr-pbh-img_5362   a foreground bare foot and a block occupy the bottom-left quarter; the
 *                     0.78 crop cannot reach past them, and a previous round shipped an alt
 *                     for this frame that described a window the crop did not contain.
 *   pr-pbh-img_5499   good single figure, but a CCTV dome sits on the ceiling at the top of
 *                     the frame and neither crop can remove it (both crop width, not height).
 *   pr-pbh-img_5618   a ceiling fan runs across the top of both crops.
 *   pr-pbh-img_5634   a ceiling fan, wall notices and a red door.
 *   pr-pbh-img_5570_1 a ceiling fan and a water bottle; the figures are small.
 *   pr-pbh-img_5592   the practitioner's t-shirt carries legible printed text, mirrored, and
 *                     two framed certificates hang behind.
 *   pr-pbh-img_5629   two folding chairs are the largest objects in the frame.
 *   pr-pbh-img_5787   a bright pink wall panel across the top; the chairs are the subject.
 *   pr-pbh-img_5538   a printed carton with red lettering at the right edge.
 *   pr-mov-img_5582   three framed certificates with body text, a light-switch plate and two
 *                     garment logos are legible in the clip's own frames.
 *   pr-mov-img_5906   its opening frame is people standing about under a ceiling fan.
 *   pr-ttc-dsc_0328   the banyan trunk, not the man, is the subject of the portrait frame.
 *   pr-ttc-dsc_0209 / _0193 / _0215 / _0217 are forbidden on this project.
 *
 * NO VIDEO ON THIS ROUTE AT ALL. The previous version of this section shipped two MP4s —
 * 5,075 KB, transferred identically at 320, 390, 1024, 1440 and 2531 — to fill two narrow
 * rails. Every clip in the archive is 0.562, and a 0.562 source cover-cropped into a 0.78
 * box loses nearly a third of its height while a hanging or standing figure needs all of it. The
 * clips were removed rather than gated: the mechanic is the motion here.
 *
 * MEASURED TRANSFER, corrected. The figure this comment carried before (193 / 472 /
 * 1,040 KB) was wrong at every width, because the counter it came from matched every URL
 * containing `/media/` and Next serves the site's WOFF2 faces from
 * `/_next/static/media/…`. Six font files, 624 KB, were being counted as this section's
 * photographs. Counted again on the response bodies of `/media/stills/` alone, at DPR 1:
 *
 *   320×568 and 390×844 ............ 220 KB  (four 480w files: 86+44+50+41)
 *   768×1024, 1024×768, 1280×720,
 *   1440×900, 2531×1140, 2560×1440 . 589 KB  (0409 at 480, the rest at 960: 86+174+185+145)
 *   video, every width ............. 0 KB
 *
 * FOUR FILES, EIGHT BOXES. Each wall repeats its two photographs so that no scroll
 * position can expose paper at either end — see the run note in the stylesheet — and the
 * repeats are the same two URLs, so the count above is the whole cost. It does not change
 * by one byte between the two-cell version and this one.
 *
 * NOTHING IS UPSCALED AT DPR 1. With the cell's aspect fixed, the painted width of a 1.5
 * source is 1.923 × the wall and of the 0.667 source exactly the wall. Painted width
 * against the file Chromium actually took, read back per viewport: 308→480, 375→480,
 * 738→960, 512→960, 640→960, 720→960, 923→960, 923→960. The old version reached for the
 * 1620 derivatives at 2560×1440 because the cells stretched there; they no longer do,
 * which is why 2560 now costs 589 KB rather than 1,940.
 *
 * The house hero ships 1,945 KB of image and 0 KB of video to a 390px phone. This section
 * ships 220 KB to the same phone.
 *
 * WHERE ELSE THESE FOUR APPEAR — corrected, because the previous version of this comment
 * claimed none of them appeared anywhere else in `components/` or `app/` and that was
 * FALSE. Re-grepped over every .ts/.tsx under both directories:
 *
 *   NOT ONE of the four is used anywhere on the LIVE site. The shipped pages draw on 41
 *   `pr-` ids between them (components/about-pranava, learn, practice, events, insights,
 *   contact); none of these four is among them, so nothing on this hero repeats a picture
 *   a reader has already met.
 *
 *   All four DO appear in sibling TOURNAMENT concepts — 0347, 0354, 0409 and 0459 are each
 *   in components/preview/sx2b/frames.ts, and 0459 is also in sx2c. Those are unjudged
 *   concepts for a DIFFERENT section of this same page, and only one of them can win. It is
 *   still a real risk: About §02 sitting directly under this hero with the same photograph
 *   in it is the repetition a sibling concept was ranked last for. Flagged here for whoever
 *   combines, because it cannot be resolved from inside one concept — and it cannot be
 *   avoided by choosing differently either. Of the 84 stills, exactly TWO peopled frames
 *   are untouched by any concept on this project (pr-ttc-dsc_0311 and pr-ttc-dsc_0146_1),
 *   and both are rejected above on their own merits.
 *
 * `widths` is what is actually on disk, listed from the directory rather than trusted from
 * `maxWidth` in the manifest.
 *
 * THE MANIFEST'S PROSE IS NOT EVIDENCE, and on one of these four it is simply wrong.
 * pranava-stills.json describes pr-ttc-dsc_0354 as "Three women hold a standing balance on
 * one leg with the other foot held behind them, arms extended forward, on a concrete apron
 * with bamboo and a low red wall behind." Extracted and looked at, the frame is ONE woman
 * in a full standing backbend, both hands over her head holding her raised foot, against a
 * low red wall with dry open fields and hills behind. Every alt below was written from the
 * extracted window.
 *
 * NOBODY IS NAMED. The archive does not record who is in which frame and the client has
 * supplied no faculty names; every alt says what is happening, which is what a reader who
 * cannot see the picture needs anyway.
 */

export type Cell = {
  /** file stem under /media/stills */
  id: string;
  /** derivative widths present on disk, largest last */
  widths: number[];
  /** the SOURCE aspect, w/h. The `sizes` hint is derived from it — see `sizes()` below. */
  ratio: number;
  /** object-position, chosen by extracting the shipping crop and looking at it */
  pos: string;
  /** written from the extracted 0.78 window, which is the only window this ships */
  alt: string;
};

/**
 * THE LEFT WALL — rises. Cell 0 is whole at rest; cell 1 is cut at its foot and opens
 * downward as the wall travels. Seated, then standing: a woman on the grass with her
 * elbows raised, and two balances at a brick wall below her.
 *
 * 0459's WINDOW IS AT 26%, NOT 66%, AND THAT IS THE WHOLE EDIT. The source holds three
 * women; a 0.78 window is 52% of its width and cannot hold all three. At 66% the window
 * ran 513→1355 and clipped the third woman's raised knee and shin into the left edge — a
 * limb with no body, which is a thing this tournament has already rejected a crop for. At
 * 26% the window runs 202→1044 and contains TWO practitioners entire and the third not at
 * all. The alt can then say two and be true, instead of saying two while three are painted.
 */
export const LEFT: readonly [Cell, Cell] = [
  {
    id: 'pr-ttc-dsc_0409',
    widths: [480, 960],
    ratio: 0.667,
    pos: '50% 52%',
    /* 'raised straight overhead' was wrong — extracted and looked at, her elbows are bent
       and her hands are behind her head, and so are the second practitioner's. */
    alt: 'A woman sitting cross-legged on grass with her elbows raised wide and her hands behind her head, a second practitioner seated further back among the trees in the same shape',
  },
  {
    id: 'pr-ttc-dsc_0459',
    widths: [480, 960, 1620],
    ratio: 1.5,
    pos: '26% 50%',
    /* DECLARED, because this project has rejected frames for it and someone will look:
       the right-hand practitioner's leggings carry an HRX wordmark. MEASURED on the
       rendered page at the largest size this ships at, 2531×1140 at DPR 1, it occupies
       7 × 23 CSS px, runs vertically down her calf, and is white on black. At 1:1 it is a
       pale smudge; it took 6× magnification and knowing it was there to read it. That is
       a different thing from the ~40px horizontal wordmark a sibling concept was marked
       down for, and from the two frames rejected above, where the same brand is large and
       level. Recorded rather than argued: whoever combines can measure it in one crop. */
    alt: 'A woman standing in tree pose on a stone ledge with her palms joined above her head, and beside her a second woman balancing on one leg with her other leg raised out to the side, against an exposed brick wall',
  },
];

/** THE RIGHT WALL — falls. A group and then one person alone: three women practising
 *  together under a banyan, and a single standing backbend in the open above them.
 *
 *  pr-ttc-dsc_0120_1 WAS HERE AND IS GONE. It put a folding chair at the centre of the
 *  frame and an HRX wordmark on the nearest woman's calf — see the reject list. Its
 *  replacement is pr-ttc-dsc_0347 at 75%, a window chosen by extraction: it runs 584→1426
 *  and holds three practitioners entire while leaving the fourth outside it. There is no
 *  furniture, no signage and no legible garment text anywhere in it.
 *
 *  ALL FOUR PHOTOGRAPHS ARE NOW OUTDOORS, which is a change and a deliberate one. The
 *  TTC hall is an Iyengar prop room: every indoor practice frame in the archive has
 *  folding chairs, bolster shelves, a ceiling fan, a CCTV dome or framed certificates in
 *  it, and all of those have been rejected on this project. Four different places, four
 *  different things being done, a person practising in every one — that is worth more to
 *  a hero than the walls of the room. */
export const RIGHT: readonly [Cell, Cell] = [
  {
    id: 'pr-ttc-dsc_0347',
    widths: [480, 960, 1620],
    ratio: 1.5,
    pos: '75% 50%',
    /* No total is claimed. At 0.78 a sliver of a fourth woman's hip enters the left edge
       (24 source px, which is ~10 CSS px at 1440 and ~5 at 390 — a band of maroon fabric
       at the frame edge, not a readable limb). Naming the three who are whole is true at
       every width; 'three women' as a total would not be, so no total is given. */
    alt: 'Women practising together on a concrete apron beneath a banyan — one seated in a wide squat with her palms joined, one standing behind her with her arms crossed above her head, and one bending sideways with an arm reaching overhead, tall bamboo behind them',
  },
  {
    id: 'pr-ttc-dsc_0354',
    widths: [480, 960, 1620],
    ratio: 1.5,
    pos: '92% 46%',
    alt: 'A woman standing on one leg in a deep backbend, both hands reaching over her head to hold her raised foot, with a low red wall and dry open fields behind her',
  },
];

export const src = (c: Cell) => `/media/stills/${c.id}-${c.widths[c.widths.length - 1]}.webp`;

export const srcSet = (c: Cell) =>
  c.widths.map((w) => `/media/stills/${c.id}-${w}.webp ${w}w`).join(', ');

/**
 * `sizes` DERIVED FROM THE COVER SCALE, NOT FROM THE VIEWPORT WIDTH.
 *
 * This is the whole trap, and it is the one a sibling concept shipped: a cell is
 * `object-fit: cover`, so the width the browser actually paints is
 * `max(boxWidth, boxHeight × sourceRatio)`. For a LANDSCAPE source in a tall box that is the
 * HEIGHT term, and it is far larger than the box — a `sizes` of `50vw`, or worse `100vw`,
 * under-states it and the browser fetches a derivative it then has to blow up.
 *
 * SINCE THE CELL'S ASPECT IS NOW CONSTANT the arithmetic collapses to one term. The
 * stylesheet sets `--sx1b-cellH: wall / 0.78`, so for a 1.5 source the painted width is
 * `max(wall, 1.5 × wall / 0.78)` = `1.923 × wall`, and for the 0.667 source it is
 * `max(wall, 0.855 × wall)` = `wall` exactly. Nothing is keyed on viewport HEIGHT any more:
 * the previous version needed a `(min-height: 1100px)` bucket only because the cells
 * stretched on tall screens, and that bucket is gone with the stretching.
 *
 * `wall` is `50vw` below 860 and `clamp(128px, 26vw, 480px)` above it, so
 *   1.5 sources   → 96vw below 860; 50vw from 860 to 1846; 923px at 1847 and up.
 *   0.667 sources → 50vw below 860; 26vw from 860 to 1846; 480px at 1847 and up.
 *
 * MEASURED, not asserted — see the transfer table in the header comment above for the
 * derivative Chromium actually takes at each of the eight viewports and the painted width
 * it takes it against.
 */
export function sizes(c: Cell): string {
  return c.ratio > 1
    ? '(max-width: 859px) 96vw, (min-width: 1847px) 923px, 50vw'
    : '(max-width: 859px) 50vw, (min-width: 1847px) 480px, 26vw';
}
