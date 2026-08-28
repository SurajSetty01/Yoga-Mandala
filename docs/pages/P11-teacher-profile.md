# P11 — Teacher Profile

**Route:** `/connect/directory/[slug]` · **Status:** 🟡 Build template; real people blocked
**Framework source:** §7.1 fields · §12 verification · §16 privacy

---

## 1. Purpose

The page a teacher is judged on, and often the first Yoga Mandala page a stranger lands on from a search engine. It has to feel like a person, respect their privacy, and make contact easy without exposing anything.

Also the site's main SEO surface — §18 marks SEO basics a Must, and individual teacher pages are what actually get indexed.

---

## 2. Section-by-section art direction

### S1 · The person — *"An editorial portrait spread"*
**Treatment:** T3 layered pair · **Ground:** `paper`

Large portrait occupying columns 1–5, bleeding off the left edge. A smaller secondary image — a teaching space, hands, a book — overlaps its lower-right corner where one exists.

Right side: name at `display-l`; beneath it, in `label` type, the essential line — *tradition · city · years · online/offline*. The `Verified Teacher` badge sits here where applicable, with the §12 caveat available on hover and in full at S5.

**No-photo variant:** the name takes the full width at `display-xl`, with the tradition set beneath it in the Devanagari face where a Sanskrit tradition name applies. It should look like a deliberate typographic portrait — arguably more striking than the photo version, which is the point.

### S2 · Bio
**Treatment:** none · **Ground:** `paper`

The 100–150 word bio (§7.1's limit) in a single 620px column at `lead` size. Generous space. Nothing else in the viewport.

**Why:** 150 words is short. Giving it a full quiet screen makes a teacher's own words feel considered rather than squeezed into a card.

### S3 · The record — *"A colophon"*
**Treatment:** typographic definition list · **Ground:** `paper-deep`

The remaining §7.1 fields as a brass-ruled two-column record: Qualifications · Areas of interest · Languages · Teaching format · Experience · Links.

Areas of interest and languages render as `label` chips that link back to a filtered directory — turning every profile into a discovery route into the rest of the community.

### S4 · Contact — *"An enquiry, not an email address"*
**Treatment:** functional block · **Ground:** `paper`

§7.1: *"Prefer enquiry form rather than public private details."* §16: *"Do not publicly expose private phone numbers or emails by default."*

A short form — your name, your email, your message, and a purpose selector (enquiring about classes / collaboration / mentoring / other). Plain, hairline-ruled, no card.

**Phase A:** fully designed and interactive, submits nothing. Whether a non-member can send an enquiry is decision E2.

⚠️ **Never render the teacher's email or phone,** even if present in the data. Not in text, not in a `mailto:`, not in markup.

### S5 · Verification statement
**Treatment:** hairline note · **Ground:** `paper-deep`

Where verified: what was reviewed, against which criteria version, when — plus §12's caveat verbatim: *"'Verified Teacher' means the submitted information has been reviewed against those criteria; it should not imply blanket endorsement."*

Where unverified: nothing at all. **No "unverified" badge** — marking absence would create a two-tier stigma the framework never asks for.

### S6 · Elsewhere in the community
**Treatment:** typographic list · **Ground:** `paper`

Initiatives they facilitate, events they host, reading circles they lead. Empty state simply omits the section.

### S7 · Related teachers
**Treatment:** typographic rows, no images · **Ground:** `paper`

Three teachers sharing a tradition, city or area of interest. Text-only — the visual weight stays with the person whose page this is.

---

## 3. Privacy checklist — built in, not bolted on

- [ ] No email, phone or address rendered anywhere, in any form
- [ ] `fieldVisibility` respected on every field at render time
- [ ] Enquiry form never reveals the recipient's address
- [ ] Portrait only where explicit consent is recorded
- [ ] Profile is `noindex` if the member has opted out of public listing
- [ ] Structured data (`Person` schema) includes only public fields

## 4. Assets

1 portrait + 1 optional detail image per profile. Placeholders in Phase A, treated so they can't be mistaken for real people.

## 5. Motion

Almost none. Portrait mask-wipes on entry (900ms). Chips fill on hover. A person's page should feel still.

## 6. Responsive

Portrait becomes full-bleed at the top with the name overlaid at its base; the detail image moves to a small inset. The record stacks to single-column. The enquiry form goes full-width.

---

## 7. SEO

Per-profile `<title>`: `{Name} — {Tradition} teacher in {City} · Yoga Mandala`. Meta description from the bio's first sentence. `Person` structured data, public fields only. Semantic heading order. Real URLs, no hash routing.

**This is where organic discovery actually happens** — the strongest argument for keeping the directory public (decision E1).

## 8. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **C1** | Verified Teacher criteria + version | 🔴 for S5 | Cannot describe what was reviewed without them |
| **E2** | Can non-members send enquiries? | 🟠 | Changes S4's state |
| **D4/D9** | Real profiles and consented portraits | 🟠 | Placeholders |
| — | Is the enquiry an email relay or an in-portal inbox? | 🟠 | Relay exposes the teacher's address on reply — a real privacy decision |
| — | Should profiles be indexable by search engines by default, with opt-out? | 🟠 | Recommend yes-with-opt-out; needs consent wording |
| — | Can a teacher preview their profile before it publishes? | 🟢 | Phase B |

## 9. Buildable now

The full template, both photo and no-photo variants, all states, with 12–15 placeholder profiles. Every layout decision, the enquiry UI and the SEO structure are real.

## 10. Acceptance criteria

- [ ] All twelve §7.1 fields supported and rendered
- [ ] Bio respects the 100–150 word guidance
- [ ] No contact details exposed anywhere, in any form
- [ ] No-photo variant looks deliberate and strong
- [ ] Verification caveat present verbatim where verified; nothing shown where not
- [ ] Chips link back to filtered directory views
- [ ] Valid `Person` structured data with public fields only
- [ ] Page works with only the required fields filled — most profiles will be sparse
