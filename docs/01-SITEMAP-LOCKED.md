# 01 — Locked Sitemap & Information Architecture

**Status: FIXED.** Routes below are frozen for Phase A. Changes require an explicit scope amendment.

This document **merges the framework's two conflicting structures** — §4 Information Architecture and Appendix A V1 Sitemap — into one authoritative tree.

---

## 1. The two source structures

**§4 Information Architecture** (verbatim):

| Main section | Core pages |
|---|---|
| Home | Mission, pillars, featured content, upcoming events, join CTA |
| Learn | Learning Initiatives, Library, Reading Circle, Teacher's Desk |
| Connect | Teacher Directory, Experts, Sangha |
| Collaborate | Sangha Board, opportunities, spaces, projects |
| Events | Meetups, study circles, workshops, online events |
| Discover | Curation & Learning Bulletin, Community Listings |
| About | Mission, principles, governance, contact |
| Join / Submit | Join, profile, event, learning, resource and listing submissions |

> "Recommended V1 navigation: Home | Learn | Connect | Collaborate | Events | Discover | About | Join / Submit"

**Appendix A V1 Sitemap** (verbatim tree): Home → About Yoga Mandala · Community Principles · Learn (Initiatives, Curation & Learning Bulletin, Library, Reading Circle) · Connect (Teacher Directory, Experts, Sangha) · Collaborate (Sangha Board) · Events · Discover (Community Listings) · **Teacher's Desk** (Ask the Sangha, Knowledge Base (future)) · Join the Sangha · Submit (Event, Learning Opportunity, Resource, Community Listing, Question).

---

## 2. The six conflicts, and how each is resolved

| # | Conflict | §4 IA says | Appendix A says | **Resolution** | Why |
|---|---|---|---|---|---|
| 1 | **Teacher's Desk placement** | Child of **Learn** | **Top-level** section | **Child of Learn** | §4 IA *and* §3 Community Architecture both file it under the Learning layer. 2 of 3 sources. It's deferred anyway. |
| 2 | **Curation & Learning Bulletin placement** | Child of **Discover** | Child of **Learn** | **Canonical route under Learn; cross-surfaced on Discover** | The framework's own chapter structure defines it in §6 LEARN. Discover becomes the aggregated discovery feed that pulls it in. One canonical URL, two entry points. |
| 3 | **About vs Community Principles** | One "About" section containing mission, principles, governance, contact | Two separate top-level pages | **One About section with four child pages** | Keeps the 8-item nav intact while giving Principles its own URL, which it needs — §15 requires guidelines published before data collection. |
| 4 | **Collaborate children** | "Sangha Board, opportunities, spaces, projects" | Sangha Board only | **Collaborate = Sangha Board.** Opportunities / spaces / projects are *categories inside it* | §8 already defines them as Sangha Board categories: "Looking for · Offering · Space · Project · Volunteer · Referral · Teacher exchange". They were never separate pages. |
| 5 | **Events children** | "Meetups, study circles, workshops, online events" | Events, no children | **One Events index with type filters** | §9's list is a list of event *types*, not pages. Matches the single "Event card" spec. |
| 6 | **Join / Submit** | One nav item | Two top-level items | **One nav item → two routes** | §4 explicitly calls the nav "Join / Submit". Preserves the 8-item nav. |

---

## 3. LOCKED sitemap

```
/                                   Home
│
├── /about                          About Yoga Mandala
│   ├── /about/principles           Community Principles
│   ├── /about/governance           Governance & Ownership
│   └── /about/contact              Contact & Moderation Contact
│
├── /learn                          Learn — hub
│   ├── /learn/initiatives          Yoga Mandala Learning Initiatives — index
│   │   └── /learn/initiatives/[slug]      Initiative detail
│   ├── /learn/bulletin             Curation & Learning Bulletin — index
│   │   └── /learn/bulletin/[slug]         Bulletin entry detail
│   ├── /learn/library              Library — index
│   │   └── /learn/library/[slug]          Resource detail
│   ├── /learn/reading-circle       Reading Circle
│   └── /learn/teachers-desk        Teacher's Desk        ⚪ DEFERRED — concept page
│       └── /learn/teachers-desk/ask       Ask the Sangha ⚪ DEFERRED
│                                          Knowledge Base — framework marks "(future)", not routed
│
├── /connect                        Connect — hub
│   ├── /connect/directory          Teacher Directory — index + filters
│   │   └── /connect/directory/[slug]      Teacher profile
│   ├── /connect/experts            Experts — filtered directory view
│   └── /connect/sangha             Sangha                🔴 BLOCKED — needs definition
│
├── /collaborate                    Sangha Board (7 categories, filterable)
│   └── /collaborate/[slug]         Board post detail
│
├── /events                         Events — index + type filters
│   └── /events/[slug]              Event detail
│
├── /discover                       Discover — curated feed (Bulletin + Community Listings)
│   └── /discover/[slug]            Community listing detail
│
├── /join                           Join the Sangha
│
├── /submit                         Submit — hub
│   ├── /submit/event
│   ├── /submit/learning-opportunity
│   ├── /submit/resource
│   ├── /submit/listing
│   └── /submit/question                                  ⚪ DEFERRED with Teacher's Desk
│
├── /privacy                        Privacy Policy         🔴 BLOCKED — legal
├── /terms                          Participation & Terms  🔴 BLOCKED — legal
└── /guidelines                     Community Guidelines   🟢 derivable from §14
```

