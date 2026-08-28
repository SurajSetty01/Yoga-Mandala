# P03 — Community Principles

**Route:** `/about/principles` · also powers `/guidelines` · **Status:** 🟢 Build now — content supplied verbatim by the framework
**Framework source:** §14 Moderation & Community Guidelines · §11 claims rule · §2 boundaries

---

## 1. Purpose

§15 requires that *"privacy, terms and community guidelines"* are **published before collecting substantial member data**. This page is therefore on the critical path to any Phase B launch — and unusually, we can write it now, because §14 already contains the complete list.

---

## 2. Content inventory — §14, verbatim

> - "Respect Yoga's diversity of traditions while allowing thoughtful disagreement."
> - "No harassment, personal attacks or targeted hostility."
> - "No spam or repeated unsolicited promotion."
> - "No misleading claims about qualifications, outcomes or therapeutic benefits."
> - "No impersonation or unnecessary personal information."
> - "No copyright infringement or unauthorised distribution."
> - "Commercial offerings use the appropriate submission/listing route."
> - "Moderators act consistently and document significant decisions."

Plus, from §11, the claims standard:
> "Distinguish personal experience, professional opinion, traditional interpretation and evidence-supported information. Therapeutic/medical claims require appropriate care and should not be presented as diagnosis or medical advice."

Plus the eight-state submission lifecycle from §14, which belongs here because members deserve to know what happens to what they submit.

---

## 3. Section-by-section art direction

### S1 · Opener
**Treatment:** typography only · **Ground:** `paper`

A single framing sentence at `display-m`, drawn from §2's community-led identity. Brass hairline. No image — this page's authority comes from restraint.

### S2 · The principles — *"A charter, not a T&C page"*
**Treatment:** numbered editorial list · **Ground:** `paper`

Eight principles, each as: a large brass numeral, a short bold restatement at `title`, then the §14 wording at `body`. Generous vertical spacing — roughly 96px between principles, so each is read on its own rather than skimmed as a block.

Left margin holds a sticky `label`-type index that highlights the current principle as you scroll. Quiet, useful, and gives the page a spine.

**Why:** every website renders guidelines as a bulleted wall of grey text. Setting them at the scale of a charter tells members these are values, not legalese.

### S3 · On claims and traditions — *"The most important paragraph"*
**Treatment:** T7 masked shape (arch), used once here · **Ground:** `paper-deep`

§11's four-way distinction — personal experience / professional opinion / traditional interpretation / evidence-supported information — set as four short definitions in a row, brass-ruled. Beside them, an archival plate in an arch mask.

Below, the medical-claims caution set apart in a hairline-boxed note. This is the site's clearest safety-relevant statement and should be findable.

**Why:** this is the one place a shaped image earns its keep — an arch is a manuscript-niche reference, and using it exactly once sitewide keeps it meaningful.

### S4 · What happens when you submit something
**Treatment:** horizontal typographic flow · **Ground:** `indigo-deep`

The §14 lifecycle as a horizontal sequence: Draft → Submitted → Under Review → Approved / Changes Requested / Rejected → Published → Expired / Archived. Set in `label` type along a brass rule, with each state's one-line meaning beneath. The three-way branch renders as an actual visual branch.

**Why:** transparency about moderation is a trust feature. Publishing the process is the strongest possible answer to "who decides what gets published?"

### S5 · Moderation & contact
**Treatment:** none · **Ground:** `paper`

§14's *"Moderators act consistently and document significant decisions"* stated plainly, plus how to contact moderation and how to raise a concern.

⚠️ **The framework never defines an appeals process** — Appendix B asks *"How are moderation disputes handled?"* and never answers it. Phase A ships this section without an appeals paragraph and flags the gap.

---

## 4. Assets

One archival plate (S3). Otherwise none. **This page is deliberately almost imageless** — it is the strongest contrast on the site and proves the design system works without photography.

## 5. Motion

Fade-and-rise only. Sticky index updates without animation.

## 6. Responsive

Sticky index becomes a collapsed progress bar. Lifecycle flow rotates to vertical. Arch image moves above the definitions.

---

## 7. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| C7 | Confirm we may publish §14 near-verbatim | 🟠 | We're quoting their own document |
| — | **Appeals / dispute process** | 🟠 | Genuine gap — their Appendix B asks it and doesn't answer |
| C6 | Moderation contact address | 🟠 | Needed for S5 |
| — | Should `/guidelines` be a separate page or an alias of this one? | 🟢 | Default: alias |

## 8. Buildable now

**The entire page.** §14 supplies all eight principles, §11 supplies the claims standard, §14 supplies the lifecycle. Only the appeals paragraph and the contact address are missing, and both are small inserts.

## 9. Acceptance criteria

- [ ] All eight §14 principles present, unaltered in meaning
- [ ] §11 claims distinction and the medical-claims caution both present
- [ ] Full submission lifecycle published, including the three-way branch
- [ ] Page reads as a charter, not a legal notice
- [ ] Works with a single image — proves the type system carries alone
- [ ] Linked from the footer, Join page and every submission form
