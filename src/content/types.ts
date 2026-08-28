/**
 * Content model — six types, per docs/01-SITEMAP-LOCKED.md §5.
 *
 * Field names deliberately match the entities in framework §19 so that
 * Phase B attaches a database behind these shapes without touching templates.
 *
 * `sample: true` marks placeholder content. Everything marked sample is
 * rendered with a visible "Sample content" marker and lives only in
 * src/content/samples.ts, so it can be deleted in one commit at handover.
 */

/** §10 badge vocabulary. Fixed. "Never blur these categories" — §23. */
export type Badge =
  | "yoga-mandala-learning-initiative"
  | "curated-community-listing"
  | "community-listing"
  | "partner-guest";

export const BADGE_LABEL: Record<Badge, string> = {
  "yoga-mandala-learning-initiative": "Yoga Mandala Learning Initiative",
  "curated-community-listing": "Curated Community Listing",
  "community-listing": "Community Listing",
  "partner-guest": "Partner / Guest",
};

/** §10, verbatim. Published on /learn and /discover so members learn the language. */
export const BADGE_MEANING: Record<Badge, string> = {
  "yoga-mandala-learning-initiative": "Formally organised or endorsed by Yoga Mandala",
  "curated-community-listing": "External opportunity selected for relevance",
  "community-listing": "Member-submitted listing meeting community rules",
  "partner-guest": "Legitimate external collaborator or organisation",
};

export type Audience = "beginner" | "teacher" | "experienced-teacher" | "open";

export const AUDIENCE_LABEL: Record<Audience, string> = {
  beginner: "Beginner",
  teacher: "Teacher",
  "experienced-teacher": "Experienced teacher",
  open: "Open to all",
};

export type Fee = {
  kind: "free" | "paid" | "contribution";
  amount?: number;
  currency?: string;
};

/** An image slot. `src` points at a real, licence-cleared file in public/assets. */
export type PlateSpec = {
  /** What the image shows — used as alt text and as the caption. */
  subject: string;
  tone?: "paper" | "indigo" | "clay" | "sage" | "archive";
  src?: string;
  credit?: string;
  licence?: string;
};

/* ── §6.1 Learning Initiative ───────────────────────────── */
export type Initiative = {
  type: "initiative";
  slug: string;
  title: string;
  initiativeType: "workshop" | "study-circle" | "lecture" | "series" | "mentorship" | "other";
  facilitator: { name: string; shortProfile: string; directorySlug?: string };
  schedule: { date: string; time: string; timezone: string };
  format: "online" | "offline" | "hybrid";
  fee: Fee;
  audience: Audience;
  description: string[];
  registration: { mode: "portal" | "external"; url?: string };
  badge: "yoga-mandala-learning-initiative";
  status: "upcoming" | "past";
  plate: PlateSpec;
  featured?: boolean;
  sample: boolean;
};

/* ── §6.2 Curation & Learning Bulletin ──────────────────── */
export type BulletinEntry = {
  type: "bulletin";
  slug: string;
  title: string;
  category:
    | "programme"
    | "workshop"
    | "retreat"
    | "teacher-training"
    | "book"
    | "research"
    | "event";
  source: { organisation: string; url?: string };
  /** The curator's note on why this was selected. */
  note: string;
  location: string;
  posted: string;
  expiry: string;
  badge: Exclude<Badge, "yoga-mandala-learning-initiative">;
  rights?: string;
  sample: boolean;
};

/* ── §6.3 Library resource ──────────────────────────────── */
export const LIBRARY_SUBJECTS = [
  "Yoga philosophy",
  "Texts and commentaries",
  "Asana and methodology",
  "Anatomy and biomechanics",
  "Pranayama",
  "Meditation",
  "Ayurveda",
  "Sanskrit",
  "Yoga history and culture",
  "Research",
  "Teaching methodology",
] as const;

export type LibrarySubject = (typeof LIBRARY_SUBJECTS)[number];

