import { about } from '@/content/copy';

/**
 * 03 — WHY WE BEGAN.   One word is the window.
 *
 * The idea is the client's: a photograph seen only through the letterforms. The concept it
 * comes from filled the WHOLE SENTENCE, and that is why it failed — at sentence length every
 * glyph is 100px tall and 12px thick, so the picture inside it is noise. Here exactly ONE
 * word carries the image, and the word is `vast`, so the meaning of the picture and the
 * meaning of the word are the same thing: a room with more people in it than any one teacher
 * could know. The rest of the sentence sits around it at reading scale.
 *
 * THE FACE. Fraunces CAN do this — it was tested against a heavy expanded grotesque
 * (Archivo `wght 900 / wdth 125`) loaded through next/font, rendered at the same measure, and
 * measured, not eyeballed. Because Fraunces is the narrower face it has to be set LARGER to
 * fill the same width, so its capitals come out 382px tall against Archivo's 267px, its
 * strokes are just as thick in absolute terms, and it therefore shows ~43% MORE photograph
 * per letter. The grotesque was dropped: it cost a second display family and a font download
 * to make the picture smaller. What Fraunces needs is the weight and the SOFT axis pushed
 * hard — `wght 700`, `SOFT 100`, `opsz 144` pinned — which is what the block in about.css
 * does. The page stays Fraunces and Inter throughout. Numbers in NOTES.md.
 *
 * CONTRAST BY CONSTRUCTION. The glyph fill is a cream floor UNDER the photograph, so the
 * darkest pixel a letter can ever contain is `0.44 x #FBF7F2 = #6E6B69`, which measures
 * 3.35:1 against `--ground-deep` — the bar for display type is 3.0:1. The image therefore
 * runs at the highest opacity the ground allows (0.56) rather than being dimmed to be safe,
 * and the figure holds for any frame in the archive at any crop and any viewport. Measured
 * against the real render as well: see NOTES.md.
 *
 * Nothing here is retyped. The paragraph is one string from copy.ts, sliced at its own
 * sentence boundary and again either side of its own word; the three spans concatenate back
 * to the client's sentence exactly, in order, with their spaces intact.
 */

const [definition, premise, becoming] = about.opening;

/* the paragraph's own sentence boundary */
const dot = premise.indexOf('. ') + 1;
const claim = premise.slice(0, dot);
const belief = premise.slice(dot).trimStart();

/* the claim's own word, located rather than retyped */
const at = claim.indexOf('vast');
const head = claim.slice(0, at);
const word = claim.slice(at, at + 4);
const tail = claim.slice(at + 4);

export function Premise() {
  return (
    <section className="ab-sec ab-sec--deep ab-prem" aria-labelledby="ab-prem-h">
      <div className="ab-rail">
        <h2 className="ab-eyebrow ab-eyebrow--dark" id="ab-prem-h">
          <i className="ab-eyebrow__rule" aria-hidden="true" />
          <span className="ab-eyebrow__n">03</span>
          Why we began
        </h2>

        {/* the definition. A dictionary entry, set like one, so the claim below can shout. */}
        <p className="ab-prem__def" data-r="up">
          {definition}
        </p>

      </div>

      {/*
        The claim runs RAIL TO RAIL rather than inside the 92rem measure, exactly as the
        approved section 02's row of four frames does: a word whose whole point is that it
        does not fit must keep growing with the screen, or it strands itself in the middle of
        a 2560 display. Only running text is capped.
      */}
      <div className="ab-wide">
        <p className="ab-prem__claim">
          <span className="ab-prem__head" data-r="up">
            {head}
          </span>
          {/*
            The window. `text-transform: uppercase` is a typographic setting, not an edit —
            the DOM text stays the client's lowercase `vast`, so assistive technology and
            npm run check:copy both read the sentence as written.
          */}
          {/*
            The word stands on a real paper plate, not a pseudo-element. A z-index:-1
            pseudo-element falls behind the SECTION's own dark background and never paints
            at all — so the plate has to be an element in flow that the word sits inside.
            It matters because the arrangement is inverted here: against the dark ground a
            glyph pixel had to be lighter than ~98/255 to clear 3:1, which is exactly the
            washed-out look; against paper it must be darker than ~140/255, which a
            deepened frame achieves while keeping its colour.
          */}
          <span className="ab-prem__plate">
            <span className="ab-prem__word" data-r="scale" style={{ '--d': '90ms' } as React.CSSProperties}>
              {word}
            </span>
          </span>
          <span className="ab-prem__tail" data-r="up" style={{ '--d': '180ms' } as React.CSSProperties}>
            {tail}
          </span>
        </p>
      </div>

      <div className="ab-rail">
        <div className="ab-prem__foot">
          <p className="ab-prem__belief" data-r="up">
            {belief}
          </p>
          <p className="ab-prem__now" data-r="up" style={{ '--d': '110ms' } as React.CSSProperties}>
            {becoming}
          </p>
        </div>
      </div>
    </section>
  );
}
