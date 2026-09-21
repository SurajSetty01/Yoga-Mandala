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
`left: 16% / 22%` nudge on doorway 05. **Doorway 06 is the preview's 08** — same width,
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
| 01 | I want structured education | Blueprint §3, verbatim | "…about structured learning." | `ss-dsc07118` | Samskrithi Sadhana · 29 June 2025 |
| 02 | I want consistent Sādhana | Blueprint §3, verbatim | "…about ongoing practice." | `ss-dsc07126` | Samskrithi Sadhana · 29 June 2025 |
| 03 | I want to ask about a programme | ours | "…about a programme." | `p13-img_0617` | Pranava Workshop · 13 April 2025 |
| 04 | I want health-oriented guidance | Blueprint §3, verbatim | "…about health-oriented guidance." | `ss-dsc07120` | Samskrithi Sadhana · 29 June 2025 |
| 05 | I want to collaborate | ours | "…about a collaboration." | `ss-dsc07137` | Samskrithi Sadhana · 29 June 2025 |
| 06 | I want to join the community | ours | "…about the Yoga Mandala community." | `ss-ven0096` | Samskrithi Sadhana · 29 June 2025 |

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

Every frame is still a Yoga Mandala workshop or a Samskrithi Sadhana frame. Every photograph
carries its provenance on the plate, in the caption system `components/within/frames.ts`
uses: collections from `Context/Media/_audit/tagged.json`, dates from
`Context/Media/README.md`. No venue and no city, because the audit states none.

**Why not the Praṇava library.** It was checked at the start of the work and again at the
end. By the end, 83 `pr-` ids (`pr-pbh-*` from Prabhava Photos, `pr-ttc-*` from Prabodha TTC
Photos) had appeared as derivatives under `public/media/stills/` — but
**`public/media/pranava-stills.json` had not**, and the encode was visibly still running.
Three things made a swap unsafe rather than merely early:

1. **The ids are not stable yet.** `Context/new/_audit/vision/PBH-01.json` describes
   `pr-pbh-6cfd4e56_69c7_4534_a3dc_eef913`; the file on disk is `pr-pbh-img_5362-960.webp`.
   The vision sheet and the encoder are not yet naming the same frame the same way.
2. **There is no provenance for the new collections.** `Context/Media/README.md` dates the
   three old ones; `_inventory.json` and `_audit/encoded-stills.json` carry no date field
   for the new ones at all. "Prabodha TTC" is at least a name this project can source —
   Prabodha is one of the Blueprint's five programme names — but "Prabhava" is a folder
   label whose meaning is nowhere in the client's material. Captioning a photograph with an
   event this project cannot name is the exact failure the plate exists to prevent.
3. The page is **live and shared** while the encode is running. Pointing six `<img>` at
   files another agent is still writing is how a page ships with 404s in it.

So the swap is left as a data change, which is all it is.

Swapping any row's `id` / `alt` / `event` / `focal` / `srcs` in `routes.ts` for a `pr-` frame
is a data change and nothing else — no component and no CSS reads the id. **Doorways 01, 03
and 04 are the ones a real Praṇava teaching frame would improve most**: a teacher correcting
a student, a course in session, and one-to-one attention are exactly what the Praṇava brief
§10 asks new photography to show.

Two measured traps, both still live:

- **The DSC derivatives are 2:3 portrait crops** (960×1440, 1920×2880) even though
  `stills.json` records the landscape original at 7008×4672. The `w` descriptors in
  `srcs` are the measured file widths, not the manifest's.
- **`ss-ven0096` has only one derivative**, 960×540. It is on the smallest doorway for that
  reason. On a 2× display that doorway upscales slightly; every other frame has 1920 or
  2560 and does not.

`focal` on doorway 05 is pulled to `0.18` — further left than the manifest's `0.35` and
further than the preview's `0.28` — because at 50% of the wall the crop is wide enough to
centre an air cooler, which is the exact failure `design/DESIGN-SYSTEM.md` records.

---

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

  Run the probes one at a time. Three overlapping matrices were briefly live during this
  work because killing the wrapper shell does not kill the `node tools/contrast-probe.mjs`
  it already spawned; the log interleaved and three Chromiums sat in memory at once on a
  machine that has OOM-killed itself here. Check for stray `contrast-probe` processes before
  trusting a run, and prefer one viewport per invocation.
- **Screenshots read, not just taken**, at 320×568, 390×844, 768×1024, 1024×768, 1280×720,
  1440×900 and 2531×1140, at the head, three doorways, the action row and the social band.
  A full-page capture is **not** a usable check on this page: `fullPage` stitches while
  scrolling, and `Depth.tsx` is writing `--py` from the scroll position as it goes, so the
  far lane rides up to ~230px out of register against the near lane and the plates appear
  to collide. Everything looks broken and nothing is. Screenshot at real scroll positions.
- **No horizontal overflow** at 320, 360, 390, 430, 560, 620, 768, 820, 960, 1024, 1180,
  1280, 1440, 1600, 1920, 2560: `scrollWidth === clientWidth` at every one, after scrolling
  the whole page. Doorways 05 and 06 leave the paper inside `overflow-x: clip`.
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
  alt**, verbatim from `public/media/stills.json`. **Every external link** carries
  `target="_blank" rel="noopener noreferrer"` (0 exceptions found).
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

**Two open questions for the client**, both older than this rewrite and both still unanswered
in `design/CONTENT.md`: whether `@thepranavshastri` — which reads as a personal handle — is
genuinely the Trust's intended account, and whether "Praṇav Śāstrī" and "Pranav Murthy" are
the same person. Nothing here assumes either answer.

**The sitewide footer** is documented in `components/SiteFooter.tsx` and `styles/footer.css`.
It still identifies Yoga Mandala rather than Praṇava; that is not this page's file and is
not changed here.
