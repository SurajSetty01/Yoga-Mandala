/**
 * THE JOINER — eight standpoints in one workshop, cut into equal prints and laid to one
 * eye level.
 *
 * All eight frames come from the Prabhava folder: stills `pr-pbh-*` and phone films
 * `pr-mov-*` whose source paths sit in the same `Prabhava Photos` directory. The archive's
 * certificate dates Prabhava as a five-day Hatha-Iyengar immersion, 2–6 October 2023, and
 * nothing in these frames contradicts that — one hall, yellow walls, turquoise curtains,
 * wall ropes, folding chairs — so the caption may say so.
 *
 * WHY THESE EIGHT. The section's sentences are about many teachers working inside one
 * intention. The Prabhava footage is the one place in the archive where that is literally
 * visible: at least five different people are teaching in the same rooms on the same days —
 * a man in a checked shirt (5622), a man in a striped shirt (the film 5681), a man in a
 * pale shirt (5616), a man in a patterned shirt (5738 and the film 5739), and two people
 * guiding one student through a demonstration (the film 5582). Nobody is named: the client
 * has supplied no names and the archive does not record who anyone is. Every alt says what
 * the hands are doing, which is what a reader who cannot see the picture needs.
 *
 * WHAT WAS LOOKED AT AND LEFT. The film 5455 (strong, and like 5616 already live on
 * /learn/); 5405 (the observer is half out of the frame); 5433 (a group kneeling in namaste —
 * practice, not teaching — behind a cropped kurta); the TTC sari frames 0077/0191 (very
 * likely the same send-off day as the four forbidden whiteboard frames); every `ss-` and
 * `p13-` frame (other venues — a joiner is ONE room).
 *
 * ── THE GEOMETRY ───────────────────────────────────────────────────────────────────────
 * A PHOTO is a standpoint. It carries two numbers read off its pixels with a 5% grid:
 *   hy — its eye-level line, as a fraction of its height. Found where the receding lines of
 *        floor tiles, chair rows and wall junctions converge, cross-checked against a
 *        standing adult (camera ~1.3 m, person ~1.75 m) and the 2.1 m doorways. Every frame
 *        here lands between 0.34 and 0.44: all of them were shot by someone standing in the
 *        room, which is exactly why they can share one line.
 *   vx — where along that line the photo's own vanishing point falls.
 * and two placement choices: S, how wide the whole photo would be in stage units (how close
 * that standpoint stands), and px, where on the shared line its vanishing point is pinned.
 *
 * A PIECE is one print: a uniform 3:4 window, laid in a loose grid, showing whatever its
 * photo sees at that place in the room. Its crop is therefore DERIVED, never chosen: put a
 * piece in a cell and the geometry says which part of the photograph appears in it. Every
 * piece of one photo turns about that photo's vanishing point, together — one standpoint,
 * one angle — and the pieces of different photos meet only at eye level.
 *
 * The stage is 100 units wide; every length below is in those units.
 */

export const STAGE_W = 100;
export const STAGE_H = 52.4;
export const LINE_Y = 23.1; // the shared eye level
export const PW = 13.2; // every print is the same size, as prints from one camera are
export const PH = PW * (4 / 3);

export type Photo = {
  id: string;
  kind: 'still' | 'film';
  /** height / width of the frame as delivered */
  aspect: number;
  widths?: number[];
  alt: string;
  hy: number;
  vx: number;
  S: number;
  px: number;
  /** the standpoint's own angle at the start of the pass, and its hand-laid rest (deg) */
  a0: number;
  af: number;
  /** when in the pass (0–1) this standpoint starts to level */
  s: number;
};

export type Piece = {
  photo: string;
  /** cell */
  c: number;
  r: number;
  /** jitter off the grid, units — prints laid by hand, not snapped */
  dx?: number;
  dy?: number;
  z?: number;
  /** the one piece of each photo that carries its alt; the rest repeat the same picture */
  lead?: boolean;
  /** this piece plays the film (films only) */
  moving?: boolean;
};

