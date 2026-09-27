/**
 * The three photographs of the SX1A hero — one for each noun in the client's sentence.
 *
 *   "A space for the STUDY, PRACTICE and TRANSMISSION of Yoga and India's living
 *    knowledge traditions."
 *
 * Each frame is shown at two scales and the two are different CROPS, chosen to mean
 * different things (the Dunham point: one negative, cropped twice, tells two stories):
 *
 *   PAGE   the whole band of the room, full-bleed — where the thing happens.
 *   STAMP  a word-sized inline crop set into the sentence — what the noun IS. The
 *          teacher's paper, the held line of legs, the hand arriving at a back.
 *
 * WHY THESE THREE, AND WHY ALL PORTRAIT.
 * The page band is WIDE — 2.0 at 1024x768, 2.4 at 1440x900, 3.1 at 2531x1140 — and a
 * landscape archive frame in it runs out of pixels: the TTC hall frames stop at 1620, a
 * 1.56x upscale at 2531. These three are 3:4 portraits at 1920/2560 on the LONG edge, so
 * `cover` scales them by WIDTH and every desktop band is native or downscaled for the
 * 2560 pair (5416 is 1920 and runs 1.32x at 2531 — measured, stated, accepted). A wide
 * band of a portrait frame keeps only a horizontal slice of it, so each was chosen because
 * its subject IS a horizontal slice: a seated room at eye level; a row of bodies laid
 * over chairs; an arm reaching across to a back. Rendered at 2.4 and looked at before
 * any code was written.
 *
 * All three are unused anywhere else on the site (grep of components/ and app/, previews
 * excluded). None is the rejected hero's frames (0046_1, 0479/0479x) and none is one of
 * the four forbidden whiteboard / send-off frames.
 *
 * NOBODY IS NAMED. The archive does not record who is in a frame and the client has
 * supplied no faculty names, so every alt says what is happening, not who.
 */

export type Sx1aFrame = {
  /** the word in the client's sentence this photograph belongs to */
  noun: 'study' | 'practice' | 'transmission';
  id: string;
  /** derivative widths that exist on disk, checked with sharp — largest last */
  widths: number[];
  /** natural aspect (w / h) of the encoded derivatives — 3:4 for all three */
  ratio: number;
  /** vertical object-position of the PAGE crop, in % — the only lever a portrait
      source has in a band wider than 0.75, which is every band this hero draws */
  y: number;
  /** vertical object-position for a portrait viewport (≤ 719px), where the band is
      near-square and keeps 80% of the frame instead of 30% */
  yNarrow: number;
  /** vertical object-position for a band wider than 2:1 (2531x1140 and the like), where
      only a quarter of the frame's height survives and the slice has to be chosen again */
  yWide: number;
  /** the STAMP crop: centre (fractions of the source) and width (fraction of source
      width) of the region that is set into the sentence */
  stamp: { cx: number; cy: number; w: number };
  alt: string;
};

const w2560 = [480, 960, 1920, 2560];
const w1920 = [480, 960, 1920];

export const SX1A_FRAMES: [Sx1aFrame, Sx1aFrame, Sx1aFrame] = [
  /* STUDY — Praṇava's own studio: the rope wall, the red slings, the wood floor. A class
     sits on its mats facing the front, where a teacher holds a sheet of paper. It is the
     room the rest of the site keeps returning to, and here it is the room LISTENING. */
  {
    noun: 'study',
    id: 'p13-img_0614',
    widths: w2560,
    ratio: 0.75,
    y: 60,
    yNarrow: 72,
    yWide: 47,
    stamp: { cx: 0.63, cy: 0.48, w: 0.36 },
    alt: 'A class sits on mats across a wooden studio floor, facing a teacher at the front of the room who holds a sheet of paper; a rope wall and red slings hang behind them.',
  },
  /* PRACTICE — a row of supported shoulderstands over folding chairs, receding down the
     hall. Five bodies holding one shape: the repetition is the point of the frame. */
  {
    noun: 'practice',
    id: 'pr-pbh-img_5416',
    widths: w1920,
    ratio: 0.75,
    y: 62,
    yNarrow: 66,
    yWide: 58,
    stamp: { cx: 0.66, cy: 0.5, w: 0.52 },
    alt: 'A row of practitioners lie back over folding chairs in supported shoulderstand, legs raised, receding down a pale hall on blankets and mats.',
  },
  /* TRANSMISSION — a teacher reaches across to the back of a student folding forward over
     a chair. The only frame in either archive where the hand is still on its way. */
  {
    noun: 'transmission',
    id: 'pr-pbh-img_5622',
    widths: w2560,
    ratio: 0.75,
    y: 32,
    yNarrow: 30,
    yWide: 31,
    stamp: { cx: 0.33, cy: 0.335, w: 0.33 },
    alt: 'A teacher reaches out to adjust the back of a student who is folding forward with her hands on the seat of a folding chair; a rope wall stands behind them.',
  },
];

export function sx1aSrc(f: Sx1aFrame, want: number): string {
  const w = f.widths.find((x) => x >= want) ?? f.widths[f.widths.length - 1];
  return `/media/stills/${f.id}-${w}.webp`;
}

export function sx1aSrcSet(f: Sx1aFrame, max = Infinity): string {
  return f.widths
    .filter((w) => w <= max)
    .map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`)
    .join(', ');
}
