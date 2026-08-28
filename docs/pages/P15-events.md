# P15 — Events

**Routes:** `/events`, `/events/[slug]` · **Status:** 🟡 Build with sample content
**Framework source:** §9 EVENTS (types + card spec) · §4 IA · §21 roadmap Phase 1

---

## 1. Purpose

The page that proves the community is alive. An events page with three real upcoming entries does more for credibility than any amount of copy.

**Event types (§9, verbatim):** Yoga Mandala Sangha Meetups · Learning Initiatives · Study Circles · Expert Conversations · Community Workshops · Reading Circles · Partner / external events

**Event card (§9, verbatim):** *"Title • Date • Time • Location/Online • Host • Audience • Free/Paid • Description • Registration • Category/badge."*

**Resolves sitemap conflict #5:** §4 IA's "meetups, study circles, workshops, online events" are event *types*, not pages. One index with type filters.

---

## 2. The critical content rule

Seven event types, and they are **not equal in status**. Some are Yoga Mandala's own; "Partner / external events" are not. §10's badge system applies here exactly as it does to the Bulletin, and §23 says *"Never blur these categories."*

**Design consequence:** a Yoga Mandala meetup and a partner event must never be visually interchangeable. Badge first, always — and partner events additionally carry the host organisation's name in the primary metadata line, not buried in the detail page.

Note that **Learning Initiatives and Reading Circles appear both here and on their own pages.** They are the same records surfaced in two places, never duplicate entries. Cross-linked, single source.

---

## 3. Index page art direction

### S1 · The next event — *"One event, at full scale"*
**Treatment:** T1 full-bleed, 75vh · **Ground:** image with scrim

The single nearest upcoming event as an immersive opener. Enormous date numeral in `brass` outline crossing the image. Title at `display-l`. Badge, host, location/online, audience and free/paid as one hairline metadata row. One registration link.

**Why:** the most useful thing this page can tell someone is what's happening next. Giving it the whole first screen answers that before any scrolling.

### S2 · Filters
`label` chips: the seven §9 types · online/offline · free/paid · month. Sticky, hairline-ruled.

### S3 · Upcoming — *"A timeline, not a calendar"*
**Treatment:** vertical timeline with alternating editorial bands · **Ground:** `paper`

A continuous vertical brass rule down the page with month markers. Events attach to it, alternating left and right, at **sizes proportional to their significance** — a Yoga Mandala meetup takes a wide band with an image; a partner webinar takes a compact typographic entry. Uneven by design.

Each entry: date block · badge · title · host · location/online · audience · free/paid.

**Why:** a month-grid calendar is the obvious choice and is wrong here — the community will have a handful of events a month, and an empty grid looks abandoned. A timeline looks correct with three events *or* thirty, and its unevenness naturally encodes the status hierarchy the badges are enforcing.

### S4 · Past events
**Treatment:** T9 horizontal rail, desaturated · **Ground:** `paper-deep`

Small, quiet, with photographs where they exist. **The strongest trust signal on the site** — evidence that things actually happen. Hidden until there are at least three.

### S5 · Suggest a meetup
Quiet link to `/submit/event` and to the "Suggest Meetup / Initiative" route from §13.

---

## 4. Detail page

1. **Header** — full-bleed image, badge, title, giant date
2. **The record** — all ten §9 card fields as a brass-ruled colophon, sticky on desktop
3. **Description** — single 720px column
4. **Host** — T3 layered pair; for partner events, the organisation stated plainly with §10's `Partner / Guest` badge and an explicit line that it isn't organised by Yoga Mandala
5. **Registration** — external link clearly labelled as leaving the site. Portal registration is a designed variant, not built (decision E4)
6. **Location** — venue and address, or the online platform. No embedded map in Phase A (third-party scripts, cookie consent implications)
7. **Related** — two events of the same type, typographic

⚠️ §9's *"Future option: optional attendee check-in/registration, without turning the community into an engagement-metrics platform"* — **not built.** No attendee counts, no "23 going", no capacity bars. The framework explicitly warns against engagement metrics.

---

## 5. Assets

1 hero, 4–6 event images (Stream B documentary — gatherings, halls, discussion), 3–5 past-event images. Partner events may have no image; the typographic-only entry must look intentional.

## 6. Motion

Timeline rule draws down as you scroll. Bands fade-and-rise alternately. Hero date has slight parallax against its image. Past rail scrolls horizontally.

## 7. Responsive

Timeline moves to the left margin with all entries right of it — no alternation. Hero date sits above the title rather than crossing the image. Filters go to a bottom sheet.

---

## 8. Content model

```yaml
type: event
title: string
eventType: sangha-meetup | learning-initiative | study-circle |
           expert-conversation | community-workshop | reading-circle | partner-external
date: date
time: string
timezone: string                  # §6.1 requires timezone; events need it too
location: { venue?, city?, online: boolean, platform? }
host: { name, organisation?, memberSlug? }
audience: beginner | teacher | experienced-teacher | open
fee: { kind: free | paid | contribution, amount?, currency? }
description: markdown
registration: { mode: portal | external, url? }
badge: yoga-mandala | partner-guest
image: { src, alt }?
linkedInitiative: slug?           # when this event IS an initiative
status: upcoming | past
sample: true
```

Matches §19's `Event` entity, plus `timezone` and `linkedInitiative` — both necessary and both absent from §19.

## 9. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **D2** | 3–5 real upcoming events, all ten §9 fields | 🟠 | Samples until then. This page needs real events more than any other |
| **E4** | Portal or external registration? | 🟠 | External built; portal designed |
| — | Are events mostly online, offline, or both? | 🟠 | Changes the emphasis of the whole layout |
| — | Primary timezone for display? Show local time too? | 🟠 | Matters if the community is international (B4) |
| — | Do past events keep their pages, or get archived? | 🟠 | Recommend keeping — they're SEO and trust value |
| — | Photos from past meetups? | 🟠 | S4 stays hidden without them |
| — | Recurring events — do they exist? | 🟢 | Would need a recurrence model; not in §19 |

## 10. Buildable now

Both templates in full with 6 sample events spanning several types including a partner event, so the badge distinction is demonstrable. Timeline, filters and empty states all real.

## 11. Acceptance criteria

- [ ] All ten §9 card fields present
- [ ] All seven event types supported and filterable
- [ ] Yoga Mandala events visually unmistakable from partner events
- [ ] No calendar grid
- [ ] No attendee counts or engagement metrics anywhere
- [ ] Timezone displayed on every event
- [ ] Looks correct with 3 events and with 30
- [ ] Initiatives and Reading Circles cross-link rather than duplicate
- [ ] Past events section hidden until populated
