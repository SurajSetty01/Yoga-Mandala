/**
 * §03's two photographs. Both are ropes, and both stay at the START of the thread, as far
 * from the name "Prayatna" as the section allows: no picture sits beside or under a
 * programme that has no description.
 *
 * Measured, not taken from the manifest:
 *  · pr-ttc-dsc_0500 carries 480 / 960 / 1620 derivatives, 3:2. No 2560, so the band is
 *    never wider than the rail's cap.
 *  · pr-ttc-dsc_0493 carries 480 / 960 only (the manifest's 1080x1620 is the pre-derivative
 *    size), 2:3. The rope window shows the TOP-LEFT QUARTER of it — x 0-50%, y 0-46.7% —
 *    which is the roof anchor, the rope, a grey belt knotted across it and a pair of feet
 *    pressed sole to sole. The rope runs clean off the bottom of that crop.
 */
export type Tp4Frame = {
  id: string;
  /** widths on disk, largest last */
  widths: readonly number[];
  w: number;
  h: number;
  alt: string;
};

export const TP4_FRAMES = {
  /** the band: four in a row, each on their own rope */
  row: {
    id: 'pr-ttc-dsc_0500',
    widths: [480, 960, 1620],
    w: 1620,
    h: 1080,
    alt: 'Four women hanging inverted from wall ropes in a row along a white wall',
  },
  /** the rope the thread leaves from — only its top-left quarter is ever shown */
  rope: {
    id: 'pr-ttc-dsc_0493',
    widths: [480, 960],
    w: 960,
    h: 1440,
    alt: 'Close on a wall rope running down from its roof anchor, a grey belt knotted across it and a pair of bare feet pressed sole to sole',
  },
} as const satisfies Record<string, Tp4Frame>;

/**
 * Where the rope crosses the bottom edge of the rope window, as a fraction of the window's
 * width. Measured on the 960 derivative: at y = 671 the rope's dark core runs x 189-210, so
 * its centre is 199.5 of the 480 px the window shows. The thread is drawn from here.
 */
export const ROPE_X = 199.5 / 480;

/** Half the rope's width at that edge, as a fraction of the window's width (21 / 2 / 480). */
export const ROPE_HALF = 10.5 / 480;

export const tp4Src = (f: Tp4Frame, want: number): string =>
  `/media/stills/${f.id}-${f.widths.find((w) => w >= want) ?? f.widths[f.widths.length - 1]}.webp`;

export const tp4SrcSet = (f: Tp4Frame): string =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
