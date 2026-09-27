/**
 * §05 THE PRAṆAVA JOURNEY, concept A — the four rooms, and the picture hung in each one.
 *
 * EVERY FRAME IS FROM ONE CAMERA ROLL. All four sources are in `Context/new/…/Prabhava
 * Photos/` (IMG_5532 … IMG_5648, stills and one movie interleaved in a single iPhone
 * numbering). A certificate in the archive confirms Prabhava as a five-day Hatha-Iyengar
 * immersion held 2–6 October 2023, and each frame's own content — a class, props at every
 * mat, the same yellow walls and blue curtains in three of them — is consistent with it; the
 * wind chimes (IMG_5586) sit between two class frames in the same roll. That is the whole
 * basis for the one provenance caption the section carries, and it is enough. The Learn hall
 * is white-walled, not yellow: it is a second room of the same workshop, and nothing here
 * says it is the same building.
 *
 * NONE OF THE FOUR IS USED ON ANY LIVE PAGE (grepped for each id across components/, app/
 * and styles/ before choosing).
 *
 * WHY THESE FOUR, AND WHAT EACH ONE REFUSES
 *  · Learn — `pr-mov-img_5642`. The only unused frame in either library in which a TEACHER is
 *    plainly among the students at the moment of teaching, and it is in the poster frame, so
 *    the still that JavaScript-less and reduced-motion readers get carries the point too.
 *    Rejected on the way: `pr-pbh-img_5407` (a teacher at work, but the foreground is the
 *    same chair-shoulderstand as Heal, so two of four rooms would be one pose);
 *    `pr-mov-img_5450` (its door is half hidden behind the student and there is a shrine in
 *    the corner); `pr-pbh-img_5622` (already spent by several other concepts).
 *  · Practice — `pr-pbh-img_5648`. Two bodies folded into one shape, hands on wooden blocks,
 *    faces hidden: effort, repeated. 2560 wide. Rejected: `pr-pbh-img_5732` (a NIKE AIR
 *    shirt stands beside the very door the camera would push into, so the push would enlarge
 *    a brand), `pr-pbh-img_5618` (the one face in it is laughing at the lens).
 *  · Heal — `pr-pbh-img_5532`. Supported shoulderstand on bolsters and chairs in real window
 *    light, beside an open glass door onto a balcony. Nothing in it claims therapy — no white
 *    coat, no clinic — which is the honest register for a door the client calls "an evolving
 *    area". Rejected: `pr-pbh-img_5787` (legible adidas print all over one pair of leggings),
 *    `pr-pbh-img_5405` (a white coat reads as a clinical claim the client has not made).
 *  · Insights — `pr-pbh-img_5586`. The only literal frames for "writing, reflection, study
 *    and exploration" — the TTC circle writing in notebooks (`pr-ttc-dsc_0284_1`, `_0285_1`)
 *    and the Prabhava discussion circle (`pr-pbh-img_5433`) — are already spent on live pages,
 *    and two of them are another venue besides. Brass chimes over a parapet, with trees
 *    behind, is the quiet one: unpeopled, from the same roll, and with its twin `_5585` the
 *    only Prabhava frame taken outside a practice room.
 *
 * EACH ROOM HANGS A PICTURE OF THE NEXT. The first design pushed through each room's own
 * doorway, and the archive defeated it: in every class frame with a real door someone is
 * standing in front of it (the teacher in 5407, the third woman in 5618, the student in
 * 5450). So three of the rooms have a mounted print of the next room hung on a stretch of
 * their bare wall, checked against the frame so it covers no one — Escher's Print Gallery,
 * where the man looks at a print of the town he is standing in. The fourth passage is not a
 * picture: the Heal room's own glass door stands open and empty, so the terrace is laid into
 * the real doorway (`door: 'open'`), with no mount. The walk ends outside.
 *
 * COORDINATES are fractions of the SOURCE frame (u across, v down), so a picture stays on
 * its wall at every crop. `pos` / `posN` are object-position fractions for the wide stage (a
 * column roughly square) and the narrow one (a portrait phone). `anchor` is the point of
 * THIS room that the previous room's picture is centred on when it frames it — the teacher,
 * the hand on the block, the legs on the wall, the chimes: Szarkowski's "detail", the crop
 * that says which room is behind it.
 */

export type Pt = readonly [number, number];
export type Box = readonly [number, number, number, number]; // u0, v0, u1, v1

