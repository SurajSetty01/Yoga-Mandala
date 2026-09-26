/**
 * The two photographs this section stands in.
 *
 * ONE IS THE ROOM AND ONE IS THE RELATIONSHIP, and that split is the section's
 * argument, not a pairing of two nice frames. The first is a hall seen from
 * outside the practice — five people, a line, light coming in from the open
 * side; it is the room the first three terms stand in. The second is shot from
 * inside a class with a teacher down on his heels beside a student; it is the
 * one thing in the section that is NOT in the room, because the fourth term is
 * not a fourth of the same kind.
 *
 * WHY THE TWO DO NOT SHARE AN ATMOSPHERE, deliberately. An earlier draft of this
 * section composited paper plates over the hall at five depths in one frustum,
 * and there the design system's rule applies: every plane must share an
 * atmosphere or the near plane reads as a bright rectangle laid on a dark
 * picture. That composite is gone. Nothing is now laid over either photograph —
 * no type, no plate, no scrim — and the two frames are on opposite sides of a
 * hard ground change. A different room, a different light and a different
 * distance is exactly what "on your side of the picture" needs to look like.
 *
 * NEITHER IS USED ANYWHERE ELSE ON THE SITE. Checked against every `pr-` id
 * quoted in `components/` and `app/` outside `components/preview/`:
 * `pr-ttc-dsc_0566` appears once in the whole tree, inside a comment in
 * `components/about-pranava/frames.ts` explaining why the page's HERO does not
 * use it (it would repeat the hero's own standing-class composition one screen
 * later). That objection is about adjacency to the hero and does not apply four
 * sections down. `pr-pbh-img_5407` appears nowhere.
 *
 * NEITHER IS EVER PAINTED WIDER THAN ITS LARGEST DERIVATIVE, and this is the
 * measurement, not the intention. Painted width against served file at the seven
 * standard viewports — hall: 347←480, 704←960, 408←480, 515←960, 735←960,
 * 1096←1620, 1096←1620; teaching frame: 347←480, 704←960, 832←960, 622←960,
 * 764←960, 832←960, 832←960. The smallest downsample anywhere in the section is
 * 1.15× and the largest is 1.86×. Nothing is upscaled at any viewport or at any
 * point in the dolly's travel, where the wall's scale tops out at 1.0000.
 *
 * ONE COLLISION TO DECLARE. `pr-pbh-img_5407` is used by no component outside
 * `components/preview/` — it is on none of the live pages — but it IS used by
 * sx2d, a competing concept for §02 of this same page. At most one of the two
 * can ship on the About page; if both win their sections, this one is the frame
 * that must move, because §02 chose it first. The archive's nearest equivalents
 * that are free at the time of writing are `pr-pbh-img_5397` (the same line of
 * shoulderstands with a teacher kneeling at the far end beside a seated student,
 * quality 4) and `pr-pbh-img_5623` (the teacher standing close behind the
 * student, hand near her shoulder, quality 4).
 *
 * NOBODY IS NAMED. The archive does not record who is in which frame and the
 * client has supplied no faculty names; every description below says what is
 * happening, which is what a reader who cannot see the picture actually needs.
 */

export type Frame = {
  id: string;
  /** widths that actually exist on disk, largest last */
  widths: number[];
  /** the source pixel ratio, so a box can be given the frame's own shape */
  ratio: number;
  /** object-position for the wide box */
  pos: string;
  /** object-position for the narrow box, set deliberately and looked at */
  posNarrow: string;
  alt: string;
  /** the visible caption. It says what is IN the frame, never what the page does. */
  cap: string;
};

export const src = (f: Frame) => `/media/stills/${f.id}-${f.widths[f.widths.length - 1]}.webp`;
export const srcSet = (f: Frame) =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');

