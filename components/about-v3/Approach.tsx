import { about } from '@/content/pranava';
import { A3Clip } from './Clip';

/**
 * 03 OUR APPROACH. The client: "keep the structure, reduce the photography ... Tradition: a
 * Bharatanatyam image ... Practice & Inquiry look good, leave them ... Transmission: the
 * video of me teaching scorpion pose to a girl where my face is seen."
 *
 * One screen: the lead across the top, then the four principles as four tall columns, each
 * with exactly one image above its name and paragraph. The lead names only three of them,
 * so Transmission is set apart: its name in forest green over a brass rule, the column the
 * other three lead to.
 * The two approved clips and the scorpion-pose clip play only while on screen.
 */
type Media =
  | { kind: 'still'; src: string; set: string; alt: string }
  | { kind: 'clip'; src: string; poster: string; alt: string };

const MEDIA: Record<string, Media> = {
  Tradition: {
    kind: 'still',
    src: '/media/stills/ss-dsc07165-960.webp',
    set: '/media/stills/ss-dsc07165-480.webp 480w, /media/stills/ss-dsc07165-960.webp 960w',
    alt: 'A Bharatanatyam dancer in a low stance with both arms raised in a mudra, beneath the Praṇava emblem',
  },
  Practice: {
    kind: 'clip',
    src: '/media/clips/pr-mov-img_5687.mp4',
    poster: '/media/posters/pr-mov-img_5687.jpg',
    alt: 'Three practitioners lying back over folding chairs in supported backbends',
  },
  Inquiry: {
    kind: 'clip',
    src: '/media/clips/pr-mov-img_5681.mp4',
    poster: '/media/posters/pr-mov-img_5681.jpg',
    alt: 'A teacher supporting a student in an inversion against the wall, then helping her down',
  },
  Transmission: {
    kind: 'clip',
    src: '/media/about-v2/approach-transmission.mp4',
    poster: '/media/about-v2/approach-transmission.jpg',
    alt: 'Praṇav Śāstrī beside a student balancing on her forearms, her legs arched over to the wall',
  },
};

export function A3Approach() {
  const a = about.approach;
  return (
    <section className="a3-sec a3-appr" aria-labelledby="a3-appr-h">
      <div className="a3-rail">
        <div className="a3-appr__head">
          <p className="a3-label" data-a3r>
            <span className="a3-label__n">03</span> Our approach
          </p>
          <h2 className="a3-appr__h" id="a3-appr-h" data-a3r>
            {a.lead}
          </h2>
        </div>

        <ol className="a3-appr__cols" role="list">
          {a.items.map((it, i) => {
            const m = MEDIA[it.name];
            return (
              <li
                key={it.name}
                className={`a3-appr__col${it.name === 'Transmission' ? ' is-key' : ''}`}
                data-a3r
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
              >
                <div className="a3-appr__media">
                  {m?.kind === 'still' ? (
                    <img
                      src={m.src}
                      srcSet={m.set}
                      sizes="(min-width: 1000px) 22vw, 50vw"
                      alt={m.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : m ? (
                    <A3Clip src={m.src} poster={m.poster} alt={m.alt} />
                  ) : null}
                </div>
                <h3 className="a3-appr__name">{it.name}</h3>
                <p className="a3-appr__body">{it.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
