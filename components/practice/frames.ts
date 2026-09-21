/**
 * Every photograph and every clip on /practice/, chosen by looking at the rendered crops
 * and at a contact sheet of the whole archive rather than by reading a manifest.
 *
 * WHAT THIS PAGE IS ABOUT DECIDED THE PICTURE EDIT. The subject is duration and return, so
 * the frames that carry it are the ones in which ONE SHAPE IS REPEATED — a row of people
 * holding the same thing, receding down a hall — and the ones in which a room has been SET
 * OUT AGAIN with nobody in it. The archive has both, and no other page on this site uses
 * either.
 *
 * MEASURED, NOT ASSUMED:
 *  · Every `pr-pbh-*` derivative is PORTRAIT 3:4 (1920x2560, 2560x3413) whatever the
 *    manifest's pre-rotation w/h says; every `pr-ttc-*` landscape derivative is 3:2
 *    (1620x1080) and every `pr-ttc-*` portrait one is 2:3 (960x1440). Checked with sharp.
 *  · Derivative widths are NOT uniform. Only ten stills in the whole Praṇava library carry
 *    a 2560 and two of them are used here; `pr-ttc-*` caps at 1620, which is why no
 *    Prabodha frame on this page is ever full-bleed past a cap.
 *
 * NO FRAME ON THIS PAGE CARRIES AN EVENT NAME. The `pr-pbh-*` collection comes from a
 * folder called "Prabhava Photos", and "Prabhava" appears in NONE of the client's three
 * documents — not the Blueprint, not Pranava Website.docx, not Pranava About Page.docx.
 * components/contact/routes.ts reached the same conclusion and avoided the collection
 * entirely for that reason. This page uses it, because it is by a long way the strongest
 * material for sustained practice, and solves the provenance problem the other way: every
 * caption here says what the photograph SHOWS and never where it was taken.
 *
 * NOBODY IS NAMED. The audit records no identity for any frame in 1,211, the client has
 * supplied no names, and a caption that guesses one is an invention like any other.
 *
 * NOT USED HERE, DELIBERATELY: `pr-ttc-dsc_0185_1` and `pr-ttc-dsc_0392` were already
 * claimed by components/learn/frames.ts when this page was composed, and
 * `pr-ttc-dsc_0284_1`, `0285_1` and `0049` belong to /about/. Two pages holding the same
 * photograph is a weaker site than two pages holding different ones.
 */

export type Frame = {
  /** file stem under /media/stills */
  id: string;
  /** widths that actually exist on disk, largest last */
  widths: number[];
  /** intrinsic size of the largest derivative, measured — feeds width/height attributes */
  w: number;
  h: number;
  /** object-position for the wide crop */
  pos: string;
  /** object-position for a portrait viewport, set deliberately — DESIGN-SYSTEM §1 */
  posNarrow?: string;
  alt: string;
};

export type Clip = {
  /** file stem under /media/clips and /media/posters */
  id: string;
  w: number;
  h: number;
  pos: string;
  alt: string;
};

const still = (
  id: string,
  widths: number[],
  wh: readonly [number, number],
  pos: string,
  alt: string,
  posNarrow?: string,
): Frame => ({ id, widths, w: wh[0], h: wh[1], pos, alt, ...(posNarrow ? { posNarrow } : {}) });

/** 3:4 portrait, the shape of every Prabhava derivative. */
const P = [1920, 2560] as const;
/** 3:2 landscape, the shape of every Prabodha derivative. */
const L = [1620, 1080] as const;

/** `/media/stills/<id>-<w>.webp`, largest that exists unless a smaller one is asked for. */
export function src(f: Frame, want?: number): string {
  const w = want
    ? (f.widths.find((x) => x >= want) ?? f.widths[f.widths.length - 1])
    : f.widths[f.widths.length - 1];
  return `/media/stills/${f.id}-${w}.webp`;
}

/** A srcset across every width that exists, so a phone never pulls a 2560. */
export function srcSet(f: Frame): string {
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}