const P34 = 4 / 3;
const P916 = 16 / 9;

export const PHOTOS: Photo[] = [
  {
    id: 'pr-pbh-img_5622',
    kind: 'still',
    aspect: P34,
    widths: [480, 960, 1920, 2560],
    alt: 'A man in a checked shirt reaches out to adjust the back of a woman folding forward with her hands on a folding chair, others working in a line behind her.',
    hy: 0.35,
    vx: 0.78,
    S: 33,
    px: 24.7,
    a0: -10,
    af: -0.5,
    s: 0.04,
  },
  {
    id: 'pr-mov-img_5681',
    kind: 'film',
    aspect: P916,
    alt: 'A man in a striped shirt talks a practitioner through a headstand against a white wall while a woman sits on the floor watching.',
    hy: 0.4,
    vx: 0.5,
    S: 27,
    px: 28.8,
    a0: 9,
    af: 0.6,
    s: 0.1,
  },
  {
    /* Integration: stands in for pr-pbh-img_5407, which the Founder section directly
       above shows at full size. hy/vx read off a 5% grid: the standing teacher's 1.3 m
       height and the chair row converging to the far right. S raised to keep all four
       prints inside the frame. */
    id: 'pr-pbh-img_5616',
    kind: 'still',
    aspect: P34,
    widths: [480, 960, 1920],
    alt: 'A line of people folding forward with their hands on folding chairs while a man in a pale shirt at the far end adjusts the hands of one of them.',
    hy: 0.35,
    vx: 0.9,
    S: 54,
    px: 59.6,
    a0: 6,
    af: 0.3,
    s: 0.16,
  },
  {
    id: 'pr-mov-img_5739',
    kind: 'film',
    aspect: P916,
    alt: 'A man in a patterned shirt holds the legs of a practitioner who is upside down against the wall over a folding chair.',
    hy: 0.34,
    vx: 0.5,
    S: 28,
    px: 42.75,
    a0: 12,
    af: -0.7,
    s: 0.2,
  },
  {
    id: 'pr-pbh-img_5738',
    kind: 'still',
    aspect: P34,
    widths: [480, 960, 1920],
    alt: 'Two practitioners upside down against a yellow wall beside an arched window, one in a handstand, while a man in a patterned shirt steadies the other one’s legs.',
    hy: 0.39,
    vx: 0.42,
    S: 44,
    px: 71.4,
    a0: -9,
    af: 0.5,
    s: 0.26,
  },
  {
    id: 'pr-mov-img_5582',
    kind: 'film',
    aspect: P916,
    alt: 'A man in a green top holds a wide standing pose with one arm raised while two people guide his arms and another stands watching.',
    hy: 0.34,
    vx: 0.6,
    S: 22,
    px: 81.25,
    a0: 10,
    af: -0.4,
    s: 0.32,
  },
  {
    id: 'pr-pbh-img_5746',
    kind: 'still',
    aspect: P34,
    widths: [480, 960, 1920, 2560],
    alt: 'A practitioner in a supported headstand over a folding chair beneath a window with blue curtains and trees outside.',
    hy: 0.37,
    vx: 0.3,
    S: 44,
    px: 87.15,
    a0: 8,
    af: -0.3,
    s: 0.38,
  },
];

