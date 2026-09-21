# The mechanics already in the building

Reference for anyone designing a new Praṇava section. These are the moves that shipped, with
what each one is *for*. The point is not to copy them — it is to see the shape of an
acceptable answer, and to avoid re-inventing something the site already does.

**The test a section has to pass:** describe it as something that *happens*. If the only
honest description is "a photograph on the left and three paragraphs on the right", it is not
designed yet. Every section on the finished pages can be described in one sentence as an
event.

---

## Already used — do not repeat these verbatim on a new page

| Mechanic | Where | What it is for |
|---|---|---|
| Type set **inside** a moving picture, on a scrim shaped to the light in that frame | Home hero | The picture is the page, not an illustration of it |
| One wide moving frame → **four narrow stills**, type moved from on the picture to beside it | Home 02 | The inverse of the hero, as a handoff. The overlap is the point |
| A photograph clipped **into the letterforms** of one word | Home 03 | The sentence is made of the thing it describes |
| Four **mounted plates dealt** left to right, each over the last, the fourth still whole | Home 04 | Four equal things that are not a grid of four boxes |
| Two voices from **one typeface** — light and wide against heavy italic | Home 05 | A refusal and an answer, argued typographically |
| A display line whose **baseline is the horizon** of the photograph beneath it | Home 06 | The sentence walks down into the crowd it describes |
| A quotation whose **marks close in** as the sentence lands; no author | Home 07 | A saying being adopted, not a testimonial |
| Tall **arches** with silent loops inside, list items as chips **straddling the aperture edge** | Within | Every claim pinned to the picture that proves it |
| Eight **arched doorways** at four sizes, tilted, overlapping, two bleeding off-edge | Contact | Eight subjects that are emphatically not a list |
| An invitation addressed to one person, then **three doors of unequal size** | Join | Hierarchy made spatial |

## Explored, rejected, still good

From the concept rounds at `/preview/`. Not used, so available — and each already solved a
problem a new page has.

| Idea | Was for | Might serve |
|---|---|---|
| **The mandala dial** — one disc, four quadrants, the lit quarter and a clay arc turning as you scroll | Within's four pillars | Any page with exactly four equal things around one centre. About §7's four doors. Genuinely tied to the name |
| **Four rooms** — each section a sticky place that rises over the last while it is held still | Within | A page that should feel like moving through somewhere, not scrolling past it |
| **Plates that scatter and pack** — items arrive spread across the hall and close shoulder to shoulder | Within Connect | Anything where the *start state* and *end state* mean something (isolation → community; scattered study → structure) |
| **A paper board standing in front of the class**, occluding it | Within Learn | A list that must not become a list — the board is in the room |
| **Placards on wires at different depths** | Within Collaborate | Many short items that need to not be a grid |
| **Steps walking across the floor toward a doorway** | Within Share | A sequence with a destination |
| **One picture cut into four**, horizons refusing to align | About 05 | Four facets of one thing |
| **An enlargement you cannot place, then the pile it came from** | About 03 | Revealing context after detail |
| Words **scaled so all four fill one measure** | About 04 | Four words of different lengths given equal weight |

---

## The rules that are not negotiable

These come from measurements, not taste. Each was learned by shipping something that failed.

1. **Contrast is measured on rendered pixels, not CSS values.** `node tools/contrast-probe.mjs
   <url> --width W --height H --scroll-to <selector>`. Without `--scroll-to` it only samples
   the fold, which means most of a long page goes unchecked.
2. **Image-filled type needs `tools/check-image-text.mjs`** — the ordinary probe cannot model
   it and reports a phantom failure. And it only works in a face heavy enough to hold a
   picture: Fraunces at wght 700 / SOFT 100. A fine-stroked face turns the photograph to mud.
3. **On a dark ground a filled glyph must be lighter than ~98/255** to clear 3:1 — which *is*
   the washed-out look. On paper it must be darker than ~140/255, and darkening deepens colour
   where whitening flattens it. Choose the ground accordingly.
4. **Scroll-driven is welcome; scroll-jacked is not.** One passive listener, one rAF. Never
   `preventDefault` on wheel or touch.
5. **`prefers-reduced-motion` must yield a complete, static, usable page.** No content
   reachable only through motion.
6. **Video:** `muted`, `playsinline`, `loop`, attached on approach and released when well
   past. **Never a `poster` attribute when a visible `<img>` sits beneath it** — the poster is
   fetched even when `src` is never set. That cost 948 KB once already.
7. **No horizontal overflow, 320 → 2560.** And centre things on their *words*: a block centred
   including its punctuation leaves the text visibly off-axis.
8. **A capped-width container must also be centred.** `max-width` without `margin-inline: auto`
   is invisible at 1440 and 462px wrong at 2531. This shipped once.
9. **Exactly one `<h1>`.** Real `alt` on every image. Visible focus on everything interactive.
10. **No invented facts.** No member counts, dates, fees, durations, testimonials or faculty
    names. `null` renders as nothing, never as a placeholder.
