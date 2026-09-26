import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATES, TRANSMISSION, narrow, sizes, src, srcSet, wide } from './frames';

/**
 * PRAṆAVA · §03 OUR APPROACH — concept A. PHOTOGRAPHY LEADS.
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │ THE EVENT                                                                           │
 * │                                                                                     │
 * │ Three photographs stand on one drawn line and step up in size until the third        │
 * │ crosses the page margin and runs off the edge of the paper — and then the paper      │
 * │ ends, and the fourth frame, larger than all three and on dark ground, is the only    │
 * │ one that moves.                                                                     │
 * └─────────────────────────────────────────────────────────────────────────────────────┘
 *
 * THE CONTENT'S OWN ASYMMETRY IS THE BRIEF. The lead names three things and the list has
 * four. Tradition, Practice and Inquiry are ideas that can be handed to a reader;
 * Transmission is not an idea at all, and the client's sentence says why — "not simply
 * information that can be packaged and delivered. It has traditionally moved through
 * teacher, student, practice and lived experience." A still photograph can show a state.
 * It cannot show a passage. So the three are stills and the fourth is a clip: the one term
 * whose MEDIUM differs from the other three, which is the asymmetry made visible instead
 * of described. Three of a kind and one that is not — never four of anything.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════
 * WHAT THE FIRST BUILD GOT WRONG, AND WHERE EACH FIX IS
 *
 * 1. IT COST FIVE SCREENS. 4,465px at 1440 for ~136 words, because each of the three
 *    plates was given a full screen of its own and the triad therefore never existed as a
 *    triad: you could not see two of them at once, so a ramp of three sizes was something
 *    the reader had to remember rather than something they could see. The three plates now
 *    stand SIDE BY SIDE on one floor line — adjacency is the only way a size ramp is
 *    legible — and the section measures 2,223px at 1440: 2.47 screens, 16.3px of scroll
 *    per word, against 4.96 screens and 32.8px/word before. Half the scroll, the same four
 *    photographs, and reduced motion and JavaScript-off measure 2,223px too.
 *
 * 2. THE ESCALATION DID NOT REACH ITS STATED END. The claim was "growing until the page has
 *    no margin left"; the widest plate reached 44% of the viewport at 1440 and left 806px
 *    of margin, and at 390 plates 3 and 4 were both exactly 390px, so the ladder flatlined
 *    on the majority viewport. Now the run is laid from the drawn margin rightwards and the
 *    third plate runs off the GLASS at every width from 900 to 1600 — measured 40px past
 *    the edge at 900, 64px at 1440, 71px at 1600 — and past the drawn rule by 361px at
 *    2531, where an upright plate cannot reach the edge without outgrowing the screen. At
 *    390 the ramp is 46 / 66 / 88vw and the fourth is the only full-bleed frame: 390×519
 *    against plate 3's 343×458, so the ladder steps at every rung on a phone too.
 *
 * 3. THE CAPTION NARRATED THE DESIGN. "The ochre wall this section opens on" says nothing
 *    about yoga, the people or the teaching — it explains the layout, which is the
 *    portfolio device this brief names. It is now about the photograph, and every clause is
 *    checkable against the poster.
 *
 * 4. TWO OF THE THREE STILLS WERE NEAR-DUPLICATES — same pose, same room, same wall, and
 *    the two alt texts collided. Tradition is a new frame, and the three plates are now
 *    three orientations of a body: standing, inverted, folded.
 *
 * 6. THE INQUIRY FRAME WAS DESCRIBED FROM THE ARCHIVE NOTE AND NOT FROM THE PIXELS. Its
 *    alt called the white object "a long measuring stick" and the relay argument above
 *    was built on it. Enlarged off the 1920 derivative it is flat webbing with a metal
 *    slide buckle — a yoga belt. Both are corrected, and the correction is recorded in
 *    frames.ts rather than quietly swapped, because an invented fact about a photograph
 *    is still an invented fact.
 *
 * 5. `sizes` WAS WRITTEN AGAINST THE LAYOUT BOX AND IGNORED THE TRANSFORM. Fixed at the
 *    root in frames.ts: one number for the layout width, and `sizes` derived from it.
 * ══════════════════════════════════════════════════════════════════════════════════════
 *
 * THREE RESEARCHED TECHNIQUES, NAMED, AND WHERE EACH ONE IS:
 *
 *  1. PHOTOBOOK PACING. "You control reading speed with size and density." A run of plates
 *     on one line is read FAST — the eye crosses three frames in one movement — and that is
 *     the point: the three are a single gathering breath, and the fourth movement, which
 *     changes ground, medium and size at once, is the only place the page slows down.
 *
 *  2. THE WALKER EVANS LINK — adjacent plates joined by a graphical element sitting in the
 *     same place in each frame. Implemented three ways: all four are upright 3 : 4 frames of
 *     the same room (ochre wall, arched window, blue tie-dyed curtain), all three stills
 *     stand on one drawn floor line, and the section opens and closes on the same four
 *     walls.
 *
 *  3. BARTHES' ANCHORAGE vs RELAY. Anchorage is text telling you what to see in a picture.
 *     Relay is text and image each carrying what the other cannot. Every frame here is
 *     relay: an inherited shape held by more people than the frame can hold (Tradition never
 *     says "more than one person"); a line of bodies repeating into depth (Practice says
 *     "time", and this is what time looks like); a BELT round a foot and a BLOCK under it
 *     (Inquiry never mentions a prop — the picture supplies the shape being questioned
 *     rather than performed); hands taking another person's weight (Transmission never
 *     says "touch").
 *
 * THE STATIC LAYER CARRIES THE MECHANIC. Under `prefers-reduced-motion`, and with
 * JavaScript off entirely, the section is still three plates standing on a drawn line at
 * three sizes, the third crossing the page margin and leaving the paper, the ground turning
 * from paper to dark, and a fourth frame larger than all three. The clip is a layer on top
 * for readers who accept motion, never the idea.
 *
 * EVERY SENTENCE IS THE CLIENT'S, VERBATIM. The lead is split at its OWN full stops with a
 * lookbehind, so the three spans concatenate back to the sentence character for character.
 * Nothing is retyped, nothing is paraphrased, and no fact — no count, date, name, fee or
 * duration — appears that the client has not supplied.
 *
 * A server component: every word and every photograph is in the static HTML.
 */

