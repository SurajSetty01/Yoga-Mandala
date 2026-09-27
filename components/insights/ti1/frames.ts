/**
 * The two frames of the Insights masthead: one man, one banyan, two distances.
 *
 * Both are Prabodha TTC frames and both stop short of 2560, so neither ever runs edge to
 * edge on a wide screen: the landscape plate is height-bound (the section is capped at
 * 64rem, so it renders at most ~1540 css px wide against a 1620 derivative) and the portrait
 * is width-capped in the stacked layout.
 *
 * The alt is written from the pixels, not the manifest. The manifest's landscape alt says
 * "fields behind"; the landscape frame shows a low red brick wall, and at the wide layout that
 * side is faded into the ground anyway. What both frames share, and what the alt says, is the
 * man, the tree and its hanging roots.
 */
export const TI1_WIDE = {
  id: 'pr-ttc-dsc_0356',
  widths: [480, 960, 1620],
  w: 1620,
  h: 1080,
} as const;

export const TI1_TALL = {
  id: 'pr-ttc-dsc_0328',
  widths: [480, 960],
  w: 1080,
  h: 1620,
} as const;

export const TI1_ALT =
  'A man sitting cross-legged beneath a banyan, its trunk and hanging roots behind him';

const src = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const ti1Src = (f: { id: string }, w: number) => src(f.id, w);
export const ti1SrcSet = (f: { id: string; widths: readonly number[] }) =>
  f.widths.map((w) => `${src(f.id, w)} ${w}w`).join(', ');
