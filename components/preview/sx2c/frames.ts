/**
 * sx2c — the ONE photograph in this section, and why it is this one.
 *
 * The section is a concordance: all five of the client's sentences contain the word
 * "practice", and they are set on one vertical axis through it. The axis is a photograph
 * the proportion of a yoga mat (about 1:3), standing on end down the middle of the page.
 * So the frame has to hold together as a tall, narrow strip — which rules out almost the
 * whole archive, because nearly every practice frame is a horizontal body or a diagonal
 * row, and a 1:3 slice of a diagonal is an arm and some floor.
 *
 * Every candidate was cropped to 1:3 at the position it would actually be shown at and
 * looked at, not read about:
 *   · pr-pbh-img_5746 (headstand over a chair) — q4 and 2560 wide, but at 1:3 the lower
 *     third is an empty black folding chair in the foreground, and a chair as the subject
 *     is one of the four ways this project has already failed a frame.
 *   · pr-mov-img_5681 poster (headstand with a teacher standing by) — the truest story,
 *     but both figures sit in the middle third; the strip's top is a wall notice and its
 *     bottom is floor, so the strip reads as a room with people in it, not as a line.
 *   · pr-pbh-img_5416 / _5618 / pr-ttc-dsc_0274 — receding rows. Beautiful whole, and
 *     every one of them is a diagonal, so a vertical slice cuts the row into fragments.
 *   · pr-pbh-img_5538 — CHOSEN. One woman on her shoulders on a bolster, legs straight
 *     up, feet at the top of the frame and her head on the mat at the bottom: a single
 *     body that IS a vertical line from one end of the strip to the other, beside a wall
 *     of hanging practice ropes that are themselves vertical threads. It is the practice
 *     on the mat, stood on end.
 *
 * Its flaws, stated because they are true: the manifest rates it q3 for a slightly muddy
 * yellow cast; there is a blue block on the floor at the lower left of the strip; and her
 * face is visible, upside down, near the bottom — a documentary frame of practice, on the
 * same basis the approved About sections publish faces. Nobody is named. The plastic stool
 * and its printed label, which another concept flagged in this frame, sit at x < 0.16 and
 * are outside every crop this section makes (the narrowest strip spans 0.22 – 0.66).
 *
 * Derivatives on disk: 480, 960, 1920 (960 × 1280 is 127 KB). The strip is `object-fit:
 * cover` in a box far taller than it is wide, so the picture is scaled by HEIGHT — the
 * decoded width must be ~0.75 × the strip's height, not the strip's width. The `sizes` in
 * Introduction.tsx says so, measured: the mat is 813px tall at 760 (needs ~610px of
 * image, so 640px is declared rather than 58vw, which picked the 480 and upscaled it),
 * and the phone plate is 1 : 1.88 so its image renders at 1.41 × the plate's width.
 *
 * Unused anywhere on the site at the time of writing (grepped components/ and app/).
 */
export type Frame = {
  id: string;
  widths: number[];
  /** object-position, desktop strip */
  pos: string;
  /** object-position for the phone plate */
  posNarrow: string;
  alt: string;
};

export const MAT: Frame = {
  id: 'pr-pbh-img_5538',
  widths: [480, 960, 1920],
  pos: '35% 50%',
  posNarrow: '76% 50%',
  alt: 'A woman lying with her shoulders on a bolster and her legs raised straight up, beside a wall hung with practice ropes',
};

export const src = (f: Frame, w = f.widths[1]) => `/media/stills/${f.id}-${w}.webp`;
export const srcSet = (f: Frame) =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
