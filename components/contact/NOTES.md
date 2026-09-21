# Enquire — `/contact/`

Rewritten for **Praṇava-wide enquiries**, 22 September 2026. Before that it was Yoga
Mandala's contact page — one community, one named person, eight collaboration subjects —
promoted from `/preview/contact-b/` on 10 September 2026.

**The composition was not re-judged and was not rebuilt.** Band 01 is the block the client
approved; the colonnade is the concept they chose over the typographic alternative,
*specifically because* it answers "no boxy images" with real non-rectangular layered media.
What changed is **who the page routes to**: the count of doorways, what they are labelled,
and where they send people.

---

## What the page is now

**Band 01 — the open line.** One live channel, given the page's strongest ground, with the
number set at display scale. `site.address`, `links.emailGeneral`, `links.emailProgrammes`
and `links.emailCollaborations` are all `null` and all render as nothing.

**Band 02 — the colonnade.** Six arched photographic openings cut down the paper at four
sizes, tilted, overlapping, two of them running off the rail. Each is now a **link**, and
each opens WhatsApp with its own subject already written into the message.

**Band 03 — two more doorways.** The wall goes dark and two openings of the same arch are
cut into it and lit from the far side: same shape, no photograph, because what is through
them is the Trust's.

**Its own idea, not the hero's.** Band 01 is contained and rectangular — type beside a
picture, nothing bleeding, no word on a photograph. Everything under it is the inverse:
paper, non-rectangular media, layered and off the edge, type set *into* the pictures. That
inversion is the reason the client chose this concept, and it is the thing that must
survive any future edit.

---

## Why six doorways, not eight

The eight were Yoga Mandala's list of **collaboration subjects** — eight nouns from
`contact.collaborations.items`. Praṇava does not take eight kinds of enquiry. Two documents
name what it does take, and between them they name six:

| Source | What it asks the Contact page to cover |
|---|---|
| `Context/new/Pranava Website.docx` §9 | "general enquiries, programme enquiries, collaborations, location, WhatsApp/email and social links. Keep Yoga Mandala's community contact details within its own section where appropriate." |
| `Context/Pranava Website Blueprint.pdf` §3 | the four visitor journeys, each written as the visitor's own sentence |
| Blueprint §6 (Contact) | contact routes → enquiry form → location/mode → social links → FAQs |

General enquiries are band 01, so the wall carries the other six. Three of the six labels
are the Blueprint's visitor intents **verbatim**; three are written in the same grammar for
the routes the journeys do not cover. Which is which is recorded in `routes.ts`.

