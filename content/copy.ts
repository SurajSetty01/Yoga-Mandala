/**
 * The client's words, verbatim.
 *
 * Source: Context/Website Pages Data.docx — "Yoga Mandala Website — V1 Content Framework".
 * Extracted from the .docx XML on 9 Sep 2026, not retyped and not from any earlier build.
 *
 * RULES FOR THIS FILE
 *  1. Sentences are the client's. Do not rewrite, tighten, merge, split or "improve" them.
 *  2. Short editorial headlines derived from this copy may live in the section components.
 *     They may not live here, because everything here is quotable back to the client.
 *  3. Nothing may be added. No counts, no dates, no locations, no testimonials, no
 *     credentials. If it is not below, the client did not say it.
 *  4. British spellings ("organisation", "recognise") are the client's own. Keep them.
 */

export const purpose = {
  intro: 'The first version of the Yoga Mandala website should be a simple, credible digital home for the community.',
  aims: [
    'Introduce Yoga Mandala and its purpose',
    'Explain what happens within the community',
    'Direct teachers and serious practitioners towards relevant initiatives and opportunities',
    'Provide a simple way to join and connect',
    'Provide a clear contact point',
  ],
  tone: 'The website should feel community-led, non-commercial, inclusive and professional.',
} as const;

/* ── PAGE 1 — ABOUT YOGA MANDALA ─────────────────────────────────────────── */

export const about = {
  title: 'About Yoga Mandala',
  opening: [
    'Yoga Mandala is a community of Yoga teachers and serious practitioners coming together to connect, learn, collaborate and grow.',
    'Yoga is a vast tradition, and no single teacher can know everything. Yoga Mandala was created with the simple belief that the Yoga community becomes stronger when teachers share knowledge, experiences, opportunities and resources with one another.',
    'What began as a conversation between Yoga teachers is growing into a wider community where teachers from different backgrounds, traditions and levels of experience can come together.',
  ],
  purpose: {
    heading: 'Our Purpose',
    lead: 'Yoga Mandala exists to create a space where Yoga teachers can:',
    items: [
      { name: 'Connect', line: 'Build meaningful relationships with fellow teachers and practitioners.' },
      { name: 'Learn', line: 'Discover authentic learning opportunities, study resources, discussions and initiatives that support continued learning.' },
      { name: 'Collaborate', line: 'Find opportunities to work together, exchange expertise and create meaningful projects.' },
      { name: 'Grow', line: 'Support one another in becoming better teachers, practitioners and contributors to the Yoga community.' },
    ],
  },
  approach: {
    heading: 'Our Approach',
    lines: [
      'Yoga Mandala is not intended to represent one particular school, lineage, organisation or methodology.',
      'It is a community for the wider Yoga teaching ecosystem.',
      'We welcome sincere engagement across different traditions and approaches while encouraging responsible teaching, continuous learning, mutual respect and thoughtful dialogue.',
    ],
  },
  members: {
    heading: 'A Community Built by Its Members',
    lines: [
      'Yoga Mandala is not meant to be a platform where a few people provide everything for everyone else.',
      'The strength of the community comes from its members.',
      'A teacher may contribute knowledge one day, seek guidance the next, recommend a resource another day, and collaborate with another teacher sometime later.',
      'Everyone has something to learn. Everyone has something to contribute.',
    ],
  },
  guiding: { heading: 'Our Guiding Thought', line: 'Yoga is better when we learn together.' },
} as const;

/* ── PAGE 2 — WHAT HAPPENS WITHIN YOGA MANDALA ───────────────────────────── */

export const within = {
  title: 'What Happens Within Yoga Mandala',
  lead: 'Yoga Mandala is built around four simple ideas:',

  /** 01–04. The fourth is SHARE, not Grow — see the note in content/site.ts. */
  pillars: [
    {
      index: '01',
      name: 'Connect',
      lines: [
        'The Yoga teaching profession can sometimes feel isolated.',
        'Yoga Mandala provides opportunities for teachers to meet one another, exchange experiences and build genuine professional and personal connections.',
      ],
      listLead: 'This includes:',
      items: [
        'Community discussions',
        'Local Sangha meetups',
        'Teacher introductions',
        'Conversations between teachers',
        'Opportunities to discover people with shared interests',
      ],
    },
    {
      index: '02',
      name: 'Learn',
      lines: [
        'Teaching Yoga is a lifelong learning journey.',
        'The community encourages teachers to continue studying beyond their initial teacher training through:',
      ],
      listLead: null,
      items: [
        'Learning initiatives',
        'Study circles',
        'Reading circles',
        'Expert conversations',
        'Workshops and courses',
        'Knowledge-sharing sessions',
        'Relevant books and study resources',
      ],
    },
    {
      index: '03',
      name: 'Collaborate',
      lines: [
        'Some of the most meaningful opportunities emerge when teachers come together.',
        'Yoga Mandala aims to make it easier for members to discover and build:',
      ],
      listLead: null,
      items: [
        'Teaching collaborations',
        'Workshops',
        'Study projects',
        'Community initiatives',
        'Professional opportunities',
        'Knowledge-sharing projects',
        'Local gatherings and Sanghas',
      ],
    },
    {
      index: '04',
      name: 'Share',
      lines: ['The community is also a place to give back.'],
      listLead: 'Members are encouraged to share:',
      items: [
        'Knowledge',
        'Experiences',
        'Books and resources',
        'Relevant opportunities',
        'Questions and insights',
        'Useful connections',
      ],
      closing: 'The intention is to create a culture where teachers help teachers.',
    },
  ],

  initiatives: {
    heading: 'Community Initiatives',
    lead: 'Yoga Mandala is gradually developing several initiatives to support this ecosystem.',
    entries: [
      {
        name: 'Yoga Mandala Learning Initiative',
        lines: ['Learning experiences organised or supported specifically for the Yoga Mandala community.'],
        listLead: 'These may include:',
        items: [
          'Teacher-focused workshops',
          'Study initiatives',
          'Expert sessions',
          'Reading circles',
          'Community learning sessions',
          'Special learning opportunities',
        ],
      },
      {
        name: 'Yoga Mandala Curation & Learning Bulletin',
        lines: ['A curated collection of relevant learning opportunities from within and outside the community.'],
        listLead: 'This may include:',
        items: [
          'Workshops',
          'Courses',
          'Teacher trainings',
          'Retreats',
          'Study circles',
          'Events',
          'Other relevant opportunities for Yoga teachers and serious practitioners',
        ],
        closing: [
          'Not every submission is published.',
          'The Bulletin is curated to maintain relevance, quality and usefulness for the community.',
        ],
      },
      {
        name: 'Sangha',
        lines: [
          'Yoga Mandala encourages local communities of teachers to meet in person, beginning with regional Sanghas and gatherings.',
          'These gatherings provide an opportunity to move beyond being a WhatsApp group and develop genuine relationships within the Yoga community.',
        ],
        listLead: null,
        items: [],
      },
      {
        /** A Praṇava offering surfaced within Yoga Mandala — label it as such, never as YM's own. */
        name: 'Pranava Vaakya',
        lines: [
          'A community-oriented space for Yoga teachers to share their perspectives, experiences and voices on matters relevant to the profession and the wider Yoga ecosystem.',
        ],
        listLead: null,
        items: [],
      },
    ],
  },
} as const;