export const FRAMES = {
  /* ── HERO ─────────────────────────────────────────────────────────────────────────
     Three windows onto the same thing. Left and right are the page's argument in one
     picture each: a row of people holding one identical shape, receding until you stop
     counting. The middle window is the clip. All three are portrait, which is what the
     archive is — 36 of 83 stills and 15 of 16 clips. */
  rowFold: still(
    'pr-pbh-img_5615',
    [960, 1920, 2560],
    P,
    '42% 55%',
    'Four people in a line folding forward with their hands on the backs of folding chairs',
    '44% 56%',
  ),
  rowLong: still(
    'pr-pbh-img_5412',
    [960, 1920],
    P,
    '48% 55%',
    'A long row of people in supported shoulderstand seen low along a hall floor',
    '50% 56%',
  ),

  /* ── 02 · REGULAR PRACTICE ────────────────────────────────────────────────────────
     The three frames in the archive of a practice room PREPARED AND EMPTY. They are the
     only honest picture of regularity this project has: no schedule, no timetable, no
     dates — a room that has been set out, and will be set out again. */
  setClose: still(
    'pr-ttc-dsc_0190_1',
    [960, 1620],
    L,
    '50% 65%',
    'A close view along a row of mats with folded blankets, bolsters, blocks and folding chairs',
  ),
  setRow: still(
    'pr-ttc-dsc_0188_1',
    [960, 1620],
    L,
    '50% 62%',
    'A row of prepared practice places with mats, blankets, bolsters, blocks and chairs on a red floor',
  ),
  setEmpty: still(
    'pr-ttc-dsc_0192_1',
    [960, 1620],
    L,
    '50% 60%',
    'An empty row of folding chairs, mats, blankets, bolsters and wooden blocks on a red floor',
  ),

  /* ── 03 · PRAYATNA ────────────────────────────────────────────────────────────────
     One more row of one shape, this time held on the floor rather than over a chair. A
     2560 derivative exists, which is why it can stand as a tall aperture at 2531 without
     being upscaled. */
  rowHeld: still(
    'pr-pbh-img_5808',
    [960, 1920, 2560],
    P,
    '50% 62%',
    'Three women lying in a row with knees open, belts around their feet and bolsters under their heads',
    '52% 60%',
  ),

  /* ── 05 · RETREATS AND IMMERSIONS ─────────────────────────────────────────────────
     Four frames in the order a day away would happen: the path out, what stands at the end
     of it, the sitting, and the stillness. Every one is outdoors, which is the whole
     difference between this section and the four above it — the page leaves the room. The
     last two are also the archive's only outdoor meditation frames. */
  path: still(
    'pr-ttc-dsc_0294_1',
    [960, 1620],
    L,
    '50% 55%',
    'A broad earth path running between kerbed lawns and tall slender trees',
  ),
  pavilion: still(
    'pr-ttc-dsc_0017_1',
    [960, 1620],
    L,
    '50% 52%',
    'An open-sided pavilion with a red tiled roof at the end of a red paved approach, framed by flowering creeper',
  ),
  sitting: still(
    'pr-ttc-dsc_0384',
    [960, 1620],
    L,
    '50% 62%',
    'Five women sitting cross-legged on grass among tall trees with their hands on their knees',
  ),
  banyan: still(
    'pr-ttc-dsc_0356',
    [960, 1620],
    L,
    '50% 60%',
    'A man sitting cross-legged on a stone slab beneath a banyan, a low brick wall and fields behind',
  ),
} as const;

/**
 * THE THREE MOVING FRAMES ON THIS PAGE, AND THERE ARE ONLY TWO FILES.
 *
 * `held` runs in the hero and again in the last section, and that is the page's argument
 * spent on itself: the second showing is the same URL and therefore the same HTTP cache
 * entry, so THE RETURN COSTS NOTHING. A page about coming back to one practice pays for it
 * once.
 *
 * `air` is the only take in the archive with no people in it and continuous gentle
 * movement, and at 1,401 KB it is also the smallest. It is the breath section.
 *
 * Every <video> built from these carries NO `poster` attribute. The <picture> beneath is
 * the poster and is never removed; a poster attribute is fetched even when `src` is never
 * set, which cost this site 948 KB on every device once already.
 */
export const CLIPS = {
  held: {
    id: 'pr-mov-img_5687',
    w: 1080,
    h: 1920,
    pos: '50% 58%',
    /* The manifest says "three people"; the frame plainly holds five, three of them over
       chairs in the near row and two further back. Counted, not copied. */
    alt: 'A row of people lying back over folding chairs in supported backbends',
  } satisfies Clip,
  /*
   * THE CROP ON `air` IS A CORRECTION, NOT A COMPOSITION CHOICE, and the next person to
   * touch this file needs to know why. The vision audit describes this take as "close
   * green leaves moving gently in daylight" and says nothing else about it. Opened at
   * full size it also contains A WASP NEST with wasps on it, dead centre of the frame at
   * about 55-68% of its height — which is exactly what `object-position: 50% 50%` would
   * have put in the middle of a wide shallow aperture on a breath section.
   *
   * 16% crops to the clean upper leaves. Checked as ARITHMETIC and not by eye, because
   * the visible band changes with the aperture's aspect: a 9:16 source under
   * `object-fit: cover` in a box this wide shows 11% of the frame at 2531 and 36% of it
   * at 390, and at 16% the bottom of the visible band is 0.21 of the frame at 2531 and
   * 0.46 at 390 — clear of the nest at every width between 320 and 2560.
   */
  air: {
    id: 'pr-mov-img_5576',
    w: 1080,
    h: 1920,
    pos: '50% 16%',
    alt: 'Close green leaves moving gently in daylight, filling the frame with overlapping blades and stems',
  } satisfies Clip,
} as const;
