/**
 * Content model for Yoga Mandala (Phase A).
 *
 * These types deliberately mirror the framework §19 database entities so that a
 * Phase-B backend attaches behind the same shapes rather than requiring a rewrite.
 * Six content types: person, initiative, bulletin, resource, event, listing.
 */

// ---------------------------------------------------------------------------
// Origin & badges (structural — the Initiative-vs-External distinction lives here)
// ---------------------------------------------------------------------------

export type Origin =
  | "yoga_mandala_initiative"
  | "curated_external"
  | "community_submission"
  | "partner_guest";

export type BadgeLabel =
  | "Yoga Mandala Learning Initiative"
  | "Curated Community Listing"
  | "Community Listing"
  | "Partner / Guest";

export type BadgeStyle = "forest-fill" | "gold-hairline" | "moss-hairline" | "bark-hairline";

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

export type ContentType =
  | "person"
  | "initiative"
  | "bulletin"
  | "resource"
  | "event"
  | "listing";

export type Level = "beginner" | "teacher" | "experienced-teacher" | "open";

export type TeachingFormat = "online" | "offline" | "hybrid";

export type PersonRole = "teacher" | "therapist" | "researcher" | "other";

export interface SourceRef {
  name: string;
  url: string;
}

export interface Plate {
  /** Optional real archival image path (public/assets/...) with required credit when present. */
  image?: string;
  credit: string;
  licence: string;
}

/** Common metadata carried by every content record. */
interface BaseContent {
  id: string;
  slug: string;
  /** True for clearly-marked placeholder content isolated under content/samples. */
  sample: boolean;
  /** Show on the homepage / hub featured slots. */
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// person  (§7.1 Teacher Directory)
// ---------------------------------------------------------------------------

export interface Person extends BaseContent {
  type: "person";
  name: string;
  location: string;
  /** Years / descriptor of experience. */
  experience: string;
  traditions: string[];
  areasOfTeaching: string[];
  qualifications: string[];
  languages: string[];
  teachingFormat: TeachingFormat;
  role: PersonRole;
  /** 100–150 word bio (§7.1). */
  bio: string;
  links: SourceRef[];
  /** Reviewed against published criteria — NOT an endorsement (§12). */
  verified: boolean;
  /** Flag, not a separate profile type (§7.2). */
  expert: boolean;
  /** Placeholder portrait treatment; never a real face in Phase A. */
  portraitTreatment?: "duotone" | "abstract" | "cropped";
}

// ---------------------------------------------------------------------------
// initiative  (§6.1 — always a Yoga Mandala programme)
// ---------------------------------------------------------------------------

export interface Initiative extends BaseContent {
  type: "initiative";
  origin: "yoga_mandala_initiative";
  title: string;
  initiativeType: string; // workshop / study circle / lecture / series / mentorship / other
  facilitator: string;
  facilitatorNote?: string;
  schedule: string;
  timezone: string;
  format: TeachingFormat;
  fee: string; // "Free" | "Paid" | "By contribution" — displayed only, no processing
  audience: string;
  description: string;
  /** Link-out registration only in Phase A. */
  registration?: SourceRef;
}

// ---------------------------------------------------------------------------
// bulletin  (§6.2 — external offerings, NEVER auto-labelled as a YM programme)
// ---------------------------------------------------------------------------

export interface Bulletin extends BaseContent {
  type: "bulletin";
  origin: "curated_external" | "partner_guest";
  title: string;
  submitter: string;
  category: string;
  source: SourceRef;
  description: string;
  /** ISO date; every listing carries an expiry/review date (§6.4). */
  expiry: string;
}

// ---------------------------------------------------------------------------
// resource  (§6.3 Library — link-only catalogue; rights + source REQUIRED)
// ---------------------------------------------------------------------------

export interface Resource extends BaseContent {
  type: "resource";
  title: string;
  author: string;
  subject: LibrarySubject;
  tradition: string;
  description: string;
  level: Level;
  /** REQUIRED by §6.3 — enforced by schema guard. */
  rights: string;
  /** REQUIRED by §6.3 — the legitimate access method (link-out). */
  source: SourceRef;
  plate?: Plate;
}

// ---------------------------------------------------------------------------
// event  (§9)
// ---------------------------------------------------------------------------

export interface EventItem extends BaseContent {
  type: "event";
  origin: "yoga_mandala_initiative" | "partner_guest";
  title: string;
  host: string;
  category: string; // Sangha Meetup / Study Circle / Expert Conversation / Workshop / ...
  /** ISO date. */
  date: string;
  time: string;
  location: string;
  online: boolean;
  audience: string;
  fee: string;
  description: string;
  registration?: SourceRef;
}

// ---------------------------------------------------------------------------
// listing  (§8 Sangha Board / community listing — unified shape)
// ---------------------------------------------------------------------------

export type ListingCategory =
  | "Looking for"
  | "Offering"
  | "Space"
  | "Project"
  | "Volunteer"
  | "Referral"
  | "Teacher exchange";

export interface Listing extends BaseContent {
  type: "listing";
  origin: "community_submission";
  title: string;
  category: ListingCategory;
  author: string;
  location: string;
  online: boolean;
  description: string;
  contactMethod: string; // never public personal details (§16)
  expiry: string;
}

// ---------------------------------------------------------------------------
// Library subjects (§6.3 — the 11 subjects, verbatim)
// ---------------------------------------------------------------------------

export type LibrarySubject =
  | "Yoga philosophy"
  | "Texts and commentaries"
  | "Asana and methodology"
  | "Anatomy and biomechanics"
  | "Pranayama"
  | "Meditation"
  | "Ayurveda"
  | "Sanskrit"
  | "Yoga history and culture"
  | "Research"
  | "Teaching methodology";

export type AnyContent =
  | Person
  | Initiative
  | Bulletin
  | Resource
  | EventItem
  | Listing;
