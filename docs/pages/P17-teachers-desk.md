# P17 — Teacher's Desk

**Route:** `/learn/teachers-desk` · **Status:** ⚪ **DEFERRED — concept page only, no forum built**
**Framework source:** §11 TEACHER'S DESK (12 topics, Ask the Sangha, claims rule) · §21 roadmap Phase 2

---

## 1. Why this is deferred

§21 places Teacher's Desk in **Phase 2**. §18's Must list and §23's "V1 must include" list both omit it. Only the Appendix A sitemap shows it in V1 — the conflict documented in [01-SITEMAP-LOCKED](../01-SITEMAP-LOCKED.md).

The stronger argument is operational rather than technical:

> A threaded Q&A where §14's lifecycle applies means **a moderator reads every question and every answer before it appears.** That is the largest ongoing human cost in the entire framework, and it falls on the client's volunteers, not on us. Launched empty with no moderators rostered, it reads as abandoned. Launched successfully, it consumes more moderator hours than everything else combined.

Ship the portal, prove the moderation habit works on submissions, then open the forum — which is exactly what the client's own roadmap says.

---

## 2. What Phase A builds instead

A **concept page**: an honest, well-designed page describing what Teacher's Desk will be, using §11's real content as evidence it's a genuine plan.

No fake forum. No sample questions. No "coming soon" countdown. No email capture.

**The framework's brief supports this exactly:** *"Where the framework describes a feature but the exact architecture or information structure is still unclear, design the public-facing concept without pretending the underlying product decision has been finalised."*

---

## 3. Section-by-section art direction

### S1 · The problem it solves
**Treatment:** T4 type-crossing · **Ground:** `paper`

§11's opening line set at `display-l`: *"A structured alternative to allowing valuable teacher discussions to disappear in WhatsApp."*

That sentence is the entire argument, and it's the same argument as the Sangha Board's — worth stating twice on the site because it's the product's core insight.

### S2 · The twelve subjects
**Treatment:** typographic index · **Ground:** `paper-deep`

§11's topics, verbatim, as a large typeset list: Teaching methodology · Asana and sequencing · Anatomy / biomechanics · Yoga therapy · Pranayama · Philosophy / texts · Ayurveda · Teaching ethics · Student management · Professional development · Career / community building.

Set at `title` size in two asymmetric columns with brass rules. Substantial and specific — this list alone demonstrates the seriousness of the plan.

### S3 · Ask the Sangha, explained
**Treatment:** T2 editorial inset · **Ground:** `paper`

§11: *"Members submit questions; qualified members respond. Valuable discussions can later be curated into knowledge-base articles after review."*

Described plainly, in future tense, with no interface mock-up. A mock-up would imply decisions nobody has made.

### S4 · How answers will be held to a standard
**Treatment:** four-part typographic definition · **Ground:** `indigo-deep`

§11's claims rule, which is the most intellectually serious content in the framework:

> "Distinguish personal experience, professional opinion, traditional interpretation and evidence-supported information. Therapeutic/medical claims require appropriate care and should not be presented as diagnosis or medical advice."

The four categories set as large numbered definitions, with the medical caution in a hairline-boxed note beneath.

**Why this section carries the page:** it's the thing that would make Yoga Mandala's Q&A different from every yoga forum on the internet. Publishing the standard *before* the feature exists is a statement of intent, and it's genuinely useful reading on its own.

### S5 · When
**Treatment:** hairline note · **Ground:** `paper`

Honest: this is planned for a later phase, after the community's moderation practice is established. Points to the Sangha Board and the Bulletin as what's available now.

**No date promised.** A missed date is worse than no date.

---

## 4. Assets

1 archival plate (S2 ground), 1 documentary photograph (S3). Deliberately minimal — the page is text-led because its content is intellectual.

## 5. Motion

Fade-and-rise only. This is a page to read.

## 6. Responsive

Two-column topic list becomes single-column. S4's definitions stack, retaining their scale.

---

## 7. What we are explicitly NOT building

| Not built | Why |
|---|---|
| Question submission | Needs the moderation workflow (kickoff Q5) |
| Threaded answers | Needs answer moderation, editing, reporting, notifications |
| "Qualified members respond" logic | §11 says "qualified" and never defines it |
| Voting, accepting, or marking best answers | Not in the framework; would be gamification, which §17 forbids |
| Knowledge base | Appendix A labels it "(future)"; roadmap Phase 3 |
| Sample questions and answers | Would fabricate community discussion — forbidden by the integrity rules |

## 8. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **E5** | Confirm Teacher's Desk is deferred | 🟠 | If they insist on V1, this becomes a major scope change and the moderation-staffing question (Q5) becomes urgent |
| — | **What makes a member "qualified" to answer?** | 🔴 for any build | §11 says "qualified members respond" and never defines it. Same gap as Verified Teacher |
| — | Pre-moderation or post-moderation for answers? | 🔴 for any build | §14's lifecycle implies pre-moderation, which is very slow for Q&A |
| — | Is there moderator capacity for this at all? | 🔴 for any build | The real deciding question |
| C7 | Confirm §11's claims rule may be published now | 🟠 | It's good content and worth publishing regardless |

## 9. Buildable now

The complete concept page. §11 supplies all of its content.

**This page has unexpected value:** publishing the claims standard and the twelve subjects signals seriousness to prospective members, and it does so before a single line of forum code exists.

## 10. Acceptance criteria

- [ ] Nothing implies the feature exists yet
- [ ] No fabricated questions, answers or usernames
- [ ] All twelve §11 subjects listed
- [ ] Claims rule published in full, including the medical caution
- [ ] No date promised
- [ ] Reads as a genuine plan, not a placeholder
- [ ] Routes visitors to what's actually available now
