# P08 — Reading Circle

**Route:** `/learn/reading-circle` · **Status:** 🟡 Build with sample content
**Framework source:** §6.4 (one line — the least specified module in the document) · §9 (Reading Circles listed as an event type)

---

## 1. Purpose

§6.4 in its entirety:
> "Selected text + reading period + facilitator + discussion prompts + meeting date + community reflections."

Six components, one sentence, no further guidance. This is the framework's thinnest section, so the design has to do more interpretive work here than anywhere else — while being careful not to invent product decisions.

**Interpretation:** the Reading Circle is a *seasonal, single-focus* page — one text at a time, not a catalogue. That reading follows from the singular phrasing ("Selected text", "meeting date") and makes it structurally different from every other page on the site.

⚠️ **"Community reflections" is the one component we cannot build.** It is user-generated content requiring submission, moderation and display rules that don't exist yet. Phase A designs the space for it and leaves it empty.

---

## 2. Section-by-section art direction

### S1 · The current text — *"A book, at full scale"*
**Treatment:** T3 layered pair · **Ground:** `paper-deep`

The page opens with the text itself, treated like an object: a large cover or manuscript plate, with a second image — a gathering, a desk, hands and a book — overlapping its lower corner. Beside it, the title at `display-l`, author, translation/edition, and the reading period as a date range in `label` type.

**Why:** the text is the protagonist. Every other page opens with a place or a person; this one opens with a book, which immediately distinguishes it.

### S2 · The reading period — *"A season, mapped"*
**Treatment:** horizontal typographic timeline · **Ground:** `paper`

The reading period as a brass rule spanning the viewport, with chapter or section markers along it, the meeting date marked prominently, and a subtle indicator of where "today" falls within the period.

**Why:** a reading circle is fundamentally a shape in time. Nothing else on the site has a timeline, so this becomes the page's signature.

### S3 · The facilitator
**Treatment:** T2 editorial inset, small · **Ground:** `paper`

Portrait, name, a short paragraph on why they chose this text. Links to their directory profile where one exists.

### S4 · Discussion prompts — *"Questions as display type"*
**Treatment:** T4 type-crossing · **Ground:** `indigo-deep`

The prompts set large — `display-m`, one per screen-section, numbered in brass, separated by full-width rules. A very low-contrast archival plate behind the whole block.

**Why:** discussion prompts are the intellectual content of a reading circle. Setting them as small bullet points would waste the best material on the page; at display scale they invite thought, which is the point.

### S5 · Joining
**Treatment:** none · **Ground:** `paper`

Meeting date, time and timezone, format (online/offline), and how to join. Plain and factual. Links through to the corresponding event where one exists.

### S6 · Community reflections — ⚠️ designed, not built
**Treatment:** typographic quotes · **Ground:** `paper-deep`

Space designed for member reflections on the text — attributed pull quotes in a staggered vertical rhythm, not a comment thread.

**Phase A ships this as a visible `[awaiting product decision]` block.** Building a reflections feature would mean inventing a submission and moderation workflow the client has not defined — precisely what Phase A is instructed not to do.

### S7 · Previous texts
**Treatment:** T9 horizontal rail, small and desaturated · **Ground:** `paper`

Past reading circles as small cover images with title and period. Hidden until at least two exist.

---

## 3. Assets

1 cover/plate (Stream A where public domain), 1 gathering photograph (Stream B), 1 facilitator portrait (placeholder), 1 archival plate for S4's ground. Four assets — a deliberately quiet page.

## 4. Motion

Timeline draws left-to-right on entry, 900ms. Prompts fade-and-rise individually as they enter. Nothing else moves.

## 5. Responsive

Timeline rotates to vertical, running down the left margin with markers beside it — arguably better than the desktop version. Prompts remain full-width and large. Layered pair reduces overlap to 16px.

---

## 6. Content model

```yaml
type: reading-circle
text: { title, author, edition, coverImage?, librarySlug? }
period: { start, end }
milestones: [{ label, date }]
facilitator: { name, note, portrait?, directorySlug? }
prompts: [string]
meeting: { date, time, timezone, format, joinUrl? }
reflections: []            # empty in Phase A — awaiting product decision
status: current | past
sample: true
```

Note `librarySlug` — where the selected text also exists in the Library, the two link. That cross-connection costs nothing and makes the site feel coherent rather than sectioned.

## 7. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **D5** | Current text, reading period, facilitator, prompts, meeting date | 🟠 | Sample until then — a public-domain text works well as the sample |
| — | **How do "community reflections" work?** Who writes them, are they moderated, are they public? | 🔴 for S6 | §6.4 names them and defines nothing. Cannot be built on a guess |
| — | Is the Reading Circle continuous (a new text each period) or occasional? | 🟠 | Affects whether S7 and the "past" state matter |
| — | Is a Reading Circle also an Event? §9 lists "Reading Circles" as an event type | 🟠 | Phase A cross-links them; confirm they aren't duplicate records |
| — | Is participation open to all members or invitation-only? | 🟠 | Affects S5's copy |

## 8. Buildable now

S1–S5 and S7 in full with a sample text. S6 is a marked gap.

Using a genuine public-domain text as the sample — e.g. the Yoga Sūtras with real chapter divisions — makes the sample feel plausible without fabricating anything, and lets it link to the Library.

## 9. Acceptance criteria

- [ ] All six §6.4 components present or explicitly marked as pending
- [ ] Page is single-focus — one text, not a catalogue
- [ ] Timeline is legible at every breakpoint
- [ ] Prompts are the visual highlight of the page
- [ ] Reflections space is visibly marked as pending, never filled with invented quotes
- [ ] Cross-links to the Library record and the corresponding Event where they exist
