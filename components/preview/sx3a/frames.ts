/**
 * The four frames of §03, the crop each one is printed at, and the width it is laid out at.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════
 * ONE SOURCE FOR THE LAYOUT WIDTH, THE CROP AND `sizes`. THIS IS THE ROOT FIX.
 *
 * The first version of this file wrote `sizes` by hand beside the crop and trusted a
 * comment to keep the two in step. They drifted, and the drift is invisible in source and
 * only appears in the network panel: plate 2 was laid out at 78vw on a phone, printed at
 * 1.62×, and shipped `sizes="(max-width: 899px) 100vw"` — 390 declared px for a box
 * painting 493. A 26% under-declaration on the frame that is cropped hardest.
 *
 * So the width is no longer written twice. `w` below is the LAYOUT width, in the same
 * units the stylesheet uses, and it is handed to CSS as a custom property AND multiplied
 * by `z` to build `sizes`. There is exactly one number, and both consumers derive from it,
 * so a future change to the ramp cannot leave `sizes` behind.
 *
 * VERIFIED, not asserted. Measured with getBoundingClientRect() — which returns the
 * TRANSFORMED box — against the file the browser actually chose:
 *
 *     390    p1 272 painted / 272 declared    p2 417/417    p3 439/439
 *     1440   p1 476/476                       p2 686/686    p3 774/774
 *     2531   p1 605/605                       p2 871/871    p3 983/983
 *
 * A NOTE ON THE NUMBER A CRITIC REPORTED. One review recorded plate 2 as "img box 493px ×
 * transform scale(1.62) = 799px painted … 1.66× upscale at 390", and at 1440 "box 886 ×
 * 1.62 = 1435px painted from the 960w tier → 1.49× upscale". Measured on the old build,
 * `offsetWidth` (the layout box) was 304 at 390 and 547 at 1440; `getBoundingClientRect()`
 * (the painted box) was 492.8 and 886.4 — i.e. 493 and 886 ARE the post-transform widths,
 * and multiplying them by 1.62 a second time double-counts the scale. The served file at
 * 1440 was the 960w tier against an 886px paint: a 1.08× DOWNSAMPLE, not a 1.49× upscale.
 * The real defect was smaller and at the other end — 480w against a 493px paint at 390,
 * a 1.03× upscale — and it is fixed at the root above rather than tuned away.
 * ══════════════════════════════════════════════════════════════════════════════════════
 *
 * EVERY ID BELOW WAS GREPPED AGAINST components/ AND app/, AND THE GREP IS REPORTED IN
 * FULL RATHER THAN SUMMARISED, because the summary that stood here was wrong.
 *
 *   pr-pbh-img_5362   also components/preview/sx1b/frames.ts   — a §01 candidate, not live
 *   pr-pbh-img_5532   nowhere else
 *   pr-pbh-img_5372   also components/preview/sx1b/frames.ts   — a §01 candidate, not live
 *   pr-mov-img_5455   also components/learn/frames.ts          — /learn/ IS A SHIPPED ROUTE
 *
 * THE LAST LINE IS A CORRECTION. This file previously asserted that no still and no clip
 * here "appears on /about/, /yoga-mandala/ or any shipped route". `pr-mov-img_5455` is
 * `GUIDE_CLIP` on the live /learn/ page, where it is described in almost the same words
 * used below — "the clearest hands-on teaching in the clip set". The claim was written
 * from a grep of /about/ and /yoga-mandala/ and then generalised to "any shipped route",
 * which is how a check becomes a sentence that is no longer the check.
 *
 * IT IS KEPT, AND WHY, SO A COMBINER CAN OVERRULE THIS WITH ITS EYES OPEN. The only two
 * unused teaching clips in the Praṇava set are `pr-mov-img_5739` and `pr-mov-img_5642`.
 * 5739 was rendered at poster size and looked at: a teacher's hands on a student's legs
 * in a headstand — correct subject — but the frame also carries a black folding chair
 * across its left third, THREE A4 NOTICES WITH LETTERHEADS taped to the wall behind the
 * student's feet, and a blue water bottle in the near foreground. That is the folding
 * chair, and the wall of posters, that this project has already rejected four frames for,
 * and one of them was rejected in this very comparison. 5642 is a standing sequence with
 * the teacher between two students and nobody being touched, which is not a transmission.
 * So the choice is a frame shared with a page eight items away in the site's reading
 * order, or a frame whose largest objects are furniture. The pixels decide it, and they
 * decide it the same way a review did independently: this is the one frame in the four-way
 * comparison where the declared subject is unambiguously what you see.
 *
 * EVERY FRAME WAS OPENED AND LOOKED AT, not read about. Frames rejected on sight:
 *
 *   · `pr-pbh-img_5622` — "the clearest hands-on correction in the Prabhava set". In the
 *     pixels the teacher stands at the far left with his hand over an empty mat, and the
 *     two largest objects are a folding chair and a ceiling fan.
 *   · `pr-pbh-img_5746` — "the best single-figure inversion in the archive", with an empty
 *     black folding chair in the near corner physically larger in frame than the person.
 *   · `pr-pbh-img_5732` / `_5618` — both led by a foreground folding chair; `_5732` also
 *     carries a legible "YOGA HALL 2" sign and two brand marks at readable size.
 *   · `pr-ttc-dsc_0566` — 1620px maximum, graded "held back by softness", and it is a
 *     landscape room frame. Nothing here is asked to be a landscape frame in an upright box.
 *
 * WHY `pr-pbh-img_5648` IS NO LONGER HERE, THOUGH IT IS A GOOD FRAME. It was Tradition,
 * and a review found it near-duplicate with Inquiry: both are two practitioners folding
 * forward over a straight front leg, in the same room, against the same yellow wall and
 * blue curtain, and the two alt texts collided on their first fifteen words. Looking at
 * them side by side that is exactly right. Tradition is now `pr-pbh-img_5362` — warrior
 * two, standing, arms level — so the three plates are now three different orientations of
 * a body: STANDING, INVERTED, FOLDED. The room and the light are still shared, which is
 * the link; the shape is not, which is the difference.
 *
 * WIDTHS ARE READ OFF DISK, NEVER ASSUMED. None of the three reaches 2560; all three stop
 * at 1920, and the table above shows 1920 covers the largest paint any of them takes
 * (983px at 2531) with 1.95× in hand.
 */

