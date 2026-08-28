# 05 — Phase A Build Manifest

**What gets built now, without any input from the client, and in what order.**

---

## 1. Definition of Phase A

A complete, navigable, art-directed **public website** running on structured local content files — no database, no authentication, no backend. Every page from the locked sitemap exists and is designed. Real content where it can be sourced legitimately; clearly-marked sample content everywhere else.

At the end of Phase A the client sees a finished-looking website and can react to it. Reacting to something concrete is how we extract the decisions the meeting prep document is chasing.

---

## 2. Build order

Sequenced so that each stage de-risks the next. **Review gate after every stage** — per the client's own instruction not to one-shot the site.

| Stage | What | Depends on | Client input needed |
|---|---|---|---|
| **0** | Project setup, content-file schema for the 6 content types, image pipeline | — | None |
| **1** | Design system implemented: type scale, colour tokens, spacing, motion primitives, the 10 image treatments as reusable primitives | Stage 0 | None (palette approval ideal) |
| **2** | **P00 Global shell** — header, navigation, footer, page transitions, 404 | Stage 1 | Logo (workaround: wordmark) |
| **3** | **P01 Home** — the full homepage, all sections | Stage 2 | None |
| **4** | **P07 Library** — real public-domain content | Stage 2 | None |
| **5** | **P04 Learn hub**, **P09 Connect hub** | Stage 3 | None |
| **6** | **P05 Initiatives**, **P06 Bulletin**, **P08 Reading Circle** | Stage 5 | None (samples) |
| **7** | **P10 Directory**, **P11 Profile**, **P12 Experts** | Stage 5 | None (placeholders) |
| **8** | **P15 Events**, **P16 Discover**, **P14 Sangha Board** | Stage 5 | None (samples) |
| **9** | **P02 About**, **P03 Principles**, **P17 Teacher's Desk concept** | Stage 2 | About needs B1/B2 — build shell first |
| **10** | **P18 Join**, **P19 Submit forms** (visual only, no submission) | Stage 2 | None |
| **11** | **P20 policy shells**, `/guidelines` from §14 | Stage 2 | Privacy/terms blocked |
| **12** | Integration pass: whole-site review, section-repetition audit, motion audit, responsive pass, performance pass, accessibility pass | All | None |

**Stages 3–11 are largely parallelisable** once the design system and shell exist. Stages 0–2 are strictly sequential and are the critical path.

---

## 3. Fully unblocked — needs nothing from the client

| Page | Content source |
|---|---|
| **P00 Global shell** | Nav labels from the locked sitemap; wordmark set in the display face until a logo arrives |
| **P01 Home** | Framework §5 gives all 9 homepage sections verbatim; §1 gives the pillars; hero copy is quoted directly from the framework |
| **P03 Community Principles** | §14 provides the complete guidelines list, quotable nearly verbatim |
| **P04 Learn hub** | §6 and §3 describe every child module |
| **P07 Library** | §6.3 gives the 11 subjects and the metadata schema; the content is genuine public-domain texts (see §4 below) |
| **P09 Connect hub** | §7 describes directory and experts |
| **P12 Experts** | §7.2 defines it; built as a filtered directory view |
| **P17 Teacher's Desk** | §11 gives the 12 topics; built as a concept/preview page, not a forum |
| **/guidelines** | §14, adaptable near-verbatim |

## 4. The Library is genuinely real content — no client needed

§6.3's copyright rule — *"do not upload or redistribute protected books... use legitimate links, bibliographic information or approved access methods"* — is satisfied perfectly by public-domain sources. These are real, findable, legally clean entries with real scanned covers available as archival imagery:

| Text | Public-domain edition | Subject |
|---|---|---|
| Yoga Sūtras of Patañjali | Vivekananda (1896); Woods, *The Yoga System of Patañjali* (1914) | Philosophy |
| Haṭha Yoga Pradīpikā | Pancham Sinh translation (1914) | Asana & methodology |
| Gheraṇḍa Saṃhitā | Rai Bahadur Srisa Chandra Vasu (1914) | Methodology, pranayama |
| Śiva Saṃhitā | Vasu (1914) | Philosophy |
| Bhagavad Gītā | Edwin Arnold (1885); Besant (1895) | Philosophy |
| Principal Upaniṣads | Max Müller, *Sacred Books of the East* (1879–84) | Texts & commentaries |
| Suśruta / Caraka Saṃhitā (selections) | Early 20th-c. translations | Ayurveda |
| Sanskrit grammar primers | Monier-Williams; Macdonell | Sanskrit |

Each entry gets the full §6.3 metadata: *title, author, subject, context/tradition, short description, recommended level, source/rights information, access method* — with the access method being a link to Internet Archive or a comparable legitimate host. **This single page demonstrates the whole curation model working, with zero client dependency.**

## 5. Built with clearly-marked sample content

These pages are fully designed and functional; only their entries are placeholders. Each sample entry carries a visible `Sample content` marker, and all samples live in one directory so they can be deleted in a single commit at content handover.

P05 Initiatives · P06 Bulletin · P08 Reading Circle · P10 Directory · P11 Profile · P14 Sangha Board · P15 Events · P16 Discover

**Sample content follows the integrity rules in [03-ASSET-STRATEGY §6](03-ASSET-STRATEGY.md)** — no invented people, no invented credentials, no fabricated quotes.

## 6. Built as UI only, no backend

P18 Join · P19 Submit hub + 4 forms. Fields, validation states, multi-step flow, success and error states are all designed and interactive. Nothing is stored or sent. Submit buttons show a clearly-labelled non-functional state.

## 7. Blocked

| Page | Blocked on | Interim |
|---|---|---|
| P02 About | B1 founding story, B2 who runs it, B6 Pranava wording | Build the layout with visible `[content pending]` blocks |
| P13 Sangha | C3 — nobody knows what this page is | **Not routed** until defined. Leave it out of the nav rather than ship a hollow page. |
| P20 Privacy / Terms / Contact | C4, C5, C6 — legal content | Route exists, page states the policy is being finalised |

---

## 8. Definition of done for Phase A

- [ ] All 26 routes from the locked sitemap resolve (minus the 1 deliberately unrouted)
- [ ] No two adjacent sections anywhere on the site use the same image treatment
- [ ] No page uses more than two instances of the same treatment
- [ ] Every section on the homepage has a distinct visual idea, defensible in one sentence
- [ ] Zero generic 3-up or 4-up card grids sitewide
- [ ] Every asset logged in `CREDITS.md` with source and licence
- [ ] Every sample entry visibly marked and isolated to one directory
- [ ] Lighthouse: performance ≥ 90 mobile, accessibility 100
- [ ] Keyboard-navigable end to end, including rails and filters
- [ ] `prefers-reduced-motion` fully honoured
- [ ] Mobile is independently art-directed, not a stacked desktop
- [ ] Client data master list updated with anything new discovered during the build

---

## 9. What Phase A explicitly does not do

Authentication · database · admin panel · moderation queue · submission processing · verification workflow · email · payments · WhatsApp integration · search backend · member accounts.

All of it is Phase B. All of it is blocked on decisions in `Yoga-Mandala-Kickoff-Meeting-Prep.md`. **The content-file schema built in Stage 0 uses the same field names as the eventual database entities**, so Phase B is an attachment exercise rather than a rewrite.
