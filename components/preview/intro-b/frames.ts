/**
 * The nine frames of the passage, and the two clips inside it.
 *
 * ONE VENUE. Every still here is a `pr-pbh-` frame and both clips are
 * `pr-mov-` — the same shala, the same ochre walls, the same teal curtains,
 * the same cream tile and the same black folding chairs. That is the whole
 * point of the section: the reader is walking through ONE place, and a wall
 * assembled out of two venues is a collage, not a corridor. The 46 TTC frames
 * are the better-lit set and none of them is used, because the only moving
 * pictures in the archive are shot at the shala and the light has to match.
 *
 * CHOSEN BY LOOKING, NOT BY READING THE MANIFEST. `pr-pbh-img_5433` is
 * described there as "a group seated in a semicircle facing a woman on a chair
 * holding papers"; rendered, it is a class kneeling with palms joined. It is
 * not used. Every alt below describes what is actually in the encoded file.
 *
 * NOBODY IS NAMED. The archive does not record who is in which frame and the
 * client has supplied no faculty names, so every description says what is
 * happening — which is also what a reader who cannot see it needs.
 *
 * Derivative widths are checked against the files on disk, not assumed: no
 * wall panel exceeds ~42rem of CSS width, so 480/960/1920 is the whole ladder
 * any of them needs and the 2560 derivatives are never requested.
 */

export type Still = {
  id: string;
  widths: number[];
  /** object-position, set for the crop this panel actually renders at */
  pos: string;
  alt: string;
};

export type Clip = {
  id: string;
  pos: string;
  alt: string;
  /** natural pixel size of the encoded clip, for the poster's intrinsic ratio */
  w: number;
  h: number;
};

const still = (id: string, widths: number[], pos: string, alt: string): Still => ({
  id,
  widths,
  pos,
  alt,
});

export const src = (f: Still, w: number) => `/media/stills/${f.id}-${w}.webp`;
export const srcSet = (f: Still) => f.widths.map((w) => `${src(f, w)} ${w}w`).join(', ');

/** The wall's own width, exactly as styles/preview-intro-b.css computes it, so
    no panel ever pulls a derivative wider than it renders at. */
export const PANEL_SIZES =
  '(max-width: 899px) 50vw, (max-width: 1150px) 23vw, calc(50vw - 19rem)';

/* ── the two clips ──────────────────────────────────────────────────────────
   Two, deliberately, and at the two ends of the argument. The first line
   denies that the mat is the whole of it, and the picture beside it is one
   person alone on one mat; the last line says the understanding comes out of a
   relationship between study, practice and experience, and the picture it
   opens onto is a whole class working with a teacher among them. Those are the
   only two moving pictures in the section, which is what makes them mean
   something: everything in between is held still.

   2,063,022 B + 3,170,953 B. Neither is fetched until the reader is within a
   screen of it, both are released a screen past, and neither is ever fetched
   at all below 861px, on save-data, or under prefers-reduced-motion — the
   poster beneath is an AVIF of 43,181 B and 39,375 B respectively, and no
   <video> on this page carries a `poster` attribute. */
export const CLIP_MAT: Clip = {
  id: 'pr-mov-img_5659',
  pos: '52% 50%',
  w: 1080,
  h: 1920,
  alt: 'A woman folds forward over a mat holding a wooden dowel, a strap under her feet, beside an arched window',
};

export const CLIP_HALL: Clip = {
  id: 'pr-mov-img_5704',
  pos: '50% 50%',
  w: 1920,
  h: 1080,
  alt: 'A class of six working through a wide standing pose on mats across a hall, a teacher seated at the side watching',
};

/* ── the four stations of the corridor ─────────────────────────────────────
   Each station's two openings take the two halves of the line that walks
   between them.

   01  the mat            one woman on one mat · one man on one mat
   02  the body of it     a hall's length of practice · the same room, arms wide
   03  reverence          a class kneeling, palms joined · a teacher's hands
   04  the work           a line of students and a teacher · a room of them at it
   05  the belief         the whole class, wide, and moving                     */
export const STATIONS: { left: Still | null; right: Still }[] = [
  {
    /* left is CLIP_MAT */
    left: null,
    right: still(
      'pr-pbh-img_5499',
      [480, 960, 1920],
      '44% 48%',
      'A man on a mat holding a deep side lunge with one hand on his hip, a window behind him',
    ),
  },
  {
    left: still(
      'pr-pbh-img_5412',
      [480, 960, 1920],
      '56% 46%',
      'A long row of people in supported shoulderstand with their feet against a wall, seen low along a hall floor',
    ),
    right: still(
      'pr-pbh-img_5362',
      [480, 960, 1920],
      '50% 42%',
      'Two people standing in warrior two with their arms extended in front of an arched window',
    ),
  },
  {
    left: still(
      'pr-pbh-img_5570_1',
      [480, 960, 1920],
      '54% 56%',
      'Four people kneeling on mats with their palms joined in a room with a yellow wall and a curtained window',
    ),
    right: still(
      'pr-pbh-img_5622',
      [480, 960, 1920],
      '30% 46%',
      'A teacher with one arm extended watching a woman work with a folding chair, practice ropes on the wall behind',
    ),
  },
  {
    left: still(
      'pr-pbh-img_5616',
      [480, 960, 1920],
      '38% 52%',
      'A receding line of people folding forward over folding chairs while a teacher stands at the far end',
    ),
    right: still(
      'pr-pbh-img_5732',
      [480, 960, 1920],
      '58% 52%',
      'Three people working with folding chairs and a wooden pole in a second hall, a teacher standing behind them',
    ),
  },
];
