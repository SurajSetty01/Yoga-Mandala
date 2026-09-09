/**
 * The four plates of section 04, and why each one is here.
 *
 * Carried over from the winning concept (`components/preview/about-c/frames.ts`) and cut down
 * to the four frames the promoted section actually uses — the rest of that file served four
 * other compositions that did not win. Every id was read out of `public/media/stills.json`
 * (quality, focal point, subject) before it was placed; focal points become `object-position`
 * so no crop decapitates anybody.
 *
 * None of the four is one of the frames the CLIENT-APPROVED section 02 already carries
 * (`ss-dsc07137 / 07118 / 07143 / 07120`), none is one of the hero's three clips
 * (`ss-ven0096 / 0139 / 0153`), and none is a dance frame — this page never establishes the
 * Bharatanatyam context, so DESIGN-SYSTEM §6 rules them out.
 */

export type Frame = {
  id: string;
  /** where the file lives: a derivative in /media/stills, or a clip poster in /media/posters */
  kind: 'still' | 'poster';
  /** widths available for a still */
  w?: number[];
  alt: string;
  /** object-position, from the audit's focal point */
  pos: string;
};

const F = <T extends Record<string, Frame>>(f: T) => f;

export const frames = F({
  /** Connect — people standing together before anything has begun. */
  three: {
    id: 'ss-ven0083',
    kind: 'poster',
    alt: 'Three women standing side by side with eyes lowered, plants behind them',
    pos: '50% 42%',
  },
  /** Learn — one teacher's hands on one student's inversion. */
  inversion: {
    id: 'p13-img_0610',
    kind: 'still',
    w: [960, 1920],
    alt: "Teacher guiding a student's legs during a chair-supported inversion in a studio",
    pos: '50% 44%',
  },
  /** Collaborate — three people working on one adjustment while the room watches. */
  shoulder: {
    id: 'p27-img_0889',
    kind: 'poster',
    alt: 'One person adjusts the shoulder of another while a third looks on and students watch from the floor.',
    pos: '50% 38%',
  },
  /** Grow — a whole hall with its arms up. The only plate you see whole. */
  raised: {
    id: 'ss-ven0092',
    kind: 'still',
    w: [960],
    alt: 'Wide view of a group practising with arms raised under a high steel roof',
    pos: '50% 60%',
  },
});

export type FrameKey = keyof typeof frames;

/** the biggest derivative that exists for a still, so a crop has pixels to spend */
export function src(f: Frame, want = 960): string {
  if (f.kind === 'poster') return `/media/posters/${f.id}.jpg`;
  const widths = f.w ?? [960];
  const pick = widths.filter((w) => w >= want)[0] ?? widths[widths.length - 1];
  return `/media/stills/${f.id}-${pick}.webp`;
}

export function srcSet(f: Frame): string | undefined {
  if (f.kind === 'poster') return undefined;
  const widths = f.w ?? [960];
  if (widths.length < 2) return undefined;
  return widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}

/** clip posters ship an AVIF beside the JPEG; stills do not */
export function avif(f: Frame): string | undefined {
  return f.kind === 'poster' ? `/media/posters/${f.id}.avif` : undefined;
}
