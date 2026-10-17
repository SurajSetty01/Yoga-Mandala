import { about } from '@/content/pranava';
import { Eyebrow } from './parts';

/**
 * The teaching frame (client review, Oct 2026: "a teaching/study photograph could
 * communicate the institutional character even better"). `ss-ven0039` at 1.0s, from the
 * Samskriti Sadhana yoga session: the teacher seated on the low stage mid-explanation, one
 * hand at his chest, a student seated beside him, the class on the floor in the foreground
 * and the painted tree and Praṇava emblem on the wall behind. The derivatives were cut from
 * the 1920x1080 source video frame into public/media/about-v2/.
 */
const TEACHING = {
  src: '/media/about-v2/ss-ven0039-1920.webp',
  srcSet:
    '/media/about-v2/ss-ven0039-480.webp 480w, /media/about-v2/ss-ven0039-960.webp 960w, /media/about-v2/ss-ven0039-1920.webp 1920w',
  alt: 'Praṇav Śāstrī teaching: seated cross-legged on a low stage, one hand raised to his chest as he explains, a student seated beside him and the class sitting on the floor in front, under a painted tree and the Praṇava emblem.',
};

/**
 * 02 · WHAT IS PRAṆAVA. One still teaching photograph, then the client's words.
 *
 * The client's lead, "A place to learn. A place to practise. A place to grow.", is split
 * at its OWN full stops with a lookbehind, so the three spans concatenate back to the
 * sentence character for character. Nothing is retyped and nothing is added.
 */
export function WhatIs() {
  const places = about.what.lead.split(/(?<=\.)\s+/);

  return (
    <section className="apr-s apr-s--deep apr-what" id="apr-what">
      <div className="apr-rail">
        <Eyebrow n="02" dark>
          What is Praṇava?
        </Eyebrow>
      </div>

      <div className="apr-what__stage">
        <img
          src={TEACHING.src}
          srcSet={TEACHING.srcSet}
          sizes="100vw"
          width={1920}
          height={1080}
          alt={TEACHING.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="apr-rail">
        <div className="apr-what__places">
          {places.map((p, i) => (
            <p
              className="apr-what__place"
              key={p}
              data-ap="up"
              style={{ ['--apr-d' as string]: `${i * 110}ms` }}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="apr-what__cols" data-ap="fade">
          <div>
            <p>{about.what.body[0]}</p>
            <p>{about.what.body[1]}</p>
          </div>
          <div>
            <p>{about.what.body[2]}</p>
          </div>
        </div>

        <p className="apr-what__intention" data-ap="up">
          {about.what.intention}
        </p>
      </div>
    </section>
  );
}
