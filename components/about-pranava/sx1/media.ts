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
