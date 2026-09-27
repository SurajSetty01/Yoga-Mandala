import type { Frame } from '../frames';

/**
 * 05 · How to choose — four paths and the place they arrive at.
 *
 * Every frame here is a path with nobody on it (0364 has one figure too small to be anyone),
 * and every alt is the manifest's own description of the path. None of them says who walks
 * it: the clause above each panel is the reader's, the picture is only the ground.
 *
 * Widths are what exists on disk. The three landscape frames stop at 1620; `0364` stops at
 * 960 and is 2:3, so it is given the one inner panel whose box stays narrow at every width.
 *
 * `pos` puts each path's vanishing point near the middle of its STARTING column (the image
 * box is wider than the column because it also has to cover where the panel's foot swings
 * to). `posNarrow` is for the phone's short wide bands, aimed low at the path itself.
 */
export const PATHS: Frame[] = [
  {
    id: 'pr-ttc-dsc_0015_1',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    pos: '78% 50%',
    posNarrow: '50% 64%',
    alt: 'An earth path running away between dense green trees and clipped lawn into shade',
  },
  {
    id: 'pr-ttc-dsc_0294_1',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    pos: '50% 50%',
    posNarrow: '50% 62%',
    alt: 'A broad earth path running between kerbed lawns and tall slender trees',
  },
  {
    id: 'pr-ttc-dsc_0364',
    widths: [480, 960],
    w: 960,
    h: 1440,
    pos: '50% 50%',
    posNarrow: '50% 74%',
    alt: 'A paved path running away between tall slender tree trunks under a green canopy',
  },
  {
    id: 'pr-ttc-dsc_0020_1',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    pos: '36% 50%',
    posNarrow: '52% 66%',
    alt: 'A narrow earth lane between a white building and a wall of hanging vines, opening into light',
  },
];

/**
 * The arrival. `pr-mov-img_5964` is a 9:16 courtyard clip, and only its lower 31% is used:
 * above that line a man kneels and bows to the floor beside a walled enclosure carrying a
 * painted sign on another institution's ground, which is not what an arrival at Pranava
 * should show. Below it, the whole clip is pale stone paving with leaf-shadow moving across
 * it. The last ~2s pan away, so playback loops before LOOP_END.
 */
export const ARRIVAL = {
  id: 'pr-mov-img_5964',
  src: '/media/clips/pr-mov-img_5964.mp4',
  posterAvif: '/media/posters/pr-mov-img_5964.avif',
  poster: '/media/posters/pr-mov-img_5964.jpg',
  w: 1080,
  h: 1920,
  loopEnd: 5.4,
  alt: 'Dappled light moving across the pale stone paving of a shaded courtyard',
} as const;
