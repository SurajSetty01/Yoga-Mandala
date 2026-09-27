/**
 * §09 What We Value — one photograph per value, each one an act rather than a symbol.
 *
 * All four are Prabodha TTC frames at 1620 (480 / 960 / 1620 on disk), and none of them
 * appears in §§01–08. Every alt below was written from the rendered frame, not copied
 * from the manifest, because two of the manifest's counts are wrong:
 *   · pr-ttc-dsc_0354 — the manifest says three women. There are TWO, each holding her
 *     raised foot overhead in both hands.
 *   · pr-ttc-dsc_0185_1 — the manifest says four chairs. Five are in view, each with a
 *     bolster, block, blanket and mat laid beside it, and a sixth place is cut by the
 *     bottom-left corner.
 *   · pr-ttc-dsc_0191 — three people sit on chairs beside the standing woman, not two.
 *
 * `band` is the centre of the slit, as a fraction of the frame's height: the glimpse each
 * value shows while it is closed. Read off a gridded render of the 960 derivative.
 *   Sādhana    0.60  hips to hands of all five downward dogs, the whole receding line
 *   Adhyayana  0.60  the seated women's heads, the standing woman, the three on chairs
 *   Viveka     0.34  two faces, two pairs of arms looped back to two held feet
 *   Sevā       0.60  chair seats, bolsters and blocks receding in one rhythm
 */
export type ValueFrame = {
  id: string;
  alt: string;
  band: number;
};

export const WIDTHS = [480, 960, 1620] as const;

export const VALUE_FRAMES: Record<string, ValueFrame> = {
  Sādhana: {
    id: 'pr-ttc-dsc_0569',
    alt: 'Five practitioners in downward-facing dog on mats in a receding line, low sunlight across a red floor',
    band: 0.6,
  },
  Adhyayana: {
    id: 'pr-ttc-dsc_0191',
    alt: 'Women in saris seated on a red floor, turned towards a woman standing in a white sari, with three people seated on chairs beside her',
    band: 0.6,
  },
  Viveka: {
    id: 'pr-ttc-dsc_0354',
    alt: 'Two women balancing on one leg, each holding her raised foot overhead in both hands, a low wall and dry fields behind them',
    band: 0.34,
  },
  Sevā: {
    id: 'pr-ttc-dsc_0185_1',
    alt: 'An empty hall set out for a class: a row of folding chairs, each with a mat, a folded blanket, a bolster and a wooden block laid beside it, on a red floor',
    band: 0.6,
  },
};

export const stillSrc = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const stillSet = (id: string) => WIDTHS.map((w) => `${stillSrc(id, w)} ${w}w`).join(', ');