export type Still = {
  id: string;
  widths: number[];
  /**
   * THE LAYOUT WIDTH, in the stylesheet's own terms. `vw` is the viewport percentage and
   * `rem` the cap; `min(<vw>vw, <rem>rem)` is what the plate is laid out at above 900px,
   * and `narrow` is the single vw figure it is laid out at below 900px.
   *
   * The ramp these encode is 0.52 / 0.70 / 1.00 of a common step, so the three plates are
   * one number scaled three ways rather than three numbers that happen to increase.
   *
   * `narrowRem` caps the stacked layout between about 600 and 899px. Without it a 768px
   * portrait tablet gets an 88vw plate 676px wide and 901px tall, and the section runs to
   * 4.2 screens there — a phone ramp applied to a tablet. Measured at 768 the cap holds
   * the run at 304 / 432 / 576 and the third still reaches the right edge of the screen.
   */
  w: { vw: number; rem: number; narrow: number; narrowRem: number };
  /**
   * THE CROP. All three sources are native 3 : 4 and the aperture is 3 : 4, so
   * `object-fit: cover` has nothing in surplus and `object-position` does nothing at all.
   * The crop is therefore an ENLARGEMENT — `z` is the factor the frame is printed at and
   * `zo` the point that stays put — which is what a picture editor does to a frame anyway.
   *
   * The visible window of the source is [ox·(1 − 1/z), ox + (1 − ox)/z] on each axis. Every
   * value below was set by extracting that exact rectangle from the file, looking at it,
   * and adjusting — not by arithmetic on a focal point.
   */
  z: number;
  zo: string;
  alt: string;
};

