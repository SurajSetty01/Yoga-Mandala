# P19 — Submission Engine

**Routes:** `/submit`, `/submit/event`, `/submit/learning-opportunity`, `/submit/resource`, `/submit/listing`, *(`/submit/question` deferred)*
**Status:** 🟡 Build visual + form UI; no backend, no submission
**Framework source:** §13 Submission System · §14 lifecycle · §10 curation workflow

---

## 1. Architectural decision: one engine, not eight forms

§13 lists eight forms:

> "Join the Sangha · Create Teacher Profile · Submit an Event · Submit Learning Opportunity · Submit Community Listing · Submit Resource · Ask the Sangha · Suggest Meetup / Initiative"

And then gives them **one shared field set**:

> "Common fields: name/email, member status, submission type, title, description, links, location/online, date/expiry, accuracy declaration, publication consent and moderator notes."

**They are one form with typed variants.** Building eight separate forms would mean eight sets of validation, eight layouts and eight things to change every time the moderation flow shifts.

**Phase A builds:** a shared submission shell + a type-specific field schema per variant. Adding a ninth submission type later becomes a schema entry, not a new page.

Note: *Join the Sangha* has its own page ([P18](P18-join.md)) because it's a conversion surface, not a submission. *Create Teacher Profile* and *Suggest Meetup* are variants of this engine. *Ask the Sangha* is deferred with [P17](P17-teachers-desk.md).

---

## 2. Submit hub — `/submit`

### S1 · Opener
**Treatment:** T4 type-crossing · **Ground:** `paper`

Framed as contribution, not data entry — this is the SERVE pillar in practice. §1: *"Contribute knowledge, volunteer, mentor and strengthen the wider Yoga ecosystem."*

### S2 · What you can share — *"Six different contributions"*
**Treatment:** typographic index at varied scales · **Ground:** `paper`

Six routes, each with a one-line description of what it's for and where it ends up:

| Route | Goes to | Becomes |
|---|---|---|
| An event | [Events](P15-events.md) | Event listing, badged |
| A learning opportunity | [Bulletin](P06-curation-bulletin.md) | Curated Community Listing |
| A resource | [Library](P07-library.md) | Catalogue record |
| A community listing | [Sangha Board](P14-sangha-board.md) / [Discover](P16-discover.md) | Community Listing |
| A teacher profile | [Directory](P10-teacher-directory.md) | Reviewed for verification |
| A meetup or initiative idea | Community team | A conversation |

**Telling people where their submission ends up, before they fill anything in, is the single most useful thing this page does.**

### S3 · What happens after you submit
**Treatment:** typographic flow · **Ground:** `indigo-deep`

§14's lifecycle published: Draft → Submitted → Under Review → Approved / Changes Requested / Rejected → Published → Expired / Archived.

Plus §10's review criteria — *"relevance, accuracy, presentation and community fit"* — and §10's exclusion list.

**Why:** setting expectations before submission is the cheapest way to reduce both bad submissions and complaints about moderation.

---

## 3. Shared form shell

Every variant uses the same structure:

1. **Type indicator** — where this ends up, restated
2. **Your details** — name, email, member status (§13 common fields)
3. **Type-specific fields** — the variant schema
4. **Shared closing fields** — links, location/online, date/expiry, accuracy declaration, publication consent
5. **Review step** — read back everything before submitting
6. **Confirmation** — what happens next, with the lifecycle restated

**Multi-step on desktop and mobile alike**, with a `label`-type progress indicator. Single-column throughout, brass-ruled inputs, no boxes, generous spacing. Inline validation on blur.

---

## 4. Variant schemas — mapped to their content types

| Variant | Type-specific fields | Content type |
|---|---|---|
| **Event** | Title, event type (7 from §9), date, time, timezone, location/online, host, audience, fee, description, registration URL | `event` |
| **Learning opportunity** | Title, category (7 from §6.2), source organisation + URL, description, dates, why it's relevant | `bulletin` |
| **Resource** | Title, author, subject (11 from §6.3), tradition/context, description, level, **source/rights info (required)**, access link | `resource` |
| **Community listing** | Title, category (7 from §8), description, location/online, contact method, expiry | `listing` |
| **Teacher profile** | All twelve §7.1 fields, plus qualifications evidence | `person` |
| **Meetup / initiative idea** | Title, type, description, who it's for, whether you'd facilitate | free-form → community team |

**Every variant's field set is drawn directly from the framework's own spec for that content type.** No invented fields anywhere.

Note the Resource variant: `source/rights` is **required**, enforcing §6.3's copyright principle at the point of entry rather than at moderation. Cheaper to prevent than to review.

---

## 5. Critical design rules

**Never promise publication.** §14 has three outcomes — Approved, Changes Requested, Rejected. Confirmation copy says "submitted for review", never "published" or "thank you for your contribution to the site".

**Show the badge that will apply.** A member submitting a learning opportunity should see, before submitting, that it will appear as a *Curated Community Listing* and not as a Yoga Mandala programme. This is §6.2's rule enforced at the point of submission — the earliest and most effective place.

**Accuracy declaration and publication consent are explicit checkboxes**, never pre-ticked, never buried. §13 requires both, and §14 forbids misleading claims.

**Moderator notes** (§13's last common field) are an internal field — present in the schema, never rendered to the submitter.

---

## 6. States

Empty · partially complete · validation errors · review step · submitting · success · error · non-member attempting a member-only submission. All designed; none functional in Phase A.

## 7. Assets

2 for the hub, none in the forms. Forms should be quiet.

## 8. Motion

Step transitions crossfade 240ms with the progress indicator advancing. Field focus transitions the brass rule. Nothing else.

## 9. Responsive

Identical structure at every breakpoint — the form is already single-column by design. Progress indicator becomes a compact "Step 2 of 4" line.

---

## 10. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **E7** | **Which forms are actually wanted at launch?** | 🟠 | §13 lists 8; some may not be needed on day one |
| — | Can non-members submit anything, or must you join first? | 🟠 | Changes every form's opening step |
| — | Which submissions need approval? (their Appendix B asks this) | 🟠 | §14 implies all; auto-publishing some would ease the load |
| — | Expected turnaround, so the confirmation can state it honestly | 🟠 | "We usually respond within X days" |
| — | Should submitters be able to edit after submitting? | 🟠 | Affects the "Changes Requested" loop |
| — | Should submitters see their submission's status? | 🟠 | Needs accounts — Phase B, but it changes the model |
| — | Is qualification *evidence* uploaded, or just declared? | 🟠 | File upload = storage, access control, retention. Real cost difference |
| C4/C5 | Privacy and terms | 🔴 for launch | Forms collect personal data |

## 11. Buildable now

Hub plus all five variants, every state, full multi-step flow, complete validation. Nothing submits. The schema-driven approach means the eventual backend attaches to a structure that already exists.

## 12. Acceptance criteria

- [ ] One shared engine — no duplicated form code
- [ ] Every variant's fields drawn from the framework's spec for that type
- [ ] Accuracy declaration + publication consent on every variant, never pre-ticked
- [ ] The applicable badge shown before submission
- [ ] Confirmation never promises publication
- [ ] Lifecycle published on the hub
- [ ] Resource variant enforces required rights/source
- [ ] Moderator notes never visible to submitters
- [ ] Fully accessible: labels, error announcements, keyboard operation
- [ ] Non-functional state clearly labelled
