# Yoga Mandala — Hero Brief

## The client

Yoga Mandala is a community of Yoga teachers and serious practitioners in Bengaluru,
coming together to **connect, learn, collaborate and grow**. It is explicitly *not* a
school, a lineage, a studio or a brand. It is a peer community across traditions.

Founding premise, in the client's own words:

> Yoga is a vast tradition, and no single teacher can know everything. Yoga Mandala was
> created with the simple belief that the Yoga community becomes stronger when teachers
> share knowledge, experiences, opportunities and resources with one another.

Primary action: **join the WhatsApp community.** Secondary: read *What Happens Within*.

## Direction (locked by the client)

**Warm & human, image-first.** Photography leads. Text is short and supportive.
Motion is present and considered, never decorative for its own sake.

## What this must NOT be

A previous build spent 12 hours producing a cream page of body copy with **zero
photographs above the fold**, one `@keyframes` in the entire site, and 29 of the 703 audited
frames used. Its design system banned type over imagery outright,
justified by the claim that "one frame in forty-two has a clean headline region" — the
project's own vision audit records **275 of 703** frames with usable text headroom.

Do not produce a restrained print-catalogue page. Do not lead with paragraphs.
Do not leave the media unused.

## The starting point

`design/index.html` — "Concept B / Immersive", chosen by the client as the **direction**,
explicitly **not** as a finished design. Its core idea to preserve:

- one photograph or clip filling the viewport
- type set *inside* the frame, on the frame's own dark region
- a directional scrim shaped to the light in the picture, not a flat black wash
- a floating pill navigation that inverts as it leaves the image

Everything else about it is open, and most of it should change. The client's words:

> The hero should feel like a premium, immersive, highly intentional digital experience,
> not a conventional website hero with an image and text layered over it. […] The current
> buttons and right-side element also need to be reconsidered rather than simply retained.

## Media

Served by the live server at `/media/...` — the same paths the production Next app will use.

| Index | Contents |
|---|---|
| `design/media/stills.json` | 32 stills, each with role, quality 1-5, `textHeadroom`, native dimensions, aspect ratio, focal point, alt text and a full subject description |
| `design/media/clips.json` | 21 clips, each with `videoLoop` score, quality, poster path and byte size |

Files: `/media/stills/<id>-<width>.webp` (960, 1920, and 2560 for hero/fullBleed roles) ·
`/media/clips/<id>.mp4` · `/media/posters/<id>.jpg` and `.avif`

**The clips are 12-second silent ambient loops**, trimmed to start 10% in so they never open
on an unsteady head frame. Largest is 3.5 MB. They are loops, not films — no audio, no
narrative.

The full 703-frame vision audit is at `Context/Media/_audit/vision/*.json` if you want to
find something the shortlist missed. `Context/` is the untouchable source of truth:
**read it, never write to it.**

### Frames worth knowing about

- `ss-dsc07118` — a teacher's hand held just above a student's back, mid-adjustment.
  Portrait, quality 5. The warmest and most human frame in the archive.
- `ss-dsc07137` — a teacher in a light blue kurta on a green stool, listeners seated on the
  floor around him. Quality 5, top headroom. Currently the Concept B hero image.
- `p13-img_0617` — the full studio: participants on coloured mats, Iyengar rope wall, warm
  wood floor. Shows the community at scale.
- `ss-ven0139` / `ss-ven0096` / `ss-ven0070` — wide halls, rows of practitioners moving
  slowly through a posture. Loop score 5. These are the strongest video loops.
- `ss-dsc07153`-`07165`, `ss-ven0265`-`0318` — **Bharatanatyam dance at the Samskrithi
  Sadhana festival.** Technically the highest-scoring frames in the archive, but they are a
  performance, not yoga teaching. Use only if the framing makes the festival context clear;
  never as the primary image of what Yoga Mandala is.

## Copy you may use (verbatim from the client, do not invent claims)

- Yoga Mandala — A Community of Yoga Teachers
- Yoga Mandala is a community of Yoga teachers and serious practitioners coming together to
  connect, learn, collaborate and grow.
- Yoga is a vast tradition, and no single teacher can know everything.
- Connect · Learn · Collaborate · Grow
- Everyone has something to learn. Everyone has something to contribute.
- Join the Yoga Mandala WhatsApp Community
- What Happens Within Yoga Mandala

Short editorial headlines derived from the above are fine. **Inventing facts — member
counts, years running, testimonials, locations, credentials — is not.**

### The site has exactly four pages. Do not invent a fifth.

Settled from the client's own footer line in `Context/Website Pages Data.docx`:
*"About Yoga Mandala | What Happens Within Yoga Mandala | Join / Connect | Contact"*.

| Route | Nav label | Full title |
|---|---|---|
| `/` | About | About Yoga Mandala |
| `/within/` | Within | What Happens Within Yoga Mandala |
| `/join/` | Join | Join / Connect |
| `/contact/` | Contact | Contact |

