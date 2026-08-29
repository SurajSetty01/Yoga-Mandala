import type { EventItem } from "@/lib/types";

/**
 * SAMPLE content — Events. Origin drives the badge (YM initiative vs partner/guest).
 * Registration links out only in Phase A. Marked sample; removed at content handover.
 */
export const SAMPLE_EVENTS: EventItem[] = [
  {
    type: "event",
    id: "event-monthly-sangha",
    slug: "monthly-sangha-meetup",
    origin: "yoga_mandala_initiative",
    sample: true,
    featured: true,
    title: "Monthly Sangha Meetup",
    host: "Yoga Mandala",
    category: "Sangha Meetup",
    date: "2026-09-20",
    time: "10:00 IST",
    location: "Bengaluru (and online)",
    online: true,
    audience: "All members",
    fee: "Free",
    description:
      "The regular gathering of the Sangha — teaching notes, questions and connection. Placeholder content demonstrating the event layout.",
    registration: { name: "Register (sample link)", url: "#" },
  },
  {
    type: "event",
    id: "event-expert-conversation",
    slug: "expert-conversation-yoga-therapy",
    origin: "yoga_mandala_initiative",
    sample: true,
    title: "Expert Conversation: Yoga & Therapy",
    host: "Yoga Mandala",
    category: "Expert Conversation",
    date: "2026-10-05",
    time: "18:30 IST",
    location: "Online",
    online: true,
    audience: "Teachers and therapists",
    fee: "Free",
    description:
      "A moderated conversation with experienced members on Yoga in therapeutic contexts. Placeholder content.",
    registration: { name: "Register (sample link)", url: "#" },
  },
  {
    type: "event",
    id: "event-study-circle",
    slug: "study-circle-pranayama",
    origin: "yoga_mandala_initiative",
    sample: true,
    title: "Study Circle: The Breath in the Texts",
    host: "Yoga Mandala",
    category: "Study Circle",
    date: "2026-10-19",
    time: "08:00 IST",
    location: "Online",
    online: true,
    audience: "Serious practitioners",
    fee: "By contribution",
    description:
      "A study circle reading classical sources on prāṇāyāma. Placeholder content demonstrating a study-circle event.",
  },
  {
    type: "event",
    id: "event-partner-workshop",
    slug: "partner-workshop-alignment",
    origin: "partner_guest",
    sample: true,
    title: "Partner Workshop: Alignment & Adjustment",
    host: "Partner Studio (sample)",
    category: "Partner / External",
    date: "2026-11-02",
    time: "14:00 IST",
    location: "Chennai",
    online: false,
    audience: "Teachers",
    fee: "Paid",
    description:
      "An in-person workshop hosted by a partner studio, labelled Partner / Guest to keep it distinct from Yoga Mandala's own events. Placeholder content.",
    registration: { name: "Register on organiser's site (sample)", url: "#" },
  },
];
