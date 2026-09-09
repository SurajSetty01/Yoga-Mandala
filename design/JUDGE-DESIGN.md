# Design Judgment — Yoga Mandala hero tournament

Judged by driving all four in Chromium at 1440×900, 390×844, 320 / 768 / 2560, under
`prefers-reduced-motion: reduce`, and by reading every screenshot. Rendered-pixel contrast was
measured by hiding each text element, sampling the composited ground beneath its box, and
computing the ratio against its own computed colour — not by reading CSS. `NOTES.md` files were
read only after forming a view.

---

## Ranking

| # | Candidate | Decisive reason |
|---|---|---|
| **1** | **craft** | The only candidate that turned the client's archive into structure. The frame switcher makes the right-side element *do* something — four photographs, one hero — with a real keyboard and touch twin. It also has the best photograph, the only correct four-page nav, differentiated press-vs-hover, and clean measured contrast. It wins in spite of a custom cursor it should not have. |
| **2** | **depth** | The most disciplined. It proved its thesis on Concept B's own frame instead of swapping in a better one, and the layered parallax genuinely produces volume. Best mobile hero, best focus states, best measured contrast. Loses to craft because loyalty to that frame puts an air-cooler at the optical centre of the page, and because its rethink of the CTA and right rail is editorial rather than structural. |
| **3** | **sequence** | Has the best *idea* in the tournament and the worst execution of its own hero. Fold → Settle → Rest is authored, not templated, and it is the only candidate to use the clips or to put photographs in section 02. But it measurably fails contrast on its own headline and eyebrow, its cross-dissolves render as double exposures, and it removes the nav, the headline and the CTA for most of a 2.5-viewport hero. |
| **4** | **frame** | Owns the single best scroll mechanism here — and spends it abandoning the direction the client locked. A cream page with a conventional masthead and an inset plate is not "immersive", the scrim is a hard-edged box rather than a directional gradient, nothing happens at load, and focused nav links sit off-screen at negative y. Its own NOTES concede the immersion loss. |

---

## craft — 1st

### Genuinely excellent

- **The photograph is the right one.** `ss-dsc07118` — a teacher's hand held just above a
  student's back — is about a transaction between two people. That is what Yoga Mandala *is*: a
  peer community of teachers, not a studio with a brand. Every other candidate opened on a room;
  craft opened on a relationship.
- **The frame switcher is the best single answer to the client's "right-side element" note.** Four
  frames, peek on hover/focus, commit on click or tap or arrow key, each carrying its own
  `object-position` so no crop loses its subject, labels permanently visible on touch, `aria-live`
  announcing the new frame. I clicked through to `04 / The full room` and the composition held —
  new photograph, new caption, counter advanced, type untouched, contrast intact. This converts a
  dead provenance credit into a picture index, which is the correct move for a client sitting on
  ~1,700 frames.
- **Press is deliberately not hover.** Hover brightens and grows; press goes *warm and smaller*
  (`#FFEEDC`, scale 0.955) and a soft halo blooms into the photograph itself. The button doesn't
  just change state — the light in the picture answers it. That is the best micro-interaction in
  the tournament and the clearest bit of "premium" on show, because it is made of light rather
  than ornament.
- **The only candidate with the settled information architecture.** About / Within / Contact /
  Join. depth invented "The idea"; sequence and frame both invented "Gatherings". The brief names
  this error explicitly and *no* NOTES file in the tournament acknowledges it.
- **The nav inversion is executed properly** — dark glass over the picture, cream pill with a
  terracotta Join over the cream, contracting to mark + Join past the hero, expanding
  unconditionally on `focusin`. This is the one Concept B behaviour worth keeping and craft keeps
  it best.
- **Typography.** Cream roman over blush italic is the most considered type decision here; the
  two-tone display gives the couplet a rhetorical turn the monotone versions don't have. Lede
  measure is right at two lines.
- **Contrast measured clean.** h1 worst-case 6.94 (needs 3.0), eyebrow worst-case 5.03 (needs
  4.5), 0% of either box below threshold.

### Merely competent

- The composition is still Concept B's composition: eyebrow, couplet, lede, actions, bottom-left;
  credit bottom-right. The *behaviour* advanced; the layout did not.
- The CTA — cream pill plus a quiet underlined link — is a good, safe solution, and depth arrived
  at exactly the same one. Neither is a rethink.
