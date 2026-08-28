# P06 — Curation & Learning Bulletin

**Routes:** `/learn/bulletin`, `/learn/bulletin/[slug]` · **Status:** 🟡 Build with sample content
**Framework source:** §6.2 · §10 curation workflow and badges · §14 anti-spam rules

---

## 1. Purpose

§6.2, verbatim: *"For relevant external programmes, workshops, retreats, teacher trainings, books, research and events submitted by members or discovered by the curation team. **These are NOT automatically Yoga Mandala programmes.** Use a clear label such as 'Curated Community Listing' or 'External Offering'."*

This page exists to make external things discoverable **without lending them Yoga Mandala's endorsement**. Every design decision follows from that.

---

## 2. The design problem

An externally-curated listing must be:
- attractive enough that people use it
- clearly *not* a Yoga Mandala programme
- clearly not an advertisement

§14 forbids "spam or repeated unsolicited promotion", and §10 forbids publishing "unsolicited self-promotion, repeated advertising, referral spam, unrelated commercial posts". The visual language must therefore feel **editorial and curatorial** — closer to a journal's "books received" column than to a marketplace.

**Resolution: the Bulletin is typographic, not photographic.** Where Initiatives are image-led, the Bulletin is a *reading list*. Sparse imagery is the mechanism that makes the distinction instant and unmissable.

---

## 3. Index page art direction

### S1 · Opener — *"A masthead, not a hero"*
**Treatment:** none — typography on paper · **Ground:** `paper`

No hero image. Title, issue-style date line ("Curated · updated weekly"), and the §6.2 definition set as a standfirst. Below it, in a hairline-ruled note, the neutrality statement in plain language: these are external offerings selected for relevance, not Yoga Mandala programmes.

**Why:** the absence of a hero image is itself the signal. This section is a curation column.

### S2 · Filters
**Treatment:** `label` chips · **Ground:** `paper`

Categories drawn from §6.2's own list: **Programmes · Workshops · Retreats · Teacher trainings · Books · Research · Events**. Plus location/online and a date-added sort.

### S3 · The bulletin — *"A curated index"*
**Treatment:** typographic entry list · **Ground:** `paper`

Each entry is a typeset record, not a card:

```
─────────────────────────────────────────────────────
CURATED COMMUNITY LISTING            Research · Online
Title of the offering, set at title size
Source / organisation · location · expires 12 Nov
A two-line curatorial note on why this was selected.
─────────────────────────────────────────────────────
```

Brass hairlines between entries. Badge always first, in `label` type — the reader meets the label *before* the content, every time.

**One image per five entries maximum**, and only where genuinely useful (a book cover, a research plate). The sparseness is deliberate and is the section's visual identity.

**On hover:** the entry's rule thickens and the badge fills. No image reveal — that device belongs to the homepage, and repeating it here would blur the two sections' characters.

### S4 · Why things appear here — *"The curation workflow, published"*
**Treatment:** typographic flow · **Ground:** `indigo-deep`

§10's workflow, published openly: *"Member submits listing → Submission enters moderation queue → Admin/curator checks relevance, accuracy, presentation and community fit → Approved listing receives the correct category and badge → Listing is published with an expiry/review date → Expired items are archived."*

Plus, stated plainly, what will not be published — §10's list of self-promotion, repeated advertising, referral spam and unrelated commercial posts.

**Why:** publishing the criteria is what separates curation from advertising. It also pre-empts every "why wasn't mine published?" argument.

### S5 · Submit an offering
Quiet text link to `/submit/learning-opportunity`. No banner, no button-heavy CTA.

---

## 4. Detail page

Deliberately minimal — the destination is elsewhere, and over-designing it would imply ownership.

Badge · title · source organisation · category · location/online · dates · expiry · the curator's note on relevance · the §6.3-style rights/source line where it's a book or paper · one clearly-labelled outbound link.

A persistent hairline-boxed statement: this is an external offering listed for relevance; Yoga Mandala does not organise or endorse it. Wording to be confirmed with the client.

---

## 5. Assets

Very few by design. 2 for the opener/S4 texture, plus occasional book covers (Stream A archival where public domain, or the publisher's cover where clearly the subject of the listing). **Never a decorative stock photograph attached to an external offering** — that would visually promote it.

## 6. Motion

The most restrained page on the site. Fade-and-rise on entries. Hairline thickening on hover. Nothing else.

## 7. Responsive

Entries stack naturally — the format is already essentially linear. Filters become a horizontally scrolling chip row.

---

## 8. Content model

```yaml
type: bulletin
title: string
category: programme | workshop | retreat | teacher-training | book | research | event
source: { organisation, url }
description: string          # curator's note on relevance
location: string | online
dates: { start?, end? }
expiry: date                 # §10 requires an expiry/review date
badge: curated-community-listing | external-offering | partner-guest
rights: string?              # for books/research, per §6.3
submittedBy: member | curation-team
sample: true
```

Matches §19's `Bulletin Listing` entity. **Shares its shape with `listing` (P14/P16)** — one engine, different vocabularies.

## 9. Client data required

| # | Item | Blocking | Note |
|---|---|---|---|
| **D3** | 8–15 real curated entries | 🟠 | Samples until then. This page needs volume to feel alive |
| — | Exact disclaimer wording for external offerings | 🟠 | Legally-flavoured; must be the client's words |
| — | Which of "Curated Community Listing" vs "External Offering" is the primary label? §6.2 offers both | 🟠 | Defaulting to *Curated Community Listing* since §10's badge table uses it |
| — | Default expiry period when a submitter doesn't set one | 🟠 | Proposing 90 days |
| — | Who is the "curation team"? | 🟢 | Affects S4 copy |

## 10. Buildable now

Both templates in full, with 8 sample entries. §6.2 and §10 supply the categories, badges, workflow and exclusion rules.

## 11. Acceptance criteria

- [ ] Badge appears before the title on every entry, without exception
- [ ] Visually unmistakable from an Initiative at a glance
- [ ] Nothing on the page reads as an advertisement
- [ ] Curation criteria and exclusions published, per §10
- [ ] Every entry carries an expiry date
- [ ] Outbound links clearly signal leaving the site
- [ ] No decorative imagery attached to any external offering
