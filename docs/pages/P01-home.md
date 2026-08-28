# P01 — Home

**Route:** `/` · **Status:** 🟢 Build now — zero client dependency
**Framework source:** §5 Homepage Specification (gives all 9 sections verbatim) · §1 pillars · §21 success criterion 1

---

## 1. Purpose

Framework success criterion #1: *"A teacher understands Yoga Mandala within 30 seconds."* Everything on this page serves that. It is also the page the client will judge the whole project by.

---

## 2. Content inventory — §5, verbatim

> 1. Hero + Join the Sangha. 2. Four pillars: Learn / Connect / Collaborate / Serve. 3. Featured Yoga Mandala Learning Initiative. 4. Upcoming community event or meetup. 5. Featured teacher/contributor. 6. Latest curated learning opportunities. 7. Featured library/resource. 8. Invitation: Share something with the Sangha. 9. Footer.

Nine sections, specified by the client. We do not add or remove sections — we decide how each one looks. **Each gets a different visual idea; no treatment repeats.**

Hero copy, quoted directly from §5:
> **YOGA MANDALA** — *Learn. Connect. Collaborate. Serve.*
> "A community of Yoga teachers and serious practitioners building a culture of continuous learning, meaningful collaboration and responsible teaching."

---

## 3. Section-by-section art direction

### S1 · Hero — *"A quiet room, not a billboard"*
**Treatment:** T1 full-bleed + T8 scroll-scrub · **Ground:** image with `indigo-deep` scrim at 45%

One photograph, full viewport: a real teaching or study environment in natural light — people seated, mid-discussion, or an empty hall with morning light and mats stacked. Not a pose. Not a sunset.

Type sits low-left, not centred. `YOGA MANDALA` at `display-xl`. Beneath it the four words set as one line with generous word-spacing, in `paper` at 70% opacity. Beneath that the positioning sentence at `lead`, capped at 520px. A ghost-hairline `Join the Sangha` button and, to its right, a plain text link `What is Yoga Mandala →`.

**Motion:** image scales 1.06 → 1.0 over 1400ms on load; type fades-and-rises in three steps at 120ms intervals; on scroll the image drifts up at 8% of scroll speed while type holds. Scroll cue is a 1px brass line that draws downward, not a bouncing chevron.

**Why it earns its place:** the hero's job is comprehension, and a documentary image of people *studying* says "community of teachers" faster than any illustration of a pose.

### S2 · Four pillars — *"The four words are the interface"*
**Treatment:** T4 type-crossing + image reveal · **Ground:** `paper`

Four words stacked as full-width display lines: **LEARN / CONNECT / COLLABORATE / SERVE**, each at `display-xl`, hairline-ruled between. Ink outline type by default.

On hover or focus of a word (desktop), it fills solid `indigo` and a photograph fades in behind the whole stack at 35% opacity, specific to that pillar, while the §1 meaning line for that pillar appears in the right margin:

| Pillar | §1 meaning, verbatim |
|---|---|
| LEARN | "Structured learning, resources, study and teacher development." |
| CONNECT | "Find fellow teachers, practitioners, experts and community members." |
| COLLABORATE | "Share opportunities, spaces, projects, referrals and professional needs." |
| SERVE | "Contribute knowledge, volunteer, mentor and strengthen the wider Yoga ecosystem." |

**Mobile:** the four words scroll-scrub instead — each becomes active as it centres in the viewport, filling solid with its image behind and its meaning line beneath.

**Why:** this is the section that would default to four cards. Making the typography itself the interactive object is the single strongest anti-card move available, and it directly serves the 30-second comprehension goal.

### S3 · Featured Learning Initiative — *"A magazine feature, not a course tile"*
**Treatment:** T2 editorial inset · **Ground:** `paper-deep`

One initiative only. Large image occupying columns 1–6, bleeding off the left edge. Right side: the `Yoga Mandala Learning Initiative` badge, title at `display-m`, facilitator name, then a §6.1 metadata block set as a brass-ruled definition list — *Type · Schedule · Format · Fee · Audience*. Description at `lead`, capped at 60ch. One text CTA.

**Motion:** image mask-wipes upward on entry (900ms); metadata rows stagger at 60ms.

**Why:** §6.1 specifies eight metadata fields. Presenting them as a typeset colophon rather than icon-and-label pairs is what makes it read as scholarly rather than as a course listing.

### S4 · Upcoming event — *"The date is the image"*
**Treatment:** T5 column strips + date typography · **Ground:** `paper`

Date-led. The day numeral set enormous — `display-xl` at ~180px, `brass` outline, positioned so the following content overlaps it. Month and weekday in `label` type vertically alongside. Three tall 2:5 image strips at varied vertical offsets to the right, showing the venue or a past gathering. Event title, host, location/online, audience and free/paid as a single hairline-ruled metadata row.

**Motion:** strips enter at different speeds (parallax 6/10/14%), producing depth without any obvious effect.

**Why:** events are inherently temporal; letting the date carry the composition avoids a calendar-card and gives the page a completely different rhythm from S3.

### S5 · Featured teacher — *"An editorial portrait spread"*
**Treatment:** T3 layered pair · **Ground:** `indigo-deep` (first dark section — a pause in the scroll)

Two overlapping images: a large portrait, and a smaller detail image (hands, a book, a room) offset over its lower-right corner. Opposite: name at `display-l` in `paper`, one pull quote at `lead` in italic, then location · tradition · areas of interest as `label` metadata. A discreet `Verified Teacher` badge if applicable, with the §12 caveat available on hover.

**Phase A:** placeholder identity per the integrity rules — no invented person, no invented quote. Portrait is duotone-treated and cropped away from the face until real consented portraits exist.

