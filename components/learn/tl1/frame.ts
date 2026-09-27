/**
 * The one photograph of the Learn masthead.
 *
 * `pr-pbh-img_5433` is the only LANDSCAPE frame in the Praṇava archive with a 2560
 * derivative (every landscape `pr-ttc-…` stops at 1620), so it is the only one that can run
 * edge to edge on a 2560 screen without an upscale.
 *
 * THE DESCRIPTION IS FROM THE PIXELS, NOT THE MANIFEST. `pranava-stills.json` describes this
 * id as "a group seated on mats in a semicircle facing a woman on a chair holding papers",
 * with a child at the left. The encoded file shows neither: it is a class kneeling on mats,
 * palms joined and eyes closed, with a man seated at the right edge facing them (checked at
 * 1920 and 2560, which are the same picture). The caption says what a reader will see.
 *
 * The left ~12% (a water dispenser, bags and bottles by the door) is cropped off at wide
 * viewports by oversizing the image box, not by a second encode: `public/media` is fixed.
 */
export const TL1_FRAME = {
  id: 'pr-pbh-img_5433',
  widths: [480, 960, 1920, 2560],
  w: 2560,
  h: 1920,
  alt: 'A group kneeling on mats with palms joined and eyes closed, in a room with a yellow wall and blue curtains',
} as const;

export const tl1Src = (w: number) => `/media/stills/${TL1_FRAME.id}-${w}.webp`;
export const tl1SrcSet = TL1_FRAME.widths.map((w) => `${tl1Src(w)} ${w}w`).join(', ');
