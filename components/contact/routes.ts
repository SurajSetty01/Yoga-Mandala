import { journeys } from '@/content/pranava';
import { links, site } from '@/content/site';

/**
 * THE ENQUIRY ROUTES, AS DOORWAYS.
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
 * "I want to understand more" — Insights — is deliberately NOT a doorway. It is a reading
 * destination, not an enquiry; nobody, in either document, asks to be contacted about it.
 * Events is not one either: it has its own page and its own enquiry, and neither the
 * client's §9 nor the Blueprint's §6 Contact spec lists it as a contact route.
 *
 * WHERE EACH DOORWAY GOES. There is no form handler, no backend and no email address, so a
 * route that pretends to file a ticket would be a lie. Every doorway opens the one channel
 * that works — WhatsApp — with its own subject already written into the message, which is
 * the honest version of Blueprint §14's "program-specific enquiry/application routing":
 * the routing happens in the message instead of in a handler the site does not have. The
 * reader still reads, edits and sends it themselves.
 *
 * THE PHOTOGRAPHS ARE PRAṆAVA'S NOW. public/media/pranava-stills.json landed while this was
 * being built, and five of the six frames were swapped from Yoga Mandala workshop stills to
 * Praṇava's own Prabodha teacher-training archive: study, sustained practice, a room set up
 * for a programme, supported restorative work, and a discussion circle. The sixth keeps a
 * Samskrithi Sadhana frame on purpose — see doorway 06. Blueprint §8.4 asks for "real
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
 * frames, public/media/stills.json for doorway 06 — which is the vision audit's own
 * description of what is in the frame. The word on the arch is what the reader wants; the
 * alt is what the picture shows; the provenance is where it was taken. Three different kinds
 * of statement, and keeping them apart is what stops any one being read as another.
 *
 * `focal` is the manifest's focal point, used as object-position so a landscape frame
 * cropped into a tall doorway keeps its subject.
 *
 * `srcs` lists the derivatives that EXIST on disk with their MEASURED intrinsic widths, not
 * the ones a manifest hopes for. The Prabodha frames cap at 1620 — design/PRANAVA-BUILD.md
 * records the same ceiling ("good to ~1600 wide, never a 2560 full-bleed") — so the two
 * biggest doorways upscale by about 1.2× on a 2× display and are exact on a 1× one. That is
 * the archive, not a pipeline fault, and it is better than the 720px portrait crops the
 * preview shipped on doorways of the same size. `ss-ven0096` has only its one 960×540
 * derivative, which is why it is on the smallest doorway.
 */
export type Route = {
  n: string;
  /** The enquiry, in the enquirer's own words. */
  label: string;
  /** What the message says when the doorway opens it. Editable by the sender. */
  message: string;
  href: string;
  id: string;
  alt: string;
  /** where the frame was taken — provenance, printed on the plate. `on` is the date and
   *  is NULL where the audit records none; it is also dropped on phones and on the two
   *  narrowest doorways, where there is no room for it. The event itself never is. */
  event: { at: string; on: string | null };
  focal: [number, number];
  /** file suffix → real intrinsic width, measured with sharp. */
  srcs: Array<{ suffix: number; w: number }>;
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
 * ONLY THE PRABODHA TTC FRAMES ARE USED. "Prabodha" is one of the five programme names in
 * Blueprint §4.3 — it is the client's own word and a caption can say it. "Prabhava" appears
 * in NO client document: not the Blueprint, not Pranava Website.docx, not Pranava About
 * Page.docx (searched all three). It is a folder label from the media drop, and captioning a
 * photograph with an event this project cannot name is the failure the plate exists to
 * prevent. The Prabhava frames are the higher-resolution ones — 3024×4032 against the TTC's
 * 1620×1080 — and they are still not used. Ask the client what Prabhava is and they become
 * available; until then, resolution does not outrank provenance.
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
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1620, w: 1620 }],
  },
  {
    n: '02',
    label: J.practice.intent,
    message: `${hello} My enquiry is about ongoing practice.`,
    id: 'pr-ttc-dsc_0569',
    alt: 'Five practitioners in downward-facing dog on mats in a receding line, low sunlight across a red floor',
    event: PRABODHA,
    focal: [0.45, 0.6],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1620, w: 1620 }],
  },
  {
    /* A programme is a prepared place. The only frame on the wall with nobody in it, and the
       one that says "something has been set up for you" without saying anything the client
       has not written — there are no programme descriptions anywhere in their material. */
    n: '03',
    label: 'I want to ask about a programme',
    message: `${hello} My enquiry is about a programme.`,
    id: 'pr-ttc-dsc_0188_1',
    alt: 'A row of prepared practice places with mats, blankets, bolsters, blocks and chairs on a red floor',
    event: PRABODHA,
    focal: [0.5, 0.65],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1620, w: 1620 }],
  },
  {
    /* Supported, restorative, propped — the vocabulary of attention to a body, which is as
       close to "health-oriented guidance" as the archive goes. No clinical or therapy
       imagery exists and none is implied: Heal is an area the brief says is being developed. */
    n: '04',
    label: J.heal.intent,
    message: `${hello} My enquiry is about health-oriented guidance.`,
    id: 'pr-ttc-dsc_0262_1',
    alt: 'Four practitioners lying back over bolsters with their legs resting on chair seats',
    event: PRABODHA,
    focal: [0.5, 0.65],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1620, w: 1620 }],
  },
  {
    n: '05',
    label: 'I want to collaborate',
    message: `${hello} My enquiry is about a collaboration.`,
    id: 'pr-ttc-dsc_0049',
    alt: 'Five people sitting on chairs and the floor in a loose circle talking, green netting behind them',
    event: PRABODHA,
    focal: [0.5, 0.5],
    srcs: [{ suffix: 960, w: 960 }, { suffix: 1620, w: 1620 }],
  },
  {
    /* THE ONE DOORWAY THAT KEEPS A YOGA MANDALA FRAME, and deliberately. Yoga Mandala is a
       community initiative under Praṇava Seva Trust, not a Praṇava programme; the client
       asked for its contact details to be kept within its own section. Its doorway's message
       names the community rather than the institute, its photograph is a Samskrithi Sadhana
       gathering rather than a Praṇava teacher training, and the line beneath the wall names
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
    srcs: [{ suffix: 960, w: 960 }],
  },
];

export const ROUTES: Route[] = SUBJECTS.map((r) => ({ ...r, href: enquire(r.message) }));

export const srcSet = (r: Route) =>
  r.srcs.map((s) => `/media/stills/${r.id}-${s.suffix}.webp ${s.w}w`).join(', ');

/**
 * Near lane / far lane. Far doorways are smaller, paler and travel slower, so the wall has a
 * front and a back. Read by both the CSS (occlusion, veil) and components/contact/Depth.tsx.
 *
 * With six doorways the last one is NEAR and bleeds off the right rail, so the wall still
 * ends on a full-strength opening — at eight it was the same doorway in the same place.
 */
export const LANE = ['near', 'far', 'near', 'far', 'near', 'near'] as const;
