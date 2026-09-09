/**
 * Section-by-section comparison of the competing concepts.
 *
 * Built because reading three prose descriptions is not a way to choose a design. Each row
 * is one section; each column is the same section as the three concepts solved it.
 * Screenshots are captured at 1440x900 from the live preview routes, after every lazy image
 * has loaded and every reveal has fired.
 *
 * Scaffolding, not site work — deleted with the preview routes once directions are chosen.
 */

type Round = {
  id: string;
  title: string;
  blurb: string;
  concepts: { k: string; title: string; line: string; stat: string; warn?: string }[];
  rows: { file: string; n: string; name: string; content: string; takes: Record<string, string> }[];
};

const ROUNDS: Round[] = [
  {
    id: 'about',
    title: 'About page — sections 03 to 07',
    blurb: 'The hero and the section below it are approved and untouched. These five are the ones being replaced.',
    concepts: [
      { k: 'a', title: 'A · The room', line: 'The page is a place you move through', stat: '9.1 screens' },
      { k: 'b', title: 'B · The words', line: 'Typography is the visual event', stat: '7.8 screens', warn: 'largely type, little photography' },
      { k: 'c', title: 'C · The prints', line: 'Photographs are objects, not windows', stat: '6.4 screens' },
    ],
    rows: [
      {
        file: '', n: '03', name: 'Why we began',
        content: 'Three paragraphs. The middle is the founding premise — "Yoga is a vast tradition, and no single teacher can know everything."',
        takes: {
          a: 'A lit doorway far off in a dark wall grows 6× until you are standing inside it.',
          b: 'The founding sentence at viewport scale, a photograph of a roomful of teachers visible through the letterforms.',
          c: 'An enlargement at 3.5× you cannot place, then the pile it came from dealt around it.',
        },
      },
      {
        file: '', n: '04', name: 'Our Purpose',
        content: 'Connect · Learn · Collaborate · Grow, each with one line.',
        takes: {
          a: 'Four things at four distances. Grow breaks the recession because it is the far end you arrive at.',
          b: 'Each word scaled until all four fill the same measure. Grow lands largest by arithmetic.',
          c: 'Four mounted plates dealt left to right, each over the last. Grow the only one still whole.',
        },
      },
      {
        file: '', n: '05', name: 'Our Approach',
        content: '"…not intended to represent one particular school, lineage, organisation or methodology."',
        takes: {
          a: 'The held breath — the only stretch of the page with no photograph at all.',
          b: 'Two voices from one typeface: the refusal light and wide, the answer heavy and italic.',
          c: 'One picture cut from four. Four rooms, four widths, horizons refusing to line up.',
        },
      },
      {
        file: '', n: '06', name: 'Built by its members',
        content: 'Three lines about the community\'s strength coming from its members.',
        takes: {
          a: 'The room fills: three positions of the same place arriving overlapped at three depths.',
          b: 'The display line\'s baseline is the horizon; the sentence walks down into the crowd.',
          c: 'The whole table flat, nothing featured, the lines dealt in as cream cards.',
        },
      },
      {
        file: '', n: '07', name: 'Our Guiding Thought',
        content: '"Yoga is better when we learn together." One sentence, closing the page.',
        takes: {
          a: 'The cream is the light at the far end of the room, rising over everything.',
          b: 'The last word draws itself together as you descend.',
          c: 'The table cleared; the opening frame put back whole and crop-marked.',
        },
      },
    ],
  },
  {
    id: 'within',
    title: 'What Happens Within — the whole page',
    blurb: 'Four pillars with ~25 list items between them, then four Community Initiatives. A page that is mostly lists, which is exactly why the safe version failed.',
    concepts: [
      { k: 'a', title: 'A · Four rooms', line: 'The reader goes somewhere, four times', stat: '10.5 screens · 1.6 MB' },
      { k: 'b', title: 'B · Evidence', line: 'Show it happening, do not describe it', stat: '9.2 screens · 10.1 MB', warn: '6× the weight of the others — video in every arch' },
      { k: 'c', title: 'C · The dial', line: 'The page is a mandala, and you turn it', stat: '6.7 screens · 1.6 MB' },
    ],
    rows: [
      {
        file: 'w', n: '00', name: 'The opening',
        content: 'The page title and the four ideas introduced.',
        takes: {
          a: 'Four tall openings at four heights, the title carrying paper in front of them.',
          b: 'Four narrow windows hanging across the horizon, each showing the footage its section opens into.',
          c: 'The disc, quartered, with four gates on the rim and the hub carrying the name.',
        },
      },
      {
        file: 'w', n: '01', name: '01 Connect',
        content: '"The Yoga teaching profession can sometimes feel isolated." Five items.',
        takes: {
          a: 'Five plates arrive scattered across the hall and pack shoulder to shoulder — isolation is the start state, community the end state.',
          b: 'A tall arch with a silent loop drifting inside it; the items are chips straddling the aperture edge, half on photograph, half on paper.',
          c: 'The lit quadrant turns to Connect; its five items swing into the matching corner as a staggered register.',
        },
      },
      {
        file: 'w', n: '02', name: '02 Learn',
        content: '"Teaching Yoga is a lifelong learning journey." Seven items.',
        takes: {
          a: 'Seven items at display scale on a paper board standing in front of the class, occluding it.',
          b: 'The arch moves to the other side; the same chip mechanic, a different room.',
          c: 'The light and the clay arc turn 90°; the type never rotates.',
        },
      },
      {
        file: 'w', n: '03', name: '03 Collaborate',
        content: '"Some of the most meaningful opportunities emerge when teachers come together." Seven items.',
        takes: {
          a: 'Seven placards on seven wires, the deepest hanging in front of the panel photograph.',
          b: 'Third arch, third room, always-visible wall label naming what it shows and the day.',
          c: 'Third quadrant. The tightest case at 1024×768, where three items wrap.',
        },
      },
      {
        file: 'w', n: '04', name: '04 Share',
        content: '"The community is also a place to give back." Six items. NOT Grow.',
        takes: {
          a: 'Six steps walking across the floor toward a doorway, each reaching further.',
          b: 'Breaks the pattern into the only wide frame. The paper never returns.',
          c: 'The fourth turn completes the circle.',
        },
      },
      {
        file: 'w', n: '05', name: 'Community Initiatives',
        content: 'Learning Initiative · Curation & Learning Bulletin · Sangha · Pranava Vaakya. Two carry lists, two are prose.',
        takes: {
          a: 'Four notices of four sizes on a dissolved-photograph wall. Pranava Vaakya on a different material entirely.',
          b: 'The archive\'s one empty room as ground, the relationship inverted — evidence hung in the margin of the type.',
          c: 'The disc laid flat as a horizon; stepped registers, hairline domes, everything open at once — the opposite of the dial.',
        },
      },
    ],
  },
];

