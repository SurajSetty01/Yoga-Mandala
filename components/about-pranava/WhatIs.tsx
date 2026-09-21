import { about } from '@/content/pranava';
import { Eyebrow, FRAMES, Shot } from './parts';

/**
 * 02 · WHAT IS PRAṆAVA — an enlargement you cannot place, stepping back into its room.
 *
 * The plate opens at 2.4× on a patch of studio floor and a pair of hands, and steps back as
 * the section is read until the same frame is ten people doing one thing. The section asks
 * what this place is; the picture answers it by pulling back far enough to show you.
 *
 * The client's lead — "A place to learn. A place to practise. A place to grow." — is split
 * at its OWN full stops with a lookbehind, so the three spans concatenate back to the
 * sentence character for character. Nothing is retyped and nothing is added.
 */
export function WhatIs() {
  const places = about.what.lead.split(/(?<=\.)\s+/);

  return (
    <section className="apr-s apr-s--deep apr-what" id="apr-what">
      <div className="apr-rail">
        <Eyebrow n="02" dark>
          What Praṇava is
        </Eyebrow>
      </div>

      <div className="apr-what__stage">
        <Shot frame={FRAMES.practiceLine} sizes="100vw" />
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