- The rail thumbnails are ~68 × 48. At that size they are coloured smudges; only the labels and
  the `01 / 04` counter make the rail legible.

### Missteps

- **The custom cursor.** A 31px cream ring with a raw-position dot, in six states. On a page whose
  entire thesis is that the photograph is the content, the brightest small object on screen is the
  pointer. Six states is the tell — the effort went *into* the cursor, not through it. It also
  survives onto the cream sections, where it becomes a faint grey ring floating on paper with
  nothing to do. This is precisely the failure mode of drawing attention to the interface instead
  of the content. Cut it.
- **Magnetism.** Measured: with the pointer 42px *outside* the button, the CTA had already
  displaced 4.4px toward it. The magnitude is tasteful; the move is not. A button that chases the
  cursor is a 2019 agency reflex. Keep the halo, drop the displacement.
- **The headline runs through the student's head.** At 1440, "*No one holds it all.*" crosses the
  bowed student's skull. Contrast passes; composition does not. This is the one place craft's type
  fights its own excellent photograph.
- **Section 02 is two full screens of cream with zero photographs.** On an image-first brief whose
  predecessor was rejected for producing "a cream page of body copy with zero photographs above
  the fold", this is the most serious structural fault in the candidate. Its pillar copy ("Find
  authentic study, resources and discussion that keep you learning") is also invented.
- **No video.** The brief names the `ss-ven` loops as the strongest assets available. craft's NOTES
  admit the rail should carry a clip and that the save-data path was not built.

---

## depth — 2nd

### Genuinely excellent

- **It refused to cheat.** "If the argument is that B is flat, the honest test is to prove it on
  B's own photograph rather than by swapping in a better one." That is the right instinct and it
  works: two parallax plates plus a `blur(3.5px)` near-plate produce real depth-of-field falloff.
  Driven to both extreme corners and flicked fast, the composition never broke.
- **The best mobile hero in the tournament, by a distance.** A deliberate portrait crop that keeps
  the teacher whole with his face high and clear, full-bleed, five elements total. The most picture
  and the least clutter of any of the four small-screen results — and the crop quietly removes the
  desktop frame's worst object.
- **Best measured contrast and the right trade to get there.** h1 worst 8.39, eyebrow worst 6.42,
  0% below threshold — and the eyebrow *colour* was changed rather than the ground made heavier,
  which is exactly the correct decision and the opposite of what a scrim-happy build does.
- **Best focus states.** A cream 2px ring inside a dark 5px halo, so the indicator is visible over
  both photograph and cream; and the nav returns immediately on `focusin` so a keyboard user never
  chases it.
- **The sharpest editorial rethink of the right rail.** The provenance credit is demoted to
  furniture at bottom-left, and the space it held now carries the client's own four words linked
  to the section that opens them out. Dead credit became a hinge between the room and what follows.

### Merely competent

- Cream pill + underlined link, inverting to clay on press with a `scaleX` sweep. Clear, correct,
  and identical in kind to craft's. A solved problem solved again, not reconsidered.
- The `Connect / Learn / Collaborate / Grow` rail is a good idea rendered as 10px letterspaced caps
  in a corner. Having argued the credit was furniture, it made the replacement furniture too.

### Missteps

- **The photograph.** Principle cost them the picture. At 1440 the optical centre of the hero is a
  white plastic air-cooler — the largest, brightest, hardest-edged object in the frame — and the
  crop makes it the subject. Depth's NOTES never mention it. Immersion *into a room* whose focal
  object is an air-conditioner is not a premium impression.
- **The nav pill leaks.** At the hero/cream boundary its blurred ground is not opaque enough: the
  hero's own "Join the WhatsApp community" is legible *through* the pill, and the ground's edge
  feathers irregularly. That is the transparent-header contrast trap the brief names, half-fixed.
- **"The idea" is an invented fifth nav item**, called out by name in the brief and unacknowledged
  in the NOTES.
- The hero→cream handoff is a soft blur wash; the photograph's bottom edge dissolves into mud
  rather than ending on a decision. Every other transition in this candidate is crisp.
- Section 02: cream, four columns, no photographs. Same fault as craft.

---

## sequence — 3rd

### Genuinely excellent

