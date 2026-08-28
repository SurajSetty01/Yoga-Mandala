# P20 — Policy Pages & Contact

**Routes:** `/privacy`, `/terms`, `/guidelines`, `/about/contact`
**Status:** 🔴 **Mostly blocked** — `/guidelines` buildable now, the rest need client content
**Framework source:** §15 · §16 · §14 · §22 launch content list

---

## 1. Why these matter more than usual

§15, verbatim:
> "Privacy, terms and community guidelines **published before collecting substantial member data**."

This is not a footer-page afterthought. It is a **launch gate**. [P18 Join](P18-join.md) and [P19 Submit](P19-submit-engine.md) both collect personal data, so neither can go live until these exist. They are on the critical path and should be requested at the kickoff meeting, not a week before launch.

---

## 2. Status by page

| Page | Status | Blocked on |
|---|---|---|
| `/guidelines` | 🟢 **Buildable now** | §14 supplies the full content — see [P03](P03-community-principles.md) |
| `/privacy` | 🔴 Blocked | C4 — needs writing + legal review |
| `/terms` | 🔴 Blocked | C5 — needs writing + legal review |
| `/about/contact` | 🔴 Blocked | C6 — needs actual contact addresses |

---

## 3. Privacy Policy — `/privacy`

**We can supply the structure; the client must supply the substance and have it reviewed.**

§16 already gives eight principles that a policy must reflect, verbatim:

> "Collect only information with a clear purpose · Do not publicly expose private phone numbers or emails by default · Give members control over public profile fields · Provide profile editing and deletion mechanisms · Do not publish sensitive personal information · Use secure authentication and role-based permissions · Back up the database and document recovery · Document who can access member data"

**Required sections:** what's collected and why · what's public vs private · how profile visibility is controlled · how to edit or delete a profile · who can access member data · retention · cookies and analytics · third-party services · data location · rights and how to exercise them · contact for data questions.

⚠️ **Jurisdiction is undetermined.** Nothing in 17 pages says where members are. If they're in India, the DPDP Act applies; if any are in the EU, GDPR does. This changes the policy's content materially, so it's question **F5** and must be answered before drafting.

**Design:** the plainest page on the site. `paper` ground, single 680px column, clear heading hierarchy, no imagery, a sticky section index. Readability is the only goal.

**Phase A ships:** the route, the layout, a visible statement that the policy is being finalised, and a contact route for questions. **Never placeholder legal text** — lorem-ipsum or generic template text in a privacy policy is worse than an honest gap.

---

## 4. Participation & Terms — `/terms`

**Required sections:** who may join · acceptable use (references the guidelines) · what members submit and what rights they retain · what Yoga Mandala may publish, edit or remove · moderation authority and the appeals route · the verification disclaimer · the external-offering disclaimer · liability limits, particularly around health and therapeutic claims · account termination · governing law.

**Two clauses the framework specifically demands:**
- §12: *"'Verified Teacher' means the submitted information has been reviewed against those criteria; it should not imply blanket endorsement."*
- §6.2: external offerings *"are NOT automatically Yoga Mandala programmes."*

Both are liability-relevant. A member who has a bad experience with a verified teacher or a curated external retreat will look here first.

⚠️ **§11's medical-claims caution belongs here too**, in binding form rather than as guidance.

---

## 5. Community Guidelines — `/guidelines` 🟢

**Buildable now.** §14 supplies all eight principles and §11 supplies the claims standard. Rendered from the same content as [P03 Community Principles](P03-community-principles.md) — one source, two routes:

- `/about/principles` — the editorial, designed presentation
- `/guidelines` — the plain reference version linked from forms and the footer

Same content, different register. Written once.

---

## 6. Contact & Moderation — `/about/contact`

§22 requires *"Contact/moderation contact"* as launch content.

**Design:** three distinct routes, because conflating them creates a bad experience.

| Route | For |
|---|---|
| General enquiries | Anything about Yoga Mandala |
| Moderation | Reporting content, questioning a decision, appealing |
| Data & privacy | Access, correction, deletion requests |

Each as a labelled block with a short description and a form, never an exposed email address — consistent with §16's rule against publishing contact details, applied to the organisation as well as to members.

⚠️ **The appeals route has no defined process.** Their Appendix B asks *"How are moderation disputes handled?"* and never answers it. The moderation block cannot state what happens after someone raises a concern.

**Design treatment:** T2 editorial inset, one image, three hairline-ruled blocks. Quiet and clear.

---

## 7. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **C4** | Privacy Policy content | 🔴 **Launch gate** | §15 requires it before data collection |
| **C5** | Terms / Participation policy | 🔴 **Launch gate** | Same |
| **C6** | Contact addresses — general, moderation, data | 🔴 | Three, or confirmation that one covers all |
| **F5** | Where members are located → jurisdiction | 🔴 | Determines what the privacy policy must say |
| — | Is there legal support, or are we adapting a template? | 🔴 | Affects timeline significantly |
| — | **Appeals process** | 🟠 | Their own unanswered question |
| — | Who is the data controller — a person, or an entity? (B7) | 🔴 | A privacy policy needs a named controller |
| — | Will analytics be used, and which tool? | 🟠 | Determines cookie disclosure |
| — | Retention period for member data | 🟠 | Required section |

## 8. Buildable now

`/guidelines` in full. Layout, navigation, section index and typography for all four pages. Honest "being finalised" states for privacy and terms.

## 9. What we will not do

- Generate a privacy policy from a template and present it as ready
- Write legal terms without review
- Use placeholder legal text that could be mistaken for real
- State a data-protection position without knowing the jurisdiction

**A wrong privacy policy is worse than a missing one.** It creates a false representation to members about how their data is handled, in a product whose entire premise is trust.

## 10. Acceptance criteria

- [ ] `/guidelines` complete, quoting §14 and §11
- [ ] Privacy and terms routes exist with honest pending states
- [ ] No placeholder legal text anywhere
- [ ] Contact page separates general, moderation and data routes
- [ ] No email addresses exposed
- [ ] All four pages linked from the footer
- [ ] Join and Submit both link to guidelines and privacy
- [ ] Client informed in writing that C4/C5 gate the launch
