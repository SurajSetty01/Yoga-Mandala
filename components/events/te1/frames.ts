/**
 * The two photographs of the Events masthead. Both are Prabodha TTC (the manifest's
 * `source` is "Prabodha TTC Photos", and Prabodha is the client's own programme name), both
 * are 1620 × 1080 on disk, and 1620 is the largest derivative either has, so the band that
 * holds them is capped at 1620 CSS px and centred, never bled to 2560.
 *
 * `alt` is VERBATIM from public/media/pranava-stills.json. `caption` says only what the
 * frame shows: not who, not when, not what it was called.
 */
export type Te1Frame = {
  id: string;
  alt: string;
  caption: string;
  /** object-position for the pinned band (wide crop) */
  wide: string;
  /** object-position below 700px, where the band is taller than it is wide */
  narrow: string;
};

export const TE1_GATHERED: Te1Frame = {
  id: 'pr-ttc-dsc_0046_1',
  alt: 'Five practitioners standing in warrior one with arms raised on mats across a red floor',
  caption: 'Five in warrior one, arms raised, across a red floor',
  /* keeps the raised hands and the near mat; the blown wall at right is the first to go */
  wide: '44% 32%',
  /* the two nearest standing figures */
  narrow: '24% 50%',
};

export const TE1_EMPTY: Te1Frame = {
  id: 'pr-ttc-dsc_0192_1',
  alt: 'An empty row of folding chairs, mats, blankets, bolsters and wooden blocks on a red floor',
  caption: 'A row of places set out, and no one in them',
  wide: '50% 34%',
  narrow: '64% 50%',
};

export const te1Src = (f: Te1Frame) => `/media/stills/${f.id}-1620.webp`;
export const te1SrcSet = (f: Te1Frame) =>
  `/media/stills/${f.id}-480.webp 480w, /media/stills/${f.id}-960.webp 960w, /media/stills/${f.id}-1620.webp 1620w`;
