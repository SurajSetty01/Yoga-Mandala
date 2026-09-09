/**
 * THE EVIDENCE — every frame on this page, with the event it was actually shot at.
 *
 * Provenance is not decoration here, it is the argument: the page claims these things have
 * already happened, so each frame has to be able to say when and where. Every `event` and
 * `date` below was read out of Context/Media/_audit/tagged.json, which carries the source
 * collection for each id, and the collections are dated in Context/Media/README.md:
 *
 *   p13-*  →  Pranava Workshop, 13 April 2025
 *   p27-*  →  Pranava Workshop, 27 April 2025
 *   ss-*   →  Samskrithi Sadhana, 29 June 2025   (a single day)
 *
 * No location is claimed. The client has supplied no address, and while "Bengaluru" is
 * legitimate in a provenance caption, the two Pranava workshop dates carry no written venue
 * in the audit, so this page states only what the audit states.
 *
 * `shows` is the audit's own description of the frame, trimmed to a label length. It is not
 * a claim about Yoga Mandala — it is a description of what is visible.
 *
 * NOTHING IS COUNTED. An earlier brief for this page quoted "1,311 photographs, 398 clips";
 * the audit's own inventory says 307 photographs and 396 clips, so the figure would have been
 * published wrong. No archive statistic appears on the page.
 */

export type Frame = {
  /** media id — resolves to /media/posters/<id>.{avif,jpg} and /media/clips/<id>.mp4 */
  id: string;
  /** true display ratio of the poster, so width/height are honest and nothing shifts */
  w: number;
  h: number;
  /** deliberately set for the narrow crops; portrait viewports crop hard */
  pos: string;
  /** the narrow masthead sliver crops harder still and sometimes wants a different point */
  posNarrow?: string;
  alt: string;
  /** the wall label: what is in the frame, then where it comes from */
  shows: string;
  event: string;
  /** true when a web-playable loop exists for this id */
  motion?: boolean;
};

/**
 * The four pillars, in the order one day runs: people arriving and talking, a session, hands
 * on a body, and the teaching passed to the whole room. Each is a moving frame, because the
 * claim being made is that the thing happens — a still can be staged, a loop is a room in
 * motion. Three are portrait loops, which is what the archive mostly holds; the fourth is the
 * only landscape loop left after the approved hero spent the strong three, and SHARE is the
 * pillar that opens the page out, so the wide frame lands where it is wanted.
 */
export const PILLAR_FRAMES: Record<string, Frame> = {
  Connect: {
    id: 'p13-img_0593',
    w: 1080,
    h: 1920,
    pos: '46% 56%',
    posNarrow: '44% 58%',
    alt: 'A man kneels spreading a blanket over a mat while a woman crouches beside him and three people stand talking behind them in the studio.',
    shows: 'Teachers standing and talking as the room is laid out',
    event: 'Pranava Workshop · 13 April 2025',
    motion: true,
  },
  Learn: {
    id: 'ss-ven0183',
    w: 1080,
    h: 1920,
    pos: '48% 40%',
    posNarrow: '46% 36%',
    alt: 'Seen from behind a seated audience, a lit projection screen at the far end of a covered yard.',
    shows: 'An audience seated on the floor through a session',
    event: 'Samskrithi Sadhana · 29 June 2025',
    motion: true,
  },
  Collaborate: {
    id: 'p27-img_0889',
    w: 1080,
    h: 1920,
    pos: '50% 44%',
    posNarrow: '50% 42%',
    alt: 'Two people work together on a third, one with a hand at her shoulders and the other at her mid-back, while two more watch from the floor.',
    shows: 'Two teachers working on one student, two more watching',
    event: 'Pranava Workshop · 27 April 2025',
    motion: true,
  },
  Share: {
    id: 'p13-img_0569',
    w: 1920,
    h: 1080,
    pos: '52% 56%',
    posNarrow: '54% 52%',
    alt: 'A teacher works with one student in the middle of the hall while the rest of the class stands on their mats watching.',
    shows: 'One teacher, one student, and the room watching how it is done',
    event: 'Pranava Workshop · 13 April 2025',
    motion: true,
  },
};

