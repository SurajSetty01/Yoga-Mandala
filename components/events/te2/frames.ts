/**
 * The six prints in the pile, top first, and the card beneath them.
 *
 * All six are Prabodha TTC (the manifest's `source` is "Prabodha TTC Photos"), all 1620 ×
 * 1080 on disk with 960 and 1620 derivatives, and none of them appears on the About page.
 * `alt` is VERBATIM from public/media/pranava-stills.json. `caption` is the print's own
 * short reading of what the frame SHOWS - never what it was, when, where or who.
 *
 * The order is a hand going through a pile, not a timeline: nothing in the archive says
 * these frames are one day or one gathering, and the section never implies it.
 *
 * `r`, `x`, `y` are the print's lie in the pile (so the edges beneath show); `ar`, `ax`,
 * `ay` its lie once set aside. Offsets in the aside are fractions of the aside's width.
 */
export type Print = {
  id: string;
  alt: string;
  caption: string;
  focal: string;
  r: number;
  x: number;
  y: number;
  ar: number;
  ax: number;
  ay: number;
};

export const PRINTS: Print[] = [
  {
    id: 'pr-ttc-dsc_0208_1',
    alt: 'Four people in supported headstand over folding chairs in a row along a white wall',
    caption: 'Four in supported headstand over chairs',
    focal: '45% 60%',
    r: -1.1, x: 0, y: 0,
    ar: -5, ax: -0.04, ay: 0.03,
  },
  {
    id: 'pr-ttc-dsc_0510',
    alt: 'Three women hanging inverted from wall ropes with legs spread wide, hands on the floor',
    caption: 'Three hanging from the wall ropes',
    focal: '50% 52%',
    r: 1.7, x: 6, y: -4,
    ar: 3.5, ax: 0.05, ay: -0.03,
  },
  {
    id: 'pr-ttc-dsc_0262_1',
    alt: 'Four practitioners lying back over bolsters with their legs resting on chair seats',
    caption: 'Four over bolsters, legs on the chair seats',
    focal: '50% 65%',
    r: -2.4, x: -8, y: 5,
    ar: -2, ax: -0.02, ay: 0.05,
  },
  {
    id: 'pr-ttc-dsc_0302_1',
    alt: 'Five women holding tree pose with palms joined overhead on a concrete apron outside a building',
    caption: 'Five in tree pose, outdoors',
    focal: '50% 55%',
    r: 0.9, x: 10, y: 8,
    ar: 5.5, ax: 0.06, ay: 0.02,
  },
  {
    id: 'pr-ttc-dsc_0404',
    alt: 'Three women sitting cross-legged on grass with one arm raised and bent over the head',
    caption: 'Three on the grass, one arm over the head',
    focal: '50% 62%',
    r: 2.6, x: -4, y: -9,
    ar: -3.5, ax: -0.05, ay: -0.02,
  },
  {
    id: 'pr-ttc-dsc_0566',
    alt: 'Five practitioners standing with arms raised overhead in an open-sided hall, low light across the floor',
    caption: 'Five with arms raised, low light across the floor',
    focal: '45% 60%',
    r: -1.8, x: 7, y: 10,
    ar: 1.5, ax: 0.01, ay: 0.01,
  },
];

/** the card at the bottom of the pile never moves; this is only its lie */
export const BLANK = { r: 0.7, x: -3, y: 4 };

export const srcSet = (p: Print) =>
  `/media/stills/${p.id}-960.webp 960w, /media/stills/${p.id}-1620.webp 1620w`;
export const src = (p: Print) => `/media/stills/${p.id}-1620.webp`;
