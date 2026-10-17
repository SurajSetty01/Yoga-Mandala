import { about } from '@/content/pranava';

/**
 * 02 WHAT IS PRAṆAVA? Rebuilt from zero. The lead names three places ("A place to learn. A
 * place to practise. A place to grow."), so the section shows three: three tall arched
 * windows, the shape of the shala's own doorways, rising in one after another, each holding
 * a photograph of that place at work and the line that names it. A study circle on the
 * veranda (learn), the class under the emblem (practise), the cohort on the grass under the
 * trees (grow). The client's paragraphs and the intention follow underneath, on the dark
 * ground, in two calm columns.
 */
const ARCHES = [
  { src: '/media/about-v3/ttc-0280-1280.webp', alt: 'A teacher seated in a study circle with students holding notes on a veranda', pos: '50% 60%' },
  { src: '/media/about-v3/ss-dsc07130-1280.webp', alt: 'Praṇav Śāstrī seated beneath the Praṇava emblem with his class', pos: '50% 30%' },
  { src: '/media/about-v3/ttc-0402-1280.webp', alt: 'The cohort seated in meditation together on the grass under the trees', pos: '50% 60%' },
];

export function A3WhatIs() {
  const w = about.what;
  const places = w.lead.split(/(?<=\.)\s+/);
  return (
    <section className="a3-sec a3-what" aria-labelledby="a3-what-h">
      <div className="a3-rail">
        <p className="a3-label a3-label--dark" data-a3r>
          <span className="a3-label__n">02</span>
          <span id="a3-what-h">What is Praṇava?</span>
        </p>

        <ul className="a3-what__arches" role="list" data-a3-rise>
          {ARCHES.map((a, i) => (
            <li key={a.src} className="a3-arch">
              <div className="a3-arch__win">
                <img src={a.src} alt={a.alt} style={{ objectPosition: a.pos }} loading="lazy" decoding="async" />
              </div>
              <p className="a3-arch__line">{places[i]}</p>
            </li>
          ))}
        </ul>

        <div className="a3-what__text">
          <div className="a3-what__body" data-a3r>
            {w.body.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <p className="a3-what__intent" data-a3r>
            {w.intention}
          </p>
        </div>
      </div>
    </section>
  );
}
