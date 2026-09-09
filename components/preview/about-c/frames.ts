/**
 * CONCEPT C — the frames, and why each one is here.
 *
 * Every id below was read out of `public/media/stills.json` / `clips.json` (quality,
 * `headroom`, focal point, subject) before it was placed. Focal points become
 * `object-position` so no crop decapitates anybody. Alt text is the audit's own wording
 * except where a crop shows less than the whole frame, in which case it describes the crop.
 *
 * Excluded on purpose:
 *  · the six dance frames (ss-dsc0715x / ss-ven026x / ss-ven0300) — a Bharatanatyam
 *    performance, not Yoga teaching. DESIGN-SYSTEM §6.
 *  · the gallery / cafe / mural frames (ss-ven0003, 0007, 0010, 0024, 0025, 0027, 0028,
 *    0165) — pictures of framed pictures would have been a pun on this concept's premise,
 *    not evidence of what the community does.
 *  · ss-dsc07137 / 07118 / 07143 / 07120 — the four frames the CLIENT-APPROVED section 02
 *    already carries. Reusing them under new headings would read as a mistake.
 *  · ss-ven0096 / 0139 / 0153 — the hero's three clips.
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
  /* ── the frame the page picks up and puts back ─────────────────────────── */
  room: {
    id: 'p13-img_0513',
    kind: 'still',
    w: [960, 1920, 2560],
    alt: 'A line of students holding downward dog on mats across a wide studio floor',
    pos: '50% 60%',
  },

  /* ── 03, the pile ──────────────────────────────────────────────────────── */
  hall: {
    id: 'ss-ven0056',
    kind: 'still',
    w: [960],
    alt: 'Covered hall with red roof trusses and skylights above a line of people practising on mats',
    pos: '50% 50%',
  },
  wall: {
    id: 'ss-dsc07127',
    kind: 'still',
    w: [960, 1920],
    alt: 'A teacher sits on the floor before a painted wall as a small group settles onto mats.',
    /* the audit calls out "a plain wall band across the top"; the crop drops it */
    pos: '48% 76%',
  },
  balance: {
    id: 'ss-dsc07126',
    kind: 'still',
    w: [960, 1920],
    alt: 'A practitioner balances on one leg with both arms lifted overhead in an outdoor class.',
    pos: '50% 38%',
  },
  mural: {
    id: 'ss-ven0070',
    kind: 'poster',
    alt: 'A line of people in downward-facing dog on mats in front of a painted tree mural',
    pos: '50% 50%',
  },
  charts: {
    id: 'ss-ven0208',
    kind: 'still',
    w: [960],
    alt: 'Four speakers seated in wooden chairs along a white wall hung with printed charts.',
    pos: '52% 55%',
  },

  /* ── 04, the four plates ───────────────────────────────────────────────── */
  three: {
    id: 'ss-ven0083',
    kind: 'poster',
    alt: 'Three women standing side by side with eyes lowered, plants behind them',
    pos: '50% 42%',
  },
  inversion: {
    id: 'p13-img_0610',
    kind: 'still',
    w: [960, 1920],
    alt: "Teacher guiding a student's legs during a chair-supported inversion in a studio",
    pos: '50% 44%',
  },
  shoulder: {
    id: 'p27-img_0889',
    kind: 'poster',
    alt: 'One person adjusts the shoulder of another while a third looks on and students watch from the floor.',
    pos: '50% 38%',
  },
  raised: {
    id: 'ss-ven0092',
    kind: 'still',
    w: [960],
    alt: 'Wide view of a group practising with arms raised under a high steel roof',
    pos: '50% 60%',
  },

  /* ── 05, the four strips ───────────────────────────────────────────────── */
  seated: {
    id: 'p13-img_0615',
    kind: 'still',
    w: [960, 1920],
    alt: 'Wide view of a seated group on mats in a studio with rope wall and windows',
    pos: '45% 62%',
  },
  adjust: {
    id: 'ss-ven0052',
    kind: 'poster',
    alt: 'Teacher leaning over a seated participant to adjust his posture while others watch from chairs',
    pos: '50% 45%',
  },
  foot: {
    id: 'ss-ven0077',
    kind: 'poster',
    alt: 'A bare foot at the end of a mat with blurred figures holding a plank behind',
    pos: '50% 55%',
  },
  orange: {
    id: 'p13-img_0620',
    kind: 'still',
    w: [960, 1920],
    alt: 'Participant kneeling on a purple mat in the foreground of a studio class',
    pos: '46% 68%',
  },

  /* the last card off the table in 03, and the one that crosses the seam:
     a whole class standing with their arms up — the third paragraph's picture. */
  wider: {
    id: 'p13-img_0516',
    kind: 'still',
    w: [960, 1920, 2560],
    alt: 'Students standing with arms stretched overhead in a row across a wide studio floor',
    pos: '38% 55%',
  },

  /* ── 06, the table ─────────────────────────────────────────────────────── */
  studio: {
    id: 'p13-img_0617',
    kind: 'still',
    w: [960, 1920],
    alt: 'Wide studio interior with participants seated on mats beneath ceiling slings and fans',
    pos: '50% 60%',
  },
  klass: {
    id: 'p13-img_0544',
    kind: 'still',
    w: [960, 1920],
    alt: 'A full class holding downward-facing dog on mats while a teacher watches from the side of the hall.',
    pos: '50% 55%',
  },
  kneeling: {
    id: 'p13-img_0621',
    kind: 'still',
    w: [960, 1920],
    alt: 'Participant moving on a mat in the foreground while a class sits facing the front',
    pos: '45% 70%',
  },
  mic: {
    id: 'ss-dsc07144',
    kind: 'still',
    w: [960, 1920],
    alt: 'One of four seated panellists speaks into a handheld microphone while the others listen.',
    pos: '55% 55%',
  },
  whiteboard: {
    id: 'ss-ven0131',
    kind: 'poster',
    alt: 'Teacher standing by a whiteboard of yoga charts while students lie on mats',
    pos: '50% 45%',
  },
  oneToOne: {
    id: 'p13-img_0569',
    kind: 'poster',
    alt: 'A teacher works with one participant while the rest of the class stands watching',
    pos: '50% 50%',
  },
  /* ss-ven0088, the barefoot teacher walking, was cut: the photographer's own frame
     ends at his shoulders, and however honest that is in the source, a headless figure
     on this table reads as a bad crop rather than as a photograph. */
  study: {
    id: 'p13-img_0614',
    kind: 'still',
    w: [960, 1920, 2560],
    alt: 'Group seated on mats facing the front of a studio with ropes and ceiling slings',
    pos: '45% 66%',
  },
  blanket: {
    id: 'p13-img_0593',
    kind: 'poster',
    alt: 'Man spreading a yellow blanket over a mat as a woman crouches beside him',
    pos: '50% 50%',
  },
  lunge: {
    id: 'p13-img_0519',
    kind: 'poster',
    alt: 'A full class of practitioners holds a low lunge on mats in front of a studio rope wall.',
    pos: '50% 55%',
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
