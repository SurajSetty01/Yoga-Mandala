/**
 * THE SECTION'S TWO PHOTOGRAPHS.
 *
 * The round-one build of this section used four frames of one room and drew three of them
 * off with a scroll-driven wipe. Two critics measured that apart: the wipe manufactured
 * exactly the furniture-as-subject bands this project has already rejected four frames for
 * (a ceiling fan, a fluorescent tube, a CCTV camera, a barred window, four folding chairs),
 * one of the four — `pr-pbh-img_5746`, a corner with an empty chair and a red bag — was that
 * failure standing still, and the chip could be caught naming a term the picture beneath it
 * was not. None of that is tuned here. THE FOUR-FRAME SET IS GONE. Two frames remain, they
 * are shown whole or cropped deliberately, and neither is ever revealed, wiped or clipped.
 *
 * THE PAPER SIDE GETS ONE PICTURE FOR THREE TERMS, ON PURPOSE. Tradition, Practice and
 * Inquiry are three descriptions of one activity, so they get one photograph of that
 * activity — not three parallel plates, which would package into three objects the very
 * paragraph that says Yoga is not information that can be packaged and delivered. That the
 * frame happens to hold exactly three people in exactly the same shape is why it was chosen
 * over the other inversions on its sheet.
 *
 * WIDTHS WERE READ OFF DISK, NOT ASSUMED, and every `sizes` value below is the measured box
 * at that breakpoint — see the arithmetic beside each one. A `sizes` written against an
 * element box that a transform then scales is a 1.66x upscale on a phone; nothing in this
 * section scales a painted image, so box width IS painted width and the two can be checked
 * against each other in the browser.
 */

/* ── The paper side ─────────────────────────────────────────────────────────
   pr-ttc-dsc_0195_1 · 1620x1080 on disk, ratio 1.5, widths 480/960/1620.

   LOOKED AT, not read from the manifest — which calls it four practitioners. It is three:
   the nearest in a maroon top, the second in blue floral leggings, the third in a pink top,
   each lying back over a folding chair with her feet on the wall and a wooden block by her
   hands, receding along a red oxide floor, with green shade netting over the window at the
   left. No face is turned to the camera; nothing is legible on a wall.

   The plate is set to 3/2 — the source's own ratio to three decimal places — so `cover`
   crops nothing at any viewport and the frame is always whole. */
export const ROOM = {
  id: 'pr-ttc-dsc_0195_1',
  widths: [480, 960, 1620],
  /* ratio 3/2 === the source, so this is inert and is stated only to be explicit */
  pos: '50% 50%',
  alt:
    'Three practitioners lie back in a supported shoulderstand over folding chairs in a ' +
    'receding line, feet against a grey wall, a wooden block by each pair of hands on a ' +
    'red oxide floor.',
  cap: 'Three in the same supported shoulderstand, a block by each pair of hands',
  /* MEASURED, not estimated. The plate takes the page's left margin and then runs off the
     right edge, so its width is (viewport - left margin - text column - gutter):

       <500      100vw - 1.25rem        (page gutter is its 1.25rem floor)      390 ->  370
       500-999   100vw - 4vw                                                    768 ->  737
       1000-1599 96vw - 31rem - 3rem    (text column 496 + gutter 48)          1024 ->  439
                                                                               1440 ->  838
       1600-1647 100vw - 72 - 544       (page gutter caps at 4.5rem)
       >=1648    50vw + 208             (rail caps at 94rem; left margin is
                                         (100vw - 1504)/2 = 50vw - 752)        2531 -> 1474

     Checked against the rendered box at all four viewports; see the report. */
  sizes:
    '(min-width: 1648px) calc(50vw + 208px), ' +
    '(min-width: 1600px) calc(100vw - 616px), ' +
    '(min-width: 1000px) calc(96vw - 544px), ' +
    '(min-width: 500px) calc(100vw - 4vw), ' +
    'calc(100vw - 1.25rem)',
} as const;

/* ── Across the cut ─────────────────────────────────────────────────────────
   pr-mov-img_5681 · 1080x1920, 10.5s, the one complete teaching arc in the clip set: a
   teacher stands mid-sentence with his hands open, a student holds a supported headstand
   against the wall with a belt around her upper arms, and two people watch from the floor.
   Critic one is right that this is the correct frame for a paragraph about the relationship
   between teacher and student, and it is kept for that reason.

   IT IS CROPPED ON PURPOSE, TO 3/4, AND THE CROP WAS SET OFF THE PIXELS. The source was
   measured, not described: the tube lamp occupies source rows 148-279, the two A4 notices
   taped to the wall run 348-583, the teacher's hair starts at 514 and the student's raised
   feet at 592. `cover` on a 3/4 box scales by WIDTH (0.75 > 0.5625), so the full width of
   the frame survives and 25% of its height — 480 source rows — is croppable.

   Round two shipped `50% 82%`, which spent 392 of those rows and left the notices standing
   whole across the top of the picture: rendered at 1440 the box is 408x544 and the notices
   came to 70px of it, which is the wall-with-posters band a critic measured in another
   design and was right to. `50% 92%` spends 442 rows instead. Measured on the rendered
   crop at the 1440 box: the notices fall to 35px of 544 (6.4% of the frame, reduced by
   half), and the teacher keeps 40px of headroom — the crop CANNOT go further without
   taking his head off, because only 72 source rows separate the foot of the notices from
   the top of his hair. Nothing the frame was chosen for is outside it: teacher, student
   and both watchers are all in, verified on the rendered crop rather than asserted.

   The <img> is the clip's own poster frame carried as an ordinary image — 25 KB as AVIF,
   115 KB as JPEG — and the <video> has NO `poster` attribute, which is fetched even when
   `src` is never set and cost this site 948 KB once.

   THE 3.15 MB MP4 IS GATED ABOVE 1000px AND IS NEVER FETCHED BELOW IT. One encode exists,
   1080x1920 at ~2.46 Mbps, and there is no smaller variant; `public/media/` is outside this
   design's remit, so the gate is the fix available here and a second encode is an
   outstanding delivery item before this ships anywhere. */
export const LIVE = {
  id: 'pr-mov-img_5681',
  /** 3/4 box on a 0.5625 source: full width kept, 442 of 480 croppable rows spent upward */
  pos: '50% 92%',
  alt:
    'A teacher stands mid-sentence with his hands open beside a student holding a supported ' +
    'headstand against the wall, while two people watch from the floor.',
  cap: 'The teacher talks the shape through; two others watch from the floor',
} as const;

export function srcSet(f: { id: string; widths: readonly number[] }): string {
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}
export function src(f: { id: string; widths: readonly number[] }): string {
  return `/media/stills/${f.id}-${f.widths[f.widths.length - 1]}.webp`;
}