export type Resource = {
  type: "resource";
  slug: string;
  title: string;
  /** Sanskrit title in Devanagari, where one exists. Set in the Devanagari face. */
  titleDeva?: string;
  author: string;
  subject: LibrarySubject;
  tradition: string;
  description: string;
  level: Audience;
  /** REQUIRED — §6.3 copyright principle enforced structurally. */
  rights: string;
  source: { name: string; url: string };
  plate?: PlateSpec;
  featured?: boolean;
  sample: boolean;
};

/* ── §9 Event ───────────────────────────────────────────── */
export type EventType =
  | "sangha-meetup"
  | "learning-initiative"
  | "study-circle"
  | "expert-conversation"
  | "community-workshop"
  | "reading-circle"
  | "partner-external";

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  "sangha-meetup": "Sangha Meetup",
  "learning-initiative": "Learning Initiative",
  "study-circle": "Study Circle",
  "expert-conversation": "Expert Conversation",
  "community-workshop": "Community Workshop",
  "reading-circle": "Reading Circle",
  "partner-external": "Partner / External",
};

export type CommunityEvent = {
  type: "event";
  slug: string;
  title: string;
  eventType: EventType;
  date: string;
  time: string;
  timezone: string;
  location: { venue?: string; city?: string; online: boolean; platform?: string };
  host: { name: string; organisation?: string; directorySlug?: string };
  audience: Audience;
  fee: Fee;
  description: string[];
  registration: { mode: "portal" | "external"; url?: string };
  badge: "yoga-mandala-learning-initiative" | "partner-guest" | "community-listing";
  plate?: PlateSpec;
  linkedInitiative?: string;
  status: "upcoming" | "past";
  sample: boolean;
};

/* ── §8 Sangha Board / §10 Community Listing ────────────── */
export type ListingCategory =
  | "looking-for"
  | "offering"
  | "space"
  | "project"
  | "volunteer"
  | "referral"
  | "teacher-exchange";

/** §8, verbatim purposes. */
export const LISTING_CATEGORY: Record<ListingCategory, { label: string; purpose: string }> = {
  "looking-for": { label: "Looking for", purpose: "Seeking teacher, collaborator or expertise" },
  offering: { label: "Offering", purpose: "Offering teaching, mentoring, resources or skills" },
  space: { label: "Space", purpose: "Studio / community / retreat space available" },
  project: { label: "Project", purpose: "Seeking collaborators" },
  volunteer: { label: "Volunteer", purpose: "Community service opportunity" },
  referral: { label: "Referral", purpose: "Useful professional/community referral" },
  "teacher-exchange": { label: "Teacher exchange", purpose: "Class, workshop or knowledge exchange" },
};

export type Listing = {
  type: "listing";
  slug: string;
  listingType: "sangha-board" | "community-listing";
  category: ListingCategory;
  title: string;
  description: string;
  location: string;
  poster: { name: string; directorySlug?: string };
  posted: string;
  expiry: string;
  badge: "community-listing";
  status: "published" | "expired";
  sample: boolean;
};

/* ── §7.1 Teacher profile ───────────────────────────────── */
export type Person = {
  type: "person";
  slug: string;
  name: string;
  location: { city: string; region: string };
  experience: string;
  tradition: string;
  qualifications: string[];
  areasOfInterest: string[];
  languages: string[];
  teachingFormat: "online" | "offline" | "both";
  bio: string;
  links: { label: string; url: string }[];
  role: "teacher" | "therapist" | "researcher" | "other";
  verified: boolean;
  isExpert: boolean;
  expertise?: string[];
  contributions?: ("qa" | "study-circle" | "expert-conversation" | "mentoring")[];
  /** Portrait is optional per §7.1 — the no-photo state is a first-class design case. */
  plate?: PlateSpec;
  featured?: boolean;
  sample: boolean;
};

/* ── §6.4 Reading Circle ────────────────────────────────── */
export type ReadingCircle = {
  type: "reading-circle";
  text: { title: string; titleDeva?: string; author: string; edition: string; librarySlug?: string };
  period: { start: string; end: string };
  milestones: { label: string; date: string }[];
  facilitator: { name: string; note: string; directorySlug?: string };
  prompts: string[];
  meeting: { date: string; time: string; timezone: string; format: string };
  /** Empty in Phase A — awaiting a product decision on how reflections work. */
  reflections: never[];
  status: "current" | "past";
  sample: boolean;
};
