import { journeys } from '@/content/pranava';
import { links, site } from '@/content/site';

/**
 * THE ENQUIRY ROUTES, AS THE PAGES OF A BOOK.
 *
 * components/contact/RouteBook.tsx turns these six into a book that turns its pages as the
 * reader scrolls: one route per spread, the photograph on the left page and the subject,
 * the message and the WhatsApp link on the right. This file is the data; nothing in it
 * knows about pages.
 *
 * This file replaces `moments.ts`, which held Yoga Mandala's eight collaboration subjects.
 * Praṇava does not take eight kinds of enquiry; it takes SIX, and they are named — not
 * invented — by two documents:
 *
 *   Context/new/Pranava Website.docx §9
 *     "…covering general enquiries, programme enquiries, collaborations, location,
 *      WhatsApp/email and social links. Keep Yoga Mandala's community contact details
 *      within its own section where appropriate."
 *   Context/Pranava Website Blueprint.pdf §3 — the four visitor journeys, each written as
 *     the visitor's own sentence: "I want structured education", "I want consistent
 *     Sādhana", "I want health-oriented guidance", "I want to understand more".
 *
 * Three of the six labels below are those Blueprint intents VERBATIM (01, 02, 04). The
 * other three (03, 05, 06) are written here in the same grammar for the routes the
 * Blueprint's journeys do not cover — a programme enquiry, a collaboration, and the Yoga
 * Mandala community. They are UI labels, not client prose, which is why they live in a
 * component and not in content/copy.ts (see the rules at the head of that file).
 *
 * "I want to understand more" — Insights — is deliberately NOT a page. It is a reading
 * destination, not an enquiry; nobody, in either document, asks to be contacted about it.
 * Events is not one either: it has its own page and its own enquiry, and neither the
 * client's §9 nor the Blueprint's §6 Contact spec lists it as a contact route.
 *
 * WHERE EACH PAGE GOES. There is no form handler, no backend and no email address, so a
 * route that pretends to file a ticket would be a lie. Every page opens the one channel
 * that works — WhatsApp — with its own subject already written into the message, which is
 * the honest version of Blueprint §14's "program-specific enquiry/application routing":
 * the routing happens in the message instead of in a handler the site does not have. The
 * reader still reads, edits and sends it themselves.
 *
 * THE PHOTOGRAPHS ARE PRAṆAVA'S NOW. public/media/pranava-stills.json landed while this was
 * being built, and five of the six frames were swapped from Yoga Mandala workshop stills to
 * Praṇava's own Prabodha teacher-training archive: study, sustained practice, a room set up
 * for a programme, supported restorative work, and a discussion circle. The sixth keeps a
 * Samskrithi Sadhana frame on purpose — see route 06. Blueprint §8.4 asks for "real
 * Pranava teaching and practice environments… learning, observation, correction, study,
 * books, props, discussions and community", and these are that, where the Samskrithi frames
 * were a different community's gathering.
 *
 * `event` is the frame's PROVENANCE, printed on the plate under the subject: where the
 * photograph was actually taken, never what the subject beside it is called. Collections
 * come from the manifest's own `source` path (and, for the older frames,
 * Context/Media/_audit/tagged.json); dates from Context/Media/README.md, which covers the
 * older collections only. No venue and no city — no audit states one.
 *
 * `alt` is VERBATIM from the manifest — public/media/pranava-stills.json for the `pr-`
 * frames, public/media/stills.json for route 06 — which is the vision audit's own
 * description of what is in the frame. The word on the arch is what the reader wants; the
 * alt is what the picture shows; the provenance is where it was taken. Three different kinds
 * of statement, and keeping them apart is what stops any one being read as another.
 *
 * `focal` is the manifest's focal point, used as object-position so a landscape frame
 * cropped into a tall page keeps its subject.
 *
 * `srcs` lists the derivatives that EXIST on disk with their MEASURED intrinsic widths, not
 * the ones a manifest hopes for. The Prabodha frames cap at 1620 — design/PRANAVA-BUILD.md
 * records the same ceiling ("good to ~1600 wide, never a 2560 full-bleed"). A page of the
 * book is portrait, so a landscape frame is cropped by its height, not its width; `ratio`
 * lets the book tell the browser how wide the file really needs to be, and the 1620 is
 * what a large page gets. `ss-ven0096` has only 480 and 960 derivatives of its own, so its
 * list also carries the 1920 poster of the same clip.
 */