export const FRAMES = {
  /* THE ROOM.
   *
   * Five practitioners stand in a line down an open-sided hall with a wooden
   * stick held overhead, straps hanging from the roof beams above them, low sun
   * raking across the red oxide floor from the open side and green trees beyond
   * it. The audit calls the light "the best light in the archive"; it is held
   * back to quality 3 for softness and for the row being cut at the right edge.
   *
   * IT IS SHOWN AT ITS OWN RATIO, 1620 × 1080, AT EVERY VIEWPORT — `aspect-ratio:
   * 1620 / 1080` on the image, so `object-fit: cover` has nothing to crop. 100%
   * of the frame survives at 320 and at 2560. The previous version of this
   * section forced it into a 390 × 1267 portrait slot and kept 21% of its width,
   * throwing away the line of five, the raking light and the open side — the
   * three things it was chosen for. A landscape frame now gets a landscape box,
   * and the box is the frame's own.
   *
   * The `pos` values below therefore do nothing at the rendered ratio. They are
   * left as the deliberate fallback if the box is ever changed, and they name
   * the part of the frame that must survive if it is: the row and the floor. */
  hall: {
    id: 'pr-ttc-dsc_0566',
    widths: [480, 960, 1620],
    ratio: 1620 / 1080,
    pos: '50% 54%',
    posNarrow: '50% 54%',
    alt: 'Five practitioners stand in a line down an open-sided hall, each holding a wooden stick overhead with straps hanging from the roof beams, low sunlight raking across the red floor from the open side and green trees beyond it.',
    cap: 'Five in a line with sticks overhead, and the open side the light crosses',
  } satisfies Frame,

  /* THE RELATIONSHIP.
   *
   * A row of practitioners lie in supported shoulderstand with their legs up a
   * pale wall over folding chairs; at the far end of the row a man in a yellow
   * kurta is down on his heels beside the nearest of them, looking at her, and a
   * second student stands behind him watching. The audit calls it "the most
   * complete story on the sheet: a foreground practitioner, a receding line of
   * the same pose, and a teacher actively working in the background."
   *
   * IT REPLACES pr-ttc-dsc_0274, AND THE CRITIC WAS RIGHT. 0274 is a line of
   * people lying with their legs over chairs photographed from the foot of the
   * row; there is no teacher anywhere in it, and it was sitting under a
   * paragraph whose subject is "the relationship between teacher and student".
   * This frame has the teacher, the student he is attending to and a third
   * person learning by watching — which is the paragraph, exactly.
   *
   * IT IS NOT THE 3.2 MB CLIP. `pr-mov-img_5681` is the archive's other
   * teacher-and-student frame and it is a 10.5s, 1080 × 1920, ~2.46 Mbps MOV
   * with no smaller encode. Delivering it here would cost more than three times
   * this whole section's current weight, on a phone, to animate one plate. This
   * section carries no video at all.
   *
   * THE CROP IS SET AGAINST THE PIXELS, NOT THE MANIFEST. The frame is portrait
   * (3024 × 4032 at source, derivatives at 480 / 960 / 1920) and is shown in a
   * 4:3 box, keeping the middle 56% of its
   * height: y 0.21 → 0.78 of the source. That window was rendered and looked at
   * before it was written down. It drops the four framed A4 notices along the
   * top edge and the ceiling fan in the top-right corner — the furniture four
   * frames have already been rejected on this project for — and keeps the whole
   * row, the teacher, the watching student and the floor. The chairs and blocks
   * inside it are props in use under the shoulders of the people lying on them. */
  teach: {
    id: 'pr-pbh-img_5407',
    widths: [480, 960, 1920],
    ratio: 3024 / 4032,
    pos: '50% 49%',
    posNarrow: '50% 49%',
    alt: 'A row of practitioners lie in supported shoulderstand with their legs up a pale wall over folding chairs, while at the far end of the row a man crouches down beside the nearest of them, looking at her, and another student stands behind him watching.',
    cap: 'A teacher down on his heels at the end of the row, and one student watching',
  } satisfies Frame,
} as const;