- **The strongest single idea in the whole tournament.** The hero is one class settling from
  standing to stillness — Fold → Settle → Rest — so the hero *earns its exit* instead of merely
  stopping. That arc was in the footage. It is the only thesis here that could not be transplanted
  onto another client's photographs, which is the definition of an original hero.
- **The only candidate that uses the video, and the only one whose section 02 is photographic** —
  four real frames under Connect / Learn / Collaborate / Grow. On an image-first brief this is not
  a small thing; it is the only candidate that actually holds the line below the fold.
- **The best headroom demonstration.** §02 climbs over the hero for ~46svh, so for most of a
  screen-height both sections are on screen moving together — an overlap, not a cut — and the pill
  correctly inverts to paper as it crosses. I watched a different-looking section arrive under this
  hero without the page falling apart. Nobody else showed me that.
- **The right-side element is the best reasoning of the four**: the scroll affordance and the
  chapter index are one object, the active label walks down the rail as the sequence advances, and
  under reduced motion it degrades to the venue caption "because a control that leads nowhere is
  worse than a caption." Correct.
- Reduced motion pauses all three videos and yields a complete static hero.

### Merely competent

- The terracotta filled button is legible and consistent with the nav Join, but it is the most
  conventional CTA here.
- The dot rail is a carousel signifier, and the `FOLD` / `SETTLE` / `REST` chip is a hard dark
  rectangle abutting a hairline — it reads as a video-player chapter marker rather than as a
  member of this design system.

### Missteps — and these are what cost it the podium

- **It fails contrast on its own hero, measurably.** Headline worst-case **2.48** against a
  required 3.0, with 1.3% of the headline's box below threshold. The 11.5px peach eyebrow
  (`rgb(246,217,193)`) worst-case **1.67**, with **8% of its area below 4.5:1**. That is one
  sampled frame of a twelve-second loop; the loop will produce worse. Small peach type over a
  moving mid-tone floor without a scrim shaped to it is the clearest accessibility failure in the
  tournament, on a brief that opens "accessibility is not negotiable."
- **The cross-dissolves are mud.** At the midpoint of each transition the hero is a visible double
  exposure — clip 1's roof trusses and hanging plants ghosting through clip 2's roof — and the
  state persists across roughly 200px of scroll, so a slow scroller sits in it. The NOTES reject a
  masked wipe on the grounds that the three frames share camera height, floor and back wall, and
  admit this was "reasoned from the frames, not A/B-built." The reasoning was wrong. Two busy wide
  shots cross-dissolved read as a rendering fault, not as a transition.
- **For most of the hero there is no navigation, no headline and no call to action.** Two and a
  half viewports of wordless film. I admire the nerve, and on a film-studio site I would applaud
  it. On a page whose one job is to get teachers into a WhatsApp group, the primary action being
  absent for the majority of the hero is a hierarchy failure, not a bold one.
- **"Gatherings"** — invented fifth nav item — and all four nav links point at `#within`.
- **"A COMMUNITY OF YOGA TEACHERS · BENGALURU"** attaches the city to the *organisation* line, not
  to a photo caption. `CONTENT.md` forbids this specifically: no postal address has been supplied
  and "Bengaluru" belongs only in image provenance. craft and frame both put the city where it
  belongs — in the plate caption.
- Section 02 ends in ~500px of dead cream. That is an unfinished build, not restraint.

---

## frame — 4th

### Genuinely excellent

- **The reshape is the best scroll mechanism in the tournament and it is not close.** As you
  descend, the aperture closes from a 2.06:1 plate to a masthead band, gives its height back to the
  ground, and the headline it was carrying lands *in ink on that ground* — same words, changed
  ground, with a clean horizontal split through the letterforms mid-transition. Two opaque
  translating blades instead of `clip-path`; 0 frames over 20ms. Everyone else *manages* the
  problem of type over photograph. Frame dissolves it. At 0.7vh the headline set in near-black on
  cream is the most beautiful type in the whole tournament.
- **The plate register** — `Pl. i`, a hairline, the location set vertically, welded to the frame's
  bottom rule so it rises with it, and `Pl. ii` tipped in later with its own rule and caption — is
  the freshest *graphic* idea on show. Provenance became architecture instead of furniture. It is
  the one device here that would still look considered on page three.
- **The most honest NOTES of the four.** It argues against itself — "it does not win on immersion,
  and I am not going to pretend it does" — and tells the client to put it beside Concept B and say
  which sentence they meant. That is worth something.