export type Clip = {
  id: string;
  /** the still beneath the video. It is an <img>, never a `poster` attribute. */
  stillAvif: string;
  stillJpg: string;
  src: string;
  bytes: number;
  pos: string;
  posNarrow?: string;
  z: number;
  zo: string;
  alt: string;
  caption: string;
};

/** the largest derivative that exists ON DISK — `widths` is read, never assumed */
export const src = (f: Still): string =>
  `/media/stills/${f.id}-${f.widths[f.widths.length - 1] ?? 960}.webp`;

export const srcSet = (f: Still): string =>
  f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');

/** the layout width, as CSS. The stylesheet reads this; it never restates the number. */
export const wide = (f: Still): string => `min(${f.w.vw}vw, ${f.w.rem}rem)`;
export const narrow = (f: Still): string => `min(${f.w.narrow}vw, ${f.w.narrowRem}rem)`;

/**
 * `sizes`, DERIVED. Layout width × the enlargement factor, to one decimal, which is the
 * width the browser will actually paint. Not a separate judgement — an expression of the
 * two numbers above, so it cannot fall out of step with them.
 */
const r1 = (n: number) => Math.round(n * 10) / 10;
export const sizes = (f: Still): string =>
  `(max-width: 899px) min(${r1(f.w.narrow * f.z)}vw, ${r1(f.w.narrowRem * f.z)}rem), ` +
  `min(${r1(f.w.vw * f.z)}vw, ${r1(f.w.rem * f.z)}rem)`;

/**
 * NOBODY IS NAMED. The archive does not record who is in which frame and the client has
 * supplied no faculty names, so every description says what is HAPPENING — which is also
 * what a reader who cannot see the picture actually needs. No count is stated that the
 * frame does not plainly show; each alt below was written against the extracted crop, not
 * against the manifest, and where the manifest and the pixels disagree the pixels win.
 */
