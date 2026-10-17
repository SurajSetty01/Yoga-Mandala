/**
 * §03 OUR APPROACH, concept A: the seven pictures, and why each one is in its spread.
 *
 * All seven were chosen by reading the vision audit for the frame (Context/new/_audit/vision/)
 * and then looking at the frame itself. Clip frames were also pulled at 1s/4s/7s/10s,
 * because a poster only shows one moment and a loop shows all of them.
 *
 * A THREAD RUNS THROUGH THE SECTION, AND THE ARCHIVE PUT IT THERE. The supported inversion
 * is this archive's commonest subject: the audit counts roughly 50 chair-supported
 * inversions among the 154 Prabhava survivors. So the section does not try to escape it. It
 * uses it the way a typology does, one act seen four ways. Tradition has a whole row
 * of people in the pose. Practice has one person holding it alone. Inquiry has it
 * being explained while people watch. Transmission has a teacher's hands taking its weight.
 *
 * WIDTHS ARE READ FROM public/media/pranava-stills.json, not assumed. The TTC portrait of the
 * banyan stops at 960, so it is never given a slot wider than ~480 CSS px. Posters are the
 * clips' own 1080x1920 first frames. Each one appears as an ordinary <img> beneath its
 * <video>, and never as a `poster` attribute.
 *
 * NOBODY IS NAMED. The audit identifies no one in 1,211 frames. Every alt says what is
 * happening, and "teacher" is used only where the frame shows someone doing the teaching.
 *
 * USED ELSEWHERE ON THE SITE: `pr-ttc-dsc_0285_1` is also the smallest box on /learn/.
 * The archive has exactly one frame of people simply listening, and Inquiry is where
 * it belongs. components/practice/frames.ts already records it as reserved for /about/.
 * Every other frame here appears on no live page.
 */

export type Plate = {
  /** file stem under /media/stills, or the clip id for /media/posters + /media/clips */
  id: string;
  kind: "still" | "clip";
  /** widths that exist on disk, largest last. Clips have one poster size. */
  widths: number[];
  /** intrinsic aspect of the SOURCE (w / h). `sizes` has to cover a cropped slot. */
  ratio: number;
  /** object-position at 720px and up */
  pos: string;
  /** object-position below 720px, where most slots are cropped harder */
  posN: string;
  alt: string;
  /** where the still's derivatives live, when not the shared /media/stills */
  dir?: string;
};

const still = (
  id: string,
  widths: number[],
  ratio: number,
  pos: string,
  posN: string,
  alt: string,
): Plate => ({ id, kind: "still", widths, ratio, pos, posN, alt });

const clip = (id: string, pos: string, posN: string, alt: string): Plate => ({
  id,
  kind: "clip",
  widths: [1080],
  ratio: 1080 / 1920,
  pos,
  posN,
  alt,
});

/** a plate whose files live outside the shared folders (see `dir`) */
const own = (p: Plate, extra: Partial<Plate>): Plate => ({ ...p, ...extra });

