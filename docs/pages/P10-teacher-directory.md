# P10 — Teacher Directory

**Route:** `/connect/directory` · **Status:** 🟡 Build UI and filters in full; real people blocked
**Framework source:** §7.1 (full field + filter spec) · §12 verification · §16 privacy · §21 success criterion 2

---

## 1. Purpose

§7.1: *"The directory should become one of Yoga Mandala's core long-term assets."*

This is the most important functional page on the site. Two of six V1 success criteria depend on it. It gets disproportionate design attention.

---

## 2. Framework spec

**Profile fields (§7.1, verbatim):** Name (public name) · Photo (optional) · Location (city/region) · Experience (years or concise description) · Tradition/approach (self-described) · Qualifications (relevant training/certifications) · Areas of interest (asana, philosophy, therapy, prenatal, children, etc.) · Languages (languages taught) · Teaching format (online/offline/both) · Bio (100–150 words) · Links (website/professional social profile) · Contact (*"Prefer enquiry form rather than public private details"*)

**Filters (§7.1, verbatim):** City/region · Tradition/approach · Area of teaching · Experience · Online/offline · Language · Teacher/therapist/researcher/other role

**Verification (§12, verbatim):** *"'Verified Teacher' means the submitted information has been reviewed against those criteria; it should not imply blanket endorsement."*

**Privacy (§16):** *"Do not publicly expose private phone numbers or emails by default."*

---

## 3. The design problem

A directory of people wants to be a grid of face-cards. The client's brief explicitly forbids it:
> "Do not create a generic [Photo] Name / [Photo] Name grid unless there is a strong reason for it."

But a directory also has to be **scannable and filterable** — it's a tool, not a magazine. Pure editorial layout would make it useless.

**Resolution: an editorial index with a preview panel.** The list is typographic and dense, so scanning is fast; the imagery lives in a single large preview that responds to what you're scanning. One image at a time, at good size, rather than forty thumbnails.

This satisfies both the "find someone quickly" requirement and the no-grid rule, and it degrades gracefully to a legitimate stacked layout on mobile.

---

## 4. Section-by-section art direction

### S1 · Opener — compact
**Treatment:** none · **Ground:** `paper`

Title, one line on what the directory is, the current count stated plainly, and a non-endorsement note. **Deliberately short** — this page's job is the list below, not a hero.

### S2 · Filters — *"A control bar that looks typeset"*
**Treatment:** functional · **Ground:** `paper`, sticky on scroll

All seven §7.1 filters as `label`-type dropdowns along a brass rule. Active filters appear as removable chips. Result count updates live. A single text search across name, tradition and area.

Sticky, hairline-ruled, `paper` background — it reads as a running head in a journal rather than a toolbar.

### S3 · The index — *"Scan left, see right"*
**Treatment:** typographic index + single large preview · **Ground:** `paper`

**Desktop (≥1200px):** two-column split. Left (7 cols) is the index — each teacher one row:

```
─────────────────────────────────────────────────
Teacher Name                        VERIFIED TEACHER
Tradition · City · 12 years · Online & offline
Areas: philosophy, therapy, pranayama
─────────────────────────────────────────────────
```

Right (5 cols) is a sticky preview panel: large portrait, name, bio excerpt, languages, and a link to the full profile. It updates on hover, and on keyboard focus, with a 240ms crossfade. Default state shows the first result.

**Tablet/mobile:** rows expand inline — a tapped row opens a portrait and bio excerpt beneath it, accordion-style. No preview panel.

**Why this works:** it is fast to scan (text rows), it shows people properly (one large portrait rather than forty thumbnails), it never becomes a card grid, and it is fully keyboard-operable.

### S4 · Verification explained
**Treatment:** hairline note · **Ground:** `indigo-deep`

§12's caveat published in full, plus the verification criteria once the client supplies them (C1), plus what "Verified Teacher" does *not* mean.

**Why:** the framework insists on this twice. Publishing it protects the community, protects the client, and is a genuine trust differentiator.

### S5 · Join the directory
Quiet link to `/join`, with a plain statement of what's required.

---

## 5. Privacy design — §16 requirements built in

| Requirement | Implementation |
|---|---|
| "Do not publicly expose private phone numbers or emails by default" | No contact field is ever rendered as text. Contact is an enquiry form only |
| "Give members control over public profile fields" | Every field carries a `public: true/false` flag in the model from day one, even though the editing UI is Phase B |
| Photo is optional (§7.1) | The layout must look correct with no photo — a typographic fallback using the initial in the display face, not a grey avatar icon |

**The no-photo state is a first-class design case, not an edge case.** Many teachers will not supply a portrait.

---

## 6. Assets

1 opener image or none, 12–15 placeholder portraits (treated per integrity rules), 1 documentary photograph for S4. **No real faces in Phase A.**

## 7. Motion

Preview crossfade 240ms. Row hover: brass rule thickens, name shifts 4px right. Filter chips fill on select. Nothing else — this is a tool.

## 8. Responsive

| Breakpoint | Layout |
|---|---|
| ≥1200px | Split index + sticky preview |
| 768–1199 | Single column, inline accordion expansion |
| <768px | Stacked rows, tap to expand, filters in a bottom sheet |

---

## 9. Content model

```yaml
type: person
name: string
slug: string
photo: { src, alt }?              # optional per §7.1
location: { city, region }
experience: string
tradition: string                  # self-described
qualifications: [string]
areasOfInterest: [string]
languages: [string]
teachingFormat: online | offline | both
bio: string                        # 100–150 words per §7.1
links: [{ label, url }]
role: teacher | therapist | researcher | other
verified: { status, criteriaVersion, date }?
isExpert: boolean                  # Experts is a flag, not a separate entity
fieldVisibility: { [field]: boolean }
sample: true
```

Matches §19's `Teacher Profile` entity. **`isExpert` as a flag is a deliberate architectural choice** — it avoids a second profile system for [P12](P12-experts.md).

## 10. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **C1** | **Verified Teacher criteria** | 🔴 for S4 | §12 mandates published criteria; they don't exist. S4 cannot be written without them |
| **E1** | Public or member-only? | 🟠 | Determines whether we build a gate/teaser state |
| **E2** | Can a non-member send an enquiry? | 🟠 | Changes the profile CTA |
| **D4** | 20–25 real profiles with §7.1 fields | 🟠 | Placeholders until then |
| **D9** | Portraits with written consent to publish | 🟠 | Consent is required, not optional — §16 |
| — | **Fixed vocabularies** for tradition, area of interest, language, city | 🟠 | Free text breaks filtering. Someone must author these lists |
| — | Do therapists/researchers get verified differently? | 🟠 | §7.1 has a role filter; §12 has one criteria set |

## 11. Buildable now

The complete page — filters, index, preview, accordion, no-photo fallback, empty state, all responsive behaviour — against 12–15 clearly-marked placeholder records. **All filtering logic is real** and works the moment real data replaces the samples.

## 12. Acceptance criteria

- [ ] All seven §7.1 filters implemented and functional
- [ ] All twelve §7.1 profile fields represented
- [ ] Zero face-card grids
- [ ] Preview panel keyboard-accessible; index fully operable without a mouse
- [ ] No email or phone rendered anywhere on the page
- [ ] No-photo state looks intentional, not broken
- [ ] Non-endorsement caveat present and prominent
- [ ] Placeholder people cannot be mistaken for real members
- [ ] A visitor can filter to a relevant teacher in under 15 seconds
