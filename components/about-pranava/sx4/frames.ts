/**
 * §04 How We Teach — the eight registered frames.
 *
 * WHY THESE EIGHT. Every frame in the archive was checked for one thing: a body upside down
 * with the legs straight enough to be an axis. Twelve qualified; four were ruled out:
 *   · pr-pbh-img_5405 / _5407 / _5416 / _5532 — the legs run at 20–35° to the wall, so they
 *     cannot share an axis with the others without rotating a photograph, which this does not do.
 *   · pr-mov-img_5739 — the teacher's hands are exactly right, but the practitioner's feet are
 *     out of the top of the frame, so there is no toe line to register on.
 *   · pr-ttc-dsc_0254_1 — the same woman, the same bolster and the same minute as
 *     pr-ttc-dsc_0208_1; registered, the two were indistinguishable. 0208_1 is the one kept
 *     because nothing on the site shows it (0254_1 is on Contact).
 * Also left out on purpose: the four rope frames from Prabodha TTC (0493, 0500, 0510, 0479),
 * whose legs are bent in baddha konasana or spread in a V — a different pose, not the same one.
 *
 * Seven are from the Prabhava folder (a five-day Hatha-Iyengar immersion, 2–6 October 2023, per
 * the certificate in the archive) and one from Prabodha TTC. The one frame from another course
 * is the eighth, which is the practice that reads "Continue learning beyond a single course".
 *
 * USED NOWHERE ELSE ON THE LIVE SITE (checked for the concepts): 5523, 5466 (both clip stills), 5592, 5538, 5746, 5738,
 * 5557. 0208_1 appears only in a dead entry of components/about-pranava/frames.ts that no
 * component references. KNOWN OVERLAP, flagged rather than hidden: 5746 is also in the
 * sx3a and sx3b §03 concepts; if either is promoted, 5746 here should give way.
 *
 * HOW THE REGISTRATION WORKS. For each frame three landmarks were read off a gridded render of
 * the actual derivative (not the manifest, whose dimensions can be pre-rotation):
 *   x  the axis of the legs, as a fraction of the frame's width
 *   t  the top of the toes, as a fraction of its height
 *   w  where the legs meet the torso, as a fraction of its height
 * Every frame is then scaled so that (w − t) is TL of the stage's height, and placed so that
 * its toes land on TT and its axis on AX. The values below were solved, not chosen: a search
 * over stage aspect, AX, TT and TL for the smallest TL at which all eight frames still cover
 * a 0.62 stage with no gap at any edge gave TL 0.59 at AX 0.38–0.40, TT 0.08; TL is rounded
 * up to 0.60 for a sliver of margin (pr-mov-img_5466, whose legs are at 0.30 of its width, is the one
 * that forces the axis left of centre, and pr-pbh-img_5538, whose legs are the longest in
 * frame, is the one that forces TL up). Change the stage aspect and they must be re-solved.
 */
export const REG = { SA: 0.62, AX: 0.39, TT: 0.08, TL: 0.6 } as const;

type Kind = 'still' | 'poster';

export type RegFrame = {
  id: string;
  kind: Kind;
  /** derivative widths on disk, largest last (posters: the one 1080x1920 file) */
  widths: number[];
  /** width / height of the encoded derivative */
  aspect: number;
  x: number;
  t: number;
  w: number;
  course: 'pbh' | 'ttc';
  alt: string;
  /** the camera's own clock (see WHEN, below): the day of the five-day Prabhava immersion,
      the date and the minute; absent where the clock cannot be trusted */
  shot?: { day: number; date: string; time: string };
  /** a clip whose opening seconds are the held pose: its loop plays over its own first
      frame (the poster) while it is the frame on show, and wraps back at `hold` seconds,
      before the practitioner comes down */
  clip?: { src: string; hold: number };
};

/**
 * WHEN. The eight run in the order they were taken, because the section's lead is
 * "Learning happens over time" and the archive can say exactly when. Capture stamps were
 * read from the source files (EXIF DateTimeOriginal in each .HEIC, QuickTime creationdate
 * in each .MOV), all +05:30:
 *   5466 2 Oct 18:52 · 5523 3 Oct 14:05 · 5538 3 Oct 14:27 · 5557 3 Oct 14:35
 *   5592 3 Oct 18:51 · 5738 5 Oct 13:35 · 5746 5 Oct 14:02 · 0208_1 Prabodha TTC (undated:
 *   that Nikon's clock was reset at least once, so no date is printed for it)
 * Chronological order keeps both pairings the design depends on: the teacher's hands
 * (5738) land on the sixth, "Learn from experienced teachers", and the frame from another
 * course is still the eighth, "Continue learning beyond a single course".
 *
 * THE LOOPS. 5523 holds the pose for its first ~11s and 5557 for its first ~10s (checked
 * frame by frame); both posters are their clips' first frame, so a loop wrapped inside the
 * hold registers exactly on the still beneath it. 5466 holds for under 3s before the
 * practitioner comes down, too short to loop, so it stays a still.
 */