export type Route = {
  n: string;
  /** The enquiry, in the enquirer's own words. */
  label: string;
  /** What the message says when the page's link opens it. Editable by the sender. */
  message: string;
  href: string;
  id: string;
  alt: string;
  /** where the frame was taken — provenance, printed on the plate. `on` is the date and
   *  is NULL where the audit records none, and NULL renders as nothing. */
  event: { at: string; on: string | null };
  focal: [number, number];
  /** the frame's own width over height, so a page can ask for the file its crop needs */
  ratio: number;
  /** every file that exists for this frame, with its real intrinsic width, measured with sharp */
  srcs: Array<{ src: string; w: number }>;
};

/**
 * PROVENANCE, and why only one of the two new collections is used.
 *
 * The Praṇava library landed as public/media/pranava-stills.json with 83 `pr-` frames in two
 * collections: `pr-ttc-*` from "Prabodha TTC Photos" and `pr-pbh-*` from "Prabhava Photos".
 * The manifest carries an id, an audited alt, a focal point and the source path — and NO
 * date for either collection. Context/Media/README.md dates the three older ones; nothing
 * dates these.
 *
 * So the plate names the event and not a date, and `on` is null for them.
 *
 * ONLY THE PRABODHA TTC FRAMES ARE USED, and that is a content decision rather than a
 * picture-editing one. "Prabodha" is one of the five programme names in Blueprint §4.3 — the
 * client's own word, which a caption can say. "Prabhava" appears in NO client document: not
 * the Blueprint, not Pranava Website.docx, not Pranava About Page.docx (all three searched).
 * It is a folder label from the media drop, and captioning a photograph with an event this
 * project cannot name is the failure the plate exists to prevent.
 *
 * That costs something and the cost is known. The Prabhava frames are the better material:
 * 27 of the archive's 36 portrait frames, 3024×4032 native, several with a 2560 derivative,
 * against Prabodha's 1620×1080 landscape and 1080×1620 portrait. Routes 02 and 04 take the
 * two Prabodha PORTRAIT frames instead, which fill a tall page without losing half their
 * width. Ask the client what Prabhava is and the rest of the
 * archive opens up; until then provenance outranks resolution.
 */
const PRABODHA = { at: 'Prabodha TTC', on: null };
const SAMSKRITHI = { at: 'Samskrithi Sadhana', on: '29 June 2025' };

/**
 * One open line, six subjects. `links.whatsapp` is the only channel in content/site.ts that
 * is not null, so it is the only one that can be linked to; the subject rides along in the
 * message rather than in a mailbox that does not exist.
 */
const enquire = (message: string) =>
  `${links.whatsapp}?text=${encodeURIComponent(message)}`;

const hello = `Hello ${site.name}.`;

/**
 * The three Blueprint journey intents, read from content rather than retyped, so they stay
 * the client's sentence if the client's sentence changes.
 */
const J = journeys;

