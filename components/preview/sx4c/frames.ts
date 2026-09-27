/**
 * How we teach, concept sx4c: the photographs, and where each date and time came from.
 *
 * THE DISCOVERY THIS SECTION IS BUILT ON. The manifest (public/media/pranava-stills.json)
 * carries no dates. The source files do. Every `pr-pbh-*` still is an iPhone HEIC with an
 * EXIF DateTimeOriginal and an OffsetTimeOriginal of +05:30, and every `pr-mov-*` clip is a
 * QuickTime file with `com.apple.quicktime.creationdate`. Read from
 * Context/new/Prabhava Photos-.../*.HEIC with Pillow + pillow-heif (tag 36867) and from the
 * .MOV files with ffprobe, on 26 September 2026.
 *
 * All 28 Prabhava stills and 15 of the 16 clips fall between 2 October 2023 12:58 and
 * 6 October 2023 19:36. The certificate in the archive dates Prabhava, a Hatha-Iyengar
 * Immersion, to 2-6 October 2023. The camera clock and the certificate agree to the day, so
 * the times below are the archive's own record, not a reconstruction. (The one clip outside
 * the window, pr-mov-img_5964, is 7 October on another campus and is not used here.)
 *
 * The Prabodha TTC frames were checked the same way and were NOT used for dating: a sample
 * of that Nikon's EXIF puts a 2015-01-01 timestamp beside August and September 2023 ones in
 * the same folder, i.e. its clock was reset at least once. A date that is only probably
 * right is not printed.
 *
 * WHAT THE TIMES SHOW. One frame per day, all five inside the same 58 minutes of the
 * afternoon: 13:37, 13:10, 13:18, 13:20, 14:08. The margin is
 * five days of one course at roughly the same hour, which is "Practise consistently" as
 * the archive actually recorded it. Nothing on the page says so in words; the times say it.
 *
 * WHAT IS NOT CLAIMED. The eight practices are not mapped to the five days. The days run
 * down the margin at their own interval and the practices down the measure at theirs, and
 * the two rhythms deliberately do not coincide (five against eight), because the client
 * never said which practice happened on which day, and a layout that paired them would.
 * Nobody in any frame is named. `alt` is verbatim from the manifest; `shows` is the
 * caption's own plain reading of the same frame and says only what is in it.
 *
 * ALL SIX ARE UNUSED ANYWHERE ELSE ON THE SITE, live or in any other preview route
 * (grepped across components/, app/ and styles/ on 26 Sep 2026).
 *
 *   Rejected, and why:
 *   · pr-pbh-img_5362 (12:58, day one) — the earliest frame and a lovely warrior two, but a
 *     stranger's raised arm cuts the top-left corner and a bare foot the bottom-left, and no
 *     crop at a margin-figure ratio loses both.
 *   · pr-pbh-img_5407, _5532 — strong, but 14:40 and 14:23; the set is chosen on the hour.
 *   · pr-mov-img_5913 — "a man sitting down and becoming still", 6 Oct 19:36, the perfect
 *     last frame of a course, but a roll-up banner with legible body text and a QR code
 *     stands directly behind him for all 12 seconds. The audit says crop it or drop it, and
 *     at a 4:5 plate there is no crop that removes it.
 *   · pr-mov-img_5704 — the archive's only unused landscape clip; a person walks through
 *     the foreground blurred at ~4s and ~8s and a hand enters the right edge.
 *   · Every unused Prabodha TTC landscape (0146_1, 0311, 0354, 0404) — posed outdoor frames
 *     with the subjects smiling at the lens; nothing in them is being taught.
 */

export type Day = {
  id: string;
  /** widths that exist on disk, largest last (checked: public/media/stills/<id>-<w>.webp) */
  widths: number[];
  /** verbatim from public/media/pranava-stills.json */
  alt: string;
  /** EXIF DateTimeOriginal, local (+05:30) */
  date: string;
  time: string;
  /** the caption's own reading of what is in the frame */
  shows: string;
  /** object-position inside the 2:3 margin crop. The box is narrower than the 3:4
      source, so the WIDTH is in surplus and only x does any work. */
  pos: string;
};

