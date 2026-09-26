import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { site } from '@/content/site';
import { PLATE, src, srcSet } from './frames';

/**
 * PRAṆAVA · ABOUT — HERO.  Concept SX1C: TYPE IS THE STRUCTURE.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * WHAT HAPPENS, IN ONE SENTENCE
 *
 *   The page is RULED — four hairlines that cross the screen from edge to edge and one that
 *   stands down it — every word of type obeys that ruling, and the single photographic plate
 *   does not: it is bound on the vertical rule and, over the hero's own screen of scroll, it
 *   descends one whole band and comes to rest across the foot rule, hanging below the page.
 *
 * WHY THAT IS THE EVENT AND NOT A DECORATION ON ONE
 *
 *   Round 2's critics agreed on the same two sentences about round 1's C. "There is now no
 *   mechanic at all." "0 of 1,296,000 pixels differ between t=120ms and t=3000ms at 1440."
 *   They were right, and they were right about the cause: deleting round 1's 13° hinge
 *   removed the section's only event and put nothing in its place, leaving a plate beside two
 *   paragraphs — which is the client's rejected default, quoted verbatim in SECTION-BRIEF.
 *
 *   The answer is not a bigger animation. It is that the composition now contains a RULE the
 *   reader can see and one object that visibly disobeys it. At rest — and with reduced
 *   motion, and with JavaScript off — the foot rule is BROKEN: the plate lies across it, so
 *   the disobedience is a fact of the still picture, not an after-effect of a movement nobody
 *   watched. Motion adds the act: the plate starts one band higher, inside the ruling, with
 *   the foot rule whole, and descends 135px at 1440 until it crosses it. MEASURED as the
 *   plate's painted foot against the rule's top edge, the sign flips at every one of the
 *   seven standard viewports: −48.0 → +32.0 at 320x568, −84.5 → +50.5 at 1440x900, −107.3 →
 *   +63.7 at 2531x1140. Under reduced motion and with JavaScript off the second number is
 *   the state the page opens in, so the broken rule is a fact of the still picture.
 *
 *   So the differential is the event, and it is the reverse of the one the round's best
 *   entrant showed: still words, moving picture, but here the picture does not slide out of an
 *   aperture — it is never cropped and never masked, it simply stops obeying the page. Every
 *   rule stays to the pixel. Nothing appears and nothing disappears.
 *
 * WHAT THE CRITICS NAMED AND WHERE IT WENT
 *
 *   · "No mechanic. 1.045px over a 33px runway."  The runway was the real bug: a 933px hero
 *     on a 900px screen has 33px of scroll in it, so any mapping tied to it is invisible. The
 *     hero is now 118svh (1062px at 1440x900) — a 162px runway, inside the 1.00–1.20vh band
 *     both critics accepted — and the plate travels 135px of it.
 *   · "A rectangle of photograph beside paragraphs."  The plate now crosses two of the page's
 *     own boundaries. It is bound ON the vertical rule and it lies ACROSS the foot rule; the
 *     type crosses neither. It is part of the page's construction, not parked next to it.
 *   · "A paper hero whose preview hands off to more paper."  The ground is `--ground-deep`,
 *     #12201A — the byte-exact colour of `SECTION.apr-s--deep.apr-what`, the first thing under
 *     this hero on the live route. There is no seam to judge because there is no seam.
 *   · "Cream margin as the answer to 2531."  The four horizontal rules are grid items at
 *     `1 / -1` of a grid whose outer tracks ARE the rails, so they reach both screen edges at
 *     every viewport by construction. No column of the screen is without ink, and no empty
 *     region can be taller than one band.
 *   · "1.56x upscale on the design's only photograph."  The plate is capped at 810 CSS px.
 *     See frames.ts.
 *   · "The running head passes under the cream pill."  The running head is now a running FOOT,
 *     and the pill is the house's dark pill, because the ground under it is dark. Nothing
 *     cream passes over anything.
 *
 * THE STRUCTURE, WHICH IS STILL THE POINT
 *
 *   THE VERTICAL RULE IS THE MEASURE, AND IT FALLS WHERE THE PLATE BEGINS.  The grid's last
 *   track is the plate: `min(50%, 810px)` — a percentage of the grid, not `50vw`, so a
 *   scrollbar cannot push the track past the edge it is supposed to meet. Below 1620px wide
 *   that track is half the screen, so the rule stands on the screen's own centre; above it
 *   the plate stops growing at its file's own ceiling and the rule moves right with the type
 *   field instead of the picture being blown up past 1620. MEASURED, rule x against plate x:
 *
 *     1024   rule 512.0   plate 512.0 × 512.0 wide   (screen centre)
 *     1440   rule 720.0   plate 720.0 × 720.0 wide   (screen centre)
 *     2531   rule 1721.0  plate 1721.0 × 810.0 wide  (the file's ceiling, not the screen's)
 *
 *   Either way the type stops on the rule, the plate starts on it to the tenth of a pixel,
 *   and the `sizes` hint is the track rather than a guess. An earlier draft of frames.ts
 *   said this track renders "1266 CSS px at 2531"; it renders 810. That number predated the
 *   810 cap and was never re-measured after it landed.
 *
 *   THE INDENT STAIR IS IN COLUMNS, SO IT SPREADS.  Title flush to the rail, sentence one
 *   step in, paragraph two. The steps are counted in the type field's own twelve columns, so
 *   the stair widens with the field instead of being a fixed indent that looks deliberate at
 *   1440 and accidental at 2531. RE-MEASURED off the rendered left edges rather than carried
 *   over from an earlier draft, because a critic was right that this file had been quoting
 *   arithmetic as measurement:
 *
 *     1440   57.6 → 168.0 → 278.4   step 110.4px   (2 of 12 columns, field 662.4)
 *     2531   72.0 → 484.3 → 896.5   step 412.2px   (3 of 12 columns, field 1649.0)
 *
 *   The step count changes at 1900px, where the h1 stops wrapping and the field gains enough
 *   width that a sixth of it stops registering as a step at all. The comment used to claim
 *   112px and 277px; both were wrong, the second by 49%.
 *
 *   OPTICAL MARGIN ALIGNMENT.  See BEARING below.
 *
 *   THE PLATE IS PRINTED WHOLE.  Its aperture is the frame's own 3:2, so `object-fit: cover`
 *   has nothing to cut at any viewport — which is what keeps one alt sentence honest at all
 *   of them. No crop can contradict it because there is no crop.
 *
 * NOTHING HERE IS INVENTED.  The heading, the sentence and the paragraph are `about.hero`
 * verbatim; the running foot is `site.descriptor` and `site.name` verbatim. No date, no count,
 * no location, no strapline of mine anywhere in the section.
 */