`Sangha`, `Pranava Vaakya`, the `Learning Initiative` and the `Curation & Learning Bulletin`
are **sub-sections of page 2**, not routes. Two refinement candidates independently invented
a fifth nav item ("Gatherings", "The idea") because an earlier version of this brief listed
the copy but not the routes. There is no fifth page.

### Two lists that look the same and are not

- **Tagline** (About page + footer): Connect · Learn · Collaborate · **Grow**
- **Pillars** (the four ideas of page 2): Connect · Learn · Collaborate · **Share**

Page 2 ends on *Share* — "The community is also a place to give back." Both are the client's
own words. The previous build used Grow in both places, which misrepresents the structure of
their content.

### Contact, and what is still missing

Confirmed by the client on 9 September 2026 — full provenance in `design/CONTENT.md`:

- Yoga Mandala is **an initiative under Pranava Seva Trust** and has no socials of its own.
- WhatsApp `https://wa.me/919110891897` — the primary call to action sitewide.
- Instagram `https://www.instagram.com/thepranavshastri`.
- **No postal address has been supplied.** Do not put a city or location anywhere as an
  organisational fact. "Bengaluru" belongs only in photo captions, as image provenance.

## Hard requirements

1. **Accessibility is not negotiable.** Every text/background pair ≥ 4.5:1 (≥ 3:1 for text
   at 24px+ or 19px bold). Visible focus states on every interactive element. Real `alt` on
   every image. Exactly one `<h1>`.
2. **`prefers-reduced-motion: reduce` must yield a complete, static, usable hero.** No
   content may be reachable only through motion.
3. **No horizontal overflow** at any width from 320px to 2560px.
4. **Autoplaying video must be `muted`, `playsinline`, `loop`, with a `poster`.** Never
   autoplay under reduced-motion; offer the poster instead. Respect `navigator.connection`
   save-data where you can.
5. **Scroll must never be hijacked.** Scroll-*driven* is welcome; scroll-*jacked* is not.
   The user's own scroll position must always be theirs.
6. **60fps.** Animate `transform` and `opacity`. Never animate `width`, `height`, `top`,
   `left`, `box-shadow` or `filter` in a scroll handler. Batch reads and writes inside one
   `requestAnimationFrame`; never read layout inside a scroll listener without one.
7. **Touch devices have no hover.** Every hover affordance needs a non-hover equivalent.
   Guard custom-cursor work behind `(hover: hover) and (pointer: fine)`.
8. The page must work with **no build step** — plain HTML, CSS and JS, opened over the
   live server. No bundler, no framework, no npm packages. GSAP is available locally at
   `/vendor/gsap.min.js` if you genuinely need it; native CSS and the Web Animations API
   usually suffice and cost nothing.

## Known traps in this codebase (all cost real time already)

- **Never put `clip-path` that clips to zero area on an element you observe with
  `IntersectionObserver`.** Chromium computes the intersection rect *after* clips, so the
  element reports ratio 0, never fires, and stays invisible forever. Put the clip on a child.
- **CSS specificity, twice over:** `.nav a` (0,2,0) beats a bare `.cta` (0,1,0), and
  `.nav a:not(.cta)` (0,2,1) beats `.nav .menu` (0,2,0). Both shipped bugs — an unreadable
  button and a mobile nav that did not exist.
- **A transparent header over a full-bleed photograph is a contrast trap.** The frame behind
  the links changes with every viewport; no tint fixes it. Either the bar owns a ground, or
  the links sit on a scrim that provably covers them.
- **Portrait viewports crop landscape frames hard.** Set a mobile `object-position`
  deliberately and *look at it*, or the subject of the photograph ends up off-screen.
- **This machine is 16 GB with 16 cores and has OOM-killed itself on this project before.**
  Do not run more than one Chromium at a time. Do not run image or video encoding at the
  same time as a browser.


---

## A correction, and why it is recorded here

An earlier version of this brief said the archive holds **"1,311 photographs and 398 clips"**.
That was wrong, and it was my error, not an agent's.

`1311` is the count of every `.jpg` anywhere under `Context/` — **756 of which are audit
thumbnails and contact sheets generated by the vision pass**, not photographs. Of the 555 real
JPEGs, 309 are video *poster frames* rather than standalone pictures.

Counted properly:

| | |
|---|---|
| Photographs | **307** — Pranava 13 Apr (113), Pranava 27 Apr (85), Samskrithi Sadhana (109) |
| RAW files | 111, the same frames as the Samskrithi JPEGs — not additional pictures |
| Video clips | **396** |
| Frames in the vision audit | 703 |

A design agent caught this while being asked to use the archive's scale as part of an
argument, and correctly declined to publish the number rather than repeating it. That is the
behaviour this project needs: the previous build published *"700+ teachers across India and
abroad"*, which appears nowhere in the client's material, and the rule against inventing
figures applies to numbers about the archive exactly as it applies to numbers about the
community — including when the figure comes from the brief.

**If a number is going on the page, count it yourself first.**
