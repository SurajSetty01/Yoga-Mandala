import { about } from '@/content/pranava';

/**
 * 08 FACULTY. The client: "Not ready for final use. Do not use a mixture of old programme
 * photographs or gallery images to fill this area. Will share faculty profiles separately."
 *
 * TEXT-LED and short: the lead set large on the left, the two sentences on the right. No
 * photographs, no cards and no empty slots until the profiles arrive.
 */
export function A3Faculty() {
  const f = about.faculty;
  return (
    <section className="a3-sec a3-fac" aria-labelledby="a3-fac-h">
      <div className="a3-rail a3-fac__grid">
        <div>
          <p className="a3-label" data-a3r>
            <span className="a3-label__n">08</span> Faculty
          </p>
          <h2 className="a3-fac__h" id="a3-fac-h" data-a3r>
            {f.lead}
          </h2>
        </div>
        <div className="a3-fac__body" data-a3r>
          {f.body.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