**Why:** the directory is the framework's "core long-term asset" (§7.1). The homepage should show a *person*, at full editorial scale, not a thumbnail in a row.

### S6 · Latest curated learning opportunities — *"An index, not a grid"*
**Treatment:** T9 horizontal rail — inverted · **Ground:** `paper`

Five to seven entries as a **plain typographic list**: title at `title` size, with source · category badge · date as a metadata line, separated by brass hairlines. Zero boxes.

On hover/focus of a row, an image for that entry fades in, positioned right of the list, following vertical position with a soft lag. On mobile, each row carries a small inline image that reveals as the row scrolls into view.

Every entry carries its §10 badge — `Curated Community Listing` or `External Offering` — because §6.2 is explicit these are *"NOT automatically Yoga Mandala programmes."*

**Why:** this is the highest-density section on the page. A list stays calm where a grid would shout, and the hover-image device makes it feel alive without a single card.

### S7 · Featured library resource — *"An archival plate"*
**Treatment:** T6 archival plate · **Ground:** `paper-deep`

A genuine public-domain text presented as a catalogue entry. Scanned title page or manuscript plate, brass hairline frame, caption in `label` beneath giving the real source and rights. Alongside: title, author, tradition/context, recommended level, and a short description — the §6.3 metadata schema, set as a catalogue record.

**Real content available now** — e.g. Pancham Sinh's 1914 *Haṭha Yoga Pradīpikā*, with a public-domain scan.

**Why:** this section, more than any other, proves the site is scholarly. It is also the strongest visual break on the page — the only place with a framed, static, print-like object.

### S8 · Invitation to share — *"A quiet dark room"*
**Treatment:** T10 duotone ground · **Ground:** `indigo-deep`

Almost empty. A single line at `display-l`, centred, `paper`: an invitation drawn from §5's "Share something with the Sangha". Beneath it, four plain text links in a row — *An event · A learning opportunity · A resource · A community listing* — routing to the submission forms. Behind everything, a duotone image at 12% opacity, drifting very slowly.

**Motion:** the background drifts 3% over the section's full scroll. Nothing else moves.

**Why:** §5 asks for an invitation, and the framework repeatedly warns against sales language. Restraint *is* the design here — after seven dense sections, emptiness reads as confidence.

### S9 · Footer
Per [P00](P00-global-shell.md).

---

## 4. Section rhythm check

| Section | Ground | Treatment | Density |
|---|---|---|---|
| S1 | image | T1 + T8 | high |
| S2 | paper | T4 | low |
| S3 | paper-deep | T2 | medium |
| S4 | paper | T5 | medium |
| S5 | indigo-deep | T3 | medium |
| S6 | paper | T9 | high |
| S7 | paper-deep | T6 | low |
| S8 | indigo-deep | T10 | very low |

No treatment repeats. Grounds alternate. Density oscillates rather than climbing. Two dark sections, placed at S5 and S8 to break the page into thirds.

---

## 5. Assets

| Slot | Count | Stream | Notes |
|---|---|---|---|
| Hero | 1 (+ optional video) | B documentary | The single most important asset on the site |
| Pillar reveals | 4 | B | Must feel like one photographic series |
| Initiative feature | 1 | B | Teaching/workshop context |
| Event strips | 3 | B | Venue, gathering, detail |
| Teacher portrait + detail | 2 | B, treated | Placeholder — see integrity rules |
| Opportunity hovers | 5–7 | B, small crops | Reused from a shared pool |
| Library plate | 1 | A archival | Real public-domain scan |
| Invitation ground | 1 | A or C | Duotone, abstract |

Budget ~10 unique + reuse.

---

## 6. Responsive

Hero type drops to `display-l`, image switches to a portrait crop. S2 becomes scroll-scrubbed. S3 stacks image-above-text with the image full-bleed. S4's giant numeral moves behind the content rather than beside it; strips reduce to one. S5 stacks; the detail image overlaps the portrait's corner at reduced offset. S6 rows carry inline images. S7 is unchanged — it works at any width. S8 unchanged.

**Mobile is art-directed independently.** Different crops, not the same images squeezed.

---

## 7. Content model

Home pulls one `initiative`, one `event`, one `person`, 5–7 `bulletin`, one `resource`. All flagged `featured: true` in front-matter. **No content is hardcoded into the page** — when a database replaces the files, the queries change and the page does not.

---

## 8. Client data required

| # | Item | Blocking | Interim |
|---|---|---|---|
| A1/A4 | Logo, palette approval | Soft | Wordmark + proposed palette |
| D1 | A real featured Learning Initiative | No | Sample, marked |
| D2 | A real upcoming event | No | Sample, marked |
| D4/D9 | A real featured teacher + consented portrait | No | Treated placeholder, no invented person |
| D3 | Real curated opportunities | No | Samples, marked |
| D8 | Real community photography for the hero | No | Stream B documentary |
| B4 | Location, for the hero sub-line if wanted | No | Omitted |

**None of it blocks the build.** The homepage can be built, reviewed and demoed in full this week.

---

## 9. Acceptance criteria

- [ ] A first-time visitor can state what Yoga Mandala is within 30 seconds *(test on 3 people who haven't seen it)*
- [ ] All nine §5 sections present, in order
- [ ] Eight distinct visual ideas — no treatment used twice
- [ ] Zero card grids
- [ ] Every curated entry carries its correct §10 badge
- [ ] Initiative vs external offering is visually unmistakable
- [ ] No fabricated person, quote or credential anywhere
- [ ] LCP < 2.5s on 4G; hero is the only priority-loaded asset
- [ ] Fully operable by keyboard, including the pillar reveals
- [ ] `prefers-reduced-motion` removes all parallax and scrubbing