/** The ground the second half of the page stands in: a room hung and waiting, with nobody
 *  in it. It is a photograph of the Samskrithi art gallery before the day filled it, and it
 *  is the honest picture of an initiative that is, in the client's word, "gradually
 *  developing". It carries no people and therefore makes no claim. */
export const ROOM: Frame = {
  id: 'ss-ven0007',
  w: 1920,
  h: 1080,
  pos: '54% 46%',
  alt: 'An empty exhibition hall with framed paintings hung along a dark wall, a hanging installation of wooden blocks overhead and a moulded face in a tree at the far end.',
  shows: 'The gallery hung and empty, before the day began',
  event: 'Samskrithi Sadhana · 29 June 2025',
};

/**
 * One piece of evidence per initiative, hung from the wire. These are stills, not loops: the
 * pillars are things that happen, the initiatives are things being put up, and a still is
 * what a thing being put up looks like.
 *
 * CONSENT, because it decided three of these four. Context/Media/README.md tiers every asset
 * and says the site ships Tier A + B only — nobody identifiable, or people only as a group.
 * Every frame on this page is Tier A or B EXCEPT ss-dsc07144, which is noted where it is used.
 * Frames rejected here on that basis, not on looks:
 *   ss-ven0092  the best "a room of people who came" frame in the archive — minorsVisible.
 *   p13-img_0610  the cleanest teaching frame — not in public/media/stills.json at all, so it
 *                 is not part of the shipped, curated set even though a derivative exists.
 *   ss-ven0024/25/27/28  the gallery frames, and the obvious picture of "curation" — every one
 *                 of them reproduces a third-party painting and the audit flags all four as
 *                 needing the artist's clearance before publication.
 */
export const INITIATIVE_FRAMES: Record<string, Frame> = {
  'Yoga Mandala Learning Initiative': {
    id: 'p13-img_0621',
    w: 960,
    h: 1280,
    pos: '50% 46%',
    alt: 'A room of people sitting on their mats facing the front of a studio, one participant in the foreground with a hand lowered to the mat, rope wall and red ceiling slings behind.',
    shows: 'A room sitting through a session',
    event: 'Pranava Workshop · 13 April 2025',
  },
  'Yoga Mandala Curation & Learning Bulletin': {
    id: 'ss-ven0056',
    w: 720,
    h: 1280,
    pos: '50% 52%',
    alt: 'A covered hall with red roof trusses and skylights above a line of practitioners bending over mats.',
    shows: 'The kind of thing the Bulletin lists: a hall, a class, a day',
    event: 'Samskrithi Sadhana · 29 June 2025',
  },
  Sangha: {
    id: 'p13-img_0513',
    w: 960,
    h: 540,
    pos: '50% 56%',
    alt: 'A line of about ten students holding downward-facing dog on mats laid in rows across a wide studio floor, one person standing at the back of the room.',
    shows: 'A room of people who came in person',
    event: 'Pranava Workshop · 13 April 2025',
  },
  /* The one Tier C frame on the page, and it is here on purpose: it is the only frame in the
     archive of a person actually speaking, and the Praṇava medallion is on the wall behind
     them — which is precisely what this entry has to say. The approved About page already
     ships ss-dsc07143, the neighbouring frame of the same four people on the same stage, so
     this is no new exposure. Flagged in NOTES.md for the client to rule on. */
  'Pranava Vaakya': {
    id: 'ss-dsc07144',
    w: 960,
    h: 640,
    pos: '58% 52%',
    alt: 'Four people seated on wooden chairs on a low stage, the man at the right speaking into a handheld microphone, a Pranava medallion on the wall behind them.',
    shows: 'A speaker with the microphone, under the Praṇava mark',
    event: 'Samskrithi Sadhana · 29 June 2025',
  },
};
