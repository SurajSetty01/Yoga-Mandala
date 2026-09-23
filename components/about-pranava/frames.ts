/**
 * Every photograph on /about/, chosen by looking at the rendered crops rather than by
 * reading public/media/stills.json.
 *
 * TWO THINGS THE MANIFEST GETS WRONG, both found by measuring the files:
 *  · its `w`/`h` are the pre-rotation camera values, so `p13-img_0615` is listed as
 *    4032x3024 (landscape) while the encoded derivative is 960x1280 (portrait). Ratios here
 *    are the ones the browser will actually see.
 *  · `p13-img_0610` is encoded and committed but absent from the manifest, so it carries no
 *    alt text there. It is used here and is described below in full. (`ss-dsc07127` is the
 *    other such file; the hero used to run on it and no longer does.)
 *
 * DERIVATIVE WIDTHS ARE NOT UNIFORM and that decided several placements:
 *    2560  p13-img_0513 0516 0614 0615 0617 0620 0621
 *    1920  the above, plus p13-img_0610 and every ss-dsc07xxx
 *     960  every ss-ven0xxx still  ← never full-bleed above 960 CSS px
 * Clip posters (1920 on the long edge) are used here as ordinary stills; no <video> is
 * attached anywhere on this page, so none of them is a poster attribute and none of them is
 * fetched twice.
 *
 * NOBODY IS NAMED IN AN ALT TEXT. The archive does not record who is in which frame, the
 * client has supplied no faculty names, and "Praṇav teaching" is a claim this agent cannot
 * verify from the file. Every description says what is happening, which is also what a
 * reader who cannot see the picture actually needs.
 */

export type Frame = {
  /** file stem under /media/stills or /media/posters */
  id: string;
  /** which directory the file lives in; posters are the clip stills */
  from: 'stills' | 'posters';
  /** widths that actually exist on disk, largest last */
  widths: number[];
  /** object-position for the landscape/desktop crop */
  pos: string;
  /** object-position for a portrait viewport, set deliberately — see DESIGN-SYSTEM §1 */
  posNarrow?: string;
  alt: string;
};

const stills = (id: string, widths: number[], pos: string, alt: string, posNarrow?: string): Frame => ({
  id,
  from: 'stills',
  widths,
  pos,
  alt,
  ...(posNarrow ? { posNarrow } : {}),
});

const poster = (id: string, pos: string, alt: string, posNarrow?: string): Frame => ({
  id,
  from: 'posters',
  widths: [1920],
  pos,
  alt,
  ...(posNarrow ? { posNarrow } : {}),
});

/** `/media/stills/<id>-<w>.webp` or `/media/posters/<id>.jpg` */
export function src(f: Frame, want?: number): string {
  if (f.from === 'posters') return `/media/posters/${f.id}.jpg`;
  const w = want ? (f.widths.find((x) => x >= want) ?? f.widths[f.widths.length - 1]) : f.widths[f.widths.length - 1];
  return `/media/stills/${f.id}-${w}.webp`;
}

/** A srcset across every width that exists, so a phone never pulls a 2560. */
export function srcSet(f: Frame): string | undefined {
  if (f.from === 'posters') return undefined;
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}

