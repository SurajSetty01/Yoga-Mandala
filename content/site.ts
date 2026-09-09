/**
 * Organisational facts and links.
 *
 * Every value here is either supplied by the client in writing or explicitly `null`.
 * `null` means "not yet supplied" and MUST render as nothing — never as a placeholder,
 * a guess, or a plausible-looking default. See design/CONTENT.md for provenance.
 *
 * The previous build published "700+ teachers across India and abroad", a figure that
 * appears in none of the client's source material. No number describing this community's
 * size, reach or age belongs here without a written source.
 */

export type Maybe<T> = T | null;

export const site = {
  name: 'Yoga Mandala',
  descriptor: 'A Community of Yoga Teachers',

  /**
   * Confirmed by the client 9 Sep 2026: Yoga Mandala is an initiative under Pranava Seva
   * Trust and has no social presence of its own. This is why the Instagram link below is
   * Praṇava's rather than Yoga Mandala's, and why the footer carries a parent credit.
   */
  parentOrg: 'Pranava Seva Trust',

  locale: 'en-IN',
  lang: 'en-IN',

  /** Needed for canonical URLs, sitemap and Open Graph. Not yet supplied. */
  url: null as Maybe<string>,

  /**
   * Not supplied. Requested from the client 9 Sep 2026 and not answered.
   * "Bengaluru" may appear in PHOTO CAPTIONS as provenance — that is a fact about where a
   * picture was taken. It must not appear as the organisation's location until this is set.
   */
  address: null as Maybe<string>,
} as const;

export const links = {
  /** wa.me requires E.164 with no '+' and no spaces. */
  whatsapp: 'https://wa.me/919110891897',
  whatsappDisplay: '+91 91108 91897',

  /**
   * Praṇava's account, given by the client in place of a Yoga Mandala one.
   * The `?stkn=` share token they sent with it is deliberately stripped: it is a personal
   * session/attribution token and does not belong in published markup.
   * OPEN QUESTION: this reads as a personal handle, but the client was asked for the
   * Trust's socials. Confirm before launch.
   */
  instagram: 'https://www.instagram.com/thepranavshastri',

  /** Client's own document marks these [SUBMIT AN OFFERING] / [EMAIL ADDRESS]. */
  submitOffering: null as Maybe<string>,
  emailGeneral: null as Maybe<string>,
  emailCollaborations: null as Maybe<string>,
} as const;

export const contactPerson = { name: 'Praṇav Śāstrī' } as const;

/**
 * The four routes, in the client's own order, taken from their footer line:
 * "About Yoga Mandala | What Happens Within Yoga Mandala | Join / Connect | Contact".
 *
 * There is no fifth page. A refinement candidate invented a "Gatherings" nav item; the
 * client's document has no such page. `Sangha` is a sub-section of Page 2, not a route.
 */
export const nav = [
  { href: '/', label: 'About', full: 'About Yoga Mandala' },
  { href: '/within/', label: 'Within', full: 'What Happens Within Yoga Mandala' },
  { href: '/join/', label: 'Join', full: 'Join / Connect' },
  { href: '/contact/', label: 'Contact', full: 'Contact' },
] as const;

/**
 * CAREFUL — these two lists are NOT the same and the difference is the client's, not a typo.
 *
 *   tagline  Connect · Learn · Collaborate · Grow    (About page + footer)
 *   pillars  Connect · Learn · Collaborate · Share   (the four ideas of Page 2)
 *
 * Page 2 is built on SHARE, not Grow. Conflating them misrepresents the structure of the
 * client's own content, and it is an easy mistake to make from memory.
 */
export const tagline = ['Connect', 'Learn', 'Collaborate', 'Grow'] as const;
export const pillars = ['Connect', 'Learn', 'Collaborate', 'Share'] as const;

export const taglines = {
  guiding: 'Yoga is better when we learn together.',
  footerRise: 'Together, We Rise.',
  footerBetter: 'Yoga is better together.',
} as const;
