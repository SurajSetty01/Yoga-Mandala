/**
 * THE SECTION'S FOUR PICTURES — one that stands still at the centre and plays at the end,
 * and one still for each of the three terms the lead names.
 *
 * Chosen by LOOKING at the files (contact sheets and 4:3 crops rendered from the encoded
 * derivatives), not by reading the manifest. Widths are the derivatives that exist on disk.
 *
 * ── THE CENTRE: pr-mov-img_5739 ─────────────────────────────────────────────────────────
 * A teacher, his back to the camera, taking a student's weight in a supported inversion
 * against a wall: his hands are on her legs and the intent is unmistakable. It is the clip
 * the vision audit calls the "unambiguous supported inversion with the teacher's hands
 * visibly taking weight", and nobody's face is readable. 1080x1920, 6.2s, 2.0 MB — the
 * lightest teaching clip in the set.
 *
 * Its flaw is a blue water bottle and a bag in the bottom 13% of the frame (measured on the
 * poster: the bottle cap starts at y = 0.87). The frame is therefore 2:3 anchored to the TOP
 * of the source (object-position 50% 0%), which keeps 84.4% of the height: the student's
 * feet at the very top edge and the teacher's hands at 20-30% are always in, the bottle
 * never is. The <img> beneath the <video> is the clip's own first frame; the <video> carries
 * no `poster` attribute.
 *
 * ── THE THREE TERMS ─────────────────────────────────────────────────────────────────────
 * All three are cropped 4:3, and all three crops were rendered and looked at before any
 * CSS was written.
 */

export type Still = {
  id: string;
  widths: number[];
  /** object-position for the 4:3 card crop */
  pos: string;
  alt: string;
};

/** Rooted in tradition — the banyan: roots coming down to meet the ground a man sits on. */
export const TRADITION: Still = {
  id: 'pr-ttc-dsc_0328',
  widths: [480, 960],
  pos: '50% 62%',
  alt: 'A man sits cross-legged on a stone slab at the foot of a banyan tree, its hanging roots coming down around the trunk behind him.',
};

/** Alive in practice — one shape, held by a whole line, which is what consistency looks like. */
export const PRACTICE: Still = {
  id: 'pr-pbh-img_5412',
  widths: [480, 960, 1920],
  pos: '50% 55%',
  alt: 'A line of practitioners lie over folding chairs with their legs up the wall in supported shoulderstand, receding down a studio hall.',
};

/** Open to inquiry — three people listening, one with a pen at her lips, notebooks open. */
export const INQUIRY: Still = {
  id: 'pr-ttc-dsc_0285_1',
  widths: [480, 960, 1620],
  pos: '40% 50%',
  alt: 'Three women sit on chairs in an open pavilion, listening, one with her hand at her mouth and notebooks open in their laps.',
};

/** The centre. The clip is attached by Motion.tsx; the poster is an ordinary <img>. */
export const CENTRE = {
  id: 'pr-mov-img_5739',
  clip: '/media/clips/pr-mov-img_5739.mp4',
  avif: '/media/posters/pr-mov-img_5739.avif',
  jpg: '/media/posters/pr-mov-img_5739.jpg',
  alt: 'A teacher, his back to the camera, holds a student’s raised legs steady as the student balances upside down against a wall, a folding chair beside them.',
} as const;

export const stillSrc = (s: Still, w = s.widths[Math.min(1, s.widths.length - 1)]) =>
  `/media/stills/${s.id}-${w}.webp`;

export const stillSrcSet = (s: Still) =>
  s.widths.map((w) => `/media/stills/${s.id}-${w}.webp ${w}w`).join(', ');
