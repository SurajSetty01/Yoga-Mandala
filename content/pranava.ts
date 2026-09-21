/**
 * Praṇava's page content.
 *
 * Every sentence here is VERBATIM from one of the client's three documents. Nothing is
 * tightened, merged or improved — `npm run check:copy` walks these values and fails on any
 * string of four words or more that is not found in a source document.
 *
 * Sources:
 *   Context/new/Pranava About Page.docx   — the About page, section by section
 *   Context/new/Pranava Website.docx      — the conversion brief and navigation
 *   Context/Pranava Website Blueprint.pdf — the master spec (page requirements, §6)
 *
 * WHERE CONTENT DOES NOT EXIST, THIS FILE SAYS SO with `null` rather than inventing a
 * plausible substitute. The Blueprint's §16 lists what is still outstanding: faculty
 * biographies, programme descriptions, schedules, fees, testimonials, events, articles and
 * the Svasthya service descriptions. None of those may be filled in from imagination — an
 * earlier build published "700+ teachers across India and abroad", a figure in none of the
 * client's material, and that is the failure this file exists to prevent.
 */

export type Maybe<T> = T | null;

/* ── ABOUT ───────────────────────────────────────────────────────────────────
   Content complete. About document §§2-12. */
export const about = {
  hero: {
    heading: 'About Pranava',
    sub: 'A space for the study, practice and transmission of Yoga and India’s living knowledge traditions.',
    support:
      'Pranava is a centre dedicated to approaching Yoga as a complete discipline of study, practice and living — rooted in tradition, sustained through practice and explored through inquiry.',
  },

  /** §3. Five lines, in the client's order. The first is the shortest, and the claim. */
  intro: [
    'Yoga is more than a practice on the mat.',
    'Yoga is a vast body of knowledge — encompassing practice, philosophy, self-observation, discipline and ways of understanding life.',
    'At Pranava, we seek to engage with this knowledge with both reverence for its traditions and responsibility towards its contemporary practice.',
    'Our work brings together structured learning, sustained practice, teacher education, continuing inquiry and community.',
    'We believe that Yoga is best understood not merely by collecting techniques, but through a relationship between study, practice and experience.',
  ],

  /** §4. */
  what: {
    lead: 'A place to learn. A place to practise. A place to grow.',
    body: [
      'Pranava – Center for Indian Culture & Yogic Studies was established as a space for people who wish to engage with Yoga more deeply.',
      'This includes those beginning their journey, practitioners seeking a sustained Sādhana, teachers wishing to deepen their understanding, and those interested in exploring India’s wider knowledge traditions.',
      'Our programmes may take different forms — from regular practice and teacher education to workshops, intensives, retreats and study — but they share a common intention:',
    ],
    intention:
      'To create the conditions for deeper understanding through learning, practice and lived experience.',
  },

  /** §5. Four, and the fourth changes what the other three are for. */
  approach: {
    lead: 'Rooted in tradition. Alive in practice. Open to inquiry.',
    items: [
      {
        name: 'Tradition',
        body: 'We approach Yoga as part of India’s long and living traditions of knowledge and practice. Tradition gives us a foundation — not a collection of ideas to preserve untouched, but a body of knowledge to study, understand and practise responsibly.',
      },
      {
        name: 'Practice',
        body: 'Yoga cannot be understood through intellectual study alone. Practice allows knowledge to become experience. It requires consistency, observation, refinement and time.',
      },
      {
        name: 'Inquiry',
        body: 'We encourage students to ask questions. To understand why something is practised, not simply how it is performed. Study, questioning and reflection are integral to the learning process.',
      },
      {
        name: 'Transmission',
        body: 'Yoga is not simply information that can be packaged and delivered. It has traditionally moved through teacher, student, practice and lived experience. We therefore place importance on mentorship, sustained learning and the relationship between teacher and student.',
      },
    ],
  },

  /** §6. Eight practices; the client's list, in the client's order. */
  teach: {
    lead: 'Learning happens over time.',
    open: 'We do not believe that a certificate alone makes someone a Yoga teacher, nor that collecting techniques necessarily leads to deeper understanding.',
    prompt: 'Our educational approach encourages students to:',
    practices: [
      'Practise consistently',
      'Study the foundations of Yoga',
      'Observe their own experience',
      'Understand the principles behind practice',
      'Ask questions',
      'Learn from experienced teachers',
      'Develop the ability to teach responsibly',
      'Continue learning beyond a single course',
    ],
    close:
      'Teacher education, for us, is not only about learning how to conduct a class. It is about developing the understanding, discernment and responsibility required to guide another person’s practice.',
  },

  /** §7. The four doors — the same four the navigation uses. */
  journey: [
    {
      name: 'Learn',
      href: '/learn/',
      body: 'Study Yoga through structured education, teacher education, continuing education and focused study.',
    },
    {
      name: 'Practice',
      href: '/practice/',
      body: 'Develop a sustained practice through regular Sādhana, Asana, Prāṇāyāma, meditation, intensives and retreats.',
    },
    {
      name: 'Heal',
      href: '/heal/',
      body: 'An evolving area exploring Yoga and allied approaches to health and wellbeing.',
    },
    {
      name: 'Insights',
      href: '/insights/',
      body: 'A growing space for writing, reflection, study and exploration.',
    },
  ],

  /** §8. */
  founder: {
    kicker: 'Founded by Pranav Murthy',
    role: 'Yoga Teacher · Educator · Practitioner',
    body: [
      'Pranav Murthy began his Yoga practice in 2012 and gradually moved from a career in technology into full-time work in Yoga.',
      'His teaching journey has included work in large-scale Yoga education and wellness organisations, teacher training, curriculum development and the training of Yoga teachers.',
      'Over the years, his work has increasingly centred around Hatha Yoga, Asana, alignment, biomechanics, Yoga philosophy, Prāṇāyāma, Yoga therapy and teacher education.',
      'His approach draws from traditional Yoga teachings while engaging with contemporary understanding of anatomy, movement, health and education.',
      'Through Pranava, he seeks to create a space where Yoga can be studied with depth, practised with sincerity and transmitted responsibly.',
    ],
    quote:
      'The role of a teacher is not to create dependence, but to help the student develop the capacity to see, understand and practise for themselves.',
    action: 'Meet Pranav',
  },

  /**
   * §9. The brief asks for "faculty cards with photograph, name, areas of teaching and a link
   * to the profile" — and supplies none of those. `members` stays null until they arrive.
   */
  faculty: {
    lead: 'Learning is a shared journey.',
    body: [
      'Pranava brings together teachers and practitioners with different areas of experience and expertise. Our faculty contribute to teaching, mentorship, workshops, teacher education and specialised programmes.',
      'Each teacher brings their own experience while working within the larger intention of Pranava: to support sincere study and sustained practice.',
    ],
    members: null as Maybe<Array<{ name: string; teaches: string; href: string }>>,
  },

  /** §10. */
  seva: {
    lead: 'From individual practice to collective responsibility.',
    body: [
      'Pranava operates within a larger intention of service to the Yoga community.',
      'Praṇava Seva Trust works towards supporting the Yoga community and preserving India’s living knowledge traditions.',
    ],
    prompt: 'Its work includes initiatives around:',
    initiatives: [
      'Teacher development',
      'Scholarships and access to education',
      'Continuing learning',
      'Mentorship',
      'Community practice',
      'Knowledge-sharing initiatives',
    ],
    mandala:
      'Yoga Mandala is one such community initiative under Praṇava Seva Trust, bringing Yoga teachers and serious practitioners together to connect, learn, collaborate and share.',
  },

  /** §11. Four values, each one word and one line. */
  values: [
    { name: 'Sādhana', body: 'Consistent practice over quick results.' },
    { name: 'Adhyayana', body: 'Study and continued learning.' },
    { name: 'Viveka', body: 'Discernment and thoughtful application.' },
    { name: 'Sevā', body: 'Using knowledge in service of others.' },
  ],

  /** §12. */
  closing: {
    lead: 'There is always more to learn.',
    body: 'Whether you are beginning your journey with Yoga, seeking to deepen an established practice, preparing to teach, or simply wishing to understand these traditions more deeply, Pranava is a space to learn, practise and enquire.',
    call: 'Begin where you are.',
    actions: [
      { label: 'Explore Learning', href: '/learn/' },
      { label: 'Explore Practice', href: '/practice/' },
    ],
  },
} as const;