export const FRAMES: RegFrame[] = [
  {
    id: 'pr-mov-img_5466',
    kind: 'poster',
    widths: [1080],
    aspect: 1080 / 1920,
    x: 0.3,
    t: 0.073,
    w: 0.45,
    course: 'pbh',
    shot: { day: 1, date: '2 October 2023', time: '18:52' },
    alt: 'A practitioner hanging upside down from the wall ropes, legs straight up against a yellow wall.',
  },
  {
    id: 'pr-mov-img_5523',
    kind: 'poster',
    widths: [1080],
    aspect: 1080 / 1920,
    x: 0.465,
    t: 0.089,
    w: 0.545,
    course: 'pbh',
    shot: { day: 2, date: '3 October 2023', time: '14:05' },
    clip: { src: '/media/clips/pr-mov-img_5523.mp4', hold: 10 },
    alt: 'A practitioner upside down between two folding chairs, shoulders on the seats, legs straight up a bare cream wall.',
  },
  {
    id: 'pr-pbh-img_5538',
    kind: 'still',
    widths: [480, 960, 1920],
    aspect: 3 / 4,
    x: 0.4,
    t: 0.107,
    w: 0.68,
    course: 'pbh',
    shot: { day: 2, date: '3 October 2023', time: '14:27' },
    alt: 'A practitioner lying back over a bolster with both legs raised straight up beside a folding chair, practice ropes hanging on the wall behind.',
  },
  {
    id: 'pr-mov-img_5557',
    kind: 'poster',
    widths: [1080],
    aspect: 1080 / 1920,
    x: 0.5,
    t: 0.165,
    w: 0.55,
    course: 'pbh',
    shot: { day: 2, date: '3 October 2023', time: '14:35' },
    clip: { src: '/media/clips/pr-mov-img_5557.mp4', hold: 9 },
    alt: 'A practitioner in supported shoulderstand on a pink bolster beside a folding chair, legs raised, a turquoise curtain behind.',
  },
  {
    id: 'pr-pbh-img_5592',
    kind: 'still',
    widths: [480, 960, 1920],
    aspect: 3 / 4,
    x: 0.48,
    t: 0.067,
    w: 0.512,
    course: 'pbh',
    shot: { day: 2, date: '3 October 2023', time: '18:51' },
    alt: 'A practitioner in olive trousers upside down between two chairs, head on the floor and arms spread along the seats, feet reaching for the wall.',
  },
  {
    id: 'pr-pbh-img_5738',
    kind: 'still',
    widths: [480, 960, 1920],
    aspect: 3 / 4,
    x: 0.315,
    t: 0.225,
    w: 0.475,
    course: 'pbh',
    shot: { day: 4, date: '5 October 2023', time: '13:35' },
    alt: "A teacher steadies a student upside down against the wall, one hand at the student's legs, while another student holds a handstand beside them.",
  },
  {
    id: 'pr-pbh-img_5746',
    kind: 'still',
    /* a 2560 exists (1.39 MB); at this frame's largest rendered size, a 3x phone, 1920 is
       already more than the 1464 device pixels it occupies */
    widths: [480, 960, 1920],
    aspect: 3 / 4,
    x: 0.48,
    t: 0.213,
    w: 0.555,
    course: 'pbh',
    shot: { day: 4, date: '5 October 2023', time: '14:02' },
    alt: 'A practitioner upside down over a folding chair in front of a curtained window, legs straight up, another chair in the foreground.',
  },
  {
    id: 'pr-ttc-dsc_0208_1',
    kind: 'still',
    widths: [480, 960, 1620],
    aspect: 1620 / 1080,
    x: 0.187,
    t: 0.343,
    w: 0.7,
    course: 'ttc',
    alt: 'A practitioner in supported shoulderstand over a folding chair on a red floor, the nearest of a row doing the same along a white wall.',
  },
];

/** The frame's box inside the stage, in percent of the stage — no measurement needed. */
export function box(f: RegFrame) {
  const H = REG.TL / (f.w - f.t); // in stage heights
  const W = (H * f.aspect) / REG.SA; // in stage widths
  return {
    W,
    style: {
      '--l': `${((REG.AX - f.x * W) * 100).toFixed(3)}%`,
      '--t': `${((REG.TT - f.t * H) * 100).toFixed(3)}%`,
      '--w': `${(W * 100).toFixed(3)}%`,
      '--h': `${(H * 100).toFixed(3)}%`,
    } as Record<string, string>,
  };
}

/** the line under the frame while this photograph is on show */
export function whenOf(f: RegFrame) {
  return f.shot ? `Prabhava, day ${f.shot.day} of 5 · ${f.shot.date}, ${f.shot.time}` : 'Prabodha TTC';
}

/** the two short lines under this photograph in the closing row */
export function dayOf(f: RegFrame) {
  return f.shot ? { day: `Day ${f.shot.day}`, time: f.shot.time } : { day: 'Prabodha TTC', time: '' };
}

export function srcOf(f: RegFrame, width?: number) {
  if (f.kind === 'poster') return `/media/posters/${f.id}.jpg`;
  const w = width ? (f.widths.find((x) => x >= width) ?? f.widths[f.widths.length - 1]) : f.widths[f.widths.length - 1];
  return `/media/stills/${f.id}-${w}.webp`;
}

export function srcSetOf(f: RegFrame) {
  if (f.kind === 'poster') return undefined;
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}
