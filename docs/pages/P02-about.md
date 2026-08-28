# P02 — About Yoga Mandala

**Routes:** `/about`, `/about/governance` · **Status:** 🟡 Layout buildable now; four facts blocked
**Framework source:** §1 Executive Definition · §2 Identity & Boundaries · §15 Governance & Ownership · §25 Final Product Principle

---

## 1. Purpose

The second-most-important page on a community site. A teacher deciding whether to join reads this. It must answer: what is this, who is behind it, what are the rules, and can I trust it.

The framework gives us the *what* and the *rules* in full. It gives us nothing about the *who* — that is the blocking gap.

---

## 2. Content inventory

| Block | Source | Available now? |
|---|---|---|
| Mission statement | §1, verbatim | ✅ |
| Four pillars, expanded | §1 table | ✅ |
| WhatsApp → portal relationship | §1, §3 comparison table | ✅ |
| "Yoga Mandala IS" — 5 points | §2, verbatim | ✅ |
| "Yoga Mandala is NOT" — 5 points | §2, verbatim | ✅ |
| Pranava & neutrality statement | §2, verbatim | ⚠️ Need client's own wording (B6) |
| Founding story — when, why, by whom | — | ❌ **Blocked (B1)** |
| Who runs it | — | ❌ **Blocked (B2)** |
| Governance & ownership | §15, verbatim | ✅ structure; ❌ administrator names (B3) |
| Final product principle | §25, verbatim | ✅ |

---

## 3. Section-by-section art direction

### S1 · Statement opener — *"The mission as a wall text"*
**Treatment:** none — pure typography · **Ground:** `paper`

No image. The §1 mission sentence set at `display-l`, occupying most of the viewport, ragged right, capped at 16 words per line. A brass hairline and `— ABOUT` label above. Whitespace does the work.

**Why:** opening a scholarly page with a photograph would be the obvious move. Opening with nothing but a sentence signals confidence and sets this page apart from the homepage immediately.

### S2 · The four pillars, expanded
**Treatment:** T5 column strips · **Ground:** `paper`

Four tall 2:5 image columns at staggered vertical offsets, each captioned with a pillar name and its §1 meaning line below. Read left to right as a single frieze rather than four cards — no borders, no backgrounds, images touching the type directly.

### S3 · WhatsApp and the portal — *"Two columns, one argument"*
**Treatment:** typographic table · **Ground:** `paper-deep`

§3's comparison rendered as a proper two-column typographic table with brass rules — *Fast conversation / Permanent information home*, and so on down the five rows. No icons.

**Why:** this explains the product's reason for existing better than prose. The framework already wrote it as a table; respect that.

### S4 · What we are / what we are not — *"The pivot"*
**Treatment:** T4 type-crossing · **Ground:** `indigo-deep`

Two stacked lists. `IS` in `paper`, each of the five points on its own line at `title` size. Then a hard rule, and `IS NOT` in `ink` on a `paper` inset panel that overlaps the section edge — a deliberate visual reversal so the negative space reads differently from the positive.

**Why:** §2's IS/IS NOT pairing is the sharpest content in the whole framework. It deserves the boldest composition on the page.

### S5 · Independence & Pranava
**Treatment:** T2 editorial inset, image small and low-contrast · **Ground:** `paper`

The neutrality statement set as a standalone pull quote at `lead`, brass-ruled top and bottom. Framework §2: *"This distinction protects neutrality, trust and long-term credibility."* Beneath, in smaller type, the operating rule about labelling every organisation's offerings.

**Handle carefully** — the wording here is a governance matter, not copywriting. Use the client's own sentences (B6).

### S6 · The people — ❌ blocked
**Treatment:** T3 layered pair, planned · **Ground:** `paper-deep`

Portraits and short bios of the people behind Yoga Mandala. **Built as a visible `[content pending]` block** with correct spacing so the page composition is complete and the gap is obvious.

### S7 · Governance & ownership → `/about/governance`
**Treatment:** typographic list · **Ground:** `paper`

§15's principles set as a numbered editorial list. Include, verbatim: *"Yoga Mandala should be community-led rather than developer-led."* Publishing this openly is itself a trust signal, and §15 requires the policy be public.

### S8 · Closing principle
**Treatment:** T10 duotone ground · **Ground:** `indigo-deep`

§25 quoted in full at `display-m`, centred, over a very low-contrast duotone. *"Build the simplest useful version first. Let the community reveal what needs to exist next."*

---

## 4. Assets

3–4 documentary photographs (Stream B), 2 archival plates (Stream A) for texture in S3 and S8, 1 abstract ground. Portraits pending client.

## 5. Motion

Deliberately the quietest page on the site. Fade-and-rise only. One exception: the IS/IS NOT panel in S4 slides 24px on entry to emphasise the reversal.

## 6. Responsive

S1's wall text drops to `display-m` and takes the full column. S2's frieze becomes a horizontal rail. S3's table stacks into paired rows with the label above each. S4 stacks with the inset panel bleeding off the right edge.

---

## 7. Client data required

| # | Item | Blocking | Why we can't invent it |
|---|---|---|---|
| **B1** | Founding story — when, why, by whom | 🔴 **Yes** | Fabricating a community's origin story is not a placeholder decision |
| **B2** | Who runs it — names, roles | 🔴 **Yes** | Real people; cannot be sampled |
| **B3** | The two continuity administrators (§15 requires them) | 🟠 | Governance page |
| **B4** | Where it's based; India-only or international | 🟠 | One line, affects tone throughout |
| **B6** | Pranava relationship in the client's own words | 🔴 **Yes** | Governance-sensitive; our phrasing could misrepresent a real organisation |
| **B7** | Registered entity, trust, or informal collective | 🟠 | Governance + terms |
| C8 | Approval of mission copy as drawn from §1/§2 | 🟠 | We're quoting them to themselves |

**Ask B1, B2 and B6 as a 20-minute conversation, not a form.** They will talk more freely than they will write.

---

## 8. Buildable now

Sections S1, S2, S3, S4, S7, S8 in full — roughly 75% of the page — because the framework supplies their content verbatim. S5 gets placeholder wording flagged for replacement; S6 is a marked gap.

## 9. Acceptance criteria

- [ ] Every §2 IS / IS NOT point present and unaltered
- [ ] Neutrality statement present and prominent, not buried
- [ ] Governance policy public at `/about/governance`
- [ ] No invented history, founders, dates or affiliations anywhere
- [ ] Pending blocks are visibly marked in Phase A, never filled with plausible-sounding filler
- [ ] Page holds together visually with S6 empty
