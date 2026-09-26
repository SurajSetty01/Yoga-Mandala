import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { LIVE, ROOM, src, srcSet } from './frames';

/**
 * §03 · OUR APPROACH.
 *
 * THE SHEET IS CUT. Tradition, Practice and Inquiry are printed as one body of text under
 * one photograph of the room, on paper, on a sheet that runs off the right edge of the page
 * because it is bigger than the page. Then the paper stops: a brass rule crosses the whole
 * width, the ground past it is the deep one, and the fourth term stands over there — with
 * the one photograph in the section that crosses the cut to get there, and the only one that
 * moves.
 *
 * That is the argument the copy makes and nothing else in the section makes it. The client's
 * lead names three things — rooted, alive, open — and Transmission is not in that sentence.
 * So the three are not three of anything: they are one paragraph with three run-in heads,
 * the way a recital is set, and the fourth is the only term whose name is lifted out of the
 * prose onto a line of its own, on a different ground, beside a picture that is moving.
 *
 * WHAT THIS REPLACES, AND WHY NOTHING OF IT IS TUNED RATHER THAN REMOVED.
 * Round one was four photographs stacked face-up and drawn off by a travelling edge. Both
 * critics measured it last of four, and between them: three of the four headings painted no
 * glyph pixels at their own scroll position at 390 and "Transmission" measured 1.10:1 there
 * while the probe reported a pass; the sheet covered 100% of all four body paragraphs at
 * some scroll position on a phone; 23-35% of the document's height existed only to run the
 * animation, and with `prefers-reduced-motion` on, the idea was gone. A mechanic whose
 * failure mode is "the argument is behind the picture" cannot be fixed by moving the
 * picture. IT IS GONE. There is no stack, no wipe, no peel, no clip-path, no pinning, no
 * scroll listener and no rAF in this section at all — the scroll cost is now the height of
 * the content and nothing else, and every word is in normal flow at every viewport.
 *
 * WHAT SURVIVES, BECAUSE A CRITIC NAMED IT. The chapter-label chip pinned inside the frame
 * on its own solid ground (15.79:1, never a scrim over a photograph) is kept — but it has
 * moved to the picture it can actually caption. There is exactly ONE chip now, it is inside
 * the only frame that serves the three terms, it names those three terms, and it is static
 * inside a static frame, so the desync a critic caught at 1440 (a chip reading INQUIRY on
 * the Transmission photograph) is not a bug that was fixed — it has no way to occur.
 *
 * Every sentence is `content/pranava.ts` verbatim. The lead is split on its OWN full stops
 * with a lookbehind, so the three clauses concatenate back to the client's sentence
 * character for character.
 */
export function Sx3bApproach() {
  const clauses = about.approach.lead.split(/(?<=\.)\s+/);
  const [tradition, practice, inquiry, transmission] = about.approach.items;
  const triad = [tradition, practice, inquiry];

  return (
    <section className="sx3b" id="sx3b-approach">
      {/* ── this side of the cut ─────────────────────────────────────────── */}
      <div className="sx3b-paper">
        <div className="sx3b-rail sx3b-head" data-rv="">
          <h2 className="sx3b-eyebrow">
            <span className="sx3b-eyebrow__n">03</span>
            <span className="sx3b-eyebrow__rule" aria-hidden="true" />
            Our approach
          </h2>

          <p className="sx3b-lead">
            {clauses.map((c) => (
              <span className="sx3b-lead__c" key={c}>
                {c}
              </span>
            ))}
          </p>
        </div>

        {/* The sheet: the page's left margin, then the text column, then a photograph that
            runs off the right edge. One picture for three terms — they are three
            descriptions of one activity, and this frame holds three people in one shape. */}
        <div className="sx3b-plate">
          <figure className="sx3b-room" data-rv="">
            <div className="sx3b-frame sx3b-frame--room">
              <img
                src={src(ROOM)}
                srcSet={srcSet(ROOM)}
                sizes={ROOM.sizes}
                alt={ROOM.alt}
                loading="lazy"
                decoding="async"
                style={{ '--op': ROOM.pos } as CSSProperties}
              />
              {/* The chip. It stands on a solid --ground-deep, never on the photograph, and
                  it names the three terms this one frame serves. Decorative — each term
                  carries its own <h3> — so it is out of the accessibility tree. */}
              <p className="sx3b-chip" aria-hidden="true">
                {triad.map((t) => t.name).join(' · ')}
              </p>
            </div>
            <figcaption className="sx3b-cap">{ROOM.cap}</figcaption>
          </figure>

          {/* The recital. Three run-in heads in one body of text: the names are IN the
              prose, not on top of three objects. All three sit in one viewport at every
              width, which is the only way the triad exists as a triad. */}
          <div className="sx3b-recital">
            {triad.map((t) => (
              <div className="sx3b-t" key={t.name} data-rv="">
                <h3 className="sx3b-t__n">{t.name}</h3>
                <p className="sx3b-t__b">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── the cut ──────────────────────────────────────────────────────── */}
      <div className="sx3b-cut" data-rv="cut" aria-hidden="true" />

      {/* ── the other side ───────────────────────────────────────────────── */}
      <div className="sx3b-deep">
        <div className="sx3b-rail sx3b-fourth">
          <figure className="sx3b-live" data-rv="">
            <div className="sx3b-frame sx3b-frame--live">
              {/* the clip's own poster frame, as an ordinary image: 25 KB of AVIF where the
                  browser takes it. The <video> carries NO poster attribute. */}
              <picture>
                <source srcSet={`/media/posters/${LIVE.id}.avif`} type="image/avif" />
                <img
                  src={`/media/posters/${LIVE.id}.jpg`}
                  alt={LIVE.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ '--op': LIVE.pos } as CSSProperties}
                />
              </picture>
              <video
                className="sx3b-video"
                data-src={`/media/clips/${LIVE.id}.mp4`}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                style={{ '--op': LIVE.pos } as CSSProperties}
              />
            </div>
            <figcaption className="sx3b-cap sx3b-cap--dark">{LIVE.cap}</figcaption>
          </figure>

          <div className="sx3b-four" data-rv="">
            <h3 className="sx3b-four__n">{transmission.name}</h3>
            <p className="sx3b-four__b">{transmission.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
