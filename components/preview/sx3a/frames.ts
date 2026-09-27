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
  kind: 'still' | 'clip';
  /** widths that exist on disk, largest last. Clips have one poster size. */
  widths: number[];
  /** intrinsic aspect of the SOURCE (w / h). `sizes` has to cover a cropped slot. */
  ratio: number;
  /** object-position at 720px and up */
  pos: string;
  /** object-position below 720px, where most slots are cropped harder */
  posN: string;
  alt: string;
};

const still = (
  id: string,
  widths: number[],
  ratio: number,
  pos: string,
  posN: string,
  alt: string,
): Plate => ({ id, kind: 'still', widths, ratio, pos, posN, alt });

const clip = (id: string, pos: string, posN: string, alt: string): Plate => ({
  id,
  kind: 'clip',
  widths: [1080],
  ratio: 1080 / 1920,
  pos,
  posN,
  alt,
});

export const PLATES = {
  /* TRADITION · verso. The banyan, portrait, with the trunk and its hanging roots rising
     above one seated figure. The audit calls it the quietest peopled frame in the archive. A
     tree whose roots came down from its own branches is as literal a picture of "long and
     living" as this archive holds. 960 wide at most, so it is the tall plate, not the wide one. */
  tradVerso: still(
    'pr-ttc-dsc_0328',
    [480, 960],
    1080 / 1620,
    '50% 50%',
    '50% 58%',
    'A man sitting cross-legged on a stone slab at the foot of a banyan tree, its trunk and hanging roots rising far above him',
  ),

  /* TRADITION · recto. A row of practitioners with their legs raised over folding chairs,
     seen from the foot of the row. The chairs and legs stack into a rhythm, and no face is
     visible. It is Brodovitch's repeated pose: one form in many bodies, receding. It sits on
     the recto, so the row runs AWAY from the gutter. Below 720px it is cropped to the three
     nearest pairs of legs. */
  tradRecto: still(
    'pr-ttc-dsc_0274',
    [480, 960, 1620],
    1620 / 1080,
    '50% 55%',
    '22% 55%',
    'A row of practitioners lying with their legs raised over folding chairs, one after another down a hall with a dark red floor',
  ),

  /* PRACTICE · verso. One practitioner in a supported inversion, legs vertical and toes
     pointed, against the wall of practice ropes. It is the still half of the pair: the
     shape held, and seen once. */
  pracVerso: still(
    'pr-pbh-img_5538',
    [480, 960, 1920],
    1920 / 2560,
    '50% 40%',
    '50% 38%',
    'A woman in a supported inversion on a chair and bolster, legs vertical and toes pointed, beside a wall of practice ropes',
  ),

  /* PRACTICE · recto. The same shape again, held by someone else in another room, and
     this time it moves: a headstand between two chairs against a pale wall, held and then
     slowly folded down. The audit rates it loop 5, with one figure, a plain wall, and the
     face hidden throughout. Two people and two rooms give consistency. The loop gives time. */
  pracRecto: clip(
    'pr-mov-img_5523',
    '50% 10%',
    '50% 46%',
    'A person holding a headstand between two folding chairs against a pale wall, legs straight up',
  ),

  /* INQUIRY · verso. The one frame in 1,211 of people simply listening: one woman with
     her chin on her hand, notebooks in laps, in the open pavilion. It sits on the verso so
     their attention runs INTO the gutter, towards the recto. */
  inqVerso: still(
    'pr-ttc-dsc_0285_1',
    [480, 960, 1620],
    1620 / 1080,
    '12% 50%',
    '14% 50%',
    'Three women seated in an open pavilion listening, one resting her chin on her hand, the others holding notebooks',
  ),

  /* INQUIRY · recto. A pose being EXPLAINED rather than performed: a teacher stands beside
     a student in a headstand and talks with his hands, while people sit on the floor and
     watch. One of those watchers also has her hand at her chin. That is a rhyme across the
     gutter with the verso, and it was found on the clip's own frames rather than planned. */
  inqRecto: clip(
    'pr-mov-img_5681',
    '50% 42%',
    '44% 42%',
    'A teacher standing beside a student in a headstand against a wall, explaining with his hands, while seated students watch',
  ),

  /* TRANSMISSION. One frame, laid across the gutter. A teacher's hands take the weight of a
     student held upside down against the wall. The student is on the left of the frame and
     the teacher on the right, so the spine is placed where the two people meet: 43% across
     the frame (see --sx3a-cross). The student stands on the verso, the teacher stands on the
     recto, and the hands cross the gutter. The crop is anchored to the TOP, which keeps the
     raised feet and drops the water bottle and bag the audit flags in the lower foreground. */
  trans: clip(
    'pr-mov-img_5739',
    '50% 0%',
    '50% 0%',
    'A teacher steadying a student balanced upside down against a wall beside a folding chair, his hands taking the weight at the student’s hips',
  ),
} as const;

export type PlateKey = keyof typeof PLATES;

export function stillSrc(p: Plate, w?: number): string {
  const width = w ?? p.widths[Math.min(1, p.widths.length - 1)];
  return `/media/stills/${p.id}-${width}.webp`;
}

export function stillSet(p: Plate): string {
  return p.widths.map((w) => `/media/stills/${p.id}-${w}.webp ${w}w`).join(', ');
}

export const posterJpg = (p: Plate) => `/media/posters/${p.id}.jpg`;
export const posterAvif = (p: Plate) => `/media/posters/${p.id}.avif`;
export const clipSrc = (p: Plate) => `/media/clips/${p.id}.mp4`;
