/**
 * sx6b · THE FOUNDER — the six frames of the frieze, and why each one is here.
 *
 * THE ORDERING PRINCIPLE. Every frame below is from Prabhava, the five-day Hatha-Iyengar
 * immersion of 2-6 October 2023 (the three clips are .MOV files and the three stills .HEIC
 * files from the one "Prabhava Photos" folder). They are sorted by ONE measurable thing:
 * how much the teacher is doing for the student in the frame —
 *
 *   1  holding          the teacher takes the student's weight
 *   2  a hand           one hand reaching to a back
 *   3  a step away      hands off, talking, on the next mat
 *   4  watching         leaning in to look, not touching
 *   5  across the room  a teacher is at the far end of the room, with someone else
 *   6  alone            nobody; she climbs down the ropes and walks out of the frame
 *
 * which is the pull-quote, photographed. Found in the archive, not staged: 5405 and 5407
 * are the same practitioner in the same shoulderstand over the same chair, first watched
 * from a foot away and then left to it, and the three clips are three inversions at a wall
 * at three degrees of support.
 *
 * EACH ONE WAS LOOKED AT, NOT READ. Two places where the pixels contradict the audit:
 *   · pr-mov-img_5681 is described in the vision audit as "a man supports them and helps
 *     them down". Sampled at 2 fps across its last four seconds: he never touches her. He
 *     stands on the next mat talking to the students on the floor, and she comes down on
 *     her own. That contradiction is the whole reason it is in position 3 and not 1.
 *   · pr-mov-img_5739's audit calls the student "a person"; nothing in the frame settles
 *     who they are, so nothing here does either — "a student", "their legs".
 *
 * NOBODY IS NAMED, AND NO FRAME IS PRESENTED AS THE FOUNDER. The archive identifies no one.
 * More than one teacher appears across the six — a woman in a white coat in 5405, a man in
 * a yellow kurta at the far end of 5407, and a man (or men: the frames cannot settle it) in
 * a patterned shirt and a striped one — which is part of why this reads as a frieze of
 * teaching and not as a portrait of anybody. Every caption says
 * what the frame shows. The frieze sits under the quotation, never beside the biography.
 *
 * WHAT WAS NOT USED, AND WHY:
 *   · pr-mov-img_5913 — a man seated cross-legged speaking in front of a banner. The
 *     strongest single-teacher clip in the set, and exactly the frame that would be read as
 *     the founder whatever its caption said.
 *   · pr-mov-img_5450 — the teacher sits down on a bolster to watch, which is a perfect
 *     step 4 in the video and absent from its poster: frame 0 has no teacher in it at all,
 *     so the static and reduced-motion section would have lost the step.
 *   · pr-pbh-img_5738 — one person steadied and one balancing alone in the SAME frame. The
 *     whole argument in one picture, which is why it cannot be one step of six.
 *   · pr-pbh-img_5616 / pr-mov-img_5455 — both already live on /learn/.
 *
 * CROPS. Every pane is 3:5 (0.6). A 9:16 clip loses 6% of its height into that and the
 * `pos` Y chooses which end; a 3:4 still loses 20% of its width and `pos` X chooses the side.
 * Chosen on the rendered pane, so the hand, the gap or the empty wall is in shot at 390 and
 * at 2531 alike. Nothing on disk reaches 2560 except 5622; the clip posters are 1080 wide and
 * the widest pane on any tested viewport is 415 CSS px (830 device px at DPR 2).
 */

export type Pane = {
  /** file stem under /media/stills, or under /media/posters + /media/clips for a clip */
  id: string;
  kind: 'clip' | 'still';
  /** widths that exist on disk for a still; clip posters are single 1080x1920 files */
  widths?: number[];
  /** object-position inside the 3:5 pane */
  pos: string;
  /** the step, two or three words — set in the caption system's small capitals */
  label: string;
  /** what the frame shows, short enough to sit under a 167px pane in the static frieze */
  line: string;
  alt: string;
  /** which clause of the quotation this step belongs to: 0, 1 or 2 */
  clause: 0 | 1 | 2;
};

export const PANES: Pane[] = [
  {
    id: 'pr-mov-img_5739',
    kind: 'clip',
    /* the feet are at the very top of the frame and a water bottle and bag sit in the
       bottom corner: all of the 6% the pane loses is taken from the bottom */
    pos: '50% 0%',
    label: 'Holding',
    line: 'A teacher takes a student’s legs at the wall.',
    alt: 'A teacher in a patterned shirt holds a student’s legs steady as the student balances upside down against a wall, a folding chair beside them.',
    clause: 0,
  },
  {
    id: 'pr-pbh-img_5622',
    kind: 'still',
    widths: [480, 960, 1920, 2560],
    /* the teacher stands at the left edge of the source; his reaching hand is the subject,
       so almost all of the 20% goes from the right, where the chair's far legs are */
    pos: '8% 50%',
    label: 'A hand',
    line: 'Reaching to the back of a forward bend.',
    alt: 'A teacher reaches out a hand to the back of a woman folding forward with her hands on the seat of a folding chair, while a second practitioner works on her own behind them.',
    clause: 0,
  },
  {
    id: 'pr-mov-img_5681',
    kind: 'clip',
    pos: '50% 40%',
    label: 'A step away',
    line: 'Beside a headstand, hands off.',
    alt: 'A teacher stands a step away with his hands off while a student holds a headstand beside the wall, and students sitting on the floor watch.',
    clause: 1,
  },
  {
    id: 'pr-pbh-img_5405',
    kind: 'still',
    widths: [480, 960, 1920],
    /* the watcher is at the right edge; the curtain on the left is what is given up */
    pos: '92% 50%',
    label: 'Watching',
    line: 'Leaning in to look, not to touch.',
    alt: 'A man lies in a supported shoulderstand over a folding chair with his feet on the wall while a woman in a white coat leans in to watch.',
    clause: 1,
  },
  {
    id: 'pr-pbh-img_5407',
    kind: 'still',
    widths: [480, 960, 1920],
    /* the far-end teacher is small, just right of centre: keep him, lose the left wall.
       Only ONE person there is plainly teaching (the man bending over a student); the
       woman standing beside him could be anyone, so the caption says "a teacher". */
    pos: '58% 50%',
    label: 'Across the room',
    line: 'The same pose; a teacher works at the far end.',
    alt: 'The same supported shoulderstand repeated down a row along the wall, while at the far end of the room a man in a yellow kurta bends over another student.',
    clause: 1,
  },
  {
    id: 'pr-mov-img_5466',
    kind: 'clip',
    pos: '50% 50%',
    label: 'Alone',
    line: 'The wall ropes, and no one beside her.',
    alt: 'A student hangs upside down from the ropes on a plain wall with no one beside her.',
    clause: 2,
  },
];

/** `/media/stills/<id>-<w>.webp` — the widest that exists, for the plain `src` */
export function stillSrc(p: Pane): string {
  const w = p.widths?.[p.widths.length - 1] ?? 960;
  return `/media/stills/${p.id}-${w}.webp`;
}

export function stillSrcSet(p: Pane): string {
  return (p.widths ?? []).map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ');
}
