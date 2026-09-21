/**
 * Every photograph and the one silent loop on /learn/.
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

const f = (
  id: string,
  widths: number[],
  w: number,
  h: number,
  pos: string,
  alt: string,
  posNarrow?: string,
): Frame => ({ id, widths, w, h, pos, alt, ...(posNarrow ? { posNarrow } : {}) });

/** `/media/stills/<id>-<w>.webp`, smallest derivative that is big enough. */
export function src(fr: Frame): string {
  const w = fr.widths[fr.widths.length - 1] ?? 960;
  return `/media/stills/${fr.id}-${w}.webp`;
}

/** A srcset across every width that exists, so a phone never pulls a 1620 for a 90px chip. */
export function srcSet(fr: Frame): string {
  return fr.widths.map((w) => `/media/stills/${fr.id}-${w}.webp ${w}w`).join(', ');
}

/* ── 01 · the masthead window ─────────────────────────────────────────────────────────
   The best "people studying" frame in the whole archive per the vision audit: notebooks
   open, one person mid-sentence, the rest listening, in the open pavilion. It is what
   structured education actually looks like, which is why it is the frame the page opens
   on and why nothing else competes with it above the fold. 1620 is its ceiling, so the
   window is capped there and centred. */
export const HERO = f(
  'pr-ttc-dsc_0284_1',
  [960, 1620],
  1620,
  1080,
  '50% 52%',
  'A discussion circle in an open pavilion with several people writing in notebooks as one speaks',
  /* narrow: the slot is a tall strip of a 3:2 frame, so it is aimed at the seated
     figure on the left rather than at the table in the middle of the circle */
  '30% 54%',
);

/* ── 03 · the argument, at two distances ──────────────────────────────────────────── */

/** The wide one: a cohort being addressed. "Learning how to conduct a class." */
export const CLASS_WIDE = f(
  'pr-ttc-dsc_0077',
  [960, 1620],
  1620,
  1080,
  '50% 58%',
  'A large seated group of women in saris listening to two men seated on chairs',
  '42% 58%',
);

/**
 * The close one, and it MOVES. `pr-mov-img_5455` is the clearest hands-on teaching in the
 * clip set — the teacher's hands are visibly working — and at 1,836,058 B it is also the
 * lightest of the six teaching clips. Its poster is the visible <img> beneath the video;
 * there is NO `poster` attribute anywhere on this page, because a poster is fetched even
 * when `src` is never set, which cost this site 948 KB on every device once already.
 */
export const GUIDE_CLIP = {
  id: 'pr-mov-img_5455',
  w: 1080,
  h: 1920,
  pos: '50% 46%',
  alt: 'A man guiding a woman through a chair-supported pose, steadying her leg',
} as const;

/* ── 04 · five formats standing on one line ───────────────────────────────────────────
   Five apertures of five different shapes. The shape is the argument — "our programmes may
   take different forms" — so each frame was chosen for a crop that survives its own box:
   the tall narrow one wants a standing figure, the letterbox wants a receding line. */
export const FORMS: Array<{ label: string; frame: Frame; w: number; h: number }> = [
  {
    label: 'Teacher education',
    /* the tallest, narrowest box, so it needs a frame with a vertical subject: a receding
       line of chair-supported forward bends with a teacher working at the far end. A wide
       hall frame was tried here first and in a 250px-wide slot it reduced to green netting
       and an empty red floor. */
    frame: f(
      'pr-pbh-img_5616',
      [960, 1920],
      1920,
      2560,
      '46% 52%',
      'A line of people folding forward over chairs while a teacher adjusts the hands of one at the far end',
      '46% 52%',
    ),
    w: 0.155,
    h: 1,
  },
  {
    label: 'Continuing education',
    frame: f(
      'pr-ttc-dsc_0280_1',
      [960, 1620],
      1620,
      1080,
      '50% 56%',
      'A discussion circle of people on chairs in an open pavilion, one man leaning forward speaking',
      '50% 56%',
    ),
    w: 0.275,
    h: 0.52,
  },
  {
    label: 'Workshops',
    frame: f(
      'pr-ttc-dsc_0569',
      [960, 1620],
      1620,
      1080,
      '46% 58%',
      'Five practitioners in downward-facing dog on mats in a receding line, low sunlight across a red floor',
      '46% 58%',
    ),
    w: 0.2,
    h: 0.74,
  },
  {
    label: 'Intensives',
    frame: f(
      'pr-ttc-dsc_0392',
      [960, 1620],
      1620,
      1080,
      '50% 60%',
      'Five women sitting cross-legged on grass with hands on knees beneath tall trees',
      '50% 62%',
    ),
    w: 0.245,
    h: 0.88,
  },
  {
    label: 'Study programmes',
    /* the smallest box on the line, so it needs the fewest figures: the archive's clearest
       frame of people simply paying attention, one of them holding a notebook. */
    frame: f(
      'pr-ttc-dsc_0285_1',
      [960, 1620],
      1620,
      1080,
      '46% 48%',
      'Three women seated on chairs listening, one resting her chin on her hand, another holding a notebook',
      '46% 48%',
    ),
    w: 0.125,
    h: 0.4,
  },
];

/* ── 06 · the path ────────────────────────────────────────────────────────────────────
   The one frame in the archive with a true vanishing point and a tall format to carry it.
   960 is its only derivative, so the column it fills is capped at 30rem — at 2560 it is a
   tall window in a wide sheet of paper rather than a soft enlargement. */
export const PATH = f(
  'pr-ttc-dsc_0364',
  [960],
  960,
  1440,
  '50% 46%',
  'A paved path running away between tall slender tree trunks under a green canopy',
  '50% 40%',
);

/* ── 07 · the room, set out ───────────────────────────────────────────────────────────
   Four chairs in a row, each beside a mat with a blanket, a bolster and a block, and
   nobody in the room. The archive's only genuinely quiet prepared interior, and the one
   picture on this site that says what an unfilled programme page should say. */
export const ROOM = f(
  'pr-ttc-dsc_0185_1',
  [960, 1620],
  1620,
  1080,
  '44% 60%',
  'An empty hall with four folding chairs in a row, each beside a mat with a blanket, bolster and block',
  '38% 62%',
);
