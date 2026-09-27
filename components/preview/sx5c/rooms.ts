/**
 * The four rooms behind the four names, chosen by LOOKING at each frame at the crop it is shown
 * at: 2:3 on wide screens and 4:5 stacked. Moving subjects were checked at their extreme frame
 * as well as their first, because a poster can mislead: the dowel in 5659 goes overhead at
 * 7.5 s, and the teacher in 5582 is at the left edge by 9 s.
 *
 * WHY THESE FOUR AND NOT THE OBVIOUS FOUR. This section's first draft used 5642, 5906, 5532
 * and 5586. Re-grepped, all four were also in How We Teach concept D (the section directly
 * above this one) and in most of this section's other concepts. So the set was re-picked
 * from the archive rather than kept. None of the four below is used on any live page, and
 * none is in the sx4* concepts (the neighbour above) or the other sx5* concepts:
 *   pr-mov-img_5582  previews sx1b, sx7b only
 *   pr-mov-img_5659  previews sx1b, sx2a only
 *   pr-pbh-img_5416  previews sx1a, sx2c only
 *   pr-pbh-img_5585  used NOWHERE on the site, live or preview
 *
 * WHY TWO MOVE AND TWO DO NOT. The client's four lines fall into two tenses. Learn and
 * Practice say what happens now ("Study Yoga through…", "Develop a sustained practice…").
 * Heal and Insights say what is still being made ("An evolving area…", "A growing space…").
 * So the two doors onto rooms that are running open onto a loop, and the two onto rooms
 * still being built open onto a still. That lets the picture carry the tense the words already
 * carry.
 *
 * LOOKED AT AND REFUSED (each rendered at this aperture first):
 *   pr-mov-img_5466  the rope inversion: she comes down and walks out of frame, so the
 *                    loop's seam is a person vanishing.
 *   pr-mov-img_5523  holds almost perfectly still for twelve seconds; as a loop it reads as
 *                    a frozen video.
 *   pr-mov-img_5913  the right movement (sitting into stillness), but a roll-up banner with
 *                    a QR code stands directly behind him and cannot be cropped out.
 *   pr-ttc-dsc_0409 / 0311 / 0354 / 0404  unused outdoor frames, but in each one the
 *                    subjects are smiling at the lens, which makes a room into a snapshot.
 *   ss-ven0165       bookshelves (which Insights would like), under a truck cab carrying a
 *                    third-party brand name.
 *   ss-ven0027/0028  a writing desk under a painted portrait of an elderly man the archive
 *                    does not name. The portrait is the subject.
 *   pr-pbh-img_5783  fifteen of the client's own mark on a sticker sheet. Behind the
 *                    Insights door it would be branding standing in for a room.
 *   pr-ttc-dsc_0192 / 0193 / 0209 / 0215 / 0217  the whiteboard event. Forbidden.
 *
 * PROVENANCE. All four files come from the "Prabhava Photos" folder (the clips' `source`
 * fields were read, not assumed). A certificate in the archive names Prabhava as a five-day
 * Hatha-Iyengar immersion held 2–6 October 2023. The three class frames look like such an
 * immersion (chairs, blocks, belts, a dowel, a wall hung with ropes). The chimes are IMG_5585,
 * three frames after the demonstration IMG_5582 on the same camera roll, so the balcony is the
 * same place on the same days. NOBODY IS NAMED, in a caption or an alt text, because the
 * archive does not say who anyone is.
 *
 * DERIVATIVES WERE CHECKED ON DISK: both stills reach 1920 (480/960/1920). Both clips are
 * 1080×1920 at 30 fps, with 1080×1920 AVIF and JPEG stills of their first frame.
 */

export type Room = {
  /** the door's name as the client wrote it; the split below must join back to it */
  name: string;
  /**
   * index at which the word parts. Where the word has a hyphenation point, that is where it
   * breaks: Prac-tice, In-sights. Learn and Heal are one syllable and have none, so they
   * part at the vowel join, the word's optical middle.
   */
  split: number;
  /** which side of the page the door keeps to when it does not fill the measure */
  align: 'start' | 'end';
  kind: 'still' | 'clip';
  id: string;
  /** stills: widths on disk */
  widths?: number[];
  /** object-position: wide (2:3 aperture) and narrow (4:5 aperture), each set by eye */
  pos: string;
  posNarrow: string;
  alt: string;
};

export const CAPTION =
  'Plates 1–4 · Prabhava, a five-day Hatha-Iyengar immersion · 2–6 October 2023';

export const ROOMS: Room[] = [
  {
    /* A demonstration. One man holds a wide standing pose with an arm raised while two
       people stand close at his side and watch, and two more watch from the far wall. It is
       learning by watching someone else do it properly, which is what "teacher education"
       looks like when it isn't a lecture. The wide crop leans left because by 9 s he has
       turned and the watchers at the left are the point of the frame. */
    name: 'Learn',
    split: 2,
    align: 'start',
    kind: 'clip',
    id: 'pr-mov-img_5582',
    pos: '40% 50%',
    posNarrow: '34% 48%',
    alt: 'A man in a green top holds a wide standing pose on a mat with one arm raised, while two people stand close beside him watching and two more watch from the far wall of a pale room.',
  },
  {
    /* One woman, alone with her props: a strap under her feet, a dowel in her hands. She folds
       forward and rises with the dowel overhead. "Sustained" is a word about time and
       repetition, so this door opens onto something that repeats. The crop is lifted at 4:5
       so the dowel still clears the top edge when it is overhead. */
    name: 'Practice',
    split: 4,
    align: 'end',
    kind: 'clip',
    id: 'pr-mov-img_5659',
    pos: '60% 45%',
    posNarrow: '62% 34%',
    alt: 'A woman in a pink top stands on a mat with a strap looped under her feet and folds forward holding a wooden dowel, in front of a warm yellow wall and a window hung with blue curtains.',
  },
  {
    /* Supported shoulderstands down one hall: backs on padded chairs, shoulders on bolsters,
       feet on the wall. It is the clearest picture in the archive of Yoga done WITH support,
       and a photograph can honestly go no further than that for an area the client calls
       "evolving". The best-lit frame of its run, per the audit, and it is. */
    name: 'Heal',
    split: 2,
    align: 'end',
    kind: 'still',
    id: 'pr-pbh-img_5416',
    widths: [480, 960, 1920],
    pos: '50% 50%',
    posNarrow: '70% 60%',
    alt: 'A line of people in supported shoulderstand down a hall, their backs on folding chairs padded with blankets, shoulders on bolsters and feet against the wall, the nearest resting her hands beside a wooden block.',
  },
  {
    /* The one room with nobody in it. Brass chime tubes over a white parapet, the striker
       turned edge-on so that it is a single hanging line, a moment before it catches the wind.
       There are no books anywhere in the archive, so "writing, reflection, study" can't be
       photographed literally. A place to stop and listen can. Every other concept that reached
       for chimes used 5586, where the striker faces the lens; 5585 is used nowhere. */
    name: 'Insights',
    split: 2,
    align: 'start',
    kind: 'still',
    id: 'pr-pbh-img_5585',
    widths: [480, 960, 1920],
    pos: '35% 40%',
    posNarrow: '40% 50%',
    alt: 'Long brass wind-chime tubes hang beside a terracotta pillar over a white parapet holding two small potted plants, the round striker turned edge-on beneath them and dense green trees beyond.',
  },
];

export const stillSrc = (r: Room, w: number) => `/media/stills/${r.id}-${w}.webp`;
export const stillSet = (r: Room) =>
  (r.widths ?? []).map((w) => `${stillSrc(r, w)} ${w}w`).join(', ');
