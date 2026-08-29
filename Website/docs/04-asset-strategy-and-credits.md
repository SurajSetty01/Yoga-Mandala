# 04 — Asset Strategy & Credits

Assets are the highest-risk part of the project: a generic image library turns a good layout
into a wellness template. This fixes where every image comes from, and the integrity rules
that protect the framework's promise of trust and no-false-claims.

## Forbidden imagery (framework §17)

Silhouettes in poses against sunsets · people meditating on beaches/clifftops · lotus/om/mandala
as decoration · prayer-mudra close-ups · candles/incense/singing-bowls/mala as hero · rolled
purple mats on white floors · lens flares / teal-orange grades · athleisure models in bright
studios shot front-on. **If an image would suit a spa homepage, it is wrong here.**

## Legitimate streams

- **A — Public-domain archival** (the differentiator): manuscript plates, title pages and
  illustrations from Internet Archive, Wellcome Collection, The Met / Rijksmuseum / British
  Library / Smithsonian Open Access. Used for the Library (real records), texture and dividers.
  Every item records `source`, `rights`, `credit`.
- **B — Documentary editorial photography** (Unsplash/Pexels, CC): people *studying, teaching,
  gathering* — never posing. Naturally lit, real environmental texture, not white-cyclorama.
- **C — AI-generated textures/objects WITHOUT faces** (paper, thread, brass, stone, water,
  architectural fragments). Never identifiable people; never presented as a real person/place/event.
  Every generated file is logged in `GENERATED.md` with its prompt.
- **D — Client-supplied** (logo, real portraits, community photos). **None exists yet** — every
  such slot is a visibly-treated placeholder flagged in `07-client-data-needed.md`.

## Placeholder policy (Phase A reality)

Phase A ships without stream-B/C binaries in many slots; image slots use **art-directed CSS
placeholders** (warm forest/sand duotone panels, gold-framed plate frames, typographic plates)
that read as intentional composition, never as broken images, and can be swapped for real
assets by changing one data field. This keeps the build fast, fully offline, and free of any
image that could be mistaken for a real member or a stock wellness cliché.

## Integrity rules — non-negotiable

1. No fabricated people — placeholder profiles use obvious placeholder identities
   (`Sample Teacher A`), never invented plausible names with invented credentials.
2. No fabricated credentials, quotes, testimonials or ratings — not even as filler.
3. No stock portrait presented as a community member — placeholder portraits are duotone /
   cropped away from the face / abstracted.
4. Every sample entry carries a visible `Sample content` marker.
5. No real organisation's name or logo as a partner without confirmation (incl. Pranava beyond
   what the framework itself states).
6. Archival images are captioned with their real source and rights.

## CREDITS

See `public/assets/CREDITS.md` (every asset: file, source, licence, attribution, alt) and
`public/assets/GENERATED.md` (every AI asset: file + prompt). Maintained as assets are added.