/** Everything but the link. `href` is derived below so a subject and its message cannot drift. */
const SUBJECTS: Array<Omit<Route, 'href'>> = [
  {
    n: '01',
    label: J.learn.intent,
    message: `${hello} My enquiry is about structured learning.`,
    id: 'pr-ttc-dsc_0284_1',
    alt: 'A discussion circle in an open pavilion with several people writing in notebooks as one speaks',
    event: PRABODHA,
    focal: [0.5, 0.55],
    ratio: 1.5,
    srcs: [{ src: '/media/stills/pr-ttc-dsc_0284_1-480.webp', w: 480 }, { src: '/media/stills/pr-ttc-dsc_0284_1-960.webp', w: 960 }, { src: '/media/stills/pr-ttc-dsc_0284_1-1620.webp', w: 1620 }],
  },
  {
    n: '02',
    label: J.practice.intent,
    message: `${hello} My enquiry is about ongoing practice.`,
    /* PORTRAIT, on purpose. A page of the book is taller than it is wide, and a 3:2 landscape loses
       half its width to that crop. The archive has
       36 portrait frames; this is the one the audit calls "the most atmospheric single-figure
       frame" — a still seated figure under a banyan, nobody else in shot. Its only derivative
       is 960×1440, which covers a page up to 480 CSS px wide at 2×. */
    id: 'pr-ttc-dsc_0326',
    alt: 'A man sitting cross-legged with his hands in his lap on a stone slab at the foot of a huge banyan tree',
    event: PRABODHA,
    focal: [0.42, 0.68],
    ratio: 0.667,
    srcs: [{ src: '/media/stills/pr-ttc-dsc_0326-480.webp', w: 480 }, { src: '/media/stills/pr-ttc-dsc_0326-960.webp', w: 960 }],
  },
  {
    /* A programme, in session. This page used to carry pr-ttc-dsc_0188_1, the same red-floored
       hall set out with mats, bolsters and chairs and nobody in it; its real subject was the
       furniture, which the owner's review rules out. This is that hall in use: five
       practitioners holding one shape in a receding line, low sun across the floor. The audit
       calls it "the best of the three" and notes no readable faces. */
    n: '03',
    label: 'I want to ask about a programme',
    message: `${hello} My enquiry is about a programme.`,
    id: 'pr-ttc-dsc_0569',
    alt: 'Five practitioners in downward-facing dog on mats in a receding line, low sunlight across a red floor',
    event: PRABODHA,
    focal: [0.45, 0.6],
    ratio: 1.5,
    srcs: [{ src: '/media/stills/pr-ttc-dsc_0569-480.webp', w: 480 }, { src: '/media/stills/pr-ttc-dsc_0569-960.webp', w: 960 }, { src: '/media/stills/pr-ttc-dsc_0569-1620.webp', w: 1620 }],
  },
  {
    /* Supported, restorative, propped — the vocabulary of attention to a body, which is as
       close to "health-oriented guidance" as the archive goes. No clinical or therapy
       imagery exists and none is implied: Heal is an area the brief says is being developed. */
    n: '04',
    label: J.heal.intent,
    message: `${hello} My enquiry is about health-oriented guidance.`,
    /* PORTRAIT again, and for the same reason. The audit's
       own note on this frame is "a rare portrait-format frame of the inversion row, useful
       for a tall slot". 960×1440 covers 348 CSS px at 2×. */
    id: 'pr-ttc-dsc_0254_1',
    alt: 'Three people in supported shoulderstand over chairs against a white wall',
    event: PRABODHA,
    focal: [0.5, 0.6],
    ratio: 0.667,
    srcs: [{ src: '/media/stills/pr-ttc-dsc_0254_1-480.webp', w: 480 }, { src: '/media/stills/pr-ttc-dsc_0254_1-960.webp', w: 960 }],
  },
  {
    n: '05',
    label: 'I want to collaborate',
    message: `${hello} My enquiry is about a collaboration.`,
    id: 'pr-ttc-dsc_0049',
    alt: 'Five people sitting on chairs and the floor in a loose circle talking, green netting behind them',
    event: PRABODHA,
    focal: [0.5, 0.5],
    ratio: 1.5,
    srcs: [{ src: '/media/stills/pr-ttc-dsc_0049-480.webp', w: 480 }, { src: '/media/stills/pr-ttc-dsc_0049-960.webp', w: 960 }, { src: '/media/stills/pr-ttc-dsc_0049-1620.webp', w: 1620 }],
  },
  {
    /* THE ONE PAGE THAT KEEPS A YOGA MANDALA FRAME, and deliberately. Yoga Mandala is a
       community initiative under Praṇava Seva Trust, not a Praṇava programme; the client
       asked for its contact details to be kept within its own section. Its page's message
       names the community rather than the institute, its photograph is a Samskrithi Sadhana
       gathering rather than a Praṇava teacher training, and the line beneath the book names
       Praṇav Śāstrī, who is the contact the Yoga Mandala document gives. `founder.name`
       ("Pranav Murthy") is another document's spelling for another context and is not used
       on this page. */
    n: '06',
    label: 'I want to join the community',
    message: 'Hello. My enquiry is about the Yoga Mandala community.',
    id: 'ss-ven0096',
    alt: 'Class folding forward in two rows down a plant-lined hall, daylight through the skylight roof.',
    event: SAMSKRITHI,
    focal: [0.5, 0.58],
    ratio: 1.778,
    /* The still's only derivatives are 480 and 960, and a whole page of the book is taller
       than 540px on most screens. The clip of this same class has a 1920x1080 poster in
       public/media/posters: a moment later in the same pan, the same rows folding forward
       under the same skylight, so the alt is true of both. The browser takes the poster only
       where the page is big enough to need it. */
    srcs: [
      { src: '/media/stills/ss-ven0096-480.webp', w: 480 },
      { src: '/media/stills/ss-ven0096-960.webp', w: 960 },
      { src: '/media/posters/ss-ven0096.jpg', w: 1920 },
    ],
  },
];

export const ROUTES: Route[] = SUBJECTS.map((r) => ({ ...r, href: enquire(r.message) }));

export const srcSet = (r: Route) => r.srcs.map((s) => `${s.src} ${s.w}w`).join(', ');

/** The 960 file where there is one: what a browser that ignores srcset gets. */
export const fallback = (r: Route) => (r.srcs.find((s) => s.w === 960) ?? r.srcs[0]!).src;