- Highest measured headline contrast (worst 13.33) — because the type sits in a solid box, which is
  also the problem.

### Merely competent

- The masthead's sliding clay indicator, returning to the current page on pointer-leave, is a
  tidy piece of nav craft.
- The 320 → 2560 sweep is clean, no horizontal overflow anywhere, and the mobile disclosure sheet
  is real.

### Missteps

- **It abandons the direction the client locked.** The client chose immersive: one photograph
  filling the viewport, type inside the frame on the frame's own dark region, a floating pill that
  inverts as it leaves the image. Frame answers with a cream page, a conventional left-wordmark /
  right-links masthead, an inset plate, and no floating pill until the pin releases. The client
  said the hero must not feel like "a conventional website hero with an image and text layered
  over it"; frame's reply is a *more* conventional page with the image demoted. Its own NOTES cost
  this at 68% → 36% image coverage under reduced motion, which on an image-first brief is the wrong
  trade made knowingly.
- **The scrim is a rectangle.** The one Concept B idea the brief explicitly said to preserve is "a
  directional scrim shaped to the light in the picture, not a flat black wash." Frame ships a
  hard-edged box pasted onto the photograph, whose top and right edges cut a visible tonal step
  across the practitioners — one woman in a yellow-green top has her head inside the box and her
  hips outside it. That is a regression from the starting point, not an evolution of it.
- **Nothing happens at load.** At 250ms the page is already fully composed. For "premium,
  immersive, highly intentional", the first half-second is empty — and frame's own argument is that
  the first half-second is exactly where full-bleed wins.
- **Focused nav links sit off-screen.** Measured: tabbing to About / Within / Gatherings / Contact
  focuses elements at y = −34 to −44 with the page never scrolling them into view. A keyboard user
  gets an invisible focus ring on the primary navigation. This is a defect, not a taste question.
- The focus ring is teal `rgb(44,110,107)` — a colour that appears nowhere else in the hero palette.
- **"Gatherings"** again. And a solid black button beside a ruled link is close to the pair of
  buttons the client asked to be reconsidered.
- On mobile it becomes an unambiguous CMS template: image card, headline block, paragraph, black
  button, text link. The "type set inside the frame" idea is abandoned entirely at that width.
- Section 02 is a dark band with no photographs.

---

## What should make production

Named by candidate, with what each needs to be combined with.

1. **craft's frame switcher**, as the right-side element sitewide. Peek on hover/focus, commit on
   click/tap/arrow, `role="radiogroup"` with roving tabindex, per-frame `object-position`, labels
   always visible on touch. **Combine with:** thumbnails at roughly double their current size so
   they read as pictures rather than swatches, and make one of the four a **sequence video loop**
   — that is where the `ss-ven` clips earn their place without betting the whole hero on them.

2. **frame's reshape**, rebuilt on a full-bleed opening. The two-blade aperture close and the
   headline changing ground from cream-on-photograph to ink-on-paper. **Combine with:** depth's or
   craft's shaped directional scrim at load, so the picture is never carrying a pasted rectangle,
   and the scrim retires as the aperture closes.

3. **sequence's overlap handoff and its photographic section 02.** §02 climbing over the hero for
   ~46svh so both move as one, and four real frames under Connect / Learn / Collaborate / Grow.
   **Combine with:** frame's reshape above — the aperture giving height back to the ground and the
   next section climbing into it are the same gesture described twice. Three of four candidates
   shipped a cream page of four text columns under an image-first hero; that is precisely how the
   previous build failed and it must not survive.

4. **depth's layered parallax and its focus/nav contract.** The blurred near-plate that produces
   actual depth-of-field, damped opposite the pointer, gated behind `(hover:hover) and
   (pointer:fine)` and off under reduced motion; plus the cream-inside-dark focus ring that reads
   on both grounds, and the nav that returns on `focusin`. **Combine with:** craft's
   press-lights-the-photograph halo, which is the best micro-interaction in the tournament and the
   only pointer response that puts the feedback *in the picture* rather than on top of it. And fix
   depth's pill ground so it is genuinely opaque — nothing behind it should be legible through it.