/**
 * ── PROGRAMMES ──────────────────────────────────────────────────────────────
 * Blueprint §4.3 names these and nothing more. There are NO descriptions, durations, fees
 * or schedules anywhere in the client's material, so there are none here. Learn and Practice
 * are built to present named programmes honestly and route an enquiry — not to display a
 * catalogue that does not exist.
 */
export const programmes = [
  { name: 'Pravesha', blurb: null as Maybe<string> },
  { name: 'Pragraha', blurb: null as Maybe<string> },
  { name: 'Prayatna', blurb: null as Maybe<string> },
  { name: 'Praguna', blurb: null as Maybe<string> },
  { name: 'Prabodha', blurb: null as Maybe<string> },
] as const;

/** Blueprint §3 — the four visitor journeys, in the document's own words. */
export const journeys = {
  learn: {
    intent: 'I want structured education',
    indicative:
      'Teacher education, courses, intensives, workshops and foundational/advanced study',
  },
  practice: {
    intent: 'I want consistent Sādhana',
    indicative: 'Regular practice programs, Prāṇāyāma, retreats and ongoing practice',
  },
  heal: {
    intent: 'I want health-oriented guidance',
    indicative:
      'Pranava Svasthya, Yoga Therapy, Ayurveda, Nutrition and Women’s Wellness',
  },
  insights: {
    intent: 'I want to understand more',
    indicative: 'Articles, journal, resources, FAQs and educational material',
  },
} as const;

/**
 * ── HEAL and INSIGHTS ───────────────────────────────────────────────────────
 * The Website brief §7 is explicit that both appear in the navigation now and are NOT built
 * out yet. These are the client's own words for what each will become.
 */
export const heal = {
  svasthya: 'Pranava Svasthya',
  areas: ['Yoga Therapy', 'Ayurveda', 'Nutrition', 'Women’s Wellness'],
  note: 'It will eventually connect with Pranava Svasthya and related work.',
} as const;

export const insights = {
  note: 'A full journal/blog can be developed later.',
  articles: null as Maybe<Array<{ title: string; href: string }>>,
} as const;

/** Events: none supplied. The page is a real structure with an honest empty state. */
export const events = {
  upcoming: null as Maybe<Array<{ name: string; when: string; mode: string }>>,
} as const;
