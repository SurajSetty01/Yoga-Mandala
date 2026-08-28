# 03 — Asset Strategy

Assets are the highest-risk part of this project. A generic image library turns a good layout into a wellness template. This document fixes **where every image comes from** before any page is built.

---

## 1. The problem to avoid

The framework bans "generic wellness stock imagery" and "spiritual clichés" (§17). In practice that means these images are **forbidden**, no exceptions:

- Silhouette in warrior pose against a sunset
- Person meditating on a beach / clifftop / dock
- Lotus flowers, om symbols, mandala patterns as decoration
- Hands in prayer mudra, close-cropped
- Candles, incense smoke, singing bowls, mala beads as hero imagery
- Rolled purple yoga mats on white floors
- Anything with a lens flare or teal-and-orange grade
- Smiling people in athleisure in a bright studio, shot from the front

If an image would be at home on a spa's homepage, it is wrong for this site.

---

## 2. The four legitimate asset streams

### Stream A — Public-domain archival imagery ⭐ *the differentiator*

This is what makes the site look scholarly rather than commercial, and it is entirely free and legally clean.

| Source | What to take | Rights |
|---|---|---|
| **Wellcome Collection** (wellcomecollection.org) | 19th-c. Indian gouache paintings of āsanas (e.g. the *Jogapradīpikā* series), yogic anatomy illustrations, manuscript pages | CC0 / PD — attribution good practice |
| **Internet Archive** | Scanned title pages and plates from PD editions of the Yoga Sūtras, Haṭha Yoga Pradīpikā, Gheraṇḍa Saṃhitā | PD |
| **The Met Open Access** | Indian sculpture, manuscript folios, textile fragments | CC0 |
| **Rijksmuseum / British Library Flickr Commons** | Indian manuscript illustration, botanical plates, palm-leaf manuscripts | PD |
| **Smithsonian Open Access** | Indian material culture | CC0 |

Use for: Library, Reading Circle, Teacher's Desk concept, About, section dividers, texture. Treatment **T6 archival plate** or **T10 duotone ground**.

**Verify rights per item and record the source in the content file.** §6.3 is explicit: *"Where rights are unclear, use legitimate links, bibliographic information or approved access methods."* Every archival asset carries `source`, `rights`, `credit` in its front-matter.

### Stream B — Editorial documentary photography

For anything showing contemporary people and practice.

Sources: **Unsplash**, **Pexels** (both free commercial use, no attribution required). Indian-specific: **The Better India** creative-commons pools, **Wikimedia Commons** (check licence per file).

**Search terms that work:** "yoga teacher training india", "sanskrit manuscript", "indian classroom study", "hands holding book", "morning light interior india", "group discussion floor seating", "teacher explaining", "old books shelf", "temple architecture detail", "khadi textile", "banyan tree", "kerala interior", "mysore street morning".

**Selection test — an image qualifies only if it is:** documentary rather than posed · naturally lit · shows *study, teaching or gathering* rather than performance of a pose · contains real environmental texture · is not shot in a white-cyclorama studio.

Prefer people **learning** over people **posing**. This site is about teachers as scholars and professionals, not about bodies in asanas.

### Stream C — AI-generated imagery

Permitted where the composition needs a specific image no library provides — e.g. a precise texture, an abstract ground, an over-the-shoulder detail.

**Rules.** Never generate identifiable faces. Never generate anything presented as a real person, place or event. Photorealistic and grainy — target 35mm film, not "digital art". No "spiritual wellness" prompting. Every generated file is logged in `/assets/GENERATED.md` with its prompt, so nothing untraceable ends up in the build.

**Best uses:** texture and ground plates · abstract close details (paper, thread, brass, water, stone) · hands/objects without faces · architectural fragments.
**Worst uses:** anything that must feel like documentary evidence of a real community. Use Stream B there.

### Stream D — Client-supplied

Real community photography, the logo, portraits of real teachers, event photos. **None exists yet.** Every slot expecting this is built with a placeholder and flagged in the page doc. See [04-CLIENT-DATA-MASTER-LIST](04-CLIENT-DATA-MASTER-LIST.md).

---

## 3. Video

One hero video maximum, sitewide. Only if a genuinely suitable clip exists — slow, observational, natural light, no fast cuts, no drone-over-mountains cliché. Sources: Pexels Video, Coverr, Mixkit.

If nothing suitable is found, **use a still composition instead**. Do not compromise the hero to force video into it. ≤3MB, muted, `playsinline`, poster frame, disabled below 768px.

---

## 4. Per-page asset budget

Keeping this bounded is what prevents a heavy site from becoming a slow one.

| Page | Photographs | Archival | Generated | Total |
|---|---|---|---|---|
| Home | 6–8 | 1–2 | 1–2 | ~10 |
| About | 3–4 | 2 | 1 | ~7 |
| Learn hub | 4 | 1 | — | 5 |
| Initiatives | 3 + 1/entry | — | — | ~8 |
| Bulletin | 2 + 1/entry | — | — | ~8 |
| Library | 1 | 8–12 (covers/plates) | 1 texture | ~13 |
| Reading Circle | 2 | 2 | — | 4 |
| Connect hub | 3 | — | 1 | 4 |
| Directory | 1 + placeholder portraits | — | — | ~10 |
| Sangha Board | 2 | — | 1 | 3 |
| Events | 3 + 1/event | — | — | ~9 |
| Discover | 2 + 1/entry | — | — | ~8 |
| Join / Submit | 2 | 1 | — | 3 |

**Sitewide ceiling: ~95 unique assets.** Reuse across pages is fine and encouraged for coherence; duplicates count once.

---

## 5. Pipeline

1. Source at the largest available size → `/assets/source/`
2. Crop to the ratio the composition needs — **crop deliberately, never let CSS `object-fit` do the art direction**
3. Grade toward paper temperature; apply 3–5% grain
4. Export AVIF + WebP at 480 / 768 / 1200 / 1920
5. Record in `/assets/CREDITS.md`: filename, source, URL, licence, attribution requirement
6. Alt text written at the same time, never retrofitted

---

## 6. Integrity rules — non-negotiable

The framework is a document about trust, verification and not making false claims (§12, §14). The site must not undercut that.

1. **No fabricated people.** Placeholder teacher profiles use obviously placeholder names (`Teacher Name`, `[Sample Profile]`) — never invented plausible Indian names with invented credentials.
2. **No fabricated credentials, quotes, testimonials or ratings.** Not even as filler. §14 forbids "misleading claims about qualifications".
3. **No stock portrait presented as a community member.** Placeholder portraits are visibly treated — duotone, cropped away from the face, or an illustrated silhouette — so they can never be mistaken for real members.
4. **Every sample entry carries a visible `Sample content` marker** in Phase A builds.
5. **No real organisation's name or logo** appears as a partner without confirmation — including Pranava, beyond what the framework itself states.
6. **Archival images are captioned with their real source.** A 19th-century plate is labelled as such, not passed off as contemporary.

These rules exist because the client will demo this site. Anything that looks like a real person or a real claim will be read as one.
