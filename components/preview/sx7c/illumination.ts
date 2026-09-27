/**
 * THE LEAF'S ONE ILLUMINATION, and why it is this one.
 *
 * The section is laid out as a tripāṭha leaf: the lead in the middle of the page as a root
 * text, the client's two paragraphs written above and beneath it as its commentary, and
 * one picture set into the leaf at the column where a pothi's binding cord would pass.
 * That picture has to have the leaf's own shape, or it is just a photograph beside words.
 * This clip has it. One person moves through a standing pose in the middle of the room,
 * and everyone else in frame (two on his left, two on his right) stands still and watches
 * him. One thing in the middle, read from both sides: the page, done by people.
 *
 * Chosen by LOOKING at every teaching frame and clip, unspent or not:
 *   · pr-mov-img_5681: a teacher beside a headstand, seated students watching. A strong
 *     centre-and-surround too, but the watchers are all on one side and the practitioner
 *     comes down at about 8 s, so the "middle" empties out of the loop.
 *   · pr-mov-img_5642: a teacher standing between two students, but only at the start.
 *     By 4 s the camera has drifted and he is cut at the right edge for the rest.
 *   · pr-mov-img_5450: the teacher enters from the foreground with his back to us and fills
 *     half the frame, so the loop ends on the back of a shirt.
 *   · pr-pbh-img_5622 / 5738 / 5405 / 5407: stills. This leaf's picture is the only thing
 *     on it that moves, and it has to be a portrait, because the binding column is tall.
 *     5405 is also the "clinical" frame the audit warns about (a white coat).
 *
 * WHAT IS IN FRAME, checked on frames pulled at 0, 3, 6 and 9 s: the wall notices are
 * paper sheets that are illegible at any size this page renders; the yellow T-shirts
 * carry a print that is illegible too. No legible text and no signage. There is also no
 * event this clip can be tied to: it is a `pr-mov-*` file, and the Prabhava workshop dates
 * in the brief are licensed only for `pr-pbh-*` frames. So the caption says what the
 * picture shows and nothing else. No names, roles, place or date.
 *
 * Unspent: a grep of components/ outside /preview/ finds this id nowhere on the site.
 * Encoded 1080×1920, 12.0 s, H.264 in bt709, no audio stream (see the audit's §4).
 */
export const ILLUMINATION = {
  id: 'pr-mov-img_5582',
  video: '/media/clips/pr-mov-img_5582.mp4',
  /** the still beneath the video, which is ALSO its poster. There is no `poster` attribute. */
  still: '/media/posters/pr-mov-img_5582.jpg',
  stillAvif: '/media/posters/pr-mov-img_5582.avif',
  w: 1080,
  h: 1920,
  alt: 'A man moving through a wide standing pose on a mat while the people either side of him stand and watch.',
  /** short enough to run up the margin as ONE line beside the picture at 320px */
  caption: 'One person moves through a pose; the others watch.',
} as const;
