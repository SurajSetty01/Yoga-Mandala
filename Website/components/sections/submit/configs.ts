import type { FieldDef } from "./SubmitForm";
import { EVENT_CATEGORIES, LEVELS, LIBRARY_SUBJECTS, LISTING_CATEGORIES } from "@/lib/taxonomy";

/** Type-specific field configs for the four submission forms (§6/§8/§9/§13). */

export const EVENT_FIELDS: FieldDef[] = [
  { name: "title", label: "Event title", type: "text", required: true },
  { name: "category", label: "Type", type: "select", required: true, options: [...EVENT_CATEGORIES] },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "time", label: "Time", type: "text", placeholder: "e.g. 10:00 IST" },
  { name: "location", label: "Location or online", type: "text", required: true },
  { name: "audience", label: "Who is it for?", type: "text" },
  { name: "fee", label: "Fee", type: "text", hint: "Free, paid or by contribution — displayed, not collected here.", placeholder: "Free" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "registration", label: "Registration link", type: "url", hint: "Where people register (external)." },
];

export const LEARNING_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "kind", label: "Type", type: "select", options: ["Workshop", "Study circle", "Lecture", "Series", "Mentorship", "Other"] },
  { name: "facilitator", label: "Facilitator", type: "text", required: true },
  { name: "schedule", label: "Schedule", type: "text", placeholder: "e.g. Fortnightly, Sundays" },
  { name: "format", label: "Format", type: "select", options: ["Online", "In person", "Hybrid"] },
  { name: "fee", label: "Fee", type: "text", placeholder: "Free / paid / by contribution" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "link", label: "More info / registration link", type: "url" },
];

export const RESOURCE_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "author", label: "Author", type: "text", required: true },
  { name: "subject", label: "Subject", type: "select", required: true, options: [...LIBRARY_SUBJECTS] },
  { name: "tradition", label: "Context / tradition", type: "text" },
  { name: "level", label: "Recommended level", type: "select", options: LEVELS.map((l) => l.label) },
  { name: "description", label: "Short description", type: "textarea", required: true },
  { name: "rights", label: "Rights / source information", type: "text", required: true, hint: "Required — the Library links to legitimate sources and never hosts files." },
  { name: "access", label: "Access link", type: "url", required: true, hint: "A legitimate link to the text." },
];

export const LISTING_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "category", label: "Category", type: "select", required: true, options: [...LISTING_CATEGORIES] },
  { name: "location", label: "Location or online", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "contact", label: "How should people respond?", type: "text", hint: "A method, not your private number/email — contact routes through the portal." },
  { name: "expiry", label: "Open until", type: "date", hint: "Listings carry a review/expiry date." },
];
