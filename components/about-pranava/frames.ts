/**
 * Every photograph on /about/, chosen by looking at the rendered crops rather than by
 * reading public/media/stills.json.
 *
 * TWO THINGS THE MANIFEST GETS WRONG, both found by measuring the files:
 *  · its `w`/`h` are the pre-rotation camera values, so `p13-img_0615` is listed as
 *    4032x3024 (landscape) while the encoded derivative is 960x1280 (portrait). Ratios here
 *    are the ones the browser will actually see.
 *  · `ss-dsc07127` and `p13-img_0610` are encoded and committed but absent from the
 *    manifest, so they carry no alt text there. Both are used here and both are described
 *    below in full.
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
  /* 01 · hero. The only frame in the archive with Praṇava's own emblem physically in the
     room — the roundel on the wall behind the group. That is why it is the hero of
     Praṇava's About page and not one of the wider, higher-resolution halls: the picture
     says whose room this is. 1920 is its largest derivative, which is why the band it fills
     is 46svh tall rather than a full screen. */
  heroRoom: stills(
    'ss-dsc07127',
    [960, 1920],
    '50% 54%',
    'A teacher sits cross-legged on a mat with palms joined, leading a group seated in a semicircle around him; the Praṇava roundel, a colour wheel and a wall of charts hang on the wall behind.',
    '46% 58%',
  ),

  /* 02 · what is Praṇava. Ten people doing one thing: the frame answers "a place to
     practise" without a caption. It opens from a crop you cannot place. */
  practiceLine: stills(
    'p13-img_0513',
    [960, 1920, 2560],
    '50% 62%',
    'A line of about ten students holding downward-facing dog on mats laid in rows across a studio floor.',
    '54% 66%',
  ),

  /* 03 · our approach. Transmission, which is the section's fourth term, is the one thing
     in the four that is a relationship rather than an idea — so it is the only one given a
     photograph, and the photograph is a hand held above a back. */
  hand: stills(
    'ss-dsc07118',
    [960, 1920],
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
    [960, 1920, 2560],
    '50% 58%',
    'A group sits on mats facing the front of a studio, one participant back on her heels in the foreground.',
  ),
  doorPractice: stills(
    'pr-pbh-img_5560',
    [960, 1920, 2560],
    '50% 40%',
    'A line of practitioners folding forward from standing with both hands resting on the backs of folding chairs, receding down a hall.',
  ),
  doorHeal: stills(
    'p13-img_0610',
    [960, 1920],
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
    [960],
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

  /* 07 · Yoga Mandala, the one initiative this site can actually open. */
  mandalaHall: stills(
    'ss-ven0139',
    [960],
    '50% 54%',
    'Students seated in forward bends across a wide open hall, with white chairs along the wall behind them.',
  ),

  /* 08 · the two routes out. Learning is a room listening; practice is a room working. */
  routeLearn: stills(
    'p13-img_0617',
    [960, 1920, 2560],
    '50% 58%',
    'A wide view of a studio: participants seated on coloured mats facing the front, a rope wall along the left and red ceiling slings overhead.',
    '46% 60%',
  ),
  routePractice: stills(
    'p13-img_0516',
    [960, 1920, 2560],
    '46% 52%',
    'Students standing on their mats in a row across the studio with arms stretched overhead and palms together.',
    '40% 55%',
  ),
} as const;
