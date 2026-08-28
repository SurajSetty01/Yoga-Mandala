/**
 * Navigation — from docs/01-SITEMAP-LOCKED.md. Routes are frozen for Phase A.
 *
 * The 8-item primary nav is §4's "Recommended V1 navigation", verbatim.
 * /connect/sangha is deliberately absent: "Sangha" is used five ways in the
 * framework and nothing defines this fifth one. See docs/pages/P13-sangha.md.
 */

export const SITE = {
  name: "Yoga Mandala",
  tagline: "Learn. Connect. Collaborate. Serve.",
  description:
    "A community of Yoga teachers and serious practitioners building a culture of continuous learning, meaningful collaboration and responsible teaching.",
  url: "https://yogamandala.example",
} as const;

export type NavChild = { label: string; href: string; note: string; forthcoming?: boolean };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "Learn",
    href: "/learn",
    children: [
      {
        label: "Learning Initiatives",
        href: "/learn/initiatives",
        note: "Programmes organised or endorsed by Yoga Mandala",
      },
      {
        label: "Curation & Learning Bulletin",
        href: "/learn/bulletin",
        note: "External offerings selected for relevance",
      },
      { label: "Library", href: "/learn/library", note: "A catalogue of texts, commentaries and research" },
      { label: "Reading Circle", href: "/learn/reading-circle", note: "One text, read together, over a season" },
      {
        label: "Teacher's Desk",
        href: "/learn/teachers-desk",
        note: "Knowledge and discussion between teachers",
        forthcoming: true,
      },
    ],
  },
  {
    label: "Connect",
    href: "/connect",
    children: [
      {
        label: "Teacher Directory",
        href: "/connect/directory",
        note: "Find teachers by place, tradition and practice",
      },
      { label: "Experts", href: "/connect/experts", note: "Members offering their time to the community" },
    ],
  },
  { label: "Collaborate", href: "/collaborate" },
  { label: "Events", href: "/events" },
  { label: "Discover", href: "/discover" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Yoga Mandala", href: "/about", note: "What this community is, and what it is not" },
      { label: "Community Principles", href: "/about/principles", note: "How we participate together" },
      { label: "Governance & Ownership", href: "/about/governance", note: "Who holds what, and why" },
      { label: "Contact", href: "/about/contact", note: "General, moderation and data enquiries" },
    ],
  },
];

/** §5: "Footer with community links, governance/contact and submission links." */
export const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Learn", href: "/learn" },
      { label: "Connect", href: "/connect" },
      { label: "Collaborate", href: "/collaborate" },
      { label: "Events", href: "/events" },
      { label: "Discover", href: "/discover" },
    ],
  },
  {
    heading: "Participate",
    links: [
      { label: "Join the Sangha", href: "/join" },
      { label: "Submit an event", href: "/submit/event" },
      { label: "Submit a learning opportunity", href: "/submit/learning-opportunity" },
      { label: "Submit a resource", href: "/submit/resource" },
      { label: "Submit a community listing", href: "/submit/listing" },
    ],
  },
  {
    heading: "Governance",
    links: [
      { label: "About Yoga Mandala", href: "/about" },
      { label: "Community Principles", href: "/about/principles" },
      { label: "Community Guidelines", href: "/guidelines" },
      { label: "Governance & Ownership", href: "/about/governance" },
      { label: "Privacy", href: "/privacy" },
      { label: "Participation & Terms", href: "/terms" },
      { label: "Contact & Moderation", href: "/about/contact" },
    ],
  },
] as const;

/** §1 pillar table, verbatim. `subject` is the photographic brief for the slot. */
export const PILLARS = [
  {
    name: "Learn",
    meaning: "Structured learning, resources, study and teacher development.",
    href: "/learn",
    subject: "A teacher reading, annotated pages open on a low desk, morning light",
  },
  {
    name: "Connect",
    meaning: "Find fellow teachers, practitioners, experts and community members.",
    href: "/connect",
    subject: "Two teachers in conversation after a session, seated on the floor",
  },
  {
    name: "Collaborate",
    meaning: "Share opportunities, spaces, projects, referrals and professional needs.",
    href: "/collaborate",
    subject: "A small group planning around a table, notes and a laptop, unposed",
  },
  {
    name: "Serve",
    meaning: "Contribute knowledge, volunteer, mentor and strengthen the wider Yoga ecosystem.",
    href: "/submit",
    subject: "An older teacher demonstrating something to a younger one, hands in frame",
  },
] as const;
