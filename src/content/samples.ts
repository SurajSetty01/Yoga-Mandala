import type {
  BulletinEntry,
  CommunityEvent,
  Initiative,
  Listing,
  Person,
  ReadingCircle,
} from "./types";

/**
 * SAMPLE CONTENT — Phase A only. Delete this file at content handover.
 *
 * Integrity rules (docs/03-ASSET-STRATEGY.md §6) are enforced here:
 *   • No invented people. Placeholder profiles are named "Sample Profile NN"
 *     and their bios say plainly that they are placeholders.
 *   • No invented credentials, quotes, testimonials or ratings.
 *   • Programme and listing titles are illustrative and marked as samples.
 *   • Everything carries sample: true, which renders a visible marker.
 *
 * Traditions, cities, subjects and categories come from the framework's own
 * vocabularies, so filtering behaves exactly as it will with real data.
 */

const PLACEHOLDER_BIO =
  "Placeholder text standing in for the 100–150 word biography described in §7.1. A real profile would describe how this teacher came to the practice, which lineage or teachers shaped them, what they focus on now, and who they most enjoy teaching. It is written by the member and reviewed before publication.";

/* ── Teacher directory ──────────────────────────────────── */

type Seed = [string, string, string, string, string[], string[], Person["role"], boolean, boolean];

const SEEDS: Seed[] = [
  ["Bengaluru", "Karnataka", "Ashtanga Vinyasa", "14 years", ["Asana", "Teaching methodology"], ["English", "Kannada", "Hindi"], "teacher", true, true],
  ["Mysuru", "Karnataka", "Krishnamacharya lineage", "22 years", ["Philosophy", "Pranayama", "Sanskrit"], ["English", "Kannada", "Sanskrit"], "teacher", true, true],
  ["Pune", "Maharashtra", "Iyengar-influenced", "9 years", ["Alignment", "Therapy", "Prenatal"], ["English", "Marathi", "Hindi"], "teacher", true, false],
  ["Chennai", "Tamil Nadu", "Classical Haṭha", "17 years", ["Pranayama", "Meditation"], ["English", "Tamil"], "teacher", true, true],
  ["Rishikesh", "Uttarakhand", "Sivananda lineage", "11 years", ["Philosophy", "Teacher training"], ["English", "Hindi"], "teacher", true, false],
  ["Kochi", "Kerala", "Āyurveda-informed practice", "8 years", ["Ayurveda", "Therapy"], ["English", "Malayalam"], "therapist", true, true],
  ["Delhi", "Delhi NCR", "Viniyoga", "19 years", ["Therapy", "Student management"], ["English", "Hindi"], "teacher", true, false],
  ["Mumbai", "Maharashtra", "Contemporary vinyasa", "6 years", ["Asana", "Children"], ["English", "Hindi", "Gujarati"], "teacher", false, false],
  ["Kolkata", "West Bengal", "Bengali haṭha tradition", "25 years", ["History", "Philosophy"], ["English", "Bengali"], "researcher", true, true],
  ["Hyderabad", "Telangana", "Ashtanga Vinyasa", "7 years", ["Asana", "Anatomy"], ["English", "Telugu", "Hindi"], "teacher", false, false],
  ["Goa", "Goa", "Somatics and yoga", "12 years", ["Anatomy", "Biomechanics"], ["English", "Konkani"], "therapist", true, false],
  ["Ahmedabad", "Gujarat", "Yoga in education", "10 years", ["Children", "Teaching methodology"], ["English", "Gujarati", "Hindi"], "other", false, false],
];

export const PEOPLE: Person[] = SEEDS.map((s, i) => {
  const [city, region, tradition, experience, areas, languages, role, verified, hasPortrait] = s;
  const n = String(i + 1).padStart(2, "0");
  return {
    type: "person",
    slug: `sample-profile-${n}`,
    name: `Sample Profile ${n}`,
    location: { city, region },
    experience,
    tradition,
    qualifications: ["Qualification details are supplied by the member and reviewed before publication"],
    areasOfInterest: areas,
    languages,
    teachingFormat: i % 3 === 0 ? "both" : i % 3 === 1 ? "offline" : "online",
    bio: PLACEHOLDER_BIO,
    links: [],
    role,
    verified,
    isExpert: i % 3 === 1,
    expertise: i % 3 === 1 ? areas : undefined,
    contributions:
      i % 3 === 1 ? (i % 2 === 0 ? ["qa", "mentoring"] : ["study-circle", "expert-conversation"]) : undefined,
    plate: hasPortrait
      ? { subject: `Portrait — ${tradition} teacher, ${city}`, tone: "indigo" }
      : undefined,
    featured: i === 1,
    sample: true,
  };
});

export const featuredPerson = () => PEOPLE.find((p) => p.featured) ?? PEOPLE[0];

