# Section design brief — the standard every section must now meet

Read this with `design/DESIGN-SYSTEM.md` (tokens, measured rules, content law) and
`design/BRIEF.md` (the client, the direction, the media).

---

## What happened, and why you are being asked to start over

A first build shipped a cream, text-only site and was rejected outright. A four-way blind
tournament then produced the homepage hero — three competing agents, a judging pass, and a
winner selected on evidence. **The client approved that hero and calls it the benchmark.**

Afterwards, single agents built the remaining pages under time pressure without competition.
The client's verdict on those, in their own words:

> "Why we begin is just again, you just right-side text, left-side text, that's it. And again,
> our purpose, again, it's just text, text, text, text everywhere… It's literally just text.
> I don't want just boxy fucking images."

The failure is not craft — those sections measure clean and pass every gate. The failure is
that **they have no idea in them**. Each is a competent arrangement of paragraphs, or a
rectangle of photograph beside a rectangle of text. That is what you must not produce.

## The bar

Look at the approved hero, running at `/`. Its idea is not "a video background". Its idea is
that *three clips of one class, in the order the class happened, let the bodies in the frame
descend as the reader descends, so the hero ends in savasana exactly as it hands over.* The
content and the mechanic are the same thought.

**Every section you design needs an idea of that kind.** Not a layout — a reason this
particular content behaves this particular way.

## What "its own idea" means, concretely

A section earns its place when you can finish this sentence without embarrassment:
*"This section works like ____, because the content is ____."*

Directions worth exploring — combine them, do not tick them off:

- **Composition** — what governs the arrangement: a grid, a spine, a radial figure, a
  timeline, a stack, a horizon, a single object.
- **Media treatment** — this is where "boxy image next to text" dies. Photographs can be
  masked to shapes, torn, stacked and offset, cropped to a detail rather than shown whole,
  bled off one edge, used as a ground the type sits inside, dissolved into a colour field,
  clipped by type, revealed through a moving aperture, or duplicated at different scales.
  A rectangle with a caption beside it is the default; you must beat the default.
- **Typography as image** — type at a scale where it *is* the graphic. Words that break,
  overlap, get occluded by a photograph, or carry the section on their own.
- **Scroll behaviour** — what changes as the reader descends, and why it is the right thing
  to change for this content. Scroll-driven, never scroll-jacked.
- **Motion** — entrances, transforms, sequencing. Must survive `prefers-reduced-motion`.
- **Micro-interaction** — hover, press, focus, cursor. Every one needs a touch and keyboard
  equivalent. A custom cursor that draws attention to itself rather than the content is a
  failure; say so and cut it.
- **Depth and layering** — foreground, midground, ground. Occlusion. Parallax that means
  something.
- **Transitions between sections** — how one hands over to the next. The hero's overlap
  handoff is the reference.

## What is explicitly NOT wanted

- Novelty for its own sake. An effect that does not serve the content is worse than plain.
- Every section looking unrelated. Continuity comes from the tokens, the type scale, the
  caption system and the interaction grammar. Novelty comes from composition, media
  treatment and behaviour.
- An "editorial/document" website. Information being present does not mean it must be
  paragraphs. Use the photography, the video, typography, space and motion to carry it.
- Decoration standing in for an idea. Grain, blur and gradients are not a concept.

## The process you are part of

Three agents design the same section independently, from genuinely different starting
premises. A judge then evaluates the concepts on rendered evidence and picks one. **A concept
that merely satisfies the content requirements will be rejected.** If every concept is
generic, all three are thrown out and the round is re-run.

So: do not hedge toward a safe layout. A committed, arguable, possibly-wrong idea is worth
more here than a competent arrangement — the safe version has already been built and rejected.

## Non-negotiables, unchanged

Everything in `design/DESIGN-SYSTEM.md` §3 (contrast measured with `tools/contrast-probe.mjs`
at seven viewports, reduced-motion completeness, no scroll hijack, transform/opacity only, no
hover-only affordances, visible focus, one `<h1>`, no overflow) and §4 (content law — the
client's words verbatim, nothing invented, `null` renders as nothing).

Craft is the floor, not the achievement. The rejected sections all passed these gates.