export const COURSE = {
  name: 'Prabhava',
  kind: 'Hatha-Iyengar Immersion',
  span: '2 – 6 October 2023',
} as const;

export const DAYS: Day[] = [
  {
    id: 'pr-pbh-img_5372',
    widths: [480, 960, 1920],
    alt: 'A woman folding forward with her foot on a wooden block and a stick laid along the mat',
    date: '2 October 2023',
    time: '13:37',
    shows: 'Folding forward over a stick laid down the mat.',
    // a second practitioner is cut by the right edge; x 0 drops the right 11%
    pos: '0% 50%',
  },
  {
    id: 'pr-pbh-img_5499',
    widths: [480, 960, 1920],
    alt: 'A man holding a deep side lunge with a hand on his hip on a dark mat',
    date: '3 October 2023',
    time: '13:10',
    shows: 'A deep side lunge, one hand on the hip.',
    // a bare arm and shoulder intrude at the right edge (audit); x 0 removes them
    pos: '0% 50%',
  },
  {
    id: 'pr-pbh-img_5618',
    widths: [480, 960, 1920],
    alt: 'Three people folding forward over folding chairs in a receding line',
    date: '4 October 2023',
    time: '13:18',
    shows: 'Three, one behind another, over chairs.',
    pos: '22% 50%',
  },
  {
    id: 'pr-pbh-img_5732',
    widths: [480, 960, 1920, 2560],
    alt: 'A woman with one hand on her hip and one on a chair while three practitioners work behind her',
    date: '5 October 2023',
    time: '13:20',
    shows: 'Four in one pose, stepping back into the room.',
    pos: '70% 50%',
  },
  {
    id: 'pr-pbh-img_5787',
    widths: [480, 960, 1920, 2560],
    alt: 'Two people lying back over folding chairs with knees bent and feet on the frames',
    date: '6 October 2023',
    time: '14:08',
    shows: 'Lying back over chairs, feet on the frames.',
    pos: '50% 50%',
  },
];

/**
 * THE PLATE — the section's one moving picture, and the only photograph given a page.
 *
 * pr-mov-img_5450, 2 October 2023, 17:55. A student holds a wide-legged forward bend over a
 * dowel; a man in a yellow kurta comes in from the right and sits down on a bolster in front
 * of her. It is set beside the client's closing sentence, which is about "the understanding,
 * discernment and responsibility required to guide another person's practice" — and this is
 * the one frame in the archive where the whole event is someone arriving to attend to one
 * other person's practice.
 *
 * It is dated like the margin, and its date is the FIRST day. That is left true rather than
 * tidied: the plate stands outside the five-day column, as the thing the column was for.
 *
 * The clip's last ~2.5s are the man's back filling the frame (audit: "the last two seconds
 * are best trimmed"). public/media is not ours to re-encode, so the island loops it at
 * `trim` instead. The poster jpg/avif are 1080 x 1920 and are the visible <img> beneath the
 * video; the <video> carries NO poster attribute (DESIGN-SYSTEM §1, 948 KB).
 */
export const PLATE = {
  id: 'pr-mov-img_5450',
  src: '/media/clips/pr-mov-img_5450.mp4',
  jpg: '/media/posters/pr-mov-img_5450.jpg',
  avif: '/media/posters/pr-mov-img_5450.avif',
  alt: 'A person in a wide-legged forward bend over a mat while a man sits down on a bolster in the foreground',
  date: '2 October 2023',
  time: '17:55',
  shows: 'A wide forward bend, and a man sitting down in front of her.',
  /** seconds; the loop is cut here, before the kurta fills the frame */
  trim: 9.4,
  /** 1080 x 1920 in a 4:5 box: the HEIGHT is in surplus, so only y does any work */
  pos: '50% 52%',
} as const;

export const still = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const stillSet = (d: Day) => d.widths.map((w) => `${still(d.id, w)} ${w}w`).join(', ');
