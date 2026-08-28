# P09 — Connect Hub

**Route:** `/connect` · **Status:** 🟢 Build now
**Framework source:** §7 CONNECT · §3 Community Architecture (Community layer) · §21 success criterion 2

---

## 1. Purpose

§3 defines the Community layer as *"People and relationships"*. §21's second success criterion is *"A teacher can find another relevant teacher quickly."*

So this hub has one job above all others: **get people into the directory fast.** It is not a landing page to be admired; it's a doorway. The design should be warm and human, then get out of the way.

**Children (locked):** Teacher Directory · Experts · Sangha *(blocked — see [P13](P13-sangha.md))*

---

## 2. Section-by-section art direction

### S1 · Opener — *"Faces, at scale"*
**Treatment:** T5 column strips, full-height · **Ground:** `paper`

Five tall portrait strips at staggered vertical offsets across the viewport, cropped tightly — a shoulder, a profile, hands, a face turned away. `CONNECT` set large, crossing in front of them. §3's line, *"People and relationships"*, as the standfirst.

**Phase A:** these are treated placeholders per the integrity rules — cropped away from faces or duotoned, never presented as identifiable members.

**Why:** the Connect section is about people, and the opener should feel populated. Strips give a sense of many without a face grid, which would look like a fake testimonial wall.

### S2 · Find a teacher — *"The search, embedded"*
**Treatment:** functional block, no imagery · **Ground:** `paper-deep`

The directory's actual filters, live, on the hub page. §7.1's seven filters as `label` chips: **City/region · Tradition/approach · Area of teaching · Experience · Online/offline · Language · Role**. Selecting any of them navigates straight to a pre-filtered directory.

**Why:** the fastest path to success criterion 2 is putting the filter here rather than making people click through and *then* filter. This is the "minimal clicks for common actions" requirement from §17 taken literally.

### S3 · The directory, previewed
**Treatment:** T3 layered pairs, three at varied scales · **Ground:** `paper`

Three teachers previewed as editorial fragments — portrait plus a metadata line plus one detail — at deliberately unequal sizes. Not a row of equal cards. Links into the full directory.

Includes the directory's current size as a plain statement of fact. Honest either way: a small number reads as an early community, which is true.

### S4 · Experts
**Treatment:** T2 editorial inset · **Ground:** `indigo-deep`

§7.2's definition: *"A curated list of experienced members willing to contribute to Q&A, study circles, expert conversations or mentoring."*

Alongside it — with equal visual weight, not as fine print — §7.2's caveat: *"Verification must be transparent and must not imply blanket endorsement."*

**Why:** the framework twice insists verification must not imply endorsement (§7.2, §12). Giving that sentence real prominence rather than hiding it is both honest and a differentiator.

### S5 · Sangha — conditional
**Treatment:** TBD · **Ground:** `paper`

**Not built until the client defines what this page is (C3).** If undefined at build time, this section is omitted and the nav link removed — a hollow page is worse than no page.

### S6 · Join
**Treatment:** T10 duotone ground · **Ground:** `indigo-deep`

Quiet invitation to `/join`, with a plain statement of what membership means, drawn from §12's Member row: *"Profile, participation, submissions and event registration."*

---

## 3. Assets

5 portrait strips (treated placeholders), 3 preview portraits + 3 detail images (placeholders), 1 documentary photograph for S4, 1 duotone ground. All portrait placeholders follow the [integrity rules](../03-ASSET-STRATEGY.md#6-integrity-rules--non-negotiable) — no stock face presented as a member.

## 4. Motion

Portrait strips parallax at differing rates (4/8/12%). Filter chips have a 240ms fill on hover. Preview fragments fade-and-rise. Nothing else.

## 5. Responsive

Strips reduce from five to three and become a horizontal rail. Filters become a stacked accordion by category. Previews stack, retaining unequal sizing.

---

## 6. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **C3** | **What is the Sangha page?** One sentence | 🔴 for S5 | Undefined in the framework; section omitted otherwise |
| **C2** | Expert Network criteria + non-endorsement wording | 🟠 | S4 copy |
| **E1** | Is the directory public or member-only? | 🟠 | Changes whether S2's filters lead to results or a sign-in prompt |
| D4/D9 | Real teachers and consented portraits | 🟠 | Placeholders until then |
| B5 | Current community size | 🟠 | S3 states the real count |

## 7. Buildable now

S1, S2, S3, S4, S6 in full. S5 omitted pending C3.

The filter block in S2 is real and functional against sample data from the start — filtering logic doesn't need real people to work.

## 8. Acceptance criteria

- [ ] A visitor can reach a filtered directory result in one click from this page
- [ ] No face grid, no testimonial wall
- [ ] Non-endorsement caveat is prominent, not fine print
- [ ] Placeholder portraits cannot be mistaken for real members
- [ ] Sangha section absent rather than hollow if undefined
- [ ] Filters map exactly to §7.1's seven filters
