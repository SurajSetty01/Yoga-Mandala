/**
 * The `Frame` shape and derivative-path helpers the /learn/ sections share (`Shot` in
 * parts.tsx, tl6/frames.ts). Each section now keeps its own frames beside it; the notes
 * below still hold for every one of them.
 *
 * PROVENANCE. All of it is Praṇava's own material, from the two sets encoded into
 * `public/media/pranava-stills.json` (83 frames) and `pranava-clips.json` (16 clips):
 *   `pr-ttc-…`  55 frames from the Prabodha teacher-training set — study, correction,
 *               discussion, lecture, outdoor sitting, a rural campus. This page's spine.
 *   `pr-pbh-…`  28 frames from the Prabhava set, the only ones with derivatives above 1620.
 *   `pr-mov-…`  the clips. One is used here.
 *
 * FOUR THINGS THAT WERE MEASURED RATHER THAN ASSUMED, each of which moved a composition:
 *
 *  1. The brief warned that all 83 new stills are portrait. They are not: 47 of the 83 are
 *     3:2 landscape (every `pr-ttc-dsc_…` except the eight 2:3 ones) and 36 are portrait.
 *     Verified against the encoded files with sharp, not against the manifest's `w`/`h`,
 *     which are pre-rotation camera values elsewhere in this archive. Every ratio below is
 *     the one the browser will actually see.
 *
 *  2. DERIVATIVE WIDTHS ARE NOT UNIFORM, and this decided the page's widest measure:
 *        2560  ten `pr-pbh-` frames only, all but one of them portrait
 *        1920  the rest of `pr-pbh-`
 *        1620  every `pr-ttc-dsc_…` landscape frame       ← the ceiling for a wide band
 *         960  every `pr-ttc-dsc_…` portrait frame
 *     So no band on this page is ever wider than 1620 CSS px. `--ln-max: 101.25rem` is
 *     1620px at the root font size, and every capped band carries `margin-inline: auto`
 *     beside it — a cap without that is invisible at 1440 and 455px off-centre at 2531,
 *     which has shipped on this project once already.
 *
 *  3. FRAMES WITH LEGIBLE WRITING ON A WHITEBOARD ARE NOT USED AT ALL. The vision audit
 *     flags `pr-ttc-dsc_0209`, `-0215` and `-0217` as carrying a handwritten heading legible
 *     at full size that "must be read and cleared before publication". None of the three
 *     appears on this page, and neither does `pr-ttc-dsc_0193`, the fourth whiteboard frame:
 *     it was tried in the tall narrow aperture of section 04 and reduced, at 250px wide, to
 *     green netting over an empty red floor.
 *
 *  4. NO BOOKS OR TEXTS EXIST ANYWHERE IN THE ARCHIVE, so nothing on this page is composed
 *     around one. What the archive does have, and what this page is built on, is people
 *     listening: 13 `lecture-discussion` frames and 6 `teaching-adjustment`.
 *
 * NOBODY IS NAMED. The archive does not record who is in which frame and the client has
 * supplied no faculty names, so every description says what is happening. That is also what
 * a reader who cannot see the picture needs.
 */

export type Frame = {
  /** file stem under /media/stills */
  id: string;
  /** widths that exist on disk, largest last */
  widths: number[];
  /** intrinsic size of the LARGEST derivative, for the aspect ratio box */
  w: number;
  h: number;
  /** object-position for a wide viewport */
  pos: string;
  /** object-position for a narrow one, set deliberately — DESIGN-SYSTEM §1 */
  posNarrow?: string;
  alt: string;
};

/** `/media/stills/<id>-<w>.webp`, smallest derivative that is big enough. */
export function src(fr: Frame): string {
  const w = fr.widths[fr.widths.length - 1] ?? 960;
  return `/media/stills/${fr.id}-${w}.webp`;
}

/** A srcset across every width that exists, so a phone never pulls a 1620 for a 90px chip. */
export function srcSet(fr: Frame): string {
  return fr.widths.map((w) => `/media/stills/${fr.id}-${w}.webp ${w}w`).join(', ');
}