export const metadata = { title: 'Concepts — comparison' };

export default function ComparePage() {
  return (
    <main className="cmp">
      <header className="cmp__head">
        <h1>Competing concepts, section by section</h1>
        <p>
          Each row is one section. Each column is how that concept solved it. Captured at
          1440×900 from the live preview routes. Click any image for full size, or open a
          concept and scroll it properly — the differences that matter are in motion.
        </p>
      </header>

      {ROUNDS.map((r) => (
        <section key={r.id} className="cmp__round">
          <h2 className="cmp__roundTitle">{r.title}</h2>
          <p className="cmp__roundBlurb">{r.blurb}</p>

          <div className="cmp__legend">
            {r.concepts.map((c) => (
              <div key={c.k}>
                <b>
                  <a href={`/preview/${r.id}-${c.k}/`}>{c.title}</a>
                </b>
                <span>{c.line}</span>
                <i>{c.stat}</i>
                {c.warn ? <u>{c.warn}</u> : null}
              </div>
            ))}
          </div>

          {r.rows.map((row) => (
            <div className="cmp__row" key={row.n}>
              <div className="cmp__label">
                <p className="cmp__n">{row.n}</p>
                <h3>{row.name}</h3>
                <p className="cmp__content">{row.content}</p>
              </div>
              <div className="cmp__grid">
                {r.concepts.map((c) => (
                  <figure key={c.k}>
                    <a href={`/compare/${row.file}${c.k}-${row.n}.png`} target="_blank" rel="noreferrer">
                      <img
                        src={`/compare/${row.file}${c.k}-${row.n}.png`}
                        alt={`${r.title}, concept ${c.k.toUpperCase()}, ${row.name}`}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <b>{c.title}</b>
                      {row.takes[c.k]}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
