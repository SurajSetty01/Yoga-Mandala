/**
 * THE ROOM, SLICE BY SLICE — the data behind 01 · Introduction, concept B.
 *
 * Nine upright slices cut from nine photographs taken at one venue: the practice hall with
 * the red oxide floor, its open pavilion, and the grounds around it. Laid side by side,
 * left to right, they walk from a single prepared mat out through the hall, across the
 * pavilion where people sit and talk, under the banyan, and down the lane at the far end.
 *
 * WHAT MAKES THEM ONE ROOM is a single line. Every slice is scaled and placed so that the
 * edge of its own ground — the foot of the white wall in the hall, the lip of the pavilion
 * floor, the back of the concrete apron, the far end of the lane — lands at the same height
 * in the band (`GROUND`, a fraction of the band's height). That line was MEASURED on each
 * frame at the column the slice is cut from, on a 1% grid at 1620px, not guessed; the
 * numbers are `ground` below.
 *
 * For a slice to reach the line and still fill its window top and bottom, the picture has
 * to be at least `max(GROUND / ground, (1 - GROUND) / (1 - ground))` times the band's
 * height. `scale()` computes that floor at module load and multiplies any extra `zoom` on
 * top; `top()` is where the picture's top edge must sit for its ground to land on the
 * line. Both are checked below, so a frame whose numbers cannot work fails the build
 * instead of shipping a gap.
 *
 * The four groups are the four sentences that follow the claim. Group 0 is the mat and is
 * in place from the first paint; groups 1-4 rise into place as sentences 2-5 are read.
 */

/** Where the ground line sits in the band, as a fraction of the band's height from the top. */
export const GROUND = 0.58;

export type Tier = 'all' | 'md' | 'lg';

export type Slice = {
  /** file stem under /media/stills */
  id: string;
  /** widths that exist on disk, largest last (pranava-stills.json `widths`) */
  widths: readonly number[];
  /** the frame's width / height */
  ratio: number;
  /** horizontal centre of the slice, as a fraction of the picture's width */
  x: number;
  /** measured height of this frame's ground edge at `x`, as a fraction of its height */
  ground: number;
  /** extra magnification over the minimum that still covers the window */
  zoom: number;
  /** relative width in the band */
  weight: number;
  /** which sentence raises it: 0 = in place from the start (the mat) */
  group: 0 | 1 | 2 | 3 | 4;
  /** below which width this slice is dropped: md = under 700px, lg = under 1100px */
  tier: Tier;
  /** how far below its place it waits, as a fraction of the band's height. They deepen
   *  steadily away from the mat, so the waiting room is a slope falling off to the right
   *  rather than a row of random bars — and it lifts from the mat outward. */
  sink: number;
  /** a short stagger inside its group, in svh of scroll */
  lag: number;
  /** describes what the SLICE shows, not the whole frame it was cut from */
  alt: string;
};

const TTC = [480, 960, 1620] as const;

