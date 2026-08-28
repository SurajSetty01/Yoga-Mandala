# P18 — Join the Sangha

**Route:** `/join` · **Status:** 🟡 Build visual + form UI; no backend, no submission
**Framework source:** §13 Submission System · §12 Membership & Roles · §16 Privacy · §5 homepage CTA

---

## 1. Purpose

The conversion page of the entire site. Every CTA in the header, footer and homepage points here.

It must do three things: explain what membership actually gives you, set honest expectations about what happens next, and take as little as possible.

---

## 2. The unresolved decision behind this page

⚠️ **The framework contradicts itself about registration** — kickoff Q3:

- §13 lists a *"Join the Sangha"* form → self-service
- §20's admin dashboard lists *"New member requests"* → approval queue
- §21's success criteria say a member should submit *"without admin intervention"*

**Phase A builds the open-signup version with a confirmation state**, and designs the pending-approval state as a variant. Switching between them is a copy change, not a rebuild — provided the page is designed for both from the start, which it is.

---

## 3. What membership gives you — §12, verbatim

| Role | Permissions |
|---|---|
| Member | "Profile, participation, submissions and event registration" |
| Verified Teacher | "Teacher directory profile after verification" |

**Two tiers, stated honestly on the page.** Joining makes you a Member. A directory profile is a separate, reviewed step. Conflating them would set up a bad first experience for every teacher who joins expecting to appear in the directory immediately.

---

## 4. Section-by-section art direction

### S1 · The invitation — *"An open door"*
**Treatment:** T1 full-bleed, 70vh · **Ground:** image with `indigo-deep` scrim

A photograph of people gathered — a real meetup, a room mid-discussion. Type low-left: `Join the Sangha` at `display-xl`, and beneath it a plain sentence about who this is for, drawn from §1: *"Yoga teachers and serious practitioners."*

**Deliberately not aspirational marketing copy.** §17 forbids aggressive sales language, and this community is selective by nature — stating who it's for is more attractive than promising benefits.

### S2 · What membership means
**Treatment:** two-column typographic table · **Ground:** `paper`

The two tiers side by side using §12's exact permission wording, with the path between them made explicit: *join as a Member → apply for a directory profile → reviewed against published criteria*.

**Why:** this single table prevents the most likely support question and the most likely disappointment.

### S3 · The form — *"Short, and it says why"*
**Treatment:** functional, hairline-ruled · **Ground:** `paper-deep`

§13's common fields, reduced to what joining genuinely requires:

| Field | Required | Why we ask — shown inline |
|---|---|---|
| Name | Yes | "Your public name in the community" |
| Email | Yes | "How we contact you. Never shown publicly" |
| Location (city/region) | Yes | "Helps members find people nearby" |
| I am a… teacher / practitioner / therapist / researcher / other | Yes | "Helps us understand the community" |
| How you heard about Yoga Mandala | No | — |
| Accuracy declaration | Yes | §13 requires it |
| Agreement to Community Guidelines | Yes | Links to [P03](P03-community-principles.md) |
| Publication consent | Yes | §13 requires it — states exactly what becomes public |

**§16 compliance built in:** *"Collect only information with a clear purpose."* Every field carries a one-line reason inline. Any field we can't justify in one line gets removed.

**Deliberately not collected at signup:** phone number, qualifications, bio, photo. Those belong to the directory-profile application, which is a separate reviewed step. Asking for them here inflates the form and collects data with no immediate purpose.

Form styling: single column, generous spacing, `label`-type field labels above brass-ruled inputs, no boxes. Inline validation on blur, never on keystroke.

### S4 · What happens next
**Treatment:** typographic sequence · **Ground:** `paper`

Honest expectations: what happens after submitting, how long it takes, what arrives by email, and how to apply for a directory profile afterwards.

**Content depends entirely on decision E3.** Both variants are written and ready.

### S5 · Privacy in plain language
**Treatment:** hairline note · **Ground:** `indigo-deep`

§16's principles restated as short plain sentences: what's collected, what's public, what's never shown, how to edit or delete, who can see member data. Links to the full policy.

**Why:** §16 requires *"Document who can access member data"*, and a community of professionals will read this before joining. Plain language here converts better than a link to a legal page.

---

## 5. States to build

Empty · filled · inline validation errors · submitting · **success (open signup)** · **success (pending approval)** · error · already-a-member. All eight designed in Phase A; none functional.

Submit button carries a clearly-labelled non-functional state so nobody demoing the site thinks it works.

## 6. Assets

1 hero (Stream B — real gathering, natural light, not posed), 1 duotone ground for S5. Two assets.

## 7. Motion

Hero image settles from 1.04 scale over 1400ms. Form fields have a 240ms focus transition on the brass rule. Nothing else — a form should feel stable.

## 8. Responsive

Hero type drops to `display-l`. Two-column tier table stacks. Form is full-width single-column with 48px+ tap targets.

---

## 9. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **E3** | **Open signup or admin approval?** | 🟠 | Determines S4 entirely. Both variants built |
| **C4/C5** | Privacy policy and terms | 🔴 for launch | §15: must be published *before* collecting member data. Cannot legally go live without them |
| C7 | Community guidelines confirmed | 🟠 | Form links to them |
| **E1** | Public vs member-only access | 🟠 | Changes the argument for joining |
| — | Is membership free? | 🟠 | Never stated anywhere in the framework. Assuming yes |
| — | Any eligibility requirement, or is it genuinely open? | 🟠 | §1 says "teachers and serious practitioners" — is that enforced or aspirational? |
| — | What confirmation email do members receive? | 🟠 | Phase B, but the copy is needed |
| D8 | A real photograph of the community gathered | 🟠 | The hero matters here more than on most pages |

## 10. Buildable now

The full page, all eight states, both success variants. Nothing submits.

## 11. Acceptance criteria

- [ ] Every field has a stated purpose inline (§16)
- [ ] No field collected without a clear reason
- [ ] Member vs Verified Teacher distinction unmistakable
- [ ] Accuracy declaration and publication consent both present (§13)
- [ ] Links to guidelines and privacy from within the form
- [ ] Both signup-model variants ready to switch
- [ ] Non-functional state clearly labelled in Phase A
- [ ] Fully keyboard-accessible with proper labels and error announcements
- [ ] No sales language anywhere
