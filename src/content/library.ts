import type { Resource } from "./types";

/**
 * LIBRARY — REAL CONTENT. Not sample data.
 *
 * §6.3 copyright principle, verbatim:
 *   "do not upload or redistribute protected books, recordings or documents
 *    without permission. Where rights are unclear, use legitimate links,
 *    bibliographic information or approved access methods."
 *
 * Every record below is a pre-1929 publication in the public domain, linked to
 * a verified Internet Archive scan. Nothing is hosted here. Cover plates are
 * served by archive.org. Every identifier returned HTTP 200 when checked.
 *
 * Caption wording: these describe the digitised edition scanned, not a specific
 * page. Some Archive items are later reprints of a public-domain translation,
 * so "title page, 1914" can be false even when the text is correctly dated.
 *
 * Deliberately absent: Anatomy and biomechanics, Research, and Teaching
 * methodology. No public-domain sources of quality exist for those three, and
 * inventing entries would be worse than an honest gap — see
 * docs/04-CLIENT-DATA-MASTER-LIST.md D6.
 */

const ia = (id: string) => ({
  name: "Internet Archive",
  url: `https://archive.org/details/${id}`,
});

/** `page/cover_w800.jpg` is the BookReader cover at 800px, not the 180px thumb. */
const plate = (id: string, subject: string) => ({
  subject,
  tone: "archive" as const,
  src: `https://archive.org/download/${id}/page/cover_w800.jpg`,
  credit: "Internet Archive",
  licence: "Public domain",
});

