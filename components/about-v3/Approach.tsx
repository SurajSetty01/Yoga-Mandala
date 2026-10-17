import { about } from '@/content/pranava';
import { A3Clip } from './Clip';

/**
 * 03 OUR APPROACH. The four principles as four arched windows on one line, joined by a thread
 * that draws itself through them as the section is read (Motion.tsx, data-a3-draw): Tradition
 * passes to Practice, Practice to Inquiry, and all of it arrives at Transmission. The lead
 * names only three, so Transmission's arch is the tallest and stands a little apart, on the
 * forest ground. Tradition is the Bharatanatyam frame; Practice, Inquiry and Transmission are
 * the client-approved clips, playing only while on screen.
 */
type Media =
  | { kind: 'still'; src: string; set: string; alt: string }
  | { kind: 'clip'; src: string; poster: string; alt: string };

const MEDIA: Record<string, Media> = {
  Tradition: {
    kind: 'still',
    src: '/media/stills/ss-dsc07165-960.webp',
    set: '/media/stills/ss-dsc07165-480.webp 480w, /media/stills/ss-dsc07165-960.webp 960w',
    alt: 'A Bharatanatyam dancer in a low stance with both arms raised in a mudra',
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
      <svg className="a3-appr__thread" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
        <path
          data-a3-draw
          d="M-20 260 C 160 120, 260 360, 420 240 S 700 120, 800 250 S 1060 380, 1160 220 S 1360 90, 1460 160"
        />
      </svg>
      <div className="a3-rail">
        <div className="a3-appr__head">
          <p className="a3-label" data-a3r>
            <span className="a3-label__n">03</span> Our approach
          </p>
          <h2 className="a3-appr__h" id="a3-appr-h" data-a3r>
            {a.lead}
          </h2>
        </div>

        <ol className="a3-appr__cols" role="list" data-a3-rise>
          {a.items.map((it) => {
            const m = MEDIA[it.name];
            return (
              <li key={it.name} className={`a3-appr__col${it.name === 'Transmission' ? ' is-key' : ''}`}>
                <div className="a3-appr__media">
                  {m?.kind === 'still' ? (
                    <img src={m.src} srcSet={m.set} sizes="(min-width: 1000px) 22vw, 50vw" alt={m.alt} loading="lazy" decoding="async" />
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
