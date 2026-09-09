# Page 4 — Connect With Us

Concept **B**, "eight doorways", promoted from `/preview/contact-b/` into the real page on
10 September 2026. The approved hero was kept exactly as it was; everything below it was
replaced.

---

## What the page is now

**Band 01 — the open line. Approved and untouched.** `site.address` is `null`,
`links.emailGeneral` is `null`, `links.emailCollaborations` is `null`. What exists is one
live human channel — a WhatsApp number belonging to a person the client asked to be named —
so the number is the largest thing on the page after the headline, set in the display face
on warm black under **Speak with** / **Praṇav Śāstrī**, beside one framed still. Nothing in
this block, its markup or its CSS was changed by the promotion.

**Band 02 — the colonnade.** The client's eight subjects are not a list. Eight arched
photographic openings are cut down the paper at four sizes, tilted, overlapping, two of them
running off the rail, and each subject is a nameplate set into the picture it belongs to.
A doorway is the shape of "we are open to".

**Band 03 — two more doorways.** The wall goes dark and two openings of the same arch are cut
into it and lit from the far side: same shape, no photograph, because what is through them is
the Trust's and not ours.

**Its own idea, not the hero's.** Band 01 is contained and rectangular — type beside a
picture, nothing bleeding, no word on a photograph. Everything under it is the inverse:
paper, non-rectangular media, layered and off the edge, type set *into* the pictures. That
inversion is the reason the client chose this concept over the typographic alternative, and
it is the thing that must survive any future edit.

---

## Carried over from the preview, verbatim in behaviour

| Preview | Here |
|---|---|
| `components/preview/contact-b/moments.ts` | `components/contact/moments.ts` |
| `components/preview/contact-b/Depth.tsx` | `components/contact/Depth.tsx` |
| markup in `app/preview/contact-b/page.tsx` | `Collaborations.tsx` + `Social.tsx` |
| `styles/preview-contact-b.css` | merged into `styles/contact.css` |

Nothing under `app/preview/`, `components/preview/` or `styles/preview-*.css` was touched.
`/preview/contact-b/` was screenshot before and after the promotion at 1440×900 and is
**pixel-identical** (md5 of the PNGs match at three scroll positions). The client can still
share the comparison page.

**Every placement number is the preview's.** All eight `--w / --x / --y / --r / --ar` values,
both breakpoints, the arch radius `50% 50% 5px 5px / 34% 34% 1.6% 1.6%`, the near/far lane
assignment, the far lane's `rgba(251,247,242,0.17)` veil and its lighter shadow, the two
z-indexes, the nameplate's `rgba(shade,0.74)` + cream hairline + `blur(14px)` material, the
`left: 16% / 22%` nudge on doorway 05, the doorway tile's sand ring and its focus fix — all
copied unchanged. The composition was not re-judged.

### Re-namespacing

`.contact-b .cb-*` → the page's own `.cx-*`, so the promoted sections live in the same
namespace as the hero rather than under a preview root:

`cb-collab → cx-collab` · `cb-head → cx-collab__head` · `cb-brow → cx-eyebrow` ·
`cb-q → cx-q` · `cb-lead → cx-openTo` · `cb-wall → cx-wall` · `cb-m → cx-arch` ·
`cb-m__arch → cx-arch__cut` · `cb-m__plate → cx-arch__plate` · `cb-m__n → cx-arch__n` ·
`cb-m__t → cx-arch__t` · `cb-act → cx-act` · `cb-cta → cx-cta` (the page's own) ·
`cb-dest → cx-dest` · `cb-social__list → cx-soc` · `cb-door → cx-door`.

`Depth.tsx` follows: it scopes to `.cx` and reads `.cx-arch`. The hero carries no `[data-br]`,
so neither the reveal nor the depth pass can touch the approved block.

---

## How the missing email reads

`links.emailCollaborations` is `null`, and null renders as **nothing** — no second address, no
`mailto:#`, no "coming soon", no greyed-out row, no invented mailbox.

The button keeps the client's own words, **"Write to us"**, and where writing to them actually
goes is named in plain sight directly beneath it:

> **Write to us →**  WhatsApp · +91 91108 91897

The destination comes from `buildChannels(links.emailCollaborations)` rather than being typed
into the markup, so the day the client supplies an address the row names it and the section
does not need redesigning. Same helper the hero uses. `target="_blank" rel="noopener
noreferrer"` on it, as on both social doorways.

Grepped the rendered page: **zero email addresses in the output.**

---

## What differs from the preview, and why

**1. Every photograph now carries its provenance.** This is the one substantive addition.
The preview's plate held the subject only; here it holds the subject *and* the event the
frame was actually shot at, in the caption system the hero's own figure already uses — a sand
tick, then `Samskrithi Sadhana · 29 June 2025` or `Pranava Workshop · 13 April 2025`.
Collections come from `Context/Media/_audit/tagged.json`, dates from
`Context/Media/README.md`; the form matches `components/within/frames.ts`. Six of the eight
frames are Samskrithi Sadhana and two are the 13 April Pranava workshop, and each now says so.
A subject the community will talk about and a fact about the photograph are different kinds of
statement, and carrying both is what stops either being read as the other — this project has
already published a Samskrithi Sadhana frame captioned as a Yoga Mandala gathering once.
**No venue and no city are stated**, because the audit states none.

The plate is a two-row grid instead of a one-row inline flex, the provenance spanning the full
plate so it does not lose the number's column. **Below 640px the date is dropped and only the
event is named**: at 390px a 58%-wide doorway leaves the plate about 160px of text, and the
full string broke to three lines — a five-line plate stops reading as a plate at all. Measured
on screenshots at 320/390/640/768/1440/2560, not guessed.

**2. The CTA is the page's own `.cx-cta`,** not a second clay button. Same colours
(`--clay-deep` → `--clay-press`), but the ground wipes in on hover, focus **and** `:active`
rather than cross-fading — that is the interaction grammar the rest of the site already uses,
and touch has no hover. The arrow is the shared `Arrow` atom exported from `ChannelList.tsx`.

**3. Section 03 changed ground.** The preview had a stand-in `cb-handoff` bar and no footer;
here the colonnade meets the real hero above and the sitewide footer below. Both the social
band and the footer are `--ground-deep`, and the footer's existing 1px clay hairline is the
seam between them — the same join `/join/` already ends on. Consequently the inverted paper
focus ring is now scoped to `.cx-collab` alone; `.cx-social` takes the global cream-in-dark
ring, except its cream doorway tiles, which keep the preview's ink-ring-plus-restated-shadow
fix.

**4. Soft cream is solid.** `.cx-eyebrow--dark` and `.cx-social__say` use this page's
`--cx-soft: #BDB8B4` — `rgba(251,247,242,0.72)` already composited on `--ground-deep` — rather
than the rgba token, because the probe reads `cs.color` and an rgba text colour flatters
itself.

**5. The wall gets its own measure.** `--cx-wide: 88rem` beside the hero's
`--cx-max: 1200px`. Eight overlapping doorways need room to be a wall rather than a column;
the hero's columns still line up with the navigation pill.

Nothing else moved. No frame was substituted, no doorway resized, no tilt softened.

---

## Content law, checked rather than assumed

| Field | Value | What renders |
|---|---|---|
| `links.emailGeneral` | `null` | **Nothing.** |
| `links.emailCollaborations` | `null` | **Nothing.** The action routes to WhatsApp, labelled. |
| `site.address` | `null` | **Nothing.** No address block, no "Location", no city. |
| `site.url` | `null` | No canonical, no OG URL (`layout.tsx` guards it). |

- **No location as an organisational fact.** Grepped the rendered text for
  Bengaluru / Bangalore / India / Karnataka: one hit, `Samskrithi Sadhana · Bengaluru`, the
  hero photograph's provenance caption, which was already approved. The eight new captions
  add no city at all.
- **No invented counts.** Grepped for any number followed by teachers / members / students /
  practitioners / years / schools: none. The only digits on the page are `01` (the hero's
  ledger marker), `01`–`08` (the client's own eight subjects), the phone number and two
  photograph dates that are recorded in the media audit.
- **Pranava Seva Trust** leads band 03 as a heading, not a footnote: Yoga Mandala is an
  initiative under it and keeps no accounts of its own, which is the reason the Instagram
  handle reads personal. `@thepranavshastri` is derived from the URL itself so label and
  destination cannot drift.
- Every `alt` is verbatim from `public/media/stills.json`.

---

## Measurements

Dev server, Chromium via Playwright, one browser at a time.

- **`tools/contrast-probe.mjs` — 0 FAIL at all seven mandated sizes**, at five scroll
  positions each (the fold, `.cx-collab__head`, `.cx-arch:nth-child(4)`,
  `.cx-arch:nth-child(7)`, `.cx-social`): 320×568, 390×844, 768×1024, 1024×768, 1280×720,
  1440×900, 2560×1440. 35 runs, every one clean. Every nameplate sampled measured **8.9:1 or
  better** — subject, number and provenance alike — because the plate owns a ground, so its
  contrast is a constant rather than a function of the crop.
- **No horizontal overflow** at 320, 360, 390, 430, 560, 620, 768, 820, 960, 1024, 1180, 1280,
  1440, 1600, 1920, 2560: `scrollWidth === clientWidth` at every one, after scrolling the
  whole page. Doorways 05 and 08 leave the paper inside `overflow-x: clip` on `.cx-collab`.
- **`prefers-reduced-motion: reduce`:** `Depth.tsx` returns before attaching anything, `.cx`
  never gets `is-live`, no `--py` is ever written and each doorway's transform is its tilt
  alone. Zero elements at `opacity < 1`, `visibility: hidden` or zero size across
  `.cx-arch`, `.cx-arch__plate`, `.cx-act` and `.cx-door`. The wall is complete and static.
- **JavaScript off:** the whole page is in the static HTML — eight photographs, eight
  nameplates, both links, the number. Only the *Copy number* button is absent, which is what
  it is for.
- **Focus:** the doorway tile is cream and carries its own `box-shadow`, which outranks the
  global halo on specificity and would swallow it. Verified by focusing it and reading the
  computed style: `outline: rgb(36,29,24) solid 2px` plus
  `rgba(251,247,242,0.95) 0 0 0 4px, rgba(36,29,24,0.55) 0 0 0 5px` alongside the tile's own
  shadow. Screenshot in evidence. The paper CTA takes the inverted ink-in-cream ring.
- Exactly **one `<h1>`** ("Connect With Us", the hero's); three `<h2>`. **Nine `<img>`, all
  with real alt.** **Every external link** carries `target="_blank" rel="noopener noreferrer"`
  (0 exceptions found).
- `npx tsc --noEmit`, `npx next build`, `npx eslint .` and `npm run check:copy` (73 client
  sentences, all verbatim) all pass.

---

## Still true, and not owned by this page

**Fraunces mis-sets `U+012B`.** "Praṇav Śāstrī" renders in the display face with the macron
detached and floating right of the i, at every size — measured, not guessed. Inter and every
system fallback set it correctly, which is why `.cx-card__who` uses the text face. `app/
layout.tsx` now loads `subsets: ['latin', 'latin-ext']`; any page setting a Sanskrit
diacritic in the display face should check it renders before trusting it.

**No `tel:` link.** The client called this a WhatsApp number, so it is offered as WhatsApp.
Turning it into a voice-call link would be an assumption about how they want to be reached.

**The sitewide footer** is documented in `components/SiteFooter.tsx` and `styles/footer.css`.
It is unchanged by this promotion.