export const FRAMES = {
  /* 01 · HERO. TWO FRAMES, ONE ROOM, ONE AFTERNOON.

     Both hero frames come from the SAME hall on the same day — the red oxide floor, the
     white walls, the corrugated roof with its rope anchors, the green outside. That is not
     a nicety. The build before this one put two PBH studio frames (orange tungsten, mean
     L 135) in front of a TTC hall (green daylight, mean L 37–46), which made the nearest
     plane by far the brightest and inverted the depth: they read as two bright rectangles
     laid on a dark photograph, never as one room. One venue fixes that at the source.

     Chosen by rendering every TTC candidate at the aperture ratio and object-position it
     would actually be shown at, then looking. What that ruled out:
       · `pr-ttc-dsc_0188_1` / `_0185_1` — the prepared row and the empty hall. Both are
         better GROUNDS than anything else in the set, and both were rejected because the
         largest thing in this hero would then be folding chairs and bolsters. That is the
         mistake this page is being rebuilt to undo, in a nicer register.
       · `pr-ttc-dsc_0569` — its left half is plain wall. Measured on the render, the band
         the words stand on came out at stdev 4; the home page's equivalent region is 69.
         A flat ground is not a room, however good the photograph is elsewhere in it.
       · `pr-ttc-dsc_0191` / `_0278_1` — everybody identifiable, mostly backs to camera.
       · the PBH studio entirely, for the venue reason above.

     A 3:2 SOURCE IN A BAND WIDER THAN 3:2 HAS NO HORIZONTAL LEVER. `object-fit: cover`
     crops the axis that is in surplus, and at every desktop width this band is wider than
     1.5, so the whole width of the frame is always on screen and only `pos`'s Y does
     anything. The horizontal composition of the hero IS the horizontal composition of the
     source, and the frames below were picked on that basis rather than tuned afterwards.
     Below 900px the band turns portrait and the lever reappears, which is what `posNarrow`
     is for. */

  /* far · the hall. Five practitioners standing in one shape with their arms raised,
     stepping back down the room. Upright, which is what a hero with a display sentence in
     it needs — a floor full of horizontal bodies fights a headline, a row of vertical ones
     supports it.

     ONE FACE IN THIS FRAME IS IDENTIFIABLE AND THAT IS STATED HERE BECAUSE IT IS TRUE.
     The nearest practitioner renders about 90px head-to-chin at 1440 and is recognisable.
     An earlier draft of this file claimed her face was turned away; it is not, and a frame
     defended by a claim the pixels contradict is a frame nobody has looked at. She is kept
     because this is a photograph of a CLASS — five people in one shape, nobody at the front
     of it, nobody named here or anywhere on this page. What §06 refuses is a single figure
     printed beside a biography, which would be read as a portrait however neutral its alt
     text; a documentary frame of a group is not that, and §02, §07 and §08 of this page
     already publish identifiable faces on the same basis.

     1620 is the largest derivative of every TTC frame, so above 1620 CSS px this is
     upscaled — 1.56× at 2531. The alternative was `pr-pbh-img_5433` at 2560, from the other
     venue, and one room is worth more than sharpness in a ground that is veiled anyway. */
  heroHall: stills(
    'pr-ttc-dsc_0046_1',
    [480, 960, 1620],
    '50% 54%',
    'Five practitioners stand in one raised-arm pose on mats spread down an open-sided hall, rope anchors hanging from the roof beams and green trees beyond the open side.',
    '62% 56%',
  ),

  /* near · the window. A teacher takes the weight of a student suspended in the rope
     while two others steady her: four people, one act, hands visibly working. It is the
     only frame in the TTC hall that is literally the third word of the sentence the hero
     carries, and the only one whose subject is a TALL COLUMN of bodies from the roof beam
     to the floor — which is what a tall aperture wants.

     IT REPLACED `pr-ttc-dsc_0500`, the rope inversion, for three measured reasons. The
     subject was wrong: the most dramatic frame in the set and the least like "study,
     practice and transmission" — an inverted face in shadow, a bare midriff, folding
     chairs. The chair could not be cropped out at any aperture ratio, because it is beside
     her in the source. And it is LANDSCAPE: in a portrait aperture `object-fit: cover`
     scales a 3:2 source by HEIGHT, so a 374px-wide window needed a 1362px-wide source and
     `sizes="26vw"` was fetching 480w — a 2.84× upscale that made the frontmost, unveiled,
     drop-shadowed plane the blurriest thing on the page (Laplacian sigma 4.39 against the
     hall's 20.36). This frame is PORTRAIT, so cover scales it by height against a source
     that is already tall: the same window needs 626px and 960 exists.

     A PURPOSE-MADE CROP, not the manifest frame. DSC_0479 carries two folding chairs in its
     bottom-left corner and green shade netting down its right, which forced `pos` to 70% to
     dodge the chairs — and that pushed the aperture off the group, leaving a pale strip of
     wall on the left and cutting the standing figure on the right. Fighting a frame with
     object-position is the wrong tool: the crop now excludes both problems at source
     (x 30-81.5% of the upright original), so the aperture can sit at CENTRE and show the
     whole supporting group. 556px native — the short edge of a 1080-wide source is all
     there is — so it upscales about 1.3x at 1440, which is mild and sharp enough. */
  heroHands: stills(
    'pr-ttc-dsc_0479x',
    [480, 556],
    '50% 46%',
    'A teacher takes the weight of a student suspended head-up in a rope hanging from the roof beam while two other practitioners steady her, in a hall with a red floor and green shade netting along the open side.',
    '50% 48%',
  ),

  /* 02 · what is Praṇava. Ten people doing one thing: the frame answers "a place to
     practise" without a caption. It opens from a crop you cannot place. */
  practiceLine: stills(
    'p13-img_0513',
    [480, 960, 1920, 2560],
    '50% 62%',
    'A line of about ten students holding downward-facing dog on mats laid in rows across a studio floor.',
    '54% 66%',
  ),

  /* 03 · our approach. Transmission, which is the section's fourth term, is the one thing
     in the four that is a relationship rather than an idea — so it is the only one given a
     photograph, and the photograph is a hand held above a back. */
  hand: stills(
    'ss-dsc07118',
    [480, 960, 1920],
    '52% 46%',
    "A teacher leans over a student in a plank position and holds a hand just above the student's back, without touching it.",
    '55% 42%',
  ),

  /* 04 · the four doors. One photograph per quadrant, each the plainest available picture
     of what that door actually is.

     A QUADRANT ONLY EVER SHOWS A QUARTER, so each frame is chosen for what falls in ITS
     quarter, not for the whole picture: Learn is the top-left, Practice the top-right,
     Heal the bottom-right and Insights the bottom-left. `object-position` can only slide
     a frame along its LONG axis inside a square crop, so a landscape source has no
     vertical lever at all and the frame has to be right by composition. */
  doorLearn: stills(
    'p13-img_0620',
    [480, 960, 1920, 2560],
    '50% 58%',
    'A group sits on mats facing the front of a studio, one participant back on her heels in the foreground.',
  ),
  doorPractice: stills(
    'pr-pbh-img_5560',
    [480, 960, 1920, 2560],
    '50% 40%',
    'A line of practitioners folding forward from standing with both hands resting on the backs of folding chairs, receding down a hall.',
  ),
  doorHeal: stills(
    'p13-img_0610',
    [480, 960, 1920],
    '54% 44%',
    'A teacher supports a student who is upside down over two folding chairs against a rope wall, steadying her legs with one hand.',
  ),
  /* CHANGED once the Praṇava library landed. It replaces a museum desk holding a clock and
     a gramophone, which was standing in for "study" because nothing better existed in the
     old archive — the audit records that there are no books or texts anywhere in 1,211
     frames, so people with notebooks on their laps is as close to study as this archive
     gets. The bottom-left quarter, which is the one this door shows, is the woman with her
     chin on her hand: reflection, which is the door's own word. */
  doorInsights: stills(
    'pr-ttc-dsc_0364',
    [480, 960],
    '50% 52%',
    'A paved path running away between tall slender trees and planted beds, with a single figure at the far end under a green canopy.',
  ),

  /* 05 · founder. CHANGED after the media audit landed: not one teacher with a group, but a
     circle of four in conversation with NOBODY at the front of it.

     The audit is explicit that no frame in 1,211 anywhere in the archive identifies a
     person, so no photograph on this page may be read as a portrait of the founder. A
     single teacher seated before listeners, printed beside his biography, would be read as
     exactly that however neutral its alt text. A discussion circle cannot be, and it is
     also the literal picture of the sentence the section is built around: the role of a
     teacher is not to create dependence. It carries a visible caption saying what it
     shows. */
  founderCircle: stills(
    'pr-ttc-dsc_0049',
    [960, 1620],
    '50% 52%',
    'Four people sit in a loose circle on folding chairs, talking, with notes and phones in their hands and green shade netting behind them.',
    '54% 52%',
  ),

  /* 06 · faculty. Four different people teaching, in four different rooms, at four
     different distances. Nobody is named because the client has supplied no names; these
     are pictures of the ACT, which is the part of "shared teaching" that is documented. */
  facPair: poster(
    'p27-img_0889',
    '50% 40%',
    "Two teachers work on one standing student at the same time — one setting the student's shoulder blade, the other the lower ribs — while two people watch from the floor.",
    '52% 36%',
  ),
  facRoom: poster(
    'p13-img_0569',
    '52% 48%',
    'A teacher guides one student through a standing twist in the middle of the hall while the rest of the class stands on their own mats watching.',
    '55% 45%',
  ),
  facSeated: poster(
    'ss-ven0052',
    '50% 44%',
    'A teacher crouches beside a seated participant to set the angle of his back while others watch from chairs at the edge of the room.',
    '50% 40%',
  ),
  facWatch: poster(
    'ss-ven0131',
    '42% 46%',
    'A teacher stands still in the middle of a class lying face down on their mats, watching the row of backs in front of him.',
    '38% 44%',
  ),

  /* 01 · INTRODUCTION. TWO FRAMES, ONE HALL, AND THE NARROW ONE IS A NATIVE PORTRAIT.

     The aperture this section cuts is the shape of the passage, so it changes shape with
     the viewport: at 1440 the page is 907 wide and the four sentences 644 tall, an aspect
     of 1.17 that a 3:2 frame nearly fills; at 320 the same block is 291 by 771, an aspect
     of 0.30. Feeding a 1.50 landscape source into THAT keeps 20% of its width and throws
     the other 80% away, which is how an earlier draft turned a photograph into noise on a
     phone. A 2:3 portrait source into the same aperture keeps 45%, and — because the
     subject in it is vertical — the part that survives is the part that carries it.
     Measured: 45% at 320 and 61% at 390, against 20% and 27% before.

     Both are the same hall on the same day as the hero, and both are supported inversions
     — one on chairs, one on the wall ropes — which is why a single honest `alt` covers
     whichever one the browser fetches. An <img> has one alt and `<source>` cannot carry
     its own; the alternative is two <img>s with one hidden, which downloads both.

     WHY NOT A STANDING CLASS. `pr-ttc-dsc_0566` was the first choice and was rendered
     behind these actual slits before it was dropped: it is five practitioners standing
     with their arms raised in the open-sided hall, which is the hero's frame again one
     screen later. Two near-identical compositions across a seam read as a repeat however
     good each is. The inversions are the same room in a different act.

     DERIVATIVES ARE NOT SYMMETRICAL AND WERE CHECKED ON DISK: the wide frame has
     480/960/1620, the tall one only 480/960. Nothing here assumes 2560. */
  introHall: stills(
    'pr-ttc-dsc_0208_1',
    [480, 960, 1620],
    '46% 50%',
    'Practitioners working in supported inversions on chairs and wall ropes in the training hall, under its roof beams and hanging ropes.',
    '50% 46%',
  ),
  introRopes: stills(
    'pr-ttc-dsc_0493',
    [480, 960],
    '50% 46%',
    'Practitioners working in supported inversions on chairs and wall ropes in the training hall, under its roof beams and hanging ropes.',
    '50% 46%',
  ),

  /* 07 · Yoga Mandala, the one initiative this site can actually open. */
  mandalaHall: stills(
    'ss-ven0139',
    [480, 960],
    '50% 54%',
    'Students seated in forward bends across a wide open hall, with white chairs along the wall behind them.',
  ),

  /* 08 · the two routes out. Learning is a room listening; practice is a room working. */
  routeLearn: stills(
    'p13-img_0617',
    [480, 960, 1920, 2560],
    '50% 58%',
    'A wide view of a studio: participants seated on coloured mats facing the front, a rope wall along the left and red ceiling slings overhead.',
    '46% 60%',
  ),
  routePractice: stills(
    'p13-img_0516',
    [480, 960, 1920, 2560],
    '46% 52%',
    'Students standing on their mats in a row across the studio with arms stretched overhead and palms together.',
    '40% 55%',
  ),
} as const;
