/**
 * THE FOUR ROOMS OF THE ENFILADE, and the geometry that nests them.
 *
 * An enfilade is a suite of rooms whose doorways line up, so that from the first threshold
 * you see through every door to the last room. This section builds one out of four
 * photographs: each room carries an OPENING, and the next room is shown through it. The
 * opening is a similarity map (translate + uniform scale) from the next room's box into
 * this one's, so the whole nest, and the walk through it, is pure `transform`.
 *
 * WHY EVERY ROOM IS THE SAME 4:5 BOX. An opening can only carry the next room without a
 * clip-path if the opening has the room's own aspect ratio, and then every map is
 * translate + scale and nothing else. It also means the crop of every photograph is the
 * same at every viewport, 320 to 2560, so an opening placed on a patch of plain wall stays
 * on that patch of plain wall. There is no `posNarrow` here because there is nothing for
 * it to fix.
 *
 * WHY THESE FOUR FRAMES — chosen by drawing the opening on each candidate at the 4:5 crop
 * and looking, because an opening is a rectangle that HIDES a fifth of the photograph:
 *   · most frames in the archive put their subject where the opening has to go. 5407 (a
 *     teacher at the far end), 5629, 5732 and 5618 all lost a person under it and were
 *     dropped. The four below each have a real, empty far wall in their upper right —
 *     yellow wall, far wall of a hall, white wall — and the people low in the frame.
 *   · the clip's opening is placed where it also hides a wall pennant carrying another
 *     organisation's emblem, and the crop is set at 30% rather than 50% so the man's
 *     outstretched arm (at about 6s) passes BELOW the opening instead of into it — that
 *     was checked across the whole 12s, one frame per 1.5s.
 *   · pr-mov-img_5964 (a courtyard in moving light) would have made a better last room,
 *     and was rejected: for part of the clip a man bows with his forehead to the ground,
 *     a devotional act this section has no business borrowing, on another campus.
 *   · pr-mov-img_5450 carries a household shrine and ends with a teacher's back filling the
 *     frame; pr-mov-img_5913 has a roll-up banner with legible text and a QR code behind
 *     the whole clip.
 * None of the four is used anywhere else on the site (grepped across components/ and app/).
 *
 * The wind chimes are the only frame in the Prabhava set that is outside and unpeopled,
 * which is why the walk ends there: three rooms of people working, then open air.
 *
 * NOBODY IS NAMED: the rooms illustrate what each door is, and the alt text says only what
 * is in the picture. All four come from the Prabhava folder — the three pr-pbh stills by
 * their prefix, and the clip by its `source` field in pranava-clips.json ("Prabhava
 * Photos/IMG_5906.MOV") — so the section carries ONE provenance line for all of them.
 */

export const PROVENANCE = 'Prabhava, a five-day Hatha-Iyengar immersion · 2 to 6 October 2023';

export type Opening = {
  /** top-left of the opening, as a fraction of this room's width / height */
  x: number;
  y: number;
  /** the opening's size as a fraction of the room — the same fraction both ways */
  r: number;
};

export type Room = {
  key: 'learn' | 'practice' | 'heal' | 'insights';
  /** file stem under /media/stills, or the clip's id */
  id: string;
  kind: 'still' | 'clip';
  /** derivative widths that exist on disk, checked — only two of these reach 2560 */
  widths: number[];
  /** object-position inside the 4:5 box */
  pos: string;
  alt: string;
  opening?: Opening;
};

export const ROOMS: Room[] = [
  {
    key: 'learn',
    id: 'pr-pbh-img_5648',
    kind: 'still',
    widths: [480, 960, 1920, 2560],
    pos: '50% 25%',
    alt: 'A woman in a coral top folds forward with both hands on wooden blocks, a second practitioner beside her doing the same, against a yellow wall with an arched window and blue curtains.',
    opening: { x: 0.56, y: 0.05, r: 0.4 },
  },
  {
    key: 'practice',
    id: 'pr-mov-img_5906',
    kind: 'clip',
    widths: [1080],
    pos: '50% 30%',
    alt: 'A man stands at the front of his mat in a long pale hall while two practitioners work on their own mats behind him.',
    opening: { x: 0.64, y: 0.03, r: 0.34 },
  },
  {
    key: 'heal',
    id: 'pr-pbh-img_5787',
    kind: 'still',
    widths: [480, 960, 1920, 2560],
    pos: '50% 10%',
    alt: 'Two people lie back over folding chairs with their knees bent and feet on the chair frames, wooden blocks and a bolster on the mats beside them.',
    opening: { x: 0.58, y: 0.03, r: 0.34 },
  },
  {
    key: 'insights',
    id: 'pr-pbh-img_5586',
    kind: 'still',
    widths: [480, 960, 1920],
    pos: '50% 50%',
    alt: 'Long brass wind chimes and their wooden striker hang beside a terracotta pillar over a white parapet holding two small potted plants, with dense green trees beyond.',
  },
];

/**
 * Where each room sits in the FIRST room's coordinates: P_0 = (0,0), s_0 = 1, and
 * P_{k+1} = P_k + s_k·o_k, s_{k+1} = s_k·r_k. At 1, 0.40, 0.136 and 0.046 the fourth room is
 * a speck of daylight at the end of the vista, which is what an enfilade looks like.
 */
export type Placed = { x: number; y: number; s: number };

export function nest(rooms: Room[] = ROOMS): Placed[] {
  const out: Placed[] = [];
  let x = 0;
  let y = 0;
  let s = 1;
  for (const room of rooms) {
    out.push({ x, y, s });
    const o = room.opening;
    if (!o) break;
    x += s * o.x;
    y += s * o.y;
    s *= o.r;
  }
  return out;
}

/** `/media/stills/<id>-<w>.webp` */
export function stillSrc(room: Room, w?: number): string {
  const largest = room.widths[room.widths.length - 1] ?? 960;
  const want = w ?? largest;
  const pick = room.widths.find((x) => x >= want) ?? largest;
  return `/media/stills/${room.id}-${pick}.webp`;
}

export function stillSet(room: Room): string {
  return room.widths.map((w) => `/media/stills/${room.id}-${w}.webp ${w}w`).join(', ');
}
