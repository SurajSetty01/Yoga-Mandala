/**
 * The two frames of the Heal hero. Both are Prabodha TTC landscapes capped at 1620, and
 * neither shows practice, therapy or a body being treated: a group seated still on grass,
 * then a palm crown seen from below. Alts are the manifest's, verbatim.
 */
export const TH1_GROVE = {
  id: 'pr-ttc-dsc_0402',
  w: 1620,
  h: 1080,
  alt: 'Four women sitting cross-legged in a staggered line on grass among tall trees',
} as const;

export const TH1_CROWN = {
  id: 'pr-ttc-dsc_0056',
  w: 1620,
  h: 1080,
  alt: 'A coconut palm crown seen from below with clusters of green coconuts among the fronds',
} as const;

const WIDTHS = [480, 960, 1620] as const;

export const th1Src = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const th1SrcSet = (id: string) => WIDTHS.map((w) => `${th1Src(id, w)} ${w}w`).join(', ');
