/**
 * THE WEEK, AS THE CAMERA RECORDED IT.
 *
 * Every picture in this section comes from one folder: "Prabhava Photos". A certificate in
 * the client's archive identifies Prabhava as a five-day Hatha-Iyengar Immersion held
 * 2-6 October 2023, and the files agree with it to the day - their own capture stamps were
 * read out of the source files (EXIF DateTimeOriginal in each .HEIC, the QuickTime
 * `creationdate` in each .MOV) and every one used here falls between 2 October 12:58 and
 * 6 October 17:49.
 *
 *   2 Oct  12:58 5362   13:37 5372 [01]   14:40 5407 [02]   17:55 5450   18:52 5466
 *   3 Oct  13:10 5499   14:23 5532        14:35 5557 [03]   18:13 5586
 *   4 Oct  13:18 5618   13:22 5634 [04]   13:43 5642 [05]   13:45 5648   17:58 5704 [06]
 *   5 Oct  13:20 5732   13:35 5738 [07]
 *   6 Oct  14:08 5787   17:49 5906
 *   after  no photograph                             [08]
 *
 * THAT is the section's floor plan. Depth is the date: each day is one row, one unit
 * further into the page than the last. Across a row the frames stand left to right in the
 * order they were taken. Nothing is placed by taste on the time axis; the only liberty is
 * the spacing WITHIN a row, which is even rather than proportional to the minute, because
 * 13:18, 13:22, 13:43 and 13:45 on 4 October would otherwise stand inside one another.
 *
 * The eight practices ride on eight of the frames, in the client's order, and the client's
 * order runs forward in time with the photographs - which is why the pairing is what it
 * is. The eighth, "Continue learning beyond a single course", has no photograph: it stands
 * on a post on the bare floor past the last day of the course, where the rows of pictures
 * have run out and the floor has not.
 *
 * It was going to stand on pr-mov-img_5964, the one clip in the folder dated 7 October,
 * the day after the course. Looked at frame by frame it is a man in full prostration on
 * the stone before a walled enclosure on another institution's campus - a private,
 * devotional act, and not something to hang "continue learning" on. It is not used.
 *
 * EVERY FRAME HERE IS UNUSED ELSEWHERE ON THE SITE. Grepped across components/ and app/
 * for each id before it went in; about half of the archive is already spent and none of
 * that half is here. pr-pbh-img_5405 (18 seconds before 5407, a cut-off face at the top
 * right) and pr-pbh-img_5629 (48 seconds after 5618, the same row) were dropped as
 * near-duplicates of their neighbours; pr-pbh-img_5592 was dropped for the mirrored
 * printed text on its T-shirt that the audit flags; pr-pbh-img_5570_1 for being thin and
 * small in its own frame.
 *
 * Widths are the ones on disk: every pr-pbh still here has 480 / 960 / 1920, and the clip
 * stills are the 1080x1920 (or 1920x1080) posters. No <video> carries a `poster`
 * attribute: the <img> beneath each one IS its still.
 */

export type Kind = 'still' | 'clip';

export type Plate = {
  id: string;
  kind: Kind;
  /** which day, 0 = 2 Oct 2023 … 4 = 6 Oct 2023 */
  day: number;
  /** capture time, local (IST), read from the file — kept for the record and the tooltip */
  at: string;
  /** lateral position in the row, world units, -1 … 1 */
  x: number;
  /** extra depth behind the row's front line, world units */
  dz: number;
  /** standing height, world units (the eye is 1 unit above the floor) */
  h: number;
  /** width / height of the picture */
  ar: number;
  /** object-position */
  pos?: string;
  alt: string;
  /** index into about.teach.practices, when this frame carries one */
  practice?: number;
  /** the moving version, attached on approach */
  loops?: boolean;
};

export const DAYS = ['2 Oct', '3 Oct', '4 Oct', '5 Oct', '6 Oct'] as const;
export const DAY_FULL = [
  '2 October 2023',
  '3 October 2023',
  '4 October 2023',
  '5 October 2023',
  '6 October 2023',
] as const;

const P = 0.75; // 3:4 portrait still
const V = 0.5625; // 9:16 portrait clip
const L = 16 / 9; // the one landscape clip

/* Heights: a practice frame stands 0.46 of the eye height, a frame without one 0.3. */
const HP = 0.46;
const HF = 0.3;

