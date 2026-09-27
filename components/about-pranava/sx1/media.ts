import hall640 from './media/hall-640.webp';
import hall960 from './media/hall-960.webp';
import hall1620 from './media/hall-1620.webp';

/**
 * THE ROOM — `pr-ttc-dsc_0064_1`, the Prabodha TTC hall, with its walls taken away.
 *
 * The three files beside this module are copies of tournament design sx1d's derivatives
 * (built by components/preview/sx1d/media/build-hall.py from the site's own 1620px encode):
 * a matte of the five women and their props, plus the red floor cut on its measured wall
 * base, edge colour pulled in where a figure meets a wall. Nothing is drawn or recoloured;
 * the walls are simply not there, and the page's ground stands where they were.
 *
 * WIDTHS 640 · 960 · 1620 — the last is the source's own width, and the wide stage caps the
 * room at 1620 CSS px, so no desktop tier is an upscale.
 */
export const SX1_HALL = {
  id: 'pr-ttc-dsc_0064_1',
  w: 1620,
  h: 1080,
  src: hall1620.src,
  srcSet: `${hall640.src} 640w, ${hall960.src} 960w, ${hall1620.src} 1620w`,
  alt: 'Five women in a line that recedes across a red floor, each on a mat with one hand on a folding chair and the other at her waist, all turning to look the same way.',
} as const;

/**
 * THE SENTENCE'S THREE FRAMES (grafted from sx1a). One per noun of the client's sub, in
 * its order. `stamp` is the detail set into the sentence: centre (cx, cy) as fractions of
 * the frame, and its width as a fraction of the frame's width. All three are 3:4 portrait
 * sources with a 480px encode, which is all a word-sized frame ever needs.
 */
export type Sx1Stamp = {
  noun: 'study' | 'practice' | 'transmission';
  id: string;
  cx: number;
  cy: number;
  w: number;
  alt: string;
};

export const SX1_STAMPS: readonly Sx1Stamp[] = [
  {
    noun: 'study',
    id: 'p13-img_0614',
    cx: 0.63,
    cy: 0.48,
    w: 0.36,
    alt: 'A class seated on mats, facing a teacher who holds a sheet of paper.',
  },
  {
    noun: 'practice',
    id: 'pr-pbh-img_5416',
    cx: 0.66,
    cy: 0.5,
    w: 0.52,
    alt: 'A row of practitioners in supported shoulderstand over folding chairs.',
  },
  {
    noun: 'transmission',
    id: 'pr-pbh-img_5622',
    cx: 0.33,
    cy: 0.335,
    w: 0.33,
    alt: 'A teacher reaches to adjust the back of a student folding forward over a chair.',
  },
] as const;

export const sx1StampSrc = (id: string) => `/media/stills/${id}-480.webp`;
