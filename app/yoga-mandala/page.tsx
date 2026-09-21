import { SiteNav } from '@/components/SiteNav';
import { Hero } from '@/components/hero/Hero';
import { Premise } from '@/components/about/Premise';
import { Purpose } from '@/components/about/Purpose';
import { Approach } from '@/components/about/Approach';
import { Members } from '@/components/about/Members';
import { Guiding } from '@/components/about/Guiding';
import { within } from '@/content/copy';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * YOGA MANDALA — the section landing page.
 *
 * This is the page that used to be the whole site's front door. The brief moves it here
 * intact: "Move this content into the Yoga Mandala section" for the About and Members
 * sections, and "create landing page using existing content" for this route. Nothing about
 * the composition changed — only its address and what sits above it in the navigation.
 */
export const metadata = {
  title: 'Yoga Mandala',
  description:
    'Yoga Mandala is a community of Yoga teachers and serious practitioners coming together to connect, learn, collaborate and grow.',
};

/**
 * The four frames beneath the hero. Ordered shala → festival → shala so no two frames from
 * the same room sit together, and captioned with the event they were actually taken at.
 */
const PILLAR_FRAMES = [
  {
    id: 'ss-dsc07137',
    position: '35% 45%',
    alt: 'A barefoot teacher on a green stool talking with a small group seated on the floor around him.',
  },
  {
    id: 'ss-dsc07118',
    position: '38% 46%',
    alt: "A teacher holds a hand just above a student's back, mid-adjustment.",
  },
  {
    id: 'ss-dsc07143',
    position: '50% 55%',
    alt: 'Four panellists on wooden chairs on a green stage, talking together.',
  },
  {
    id: 'ss-dsc07120',
    position: '50% 30%',
    alt: 'A practitioner balancing on one leg with palms together at the chest.',
  },
];

export default function YogaMandalaPage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Hero />

        {/*
          SECTION 02 — deliberately the inverse of the hero:
          one wide moving frame on dark → four narrow stills on cream, and type BESIDE the
          pictures rather than on them. It climbs over the hero for 46svh, so for most of a
          screen-height both sections are on screen moving together. That overlap is the
          handoff. Continuity is the tokens; the idea is its own.
        */}
        <section className="within" id="within">
          <div className="within__head">
            <p className="within__eyebrow">
              <span>02</span>
              What happens within
            </p>
            <h2 className="within__h">
              Everyone has something to learn.
              <br />
              <em>Everyone has something to contribute.</em>
            </h2>
          </div>

          <ol className="reg">
            {within.pillars.map((p, i) => {
              const frame = PILLAR_FRAMES[i]!;
              return (
                <li className="reg__i" data-r="up" style={{ '--d': `${i * 80}ms` } as React.CSSProperties} key={p.name}>
                  <figure className="reg__fig">
                    <img
                      src={`/media/stills/${frame.id}-960.webp`}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: frame.position }}
                      alt={frame.alt}
                    />
                  </figure>
                  <p className="reg__n">{p.index}</p>
                  <h3 className="reg__w">{p.name}</h3>
                </li>
              );
            })}
          </ol>

          <p className="within__foot">
            Yoga is a vast tradition, and no single teacher can know everything.
          </p>
        </section>

        {/*
          03 → 07. The client's final assembly, chosen from the three concepts at
          /preview/about-a|b|c/. Each section has its own reason to exist visually and no two
          neighbours share a ground — deep, warm, paper, deep, paper:

            03  one word is a window onto a photograph, and the word is `vast`
            04  four mounted plates dealt left to right, Grow the only one still whole
            05  two voices from one typeface over a figure with no edges
            06  the display line's baseline is the horizon of a room
            07  a quotation with no author; the marks close around it as it lands

          The whole run is wrapped in one `.ab` element so the type scale and the grounds are
          declared once. See components/about/NOTES.md.
        */}
        <div className="ab">
          <Premise />
          <Purpose />
          <Approach />
          <Members />
          <Guiding />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