export const PLATES: Plate[] = [
  /* ── 2 October ─────────────────────────────────────────────────────── */
  { id: 'pr-pbh-img_5362', kind: 'still', day: 0, at: '12:58', x: -1.02, dz: 0.0, h: HF, ar: P, pos: '60% 50%',
    alt: 'A woman and a man standing in warrior two with arms extended in front of an arched window' },
  { id: 'pr-pbh-img_5372', kind: 'still', day: 0, at: '13:37', x: -0.52, dz: 0.06, h: HP, ar: P, pos: '50% 60%', practice: 0,
    alt: 'A woman folding forward with her foot on a wooden block and a stick laid along the mat' },
  { id: 'pr-pbh-img_5407', kind: 'still', day: 0, at: '14:40', x: 0.12, dz: 0.14, h: HP, ar: P, pos: '42% 60%', practice: 1,
    alt: 'A man in supported shoulderstand in the foreground while a teacher bends over a student behind him' },
  { id: 'pr-mov-img_5450', kind: 'clip', day: 0, at: '17:55', x: 0.62, dz: 0.3, h: HF, ar: V,
    alt: 'A person in a wide-legged forward bend holding a dowel along the mat, another practitioner seated behind' },
  { id: 'pr-mov-img_5466', kind: 'clip', day: 0, at: '18:52', x: 0.9, dz: 0.36, h: HF, ar: V,
    alt: 'A person hanging upside down from wall ropes against a yellow wall' },

  /* ── 3 October ─────────────────────────────────────────────────────── */
  { id: 'pr-pbh-img_5499', kind: 'still', day: 1, at: '13:10', x: -0.98, dz: 0.0, h: HF, ar: P, pos: '40% 55%',
    alt: 'A man holding a deep side lunge with a hand on his hip on a dark mat' },
  { id: 'pr-pbh-img_5532', kind: 'still', day: 1, at: '14:23', x: -0.62, dz: 0.1, h: HF, ar: P, pos: '45% 60%',
    alt: 'Three people in supported shoulderstand against a yellow wall with daylight from an open window' },
  { id: 'pr-mov-img_5557', kind: 'clip', day: 1, at: '14:35', x: -0.22, dz: 0.14, h: HP, ar: V, practice: 2, loops: true,
    alt: 'A person lying on a bolster with legs raised straight up in a supported shoulderstand beside a turquoise curtain' },
  { id: 'pr-pbh-img_5586', kind: 'still', day: 1, at: '18:13', x: 0.72, dz: 0.32, h: HF, ar: P, pos: '45% 40%',
    alt: 'Brass wind chimes and a wooden striker disc hanging above a white parapet with trees behind' },

  /* ── 4 October ─────────────────────────────────────────────────────── */
  { id: 'pr-pbh-img_5618', kind: 'still', day: 2, at: '13:18', x: -1.0, dz: 0.0, h: HF, ar: P, pos: '45% 55%',
    alt: 'Three people folding forward over folding chairs in a receding line' },
  { id: 'pr-pbh-img_5634', kind: 'still', day: 2, at: '13:22', x: -0.72, dz: 0.04, h: HP, ar: P, pos: '52% 55%', practice: 3,
    alt: 'A woman folding forward over a chair with a block under her back foot beside a wall of ropes' },
  { id: 'pr-mov-img_5642', kind: 'clip', day: 2, at: '13:43', x: -0.12, dz: 0.1, h: HP, ar: V, practice: 4, loops: true,
    alt: 'A woman raising her arms overhead on a mat while a man in a pale shirt walks between the practitioners' },
  { id: 'pr-pbh-img_5648', kind: 'still', day: 2, at: '13:45', x: 0.32, dz: 0.16, h: HF, ar: P, pos: '55% 58%',
    alt: 'Two people folding forward with their hands on wooden blocks against a yellow wall' },
  { id: 'pr-mov-img_5704', kind: 'clip', day: 2, at: '17:58', x: 0.78, dz: 0.34, h: 0.34, ar: L, practice: 5, loops: true,
    alt: 'A class moving through a wide standing pose with arms extended on mats across a hall, a teacher among them' },

  /* ── 5 October ─────────────────────────────────────────────────────── */
  { id: 'pr-pbh-img_5732', kind: 'still', day: 3, at: '13:20', x: -0.3, dz: 0.0, h: HF, ar: P, pos: '55% 52%',
    alt: 'A woman with one hand on her hip and one on a chair while three practitioners work behind her' },
  { id: 'pr-pbh-img_5738', kind: 'still', day: 3, at: '13:35', x: 0.6, dz: 0.08, h: HP, ar: P, pos: '55% 55%', practice: 6,
    alt: 'A person holding a handstand against a yellow wall while a man steadies another person’s legs' },

  /* ── 6 October ─────────────────────────────────────────────────────── */
  { id: 'pr-pbh-img_5787', kind: 'still', day: 4, at: '14:08', x: -0.52, dz: 0.04, h: HF, ar: P, pos: '45% 60%',
    alt: 'Two people lying back over folding chairs with knees bent and feet on the frames' },
  { id: 'pr-mov-img_5906', kind: 'clip', day: 4, at: '17:49', x: 0.36, dz: 0.3, h: HF, ar: V,
    alt: 'A man standing at the front of his mat in a long pale hall, others practising behind him' },
];

/**
 * Depth. The eye stands Z0 units in front of the first row; each day is one unit deeper.
 * Z0 = 3 rather than 2 is a legibility decision, measured on the render: at 2 the five
 * rows shrank 3.6x front to back and the far rows' flags stood on top of one another; at
 * 3 the ratio is 2.8x and every flag has its own ground.
 */
export const Z0 = 3;
export const DAY_DEPTH = 1;
export const zOf = (p: { day: number; dz: number }) => Z0 + p.day * DAY_DEPTH + p.dz;

/**
 * The eighth practice: a post on the bare floor, past the last row - a day and a quarter
 * beyond the last photograph, far enough that when the walk stops at it every frame of the
 * course has already gone by, on a portrait screen too (where the eye stands further back
 * and the last frame would otherwise still be fading at the bottom of the stage). `h` is
 * the height of the post, in the same units as a frame's.
 */
export const POST = { practice: 7, x: 0, z: Z0 + 5 * DAY_DEPTH + 0.6, h: 0.5 };

/**
 * Where the walk stops: the post Z0 ahead - exactly where the first row stood when the walk
 * began, so the eighth flag arrives in the place the first one started from.
 */
export const CAM_END = POST.z - Z0;

export function stillSrc(id: string, w: number) {
  return `/media/stills/${id}-${w}.webp`;
}