export function Approach() {
  const lead = about.approach.lead.split(/(?<=\.)\s+/);
  const [tradition, practice, inquiry, transmission] = about.approach.items;

  /* The four terms are a fixed, delivered list in content/pranava.ts. This guard exists
     only so the section is typed against the array rather than against an assertion: if
     the client's list ever shrinks, the section disappears rather than rendering an empty
     plate or a placeholder — which is this project's content law. */
  if (!tradition || !practice || !inquiry || !transmission) return null;

  /* Term and frame zipped once, by literal index, so nothing downstream indexes an array
     with a loop variable and then has to be told the result exists. */
  const three = [
    { item: tradition, frame: PLATES[0] },
    { item: practice, frame: PLATES[1] },
    { item: inquiry, frame: PLATES[2] },
  ];

  return (
    <section className="sx3a-sec" id="sx3a-approach" aria-labelledby="sx3a-mark">
      {/* ── MOVEMENTS 0–3 · paper ───────────────────────────────────────────────── */}
      <div className="sx3a-paper">
        {/* The drawn page margin: two hairlines standing at the rail, spanning every
            paper movement, so that "the third plate crosses the margin" is something a
            reader SEES rather than something this file asserts. They stop where the paper
            does, which is why the dark stage is a sibling and not a child. */}
        <div className="sx3a-margin" aria-hidden="true" />

        {/* The register mark is an <h2> because it is the only thing in the section that
            IS a section title. The four terms sit under it at h3; marking the client's
            prose as headings would put his sentences into the outline. */}
        <h2 className="sx3a-eyebrow" id="sx3a-mark" data-sx="fade">
          <span className="sx3a-eyebrow__n">03</span>
          <span className="sx3a-eyebrow__rule" aria-hidden="true" />
          Our approach
        </h2>

        {/* THE RUN. One line, three plates, bottoms on it, each larger than the last.
            The lead sits in the air the two short plates leave above them — the void is
            part of the composition rather than a gap in it, which is also what keeps the
            section to one screen of paper. */}
        <div className="sx3a-band">
          <div className="sx3a-lead">
            {lead.map((sentence, i) => (
              <p
                key={sentence}
                data-sx="up"
                style={{ '--sx3a-d': `${i * 110}ms` } as CSSProperties}
              >
                {sentence}
              </p>
            ))}
          </div>

          {three.map(({ item, frame }, i) => (
            /* Labelled by its term's heading, which lives further down the document in
               the plate list. The picture and the paragraph are in separate rows of a
               spread, so the binding is stated rather than left to proximity. */
            <figure
              key={item.name}
              className={`sx3a-frame sx3a-frame--${i + 1}`}
              aria-labelledby={`sx3a-n${i + 1}`}
              data-sx="up"
              style={
                {
                  '--w': wide(frame),
                  '--wn': narrow(frame),
                  '--z': frame.z,
                  '--zo': frame.zo,
                  '--sx3a-d': `${i * 90}ms`,
                } as CSSProperties
              }
            >
              <img
                src={src(frame)}
                srcSet={srcSet(frame)}
                sizes={sizes(frame)}
                alt={frame.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>

        {/* The plate list, below the line the plates stand on. */}
        <div className="sx3a-terms">
          {three.map(({ item }, i) => (
            <div
              className={`sx3a-said sx3a-said--${i + 1}`}
              key={item.name}
              data-sx="up"
              style={{ '--sx3a-d': `${i * 90}ms` } as CSSProperties}
            >
              <h3 className="sx3a-name" id={`sx3a-n${i + 1}`}>
                {item.name}
              </h3>
              <p className="sx3a-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOVEMENT 4 · the paper ends here ────────────────────────────────────── */}
      <div className="sx3a-dark">
        <div className="sx3a-move-stage">
          <div className="sx3a-move-said" data-sx="up">
            {/* The largest word in the section, because it is the one term the lead does
                not name. The three above it share a single size: the client gives them
                equal billing and this does too. */}
            <h3 className="sx3a-huge">{transmission.name}</h3>
            <p className="sx3a-body">{transmission.body}</p>
          </div>

          <figure
            className="sx3a-move"
            data-clip={TRANSMISSION.src}
            style={
              {
                '--op': TRANSMISSION.pos,
                '--op-n': TRANSMISSION.posNarrow ?? TRANSMISSION.pos,
                '--z': TRANSMISSION.z,
                '--zo': TRANSMISSION.zo,
              } as CSSProperties
            }
          >
            {/*
              The <img> beneath IS the poster. The <video> carries NO `poster` attribute —
              a poster is fetched even when `src` is never set, and three of them cost this
              site 948 KB on every device once already. `preload="none"` and no `src` in the
              markup mean nothing is fetched until Sx3aMotion attaches it on approach; it is
              released again a screen past, and never attached at all under reduced motion,
              under reduced data, with Data Saver on, or with JavaScript off. The still is a
              complete answer in all of those cases, and it carries the alt text because the
              video is decorative duplication of it.

              AVIF first: 30 KB against 144 KB for the same frame, and the JPEG stays as the
              fallback leg rather than as the only one.
            */}
            <div className="sx3a-move__frame">
              <picture>
                <source srcSet={TRANSMISSION.stillAvif} type="image/avif" />
                <img
                  className="sx3a-move__still"
                  src={TRANSMISSION.stillJpg}
                  alt={TRANSMISSION.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <video
                className="sx3a-move__vid"
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
            {/* Flush to the frame it names — a caption that floats hundreds of pixels from
                its picture is not a caption, it is a stray line. And it describes what is
                IN the frame, never the layout around it. */}
            <figcaption className="sx3a-cap">{TRANSMISSION.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
