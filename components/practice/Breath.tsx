import { CLIPS } from './frames';
import { Ask, Cap, Eyebrow, Loop } from './parts';

/**
 * 04 · PRĀṆĀYĀMA — THE ONE PLACE ON THIS SITE THAT MOVES WHILE THE READER IS STILL.
 *
 * Everything else that moves on Praṇava moves because somebody scrolled. This does not.
 * Two clay rules, one above the aperture and one below it, draw apart and come back
 * together on a ten-second cycle that is driven by a clock and by nothing else — so the
 * section is still breathing when you stop reading, which is the only structural
 * difference between breath and every other subject on this page.
 *
 * Inside the aperture is the one take in the whole archive with no people in it and
 * continuous gentle movement: leaves in daylight, moving in air. It is also the smallest
 * file in the library at 1,401 KB, which is the right price for a texture.
 *
 * WHY NOT A LUNG, A WAVE, A PULSING CIRCLE. Blueprint §9 asks that motion support
 * orientation rather than decorate, and §2.4 that the site invite trust rather than create
 * urgency. A diagram of breathing would be decoration and would also be a teaching claim
 * this project cannot make — nothing in the client's material describes how Prāṇāyāma is
 * taught here. Two rules and a measure that opens and closes assert nothing.
 *
 * The cycle is ten seconds and the travel is small on purpose. Under
 * prefers-reduced-motion the rules stop where they sit, the video is never attached, and
 * the section is a wide still frame of leaves between two rules — complete, and saying the
 * same thing.
 *
 * THE FACE IS INTER. Prāṇāyāma carries ā twice and ṇ once; Fraunces has no precomposed ā
 * and drops the macron (DESIGN-SYSTEM §1).
 *
 * What the section may SAY is almost nothing, and that is the honest position. Prāṇāyāma
 * is named twice in the client's material — in the Practice door sentence and in the
 * Blueprint's own indicative content for this journey — and described neither time. So
 * the section carries the word, the air, and the same honest mark §03 carries.
 */
export function Breath() {
  return (
    <section className="pc-s pc-brea" id="pc-pranayama">
      <div className="pc-rail">
        <Eyebrow n="04">Prāṇāyāma</Eyebrow>

        <div className="pc-brea__stage" data-pc="fade">
          <span className="pc-brea__rule pc-brea__rule--top" aria-hidden="true" />
          <figure className="pc-brea__ap">
            <Loop clip={CLIPS.air} imgClassName="pc-brea__img" vidClassName="pc-brea__vid" />
          </figure>
          <span className="pc-brea__rule pc-brea__rule--btm" aria-hidden="true" />
        </div>

        <div className="pc-brea__foot">
          <h3 className="pc-brea__word">Prāṇāyāma</h3>
          <div className="pc-brea__say">
            <Ask
              note="Named by Praṇava as part of a sustained practice. No description, format or fee for it is published on this site yet."
              subject="Ask about Prāṇāyāma"
              message="Hello Praṇava. I would like to know more about Prāṇāyāma."
            />
            <Cap>Leaves moving in the air.</Cap>
          </div>
        </div>
      </div>
    </section>
  );
}
