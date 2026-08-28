# P04 — Learn Hub

**Route:** `/learn` · **Status:** 🟢 Build now
**Framework source:** §6 LEARN · §3 Community Architecture (Learning layer) · locked sitemap conflict #1 and #2

---

## 1. Purpose

A routing page with a point of view. It introduces four genuinely different things and must make their differences legible — which is exactly where a four-card grid would fail, because it would make them look identical.

**Children (locked):** Learning Initiatives · Curation & Learning Bulletin · Library · Reading Circle · *(Teacher's Desk — deferred, shown as forthcoming)*

**The critical distinction this page must teach**, from §6.2: Initiatives are Yoga Mandala's own; Bulletin entries *"are NOT automatically Yoga Mandala programmes."* If a visitor leaves this page understanding only one thing, it should be that.

---

## 2. Section-by-section art direction

### S1 · Opener — *"Learning, defined"*
**Treatment:** T4 type-crossing · **Ground:** `paper`

`LEARN` at enormous scale, outline type, with a documentary photograph crossing behind the word's counters. §3's Learning-layer definition — *"Knowledge and development"* — as the standfirst.

### S2 · The four routes — *"Four different objects, not four cards"*
**Ground:** `paper` · **Each child gets its own treatment and its own scale.** This is the section's whole idea: the modules look different because they *are* different.

| Child | Treatment | Visual character |
|---|---|---|
| **Learning Initiatives** | T2 editorial inset, largest block | A programme — active, photographic, dated |
| **Curation & Learning Bulletin** | Typographic index — 3 live titles listed, no image | A feed — textual, current, external |
| **Library** | T6 archival plate | A collection — static, framed, historical |
| **Reading Circle** | T3 layered pair — a book cover behind a gathering photo | An event around a text |

They are laid out asymmetrically at deliberately different sizes down the page, each with a one-line description drawn from §6, separated by full-width brass hairlines. Sizes are unequal on purpose: Initiatives is the largest, Reading Circle the smallest.

**Why:** the default here is four equal cards, which would flatten a Yoga Mandala programme and an externally-curated book listing into visually identical objects — precisely the blurring §23 forbids: *"Never blur these categories."*

### S3 · The distinction — *"Ours vs curated"*
**Treatment:** typographic table · **Ground:** `indigo-deep`

An explicit two-column explainer of the badge system, using §10's exact definitions:

| Badge | Meaning (§10, verbatim) |
|---|---|
| Yoga Mandala Learning Initiative | "Formally organised/endorsed by Yoga Mandala" |
| Curated Community Listing | "External opportunity selected for relevance" |
| Community Listing | "Member-submitted listing meeting community rules" |
| Partner / Guest | "Legitimate external collaborator or organisation" |

Each rendered in its actual badge styling, so visitors learn the visual language they'll meet everywhere else on the site.

**Why:** this converts an internal content rule into a public trust statement, and it means every badge elsewhere is self-explanatory.

### S4 · Teacher's Desk — forthcoming
**Treatment:** T10 duotone ground, low contrast · **Ground:** `paper-deep`

A restrained block describing what Teacher's Desk will be, using §11's twelve topics as evidence it's a real plan and not vapour. Clearly labelled as forthcoming — no fake "coming soon" countdown, no email capture. Links to the [P17](P17-teachers-desk.md) concept page.

**Why:** the framework's sitemap promises it. Acknowledging it honestly is better than a dead nav item or silence.

---

## 3. Assets

4 documentary photographs, 1 archival plate, 1 duotone ground. Reuses images from the child pages so the hub previews each section's real character.

## 4. Motion

Each child block enters with a treatment-appropriate reveal: the Initiative mask-wipes, the Bulletin index staggers row by row, the Library plate fades only, the Reading Circle pair offsets slightly on scroll. **Different reveals reinforce that these are different kinds of thing.**

## 5. Responsive

Blocks stack but retain their size hierarchy — the Initiative block stays visibly dominant on mobile. S3's badge table becomes stacked rows.

---

## 6. Content model

Pulls 1 featured `initiative`, 3 latest `bulletin`, 1 featured `resource`, current `reading-circle`. Live queries, not hardcoded.

## 7. Client data required

| # | Item | Blocking | Interim |
|---|---|---|---|
| E5 | Confirm Teacher's Desk is deferred | 🟠 | Built as forthcoming |
| D1, D3, D5, D6 | Real content for the previews | No | Samples, marked |
| — | Confirm Bulletin's canonical home is under Learn (sitemap conflict #2) | 🟠 | Resolved in [01-SITEMAP-LOCKED](../01-SITEMAP-LOCKED.md); flag at review |

## 8. Buildable now

Entire page. §6 and §10 supply all structural content.

## 9. Acceptance criteria

- [ ] Four children presented with four visually distinct treatments
- [ ] No equal-weight card grid
- [ ] Badge system explained publicly using §10's exact wording
- [ ] A visitor can articulate the difference between an Initiative and a curated listing after reading
- [ ] Teacher's Desk honestly labelled as forthcoming