**Two candidates were rejected rather than padded in.** *Insights* ("I want to understand
more") is the fourth Blueprint journey but it is a reading destination, not an enquiry —
nobody in either document asks to be contacted about it. *Events* has its own page and its
own enquiry, and neither §9 nor Blueprint §6's Contact spec lists it as a contact route.
Adding either to make the number eight again would have been inventing a route to fit a
layout.

The composition is parametric — `--w / --x / --y / --r / --ar` per doorway — so the count is
a number of placements, not a rebuild. **Placements 01–05 are the preview's own values,
unchanged, both breakpoints**, including the arch radius, the near/far lane assignment, the
far lane's `rgba(251,247,242,0.17)` veil, the two z-indexes, the nameplate material and the
`left: 16% / 22%` nudge on doorway 05. (Two plates — not two doorways — were nudged upward
inside their own pictures to stop a later doorway covering them; see Measurements.) **Doorway 06 is the preview's 08** — same width,
ratio and tilt, and the same bleed off the right rail — with only its `--y` re-tuned, twice
and by measurement:

- **wide `-30%`.** It now rises *alongside* 05 rather than below it: 05 spans −8→42% of the
  wall and 06 spans 56→104%, so they interlock vertically without either covering the
  other's nameplate, and the wall still ends on a full-strength opening that leaves the
  paper. At the preview's `-14%` the wall ended with a large hole in the lower left.
- **phone `-3%`.** At 390px doorway 05 is nearly the whole column and its plate sits at
  `left: 16%`; the preview's deeper pull put 06 straight across it. A label a later doorway
  can cover is a label that is not there.

Sizes are the wall's **rhythm, not a ranking** — that was true of the eight and stays true
of the six. The order is the institution's own: Learn, Practice, programmes, Heal, then
collaborations, then the community.

---

## What the doorways route to

Every one opens `links.whatsapp` with `?text=` carrying its own subject. Nothing else on the
site is non-null, so nothing else can be linked to.

| # | Plate | Label is | Message sent | Frame | Provenance |
|---|---|---|---|---|---|
| 01 | I want structured education | Blueprint §3, verbatim | "…about structured learning." | `pr-ttc-dsc_0284_1` — a study circle, notebooks open | Prabodha TTC |
| 02 | I want consistent Sādhana | Blueprint §3, verbatim | "…about ongoing practice." | `pr-ttc-dsc_0326` — one figure seated under a banyan | Prabodha TTC |
| 03 | I want to ask about a programme | ours | "…about a programme." | `pr-ttc-dsc_0188_1` — a room prepared, nobody in it | Prabodha TTC |
| 04 | I want health-oriented guidance | Blueprint §3, verbatim | "…about health-oriented guidance." | `pr-ttc-dsc_0254_1` — supported inversions over chairs | Prabodha TTC |
| 05 | I want to collaborate | ours | "…about a collaboration." | `pr-ttc-dsc_0049` — five people talking in a loose circle | Prabodha TTC |
| 06 | I want to join the community | ours | "…about the Yoga Mandala community." | `ss-ven0096` — a hall full of people | Samskrithi Sadhana · 29 June 2025 |

The message is a first line the sender reads, edits and sends themselves; WhatsApp shows it
in the compose box before anything is sent. 01–05 open "Hello Praṇava."; **06 does not** —
it is the community's enquiry, not the institute's, so it opens "Hello." and names Yoga
Mandala.

The action beneath the wall carries **no** subject, because it is the line for the enquiry
that is none of the six.

**The doorway is a link now, so it has to behave like one.** `target="_blank"` and
`rel="noopener noreferrer"` on all six. An `aria-label` of `"<subject> — enquire on
WhatsApp"`, which contains the visible label (WCAG 2.5.3) and keeps the photograph's `alt`
and the provenance out of the link's name, where they would only confuse it. The plate gains
a third grid column for the shared `Arrow`, because the section's one explanatory line —
*"Each doorway opens WhatsApp with its subject"* — cannot be a per-item affordance. The
hover/focus state scales the **image inside the clip**, never `.cx-arch`, which carries both
the tilt and the depth pass's `--py` and would lose them.

---

## How each null renders

| Field | Value | What renders |
|---|---|---|
| `links.emailGeneral` | `null` | **Nothing.** |
| `links.emailProgrammes` | `null` | **Nothing.** No "programme enquiries" mailbox; doorway 03 routes to the line instead. |
| `links.emailCollaborations` | `null` | **Nothing.** Doorway 05 routes to the line instead. |
| `site.address` | `null` | **Nothing.** No address block, no "Location", no city. |
| `site.url` | `null` | No canonical, no OG URL (`layout.tsx` guards it). |
| `pranava.programmes[].blurb` | `null` ×5 | **Nothing.** No programme names or descriptions appear on this page at all. |
| Blueprint §6 FAQs | not supplied | **Nothing.** Writing plausible ones would be inventing the client's answers. |
| `event.on` for the Prabodha frames | `null` | **Nothing** — the plate names the event and stops, rather than printing a dangling separator. No audit dates the new collections. |

No mailto, no `#`, no "coming soon", no greyed-out row, no invented mailbox. `ChannelList`
builds its rows from a filtered array, so the day an address arrives the card grows a second
row with its own type size and nothing needs redesigning.

**The location slot, answered honestly.** Blueprint §6 asks for "location/mode information".
There is no address, so no place is named. What *is* true about the mode is stated instead,
under the client's own heading "General Enquiries":

> Learning, practice, programmes, health-oriented guidance, collaborations and the Yoga
> Mandala community — all of it is read and answered on WhatsApp.

**No city as an organisational fact.** Grepped the rendered HTML for
Bengaluru / Bangalore / India / Karnataka: one hit, `SAMSKRITHI SADHANA · BENGALURU`, the
hero photograph's provenance caption, which was already approved. The six doorway captions
add no city at all.

**No invented counts.** Grepped the rendered text for any number followed by teachers /
members / students / practitioners / years / schools: none. The only digits on the page are
`01` (the ledger marker), `01`–`06` (the doorway numbers), the phone number (twice) and two
photograph dates recorded in the media audit.

---

## Who is named, and where

`content/site.ts` records a live discrepancy and asks that it not be silently reconciled:
`yogaMandalaContact.name` is **"Praṇav Śāstrī"** (the Yoga Mandala contact document,
9 Sep 2026) and `founder.name` is **"Pranav Murthy"** (the Praṇava About brief, 21 Sep 2026).

- Band 01 previously read *"Messages reach Praṇav Śāstrī, who is the contact for Praṇava."*
  **That claim is in no document** — he is named as the contact for *Yoga Mandala* — and it
  is gone. The card now reads **Enquiries reach / Praṇava**, which is what the number is.
- **Praṇav Śāstrī appears once**, in the Yoga Mandala sentence beneath the wall: *"Yoga
  Mandala keeps its own contact: community enquiries reach Praṇav Śāstrī, on this same
  line."* That is the client's §9 instruction — keep Yoga Mandala's community contact
  details within its own section — and it is his own context.
- **"Pranav Murthy" does not appear.** He is the founder, which is the About page's subject,
  not a contact route.

**Band 03's heading was factually wrong and is corrected.** It read
`{site.name} is an initiative under {site.trust}` — true while `site.name` was Yoga Mandala,
a claim about *Praṇava* after the conversion, and one no document makes. The About document
names **Yoga Mandala**, not Praṇava, as "one such community initiative under Praṇava Seva
Trust". It now reads **"Praṇava Seva Trust keeps the accounts."** with *"Yoga Mandala is a
community initiative under the Trust and keeps none of its own."* beneath — which is
verbatim the client's own reason, in `design/CONTENT.md`. The Instagram handle is still
derived from the URL so label and destination cannot drift. The second doorway is WhatsApp
and now shows the number rather than "The community", which was Yoga Mandala's phrasing.

---

## The enquiry form — what is actually needed

Blueprint §14 asks for: a general contact/enquiry form · program-specific enquiry/application
routing · a clear confirmation state · email delivery verification · spam protection · a
privacy/consent checkbox · an optional WhatsApp action · future CRM compatibility.

**None of it was built, deliberately.** `next.config.ts` is a static export: there is no
server, no route handler and no serverless function. There is also no mailbox —
`emailGeneral`, `emailProgrammes` and `emailCollaborations` are all null. A form posted into
that has nowhere to land, and a form that silently swallows enquiries is worse than no form.

So the routing is carried by the one channel that works: the doorway writes the subject into
the message, WhatsApp is the confirmation state, and delivery is verified by the sender
watching it send. Blueprint §14's "optional WhatsApp/contact action" is the whole of it.

**To replace that with a real form, in order:**

1. **A delivery address.** At minimum `links.emailGeneral`; ideally also `emailProgrammes`
   and `emailCollaborations`, since §14 asks for per-subject routing and the six doorways
   already carry the subject. Until one exists nothing else on this list matters.
2. **Somewhere to run.** Either drop the static export and add a route handler, or point the
   form at a hosted endpoint (Formspree / Basin / a Cloudflare Worker / the host's own form
   service). This is a deployment decision, not a design one — ask before choosing.
3. **Spam protection** that is not a captcha if avoidable: a honeypot field plus a
   submission-time floor covers most of it; the endpoint's own filtering covers the rest.
4. **A consent line** with the text the client wants and a privacy page to link it to.
   Neither exists yet. Do not write either.
5. **A confirmation state** on the page — not an alert, not a redirect off-site — plus the
   subject echoed back so the sender can see what was routed where.
6. **Then, and only then, the markup.** The six subjects become the form's subject field,
   read from `ROUTES` so the doorways and the form cannot drift apart; each doorway becomes
   a link to `/contact/#enquire?subject=<n>` that pre-selects it; the WhatsApp action stays,
   as §14's "optional WhatsApp/contact action", because it is the channel people actually
   use.

Nothing above needs the composition to change. The wall is the router either way.

---

## Photography

**Five of the six frames are Praṇava's own now.** `public/media/pranava-stills.json` landed
during this work — 83 `pr-` stills with audited alt text, focal points and source paths —
and doorways 01–05 were swapped from Yoga Mandala workshop stills to the **Prabodha
teacher-training archive**: a study circle with notebooks open, a single figure seated under
a banyan, a room prepared for a programme with nobody in it, supported inversions over
chairs, and five people talking in a loose circle. Blueprint §8.4 asks for "real Pranava
teaching and practice environments… learning, observation, correction, study, books, props,
discussions and community", and these are that; the Samskrithi frames were a different
community's gathering, however good they are.

**Doorway 06 keeps a Yoga Mandala frame, deliberately.** It is the one route that is not
Praṇava's own, so it keeps a Samskrithi Sadhana photograph and a Samskrithi Sadhana caption.
The distinction is visible on the plates: five read `— PRABODHA TTC` and one reads
`— SAMSKRITHI SADHANA · 29 JUNE 2025`.

**Why not the Prabhava frames, which are the better material.** The archive has two new
collections. "Prabodha" is one of the five programme names in Blueprint §4.3 — the client's
own word, which a caption can say. **"Prabhava" appears in no client document**: not the
Blueprint, not `Pranava Website.docx`, not `Pranava About Page.docx`, all three searched. It
is a folder label from the media drop, and captioning a photograph with an event this
project cannot name is the failure the plate exists to prevent.

The cost is known and it is real: 27 of the archive's 36 portrait frames are Prabhava, at
3024×4032 native with several 2560 derivatives, against Prabodha's 1620×1080 landscape and
1080×1620 portrait. **Ask the client what Prabhava is and the better half of the archive
opens up.** Until then provenance outranks resolution.

**Portrait where the shape actually matters.** Doorways 02 and 04 are the narrowest openings
on the wall (30% and 27% of the measure, `--ar` 0.78 and 0.80), where a 3:2 landscape loses a
third of its width to the crop. Both take Prabodha's own portrait frames — the audit's note
on `pr-ttc-dsc_0254_1` is literally "a rare portrait-format frame of the inversion row,
useful for a tall slot". Their single 960×1440 derivative still covers those doorways at 2×
(422 and 348 CSS px). The wide doorways keep landscape frames because the subject matters
more there and `--ar` 0.88–1.00 crops a 3:2 gently.

**Resolution ceiling, stated rather than hidden.** Prabodha caps at 1620 —
`design/PRANAVA-BUILD.md` records the same ceiling for the TTC archive ("good to ~1600 wide,
never a 2560 full-bleed"). Doorways 01, 03 and 05 upscale by about 1.2× on a 2× display and
are exact on a 1× one. That is better than the preview shipped: it put 720×1280 portrait
crops on doorways of the same size.

**The hero photograph was not changed.** `ss-dsc07144` has the Praṇava roundel in the frame,
its caption is the one approved copy on the page, and `.cx-fig img`'s two `object-position`
values were hand-measured against that specific crop ("what a phone gets is the man with the
microphone and the one listening to him"). Swapping it is a separate, re-measured job.

**Every caption still names the event the frame was taken at**, in the caption system
`components/within/frames.ts` uses. Collections come from the manifest's own `source` path
for the `pr-` frames and from `Context/Media/_audit/tagged.json` for doorway 06; the date
comes from `Context/Media/README.md`, which covers the older collections only. No venue and
no city, because no audit states one.

## Measurements

Dev server, Chromium via Playwright, one browser at a time.

- **`tools/contrast-probe.mjs` — 0 FAIL at all seven mandated sizes**, at six scroll
  positions each (the fold, `.cx-routes__head`, `.cx-arch:nth-child(3)`,
  `.cx-arch:nth-child(5)`, `.cx-act`, `.cx-social`): 320×568, 390×844, 768×1024, 1024×768,
  1280×720, 1440×900, 2560×1440. 42 runs, every one clean. Every nameplate sampled measured
  **9.8:1 or better** — subject, number and provenance alike; the lowest was 9.88:1 on
  doorway 06 at 1024×768 and most sat above 10.5:1 — because the plate owns a ground, so its
  contrast is a constant rather than a function of the crop. The deepened hover ground
  (`rgba(shade,0.86)` against the specified `0.74`) can only raise it. The lowest reading
  anywhere on the page is the clay CTA at **5.98:1** and the teal `.cx-openTo` line at
  **6.95:1**, both inherited and both clear.

  **Run the probes one viewport per invocation.** Three overlapping matrices were briefly
  live during this work, because killing the wrapper shell does not kill the
  `node tools/contrast-probe.mjs` it has already spawned: the log interleaved, three
  Chromiums sat in memory at once on a machine that has OOM-killed itself here, and the
  readings were worthless. Check for stray `contrast-probe` processes before trusting a run.
  A run taken while the media encoder is rewriting a `.webp`, or while `next dev` shows
  "Compiling", is worthless for the same reason — the probe diffs two screenshots and both
  must be of the same page.
- **Screenshots read, not just taken**, at 320×568, 390×844, 768×1024, 960×900, 1024×768,
  1280×720, 1440×900 and 2531×1140 — the head, every doorway, the action row, the social
  band, a focused doorway and a focused social tile.
  A full-page capture is **not** a usable check on this page: `fullPage` stitches while
  scrolling, and `Depth.tsx` is writing `--py` from the scroll position as it goes, so the
  far lane rides up to ~230px out of register against the near lane and the plates appear
  to collide. Everything looks broken and nothing is. Screenshot at real scroll positions.
- **No horizontal overflow** at 320, 360, 390, 430, 560, 620, 768, 820, 960, 1024, 1180,
  1280, 1440, 1600, 1920, 2560: `scrollWidth === clientWidth` at every one, after scrolling
  the whole page. Doorways 05 and 06 leave the paper inside `overflow-x: clip`.
- **Every nameplate checked for occlusion at 17 widths, 320 → 2560,** and two were being
  covered. At the phone placements doorway 03's picture sat over the whole of 02's plate
  from about 620px up, and 05's plate covered 04's number at 390px. Both are inherited from
  the promoted preview and both went unseen, because the previous probe scrolled to
  doorways 04 and 07 and never looked at 02. It is also what the one contrast FAIL in this
  whole exercise turned out to be — "Prabodha TTC" reading 2.70:1 at 768×1024 was the probe
  correctly measuring cream text against a photograph, because the plate behind it had been
  painted over. Fixed by lifting those two plates inside their own pictures
  (`bottom: 22%` / `24%`, phone breakpoint only), which leaves every doorway placement and
  every overlap exactly as approved. Re-measured after the fix: clear everywhere, and the
  768 FAIL is gone.

  A caution for whoever checks this next: `document.elementFromPoint` **over-reports** here.
  Chromium hit-tests the arch's un-rounded box, so a neighbour's clipped-away corner reads
  as an occluder where nothing is painted. Judge it on screenshots, or on the probe.
- **`prefers-reduced-motion: reduce`:** `Depth.tsx` returns before attaching anything, `.cx`
  never gets `is-live`, no `--py` is ever written, each doorway's transform is its tilt
  alone, and the doorway's hover scale and arrow nudge are cancelled — hover and focus still
  deepen the plate and the shadow, so the affordance survives without motion. Zero elements
  at `opacity < 1`, `visibility: hidden` or zero size across `.cx-arch`, `.cx-arch__plate`,
  `.cx-act` and `.cx-door`.
- **JavaScript off:** the whole page is in the static HTML — six photographs, six nameplates,
  six enquiry links with their messages, both social links, the number. Only the *Copy
  number* button is absent, which is what it is for.
- **Focus:** the doorway link is a new focus stop, six of them, and it carries the arch's own
  `border-radius` so the ring follows the arch rather than boxing it. Read off the computed
  style on all six: `outline: rgb(36,29,24) solid 2px`, `outline-offset: 2px`,
  `border-radius: 50% 50% 5px 5px / 34% 34% 1.6% 1.6%`, `box-shadow: rgba(251,247,242,0.95)
  0 0 0 4px` — `.cx-routes :focus-visible` inverts the global cream ring to ink, which is
  what paper needs. Both cream social tiles keep the preview's ink-ring-plus-restated-shadow
  fix (`…0.95 0 0 0 4px, rgba(36,29,24,0.55) 0 0 0 5px` alongside the tile's own shadow) —
  that ring was invisible once and it stays fixed. Screenshots of a focused doorway and a
  focused social tile are in evidence.
- Exactly **one `<h1>`** ("Connect With Us"); three `<h2>`. **Seven `<img>`, all with real
  alt**, verbatim from `public/media/pranava-stills.json` and `public/media/stills.json`.
  **Every external link** carries `target="_blank" rel="noopener noreferrer"` — 0 of 44
  anchors missing it, checked on the built page, not the source.
- **Grepped the rendered output, dev and built**, for the three things that have gone wrong
  on this project before: **zero** email addresses, **zero** `mailto:`, **one** city
  (`SAMSKRITHI SADHANA · BENGALURU`, the hero's provenance caption, already approved), and
  **zero** numbers describing the institution. The only digits on the page are the ledger
  marker, the six doorway numbers, the phone number and one photograph date.
- All ten image paths in the built page exist in `out/`.
- `npx tsc --noEmit`, `npx next build`, `npx eslint .` and `npm run check:copy` all pass.

---

## Renames, and what did not move

`Collaborations.tsx` → `Colonnade.tsx`, `moments.ts` → `routes.ts`, `MOMENTS` → `ROUTES`,
and `.cx-collab` → `.cx-routes` / `.cx-collab__head` → `.cx-routes__head`. The section is no
longer about collaborations — collaborations is now one doorway of six — and a stale name on
a page whose whole subject is honesty is a real maintenance hazard. `Depth.tsx` reads
`.cx` and `.cx-arch`, neither of which changed. If you are grepping old notes: the probe
selector is `.cx-routes__head` now.

Nothing under `app/preview/`, `components/preview/` or `styles/preview-*.css` was touched.
`/preview/contact-b/` still carries its own `.cb-*` namespace and its own stylesheet, so the
client can still show the comparison page.

---

## Still true, and not owned by this page

**Fraunces mis-sets `U+012B`.** "Praṇav Śāstrī" renders in the display face with the macron
detached and floating right of the i, at every size — measured, not guessed. Inter and every
system fallback set it correctly, which is why `.cx-card__who` and `.cx-note` both use the
text face. `app/layout.tsx` now loads `subsets: ['latin', 'latin-ext']`; any page setting a
Sanskrit diacritic in the display face should check it renders before trusting it.

**No `tel:` link.** The client called this a WhatsApp number, so it is offered as WhatsApp.
Turning it into a voice-call link would be an assumption about how they want to be reached.

**Three open questions for the client.** Two are older than this rewrite and still
unanswered in `design/CONTENT.md`: whether `@thepranavshastri` — which reads as a personal
handle — is genuinely the Trust's intended account, and whether "Praṇav Śāstrī" and "Pranav
Murthy" are the same person. The third is new and it is blocking real material: **what is
"Prabhava"?** It is the name of a 343-image collection in the media drop, it is the source of
27 of the archive's 36 portrait frames at 3024×4032, and it appears in none of the three
client documents. Until it can be named, nothing from it can be captioned. Nothing here
assumes any of the three answers.

**The sitewide footer carries the same claim this page just corrected**, and it is not this
page's file. `components/SiteFooter.tsx` line 91 renders
`{site.name} is an initiative under {site.trust}` — which now reads "Praṇava is an
initiative under Praṇava Seva Trust", a statement about Praṇava that no client document
makes. The footer also still brands as Yoga Mandala, which `Pranava Website.docx` §3 asks to
be replaced. Both belong to whoever owns the shell.