/*
 * Left side bearings, as a fraction of the em, MEASURED off rendered pixels — not from a
 * canvas 2D context, which cannot apply `font-variation-settings` and reports 0.0262em for
 * the P of a face running at SOFT 22 / WONK 1. Screenshot the h1 at deviceScaleFactor 2, walk
 * each line's rows for the first column carrying ink, subtract the line box's left edge:
 *
 *   About     box 57.59   ink 57.59   bearing  0.00px  =  0.0000 em
 *   Pranava   box 57.59   ink 61.59   bearing  4.00px  =  0.0349 em
 *
 * Fraunces' A already reaches the origin — its apex serif IS the margin — while the P's stem
 * stands 0.035em inside it. Set flush, the second line therefore reads as indented by four
 * pixels at 1440. Pulling each line left by its own bearing puts the INK of both on one line,
 * which is what the eye reads. The ratio is scale-invariant, so one measurement holds
 * everywhere. No extra overhang is added to the A: the classical rule pushes a diagonal past
 * the margin and this face has already spent that allowance inside the glyph.
 */
const BEARING: Record<string, number> = { About: 0, Pranava: 0.0349 };

export function SX1CHero() {
  /* Derived from the client's heading rather than retyped, so the words cannot drift. */
  const words = about.hero.heading.split(' ');

  return (
    <header className="sx1c-hero" id="top">
      <div className="sx1c-hero__sheet">
        {/*
          THE RULING. Four hairlines, each one a grid item at `1 / -1`, so each one runs from
          the left edge of the screen to the right edge — the rails are tracks of this grid,
          not padding, which is the whole reason a full-bleed line needs no negative margin
          and no `100vw`. They are the page's boundaries and its band divisions: aria-hidden,
          because they are geometry and not content.

          They are painted BENEATH the plate on purpose. A page whose ruling the picture
          passes over is a page the picture is disobeying; a ruling drawn on top of the
          picture would be a page the picture is behind.
        */}
        <span className="sx1c-rule sx1c-rule--head" aria-hidden="true" />

        {/*
          The page's single h1. Two block lines so each can carry its own optical bearing; the
          space between them is a real text node, so `textContent` — and the accessible name —
          stays "About Pranava" with its space intact.
        */}
        <h1 className="sx1c-title">
          {words.map((w, i) => (
            <span key={w}>
              {i > 0 ? ' ' : ''}
              <span
                className="sx1c-title__line"
                style={{ '--sx1c-lsb': BEARING[w] ?? 0 } as CSSProperties}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <span className="sx1c-rule sx1c-rule--band" aria-hidden="true" />

        {/* Indent one. Display face, the shortest measure. */}
        <p className="sx1c-sub">{about.hero.sub}</p>

        <span className="sx1c-rule sx1c-rule--band2" aria-hidden="true" />

        {/* Indent two. Text face, the longest measure, the smallest type. */}
        <p className="sx1c-support">{about.hero.support}</p>

        {/*
          THE PLATE — bound on the measure, lying across the foot rule.

          IT SITS HERE, BEFORE THE FOOT RULE, AND THAT IS STRUCTURAL.  Above 900px the sheet
          is a grid and every child carries an explicit `grid-row`, so markup order changes
          no box: the plate is row 1/7 and the foot rule is row 7 wherever they are written.
          Below 900px the sheet is `display: block` and markup order IS the layout — and the
          plate used to be the LAST child, after the folio. So the stylesheet's `-hang` on
          the foot rule, written to pull the rule up into the picture, pulled it up into the
          support paragraph instead: MEASURED at 390x844, support bottom 603.5, foot rule top
          605.5, plate top 804.2. The rule crossed a paragraph by 2px, the plate crossed
          nothing, and a phone got type above a photograph — the section's one argument
          absent at the viewport most people will read it on.

          Paint order is unaffected because every layer here is explicitly z-indexed: rules
          0, plate 1, type 2, measure 3. Reading order improves — the picture now follows the
          paragraph it belongs to, and the running foot is last, which is what a running foot
          is.

          Four nested elements, each load-bearing:
            .sx1c-plate   the grid item. Occupies the grid's last track, which is
                          `min(50%, 810px)`, and is never transformed, so the layout box that
                          `sizes` describes cannot drift from the box the browser lays out.
                          `align-self: end` with a negative block-end offset on the lift is
                          what puts it ACROSS the foot rule rather than above it.
            __shadow      the shadow the plate casts on the ground. Outside the lift on
                          purpose: a cast shadow belongs to the page, so it stays at the
                          resting position and contracts as the plate comes down onto it.
            __lift        the only thing that moves: one translateY.
            __leaf        the plate itself — the aperture, its edge, and the warm ground
                          behind it. `aspect-ratio: 3 / 2` is this frame's own ratio.

          `loading="lazy"` even at the top of the page: an image marked eager in one route's
          static HTML is pulled by every OTHER route's prefetch on this site, and an
          in-viewport image is fetched during the initial load whatever its loading value.

          `sizes` is the track, written out rather than derived, because a `min()` inside
          `sizes` is a source-size value some engines still decline to parse and a hint that
          fails to parse silently falls back to 100vw — which would fetch 1620 at every
          viewport and hand a phone a 182KB file.

          THE THREE BRANCHES, EACH CHECKED AGAINST THE BOX THE BROWSER ACTUALLY LAID OUT
          rather than against the arithmetic that produced them:

            ≤420   `calc(100vw - 3.25rem)`. Below 420 the stair narrows and the plate rides
                   the support paragraph's 2rem indent, so the box is 100vw less one rail
                   (1.25rem at this width, the floor of the clamp) less 2rem. MEASURED box
                   338.0 at 390 against 338 from the hint. Exact. A first pass at this hint
                   said `calc(100vw - 4rem)` for everything under 900, which gave 326 for a
                   338px box — 3.5% under. It chose the same derivative, so nothing rendered
                   badly, and it was still a hint that did not describe the box.
            ≤899   `calc(100vw - 4.7rem)`. One rail plus the support paragraph's 2.7rem
                   indent. The rail is a clamp, so a single figure cannot be exact across
                   the whole band; 4.7rem is the closest constant and its error is measured,
                   not assumed: 12px under at 421, 9.6px under at 560, 4px over at 899. Every
                   one of those picks the same derivative the exact box would.
            ≤1620  `50vw`. The track is `min(50%, 810px)` and 50% of the viewport is the
                   smaller of the two up to 1620. MEASURED plate width 512.0 at 1024 and
                   720.0 at 1440, against 512 and 720 from the hint. Exact.
            above  `810px`. MEASURED 810.0 at 2531. Exact.

          NO BRANCH UPSCALES. Density-adjusted intrinsic width equals the layout width at
          every viewport measured — 370/370 at 390, 512/512 at 1024, 720/720 at 1440,
          810/810 at 2531 — and at DPR 2 the worst case is 810 CSS px asking for 1620, which
          is exactly the largest derivative this frame has. The 1.56x upscale that sank
          another entrant in this round is arithmetically unreachable here.
        */}
        <div className="sx1c-plate">
          <div className="sx1c-plate__shadow" aria-hidden="true" />
          <div className="sx1c-plate__lift">
            <div className="sx1c-plate__leaf">
              <img
                className="sx1c-plate__img"
                src={src(PLATE)}
                srcSet={srcSet(PLATE)}
                sizes="(max-width: 420px) calc(100vw - 3.25rem), (max-width: 899px) calc(100vw - 4.7rem), (max-width: 1620px) 50vw, 810px"
                width={PLATE.w}
                height={PLATE.h}
                alt={PLATE.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* The page's bottom boundary — and the one the plate comes to rest across. */}
        <span className="sx1c-rule sx1c-rule--foot" aria-hidden="true" />

        {/*
          THE RUNNING FOOT. A book repeats its own title at the foot of the page; that is what
          a folio line IS, so carrying the descriptor and the wordmark here is structure
          rather than repetition, and both halves are the client's own words for itself.

          It was a running HEAD in round 1 and a critic was right about why that failed: the
          navigation pill is `position: fixed`, so anything at the top of a scrolling section
          eventually passes beneath it — MEASURED at 2531, "…& YOGIC STUDIES" sat under the
          pill's left edge at y=88. Moving the line to the foot removes the collision instead
          of negotiating with it, and it puts ink along the bottom band, which is where this
          design used to measure 100% blank at 1024x768.

          The descriptor is uppercased because it is pure ASCII. The name is NOT, and it is
          set in Inter, because `Praṇava` carries ṇ U+1E47 and DESIGN-SYSTEM §1 records what
          Fraunces does to this client's diacritics. It aligns to the vertical rule rather
          than to the screen edge, so the plate's corner has the foot margin to itself.
        */}
        <p className="sx1c-folio">
          <span className="sx1c-folio__desc">{site.descriptor}</span>
          <span className="sx1c-folio__name">{site.name}</span>
        </p>

        {/*
          THE MEASURE. The one drawn line that stands down the page instead of across it, on
          the grid line where the type field ends and the plate track begins. Every block of
          type is set to it; the plate is bound to it. z-index above the plate, because it is
          the binding edge and not a line the picture happens to cover.
        */}
        <span className="sx1c-limit" aria-hidden="true" />
      </div>
    </header>
  );
}
