import { about } from '@/content/pranava';

/**
 * WHAT WE VALUE. Four whole photographs in four clean circles, one per value, each with its
 * Sanskrit word and line beneath. As the section comes into view a fine brass ring draws
 * itself round each circle in turn, Sādhana first and Sevā last, so the four read as one
 * practice unfolding. Nothing is pinned and nothing holds the scroll, so it behaves the same
 * on every phone; with reduced motion the rings are simply drawn.
 */
const PICS = [
  { src: '/media/stills/pr-ttc-dsc_0569-960.webp', alt: 'A row of practitioners in downward-facing dog on mats in an open hall', pos: '55% 60%' },
  { src: '/media/stills/pr-ttc-dsc_0191-960.webp', alt: 'Women seated in a circle in a study session, teachers seated behind', pos: '62% 60%' },
  { src: '/media/about-v2/values-ss-ven0194-960.webp', alt: 'Praṇav Śāstrī in conversation with a student', pos: '64% 30%' },
  { src: '/media/about-v2/values-ss-ven0052-960.webp', alt: 'A teacher bending to adjust a seated participant while others practise', pos: '60% 40%' },
];

export function A3Values() {
  return (
    <section className="a3-sec a3-val" aria-labelledby="a3-val-h">
      <div className="a3-rail">
        <div className="a3-val__head">
          <p className="a3-label a3-label--dark" data-a3r>
            <span id="a3-val-h">What we value</span>
          </p>
        </div>
        <ul className="a3-val__row" role="list">
          {about.values.map((v, i) => {
            const p = PICS[i];
            return (
              <li key={v.name} className="a3-val__item" data-a3r style={{ '--d': `${i * 220}ms` } as React.CSSProperties}>
                <div className="a3-val__medal">
                  <svg className="a3-val__ring" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="48.5" pathLength={100} />
                  </svg>
                  {p ? (
                    <img src={p.src} alt={p.alt} style={{ objectPosition: p.pos }} loading="lazy" decoding="async" />
                  ) : null}
                </div>
                <h3 className="a3-val__word">{v.name}</h3>
                <p className="a3-val__line">{v.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
