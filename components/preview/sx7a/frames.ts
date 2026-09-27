/**
 * THE FIVE PHOTOGRAPHS, and the one thing that stays still across them.
 *
 * Every frame here comes from the Prabhava folder (pr-pbh-* stills and pr-mov-* clips, both
 * sourced from `Context/new/Prabhava Photos/`): one studio, yellow walls, blue curtains,
 * the same folding chairs and wall ropes. None of the five is used on a live page (checked by
 * grepping components/ and app/ for each id, outside the preview routes).
 *
 * THE SEQUENCE IS ORDERED BY HOW FAR THE TEACHER'S HAND IS FROM THE STUDENT — found by
 * looking at the frames, not imposed on them:
 *   held    pr-mov-img_5739  a hand closed round a thigh, taking the weight of an inversion
 *   almost  pr-pbh-img_5622  a hand stopped a few centimetres above a back, not touching it
 *   watched pr-pbh-img_5405  a teacher leaning in from the frame edge, hands nowhere near
 *   unaided pr-mov-img_5466  a practitioner inverted on the wall ropes, nobody in the frame
 *   both    pr-pbh-img_5738  one student steadied at the legs, and beside her another
 *                            holding the same pose alone — the whole sequence in one frame
 * Three different teachers (a patterned shirt, a pale shirt, a white coat), which is the
 * client's second sentence; the fifth frame returns to the first teacher, which is the
 * essay's opener-and-closer.
 *
 * REGISTRATION. Each frame carries the point on the STUDENT where the support lands (`fx`,
 * `fy`, fractions of the source) and the stylesheet places that point on one shared target
 * in the pane, clamped so the picture always covers it. So across the cuts the practice
 * stays put and the teacher is what changes. `z` tightens a crop where the frame has
 * something in it that is not the subject; the `-n` values are the portrait-viewport crop,
 * set by rendering it and looking — DESIGN-SYSTEM §1.
 *
 * WHAT WAS LOOKED AT AND LEFT OUT, so nobody re-litigates it:
 *  · pr-mov-img_5466 the CLIP — it is not a hold. She comes down off the ropes, stands, and
 *    walks at the camera smiling in the last second. Its poster (the held inversion) is used
 *    as a still; the video is never attached.
 *  · pr-mov-img_5739 is 6.2s of a steady hold; the water bottle and bag in its bottom 15%
 *    are cropped out at every width (desktop by the pane ratio, phones by `zN` 1.22).
 *  · pr-mov-img_5681 (a teacher beside a headstand, hands open) is excellent but is the
 *    same man as 5622, and a sixth step made the section longer than its words.
 *  · pr-ttc-dsc_0479 is the hero's rope frame (0479x is its crop); p27-img_0889,
 *    ss-ven0052, ss-ven0131 and p13-img_0569 are spent on home, Within and Yoga Mandala.
 *  · The whiteboard frames 0192/0193/0209/0215/0217 are one event with legible writing.
 */

export type Frame = {
  key: 'held' | 'almost' | 'watched' | 'unaided' | 'both';
  /** the photo-editor's slug: one word for what the teacher's hand is doing */
  slug: string;
  /** what the photograph shows, in the voice of a caption; says nothing it cannot see */
  caption: string;
  alt: string;
  /** a still with a srcset, or a clip poster (jpg + avif) with an optional loop on top */
  kind: 'still' | 'poster';
  id: string;
  /** widths that exist on disk; posters are 1080 wide */
  widths: number[];
  /** source aspect, width / height, of the file the browser actually receives */
  r: number;
  /** registration point on the student, as fractions of the source, and crop zoom */
  fx: number;
  fy: number;
  z: number;
  fxN: number;
  fyN: number;
  zN: number;
  /** a silent loop laid over the poster, attached on approach */
  clip?: string;
  /**
   * The close-up for the closer's recap strip: the same file cut down to the point of
   * support (centre fx, fy; zoom z against a square window) — what the hands are doing.
   */
  detail?: { fx: number; fy: number; z: number; alt: string };
};