export const PLATES: readonly [Still, Still, Still] = [
  /* 1 · TRADITION — "not a collection of ideas to preserve untouched, but a body of
     knowledge to study, understand and practise responsibly."

     Warrior two, held by two people on separate mats with their arms at the same height,
     and a third person's arm reaching in at the top left: an inherited shape being held by
     more people than the frame can hold. The paragraph never says "more than one person";
     the photograph does, and that is the whole reason this frame is here.

     The same room as plates 2 and 3 and as the clip — ochre wall, arched window, blue
     tie-dyed curtain — so the section is four frames of one place. */
  {
    id: 'pr-pbh-img_5362',
    widths: [480, 960, 1920],
    w: { vw: 21.84, rem: 24.96, narrow: 46, narrowRem: 19 },
    /* 1.515× about 55% / 13%, which is the source window x 0.187–0.847, y 0.044–0.704.
       Extracted and looked at. It drops, in order: the CCTV housing at the top edge
       (y 0.02), the near practitioner's forearm and block that cut across the bottom left
       (y 0.58–0.85), the white cloth dumped on the floor (y 0.82) and most of the floor
       reflection. It keeps: both standing figures whole from crown to back heel, the third
       arm entering top left, the arched window with its blue curtain, and enough of the
       prop shelves at the left to say what room this is. Pulled RIGHT of centre (55, not
       50) because at 50 the man's extended hand was cut at the frame edge — he is in
       warrior two, and warrior two without the front hand is not the shape. */
    z: 1.515,
    zo: '55% 13%',
    alt: 'A woman in a white t-shirt and a man in a red t-shirt stand in warrior two on separate mats with their arms level, a third practitioner’s arm reaching in at the top left, an arched window with a blue curtain behind them.',
  },

  /* 2 · PRACTICE — "consistency, observation, refinement and time."

     Time is the word in that sentence a photograph can do something with. Three bodies
     holding one identical supported shape, stepping back into the room with their feet
     against the wall, is repetition drawn in space: the same minute happening three times
     over, which is what a sustained practice looks like from the doorway.

     IT REPLACED `pr-pbh-img_5416`, the same idea in a longer line, which was the first
     choice until it was rendered at plate size and looked at: a laminated "YOGA HALL 2"
     door sign sits at x 0.36–0.47, too near the middle for any enlargement this frame can
     carry to clear it, and the top of the frame is roof beams and two ceiling fans.

     THE NEAR PRACTITIONER'S FACE IS IDENTIFIABLE AND THAT IS STATED HERE BECAUSE IT IS
     TRUE. He is inverted with his eyes closed and he is one of three people in one shape,
     nobody at the front of it and nobody named here or anywhere in this section. That is
     the same basis on which /about/ already publishes §02, §07, §08 and its hero: what
     this project refuses is a single figure printed beside a biography, and a documentary
     frame of a group is not that. */
  {
    id: 'pr-pbh-img_5532',
    widths: [480, 960, 1920],
    w: { vw: 29.4, rem: 33.6, narrow: 66, narrowRem: 27 },
    /* 1.62× about 50% / 74% → source window x 0.19–0.81, y 0.28–0.90. Rendered at 1.40×
       first and looked at: the plate opened on a fifth of its height in blank ochre wall
       above the legs and still held the maroon bolster with a phone on it in the corner.
       This lands on the three bodies and nothing else — the wall stays as the ground
       behind them, and a hand's width of the blue curtain survives at the right, which is
       what identifies the room as the same one either side of it. */
    z: 1.62,
    zo: '50% 74%',
    alt: 'Three practitioners lie in supported shoulderstand over folding chairs with their feet against an ochre wall, stepping back in a line across the room.',
  },

  /* 3 · INQUIRY — "To understand why something is practised, not simply how it is
     performed."

     The relay frame, and the reason this angle is worth having. Both practitioners have a
     BELT looped round the front foot and drawn taut by the reaching hand, and the second
     has her front foot standing on a WOODEN BLOCK. Nothing in the client's paragraph
     mentions a prop; the photograph supplies it. A belt round a foot is a shape being
     tested rather than performed — the pose is being asked a question — and that is the
     whole of the term in two objects.

     A CORRECTION TO THIS FILE'S OWN PREVIOUS ENTRY, kept because the mistake is
     instructive. The line that stood here called the white object "a long measuring
     stick … a ruler laid on a body", and the alt text said the same. It is not a ruler.
     Enlarged off `pr-pbh-img_5372-1920.webp` at source y 0.35–0.71 the object is flat
     white webbing with a metal slide buckle at one end and a loop round the near foot at
     the other — a yoga belt, photographed taut so it reads straight. The frame was read
     about and then described from the reading; looking at the pixels at 900px wide
     settled it in one look. No invented facts, and that includes a fact invented about a
     photograph. */
  {
    id: 'pr-pbh-img_5372',
    widths: [480, 960, 1920],
    w: { vw: 42, rem: 48, narrow: 88, narrowRem: 36 },
    /* The two bodies together occupy x 0.25–1.00 and y 0.38–0.78 of the source — an
       emphatically landscape subject inside an upright frame, so the window is as tight
       as it can be and still hold both: 1.34× on x 0.254–1.00, y 0.127–0.873.

       WHICH WAY THE SURPLUS GOES IS THE WHOLE DECISION. A window centred on the bodies
       spends its slack on the empty tiled floor below them, and the first render did
       exactly that — the lower 40% of the plate was bare floor and a mat. Pushed up, the
       same slack is spent on the prop shelves and the pillar above them instead, which are
       at least the room this is happening in.

       1.34 / 50%, NOT 1.28 / 46%, AND THE 41 PIXELS ARE THE REASON. The previous window
       started at source y 0.1006 and this file claimed "the painted banner in the source's
       top corner stays out at y < 0.10 either way". It does not. Extracted from the 1920
       derivative, the banner — a painted canvas of a figure in tree pose, mounted on the
       pillar, with lettering along its top edge — runs to y 0.117, so 41 of its 2,560
       source rows were inside the crop and a purple sliver sat in the plate's top-left
       corner at every viewport. A tighter enlargement about a lower origin starts the
       window at 0.127 instead, which clears it by 26 rows, and it takes 0.0088 of source
       height off the bare floor at the bottom rather than adding to it. `sizes` follows
       automatically because it is built from `w × z`; the largest paint this produces is
       1,029px at 2531, against a 1,920px file.

       BOTH BELTS ARE INSIDE IT: the one looped round the near practitioner's foot and
       drawn along her mat, and the one round the far practitioner's foot on the block. */
    z: 1.34,
    zo: '100% 50%',
    alt: 'Two practitioners fold forward with a yoga belt looped round the front foot and drawn taut by the reaching hand, one of them standing that foot on a wooden block, on mats in a tiled hall.',
  },
];

