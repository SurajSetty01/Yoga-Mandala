/**
 * ONE PHOTOGRAPH, CUT ONCE.
 *
 * `pr-pbh-img_5738`, from the Prabhava Photos folder. Two students are up in handstands at
 * one yellow wall. The one on the left has a teacher at her side: he stands with his back
 * to the camera and his left arm across her legs, the hand open and held out beside them in
 * front of the window. It is not gripping her. The one on the right has nobody near her. She
 * is up on her own hands with a folding chair behind her, and her feet are the highest thing
 * in the frame.
 *
 * WHY THIS FRAME. The section's sentence has two halves: "not to create dependence," and
 * "but to help the student develop the capacity to see, understand and practise for
 * themselves." Every other frame in the archive shows one or the other: a teacher's hands on
 * a student, or a student alone. This is the only exposure in which both happen in the same
 * minute, at the same wall, in the same pose. Magnum's editors called that the frame to ring
 * on the contact sheet: the one where every element in the scene lines up. The design does
 * nothing to the picture except decide where its two cuts fall.
 *
 * NOBODY IS IDENTIFIED. The archive identifies no person, so no frame on this page may be
 * read as the founder. The teacher is seen from behind: the back of his head, a sliver of
 * beard at the edge of his cheek, a patterned shirt. He is captioned as "a teacher" and never
 * as anyone in particular, and the section's subject is the student on the right, not him.
 * The name above the photograph sits over a band of text, never beside the man.
 *
 * PROVENANCE, READ FROM THE FILE. The source HEIC's DateTimeOriginal is 2023:10:05 13:35:33.
 * That falls inside Prabhava, which a certificate in the client's archive identifies as a
 * five-day Hatha-Iyengar Immersion held 2–6 October 2023. The frame shows prop-based studio
 * practice, which is consistent with that, so the caption names the workshop. It names
 * nobody.
 *
 * WHERE THINGS ARE, measured on the 3024×4032 original as fractions of its height (y) and
 * width (x):
 *   · the plain wall, y 0.00–0.12, full width;
 *   · the right-hand student's feet, y 0.128–0.18; the left-hand student's, y 0.164–0.227;
 *   · the teacher's head (back of), y 0.27–0.33, x 0.39–0.45;
 *   · his open hand, y 0.348–0.385, x 0.20–0.26; the forearm and sleeve across her legs,
 *     y 0.33–0.41, x 0.26–0.37;
 *   · the waist of the frame (his back, both students' hips, the chair back), y 0.42–0.57;
 *   · the right-hand student's face, y 0.62–0.70; her hands on the mat, y 0.73–0.80;
 *   · a red bag and a cloth dumped on the floor, x 0.14–0.22, y 0.56–0.62 (the one piece
 *     of clutter the lower cut keeps; cutting lower would lose the faces).
 *
 * THE CUTS. The upper band shows y 0.11–0.42: both pairs of feet and, at its bottom edge,
 * the teacher's arm. When the sentence turns, the band lifts to y 0.02–0.33. The frame's
 * content drops by 0.09 of its height, so his hand and sleeve pass under the band's lower
 * edge into the cut, and the feet get the room the arm had. The lower band shows
 * y 0.57–0.84 and does not move. The cut between them hides the waist of the frame, which is
 * the one stretch of it that says nothing.
 *
 * PIXELS. The encodes are 480/960/1920. There is no 2560, so nothing here assumes one. On the
 * desktop the print sits on the page measure (capped at 92rem = 1472px), so it is at most
 * 1472 wide and always a downscale from 1920. On a phone the frame is drawn at 1.45× the
 * screen width so the two students fill it. 390 CSS px × 1.45 × DPR 3 = 1697 device px,
 * still under 1920.
 */

export const FRAME = {
  id: 'pr-pbh-img_5738',
  w: 1920,
  h: 2560,
  widths: [480, 960, 1920],
  upper: { y0: 0.11, y1: 0.42, lift: 0.09 },
  lower: { y0: 0.57, y1: 0.84 },
  /** phone: the frame drawn wider than the screen, and where its left edge falls */
  phone: { scale: 1.45, x0: 0.12 },
  alt: 'Two students in handstands at a yellow wall. On the left, a teacher seen from behind stands at one student’s side with his arm across her legs and his hand open. On the right, the other student is up on her own hands with nobody beside her, a folding chair behind her.',
  altLower:
    'The lower part of the same photograph: both students upside down, the one on the right on her own hands on a dark mat.',
} as const;

export function src(w: number): string {
  return `/media/stills/${FRAME.id}-${w}.webp`;
}

export function srcSet(): string {
  return FRAME.widths.map((w) => `${src(w)} ${w}w`).join(', ');
}
