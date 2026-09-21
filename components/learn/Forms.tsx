import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FORMS } from './frames';
import { Mark, Shot } from './parts';

/**
 * 04 — FIVE FORMS, ONE LINE.
 *
 * The client's sentence is the instruction: "Our programmes may take different forms — from
 * regular practice and teacher education to workshops, intensives, retreats and study — but
 * they share a common intention."
 *
 * So the five categories are drawn as five apertures of five DIFFERENT SHAPES, standing on
 * one baseline: a tall narrow one, a long low one, a near-square, a broad tall one, a small
 * upright. Nothing is a card, nothing is a grid cell, and no two are the same size — which
 * is the only honest way to show five things that genuinely differ in format when you have
 * no durations, fees or schedules to differentiate them with.
 *
 * The baseline is a real rule, and the rule is labelled with the client's own "common
 * intention" sentence. Five shapes, one line, one intention: the argument is the layout.
 *
 * The five names are the client's, from the Website brief §8 — "teacher education,
 * continuing education, workshops, intensives and study programmes" — and not one word has
 * been added to them.
 *
 * Motion: each aperture's picture slides up into its own window, left to right, so the row
 * assembles onto the line. The mask is a CHILD of the observed element. Under reduced
 * motion the row is simply standing there.
 *
 * Narrow viewports: five across at 390px would be 62px each, which is a stamp rather than a
 * photograph, so below 760px the row breaks into three and two — each group keeping its own
 * baseline and the shapes keeping their relative proportions. The break is in the
 * stylesheet; the markup is one list either way.
 */
export function Forms() {
  return (
    <section className="ln-fo" id="programme-categories">
      <div className="ln-fo__in">
        <Mark n="03">Programme categories</Mark>

        <p className="ln-fo__lead" data-ln="up">
          {about.what.body[2]}
        </p>

        <ul className="ln-fo__row">
          {FORMS.map((it, i) => (
            <li
              className="ln-fo__it"
              data-ln="rise"
              key={it.label}
              style={
                {
                  '--w': it.w,
                  '--h': it.h,
                  '--d': `${i * 110}ms`,
                } as CSSProperties
              }
            >
              <div className="ln-fo__ap">
                <div className="ln-fo__apIn">
                  <Shot
                    className="ln-fo__img"
                    frame={it.frame}
                    /* the widest aperture is 0.275 of a 1620 container = 445px, so a
                       flat 28vw made a 2531 monitor pull the 1620 derivative for a
                       445px box. The last clause pins it once the container stops
                       growing. */
                    sizes="(max-width: 899px) 46vw, (max-width: 1799px) 28vw, 450px"
                  />
                </div>
              </div>
              <h3 className="ln-fo__lbl">{it.label}</h3>
            </li>
          ))}
        </ul>

        <p className="ln-fo__intent">{about.what.intention}</p>
      </div>
    </section>
  );
}
