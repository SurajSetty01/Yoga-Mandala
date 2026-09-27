/**
 * /practice/ §06: the two pictures of the close. Both come from the Prabhava folder
 * (pr-pbh-* and a .MOV from the same set), which is why one caption can name the event.
 *
 * LOOKED AT, NOT READ: the top ~40% of img_5808 is a door, a "YOGA HALL 2" sign and a wall;
 * the three women occupy the lower half. The 5:4 box at 50% 92% shows 37-97% of the frame
 * height: the chairs' feet, the three bodies and the belts, no sign. The clip's top quarter is
 * ceiling and a fan; the 3:4 box at 50% 86% shows 22-96% of it. The manifest says "three
 * people" for the clip; the poster plainly holds five (two seated further back), so the alt
 * does not count them.
 */

export type Tp7Still = {
  id: string;
  widths: number[];
  w: number;
  h: number;
  alt: string;
};

export type Tp7Clip = {
  id: string;
  w: number;
  h: number;
  alt: string;
};

export const TP7_REST: Tp7Still = {
  id: 'pr-pbh-img_5808',
  widths: [480, 960, 1920, 2560],
  w: 2560,
  h: 3413,
  alt: 'Three women lying in a row with knees open, belts around their feet and bolsters under their heads',
};

export const TP7_BEND: Tp7Clip = {
  id: 'pr-mov-img_5687',
  w: 1080,
  h: 1920,
  alt: 'A row of people lying back over folding chairs in supported backbends, arms hanging towards the mats',
};

export const tp7Src = (f: Tp7Still, w: number) => `/media/stills/${f.id}-${w}.webp`;
export const tp7SrcSet = (f: Tp7Still) => f.widths.map((w) => `${tp7Src(f, w)} ${w}w`).join(', ');
