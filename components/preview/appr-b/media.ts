/**
 * The five frames this concept uses, chosen against `public/media/pranava-stills.json`
 * and `pranava-clips.json`, and checked against `components/` first: 48 of the 84 stills
 * are already spoken for elsewhere on the site and none of these five is.
 *
 * WEIGHT DECIDED FOUR OF THE FIVE. The TTC sheet tops out at 1620 and its derivatives run
 * 19–50 KB at 480 and 61–190 KB at 960; the PBH sheet goes to 2560 and costs 0.8–1.4 MB
 * for one frame. A concept was eliminated on this project for shipping 5.97 MB at 1440 for
 * a single section, and the audience is largely on Indian mobile data, so every still here
 * is a TTC frame and every `sizes` below is the width the picture is actually rendered at,
 * not 100vw.
 *
 * The fifth is the clip poster. It is the ONLY frame that is also a `<video>`'s first
 * frame, and it is delivered as a real `<img>` inside a `<picture>` — never as a `poster`
 * attribute, because a poster is fetched even when `src` is never set, which cost this
 * site 948 KB on every device once already (DESIGN-SYSTEM §1).
 *
 * `pr-ttc-dsc_0209`, `_0193`, `_0215` and `_0217` are excluded by the brief (legible
 * whiteboard, dance send-off); `_0192` is excluded here for the same reason even though it
 * is not named — it is a whiteboard on an easel and nobody has read what is on it.
 *
 * NOBODY IS NAMED IN AN ALT TEXT. The archive does not record who is in which frame and
 * the client has supplied no faculty names, so every description says what is happening,
 * which is also what a reader who cannot see the picture needs.
 */

export type Plate = {
  /** file stem under /media/stills */
  id: string;
  /** derivative widths that exist on disk, largest last */
  widths: number[];
  /** object-position for a landscape/desktop crop */
  pos: string;
  /** object-position for a portrait viewport, set deliberately — DESIGN-SYSTEM §1 */
  posNarrow?: string;
  alt: string;
};

export const src = (p: Plate) => `/media/stills/${p.id}-${p.widths[p.widths.length - 1]}.webp`;
export const srcSet = (p: Plate) =>
  p.widths.map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ');

export const PLATES: Record<'lane' | 'row' | 'banyan' | 'restorative', Plate> = {
  /* 01 TRADITION — a way that has been walked. Quiet, architectural, nobody in it, and it
     opens into light at the far end, which is what a foundation does. */
  lane: {
    id: 'pr-ttc-dsc_0020_1',
    widths: [480, 960, 1620],
    pos: '54% 55%',
    posNarrow: '58% 55%',
    alt: 'A narrow earth lane between a white building and a wall of hanging vines, opening into light at the far end',
  },

  /* 02 PRACTICE — "It requires consistency, observation, refinement and time." Four people
     in one shape down one line is the only frame in the free set that shows consistency
     rather than describing it. Sharpest of the inversion run. */
  row: {
    id: 'pr-ttc-dsc_0195_1',
    widths: [480, 960, 1620],
    pos: '52% 58%',
    posNarrow: '52% 60%',
    alt: 'Four practitioners in supported shoulderstand over folding chairs, blocks beside their heads on a red floor',
  },

  /* 03 INQUIRY — four figures under a banyan, their shapes echoing each other. The oldest
     picture there is of people working something out together under a tree. */
  banyan: {
    id: 'pr-ttc-dsc_0347',
    widths: [480, 960, 1620],
    pos: '50% 58%',
    posNarrow: '50% 55%',
    alt: 'Four women practising beneath a banyan, two bending sideways with arms overhead, one standing with arms crossed above her head and one seated with palms joined',
  },

  /* §04's tipped-in plate. A row of four held in a supported pose with the hall's rope
     hanging at the left: a class at work, over a length of time, in one room. */
  restorative: {
    id: 'pr-ttc-dsc_0271_1',
    widths: [480, 960, 1620],
    pos: '50% 60%',
    posNarrow: '50% 62%',
    alt: 'Four practitioners in supported bridge over chairs along a red floor, a rope hanging from the roof beam at the left',
  },
};

/**
 * 04 TRANSMISSION. The one moving image in either section, and the only thing on the route
 * that needs the network beyond a photograph: 1.92 MB, attached on approach and released a
 * screen past, and never attached at all below 900px, under Save-Data, on 2G/3G, or under
 * prefers-reduced-motion. Those readers get `still` below, which is the same picture.
 *
 * A man's hands are visibly taking the weight of someone inverted against a wall — the
 * client's fourth paragraph says Yoga "has traditionally moved through teacher, student,
 * practice and lived experience", and a still of a hand resting on a back cannot say that.
 */
export const TRANSMISSION = {
  clip: '/media/clips/pr-mov-img_5739.mp4',
  still: '/media/posters/pr-mov-img_5739.jpg',
  stillAvif: '/media/posters/pr-mov-img_5739.avif',
  /* the manifest's qualityNotes flag a water bottle and a bag low in the foreground, so
     both crops sit above centre and neither is ever the subject of the frame */
  pos: '50% 38%',
  posNarrow: '50% 34%',
  alt: 'A man steadying a person holding an inverted position with their back to a wall, legs vertical above a mat',
} as const;

/* NO PROVENANCE CAPTION IS PRINTED ANYWHERE IN THIS CONCEPT. The site's caption system
   wants a place, and the archive records only a folder name for this material — not a
   venue, not a date, not an occasion. "Bengaluru" belongs in a provenance caption only
   where the provenance is known, and here it is not, so nothing is printed. */
