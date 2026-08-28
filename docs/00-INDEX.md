# Yoga Mandala — Build Documentation Index

**Phase A — Public Website & Visual Identity**
Source of truth: *Yoga Mandala Portal & Community Framework V1* (17 pp.)

---

## Why this doc set exists

The client has said plainly that the deeper architecture — workflows, moderation, member data structures, verification rules — is **not yet decided**. So Phase A builds only what can be designed and built **without his input**, and every page doc carries an explicit list of **what we must collect from him** before that page can become real.

This is a **modular build**. Each page is documented independently so it can be designed, built and reviewed on its own, then integrated.

---

## Reading order

| # | Document | What it settles |
|---|---|---|
| 01 | [SITEMAP-LOCKED](01-SITEMAP-LOCKED.md) | The merged, **fixed** sitemap. Appendix A + §4 IA reconciled. Routes are frozen after this. |
| 02 | [DESIGN-SYSTEM](02-DESIGN-SYSTEM.md) | Typography, colour, spacing, motion language, image-treatment vocabulary |
| 03 | [ASSET-STRATEGY](03-ASSET-STRATEGY.md) | Where every image comes from, what to search for, what to never use |
| 04 | [CLIENT-DATA-MASTER-LIST](04-CLIENT-DATA-MASTER-LIST.md) | Every question for the client, consolidated from all page docs |
| 05 | [BUILD-MANIFEST-PHASE-A](05-BUILD-MANIFEST-PHASE-A.md) | Exactly what gets built now, in what order |

Then the per-page modules in [pages/](pages/).

---

## Page module index

Each page doc uses the same structure: Purpose → Content inventory → Section-by-section art direction → Assets → Motion → Responsive → Data model → **Client data required** → **Buildable now** → Acceptance criteria.

| ID | Page | Route | Phase A status |
|---|---|---|---|
| [P00](pages/P00-global-shell.md) | Global shell — header, nav, footer, transitions | — | 🟢 **Build now** |
| [P01](pages/P01-home.md) | Home | `/` | 🟢 **Build now** |
| [P02](pages/P02-about.md) | About Yoga Mandala | `/about` | 🟡 Build shell, 4 facts blocked |
| [P03](pages/P03-community-principles.md) | Community Principles | `/about/principles` | 🟢 **Build now** |
| [P04](pages/P04-learn-hub.md) | Learn hub | `/learn` | 🟢 **Build now** |
| [P05](pages/P05-learning-initiatives.md) | Learning Initiatives | `/learn/initiatives` | 🟡 Build with example data |
| [P06](pages/P06-curation-bulletin.md) | Curation & Learning Bulletin | `/learn/bulletin` | 🟡 Build with example data |
| [P07](pages/P07-library.md) | Library | `/learn/library` | 🟢 **Build now — real public-domain content** |
| [P08](pages/P08-reading-circle.md) | Reading Circle | `/learn/reading-circle` | 🟡 Build with example data |
| [P09](pages/P09-connect-hub.md) | Connect hub | `/connect` | 🟢 **Build now** |
| [P10](pages/P10-teacher-directory.md) | Teacher Directory | `/connect/directory` | 🟡 Build UI + filters, placeholder people |
| [P11](pages/P11-teacher-profile.md) | Teacher Profile | `/connect/directory/[slug]` | 🟡 Build template |
| [P12](pages/P12-experts.md) | Experts | `/connect/experts` | 🟡 Build as filtered view |
| [P13](pages/P13-sangha.md) | Sangha | `/connect/sangha` | 🔴 **Blocked — undefined in framework** |
| [P14](pages/P14-sangha-board.md) | Sangha Board (Collaborate) | `/collaborate` | 🟡 Build UI + example posts |
| [P15](pages/P15-events.md) | Events | `/events` | 🟡 Build with example data |
| [P16](pages/P16-discover.md) | Discover / Community Listings | `/discover` | 🟡 Build with example data |
| [P17](pages/P17-teachers-desk.md) | Teacher's Desk | `/learn/teachers-desk` | ⚪ Deferred — concept page only |
| [P18](pages/P18-join.md) | Join the Sangha | `/join` | 🟡 Build visual + form UI, no backend |
| [P19](pages/P19-submit-engine.md) | Submit hub + 5 forms | `/submit/*` | 🟡 Build visual + form UI, no backend |
| [P20](pages/P20-policy-and-contact.md) | Privacy, Terms, Guidelines, Contact | `/privacy` etc. | 🔴 **Blocked — legal + client content** |

**Legend:** 🟢 no client input needed · 🟡 buildable now with placeholder/example content, real content blocked · 🔴 blocked on client · ⚪ deferred to a later phase

---

## Ground rules for Phase A

1. **Do not invent product decisions.** Where the framework describes a feature whose architecture isn't settled, design the *public-facing concept* and stop there. Never build a workflow the client hasn't defined.
2. **Every major section gets its own visual idea.** No repeated card grids. Composition, typography, imagery, motion and pacing carry the experience — not more UI.
3. **Image-heavy ≠ box-heavy.** Imagery is part of the composition, not content inside a rectangle.
4. **Placeholder content must be labelled.** Any example teacher, event or listing carries a visible `Sample content` marker in the build so nobody mistakes it for real data. It is removed at content handover.
5. **The Initiative vs External Offering distinction is structural**, not cosmetic — framework handover item 30. Even in Phase A, badge data lives in the content model, never hardcoded into markup.
6. **Nothing ships that implies a person is real when they aren't.** No fabricated teacher names, credentials, quotes or testimonials — placeholder profiles use obvious placeholder identities. See [ASSET-STRATEGY §6](03-ASSET-STRATEGY.md).

---

## What Phase A does *not* include

Authentication · databases · moderation queues · submission processing · teacher verification · admin dashboards · email · payments · search backends. All of it is Phase B, and all of it is blocked on the decisions in `Yoga-Mandala-Kickoff-Meeting-Prep.md`.

Phase A produces a **complete, navigable, art-directed public website** running on structured local content files, ready for a backend to be attached behind it.
