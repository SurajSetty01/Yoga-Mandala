# P07 — Library

**Routes:** `/learn/library`, `/learn/library/[slug]` · **Status:** 🟢 **Build now with real content — zero client dependency**
**Framework source:** §6.3 (11 subjects, metadata schema, copyright principle)

---

## 1. Purpose

The Library is the page that proves this is a scholarly project rather than a wellness site. It is also, uniquely, **fully buildable with genuine content today** — because centuries of foundational Yoga literature are in the public domain, and §6.3's copyright rule is satisfied precisely by linking rather than hosting.

---

## 2. Framework spec

**The 11 subjects, verbatim:** Yoga philosophy · Texts and commentaries · Asana and methodology · Anatomy and biomechanics · Pranayama · Meditation · Ayurveda · Sanskrit · Yoga history and culture · Research · Teaching methodology

**Metadata schema, verbatim:** *"title, author, subject, context/tradition, short description, recommended level, source/rights information and access method."*

**Copyright principle, verbatim:** *"Do not upload or redistribute protected books, recordings or documents without permission. Where rights are unclear, use legitimate links, bibliographic information or approved access methods."*

→ **The Library never hosts a file.** It is a catalogue of records with legitimate access links. This is a hard rule and also a considerable simplification.

---

## 3. Real launch content — available now

| Text | Public-domain edition | Subject | Access |
|---|---|---|---|
| Yoga Sūtras of Patañjali | Woods, *The Yoga System of Patañjali* (1914); Vivekananda (1896) | Philosophy | Internet Archive |
| Haṭha Yoga Pradīpikā | Pancham Sinh (1914) | Asana & methodology | Internet Archive |
| Gheraṇḍa Saṃhitā | S.C. Vasu (1914) | Pranayama, methodology | Internet Archive |
| Śiva Saṃhitā | S.C. Vasu (1914) | Philosophy | Internet Archive |
| Bhagavad Gītā | Edwin Arnold (1885); Besant (1895) | Texts & commentaries | Internet Archive |
| Principal Upaniṣads | Müller, *Sacred Books of the East* (1879–84) | Texts & commentaries | Internet Archive |
| Caraka / Suśruta Saṃhitā selections | Early 20th-c. translations | Ayurveda | Internet Archive |
| Sanskrit primers | Monier-Williams; Macdonell | Sanskrit | Internet Archive |

**Every record carries real, verifiable source and rights information.** Scanned title pages and plates from these editions double as the page's imagery (Stream A) — genuinely period-correct, legally clean, and impossible to mistake for stock photography.

This gives 10–14 real records at launch across at least 6 of the 11 subjects — enough to satisfy §22's *"small number of high-quality entries rather than dozens of empty sections."*

---

## 4. Index page art direction

### S1 · Opener — *"A reading room"*
**Treatment:** T6 archival plate, oversized · **Ground:** `paper-deep`

A single large manuscript plate or scanned frontispiece, brass-framed, captioned with its real source. Title and the §6.3 purpose line alongside. Immediately establishes the archival register.

### S2 · Subjects — *"A catalogue spine"*
**Treatment:** typographic index · **Ground:** `paper`

The 11 subjects as a vertical list at `title` size, each with its record count, brass-ruled. Hovering a subject dims the others and brings up a representative plate in the right margin.

**Why:** 11 items is exactly the count that tempts a grid. As a typeset index it reads as a library catalogue — the right metaphor — and handles an odd number gracefully, which a grid never does.

### S3 · The collection — *"Catalogue records, not product cards"*
**Treatment:** T5 column strips at varied scales, mixed with typographic records · **Ground:** `paper`

Records are laid out in an **asymmetric editorial column**, not a grid. Roughly one in three has a cover/plate image at varying widths; the rest are typographic records. Each record:

```
Title, set in the display face
Author · Tradition/context
A short description, two lines.
LEVEL: for teachers      SOURCE: Internet Archive (public domain)
```

Brass hairlines between. Filters by subject, level and tradition as `label` chips.

**Why:** varying which records carry an image and at what size produces a naturally editorial rhythm, and it honestly reflects reality — some texts have beautiful available plates, some don't. A uniform grid would force fake uniformity.

### S4 · On rights and access — *"The copyright principle, published"*
**Treatment:** hairline note · **Ground:** `indigo-deep`

§6.3's copyright principle stated publicly, plus an explanation that the Library links to legitimate sources rather than hosting files, and an invitation to suggest additions via `/submit/resource`.

**Why:** publishing this is both an ethical position and a practical shield. It also tells contributors what will be accepted before they submit.

---

## 5. Detail page

A catalogue record, treated with the seriousness of one.

Large plate/cover, brass-framed, with its real source caption · title · author · subject · context/tradition · recommended level · description · **source/rights information stated explicitly** · access method as a clearly-labelled outbound link · related records in the same subject, typographic only.

Where a text is public domain, say so plainly — it's useful information for a teacher deciding whether to read it.

---

## 6. Assets

8–12 archival plates and title pages (Stream A — Internet Archive, Wellcome Collection, Met Open Access), 1 documentary photograph, 1 paper texture. **This is the most asset-rich page on the site and costs nothing**, because everything is public domain.

## 7. Motion

Very restrained — this page should feel still. Fade-only on records. Subject hover dims siblings over 240ms. No parallax anywhere.

## 8. Responsive

Subject index becomes a horizontally scrolling chip row with the count beneath each. Records stack; image-bearing records keep their varied widths as varied *heights* so the editorial rhythm survives.

---

## 9. Content model

```yaml
type: resource
title: string
author: string
subject: one of the 11 §6.3 subjects
tradition: string          # "context/tradition"
description: string
level: beginner | teacher | experienced-teacher | open
rights: string             # REQUIRED — §6.3
source: { name, url }      # REQUIRED — the access method
plate: { image, credit, licence }?
sample: false              # real content
```

Matches §19's `Resource` entity. `rights` and `source` are **required fields** — a record cannot be created without them, enforcing §6.3 structurally rather than by policy.

## 10. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **D6** | Additional recommended texts, especially modern ones | 🟢 | **Not blocking** — 10–14 real records ship without any input |
| — | Confirm link-only, never hosting files | 🟠 | Our strong reading of §6.3; confirm at review |
| — | Should members be able to add commentary/notes on a text? | 🟢 | Phase B; would need moderation |
| — | Any texts the community particularly wants represented? | 🟢 | |

## 11. Buildable now

**Everything, with real content.** This page should be built early (Stage 4) precisely because it needs nothing from the client and demonstrates the archival visual language that distinguishes the whole site.

## 12. Acceptance criteria

- [ ] 10+ real records across 6+ of the 11 subjects
- [ ] Every record carries genuine, verifiable rights and source information
- [ ] No file hosted; every access route is an outbound link
- [ ] §6.3's copyright principle published on the page
- [ ] Reads as a catalogue, never as a bookshop
- [ ] Every archival image credited with its real source and licence
- [ ] Zero uniform grids
