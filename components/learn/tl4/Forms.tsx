import type { CSSProperties } from "react";
import { about } from "@/content/pranava";
import { Mark } from "@/components/learn/parts";
import { TL4_FORMS, tl4Sizes, tl4Src, tl4SrcSet } from "./items";
import { Tl4Motion } from "./Motion";

/**
 * 03 · PROGRAMME CATEGORIES — "Different forms, one lintel".
 *
 * WHAT HAPPENS. The client's sentence runs to a colon, and the colon runs straight into a
 * forest lintel that carries the rest of the sentence — the common intention. Beneath the
 * lintel five photographs arrive scattered: five sizes, five depths, pushed apart, each with
 * its category name in display type travelling with it. As the reader scrolls on, they
 * slide shoulder to shoulder and close into one continuous band standing under the
 * lintel, the pictures settling in their windows as they land. Start state: different
 * forms. End state: one band under one intention. That is the sentence, performed.
 *
 * THE LINTEL NEVER MOVES. The intention is the constant and the forms are what travel, so
 * the one sentence that completes the lead is legible at every scroll position, on a solid
 * ground, and sits directly after the colon — never separated from it by the pictures.
 *
 * FINISHED BY DEFAULT. Every figure's resting transform is the packed band; the island only
 * writes one number per figure (`--q`, 0 → 1) that starts it scattered. With no JavaScript,
 * or under reduced motion, the reader gets the packed band under the lintel — complete.
 *
 * NOTHING IS INVENTED. Five names, five pictures, the client's two sentences. No
 * description, duration, format, level, fee or date for any category: none exists.
 */
export function Tl4Forms() {
  return (
    <section className="tl4-forms" id="programme-categories">
      {/* The track is the held stage's containing block: it ends with the hold, so the
          stage lets go of the screen as soon as the band has closed. */}
      <div className="tl4-track">
        <div className="tl4-in">
          <Mark n="03">Programme categories</Mark>

          <p className="tl4-lead">{about.what.body[2]}</p>
          <p className="tl4-lintel">
            <span>{about.what.intention}</span>
          </p>

          <ul className="tl4-band">
            {TL4_FORMS.map((f) => (
              <li className={`tl4-it tl4-it--${f.shape}`} key={f.id}>
                <div className="tl4-fig">
                  <div className="tl4-ph">
                    <img
                      className="tl4-img"
                      src={tl4Src(f)}
                      srcSet={tl4SrcSet(f)}
                      sizes={tl4Sizes(f)}
                      width={f.w}
                      height={f.h}
                      alt={f.alt}
                      loading="lazy"
                      decoding="async"
                      style={
                        {
                          "--op": f.pos,
                          "--op-n": f.posNarrow,
                        } as CSSProperties
                      }
                    />
                  </div>
                  <h3 className="tl4-lbl">{f.label}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Zero height unless Motion.tsx has measured that the whole stage fits the screen,
          the band is wide, and motion is allowed. */}
        <div className="tl4-hold" aria-hidden="true" />
      </div>
      <Tl4Motion />
    </section>
  );
}
