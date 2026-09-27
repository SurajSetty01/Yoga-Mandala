/**
 * The one photograph in this section, and why it is this one.
 *
 * The client's own brief for the About hero (Context/new/Pranava About Page.docx, §2) asks
 * for "a strong photograph of Pranav teaching, preferably with students visible rather than
 * a standalone portrait". That is, word for word, what a book calls a FRONTISPIECE: the
 * plate facing the title page, traditionally a picture of the person the book is about.
 *
 * `pr-mov-img_5681`'s still is the only frame in either library that holds all three at
 * once — a man explaining, hands moving, beside a student holding a headstand at the wall,
 * while two more sit on the floor and watch. Teacher, student, practice, and the people it
 * is being passed to. It is used nowhere on the live site (checked against every file under
 * components/ and app/ outside this preview).
 *
 * WHY THE STILL AND NOT THE CLIP. The clip was pulled to frames and looked at: the camera
 * pans right across its 10.5s, the two seated students leave the frame by the fourth second
 * and the student is on the floor by the last. The still is the only moment in it where the
 * students are visible — which is the one thing the client asked for. No <video> is
 * attached, so there is no poster attribute to be fetched twice.
 *
 * NOBODY IS NAMED. The audit is explicit that nothing in the archive identifies any person,
 * so neither the alt text nor the caption says who is teaching.
 *
 * THE CROP. The file is 1080×1920 (portrait, 9:16). The plate is cut at 4:5 and positioned at
 * 62% down the frame: that drops the wall lamp and its glare (y 180–280 of 1920) out of the
 * top and keeps the teacher's head (y≈530), the student's feet (y≈600) and both seated
 * students (y≈1030–1600) in. The two notices on the wall are unreadable at any plate size
 * this section draws.
 */
export const PLATE = {
  avif: '/media/posters/pr-mov-img_5681.avif',
  jpg: '/media/posters/pr-mov-img_5681.jpg',
  w: 1080,
  h: 1920,
  pos: '50% 62%',
  alt: 'A man in a striped shirt explains with his hands beside a student holding a headstand against the wall, while two students sit on the floor and watch.',
  /** a marginal note, not a claim: what is in the picture, and nothing it cannot show */
  caption: 'A headstand at the wall, the teacher beside it, and two students watching from the floor.',
} as const;
