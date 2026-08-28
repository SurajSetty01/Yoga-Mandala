# P16 — Discover / Community Listings

**Routes:** `/discover`, `/discover/[slug]` · **Status:** 🟡 Build with sample content
**Framework source:** §10 DISCOVER (curation workflow + badge table) · §3 Discovery layer · §4 IA

---

## 1. Purpose

§3 defines the Discovery layer as *"Opportunities and offerings"* — examples given: *"Learning Bulletin, events, spaces, collaborations."*

Discover is therefore **the aggregation layer**: one place where everything externally-sourced or member-submitted surfaces together, regardless of which section owns it. It is the answer to "what's new?"

**Resolves sitemap conflict #2:** the Curation & Learning Bulletin's canonical home is `/learn/bulletin` ([P06](P06-curation-bulletin.md)); Discover **cross-surfaces** it alongside community listings, events and board posts. One canonical URL per item, two routes to reach it.

---

## 2. What makes this different from the Bulletin

A fair question, and if the answer were "nothing", the page shouldn't exist.

| | Bulletin (P06) | Discover (P16) |
|---|---|---|
| Contains | Curated *external* offerings only | **Everything** new — bulletin, listings, events, board posts |
| Organised by | Category | **Recency and badge** |
| Character | A curated column | A live feed |
| Question answered | "What has the curation team selected?" | "What's happened lately?" |

Discover is the closest thing the site has to a front page for returning members. Its job is *freshness*; the Bulletin's job is *selection*.

---

## 3. The badge system is this page's spine

§10's badge table is published here in full, because Discover is the one page where all four badge types appear side by side:

| Badge | Meaning (§10, verbatim) |
|---|---|
| Yoga Mandala Learning Initiative | "Formally organised/endorsed by Yoga Mandala" |
| Curated Community Listing | "External opportunity selected for relevance" |
| Community Listing | "Member-submitted listing meeting community rules" |
| Partner / Guest | "Legitimate external collaborator or organisation" |

If this page blurs them, the framework's central content rule fails in the most visible place possible.

---

## 4. Index page art direction

### S1 · Opener — *"A dateline"*
**Treatment:** none · **Ground:** `paper`

Title, an issue-style dateline ("Updated 14 August"), and a one-line explanation that this is everything recently added, with badges showing where each item comes from.

### S2 · The badge key — *"Learn the language once"*
**Treatment:** inline legend · **Ground:** `paper`

The four badges rendered in their actual styling with their §10 definitions, as a compact horizontal key beneath the dateline. Doubles as a filter — clicking a badge filters to that type.

**Why:** a legend that is also the filter is honest and efficient. It teaches the system while being useful.

### S3 · The feed — *"A chronological broadsheet"*
**Treatment:** mixed-weight typographic feed with occasional imagery · **Ground:** `paper`

Items in reverse-chronological order, grouped under month or week markers. **Entry size varies by type**, not by importance-ranking:

| Type | Rendering |
|---|---|
| Event | Wide band, date-led, image where one exists |
| Learning Initiative | Wide band with badge prominent |
| Bulletin entry | Compact typographic record, no image |
| Community listing / board post | Compact, category-coloured hairline |

Mixing weights produces a genuine broadsheet rhythm and prevents the feed from becoming a uniform stream — while the variation itself encodes what kind of thing each item is.

**No infinite scroll.** A "load more" button — infinite scroll is an engagement pattern, and §9 warns against turning the community into an engagement-metrics platform.

### S4 · Expiring soon
**Treatment:** compact typographic list · **Ground:** `paper-deep`

Items approaching their expiry date. §10 requires every listing to have an expiry/review date and says *"Expired items are archived."* Surfacing what's about to lapse is useful to members and mirrors the "Expiring listings" queue that §20 gives admins.

**Why:** a small feature, taken directly from the framework's own admin spec, that makes the site feel maintained.

### S5 · How things get here
**Treatment:** hairline note · **Ground:** `indigo-deep`

§10's curation workflow published, plus its exclusion list, plus links to the submission routes. Shares its copy with [P06 S4](P06-curation-bulletin.md) — written once, used twice.

---

## 5. Detail page

Community listings render here; bulletin entries, events and initiatives route to their canonical pages instead. **One canonical URL per item, always** — duplicate content would harm the SEO that §18 marks as a Must.

Badge · title · category · description · location/online · submitter · posted · expiry · contact via enquiry form · report link.

---

## 6. Assets

2 for opener/S5 texture, plus images inherited from the events and initiatives being surfaced. **No new photography needed** — Discover borrows from what already exists, which is part of why it's cheap.

## 7. Motion

Feed items fade-and-rise with a 40ms stagger. Badge filter animates the list with a 240ms crossfade. Nothing else.

## 8. Responsive

Bands stack; size variation is preserved through type scale and image presence rather than width. Badge key becomes a horizontally scrolling chip row.

---

## 9. Content model

No new type. Discover **queries across** `bulletin`, `listing`, `event` and `initiative`, sorted by `posted` descending, filtered by `badge`.

```yaml
# query, not a content type
sources: [bulletin, listing, event, initiative]
sort: posted desc
filters: [badge, category, location]
exclude: expired
```

This is why the unified listing model matters — a heterogeneous feed is trivial when the entities share a shape, and painful when they don't.

## 10. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **D3, D7, D2** | Real content to aggregate | 🟠 | Discover is only as good as what feeds it — it can't be seeded independently |
| — | Confirm Discover aggregates rather than owning content | 🟠 | Our reading of §3's Discovery layer; worth confirming |
| — | Should members be able to subscribe to a digest of new items? | 🟢 | Phase B; needs email infrastructure |
| — | How long do items stay in the feed before dropping out? | 🟠 | Proposing 60 days or until expiry, whichever comes first |

## 11. Buildable now

The full page, aggregating samples from Bulletin, Sangha Board and Events. The aggregation, badge filtering and expiry logic are all real.

## 12. Acceptance criteria

- [ ] All four §10 badges rendered correctly and distinguishably
- [ ] Badge key present and functional as a filter
- [ ] Yoga Mandala content never visually blurred with external content
- [ ] One canonical URL per item — no duplicate content
- [ ] Expired items excluded automatically
- [ ] No infinite scroll, no engagement counters
- [ ] Feed reads as a broadsheet, not a uniform stream
- [ ] Looks correct with 5 items and with 50
