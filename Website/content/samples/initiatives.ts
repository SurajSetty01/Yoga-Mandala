import type { Initiative } from "@/lib/types";

/**
 * SAMPLE content — Yoga Mandala Learning Initiatives.
 * All carry origin: yoga_mandala_initiative (always a YM programme). Marked sample; removed
 * at content handover. No real facilitator is named — placeholders only.
 */
export const SAMPLE_INITIATIVES: Initiative[] = [
  {
    type: "initiative",
    id: "study-circle-yoga-sutras",
    slug: "yoga-sutras-study-circle",
    origin: "yoga_mandala_initiative",
    sample: true,
    featured: true,
    title: "Reading the Yoga Sūtras, Together",
    initiativeType: "Study circle",
    facilitator: "Sample Facilitator",
    facilitatorNote: "[Facilitator profile pending — sample content]",
    schedule: "Fortnightly, Sundays · 8 sessions",
    timezone: "IST (GMT+5:30)",
    format: "online",
    fee: "By contribution",
    audience: "Teachers and serious practitioners",
    description:
      "A slow, close reading of Patañjali's Yoga Sūtras over eight sessions — one pāda at a time, with space for discussion and application to teaching. This is placeholder content demonstrating the initiative layout.",
    registration: { name: "Register (sample link)", url: "#" },
  },
  {
    type: "initiative",
    id: "mentorship-first-year",
    slug: "first-year-teaching-mentorship",
    origin: "yoga_mandala_initiative",
    sample: true,
    title: "The First Year of Teaching — a Mentorship",
    initiativeType: "Mentorship",
    facilitator: "Sample Facilitator",
    schedule: "Monthly · 6 months",
    timezone: "IST (GMT+5:30)",
    format: "hybrid",
    fee: "Free",
    audience: "Newly-qualified teachers",
    description:
      "A structured mentorship pairing experienced teachers with those in their first year of teaching. Placeholder content; real programmes are supplied by the community.",
  },
  {
    type: "initiative",
    id: "lecture-history-of-hatha",
    slug: "history-of-hatha-yoga-lecture",
    origin: "yoga_mandala_initiative",
    sample: true,
    title: "A Short History of Haṭha Yoga",
    initiativeType: "Lecture",
    facilitator: "Sample Facilitator",
    schedule: "Single session · 90 minutes",
    timezone: "IST (GMT+5:30)",
    format: "online",
    fee: "Free",
    audience: "Open to all members",
    description:
      "A single illustrated lecture tracing the development of Haṭha Yoga through its principal texts. Placeholder content demonstrating a lecture-type initiative.",
  },
];
