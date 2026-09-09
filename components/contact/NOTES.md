# Page 4 — Connect With Us, and the sitewide footer

## The idea

A contact page is normally a form, an address block and a rack of channels. This one has
none of those. `site.address` is `null`, `links.emailGeneral` is `null`,
`links.emailCollaborations` is `null`. What exists is **one live human channel** — a
WhatsApp number belonging to a person the client asked to be named.

So the page is designed around that fact instead of around the shape of a contact page.
The number is the largest thing on it after the headline: set in the display face, on the
site's strongest ground (warm black), under the label **Speak with** and the name
**Praṇav Śāstrī**. It reads as reaching a person, not as filing a ticket.

Three numbered ways in, in the client's own order: **01 General Enquiries** on dark,
**02 Collaborations** on paper, **03 Social** on warm paper, then the footer returns to
dark. One photograph, framed and captioned, never full-bleed and never carrying type.

**Not the hero.** The hero is a sticky three-movement video sequence with the type inside
the picture. Here nothing moves, nothing bleeds, and no word sits on a photograph. The
page's own scroll idea is a **sticky invitation column**: on wide viewports the
Collaborations heading, its question and its action stay pinned while the eight subjects
run past — the line stays open for as long as you are reading. Sticky is *position*, not
motion, so `prefers-reduced-motion` keeps it whole. Continuity with the rest of the site is
carried by the tokens, the type scale, the sand caption rule and the clay CTA whose ground
wipes in on hover, focus **and** `:active` (touch has no hover).

## Every missing field, and what was done with it

| Field | Value | What renders |
|---|---|---|
| `links.emailGeneral` | `null` | **Nothing.** No row, no label, no greyed-out slot. |
| `links.emailCollaborations` | `null` | **Nothing.** |
| `site.address` | `null` | **Nothing.** No address block, no "Location" heading, no city. |
| `site.url` | `null` | No canonical, no OG URL (`layout.tsx` already guards this). |
| `links.submitOffering` | `null` | Not referenced — it belongs to page 3. |

**Why it does not look broken.** The channels are a *filtered array*, not a set of slots —
see `ChannelList.tsx`. `buildChannels(email)` returns one row today and two the moment an
address is supplied. One filled row inside a card reads as a complete object; three slots
with two of them empty reads as a fault. The email row's larger-value case already has its
own type size in `styles/contact.css` (`.cx-ch__i[data-kind='email'] .cx-ch__v`), so
supplying an address is a **data change, not a redesign**.

**"Write to us"** is the client's own label for the collaborations action and it points at
`[EMAIL ADDRESS]` in their document. Since there is no address, the button keeps the
client's words and the destination is printed underneath it in plain sight —
`WhatsApp · +91 91108 91897`. Nothing is relabelled and nothing is implied.

**No `tel:` link.** The client called this a WhatsApp number, so it is offered as WhatsApp.
Turning it into a voice-call link would be an assumption about how they want to be reached.
The digits are plain selectable text, plus a *Copy number* button that only exists once
JavaScript has confirmed a clipboard.

**No location anywhere as an organisational fact.** "Bengaluru" appears exactly once, in the
photograph's provenance caption (`Samskrithi Sadhana · Bengaluru`), which is a fact about
where a picture was taken. `Samskrithi Sadhana` is the collection name in the media
inventory, not a guess.

**Pranava Seva Trust** is stated twice as what the organisation *is*, not as a disclaimer:
it leads section 03 (it is the reason the Instagram handle reads personal) and it closes the
footer. The handle is printed in full — `@thepranavshastri`, derived from the URL itself so
the two cannot drift — so no claim is made about whose account it is.

**Nothing invented.** No email, no city, no year, no copyright date, no count of anybody.
The only digits on the page are `01`–`03` (the section markers), `01`–`08` (the client's own
eight subjects) and the phone number.

## The footer

