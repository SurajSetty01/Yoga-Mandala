import { contact } from '@/content/copy';
import { links, site } from '@/content/site';
import { Arrow } from './ChannelList';
import { DoorClip } from './DoorClip';

/**
 * BAND 03: TWO DOORWAYS, AND WHAT IS THROUGH THEM.
 *
 * The owner's review: "insta and WhatsApp doors kinda thing, there is nothing in the
 * background?" There was not: two cream arches with a label in each. Now each arch is cut
 * through the dark wall onto the archive.
 *
 *  · INSTAGRAM opens onto a wall of photographs set three across, the way an account's grid
 *    reads: nine archive stills of practice, indoors and out.
 *  · WHATSAPP opens onto people in a room together: the archive's one clip of a whole class
 *    moving in unison, attached as the doorway approaches and released when it leaves.
 *    Its still is printed beneath it, so without JavaScript, or under reduced motion, the
 *    doorway still opens onto the same class.
 *
 * The label sits on the wall under its opening, never on the picture, so its contrast is a
 * constant. The link is the label, stretched over the whole doorway; the photographs are
 * outside it, so their alt text is read as photographs and not folded into the link's name.
 *
 * WHOSE ACCOUNTS THESE ARE. The heading says only what is sourced: Praṇava Seva Trust keeps
 * the accounts, and Yoga Mandala, a community initiative under the Trust, keeps none of its
 * own (design/CONTENT.md, the client's own message). The Instagram handle is derived from
 * the URL so the label and the destination cannot drift apart.
 *
 * Every frame was read in its audit description and looked at: people practising, teaching
 * and sitting together; nothing whose subject is a room, a prop or a wall; none of the four
 * frames the owner ruled out. Alt text is verbatim from public/media/pranava-stills.json and
 * pranava-clips.json. Nothing in the archive names anyone, and nothing here does.
 */
const MOSAIC = [
  {
    id: 'pr-ttc-dsc_0302_1',
    h: 320,
    focal: '50% 55%',
    alt: 'Five women holding tree pose with palms joined overhead on a concrete apron outside a building',
  },
  {
    id: 'pr-pbh-img_5622',
    h: 640,
    focal: '50% 50%',
    alt: 'A man reaching out to adjust the back of a woman folding forward over a folding chair',
  },
  {
    id: 'pr-ttc-dsc_0384',
    h: 320,
    focal: '50% 62%',
    alt: 'Five women sitting cross-legged on grass among tall trees with their hands on their knees',
  },
  {
    id: 'pr-ttc-dsc_0510',
    h: 320,
    focal: '50% 52%',
    alt: 'Three women hanging inverted from wall ropes with legs spread wide, hands on the floor',
  },
  {
    id: 'pr-pbh-img_5362',
    h: 640,
    focal: '50% 52%',
    alt: 'A woman and a man standing in warrior two with arms extended in front of an arched window',
  },
  {
    id: 'pr-ttc-dsc_0347',
    h: 320,
    focal: '50% 60%',
    alt: 'Four women posing beneath a banyan in side bends and with arms raised, one seated with palms joined',
  },
  {
    id: 'pr-ttc-dsc_0208_1',
    h: 320,
    focal: '45% 60%',
    alt: 'Four people in supported headstand over folding chairs in a row along a white wall',
  },
  {
    id: 'pr-ttc-dsc_0404',
    h: 320,
    focal: '50% 62%',
    alt: 'Three women sitting cross-legged on grass with one arm raised and bent over the head',
  },
  {
    id: 'pr-ttc-dsc_0046_1',
    h: 320,
    focal: '45% 50%',
    alt: 'Five practitioners standing in warrior one with arms raised on mats across a red floor',
  },
] as const;

/** pr-mov-img_5704: 1920x1080, 10.6s, loop score 5, the only clip of a whole class together */
const CLASS = {
  clip: '/media/clips/pr-mov-img_5704.mp4',
  avif: '/media/posters/pr-mov-img_5704.avif',
  jpg: '/media/posters/pr-mov-img_5704.jpg',
  focal: '45% 55%',
  alt: 'A class moving through a wide standing pose with arms extended on mats across a hall',
};

export function Social() {
  const igHandle = `@${links.instagram.replace(/\/+$/, '').split('/').pop()}`;

  return (
    <section className="cxs" aria-labelledby="cxs-h">
      <div className="cxs-in">
        <div className="cxs-say">
          <p className="cxs-eyebrow">{contact.social.heading}</p>
          <h2 className="cxs-h" id="cxs-h">
            {site.trust} keeps the accounts.
          </h2>
          <p className="cxs-p">
            Yoga Mandala is a community initiative under the Trust and keeps none of its own.
          </p>
        </div>

        <ul className="cxs-doors">
          <li className="cxs-door">
            <div className="cxs-arch cxs-arch--grid">
              {MOSAIC.map((m) => (
                <img
                  key={m.id}
                  src={`/media/stills/${m.id}-480.webp`}
                  alt={m.alt}
                  width={480}
                  height={m.h}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: m.focal }}
                />
              ))}
            </div>
            <a className="cxs-link" href={links.instagram} target="_blank" rel="noopener noreferrer">
              <span className="cxs-k">Instagram</span>{' '}
              <span className="cxs-v">{igHandle}</span>{' '}
              <span className="cxs-go">
                Open
                <Arrow />
              </span>
            </a>
          </li>
          <li className="cxs-door">
            {/* The same open line the whole page routes to, restated at the foot of it. The
                three email fields are null and render as nothing: there is no third door. */}
            <div className="cxs-arch">
              <picture>
                <source type="image/avif" srcSet={CLASS.avif} />
                <img
                  className="cxs-still"
                  src={CLASS.jpg}
                  alt={CLASS.alt}
                  width={1920}
                  height={1080}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: CLASS.focal }}
                />
              </picture>
              <DoorClip src={CLASS.clip} className="cxs-clip" />
            </div>
            <a className="cxs-link" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              <span className="cxs-k">WhatsApp</span>{' '}
              <span className="cxs-v">{links.whatsappDisplay}</span>{' '}
              <span className="cxs-go">
                Open
                <Arrow />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
