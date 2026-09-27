/**
 * THE FOUR ROOMS — and the opening in each one that leads to the next.
 *
 * All four photographs are from the Prabhava folder (Hatha-Iyengar immersion, 2–6 October
 * 2023), all four are PORTRAIT 3:4, and not one of them is used anywhere else on the site
 * or in any other preview concept (grepped across components/ and app/ before choosing).
 *
 * WHY THESE FOUR, out of 84 stills and 16 clips:
 *
 * The section is a walk through four doors, so a room only qualifies if its photograph
 * contains a real OPENING — a corridor, an alcove, a door — that nobody is standing in
 * front of. That test is what cut the archive down, and it was measured, not guessed:
 *
 *   · pr-pbh-img_5732 has the best door in the set (a "YOGA HALL 2" sign on it) and the
 *     front practitioner's ponytail crosses the open doorway beside it.
 *   · pr-pbh-img_5618 and _5622 look into the second hall, and the teacher and a student
 *     are standing in the opening.
 *   · pr-pbh-img_5532 has an open glass door to the garden — 6% of the frame wide, at the
 *     extreme right edge, where a phone crop would cut it off.
 *   · the arched windows in _5629/_5648 sit behind a steel grille; you cannot walk through
 *     a grille.
 *   · clip pr-mov-img_5906 (the steadiest clip: camera drift measured at 0px) ends in a
 *     long room with two wooden doors — and a per-pixel motion map over all 72 sampled
 *     frames shows arms and bodies crossing those doors for most of the clip. Only blank
 *     ceiling stays still. A clip cannot carry an opening, so every room here is a still.
 *   · clip pr-mov-img_5964 (the only free exterior clip) is catalogued as "a man crouching";
 *     at 3s he is prostrating at what looks like a memorial enclosure with a plaque, on
 *     another institution's campus. Not usable as a picture of anything of Praṇava's.
 *
 * WHAT SURVIVED — each chosen for what it shows AND for where its opening is:
 *   Learn    the only free still in which a teacher is visibly at work (the yellow kurta,
 *            bending to a student), and beyond him the corridor runs on into the next hall.
 *   Practice two practitioners working with chairs and blocks in hall one's daylight; the
 *            opening at top left is the alcove the props live in.
 *   Heal     a supported, restorative backbend — the chair holds the body, faces hidden
 *            behind the chair frames — and a wooden door the size of a quarter of the frame.
 *   Insights no people at all: the balcony, the chimes, two small plants and the trees. The
 *            last room is the only one with no door in it, because this is where the walk
 *            stops and the growing starts.
 *
 * GEOMETRY. Every value is a fraction of the frame, measured on the 960×1280 derivative.
 * An opening is a SQUARE in these units — which is a 3:4 rectangle in pixels, exactly the
 * frame's own proportion — so when the walk finishes, the opening fills the frame
 * perfectly and the next room sits in it at scale 1, with nothing to crop or re-fit.
 *
 *   hole.x, hole.y  top-left of the opening          hole.s  its width (= its height)
 *   focus           the point of THIS room that is centred in the previous room's opening
 *                   while the reader is still standing back from it. With a look-through
 *                   magnification of 1.5 it must lie in [0.334, 0.666] on both axes or the
 *                   opening would show past the picture's edge.
 */

export type Room = {
  id: string;
  /** widths that exist on disk under /media/stills, largest last */
  widths: number[];
  alt: string;
  /** the opening that leads to the NEXT room; the last room has none */
  hole: { x: number; y: number; s: number } | null;
  /** what the opening is, as the static page names it under the photograph */
  through: string | null;
  /** what of this room shows through the previous room's opening */
  focus: { x: number; y: number };
};

/** how much of a room shows through the opening before the walk starts: 1 / MAG of it */
export const MAG = 1.5;

export const ROOMS: readonly [Room, Room, Room, Room] = [
  {
    /* The corridor, measured clear: x 555–690, y 250–430. Its left edge stops before the
       fourth practitioner's feet (x ≤ 552 at y 400–445), its bottom above the far
       practitioner's legs (y ≥ 440), its right edge 55px short of the teacher's head. */
    id: 'pr-pbh-img_5407',
    widths: [480, 960, 1920],
    alt: 'A teacher in a yellow kurta bends to adjust a student at the far end of the room, while a line of practitioners rests in supported shoulderstand over folding chairs with their feet against the wall.',
    hole: { x: 555 / 960, y: 250 / 1280, s: 135 / 960 },
    through: 'Through the corridor',
    focus: { x: 0.5, y: 0.5 },
  },
  {
    /* The alcove behind the ceiling fan: x 12–187, y 110–343. The fan is inside it and is
       replaced; the rolled mats begin at x 190 and stay; the man's head (top y 385) is
       below it. */
    id: 'pr-pbh-img_5629',
    widths: [480, 960, 1920, 2560],
    alt: 'Two practitioners step into a wide standing pose with their hands on the backs of folding chairs and a block under one foot, in front of an arched window with blue curtains.',
    hole: { x: 12 / 960, y: 110 / 1280, s: 175 / 960 },
    through: 'Through the alcove',
    /* the woman in white, not the empty floor in front of her */
    focus: { x: 0.55, y: 0.47 },
  },
  {
    /* The door leaf: x 14–266, y 14–350. The jamb at x 270–300 stays as the door's frame;
       the nearest feet begin at y 365. */
    id: 'pr-pbh-img_5787',
    widths: [480, 960, 1920, 2560],
    alt: 'Practitioners lie back through folding chairs in a supported backbend, feet resting on the chair backs and hands on wooden blocks, beside a wooden door.',
    hole: { x: 14 / 960, y: 14 / 1280, s: 252 / 960 },
    through: 'Through the door',
    /* the arch of the nearest backbend */
    focus: { x: 0.5, y: 0.56 },
  },
  {
    id: 'pr-pbh-img_5586',
    widths: [480, 960, 1920],
    alt: 'Brass wind-chime tubes hang over a white parapet that holds two small potted plants, with dense green trees beyond.',
    hole: null,
    through: null,
    /* the chimes and the two plants, not the pillar */
    focus: { x: 0.47, y: 0.52 },
  },
];

export function srcOf(r: Room, want = 960): string {
  const w = r.widths.find((x) => x >= want) ?? r.widths[r.widths.length - 1];
  return `/media/stills/${r.id}-${w}.webp`;
}

export function srcSetOf(r: Room): string {
  return r.widths.map((w) => `/media/stills/${r.id}-${w}.webp ${w}w`).join(', ');
}

/**
 * Where room i+1 sits inside room i's opening while the reader stands back: its focus
 * point on the opening's centre, at MAG times the opening's size. Expressed relative to
 * the OPENING's own box (a full-size box scaled down to the hole — see the stylesheet), so
 * the server can write it and the page is complete with no script.
 */
export function restPlacement(next: Room) {
  return { ox: 0.5 - MAG * next.focus.x, oy: 0.5 - MAG * next.focus.y, k: MAG };
}
