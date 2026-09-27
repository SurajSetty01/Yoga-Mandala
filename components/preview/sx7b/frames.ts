/**
 * The six photographs, and where the teaching hands are in each one.
 *
 * WHY THESE SIX. The Faculty section has no roster — `about.faculty.members` is null — so it
 * shows the act the two sentences describe rather than the people the client has not named.
 * Every frame below was chosen by LOOKING at it, not by reading the manifest, and none of
 * them is used on any live page (grep'd across components/, app/ and styles/, excluding the
 * /preview/ tournaments). All six come from the Prabhava Photos folder: one building, one
 * week, so the sequence reads as one place rather than a collage of venues.
 *
 * THE MANIFEST IS WRONG ABOUT ONE OF THEM, TWICE. `pr-pbh-img_5433` is described in the
 * vision audit and pranava-stills.json as "a woman seated on a folding chair with papers on
 * her lap", and its quality note says "a child stands with the adults at the left of the
 * group" — which is why About's NOTES.md ruled it out "anywhere". Looked at at 1920 px, the
 * pixels show neither: six adults kneeling on mats with their palms joined, facing a man in a
 * yellow patterned kurta cut by the right edge; nobody is seated on a chair and nobody in the
 * frame is a child. The alt text below describes the pixels.
 *
 * HANDS, NOT PEOPLE. The same man in a striped shirt appears in 5622, 5681 and behind 5582;
 * the man in the patterned shirt in 5739 is also in 5738 (not used). So nothing on this page
 * may imply six different teachers, and nothing does — no count, no name, no "a different
 * teacher". What differs across the six is the WAY of teaching, which is what the client's
 * sentences are about: a room beginning together, attending from the far end of a room,
 * reaching, practitioners working on each other, explaining, taking the weight.
 *
 * `hx`/`hy` are the hands as fractions of the displayed file, measured on a 1% grid over the
 * full-size derivative. Every frame is placed so that point lands on ONE point of the stage
 * (motion) or ONE line of the sheet (no motion); nothing else about the frames is aligned.
 *
 * DERIVATIVE WIDTHS WERE READ OFF DISK. The stills' widths are true pixel widths (5407's
 * "1920" is 1920x2560); the clip posters are 1080x1920 with an AVIF beside each JPG.
 */

export type Plate = {
  id: string;
  kind: 'still' | 'clip';
  /** width / height of the file as displayed */
  ar: number;
  /** widths on disk for a still; clips have one poster */
  widths?: number[];
  /** the teaching hands, as fractions of the frame */
  hx: number;
  hy: number;
  /** play the clip while its room is fully open and held */
  play?: boolean;
  alt: string;
};

export const PLATES: Plate[] = [
  /* A room beginning together. The point closes on the joined palms of the man in the red
     shirt at the centre of a whole row of joined palms. The only landscape frame. */
  {
    id: 'pr-pbh-img_5433',
    kind: 'still',
    ar: 4 / 3,
    widths: [480, 960, 1920, 2560],
    hx: 0.555,
    hy: 0.487,
    alt: 'A group kneels on mats in a yellow-walled room with their palms joined at the chest, facing a man in a yellow patterned kurta at the right edge of the frame.',
  },
  /* Attending from the far end. A row of supported shoulderstands fills the foreground; the
     teaching is small and at the back — a man crouched with his hands on his knees, looking
     closely at one practitioner. The point finds him, so this room sits far to the left. */
  {
    id: 'pr-pbh-img_5407',
    kind: 'still',
    ar: 3 / 4,
    widths: [480, 960, 1920],
    hx: 0.835,
    hy: 0.437,
    alt: 'Practitioners lie in a row of supported shoulderstands over folding chairs with their feet on the wall; at the far end of the room a man in a yellow kurta crouches, hands on his knees, looking closely at one of them.',
  },
  /* Reaching. The hand is out before it arrives. */
  {
    id: 'pr-pbh-img_5622',
    kind: 'still',
    ar: 3 / 4,
    widths: [480, 960, 1920, 2560],
    hx: 0.357,
    hy: 0.35,
    alt: 'A man in a striped shirt reaches a hand towards the back of a woman folding forward with her hands on the seat of a folding chair, while another practitioner works in the same pose behind her.',
  },
  /* Practitioners working on each other while a teacher watches from behind — "teachers
     and practitioners", in one frame. The clip is NOT played: the hand the point holds leaves
     his waist after two seconds, so a moving version would un-register itself. */
  {
    id: 'pr-mov-img_5582',
    kind: 'clip',
    ar: 1080 / 1920,
    hx: 0.49,
    hy: 0.445,
    alt: 'A man holds a wide standing pose with one arm raised while a practitioner in a pink top places a hand at his waist and another holds his outstretched wrist; a man in a striped shirt stands behind them, watching.',
  },
  /* Explaining. Open hands beside a headstand at the wall; the clip plays while the room is
     held, and the hands keep talking in the same place. */
  {
    id: 'pr-mov-img_5681',
    kind: 'clip',
    ar: 1080 / 1920,
    hx: 0.57,
    hy: 0.445,
    play: true,
    alt: 'A man in a striped shirt stands beside a practitioner in a headstand at the wall, explaining with both hands, while others sit on the floor watching.',
  },
  /* Taking the weight. The closest contact in the archive, and the last room: it is the
     picture the section's final clause — "to support" — lands on. Both hands stay on the
     practitioner's legs for the whole clip, so it plays registered. Its foreground (a water
     bottle and a bag) falls below the stage, which is where it should be. */
  {
    id: 'pr-mov-img_5739',
    kind: 'clip',
    ar: 1080 / 1920,
    hx: 0.39,
    hy: 0.225,
    play: true,
    alt: "A man in a patterned shirt takes the weight of a practitioner in an inversion against the wall, both hands holding the practitioner's legs.",
  },
];

/** The highest and lowest hands in the set: the static sheet's boxes are sized from them. */
export const HAND_TOP = Math.max(...PLATES.map((p) => p.hy));
export const HAND_BOTTOM = Math.min(...PLATES.map((p) => p.hy));

export const stillSrc = (p: Plate, w?: number) => {
  const ws = p.widths ?? [];
  const pick = w ? (ws.find((x) => x >= w) ?? ws[ws.length - 1]) : ws[ws.length - 1];
  return `/media/stills/${p.id}-${pick}.webp`;
};
export const stillSet = (p: Plate) =>
  (p.widths ?? []).map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ');
export const posterJpg = (p: Plate) => `/media/posters/${p.id}.jpg`;
export const posterAvif = (p: Plate) => `/media/posters/${p.id}.avif`;
export const clipSrc = (p: Plate) => `/media/clips/${p.id}.mp4`;

/**
 * Where the photographs were taken — a fact from a certificate in the archive, not an
 * inference: Prabhava was a five-day Hatha-Iyengar Immersion held 2–6 October 2023. Every
 * frame here (stills and clips alike) is from the Prabhava Photos folder, and each frame's
 * own content — the yellow-walled room, the rope wall, the framed notices, the same two
 * teachers across the set — is consistent with one workshop.
 */
export const PROVENANCE = 'Photographs from Prabhava, a Hatha-Iyengar Immersion, 2–6 October 2023';
