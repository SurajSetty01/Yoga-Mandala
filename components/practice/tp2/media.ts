/**
 * §01 Ongoing Sādhana: one still and one clip. They show the same pose, a headstand
 * between two folding chairs, taken by two people in two rooms.
 *
 *  · The still is pr-pbh-img_5592. It is a 3:4 portrait that goes up to 1920, and it is
 *    shown in greyscale by CSS filter. The pose is symmetrical, with the legs as one
 *    vertical line and the arms and chairs as an X, so in grey it reads almost as a
 *    diagram: the thing understood.
 *  · The clip is pr-mov-img_5523: 1080x1920, 2.54 MB, held for about 11 s and then folded
 *    down. The face stays hidden behind the chair the whole time. It plays in colour only
 *    after the second sentence has crossed the reading line: the thing done.
 *
 * Both are shown in a 2:3 window. That cuts the still's sides by 5.5% each, and the arms
 * stay inside. It cuts the clip's height by 16%, and the crop is aimed at y = 44%, which
 * keeps both the toes (9%) and the chair feet (88%).
 *
 * The alt text says what is in each frame. The clip's manifest alt mentions "a folding
 * chair"; the frame shows two, so the alt says two.
 */
export const KNOW = {
  id: "pr-pbh-img_5592",
  widths: [480, 960, 1920],
  w: 1920,
  h: 2560,
  pos: "50% 52%",
  alt: "A person in a supported headstand between two chairs with arms spread along the seats",
} as const;

export const DO = {
  id: "pr-mov-img_5523",
  w: 1080,
  h: 1920,
  pos: "50% 44%",
  alt: "A person holding a headstand between two folding chairs against a pale wall, legs straight up",
} as const;

export const knowSrcSet = KNOW.widths
  .map((w) => `/media/stills/${KNOW.id}-${w}.webp ${w}w`)
  .join(", ");
