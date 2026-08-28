# P14 — Sangha Board (Collaborate)

**Routes:** `/collaborate`, `/collaborate/[slug]` · **Status:** 🟡 Build with sample content
**Framework source:** §8 COLLABORATE (full spec) · §21 roadmap Phase 2 · locked sitemap conflict #4

---

## 1. Purpose

§8: *"The Sangha Board allows opportunities that would otherwise disappear inside group chats to become searchable and useful."*

That sentence is the clearest statement of the entire product's value anywhere in the framework. It is the answer to "why not just use WhatsApp?"

**Scope note:** §21 places this in Phase 2, but it's included in Phase A because it **reuses the Bulletin's content model and layout system almost entirely** — see [01-SITEMAP-LOCKED §5](../01-SITEMAP-LOCKED.md). Marginal cost is low; value is high. Confirm with the client (E6).

---

## 2. Framework spec — §8, verbatim

| Category | Purpose |
|---|---|
| Looking for | "Seeking teacher, collaborator or expertise" |
| Offering | "Offering teaching, mentoring, resources or skills" |
| Space | "Studio / community / retreat space available" |
| Project | "Seeking collaborators" |
| Volunteer | "Community service opportunity" |
| Referral | "Useful professional/community referral" |
| Teacher exchange | "Class, workshop or knowledge exchange" |

> "Every listing should have: title, category, description, location/online, poster, contact method and expiry date."

**Resolves sitemap conflict #4:** §4 IA listed "opportunities, spaces, projects" as if they were separate pages. They are categories here. One page, seven categories.

---

## 3. The design problem

A classifieds board is the hardest thing on this site to make beautiful. It is inherently short, utilitarian, heterogeneous text.

**Resolution: lean into it.** This is the site's **noticeboard**, and it should look like a well-set one — a letterpress community board, dense and typographic, where the beauty is in the typesetting and the category system rather than in imagery. Fighting that with decorative photography would make it slower to use and dishonest about its function.

**This becomes the site's most typographic page**, and its rhythm is unlike anything else — which is exactly what the "every section its own visual idea" rule asks for at page level.

---

## 4. Index page art direction

### S1 · Opener — *"The argument for the board"*
**Treatment:** none · **Ground:** `paper`

§8's sentence set at `display-m` as the page's opening statement — *"opportunities that would otherwise disappear inside group chats."* It explains the page and justifies the product in one line.

### S2 · Categories — *"Seven doors"*
**Treatment:** typographic category index · **Ground:** `paper-deep`

The seven categories as large `title`-size headings in an asymmetric two-column arrangement, each with its §8 purpose line and a live count. Each category carries a distinct hairline colour drawn from the palette (indigo, clay, sage, brass and neutrals) — the **only place on the site where colour does categorical work**, because here it genuinely aids scanning.

### S3 · The board — *"A well-set noticeboard"*
**Treatment:** dense typographic listing, masonry-flowed · **Ground:** `paper`

Posts as typeset notices of *varying heights driven by their actual content length*, flowing in a 3-column masonry on desktop. Each notice:

```
LOOKING FOR ─────────────────────
Title of the post, set at title size
Two or three lines of description
Bengaluru · expires 14 Sep
Contact →
──────────────────────────────────
```

Category-coloured hairline top and bottom. **No background fills, no shadows, no rounded rectangles** — the rules alone separate them. Varying natural heights produce the noticeboard rhythm without any card styling.

Filters: category, location/online, most recent. Expired posts drop out automatically (§8 requires an expiry date; §10's workflow archives expired items).

**Why this isn't a card grid:** cards impose uniform height and enclosed backgrounds. These are rule-separated text blocks of naturally different sizes. The difference is visible immediately.

### S4 · How to post
**Treatment:** hairline note · **Ground:** `indigo-deep`

What's welcome, what isn't — quoting §10's exclusions: *"Unsolicited self-promotion, repeated advertising, referral spam, unrelated commercial posts and promotional content outside the submission process should not be published."* Plus the moderation and expiry expectations. Links to `/submit/listing`.

**Why:** a public board without published rules becomes spam. Stating the rules on the board is the cheapest moderation tool available.

---

## 5. Detail page

Minimal and functional. Category chip · title · full description · location/online · poster (name + link to directory profile where they have one) · posted date · expiry date · contact method · a report link *(the flag feature the admin dashboard assumes but the framework never defines — see [04-CLIENT-DATA-MASTER-LIST](../04-CLIENT-DATA-MASTER-LIST.md))*.

**Contact follows the same privacy rule as profiles** — an enquiry form, never an exposed email. §16 applies here just as much as on a profile.

---

## 6. Assets

2–3 only: one for the opener texture, one for S4. **This page is deliberately near-imageless.** Its identity is typographic, and that contrast is what gives the site variety at the page level rather than just the section level.

## 7. Motion

Notices fade in with a 40ms stagger on filter change. Category hairline thickens on hover. Nothing else — it's a utility.

## 8. Responsive

Masonry → 2 columns at tablet, single column at mobile. Categories become a horizontally scrolling chip row. Notices keep their natural heights.

---

## 9. Content model

```yaml
type: listing
listingType: sangha-board          # vs 'community-listing' — same entity, different vocabulary
category: looking-for | offering | space | project | volunteer | referral | teacher-exchange
title: string
description: string
location: string | online
poster: { name, memberSlug? }
contactMethod: enquiry-form        # never a raw email
posted: date
expiry: date                       # REQUIRED per §8
status: published | expired | archived
badge: community-listing
sample: true
```

Matches §19's `Sangha Board Post`. **Structurally identical to `bulletin`** — this is the unified listing engine, and the reason this page costs so little.

## 10. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **E6** | Confirm Sangha Board is in V1 (roadmap says Phase 2) | 🟠 | Cheap because it reuses the engine — worth arguing for |
| **D7** | 5–8 real posts | 🟠 | Samples until then. Needs volume to look alive |
| — | Default expiry period | 🟠 | Proposing 60 days for a board, vs 90 for the bulletin |
| — | Are posts pre-moderated, or published then reviewed? | 🟠 | §14's lifecycle implies pre-moderation; that's slow for a noticeboard. Worth raising |
| — | Can non-members see the board? | 🟠 | Ties to E1 |
| — | Should there be a "resolved / filled" state? | 🟢 | Not in the framework, but every real board needs one |

**That last row is worth raising.** §8 provides expiry but no way to mark something filled, so a post someone has already answered stays live until it expires. Small addition, meaningful improvement.

## 11. Buildable now

Both templates in full with 8 sample posts across all seven categories. Filtering, expiry handling and empty states are all real.

## 12. Acceptance criteria

- [ ] All seven §8 categories present with their exact purpose lines
- [ ] All seven required fields on every listing
- [ ] Expiry enforced — expired posts leave the board automatically
- [ ] No card styling: no fills, no shadows, no enclosing rectangles
- [ ] Notices vary in height according to real content
- [ ] Posting rules published on the page, quoting §10
- [ ] No contact details exposed
- [ ] Reads as a noticeboard, not a marketplace