export const SLICES: readonly Slice[] = [
  {
    id: 'pr-ttc-dsc_0190_1',
    widths: TTC,
    ratio: 1.5,
    // the station at 0.655, not the one at 0.35: that one has a switchboard in its sky
    x: 0.655,
    ground: 0.52,
    zoom: 1.0,
    weight: 0.86,
    group: 0,
    tier: 'all',
    sink: 0,
    lag: 0,
    alt: 'A prepared mat on a red floor: a folded black blanket, a patterned bolster and a folding chair against a white wall.',
  },
  {
    id: 'pr-ttc-dsc_0510',
    widths: TTC,
    ratio: 1.5,
    x: 0.3,
    ground: 0.575,
    zoom: 1.05,
    weight: 1.0,
    group: 1,
    tier: 'all',
    sink: 0.3,
    lag: 0,
    alt: 'A woman hanging upside down from a wall rope, legs spread wide, hands reaching for the floor.',
  },
  {
    id: 'pr-ttc-dsc_0120_1',
    widths: TTC,
    ratio: 1.5,
    x: 0.55,
    ground: 0.4,
    zoom: 1.0,
    weight: 1.08,
    group: 1,
    tier: 'md',
    sink: 0.36,
    lag: 4,
    alt: 'A woman in an orange t-shirt holding a low lunge with her hands on the seat of a folding chair.',
  },
  {
    id: 'pr-ttc-dsc_0280_1',
    widths: TTC,
    ratio: 1.5,
    x: 0.47,
    ground: 0.555,
    zoom: 1.08,
    weight: 1.22,
    group: 2,
    tier: 'md',
    sink: 0.44,
    lag: 0,
    alt: 'A man seated on a chair in an open pavilion, part of a discussion circle, with a lawn and trees behind him.',
  },
  {
    id: 'pr-ttc-dsc_0347',
    widths: TTC,
    ratio: 1.5,
    x: 0.5,
    ground: 0.54,
    zoom: 1.08,
    weight: 1.12,
    group: 2,
    tier: 'all',
    sink: 0.5,
    lag: 4,
    alt: 'Two women beneath a banyan tree, one with arms raised overhead, the other seated low in front with palms joined.',
  },
  {
    id: 'pr-ttc-dsc_0302_1',
    widths: TTC,
    ratio: 1.5,
    x: 0.62,
    ground: 0.55,
    zoom: 1.1,
    weight: 1.0,
    group: 3,
    tier: 'all',
    sink: 0.58,
    lag: 0,
    alt: 'A woman holding tree pose on a concrete apron outdoors, palms joined overhead, trees behind her.',
  },
  {
    id: 'pr-ttc-dsc_0459',
    widths: TTC,
    ratio: 1.5,
    x: 0.27,
    ground: 0.6,
    zoom: 1.04,
    weight: 0.84,
    group: 3,
    tier: 'lg',
    sink: 0.64,
    lag: 4,
    alt: 'A woman balancing in tree pose against an exposed brick wall, palms joined above her head.',
  },
  {
    id: 'pr-ttc-dsc_0366',
    widths: TTC,
    ratio: 1.5,
    x: 0.45,
    ground: 0.66,
    zoom: 1.0,
    weight: 1.02,
    group: 4,
    tier: 'md',
    sink: 0.72,
    lag: 0,
    alt: 'A woman balancing on her hands in crow pose on top of a large boulder among trees.',
  },
  {
    id: 'pr-ttc-dsc_0020_1',
    widths: TTC,
    ratio: 1.5,
    x: 0.42,
    ground: 0.64,
    zoom: 1.0,
    weight: 1.16,
    group: 4,
    tier: 'all',
    sink: 0.78,
    lag: 4,
    alt: 'An earth lane running away between hanging vines and a white wall, opening into light at the far end.',
  },
];

/** The smallest magnification that lets this slice's ground reach the line AND cover its window. */
export function scale(s: Slice): number {
  const floor = Math.max(GROUND / s.ground, (1 - GROUND) / (1 - s.ground));
  return +(floor * s.zoom).toFixed(4);
}

/** Where the picture's top edge sits, as a fraction of the band's height (negative = above it). */
export function top(s: Slice): number {
  return +(GROUND - s.ground * scale(s)).toFixed(4);
}

/* ── the two laws, checked at module load ──────────────────────────────────── */
for (const s of SLICES) {
  const k = scale(s);
  const t = top(s);
  // The window must be covered top and bottom: nothing above the picture, nothing below it.
  if (t > 0.0001 || t + k < 0.9999) {
    throw new Error(`sx2b: ${s.id} leaves a gap in its window (top ${t}, bottom ${t + k})`);
  }
  // Its ground lands on the line.
  if (Math.abs(t + s.ground * k - GROUND) > 0.001) {
    throw new Error(`sx2b: ${s.id} does not reach the ground line`);
  }
  if (s.x < 0.15 || s.x > 0.85) {
    throw new Error(`sx2b: ${s.id} is cut too near its edge to fill a wide slice`);
  }
}

/** `/media/stills/<id>-<w>.webp` */
export const src = (s: Slice, w = s.widths[1] ?? s.widths[0]) => `/media/stills/${s.id}-${w}.webp`;

export const srcSet = (s: Slice) => s.widths.map((w) => `${src(s, w)} ${w}w`).join(', ');

/**
 * The picture's rendered width is its scale × the band's height × its ratio, and the band's
 * height is set in svh (see the stylesheet: 40 under 700px, 44 under 1100px, 46 above).
 * So `sizes` is exact in vh rather than a guess in vw — a 92px slice of a picture rendered
 * 700px wide needs the 960, not the 480 a vw-based guess would pick.
 */
export function sizes(s: Slice): string {
  const k = scale(s);
  const vh = (band: number) => Math.round(k * band * s.ratio);
  return `(max-width: 699px) ${vh(40)}vh, (max-width: 1099px) ${vh(44)}vh, ${vh(46)}vh`;
}
