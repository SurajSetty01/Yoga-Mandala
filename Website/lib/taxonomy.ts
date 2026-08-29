import type { LibrarySubject, Level, ListingCategory, PersonRole, TeachingFormat } from "./types";

/**
 * Controlled vocabularies. The framework's filters only work if everyone picks from the same
 * list, so these are defined once and reused across directory filters, forms and content.
 * These are structural (kept minimal + sample-safe); the client confirms the real vocabularies.
 */

/** The 11 Library subjects (§6.3, verbatim). */
export const LIBRARY_SUBJECTS: LibrarySubject[] = [
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
];

export const LEVELS: { value: Level; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "teacher", label: "For teachers" },
  { value: "experienced-teacher", label: "Experienced teacher" },
  { value: "open", label: "Open to all" },
];

/** Directory filter vocabularies (§7.1's seven filters). Sample-safe starter sets. */
export const TRADITIONS = [
  "Haṭha",
  "Aṣṭāṅga",
  "Iyengar",
  "Viniyoga",
  "Kuṇḍalinī",
  "Yoga therapy",
  "Classical / Rāja",
  "Tantra",
] as const;

export const AREAS_OF_TEACHING = [
  "Āsana",
  "Prāṇāyāma",
  "Meditation",
  "Philosophy",
  "Yoga therapy",
  "Anatomy",
  "Sanskrit",
  "Teacher training",
] as const;

export const EXPERIENCE_BANDS = [
  "1–3 years",
  "3–7 years",
  "7–15 years",
  "15+ years",
] as const;

export const LANGUAGES = [
  "English",
  "Hindi",
  "Tamil",
  "Kannada",
  "Marathi",
  "Sanskrit",
  "Bengali",
  "Telugu",
] as const;

export const FORMATS: { value: TeachingFormat; label: string }[] = [
  { value: "online", label: "Online" },
  { value: "offline", label: "In person" },
  { value: "hybrid", label: "Online & in person" },
];

export const PERSON_ROLES: { value: PersonRole; label: string }[] = [
  { value: "teacher", label: "Teacher" },
  { value: "therapist", label: "Therapist" },
  { value: "researcher", label: "Researcher" },
  { value: "other", label: "Other" },
];

/** Sangha Board / community listing categories (§8). */
export const LISTING_CATEGORIES: ListingCategory[] = [
  "Looking for",
  "Offering",
  "Space",
  "Project",
  "Volunteer",
  "Referral",
  "Teacher exchange",
];

/** Event types (§9). */
export const EVENT_CATEGORIES = [
  "Sangha Meetup",
  "Study Circle",
  "Expert Conversation",
  "Community Workshop",
  "Reading Circle",
  "Learning Initiative",
  "Partner / External",
] as const;

/** The seven directory filter definitions (§7.1). */
export const DIRECTORY_FILTERS = [
  { key: "location", label: "City / region" },
  { key: "tradition", label: "Tradition / approach" },
  { key: "area", label: "Area of teaching" },
  { key: "experience", label: "Experience" },
  { key: "format", label: "Online / in person" },
  { key: "language", label: "Language" },
  { key: "role", label: "Role" },
] as const;

export type DirectoryFilterKey = (typeof DIRECTORY_FILTERS)[number]["key"];
