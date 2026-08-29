/**
 * Navigation model, derived from the locked sitemap (docs/01-sitemap-and-routing.md).
 * `/connect/sangha` is intentionally absent until the client defines it (C3).
 */

export interface NavChild {
  label: string;
  href: string;
  /** short editorial descriptor shown in the mega-panel */
  blurb: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "Learning Initiatives", href: "/learn/initiatives", blurb: "Yoga Mandala's own study circles, mentorships and lectures." },
      { label: "Curation & Learning Bulletin", href: "/learn/bulletin", blurb: "External opportunities, selected for relevance." },
      { label: "Library", href: "/learn/library", blurb: "A catalogue of foundational texts — links, never files." },
      { label: "Reading Circle", href: "/learn/reading-circle", blurb: "A shared, slow reading of one text at a time." },
      { label: "Teacher's Desk", href: "/learn/teachers-desk", blurb: "A place for questions among teachers. Forthcoming." },
    ],
  },
  {
    label: "Connect",
    href: "/connect",
    children: [
      { label: "Teacher Directory", href: "/connect/directory", blurb: "Find a fellow teacher by tradition, place, language and more." },
      { label: "Experts", href: "/connect/experts", blurb: "Members willing to contribute to study and mentoring." },
    ],
  },
  { label: "Collaborate", href: "/collaborate" },
  { label: "Events", href: "/events" },
  { label: "Discover", href: "/discover" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Yoga Mandala", href: "/about", blurb: "What this is, and the principle it's built on." },
      { label: "Community Principles", href: "/about/principles", blurb: "How the community holds itself — published openly." },
      { label: "Governance & Ownership", href: "/about/governance", blurb: "Community-led, not developer-led." },
      { label: "Contact & Moderation", href: "/about/contact", blurb: "How to reach the people who keep this place." },
    ],
  },
];

/** The Join/Submit nav item is rendered as a button, separately. */
export const JOIN_HREF = "/join";

export const FOOTER_EXPLORE: NavChild[] = [
  { label: "Learn", href: "/learn", blurb: "" },
  { label: "Connect", href: "/connect", blurb: "" },
  { label: "Collaborate", href: "/collaborate", blurb: "" },
  { label: "Events", href: "/events", blurb: "" },
  { label: "Discover", href: "/discover", blurb: "" },
];

export const FOOTER_PARTICIPATE: NavChild[] = [
  { label: "Join the Sangha", href: "/join", blurb: "" },
  { label: "Submit an Event", href: "/submit/event", blurb: "" },
  { label: "Submit a Learning Opportunity", href: "/submit/learning-opportunity", blurb: "" },
  { label: "Submit a Resource", href: "/submit/resource", blurb: "" },
  { label: "Submit a Community Listing", href: "/submit/listing", blurb: "" },
];

export const FOOTER_GOVERNANCE: NavChild[] = [
  { label: "About", href: "/about", blurb: "" },
  { label: "Community Principles", href: "/about/principles", blurb: "" },
  { label: "Community Guidelines", href: "/guidelines", blurb: "" },
  { label: "Governance & Ownership", href: "/about/governance", blurb: "" },
  { label: "Privacy", href: "/privacy", blurb: "" },
  { label: "Terms", href: "/terms", blurb: "" },
  { label: "Contact & Moderation", href: "/about/contact", blurb: "" },
];
