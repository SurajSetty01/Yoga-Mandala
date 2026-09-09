# Join / Connect — build notes

**The idea.** An invitation addressed to one person, then three doors of unequal size: the
question is asked in display italic and answered in roman past a clay rule, and the one door
that is actually open takes the whole width of the page on a reversed ground.

**Why it is not the hero.** The hero puts type inside a moving picture and tunes a scrim until
the words survive the crop. Here the picture *becomes* the ground — a full-bleed strip
dissolves into `--ground-deep` and every glyph below stands on flat warm black, so contrast is
a constant rather than a negotiation with the frame. The invitation's two photographs are laid
by hand (one bleeding, one mounted on the paper) rather than in section 02's strict row.

**The null links.** `links.emailGeneral` and `links.submitOffering` are `null`. Nothing renders
for them: no `href="#"`, no disabled button, no invented address. The action *slot* is a
constant instead — always one real, working link at one size and weight. While the client's
address is missing the slot falls back to the WhatsApp community, labelled for where it
actually goes ("Bring it to the WhatsApp community", "Ask in the WhatsApp community"), never
for where the absent link would have gone. This is a decision, not an accident: WhatsApp is the
only live door on the site and the client's own copy says members ask questions and discover
opportunities there. Supplying an address later is one line in `content/site.ts`
(`components/join/action.ts` handles bare emails and URLs alike) — **measured: swapping both
fallbacks for real labels + hrefs moved nothing at 390 or 1440** (doc height 3190/2767 and both
card heights identical before and after).

**Rejected.** A mandala ring of the seven activities — a gimmick, and unprovable at 320px.
Video anywhere on the page: it would echo the hero, the good landscape loops are spent, and
one clip costs more than every still here combined. A provenance caption under the plate: no
`stills.json` field records the event, and misattributing a photograph is a documented past
failure. `IntersectionObserver` for the reveal: a fast scroll carries an element from below the
fold to above it between callbacks and IO reports nothing, which strands it at opacity 0 — the
first build of this page lost four of the seven litany lines exactly that way. It now asks "has
the fold passed this?" on a self-removing passive listener, and only ever arms elements that
were off-screen at mount, so nothing visible can flash.

**Measurements.**
- `tools/contrast-probe.mjs` — **0 FAIL** at 320×568, 390×844, 768×1024, 1024×768, 1280×720,
  1440×900, 2560×1440; and again at `#community`, `#jn-contribute`, `#jn-submissions` to reach
  the below-fold blocks the probe cannot otherwise see.
- CTA in every state (rest / mid-wipe / hover / focus / active) at all seven widths — **0 FAIL**.
  `--clay-deep` 5.98:1, `--clay-press` 8.5:1.
- Litany, cream on `--ground-deep`: 16.66:1. Sand eyebrow on the same flat ground: 13.21:1
  (sand is ornament *on photographs*; here its backdrop is a measured constant).
  `--ink-soft` question on cream 7.3:1; `--clay-deep` secondary actions 5.98:1 on paper,
  5.31:1 on the warm inset.
- No horizontal overflow 320→2560; exactly one `<h1>`; alt on all three images; no console
  errors, no failed requests; every external link `target="_blank" rel="noopener noreferrer"`.
- `prefers-reduced-motion: reduce` and JavaScript disabled both render the complete page —
  0 elements at opacity 0, all 7 litany lines, all 3 links.
- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass.