/* ── §6.1 Learning Initiatives ──────────────────────────── */

export const INITIATIVES: Initiative[] = [
  {
    type: "initiative",
    slug: "reading-the-sutras-slowly",
    title: "Reading the Sūtras Slowly",
    initiativeType: "study-circle",
    facilitator: {
      name: "Facilitator name (sample)",
      shortProfile: "A short facilitator profile appears here, supplied and reviewed before publication.",
      directorySlug: "sample-profile-02",
    },
    schedule: { date: "2026-09-06", time: "07:30", timezone: "IST" },
    format: "online",
    fee: { kind: "contribution" },
    audience: "teacher",
    description: [
      "Eight sessions working through the first pāda, one sūtra at a time, reading Woods alongside a second translation and asking what each rendering commits us to.",
      "This is a reading group rather than a lecture series. Participants are expected to have read the passage in advance and to come with a question.",
    ],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    status: "upcoming",
    plate: { subject: "A study group seated on the floor, books and notes open, natural light", tone: "paper" },
    featured: true,
    sample: true,
  },
  {
    type: "initiative",
    slug: "teaching-breath-responsibly",
    title: "Teaching Breath Responsibly",
    initiativeType: "workshop",
    facilitator: {
      name: "Facilitator name (sample)",
      shortProfile: "A short facilitator profile appears here.",
      directorySlug: "sample-profile-04",
    },
    schedule: { date: "2026-09-21", time: "10:00", timezone: "IST" },
    format: "hybrid",
    fee: { kind: "paid", amount: 1500, currency: "INR" },
    audience: "experienced-teacher",
    description: [
      "A one-day workshop on what the classical prāṇāyāma texts actually instruct, where contemporary teaching has departed from them, and how to introduce breath work to students without overstating its effects.",
    ],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    status: "upcoming",
    plate: { subject: "A teacher demonstrating a seated breathing practice to a small group", tone: "sage" },
    sample: true,
  },
  {
    type: "initiative",
    slug: "first-five-years-mentorship",
    title: "The First Five Years — a mentorship circle",
    initiativeType: "mentorship",
    facilitator: {
      name: "Facilitator name (sample)",
      shortProfile: "A short facilitator profile appears here.",
      directorySlug: "sample-profile-07",
    },
    schedule: { date: "2026-10-04", time: "18:00", timezone: "IST" },
    format: "online",
    fee: { kind: "free" },
    audience: "teacher",
    description: [
      "A monthly circle for teachers in their first five years: holding a room, setting fees, handling injury, saying no, and the parts of the work nobody covers in a training.",
    ],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    status: "upcoming",
    plate: { subject: "Two teachers in conversation, one older, after class", tone: "clay" },
    sample: true,
  },
];

export const featuredInitiative = () => INITIATIVES.find((i) => i.featured) ?? INITIATIVES[0];

/* ── §9 Events ──────────────────────────────────────────── */