export const LIBRARY: Resource[] = [
  {
    type: "resource",
    slug: "yoga-system-of-patanjali-woods",
    title: "The Yoga System of Patañjali",
    titleDeva: "पातञ्जलयोगशास्त्र",
    author: "Translated by James Haughton Woods",
    subject: "Yoga philosophy",
    tradition: "Pātañjala / classical Sāṃkhya-Yoga",
    description:
      "The Yoga Sūtras together with Vyāsa's Bhāṣya and Vācaspati Miśra's Tattvavaiśāradī, in a scholarly English translation prepared for the Harvard Oriental Series. Dense and technical rather than devotional — the standard reference for anyone teaching the sūtras seriously.",
    level: "experienced-teacher",
    rights: "Public domain — published 1914",
    source: ia("yogasystemofpata00wooduoft"),
    plate: plate("yogasystemofpata00wooduoft", "Digitised edition — Harvard University Press, 1914"),
    featured: true,
    sample: false,
  },
  {
    type: "resource",
    slug: "hatha-yoga-pradipika-pancham-sinh",
    title: "Haṭha Yoga Pradīpikā",
    titleDeva: "हठयोगप्रदीपिका",
    author: "Svātmārāma, translated by Pancham Sinh",
    subject: "Asana and methodology",
    tradition: "Haṭha / Nātha",
    description:
      "The fifteenth-century compendium that organised haṭha practice into āsana, prāṇāyāma, mudrā and nādānusandhāna. Sinh's translation, from the Sacred Books of the Hindus series, presents the Sanskrit alongside the English.",
    level: "teacher",
    rights: "Public domain — Sacred Books of the Hindus, 1914–15",
    source: ia("sacredbooksofthehindusvol15part3hathayogapradipikapanchamsinh_202002"),
    plate: plate(
      "sacredbooksofthehindusvol15part3hathayogapradipikapanchamsinh_202002",
      "Digitised edition — Sacred Books of the Hindus, vol. 15",
    ),
    sample: false,
  },
  {
    type: "resource",
    slug: "gheranda-samhita-vasu",
    title: "The Gheraṇḍa Saṃhitā",
    titleDeva: "घेरण्डसंहिता",
    author: "Translated by Śrīśa Chandra Vasu",
    subject: "Pranayama",
    tradition: "Haṭha / ghaṭastha yoga",
    description:
      "A seven-limbed presentation of practice — cleansing, posture, mudrā, withdrawal, breath, meditation and absorption. Its prāṇāyāma and ṣaṭkarma material is more detailed than the Pradīpikā's, and useful when teaching breath work responsibly.",
    level: "teacher",
    rights: "Public domain — early twentieth-century translation",
    source: ia("55915gherandasamhitabyscvasu"),
    plate: plate("55915gherandasamhitabyscvasu", "Digitised edition — Vasu translation"),
    sample: false,
  },
  {
    type: "resource",
    slug: "shiva-samhita-1912",
    title: "Śiva Saṃhitā",
    titleDeva: "शिवसंहिता",
    author: "With Bhāṣā ṭīkā, Khemrāja Śrī Kṛṣṇadāsa edition",
    subject: "Meditation",
    tradition: "Haṭha / tantric",
    description:
      "A haṭha text unusual for addressing householder practitioners directly, and for the attention it gives to the subtle body and to meditative absorption. This 1912 edition carries a Hindi commentary alongside the Sanskrit.",
    level: "experienced-teacher",
    rights: "Public domain — published 1912",
    source: ia("xZIJ_shiva-samhita-with-bhasha-tika-by-khemraja-shri-krishnadas-1912-jangamwadi-math-collection"),
    plate: plate(
      "xZIJ_shiva-samhita-with-bhasha-tika-by-khemraja-shri-krishnadas-1912-jangamwadi-math-collection",
      "Digitised edition — 1912, Jangamwadi Math collection",
    ),
    sample: false,
  },
  {
    type: "resource",
    slug: "song-celestial-bhagavad-gita-arnold",
    title: "The Song Celestial, or Bhagavad-Gītā",
    titleDeva: "भगवद्गीता",
    author: "Translated by Sir Edwin Arnold",
    subject: "Texts and commentaries",
    tradition: "Vedāntic / epic",
    description:
      "Arnold's blank-verse rendering, the translation through which a great many English readers first met the Gītā. Read it for its cadence and its historical reach rather than for philological precision.",
    level: "open",
    rights: "Public domain — translation first published 1885",
    source: ia("songcelestial00magoog"),
    plate: plate("songcelestial00magoog", "Digitised edition — Arnold translation, 1886"),
    sample: false,
  },
  {
    type: "resource",
    slug: "upanishads-muller-sbe-1",
    title: "The Upaniṣads, Part I",
    titleDeva: "उपनिषद्",
    author: "Translated by F. Max Müller",
    subject: "Texts and commentaries",
    tradition: "Vedāntic",
    description:
      "Volume one of the Sacred Books of the East, containing the Chāndogya, Talavakāra, Aitareya, Kauṣītaki and Vājasaneyi Saṃhitā upaniṣads. Müller's introductions are dated in places but the translations remain a serviceable starting point.",
    level: "teacher",
    rights: "Public domain — Sacred Books of the East, 1879, this printing 1900",
    source: ia("beyq_the-sacred-books-of-the-east-ed-by-f-max-muller-vol-1-the-upanishads-part-1-1900"),
    plate: plate(
      "beyq_the-sacred-books-of-the-east-ed-by-f-max-muller-vol-1-the-upanishads-part-1-1900",
      "Digitised edition — Sacred Books of the East, vol. 1",
    ),
    sample: false,
  },
  {
    type: "resource",
    slug: "sanskrit-grammar-for-beginners-muller",
    title: "A Sanskrit Grammar for Beginners",
    author: "F. Max Müller",
    subject: "Sanskrit",
    tradition: "Philological",
    description:
      "A nineteenth-century primer in Devanāgarī and transliteration. Enough grammar to read a sūtra slowly and understand why a term has been translated the way it has — which is usually the point at which a teacher's relationship to the texts changes.",
    level: "beginner",
    rights: "Public domain — published 1886",
    source: ia("a-sanskrit-grammar-for-beginners-m-252-ller-f-max-1886"),
    plate: plate("a-sanskrit-grammar-for-beginners-m-252-ller-f-max-1886", "Digitised edition — Max Müller, 1886"),
    sample: false,
  },
  {
    type: "resource",
    slug: "sushruta-samhita-bhishagratna",
    title: "An English Translation of the Suśruta Saṃhitā",
    titleDeva: "सुश्रुतसंहिता",
    author: "Kaviraj Kunjalal Bhishagratna",
    subject: "Ayurveda",
    tradition: "Āyurvedic",
    description:
      "The surgical and anatomical classic of āyurveda, in the first complete English translation. Relevant to teachers working with injury, constitution and therapeutic language — and a reminder of how old and how specific that vocabulary is.",
    level: "experienced-teacher",
    rights: "Public domain — translation published 1907–1916",
    source: ia("englishtranslati01susruoft"),
    plate: plate("englishtranslati01susruoft", "Digitised edition — Bhishagratna, volume I"),
    sample: false,
  },
  {
    type: "resource",
    slug: "raja-yoga-vivekananda",
    title: "Rāja Yoga",
    author: "Swami Vivekananda",
    subject: "Yoga history and culture",
    tradition: "Neo-Vedāntic / modern",
    description:
      "Less useful as a translation of Patañjali than as the document that shaped how yoga was received in the twentieth century, in India and abroad. Read alongside Woods to see how much interpretation the modern reading carries.",
    level: "teacher",
    rights: "Public domain — first published 1896; this printing 1930",
    source: ia("qgaf_raja-yoga-or-conquering-the-internal-nature-by-swami-vivekananda-1930-mayavati-advaita-ashram"),
    plate: plate(
      "qgaf_raja-yoga-or-conquering-the-internal-nature-by-swami-vivekananda-1930-mayavati-advaita-ashram",
      "Digitised edition — Advaita Ashrama, 1930",
    ),
    sample: false,
  },
];

/** Subjects with no record yet — surfaced honestly on the Library page. */
export const LIBRARY_GAPS = ["Anatomy and biomechanics", "Research", "Teaching methodology"] as const;

export const featuredResource = () => LIBRARY.find((r) => r.featured) ?? LIBRARY[0];
