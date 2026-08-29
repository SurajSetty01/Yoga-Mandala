import type { Bulletin } from "@/lib/types";

/**
 * SAMPLE content — Curation & Learning Bulletin (external offerings).
 * These are NOT Yoga Mandala programmes (§6.2). Every entry is curated_external or
 * partner_guest and carries an expiry. Sources are placeholder links. Marked sample.
 */
export const SAMPLE_BULLETIN: Bulletin[] = [
  {
    type: "bulletin",
    id: "bulletin-anatomy-intensive",
    slug: "functional-anatomy-intensive",
    origin: "curated_external",
    sample: true,
    featured: true,
    title: "Functional Anatomy for Yoga Teachers — Intensive",
    submitter: "Curation team",
    category: "Continuing education",
    source: { name: "Organiser (sample link)", url: "#" },
    description:
      "An external weekend intensive on functional anatomy, selected for relevance to teachers. Placeholder content; the Curation & Learning Bulletin surfaces external opportunities worth a teacher's attention.",
    expiry: "2026-12-15",
  },
  {
    type: "bulletin",
    id: "bulletin-sanskrit-course",
    slug: "introductory-sanskrit-online",
    origin: "curated_external",
    sample: true,
    title: "Introductory Sanskrit for Practitioners",
    submitter: "Member submission",
    category: "Language & study",
    source: { name: "Organiser (sample link)", url: "#" },
    description:
      "An online introductory Sanskrit course run by an external provider. Placeholder content demonstrating a curated external listing.",
    expiry: "2026-11-30",
  },
  {
    type: "bulletin",
    id: "bulletin-therapy-conference",
    slug: "yoga-therapy-conference",
    origin: "partner_guest",
    sample: true,
    title: "Yoga Therapy Research Conference",
    submitter: "Partner organisation",
    category: "Conference",
    source: { name: "Organiser (sample link)", url: "#" },
    description:
      "A partner-organised conference on Yoga therapy research. Labelled Partner / Guest to keep the distinction from Yoga Mandala's own programmes clear. Placeholder content.",
    expiry: "2027-02-01",
  },
  {
    type: "bulletin",
    id: "bulletin-retreat-silence",
    slug: "silent-study-retreat",
    origin: "curated_external",
    sample: true,
    title: "A Silent Study Retreat",
    submitter: "Curation team",
    category: "Retreat",
    source: { name: "Organiser (sample link)", url: "#" },
    description:
      "An external residential retreat combining silence and text study. Placeholder content demonstrating a curated retreat listing.",
    expiry: "2027-01-20",
  },
  {
    type: "bulletin",
    id: "bulletin-teacher-training",
    slug: "advanced-teacher-training",
    origin: "curated_external",
    sample: true,
    title: "Advanced Teacher Training — External Programme",
    submitter: "Member submission",
    category: "Teacher training",
    source: { name: "Organiser (sample link)", url: "#" },
    description:
      "An external advanced teacher-training programme submitted by a member and selected for relevance. Placeholder content.",
    expiry: "2027-03-10",
  },
  {
    type: "bulletin",
    id: "bulletin-book-study",
    slug: "book-study-the-gita",
    origin: "curated_external",
    sample: true,
    title: "A Reading Group on the Bhagavad Gītā",
    submitter: "Curation team",
    category: "Reading group",
    source: { name: "Organiser (sample link)", url: "#" },
    description:
      "An external online reading group working through the Bhagavad Gītā. Placeholder content demonstrating a curated study listing.",
    expiry: "2026-12-01",
  },
];
