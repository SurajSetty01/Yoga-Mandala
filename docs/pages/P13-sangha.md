# P13 — Sangha

**Route:** `/connect/sangha` · **Status:** 🔴 **BLOCKED — not built, not routed**
**Framework source:** Appendix A sitemap (listed) · §3 Community Architecture (mentioned) · §4 IA (listed) — **and defined nowhere**

---

## 1. Why this page is blocked

"Sangha" appears **five times** in the framework, meaning something different almost every time:

| Where | Usage | What it seems to mean |
|---|---|---|
| §3 Community Architecture | "Teacher Directory, **Sangha**, meetups, experts" | Something distinct from the directory |
| §4 IA — Connect | "Teacher Directory, Experts, **Sangha**" | A page under Connect |
| Appendix A sitemap | `Connect → Sangha` | A page under Connect |
| §8 | "**Sangha Board**" | The opportunities board → [P14](P14-sangha-board.md) |
| §9 | "Yoga Mandala **Sangha** Meetups" | An event type → [P15](P15-events.md) |
| §13 | "Join the **Sangha**" | Membership → [P18](P18-join.md) |
| §11 | "Ask the **Sangha**" | The Q&A feature → [P17](P17-teachers-desk.md) |

So "Sangha" is used as the community's name generally, and *also* as a specific page under Connect that nothing in 17 pages describes.

**Four of the five usages already have their own page.** What remains for `/connect/sangha` is unclear — and building a page on a guess would produce exactly the "section that exists simply because typical websites have them" that the brief forbids.

---

## 2. Decision: omit until defined

Phase A **does not route this page** and **does not link to it**. A hollow page is worse than an absent one, and the Connect hub works fine with three children instead of four.

This is a deliberate, documented omission — not an oversight — and it's raised as question **C3** in the client data list.

---

## 3. The question to ask

> "Your sitemap has a page called 'Sangha' under Connect, separate from Sangha Board, Sangha Meetups, Join the Sangha and Ask the Sangha. What goes on it? If we can't describe it in one sentence, I'd suggest we drop it — the Connect section works without it."

---

## 4. The three plausible answers, and what each would cost

If the client does define it, it will almost certainly be one of these:

### Option A — "It's the community's story" *(most likely)*
An editorial page about who the community is: how it started, how it gathers, photographs of meetups, the culture and its norms.
**Effort:** low. One editorial page, heavily photographic. **Blocked on:** B1, B2, D8 — the same content that blocks [P02](P02-about.md).
**Risk:** overlaps About substantially. Might be better merged into About.

### Option B — "It's the member landscape"
An overview of the community as a whole — where members are, which traditions are represented, how it's grown. Effectively a portrait of the network rather than of individuals.
**Effort:** medium. Needs real member data to be anything other than fiction. **Blocked on:** D4 plus a real member base.
**Risk:** meaningless below a few hundred members. Genuinely good later.

### Option C — "It's the meetups page"
Where the community physically gathers — chapters, cities, regular meetups.
**Effort:** low–medium. **Blocked on:** whether regional meetups actually exist.
**Risk:** duplicates [P15 Events](P15-events.md) unless meetups are structurally different from events.

**Our recommendation:** if the answer is A, merge it into About and drop the route. If B, defer to Phase B when there's real data. If C, make it a filtered view of Events rather than a new page. **In all three cases, the right Phase A action is the same — don't build it.**

---

## 5. If the client insists it ships in V1

Minimum viable version, buildable in about a day once B1/B2/D8 arrive: an editorial page combining the community's story, meetup photography, a plain statement of size and reach, and the four pillars restated as lived practice rather than as product features. Treatments T1 → T5 → T3 → T10, all already defined in the design system.

## 6. Client data required

| # | Item | Blocking |
|---|---|---|
| **C3** | **One sentence: what is this page?** | 🔴 Absolutely — nothing proceeds without it |
| B1, B2 | Founding story, who runs it | 🔴 if Option A |
| D8 | Community photography | 🔴 if Option A or C |
| B5 | Community size and spread | 🔴 if Option B |

## 7. Acceptance criteria

- [ ] Route absent from the build and from navigation
- [ ] Connect hub composition works correctly with three children
- [ ] No dead links anywhere in the site
- [ ] Question C3 raised explicitly at the kickoff meeting
- [ ] This document updated the moment it's answered