/* ── PAGE 3 — JOIN / CONNECT ─────────────────────────────────────────────── */

export const join = {
  title: 'Join Yoga Mandala',
  main: [
    'Are you a Yoga teacher or a serious Yoga practitioner looking to connect with others who are equally committed to learning, teaching and growing?',
    'You are welcome to be part of Yoga Mandala.',
    'The community is built around meaningful conversations, learning, collaboration and knowledge sharing.',
  ],
  community: {
    heading: 'Join the Community',
    action: 'Join the Yoga Mandala WhatsApp Community',
    lead: 'The WhatsApp community is currently the primary space where members:',
    items: [
      'Participate in discussions',
      'Ask questions',
      'Share knowledge',
      'Discover opportunities',
      'Participate in initiatives',
      'Receive community announcements',
      'Connect with fellow teachers',
    ],
  },
  contribute: {
    heading: 'For Teachers Who Want to Contribute',
    lines: ['Yoga Mandala is not only about receiving.'],
    listLead: 'If you have:',
    items: [
      'Knowledge you would like to share',
      'A book or resource worth making accessible',
      'An initiative you would like to contribute to',
      'An idea for a community project',
      'An opportunity for fellow Yoga teachers',
      'Expertise that could benefit the community',
    ],
    closing: 'We would love to hear from you.',
    action: 'Get in touch',
  },
  submissions: {
    heading: 'For Learning & Program Submissions',
    lines: [
      'Teachers and organisations wishing to share a relevant workshop, course, retreat, training or other learning opportunity can submit their offering for consideration through the:',
    ],
    via: 'Yoga Mandala Curation & Learning Bulletin',
    action: 'Submit an offering',
    note: 'Please note that submission does not guarantee publication. All submissions are reviewed for relevance to the Yoga Mandala community.',
  },
} as const;

/* ── PAGE 4 — CONTACT ────────────────────────────────────────────────────── */

export const contact = {
  title: 'Connect With Us',
  general: {
    heading: 'General Enquiries',
    lead: 'For questions about Yoga Mandala, community initiatives, collaborations or participation:',
  },
  collaborations: {
    heading: 'Collaborations',
    lead: 'Interested in collaborating with Yoga Mandala?',
    listLead: 'We are open to conversations around:',
    items: [
      'Community learning',
      'Knowledge-sharing initiatives',
      'Teacher collaborations',
      'Local Sanghas',
      'Study circles',
      'Events',
      'Resources',
      'Other initiatives that can meaningfully contribute to the Yoga community',
    ],
    action: 'Write to us',
  },
  social: { heading: 'Social' },
} as const;

/* ── FOOTER ──────────────────────────────────────────────────────────────── */

/**
 * The footer is Praṇava's now.
 *
 * `rise` and `better` are YOGA MANDALA's closing lines and stay with Yoga Mandala — putting
 * "Together, We Rise." under an institutional About page would be borrowing a community's
 * voice for an institution that is not that community. They are kept here because
 * /yoga-mandala/* still uses them.
 *
 * The parent credit was "{site.name} is an initiative under {site.trust}", which after the
 * rename rendered as "Praṇava is an initiative under Praṇava Seva Trust" — circular, and
 * asserted by no document. What the documents DO say, twice, is that YOGA MANDALA is a
 * community initiative under the Trust. That is the sentence that is true.
 */
export const footer = {
  name: 'Praṇava',
  descriptor: 'Center for Indian Culture & Yogic Studies',
  /* An ARRAY, not a joined string: the four words are the client's and the separator is
     ours, so joining them here would create a sentence no document contains and the copy
     check would be right to flag it. The component joins them for display. */
  register: ['Learn', 'Practice', 'Heal', 'Insights'],
  ym: {
    name: 'Yoga Mandala',
    rise: 'Together, We Rise.',
    better: 'Yoga is better together.',
  },
} as const;

/**
 * Pranava content lives in its own module: it comes from different documents and is checked
 * against them. Re-exported here so tools/check-copy-fidelity.mts, which walks this module,
 * verifies it too.
 */
export * as pranava from "./pranava";
