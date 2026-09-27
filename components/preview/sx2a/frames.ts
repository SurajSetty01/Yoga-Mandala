/**
 * The five pictures of concept A, "The mat's width", in the order the argument widens.
 *
 * EVERY CHOICE BELOW WAS MADE BY RENDERING THE CROP IT WILL ACTUALLY BE SHOWN AT, then
 * looking — not by reading pranava-stills.json. Two facts about the files decided most of it:
 *
 *   · Every TTC still stops at 1620px. The only plate that goes full-bleed (V) is therefore
 *     upscaled above 1620 CSS px — 1.56x at 2531. That was accepted because the frame is
 *     the strongest single photograph in the venue and the only one whose subject is
 *     practice with no mat in it at all; a 2560 frame from the PBH studio would have broken
 *     the one place every other plate is in.
 *   · The mat strip (I) is a CLIP, not a still: `pr-mov-img_5659`, portrait 1080x1920. A
 *     strip 1:2.8 cut from a 9:16 source keeps 63% of the width, ~680 source px for a strip
 *     that is never wider than 200 CSS px, so it is sharp at any density. It is the only
 *     moving thing in the section, and that is the point: the practice on the mat moves,
 *     and everything the argument widens into is still.
 *
 * A PLATE OPENS FROM ITS CENTRE. Each of II–V is first seen as a strip exactly as wide as
 * plate I (the mat), then opens to its own width. So each frame's CENTRE had to hold a
 * subject on its own — the strip a reader sees before the picture opens is not allowed to
 * be a pillar or a patch of lawn. `pos` puts that subject on the plate's axis at the
 * desktop ratio; `posNarrow` re-solves it for the phone ratio, which crops a landscape
 * frame hard enough to lose the subject (DESIGN-SYSTEM §1 — this site shipped that once).
 *
 * USAGE ON THE SITE, grepped before committing (components/, live routes only):
 *   pr-mov-img_5659    unused anywhere
 *   pr-ttc-dsc_0285_1  /learn/ only
 *   pr-ttc-dsc_0347    unused on any live route
 *   pr-ttc-dsc_0284_1  /contact/, /learn/, /practice/ — reused knowingly: it is the
 *                      clearest frame of people studying in the archive, and every
 *                      unused alternative carried a wall portrait or a TV screen
 *   pr-ttc-dsc_0396    unused on any live route
 * None of the five is on /about/, and none is `p13-img_0513` — §02's downward-dog line,
 * which is why the mat strip is a standing fold with a strap and not a downward dog.
 *
 * NOBODY IS NAMED. The archive does not record who is in which frame. Every alt says what
 * is happening, which is what a reader who cannot see the picture needs.
 */

export type Still = {
  id: string;
  widths: number[];
  /** object-position at the desktop plate ratio */
  pos: string;
  /** object-position at the phone plate ratio, set by looking, not by default */
  posNarrow: string;
  alt: string;
};

export type Clip = {
  id: string;
  /** the <img> beneath the video IS the poster — no `poster` attribute anywhere */
  still: string;
  stillAvif: string;
  src: string;
  pos: string;
  alt: string;
};

export const MAT: Clip = {
  id: 'pr-mov-img_5659',
  still: '/media/posters/pr-mov-img_5659.jpg',
  stillAvif: '/media/posters/pr-mov-img_5659.avif',
  src: '/media/clips/pr-mov-img_5659.mp4',
  /* The clip is a fold that rises to standing with a dowel overhead; the standing half of
     the loop sits at x≈0.45 of the frame. 58% puts her on the strip's axis once she is up,
     keeps the dark mat and the strap in it throughout, and leaves the blown window and the
     neighbour crouching at the left edge outside it. */
  pos: '58% 50%',
  alt: 'A woman in a pink top folds forward over a dark mat, a strap looped around her feet and a wooden block beside her.',
};

export const PLATES: Still[] = [
  /* II · knowledge. The clearest "people studying" frame in the archive: a student in white
     listening, notebook on her lap, in the open pavilion. Her strip is the frame's centre;
     opening it adds the two women either side of her and the trees beyond the columns. */
  {
    id: 'pr-ttc-dsc_0285_1',
    widths: [480, 960, 1620],
    pos: '36% 50%',
    posNarrow: '38% 50%',
    alt: 'Three women sit on chairs in an open pavilion, one listening with her chin on her hand, another holding a notebook and pen, trees beyond the columns.',
  },
  /* III · tradition, and contemporary practice. Four practitioners beneath the banyan: the
     tree is the oldest thing on the site, and they are dressed for a class this year. Its
     strip is the seated figure with her palms joined; opening it adds the two side-bends
     that frame her, then the aerial roots. */
  {
    id: 'pr-ttc-dsc_0347',
    widths: [480, 960, 1620],
    pos: '50% 55%',
    posNarrow: '50% 60%',
    alt: 'Four women practise beneath a banyan tree, two bending sideways with their arms overhead, one standing and one seated with her palms joined.',
  },
  /* IV · the work — learning, practice, teacher education, inquiry, community. The whole
     study circle in the pavilion. Same afternoon as plate II, seen from further back: the
     motif comes back wider, which is the sequencing move this concept took from photobook
     editing (a subject examined close, then recapitulated at a larger scale).

     IT REPLACED `pr-ttc-dsc_0280_1`, which rendered beautifully and was rejected on sight:
     a framed portrait of an identifiable elder hangs on the pavilion wall at its left, and
     at this plate's 2.24:1 ratio a 3:2 source has no horizontal lever to crop it out. An
     unnamed portrait printed at the head of an About page reads as a claim of lineage the
     client has not made. `_0278_1` has the same wall.

     A foreground head sits at the bottom centre of this frame. At every desktop ratio the
     plate is wider than 3:2, so `pos` Y is the lever: held at 0%, the head drops almost
     entirely below the crop. The phone plate is near-square and shows the full height, so
     there the head stays — as the seat the viewer occupies in the circle — but X is pushed
     to 100%, which moves it into the bottom-left corner and puts the woman speaking and the
     one writing beside her in the strip the plate opens from. At 30% the strip was the back
     of a head. */
  {
    id: 'pr-ttc-dsc_0284_1',
    widths: [480, 960, 1620],
    pos: '50% 0%',
    posNarrow: '100% 50%',
    alt: 'A study circle on chairs in an open pavilion, several people writing in notebooks while one woman speaks, trees beyond the columns.',
  },
  /* V · the belief. Practice with no mat under it: a woman seated on grass, eyes closed,
     four others behind her among the trees. The only full-bleed plate. Her head sits at
     ~33% of the frame's height and her crossed legs at ~97%, so `pos` Y is held high —
     at 50% the wide crop cut her at the eyebrows. */
  {
    id: 'pr-ttc-dsc_0396',
    widths: [480, 960, 1620],
    pos: '50% 20%',
    posNarrow: '44% 40%',
    alt: 'A woman sits cross-legged on grass with her eyes closed and her hands resting on her knees, four others seated behind her among the trees.',
  },
];

export function srcOf(s: Still, w?: number): string {
  const pick = w ? (s.widths.find((x) => x >= w) ?? s.widths[s.widths.length - 1]) : s.widths[s.widths.length - 1];
  return `/media/stills/${s.id}-${pick}.webp`;
}

export function srcSetOf(s: Still): string {
  return s.widths.map((w) => `/media/stills/${s.id}-${w}.webp ${w}w`).join(', ');
}
