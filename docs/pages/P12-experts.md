# P12 — Experts

**Route:** `/connect/experts` · **Status:** 🟡 Build as a filtered directory view
**Framework source:** §7.2 (three sentences — the entire spec)

---

## 1. Purpose

§7.2 in full:
> "A curated list of experienced members willing to contribute to Q&A, study circles, expert conversations or mentoring. Verification must be transparent and must not imply blanket endorsement."

**Architectural decision: Experts is a flag on a teacher profile, not a separate entity.**

An "expert" is a member who has agreed to contribute in specific ways. Building a parallel profile system would duplicate all twelve §7.1 fields, double the admin work, and create two records per person that inevitably drift apart. `isExpert: boolean` plus a `contributions` array on the existing `person` type does everything §7.2 describes.

This is a genuine effort saving worth stating to the client explicitly.

---

## 2. What makes this page different from the Directory

If it looked the same, it shouldn't exist. The differences:

| | Directory | Experts |
|---|---|---|
| Question it answers | "Who teaches what I need, near me?" | "Who can help the community with this subject?" |
| Organised by | Location and tradition | **Subject and contribution type** |
| Scale | Everyone | A small curated group |
| Layout | Dense index + preview | Sparse editorial — few people, more space each |

**The Experts page is organised around subjects, not people.** You arrive with a question, not a location.

---

## 3. Section-by-section art direction

### S1 · Opener
**Treatment:** T2 editorial inset · **Ground:** `paper`

§7.2's definition as the standfirst. Immediately beneath, at equal weight — not as a footnote — the caveat: *"Verification must be transparent and must not imply blanket endorsement."*

**Why:** the framework states this twice across two sections. Making it the second thing on the page is the honest reading of that emphasis.

### S2 · By contribution — *"Four ways to be helped"*
**Treatment:** typographic index · **Ground:** `paper-deep`

§7.2's four contribution types, each with the members offering it:

**Q&A · Study circles · Expert conversations · Mentoring**

Set as four large `display-m` headings, each followed by a short typographic list of names with their subject and one line of context. Brass rules between. No portraits at this level.

**Why:** this frames the page as a service the community offers rather than a ranking of people — which is precisely what "must not imply blanket endorsement" is guarding against. A leaderboard of experts is the failure mode to avoid.

### S3 · By subject
**Treatment:** `label` chip index · **Ground:** `paper`

Subject chips drawn from the same taxonomy as the Library's 11 subjects and the directory's areas of interest — philosophy, anatomy, therapy, pranayama, Sanskrit, teaching methodology, and so on. Selecting one filters S4.

**Sharing one taxonomy across Library, Directory and Experts** makes the whole site feel coherent and means the client authors these vocabularies once.

### S4 · The experts — *"Few people, generous space"*
**Treatment:** T3 layered pairs, alternating alignment · **Ground:** `paper`

Each expert gets a full editorial band — portrait, name, subject, what they've offered to contribute, and a link to their full directory profile. Alternating left/right alignment down the page. Roughly two per viewport, never more.

**Why:** the directory is dense because it needs to be scanned. This page is sparse because it should be read. That contrast is what justifies two people-pages.

### S5 · How someone becomes an expert
**Treatment:** hairline note · **Ground:** `indigo-deep`

The inclusion criteria (C2), the transparency statement, and how a member can offer to contribute.

⚠️ **Blocked.** §7.2 requires transparent verification and the criteria don't exist. Phase A ships a visible `[criteria pending]` block rather than invented rules.

---

## 4. Assets

Portraits reused from directory placeholders (no new assets), 1 documentary photograph for the opener, 1 for S5. Deliberately light.

## 5. Motion

Bands fade-and-rise alternately from left and right, 24px. Nothing else.

## 6. Responsive

S2's four contribution lists stack. S4 bands stack with the portrait full-bleed above the text. Alternating alignment is dropped on mobile — it reads as inconsistency at narrow widths rather than as rhythm.

---

## 7. Content model

No new type. Extends `person`:

```yaml
isExpert: true
expertise: [subject]                    # shared taxonomy
contributions: [qa | study-circle | expert-conversation | mentoring]
expertNote: string                      # what they've offered
expertSince: date
```

## 8. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **C2** | **Expert Network inclusion criteria** + non-endorsement wording | 🔴 for S5 | §7.2 requires transparency; nothing defines it |
| — | Who decides — the same curators as verification, or a different group? | 🟠 | §7.2 says "curated" and never says by whom |
| — | Do members apply, or are they invited? | 🟠 | Changes S5 entirely |
| — | Can someone be an expert without being a Verified Teacher? | 🟠 | §7.2 says "experienced members", not "verified teachers" — a real distinction |
| — | Is there a cap, or is it open to anyone qualified? | 🟢 | Affects layout at scale |
| D4 | Real experts | 🟠 | Placeholders |

## 9. Buildable now

The full page against placeholder data, with S5's criteria marked pending. Because it's a filtered view of an existing type, it costs a fraction of a standalone module.

## 10. Acceptance criteria

- [ ] No duplicate profile system — one `person` record per human
- [ ] Non-endorsement caveat within the first screen
- [ ] Organised by contribution and subject, not by person ranking
- [ ] Visually distinct from the Directory — sparse, not dense
- [ ] Nothing resembling a leaderboard, rating or ranking
- [ ] Shares its subject taxonomy with Library and Directory
- [ ] Criteria block visibly pending, never invented
