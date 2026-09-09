import { SiteNav } from '@/components/SiteNav';
import { Hero } from '@/components/hero/Hero';
import { Opening } from '@/components/about/Opening';
import { Purpose } from '@/components/about/Purpose';
import { Approach } from '@/components/about/Approach';
import { Members } from '@/components/about/Members';
import { Guiding } from '@/components/about/Guiding';
import { within } from '@/content/copy';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * PAGE 1 — About Yoga Mandala. The client's own page order; `/` is the About page.
 */
export const metadata = {
  title: 'About Yoga Mandala',
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

export default function AboutPage() {
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
          03 → 07. The client's own order, each with its own reason to exist visually and no
          two neighbours sharing a ground: a mute two-column spread on warm paper, the four
          purposes as a mandala reversed out on the deep ground, the approach as a quiet
          right-hand aside, one full-bleed photograph carrying no type, and the guiding
          thought centred at the page's top scale. See components/about/NOTES.md.

          `.tail` — a 42svh cream spacer that used to hold the bottom of the page open while
          there was nothing under section 02 — is gone: there is now a page under it, and it
          would have left a stripe of paper between the closing dark plate and the footer.
        */}
        <Opening />
        <Purpose />
        <Approach />
        <Members />
        <Guiding />
      </main>
      <SiteFooter />
    </>
  );
}
