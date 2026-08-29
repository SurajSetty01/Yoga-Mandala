# Yoga Mandala — Website (Phase A) · Overview

**This folder is a fresh, self-contained build of the Yoga Mandala public website.**
Source of truth: the `Context/` folder at the project root (framework scope + kickoff prep + the client promotional artifact). Nothing here derives from any prior implementation.

---

## What this is

A complete, navigable, art-directed **public static website** for Yoga Mandala — a community and learning ecosystem for Yoga teachers and serious practitioners. It runs on structured local content files with no backend, and is designed so a Phase-B backend can be attached behind the same content shapes later.

**Promise (framework §1):** Learn. Connect. Collaborate. Serve.

## What Phase A includes

Public pages only: home, about + governance, community principles/guidelines, the Learn cluster (initiatives, curation bulletin, a genuinely real public-domain library, reading circle, a Teacher's Desk concept page), the Connect cluster (teacher directory + profiles + experts), Collaborate (Sangha Board), Events, Discover, Join (UI only), Submit (UI only), and routed policy/contact shells.

## What Phase A explicitly does NOT include

Authentication · database · admin/moderation · submission processing · teacher verification · email · payments · WhatsApp API · search backend · member accounts. All of it is Phase B and blocked on client decisions recorded in `Context/Yoga-Mandala-Kickoff-Meeting-Prep.md`.

## Ground rules the build obeys

1. **No fabricated client content.** No invented people, credentials, quotes, testimonials, ratings, founding story, dates or affiliations. Placeholders are visibly marked; every sample entry carries a `Sample content` marker and lives under `content/samples/` for one-commit removal.
2. **Every major section has its own visual idea.** No repeated card grids; composition, typography, imagery, motion and pacing carry the experience.
3. **Image-heavy ≠ box-heavy.** Imagery is part of the composition, not content inside a rectangle.
4. **The Initiative vs External Offering distinction is structural** (a data field driving a badge), never hardcoded markup.
5. **Placeholder portraits are visibly treated** so they can never be mistaken for real members.
6. Honor the framework design brief (§17): calm, scholarly, human, warm, Indian without stereotypical decoration, contemporary-not-corporate, trustworthy, community-led. Avoid the §17 "avoid" list.

## Document set

| # | Doc | Settles |
|---|---|---|
| 00 | overview (this file) | scope, ground rules |
| 01 | [sitemap-and-routing](01-sitemap-and-routing.md) | the locked routes and nav |
| 02 | [design-system](02-design-system.md) | "Living Manuscript" — type, colour, motion, image treatments |
| 03 | [architecture-and-content-model](03-architecture-and-content-model.md) | stack, folders, the 6 content types |
| 04 | [asset-strategy-and-credits](04-asset-strategy-and-credits.md) | where imagery comes from; integrity rules |
| 05 | [page-structure-and-art-direction](05-page-structure-and-art-direction.md) | section-by-section intent per page |
| 06 | [implementation-decisions-and-tradeoffs](06-implementation-decisions-and-tradeoffs.md) | why the build is the way it is |
| 07 | [client-data-needed](07-client-data-needed.md) | everything still required from the client |
| 08 | [accessibility-and-performance](08-accessibility-and-performance.md) | a11y + perf commitments and checks |

## Running the project

```bash
cd "Yoga Mandala/Website"
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run test     # unit tests (loaders, schema guards, filters)
```