export const EVENTS: CommunityEvent[] = [
  {
    type: "event",
    slug: "monsoon-sangha-meetup-bengaluru",
    title: "Monsoon Sangha Meetup",
    eventType: "sangha-meetup",
    date: "2026-08-30",
    time: "16:00",
    timezone: "IST",
    location: { venue: "Venue to be confirmed", city: "Bengaluru", online: false },
    host: { name: "Yoga Mandala" },
    audience: "open",
    fee: { kind: "free" },
    description: [
      "An afternoon for teachers to meet in person — no programme, no speaker, just tea and a room. These meetups are how most of the collaborations on the Sangha Board have started.",
    ],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    plate: { subject: "People arriving at an informal gathering, shoes at the door, monsoon light", tone: "paper" },
    status: "upcoming",
    sample: true,
  },
  {
    type: "event",
    slug: "expert-conversation-injury-language",
    title: "Expert Conversation — the language we use about injury",
    eventType: "expert-conversation",
    date: "2026-09-12",
    time: "19:00",
    timezone: "IST",
    location: { online: true, platform: "Online" },
    host: { name: "Sample Profile 11", directorySlug: "sample-profile-11" },
    audience: "teacher",
    fee: { kind: "free" },
    description: [
      "An hour on how teachers describe pain, alignment and healing to students, and how easily that language slides into claims we cannot support.",
    ],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    plate: { subject: "Close detail — hands resting on a knee, clinical but warm", tone: "indigo" },
    status: "upcoming",
    sample: true,
  },
  {
    type: "event",
    slug: "reading-circle-session-one",
    title: "Reading Circle — Session One",
    eventType: "reading-circle",
    date: "2026-09-06",
    time: "07:30",
    timezone: "IST",
    location: { online: true, platform: "Online" },
    host: { name: "Yoga Mandala" },
    audience: "teacher",
    fee: { kind: "contribution" },
    description: ["The opening session of this season's reading circle."],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    linkedInitiative: "reading-the-sutras-slowly",
    status: "upcoming",
    sample: true,
  },
  {
    type: "event",
    slug: "partner-anatomy-intensive",
    title: "Functional Anatomy Intensive",
    eventType: "partner-external",
    date: "2026-09-27",
    time: "09:00",
    timezone: "IST",
    location: { venue: "Studio venue", city: "Pune", online: false },
    host: { name: "An external studio (sample)", organisation: "External organiser" },
    audience: "teacher",
    fee: { kind: "paid", amount: 4500, currency: "INR" },
    description: [
      "A three-day anatomy intensive run by an external organiser. Listed here because it is relevant to the community. Yoga Mandala does not organise or endorse it.",
    ],
    registration: { mode: "external", url: "#" },
    badge: "partner-guest",
    plate: { subject: "An anatomy model and notes on a table, workshop setting", tone: "clay" },
    status: "upcoming",
    sample: true,
  },
  {
    type: "event",
    slug: "community-workshop-teaching-beginners",
    title: "Community Workshop — teaching absolute beginners",
    eventType: "community-workshop",
    date: "2026-10-11",
    time: "11:00",
    timezone: "IST",
    location: { venue: "Community hall", city: "Chennai", online: false },
    host: { name: "Sample Profile 04", directorySlug: "sample-profile-04" },
    audience: "teacher",
    fee: { kind: "contribution" },
    description: ["A half-day on sequencing, language and pacing for people who have never practised before."],
    registration: { mode: "external", url: "#" },
    badge: "yoga-mandala-learning-initiative",
    plate: { subject: "A beginners class mid-instruction, teacher walking the room", tone: "sage" },
    status: "upcoming",
    sample: true,
  },
  {
    type: "event",
    slug: "study-circle-sanskrit-terms",
    title: "Study Circle — twenty terms worth knowing",
    eventType: "study-circle",
    date: "2026-07-19",
    time: "08:00",
    timezone: "IST",
    location: { online: true, platform: "Online" },
    host: { name: "Yoga Mandala" },
    audience: "open",
    fee: { kind: "free" },
    description: ["A past session on the Sanskrit vocabulary that recurs across the haṭha texts."],
    registration: { mode: "external" },
    badge: "yoga-mandala-learning-initiative",
    status: "past",
    sample: true,
  },
];

export const upcomingEvents = () =>
  EVENTS.filter((e) => e.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date));
export const nextEvent = () => upcomingEvents()[0];

/* ── §6.2 Curation & Learning Bulletin ──────────────────── */

const b = (
  slug: string,
  title: string,
  category: BulletinEntry["category"],
  organisation: string,
  note: string,
  location: string,
  posted: string,
  expiry: string,
  badge: BulletinEntry["badge"] = "curated-community-listing",
): BulletinEntry => ({
  type: "bulletin",
  slug,
  title,
  category,
  source: { organisation },
  note,
  location,
  posted,
  expiry,
  badge,
  sample: true,
});

export const BULLETIN: BulletinEntry[] = [
  b("critical-edition-hatha-texts", "A critical edition of the early haṭha corpus", "research", "University press (sample)", "Selected because the introduction is readable without Sanskrit and reframes several passages teachers quote often.", "Online", "2026-08-08", "2026-11-08"),
  b("teacher-training-module-anatomy", "Anatomy module open to external participants", "teacher-training", "External school (sample)", "A single module from a longer training, opened to teachers who want the anatomy component without the full programme.", "Pune", "2026-08-05", "2026-10-15"),
  b("silent-retreat-western-ghats", "Ten-day silent retreat", "retreat", "Retreat centre (sample)", "Listed for relevance to teachers looking for their own practice time rather than more training.", "Western Ghats", "2026-08-02", "2026-12-01"),
  b("book-yoga-body-history", "A history of modern postural yoga", "book", "Academic publisher (sample)", "Frequently recommended in the group. Listed with bibliographic detail rather than a purchase link.", "—", "2026-07-28", "2027-01-28"),
  b("workshop-voice-for-teachers", "Voice and instruction workshop", "workshop", "External facilitator (sample)", "Not a yoga workshop. Selected because how a teacher uses their voice across five classes a day is a genuine occupational question.", "Online", "2026-07-24", "2026-09-30"),
  b("research-call-participants", "Call for participants — teaching practices survey", "research", "Research group (sample)", "A survey of teaching practice. Included after checking that the ethics approval and contact details are real.", "Online", "2026-07-20", "2026-09-20"),
  b("programme-sanskrit-for-teachers", "Sanskrit for practitioners, twelve weeks", "programme", "Language institute (sample)", "Structured, slow, and aimed at reading rather than chanting. Runs twice a year.", "Online", "2026-07-14", "2026-10-14"),
  b("partner-studio-open-house", "Studio open house and teacher mixer", "event", "Partner studio (sample)", "A partner organisation's event, clearly labelled as theirs.", "Bengaluru", "2026-07-10", "2026-09-05", "partner-guest"),
  b("book-ayurveda-primer", "An āyurveda primer for yoga teachers", "book", "Independent publisher (sample)", "Chosen over several similar titles because it is careful about the limits of what a yoga teacher should advise.", "—", "2026-07-02", "2027-01-02"),
];