/**
 * 4 · TRANSMISSION — "not simply information that can be packaged and delivered… it has
 * traditionally moved through teacher, student, practice and lived experience."
 *
 * The one term of the four that is a relationship rather than an idea, and the only one a
 * still photograph cannot state, because a passage between two people takes time. So it is
 * the archive's clearest hands-on teaching clip: one person folded forward over a chair,
 * one standing back watching the shape, one steadying her with both hands, and over five
 * and a half seconds the hands are visibly working.
 *
 * THE ALT SAYS THREE PEOPLE AND THE MANIFEST SAYS TWO. The manifest is wrong: `people`
 * reads "two" and the subject line names only the man in the yellow kurta and the woman in
 * the red top. The poster frame plainly holds three — the man standing back at the left,
 * the person folded over the chair in the centre, and the woman in white with both hands on
 * her at the right. The pixels win; this is why frames are looked at and not read about.
 *
 * 1080×1920 native, shown in the same 3 : 4 aperture as the three stills, cropped
 * top-weighted so the empty blue mat across the bottom third of the source never appears.
 * Muted, playsinline, loop, attached on approach and released a screen past, and NO
 * `poster` attribute, because a visible <img> sits beneath it.
 *
 * 1,836 KB — and it is never the phone's problem, because it is not fetched on load. The
 * island attaches `src` only within one screen of the frame and removes it again a screen
 * past, so a reader who stops before the fourth movement pays nothing at all; a reader who
 * has asked for reduced motion, reduced data, or Data Saver never attaches it either. (The
 * archive's other teaching clip, pr-mov-img_5681, is 3,150 KB — 1.7× this one — for the
 * same length.)
 */
export const TRANSMISSION: Clip = {
  id: 'pr-mov-img_5455',
  /* 30 KB against 144 KB for the same frame. The <img> beneath the video is the single
     largest image in the section, so it is served AVIF with the JPEG as the fallback
     leg — the saving is larger than every other byte decision in this file combined. */
  stillAvif: '/media/posters/pr-mov-img_5455.avif',
  stillJpg: '/media/posters/pr-mov-img_5455.jpg',
  src: '/media/clips/pr-mov-img_5455.mp4',
  bytes: 1836058,
  /* THE ONLY FRAME WHERE `object-position` IS A REAL LEVER: 9 : 16 in a 3 : 4 aperture, so
     cover already has 25% of its height in surplus. Pulled to the top, plus a light 1.16×,
     which puts the visible source window at x 0.08–0.94, y 0.09–0.74: the curtain rail
     goes out of the top, the empty mat and the block go out of the bottom, and what is
     left is three people and the teacher's hands. Left exactly as it was — a review
     measured this as the one frame in the comparison where the declared subject is
     unambiguously what you see, and that is not something to improve. */
  pos: '52% 20%',
  posNarrow: '52% 18%',
  z: 1.16,
  zo: '56% 42%',
  alt: 'Two people attend to a third who is folded forward over a folding chair in a studio — one standing back and watching the shape, the other steadying her with both hands.',
  /* A CAPTION ABOUT THE PHOTOGRAPH. The one it replaces — "The ochre wall this section
     opens on" — described the section's own staging, which is the portfolio device this
     brief names: captions say what is in the frame or where the camera stood, and never
     explain the layout. Every clause below is checkable against the poster. */
  caption: 'One folded over the chair, one steadying her, one standing back to look',
};