type Media =
  | { kind: 'still'; id: string; widths: readonly number[] }
  | { kind: 'clip'; id: string; posterAt: number };

export type Room = {
  key: 'learn' | 'practice' | 'heal' | 'insights';
  media: Media;
  /** width / height of the file the browser actually receives */
  ar: number;
  pos: Pt;
  posN: Pt;
  anchor: Pt;
  /** the opening onto the NEXT room — a mounted print, or the room's own open door; the
      last room has none */
  door?: Box;
  doorKind?: 'print' | 'open';
  alt: string;
};

export const ROOMS: readonly Room[] = [
  {
    key: 'learn',
    /* posterAt: the poster file is NOT the clip's first frame. It matches the frame at 1.5s
       (mean abs difference 3.2/255 at 108x192, against 20+ for t = 0), so the clip is
       started there and the moment it takes over from the still is invisible */
    media: { kind: 'clip', id: 'pr-mov-img_5642', posterAt: 1.5 },
    ar: 1080 / 1920,
    /* wide: keep the upper wall (the door) and the teacher to the hips; the phone keeps it all */
    pos: [0.5, 0],
    posN: [0.5, 0.5],
    /* the teacher, between the two raised pairs of arms */
    anchor: [0.46, 0.44],
    /* bare wall right of the second notice, left of the ceiling light's glare, above every
       raised hand for the whole twelve seconds of the loop (checked frame by frame) */
    door: [0.64, 0.095, 0.78, 0.268],
    doorKind: 'print',
    alt: 'A teacher in a pale shirt stands among his students as two women raise their arms overhead on their mats, folding chairs along the wall behind them.',
  },
  {
    key: 'practice',
    media: { kind: 'still', id: 'pr-pbh-img_5648', widths: [480, 960, 1920, 2560] },
    ar: 1920 / 2560,
    pos: [0.5, 0.75],
    posN: [0.8, 0.5],
    /* both pairs of hands pressed into the blocks, at the foot of the frame */
    anchor: [0.8, 0.9],
    /* the plain yellow wall above her head, right of the curtain */
    door: [0.655, 0.25, 0.8, 0.47],
    doorKind: 'print',
    alt: 'Two women fold forward from a wide stance with their hands pressed into wooden blocks on their mats, beneath an arched window with blue curtains in a yellow-walled room.',
  },
  {
    key: 'heal',
    media: { kind: 'still', id: 'pr-pbh-img_5532', widths: [480, 960, 1920] },
    ar: 1920 / 2560,
    pos: [0.5, 0.5],
    posN: [1, 0.5],
    /* the second practitioner's legs on the wall, down to the bolster */
    anchor: [0.42, 0.45],
    /* laid over the room's own open glass door, curtain edge to frame edge */
    door: [0.815, 0.2, 1, 0.7],
    doorKind: 'open',
    alt: 'Three people rest in supported shoulderstand, shoulders on bolsters and chairs, feet against a yellow wall, while daylight comes in through an open glass door at the side.',
  },
  {
    key: 'insights',
    media: { kind: 'still', id: 'pr-pbh-img_5586', widths: [480, 960, 1920] },
    ar: 1920 / 2560,
    pos: [0.5, 0.36],
    posN: [0.34, 0.5],
    /* the hanging tubes */
    anchor: [0.36, 0.34],
    alt: 'Long brass wind chimes and their wooden striker hang beside a terracotta pillar above a white parapet with two potted plants, dense green trees beyond.',
  },
] as const;

/** The entrance: the first print, hung on the page's own ground, as fractions of the stage.
    A phone has two stages — the static one is a band under the directory, the live one the
    whole screen with the directory crossing its lower half — so it has two boxes, each a
    portrait print on its own stage. */
export const ENTRANCE = {
  wide: [0.3, 0.15, 0.7, 0.88] as Box,
  narrow: [0.22, 0.06, 0.78, 0.94] as Box,
  narrowLive: [0.24, 0.1, 0.76, 0.52] as Box,
};

/** The one caption. Everything it says is established above. */
export const PROVENANCE = 'Photographs: Prabhava, a five-day Hatha-Iyengar immersion, 2–6 October 2023';

export const CLIP = (id: string) => ({
  mp4: `/media/clips/${id}.mp4`,
  jpg: `/media/posters/${id}.jpg`,
  avif: `/media/posters/${id}.avif`,
});

export const still = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const stillSet = (id: string, widths: readonly number[]) =>
  widths.map((w) => `${still(id, w)} ${w}w`).join(', ');