5. **frame's plate register** as the caption system for the whole site. `Pl. i` / hairline /
   vertical provenance, welded to a structural rule. **Combine with:** the correct content rule —
   the city belongs in the plate caption as image provenance and nowhere else. frame and craft both
   got this right; sequence put Bengaluru in the organisation line, which `CONTENT.md` forbids.

**And these must not survive.** Cut craft's custom cursor and its magnetism. Cut sequence's
cross-dissolves in favour of a masked wipe, a push, or a hold-and-cut. Correct the navigation to
the four settled routes — About / Within / Join / Contact — which only craft got right and which
no NOTES file acknowledged getting wrong.

---

## On the hybrid

frame proposes it, unbuilt, in its last paragraph: keep this candidate's masthead, type
architecture, buttons and plate register, and *"let the plate itself start full-bleed and letterbox
into the mat on scroll — the reshape is the good idea here, and it does not actually require the
frame to be present at load."*

**Right about the mechanism. Wrong about what to keep.**

The insight is real and it is the most useful sentence in any of the four NOTES: the reshape does
not need the mat at load. Frame arrives at it honestly, from the observation that a full-bleed hero
has no ground to give back while a matted one does, and from conceding that 100% coverage in the
first half-second reads as *you are in the room* while 68% reads as *a beautifully made page about
a community*. Both halves of that are true.

But the hybrid frame describes preserves the parts that lost — the conventional masthead, the
squared buttons that never sit on a photograph, the boxed scrim — and treats the reshape as a
garnish on them. That is a compromise, and it does lose both: it is neither immersive at load nor
committed to the plate.

The synthesis worth building is the reverse. **Open full-bleed with a scrim shaped to the light,
type inside the frame on the frame's own dark region, the floating pill on a ground that provably
covers its links.** Then on scroll, the aperture closes to a band, the scrim retires, the headline
changes ground from cream-on-photograph to ink-on-paper, the plate register rises with the rule, and
the next section climbs into the height the aperture gave back. You keep the half-second frame
concedes it loses, and you keep the exit that full-bleed alone does not have. The two ideas answer
different moments and never contend — which is what distinguishes a synthesis from a compromise.

Two conditions. The reshape must be scroll-*driven* and reversible; the user's scroll position stays
theirs. And the **resolved** state must be the reduced-motion resting state — but resolved to a band
that still carries a photograph, not to a page about one. frame's own 68% → 36% coverage cost for
reduced-motion users is the wrong answer on an image-first brief, and it is avoidable: rest at the
band, not at the mat.

---

## What I would still change about the winner

craft wins. It is also not finished, and the client has already paid for one build that was not.

1. **Delete the custom cursor.** All six states. On a page arguing that the photograph is the
   content, the pointer must not be the brightest object on screen, and a ring that follows you
   onto the cream sections with nothing to do is worse than one that at least had a job. The
   pointer lamp already says "the picture answers you", and it says it *inside* the picture.
2. **Delete the magnetism.** 4.4px of button-chases-cursor buys nothing and costs the composure.
   Keep the differentiated press — warm and smaller — which is the genuinely good part.
3. **Get the headline off the student's head.** Either lift the type into the clean bokeh band, or
   open on a frame with real headroom and let `ss-dsc07118` be frame 02 in the rail. The
   photograph is too good to have a headline run through a person's skull, and the brief's own
   audit says 275 of 703 frames have usable text headroom — there is no shortage.
4. **Rebuild section 02 with photographs.** Two screens of cream body copy under an image-first
   hero is the exact failure the client rejected. Take sequence's four-frame treatment and its
   overlap handoff.
5. **Put a clip in the rail.** The strongest assets in the archive are the wide-hall loops and
   craft does not touch them. One of the four frames should be moving, with the save-data and
   reduced-motion path actually built rather than deferred.
6. **Give the rail scale.** 68 × 48 thumbnails are colour smudges. If the rail is the argument that
   this hero is about photographs, the photographs have to be legible in it.
7. **Replace the invented pillar copy.** "Find authentic study, resources and discussion that keep
   you learning" is not the client's sentence. Use their words, or let the pillars stand as names.
8. **Add an exit.** craft's hero simply ends and a cream page begins. frame proved a hero can
   resolve into what follows. Borrow it.
9. **Make the hero legible at rest.** Several of these designs are meaningfully better once the
   pointer moves. The at-rest state is the one every visitor sees first and the only one a touch
   user ever sees; it must be the finished composition, not the dimmed version of it.