A masthead row of facts and links, then the client's two closing lines given the whole
width — they are the last thing anyone reads on this site, so they are the largest type
down here rather than a tagline squeezed beside a copyright. `Together, We Rise.` opens the
envoi on the left; `Yoga is better together.` closes it on the right. The register is
**Connect · Learn · Collaborate · Grow** — the tagline, *not* page 2's four pillars, which
end on Share. A 1px clay hairline on top: the same seam `.within` uses to meet the hero, at
half the weight so it reads as that rule's quieter cousin.

It is a server component with no client island (a footer has no behaviour), it carries
`position: relative; z-index: 3` so it clears the hero's sticky stage on page 1, and
`To the top` uses the `#top` fragment, which browsers resolve to the document top even on a
route with no element of that id. Built and verified on `/contact/`; ready to mount on the
other three.

## One thing found that this page does not own

**Fraunces mis-sets `U+012B`.** As loaded in `app/layout.tsx` (`subsets: ['latin']`),
"Praṇav Śāstrī" renders in the display face with the macron detached and floating to the
right of the i, at every size — measured, not guessed. Inter and every system fallback set
it correctly, so `.cx-card__who` uses the text face. The real fix is
`subsets: ['latin', 'latin-ext']` on the Fraunces loader, which is in a file this page does
not own. Any page that sets a Sanskrit diacritic in the display face will hit this.

## Measurements

Dev server, Chromium via Playwright.

- **`tools/contrast-probe.mjs` — 0 FAIL at every mandated size:** 320×568 (8 runs),
  390×844 (14), 768×1024 (14), 1024×768 (18), 1280×720 (16), 1440×900 (19), 2560×1440 (35).
  The probe only samples what is in the viewport, so two extra full-height passes covered
  the rest of the page: **390×3600 — 61 runs, 0 FAIL** and **1440×2650 — 65 runs, 0 FAIL**.
- **Tightest margin on the whole page: 5.31:1** — the clay-deep `03` marker on
  `--ground-warm`, needing 4.5. Next: 5.98:1 (cream on `--clay-deep`, the CTAs and the
  register numerals), 6.48:1, 6.95:1 (teal-deep labels on paper), 7.91:1 (`--cx-soft` on the
  card), 9.03:1 (`--cx-soft` on warm black), 14.58–17.88:1 for everything cream.
- `--cx-soft` / `--ft-soft` are `#BDB8B4` — `rgba(251,247,242,0.72)` **already composited**
  on `--ground-deep`. Kept solid on purpose: the probe reads `cs.color`, so an rgba text
  colour would be measured at its unblended value and the number would flatter itself.
- **No horizontal overflow** at 320, 360, 390, 414, 480, 560, 620, 700, 768, 860, 980, 1024,
  1180, 1280, 1440, 1920, 2560 — `scrollWidth === clientWidth` and no element crosses either
  edge.
- **`prefers-reduced-motion: reduce`:** identical document height (2580px at 1440), zero
  elements at `opacity: 0` / `visibility: hidden` / `display: none`, 126 words in `<main>`,
  53 in the footer, all 11 links present, the photograph loaded. Nothing on this page is
  reachable only through motion because nothing on this page moves.
- **Focus:** 18 focusable elements, 0 without a visible ring. Cream ring in a dark halo on
  the dark band and in the footer; ink ring in a cream halo on both paper bands.
- Exactly one `<h1>`; every `<img>` has real `alt` from `stills.json`; every external link
  carries `target="_blank" rel="noopener noreferrer"`; no console errors, page errors or
  failed requests at either size.
- `npx tsc --noEmit`, `npx next build` and `npx tsx tools/check-copy-fidelity.mts`
  (73 client sentences, all verbatim) all pass. `npx eslint` clean on these files.

## Art direction

`ss-dsc07144` (q5, Samskrithi Sadhana) — one panellist speaking into a microphone while the
others listen, which is the subject of a contact page. **Two crops, deliberately:** a 4:5
portrait pushed to `87% 46%` below 620px, so a phone gets the man with the microphone and
the man listening rather than four people at thumbnail size; a wide crop at `74% 46%` above
980px, where the picture is stretched to exactly the height of the type column beside it so
the band has no dead corner. A shade gradient on its inner edge lets the frame meet the
band instead of sitting on it — cosmetic only, no type is on the picture.