export const PLATES = {
  /* TRADITION · verso. Bharatanatyam, at the client's request: the dancer (from the
     Samskṛti & Sādhana evening) in a low araimandi with both arms raised and the
     fingers held in a mudra. A form handed down whole, body to body, which is what the
     paragraph means by tradition. Portrait 2:3, so it is the tall plate. Of the five
     dance frames this is the one with the whole figure and a complete gesture. */
  tradVerso: still(
    "ss-dsc07165",
    [480, 960, 1920],
    1920 / 2880,
    "50% 40%",
    "50% 40%",
    "A Bharatanatyam dancer in a red and orange costume holding a low stance, both arms raised and her fingers shaped in a mudra",
  ),

  /* TRADITION · recto. The client, sitting at the foot of the banyan with his hands
     resting in his lap, eyes open and looking off to the left (into the gutter). It
     replaces the eyes-closed meditation frame. TTC original DSC_0355, graded under
     public/media/about-v2/: warmer white balance, a set black point and gentle
     S-curve, and the light let in from the open sky at the upper left, where it falls
     through the gaps in the canopy and across him. The source is 1620 wide, so no
     larger derivative exists. */
  tradRecto: own(
    still(
      "approach-seated",
      [480, 960, 1620],
      1620 / 1080,
      "50% 50%",
      "50% 50%",
      "Praṇav Śāstrī sitting cross-legged at the foot of a banyan tree, hands resting in his lap, morning light falling through the leaves across him",
    ),
    { dir: "/media/about-v2" },
  ),

  /* PRACTICE · verso. Three practitioners in supported shoulderstand against the yellow
     wall, daylight from the open window. It is the still half of the pair: the shape held,
     and seen once. (Integration: swapped in for pr-pbh-img_5538, which How We Teach, the
     next section, also shows.) */
  pracVerso: still(
    "pr-pbh-img_5532",
    [480, 960, 1920],
    3024 / 4032,
    "45% 58%",
    "45% 60%",
    "Three practitioners in supported shoulderstand over chairs against a yellow wall, daylight coming in from an open window",
  ),

  /* PRACTICE · recto. Held shapes again, in another part of the hall, and this time the
     time passes: three people lying back over folding chairs in supported backbends, the
     chairs hiding every face. The audit rates it loop 5. (Integration: swapped in for
     pr-mov-img_5523, which How We Teach also plays.) */
  pracRecto: clip(
    "pr-mov-img_5687",
    "50% 68%",
    "50% 66%",
    "Three people lying back over folding chairs in a row, holding supported backbends",
  ),

  /* INQUIRY · verso. The one frame in 1,211 of people simply listening: one woman with
     her chin on her hand, notebooks in laps, in the open pavilion. It sits on the verso so
     their attention runs INTO the gutter, towards the recto. */
  inqVerso: still(
    "pr-ttc-dsc_0285_1",
    [480, 960, 1620],
    1620 / 1080,
    "12% 50%",
    "14% 50%",
    "Three women seated in an open pavilion listening, one resting her chin on her hand, the others holding notebooks",
  ),

  /* INQUIRY · recto. A pose being EXPLAINED rather than performed: a teacher stands beside
     a student in a headstand and talks with his hands, while people sit on the floor and
     watch. One of those watchers also has her hand at her chin. That is a rhyme across the
     gutter with the verso, and it was found on the clip's own frames rather than planned. */
  inqRecto: clip(
    "pr-mov-img_5681",
    "50% 42%",
    "44% 42%",
    "A teacher standing beside a student in a headstand against a wall, explaining with his hands, while seated students watch",
  ),

  /* TRANSMISSION. The client's pick: Praṇav teaching vṛścikāsana (scorpion) at the wall,
     his face to the camera. Prabhava IMG_5740, the shot taken right after IMG_5739 (the
     earlier Transmission clip, where his back was turned). A student balances on her
     forearms with her legs arched over and her feet on the wall while he stands beside
     her watching, then steps in. Trimmed 4.8s to 10.4s, tone-mapped from HLG, cropped
     to 3:4 and encoded under public/media/about-v2/ (810x1080, muted). */
  trans: own(
    clip(
      "approach-transmission",
      "50% 30%",
      "50% 30%",
      "Praṇav Śāstrī beside a student balancing on her forearms against a wall, her legs arched over and her feet on the wall, as he watches the pose",
    ),
    { widths: [810], ratio: 810 / 1080, dir: "/media/about-v2" },
  ),
} as const;

export type PlateKey = keyof typeof PLATES;

export function stillSrc(p: Plate, w?: number): string {
  const width = w ?? p.widths[Math.min(1, p.widths.length - 1)];
  return `${p.dir ?? "/media/stills"}/${p.id}-${width}.webp`;
}

export function stillSet(p: Plate): string {
  return p.widths
    .map((w) => `${p.dir ?? "/media/stills"}/${p.id}-${w}.webp ${w}w`)
    .join(", ");
}

/* The shared clips keep their poster beside them in /media/posters (jpg + avif); the
   about-v2 Transmission clip keeps its own poster next to it (jpg + webp). */
export const posterJpg = (p: Plate) =>
  p.dir ? `${p.dir}/${p.id}.jpg` : `/media/posters/${p.id}.jpg`;
export const posterModern = (p: Plate) =>
  p.dir
    ? { type: "image/webp", src: `${p.dir}/${p.id}.webp` }
    : { type: "image/avif", src: `/media/posters/${p.id}.avif` };
export const clipSrc = (p: Plate) =>
  p.dir ? `${p.dir}/${p.id}.mp4` : `/media/clips/${p.id}.mp4`;
