import { links } from '@/content/site';
import { HeroMotion } from './HeroMotion';

/**
 * THE HERO — three movements of one class: FOLD → SETTLE → REST.
 *
 * The three clips are the archive's only loop-5 landscape frames, all shot in the same hall
 * in the same light, and they already sit in the order the class happened. The bodies in the
 * picture descend as the reader descends, so the hero ends in savasana exactly as it hands
 * over — it earns its exit instead of stopping.
 *
 * A server component: every word, link and photograph is in the static HTML. <HeroMotion />
 * is the single client island that drives the scroll.
 */

type Movement = {
  /** wide frame, used from 861px up */
  wide: string;
  /** portrait-friendly frame for narrow viewports, where the wide crop loses its subject */
  narrow: string;
  clip: string;
  label: string;
  alt: string;
  eager?: boolean;
};

const MOVEMENTS: Movement[] = [
  {
    wide: 'ss-ven0096',
    narrow: 'ss-ven0070',
    clip: 'ss-ven0096',
    label: 'Fold',
    alt: 'Practitioners folding forward over mats in a wide, plant-lined hall, daylight coming through the skylight roof behind them.',
    eager: true,
  },
  {
    wide: 'ss-ven0139',
    narrow: 'ss-ven0052',
    clip: 'ss-ven0139',
    label: 'Settle',
    alt: 'A teacher moving among students seated on their mats across the open hall floor.',
  },
  {
    wide: 'ss-ven0153',
    narrow: 'ss-ven0131',
    clip: 'ss-ven0153',
    label: 'Rest',
    alt: 'Students lying still on their mats at the end of practice, the teacher keeping watch beside them.',
  },
];

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="stage" id="stage">
        <div className="frame" id="frame">
          {MOVEMENTS.map((m, i) => (
            <div className="mov" data-mov={i} key={m.clip}>
              <picture>
                <source media="(max-width:860px)" type="image/avif" srcSet={`/media/posters/${m.narrow}.avif`} />
                <source media="(max-width:860px)" type="image/jpeg" srcSet={`/media/posters/${m.narrow}.jpg`} />
                <source type="image/avif" srcSet={`/media/posters/${m.wide}.avif`} />
                <img
                  className="mov__still"
                  src={`/media/posters/${m.wide}.jpg`}
                  alt={m.alt}
                  decoding="async"
                  {...(m.eager ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
                />
              </picture>
              {/*
                NO `poster` ATTRIBUTE. The <img> above is never removed and the video is
                opacity:0 until it has proven it is playing, so a poster here would never be
                seen — but it WOULD be downloaded: three of them cost 948 KB on every device,
                and on mobile they were posters for videos that never get a src at all.
                Removing them took a phone from 1,777 KB to 161 KB.
              */}
              <video
                className="mov__vid"
                muted
                playsInline
                loop
                preload="none"
                tabIndex={-1}
                aria-hidden="true"
                disablePictureInPicture
                data-src={`/media/clips/${m.clip}.mp4`}
              />
            </div>
          ))}
        </div>

        {/* the scrim is a POOL anchored where the type sits, not a wash. It eases away once
            the type has gone, so the picture gets a stretch of screen entirely to itself. */}
        <div className="scrim" id="scrim" aria-hidden="true" />
        <div className="scrim-top" aria-hidden="true" />
        <div className="scrim-right" aria-hidden="true" />

        <div className="type" id="type">
          {/* The eyebrow carries the pill's own material rather than sitting on the
              photograph: as bare text it measured 2.93:1, and no gradient fixes a label
              whose backdrop changes with every viewport. */}
          <p className="eyebrow">A community of Yoga teachers</p>
          <h1>
            Yoga is vast.
            <br />
            <em>No one holds it all.</em>
          </h1>
          <p className="lede">
            Teachers and serious practitioners, meeting across traditions — to connect, learn,
            collaborate and grow.
          </p>
          <div className="acts">
            <a
              className="btn-join"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the WhatsApp community
              <svg className="btn-join__arw" width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
                <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <a className="lnk" href="#within">
              What happens within
            </a>
          </div>
        </div>

        {/* The right-hand element is not a provenance caption — it is the sequence itself:
            three movements, where you are in them, and a way to jump to any. The scroll
            affordance and the right-hand element are one object, not two widgets. */}
        <nav className="idx" id="idx" aria-label="Hero sequence">
          <span className="idx__rule" aria-hidden="true">
            <span className="idx__fill" id="idxFill" />
          </span>
          <ol className="idx__marks">
            {MOVEMENTS.map((m, i) => (
              <li key={m.label}>
                <button className="idx__mark" type="button" data-go={i}>
                  <span className="sr">{`Movement ${['one', 'two', 'three'][i]} — ${m.label}`}</span>
                  <span className="idx__dot" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
          <p className="idx__now" aria-hidden="true">
            {MOVEMENTS.map((m, i) => (
              <span key={m.label} data-lbl={i}>
                {m.label}
              </span>
            ))}
          </p>
        </nav>

        {/* the static provenance line, shown only when motion is off */}
        <p className="cap" id="cap">
          Samskrithi Sadhana · Bengaluru
        </p>
      </div>

      <HeroMotion />
    </section>
  );
}