export const PIECES: Piece[] = [
  /* left: the checked shirt, the striped shirt */
  { photo: 'pr-pbh-img_5622', c: 0, r: 1, dy: -1.2, lead: true, z: 3 },
  { photo: 'pr-pbh-img_5622', c: 1, r: 1, dy: -0.4, z: 2 },
  { photo: 'pr-pbh-img_5622', c: 0, r: 2, dy: -0.6, z: 2 },
  { photo: 'pr-pbh-img_5622', c: 1, r: 2, dy: 0.2, z: 3 },
  { photo: 'pr-mov-img_5681', c: 2, r: 1, dy: 0.3, lead: true, moving: true, z: 5 },
  { photo: 'pr-mov-img_5681', c: 2, r: 2, dy: 0.3, z: 2 },
  /* centre: the wall of feet, the patterned shirt */
  { photo: 'pr-pbh-img_5616', c: 3, r: 0, dy: 0.5, z: 2 },
  { photo: 'pr-pbh-img_5616', c: 4, r: 0, dy: -0.3, z: 3 },
  { photo: 'pr-mov-img_5739', c: 3, r: 1, lead: true, moving: true, z: 5 },
  { photo: 'pr-mov-img_5739', c: 3, r: 2, dy: 0.4, z: 2 },
  { photo: 'pr-pbh-img_5616', c: 4, r: 1, dy: 0.5, lead: true, z: 3 },
  { photo: 'pr-pbh-img_5616', c: 4, r: 2, dy: -0.2, z: 3 },
  /* right: the window wall */
  { photo: 'pr-pbh-img_5738', c: 5, r: 0, dy: 0.6, z: 2 },
  { photo: 'pr-pbh-img_5738', c: 5, r: 1, dy: -0.3, lead: true, z: 4 },
  { photo: 'pr-pbh-img_5738', c: 6, r: 0, dy: 0.3, z: 3 },
  { photo: 'pr-mov-img_5582', c: 6, r: 1, dy: 0.4, lead: true, moving: true, z: 5 },
  { photo: 'pr-pbh-img_5746', c: 7, r: 0, dy: 1.4, lead: true, z: 2 },
  { photo: 'pr-pbh-img_5746', c: 7, r: 1, dy: -0.5, z: 3 },
];

const PITCH_X = 12.5;
const PITCH_Y = 16.9;

export const photoOf = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`sx7: no photo ${id}`);
  return p;
};

/**
 * Where a piece sits and what it shows. Everything returned is a fraction or a stage unit;
 * the component turns them into percentages.
 */
export function layout(pc: Piece) {
  const ph = photoOf(pc.photo);
  const left = pc.c * PITCH_X - (PW - PITCH_X) / 2 + (pc.dx ?? 0);
  const top = pc.r * PITCH_Y + (pc.dy ?? 0);
  const sw = ph.S; // the whole photo, in units
  const sh = ph.S * ph.aspect;
  // the photo's own top-left, placed so its eye level is the shared line and its
  // vanishing point is pinned at px
  const photoLeft = ph.px - ph.vx * sw;
  const photoTop = LINE_Y - ph.hy * sh;
  // the crop window, as fractions of the photo
  const x0 = (left - photoLeft) / sw;
  const y0 = (top - photoTop) / sh;
  const x1 = x0 + PW / sw;
  const y1 = y0 + PH / sh;
  return {
    left,
    top,
    // image box inside the piece, relative to the piece (fractions of the piece)
    imgW: sw / PW,
    imgH: sh / PH,
    imgL: (photoLeft - left) / PW,
    imgT: (photoTop - top) / PH,
    // the pivot — the photo's vanishing point on the line — relative to the piece
    ox: (ph.px - left) / PW,
    oy: (LINE_Y - top) / PH,
    crop: { x0, y0, x1, y1 },
    inside: x0 >= -0.001 && y0 >= -0.001 && x1 <= 1.001 && y1 <= 1.001,
  };
}

export const src = (p: Photo, w?: number) => {
  if (p.kind !== 'still') return `/media/posters/${p.id}.jpg`;
  const ws = p.widths ?? [960];
  const pick = w ? (ws.find((x) => x >= w) ?? ws[ws.length - 1]) : ws[ws.length - 1];
  return `/media/stills/${p.id}-${pick}.webp`;
};

export const srcSet = (p: Photo) =>
  p.kind === 'still' ? (p.widths ?? []).map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ') : undefined;
