# P05 — Yoga Mandala Learning Initiatives

**Routes:** `/learn/initiatives`, `/learn/initiatives/[slug]` · **Status:** 🟡 Build with sample content
**Framework source:** §6.1 (full field spec) · §10 badge · §21 roadmap Phase 1

---

## 1. Purpose

§6.1: *"For programmes, sessions, study circles, lectures, mentorships or educational projects **formally organised or endorsed by Yoga Mandala**."*

These are the only offerings that carry Yoga Mandala's own name. They must look and feel materially different from everything curated from outside — that difference is the framework's central content rule.

---

## 2. Field spec — §6.1, verbatim

| Field | Required information |
|---|---|
| Title | "Name of initiative" |
| Type | "Workshop / study circle / lecture / series / mentorship / other" |
| Facilitator | "Name + short profile" |
| Schedule | "Date, time and timezone" |
| Format | "Online / offline / hybrid" |
| Fee | "Free / paid / contribution" |
| Audience | "Beginner / teacher / experienced teacher / open" |
| Description | "What participants will learn" |
| Registration | "Portal or external registration" |
| Badge | "Yoga Mandala Learning Initiative" |

⚠️ **Registration is a fork the client hasn't resolved** (kickoff Q7). Phase A builds the external-link version and designs the portal-registration state as a variant, so either can be switched on.

---

## 3. Index page art direction

### S1 · Opener
**Treatment:** T1 full-bleed, half-height · **Ground:** image with scrim

Section title, the §6.1 definition sentence, and a prominent statement that everything on this page is organised or endorsed by Yoga Mandala.

### S2 · The current initiative — *"A programme prospectus"*
**Treatment:** T2 editorial inset, full-width feature · **Ground:** `paper`

The nearest upcoming initiative at large scale. Image bleeding left, the ten §6.1 fields typeset as a **colophon** — a brass-ruled definition list, `label` terms and `body` values — rather than pills or icon rows. The fee is stated plainly; the framework wants no sales pressure.

### S3 · Other initiatives — *"A programme calendar, typographically"*
**Treatment:** date-led index rows · **Ground:** `paper-deep`

Each initiative is one row: date block left (day numeral in brass, month in `label`), title at `title`, then type · format · audience as metadata. A thin image strip sits at the row's right edge, widening from 80px to 200px on hover as the row's rule extends. No boxes.

Filters as `label`-type chips: **Type · Format · Audience · Fee** — drawn straight from §6.1's own enumerations, so filtering is honest to the data model.

### S4 · Past initiatives
**Treatment:** T9 horizontal rail, desaturated · **Ground:** `paper`

Small, quiet, greyed. Evidence the community is real and active — the strongest trust signal on the page — without competing with the live programmes.

---

## 4. Detail page art direction

1. **Header** — full-bleed image, title at `display-l`, badge, one-line summary
2. **The colophon** — all ten §6.1 fields as a typeset record, sticky on desktop as you scroll
3. **Description** — "what participants will learn", single 720px column, `lead` into `body`
4. **Facilitator** — T3 layered pair: portrait + detail image, name, short profile, link to their directory profile if they have one
5. **Registration** — plain, unhyped. External link → clearly labelled as leaving the site. Portal registration → variant state, not built in Phase A
6. **Related** — two other initiatives, typographic only, no images

---

## 5. Assets

Index: 1 hero, 1 feature, 6–8 row strips (reusable pool). Detail: 1 header, 1 facilitator portrait, 1 detail image. All Stream B documentary — teaching, study, discussion. **No posed asana photography.**

## 6. Motion

Row hover: image widens over 240ms, brass rule extends. Colophon rows stagger on entry. Nothing else.

## 7. Responsive

Rows stack date-above-title; image strip becomes a full-width band beneath. Colophon moves above the description instead of sticking.

---

## 8. Content model

```yaml
type: initiative
title: string
initiativeType: workshop | study-circle | lecture | series | mentorship | other
facilitator: { name, shortProfile, portrait?, directorySlug? }
schedule: { date, time, timezone }
format: online | offline | hybrid
fee: { kind: free | paid | contribution, amount?, currency? }
audience: beginner | teacher | experienced-teacher | open
description: markdown
registration: { mode: portal | external, url? }
badge: yoga-mandala-learning-initiative   # fixed, never editable
status: upcoming | past
featured: boolean
sample: true                              # removed at content handover
```

Field names match the eventual `Learning Initiative` entity in §19 exactly, so Phase B swaps the source without touching the templates.

## 9. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **D1** | 2–3 real initiatives with all ten §6.1 fields | 🟠 | Samples until then |
| **E4** | Portal or external registration? | 🟠 | External built; portal designed as a variant |
| — | Have any initiatives already run? Any photos? | 🟠 | S4 past-initiatives section stays hidden until there's something real |
| — | Who counts as an "endorsed" initiative vs organised? §6.1 says "organised **or endorsed**" but never distinguishes them | 🟠 | Genuine ambiguity — same badge for both in Phase A |
| D8 | Photography of real sessions | No | Stream B |

## 10. Buildable now

Both templates in full, with 3 sample initiatives clearly marked. The colophon, filters, rail and detail layout are all real and working.

## 11. Acceptance criteria

- [ ] All ten §6.1 fields present on the detail page
- [ ] Badge always present, never editable in content
- [ ] Visually unmistakable from a Bulletin entry when seen side by side
- [ ] Filters map exactly to §6.1's enumerated values
- [ ] Fee presented factually, with no urgency or sales language
- [ ] External registration clearly signals leaving the site
- [ ] Every sample marked