export const FRAMES: Frame[] = [
  {
    key: 'held',
    slug: 'Held',
    caption: 'A teacher takes the weight of an inversion at the wall, one hand closed round the student’s leg.',
    alt: 'A man in a patterned shirt and white trousers stands at a wall holding the raised legs of a student who is upside down beside a folding chair.',
    kind: 'poster',
    id: 'pr-mov-img_5739',
    widths: [1080],
    r: 1080 / 1920,
    fx: 0.38,
    fy: 0.21,
    z: 1,
    fxN: 0.4,
    fyN: 0.2,
    zN: 1.22,
    clip: '/media/clips/pr-mov-img_5739.mp4',
    detail: { fx: 0.38, fy: 0.215, z: 2.8, alt: 'Detail: the teacher’s hand closed round the student’s raised leg.' },
  },
  {
    key: 'almost',
    slug: 'Almost',
    caption: 'A hand held just above a student’s back as she folds forward to a chair, not touching it.',
    alt: 'A bearded man in a pale shirt reaches one hand towards the back of a woman in a blue t-shirt who is folding forward with her hands on the seat of a folding chair; a second student works behind her.',
    kind: 'still',
    id: 'pr-pbh-img_5622',
    widths: [480, 960, 1920, 2560],
    r: 3 / 4,
    fx: 0.37,
    fy: 0.36,
    z: 1,
    fxN: 0.36,
    fyN: 0.36,
    zN: 1,
    detail: { fx: 0.33, fy: 0.37, z: 3.3, alt: 'Detail: a hand held just above a student’s back, a gap of air between them.' },
  },
  {
    key: 'watched',
    slug: 'Watched',
    caption: 'A teacher leans in from the edge of the frame to watch a supported shoulderstand.',
    alt: 'A man in a red t-shirt holds a shoulderstand over a folding chair with his feet against the wall, while a woman in white, blurred with movement, leans in from the right edge to watch.',
    kind: 'still',
    id: 'pr-pbh-img_5405',
    widths: [480, 960, 1920],
    r: 3 / 4,
    fx: 0.45,
    fy: 0.4,
    z: 1,
    fxN: 0.58,
    fyN: 0.4,
    zN: 1,
    detail: { fx: 0.86, fy: 0.13, z: 3.4, alt: 'Detail: the watching teacher’s face, blurred as she leans in.' },
  },
  {
    key: 'unaided',
    slug: 'On her own',
    caption: 'A practitioner hangs inverted on the wall ropes, holding the pose with nobody beside her.',
    alt: 'A woman in a pink top and green trousers hangs upside down against a yellow wall, holding two wall ropes, with more ropes hanging beside her.',
    kind: 'poster',
    id: 'pr-mov-img_5466',
    widths: [1080],
    r: 1080 / 1920,
    fx: 0.33,
    fy: 0.33,
    z: 1,
    fxN: 0.48,
    fyN: 0.36,
    zN: 1,
    detail: { fx: 0.4, fy: 0.36, z: 2.6, alt: 'Detail: the practitioner’s own hands on the wall ropes.' },
  },
  {
    key: 'both',
    slug: 'Both',
    caption: 'A teacher steadies one student’s handstand at the window; beside them, another holds hers alone.',
    alt: 'Two people in handstands against a yellow wall: a man in a patterned shirt steadies the legs of the one by the window, while a woman in a teal t-shirt holds her handstand unaided beside them.',
    kind: 'still',
    id: 'pr-pbh-img_5738',
    widths: [480, 960, 1920],
    r: 3 / 4,
    fx: 0.5,
    fy: 0.4,
    z: 1,
    fxN: 0.39,
    fyN: 0.42,
    zN: 1,
  },
];

/**
 * The one provenance line. The Prabhava certificate in the archive dates the workshop; all
 * five frames are from that folder and consistent with a Hatha-Iyengar prop room.
 */
export const PROVENANCE = 'Photographs from Prabhava, a five-day Hatha-Iyengar immersion, 2–6 October 2023.';

export function stillSrc(f: Frame, w: number) {
  return `/media/stills/${f.id}-${w}.webp`;
}

export function stillSrcSet(f: Frame) {
  return f.widths.map((w) => `${stillSrc(f, w)} ${w}w`).join(', ');
}
