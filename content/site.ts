/**
 * Organisational facts and links for Praṇava.
 *
 * Every value here is either supplied by the client in writing or explicitly `null`.
 * `null` means "not yet supplied" and MUST render as nothing — never as a placeholder,
 * a guess, or a plausible-looking default. See design/CONTENT.md for provenance.
 *
 * An earlier build published "700+ teachers across India and abroad", a figure that appears
 * in none of the client's source material. No number describing size, reach or age belongs
 * here without a written source.
 *
 * SOURCE for this file: Context/new/Pranava Website.docx and Context/new/Pranava About
 * Page.docx, received 21 Sep 2026.
 */

export type Maybe<T> = T | null;

export const site = {
  /**
   * The client's documents write the name both with and without the diacritic — "Praṇava"
   * in running prose, "PRANAVA" in the navigation specification. The mark is kept in prose
   * and dropped in the wordmark, which is what they did.
   */
  name: 'Praṇava',
  wordmark: 'PRANAVA',
  descriptor: 'Center for Indian Culture & Yogic Studies',
  /** The full lockup, exactly as the brief writes it. */
  full: 'Praṇava – Center for Indian Culture & Yogic Studies',

  /** The Trust is the legal parent; Yoga Mandala is one initiative under it. */
  trust: 'Praṇava Seva Trust',

  locale: 'en-IN',
  lang: 'en-IN',

  /** Needed for canonical URLs, sitemap and Open Graph. Not yet supplied. */
  url: null as Maybe<string>,

  /**
   * Not supplied. The new brief asks the Contact page to cover "location", so this is now
   * blocking a section rather than merely absent — flagged in design/CONTENT.md.
   * "Bengaluru" may still appear in PHOTO CAPTIONS as provenance.
   */
  address: null as Maybe<string>,
} as const;

export const links = {
  /** wa.me requires E.164 with no '+' and no spaces. */
  whatsapp: 'https://wa.me/919110891897',
  whatsappDisplay: '+91 91108 91897',

  /**
   * OPEN QUESTION, carried over and now more pressing: this reads as a personal handle and
   * the brief asks for Praṇava's own social links. Confirm before launch.
   */
  instagram: 'https://www.instagram.com/thepranavshastri',

  /** The new brief's Contact page asks for email; none has been supplied. */
  emailGeneral: null as Maybe<string>,
  emailProgrammes: null as Maybe<string>,
  emailCollaborations: null as Maybe<string>,

  /** Yoga Mandala's own, carried over from its documents. */
  submitOffering: null as Maybe<string>,
} as const;

/**
 * NAME DISCREPANCY — do not silently reconcile.
 *
 * The Yoga Mandala contact document (9 Sep 2026) names the contact "Praṇav Śāstrī".
 * The Praṇava About brief (21 Sep 2026) says "Founded by Pranav Murthy".
 *
 * These are probably the same person — Śāstrī reads as a title rather than a surname — but
 * "probably" is not a source. `founder` follows the newer document because it is the one
 * that describes the founder; `yogaMandalaContact` keeps the older spelling because that is
 * how the Yoga Mandala material names him. Ask before unifying them.
 */
export const founder = {
  name: 'Pranav Murthy',
  role: 'Yoga Teacher · Educator · Practitioner',
} as const;

export const yogaMandalaContact = { name: 'Praṇav Śāstrī' } as const;

/**
 * The navigation, verbatim from the brief's "CHANGE TO" line:
 *   PRANAVA | About | Learn | Practice | Heal | Insights | Yoga Mandala | Events | Contact | Enquire
 *
 * Eight items plus a wordmark and a call to action — twice what the previous shell carried,
 * and the reason the header had to be re-measured rather than re-skinned.
 *
 * `soon` marks the two the brief explicitly says to ship as simple pages now and build
 * later: "These two items should appear in the main navigation now, but we do not need to
 * build them fully."
 */
export const nav = [
  { href: '/about/', label: 'About', full: 'About Praṇava' },
  { href: '/learn/', label: 'Learn', full: 'Learn' },
  { href: '/practice/', label: 'Practice', full: 'Practice' },
  { href: '/heal/', label: 'Heal', full: 'Heal', soon: true },
  { href: '/insights/', label: 'Insights', full: 'Insights', soon: true },
  { href: '/yoga-mandala/', label: 'Yoga Mandala', full: 'Yoga Mandala' },
  { href: '/events/', label: 'Events', full: 'Events' },
  { href: '/contact/', label: 'Contact', full: 'Contact' },
] as const;

/**
 * YOGA MANDALA's own pages. It is a section within Praṇava now, not a site, so its internal
 * routes are NOT in the main navigation — eight Praṇava items plus three Yoga Mandala ones
 * would bury the distinction the brief is at pains to make: "Yoga Mandala should be presented
 * as a community initiative under Praṇava Seva Trust, not as a Praṇava course."
 */
export const ymNav = [
  { href: '/yoga-mandala/', label: 'Yoga Mandala', full: 'Yoga Mandala' },
  { href: '/yoga-mandala/within/', label: 'Within', full: 'What Happens Within Yoga Mandala' },
  { href: '/yoga-mandala/join/', label: 'Join', full: 'Join / Connect' },
] as const;

/** The four pathways the homepage and the About page both present. */
export const pathways = [
  { key: 'learn', label: 'Learn', href: '/learn/' },
  { key: 'practice', label: 'Practice', href: '/practice/' },
  { key: 'heal', label: 'Heal', href: '/heal/' },
  { key: 'insights', label: 'Insights', href: '/insights/' },
] as const;

/** Praṇava's principles — About §5. NOT the same as the values below. */
export const principles = ['Tradition', 'Practice', 'Inquiry', 'Transmission'] as const;

/** What We Value — About §11. Sanskrit terms, kept with their diacritics. */
export const values = ['Sādhana', 'Adhyayana', 'Viveka', 'Sevā'] as const;

/**
 * CAREFUL — Yoga Mandala's two lists are NOT the same and the difference is the client's.
 *   tagline  Connect · Learn · Collaborate · Grow
 *   pillars  Connect · Learn · Collaborate · Share
 * Its second page is built on SHARE. Conflating them misrepresents their content.
 */
export const ymTagline = ['Connect', 'Learn', 'Collaborate', 'Grow'] as const;
export const ymPillars = ['Connect', 'Learn', 'Collaborate', 'Share'] as const;

export const taglines = {
  /** Praṇava's homepage line, from the website brief §4. */
  home: 'Yoga as a way of study, practice and living.',
  /** Yoga Mandala's, kept for its own section. */
  ymGuiding: 'Yoga is better when we learn together.',
  ymRise: 'Together, We Rise.',
} as const;