/* ── §8 Sangha Board ────────────────────────────────────── */

const l = (
  slug: string,
  category: Listing["category"],
  title: string,
  description: string,
  location: string,
  poster: string,
  posted: string,
  expiry: string,
): Listing => ({
  type: "listing",
  slug,
  listingType: "sangha-board",
  category,
  title,
  description,
  location,
  poster: { name: poster },
  posted,
  expiry,
  badge: "community-listing",
  status: "published",
  sample: true,
});

export const LISTINGS: Listing[] = [
  l("cover-teacher-morning-classes", "looking-for", "Cover teacher for morning classes, three weeks", "Two morning classes a week, mixed level, needing cover through September. Ashtanga or general haṭha background preferred.", "Bengaluru", "Sample Profile 01", "2026-08-09", "2026-09-30"),
  l("hall-available-weekday-mornings", "space", "Hall available, weekday mornings", "A quiet hall with wooden floors, free before 10am on weekdays. Suitable for a small regular class or a study circle.", "Mysuru", "Sample Profile 02", "2026-08-07", "2026-11-07"),
  l("collaborator-teaching-materials", "project", "Collaborator wanted — teaching materials in Kannada", "Working on a set of plain-language handouts for beginners in Kannada. Looking for one other teacher to review and co-write.", "Karnataka", "Sample Profile 01", "2026-08-04", "2026-10-04"),
  l("mentoring-offered-new-teachers", "offering", "Mentoring offered — two places, no fee", "Two places for teachers in their first two years. Monthly call, honest feedback, no fee.", "Online", "Sample Profile 07", "2026-08-01", "2026-10-01"),
  l("volunteers-community-classes", "volunteer", "Volunteers for community classes at a school", "Two teachers needed for a weekly session at a government school. Travel reimbursed.", "Chennai", "Sample Profile 04", "2026-07-29", "2026-09-29"),
  l("referral-physiotherapist", "referral", "Physiotherapist who works well with yoga teachers", "Sharing a referral after several good experiences. Understands practice, does not dismiss it, and says no clearly when rest is needed.", "Pune", "Sample Profile 03", "2026-07-25", "2026-10-25"),
  l("exchange-pranayama-for-anatomy", "teacher-exchange", "Exchange — pranayama sessions for anatomy tuition", "Happy to teach prāṇāyāma in exchange for functional anatomy tuition. Online works.", "Online", "Sample Profile 04", "2026-07-21", "2026-09-21"),
  l("retreat-space-off-season", "space", "Retreat space available off-season", "Twelve beds, shared kitchen, available at reduced rates between June and September.", "Kerala", "Sample Profile 06", "2026-07-18", "2026-12-18"),
];

/* ── §6.4 Reading Circle ────────────────────────────────── */

export const READING_CIRCLE: ReadingCircle = {
  type: "reading-circle",
  text: {
    title: "The Yoga System of Patañjali — first pāda",
    titleDeva: "समाधिपाद",
    author: "Translated by James Haughton Woods",
    edition: "Harvard Oriental Series, 1914 — public domain",
    librarySlug: "yoga-system-of-patanjali-woods",
  },
  period: { start: "2026-09-06", end: "2026-11-15" },
  milestones: [
    { label: "Sūtras 1.1–1.11", date: "2026-09-06" },
    { label: "Sūtras 1.12–1.22", date: "2026-09-27" },
    { label: "Sūtras 1.23–1.39", date: "2026-10-18" },
    { label: "Sūtras 1.40–1.51", date: "2026-11-15" },
  ],
  facilitator: {
    name: "Facilitator name (sample)",
    note: "A short note from the facilitator on why this text, and why now, appears here.",
    directorySlug: "sample-profile-02",
  },
  prompts: [
    "Where does this translation commit to a reading that another translator avoids?",
    "What would change in your teaching if you took 1.2 literally?",
    "Which of these sūtras do you already quote, and have you read what surrounds it?",
    "What is lost when a sūtra is taught without its commentary?",
  ],
  meeting: { date: "2026-09-06", time: "07:30", timezone: "IST", format: "Online" },
  reflections: [],
  status: "current",
  sample: true,
};