**Primary navigation (locked, 8 items):**
`Home · Learn · Connect · Collaborate · Events · Discover · About · Join / Submit`

---

## 4. Route table

| Route | Page module | Type | Phase A |
|---|---|---|---|
| `/` | P01 | Static | 🟢 |
| `/about` | P02 | Static | 🟡 |
| `/about/principles` | P03 | Static | 🟢 |
| `/about/governance` | P02 | Static | 🟡 |
| `/about/contact` | P20 | Static | 🔴 |
| `/learn` | P04 | Hub | 🟢 |
| `/learn/initiatives` | P05 | Index | 🟡 |
| `/learn/initiatives/[slug]` | P05 | Detail | 🟡 |
| `/learn/bulletin` | P06 | Index | 🟡 |
| `/learn/bulletin/[slug]` | P06 | Detail | 🟡 |
| `/learn/library` | P07 | Index | 🟢 |
| `/learn/library/[slug]` | P07 | Detail | 🟢 |
| `/learn/reading-circle` | P08 | Static+Index | 🟡 |
| `/learn/teachers-desk` | P17 | Concept | ⚪ |
| `/connect` | P09 | Hub | 🟢 |
| `/connect/directory` | P10 | Index | 🟡 |
| `/connect/directory/[slug]` | P11 | Detail | 🟡 |
| `/connect/experts` | P12 | Filtered index | 🟡 |
| `/connect/sangha` | P13 | Static | 🔴 |
| `/collaborate` | P14 | Index | 🟡 |
| `/collaborate/[slug]` | P14 | Detail | 🟡 |
| `/events` | P15 | Index | 🟡 |
| `/events/[slug]` | P15 | Detail | 🟡 |
| `/discover` | P16 | Aggregated index | 🟡 |
| `/discover/[slug]` | P16 | Detail | 🟡 |
| `/join` | P18 | Form | 🟡 |
| `/submit` + 4 forms | P19 | Forms | 🟡 |
| `/privacy` `/terms` | P20 | Static | 🔴 |
| `/guidelines` | P20 | Static | 🟢 |

**Total Phase A routes: 26 templates.** Of these, **7 are fully unblocked**, 14 build with example content, 4 are blocked on client content, 1 is deferred.

---

## 5. Content-type map

Six content types drive every index page. This is the Phase A content model — flat files now, database later, **same shape either way**.

| Content type | Powers | Badge field | Notes |
|---|---|---|---|
| `initiative` | `/learn/initiatives` | always `Yoga Mandala Learning Initiative` | §6.1 fields |
| `bulletin` | `/learn/bulletin`, `/discover` | `Curated Community Listing` / `External Offering` | §6.2 — never auto-labelled as a YM programme |
| `resource` | `/learn/library` | — | §6.3 fields incl. rights/source |
| `event` | `/events`, homepage | `Yoga Mandala` / `Partner / Guest` | §9 event card fields |
| `listing` | `/collaborate`, `/discover` | `Community Listing` | Unified: Sangha Board post = community listing = same shape (§8/§19) |
| `person` | `/connect/directory`, `/connect/experts` | `Verified Teacher` when applicable | §7.1 profile fields |

**Architectural note carried from the scope document:** `bulletin` and `listing` are structurally the same object with different category vocabularies. They are modelled as one entity with a `type` discriminator, which is why the Sangha Board costs almost nothing to add.

**Badge vocabulary is fixed by §10 and must never be blurred (§23: "Never blur these categories"):**
`Yoga Mandala Learning Initiative` · `Curated Community Listing` · `Community Listing` · `Partner / Guest`

---

## 6. What is deliberately NOT routed

| Not built | Why |
|---|---|
| Knowledge Base | Appendix A itself labels it "(future)" |
| Member dashboard / account pages | Needs auth — Phase B |
| Admin panel | Phase B, and blocked on moderation decisions |
| Search results page | Directory/index filtering is client-side in Phase A; global search is Phase B |
| Login / register routes | Blocked on the authentication decision (kickoff Q4) |
