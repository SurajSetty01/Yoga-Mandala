# Praṇava — build plan for the seven remaining pages

Benchmark: the existing `/` and the finished Yoga Mandala pages. The rule that made those
work is the only rule that matters here — **every section needs its own visual idea.** Not a
picture beside a paragraph, repeated down the page.

Sources, in order of authority:
1. `Context/Pranava Website Blueprint.pdf` — the master spec. Page-by-page requirements (§6),
   visual direction (§8), voice (§10), and what is deliberately deferred (§20).
2. `Context/new/Pranava About Page.docx` — the About page in full, section by section.
3. `Context/new/Pranava Website.docx` — the conversion brief and navigation.

---

## The hard constraint: most programme content does not exist yet

The Blueprint's §16 "Content Required Before Launch" lists what is still outstanding. Checked
against what we actually have:

| Needed | Have? |
|---|---|
| Founder biography | **yes** — About doc §8 |
| Institutional introduction | **yes** — About doc §3, §4 |
| Values, approach, teaching method | **yes** — About doc §5, §6, §11 |
| Faculty biographies and portraits | **no** |
| Programme descriptions, schedules, fees | **no** — only the names exist |
| Testimonials | **no** |
| Upcoming events | **no** |
| Articles for Insights | **no** |
| Praṇava Svasthya service descriptions | **no** — only the four area names |

Programme names, from Blueprint §4.3: Pravesha · Pragraha · Prayatna · Praguna · Prabodha,
plus Prāṇāyāma-related programmes.

**Therefore: no invented fees, dates, durations, testimonials, faculty names or course
descriptions.** A previous build published "700+ teachers across India and abroad", which
appears in none of the client's material. Where content is missing the page says so plainly
and offers the enquiry route — which is also what the brief asks for ("only current offerings
should be displayed").

This shapes the designs: Learn and Practice are built as *structures* with real named
programmes and honest empty states, not as fake catalogues.

---

## Media

1,211 new images and 256 clips in `Context/new/`, **none encoded yet**. Nothing can be built
properly until a usable subset exists.

- `Prabodha TTC Photos` — 876 frames at 1620×1080. Teacher training: study, correction,
  discussion. The natural source for **Learn**. Resolution caps them: good to ~1600 wide,
  never a 2560 full-bleed.
- `Prabhava Photos` — 343 images, 308 of them HEIC at **3024×4032**, plus 256 MOV at
  1920×1080. The best material; the only source for hero-scale stills and for motion.
- `pranavayogaphotos` — 6 frames, 3264×4352 and larger.

---

## Pages, sections, and the visual idea for each

Every section below names a *mechanic*, not a layout. If a section cannot be described as
something that happens, it is not designed yet.

### 1. About — `/about/`
Blueprint §6: institutional story → vision/mission → teaching philosophy → values → founder →
faculty → approach → CTA. Full content in the About document.

| # | Section | Content source | Visual idea |
|---|---|---|---|
| 01 | Hero | About §2 | Praṇav teaching with students visible — not a portrait |
| 02 | Introduction | About §3 | five lines that widen as they descend |
| 03 | What is Praṇava | About §4 | "A place to learn. A place to practise. A place to grow." as three apertures |
| 04 | Our Approach | About §5 | Tradition · Practice · Inquiry · Transmission — four, and the fourth breaks the pattern |
| 05 | How We Teach | About §6 | eight practices as a descending stair, not a bulleted list |
| 06 | The Praṇava Journey | About §7 | the four doors: Learn · Practice · Heal · Insights |
| 07 | Founder | About §8 | biography with the pull-quote as the visual event |
| 08 | Faculty | About §9 | **no names yet** — the idea of shared teaching, honestly empty |
| 09 | Praṇava & Seva | About §10 | the Trust, and Yoga Mandala as one initiative under it |
| 10 | What We Value | About §11 | Sādhana · Adhyayana · Viveka · Sevā — Devanagari-adjacent treatment |
| 11 | Closing | About §12 | "Begin where you are." + two routes |

### 2. Learn — `/learn/`
Blueprint §6: structured learning → categories → current programmes → how to choose → FAQs →
enquiry. Journey intent: *"I want structured education."*

| # | Section | Visual idea |
|---|---|---|
| 01 | Hero | teacher education, study, correction — from the TTC archive |
| 02 | What structured learning means | the difference between collecting techniques and study |
| 03 | Programme categories | teacher education · continuing education · workshops · intensives · study |
| 04 | The named programmes | Pravesha · Pragraha · Prayatna · Praguna · Prabodha, names only, honestly |
| 05 | How to choose | a question-led path rather than a comparison table |
| 06 | Enquire | routed, not a dead end |

### 3. Practice — `/practice/`
Blueprint §6: ongoing Sādhana → regular practice → Prayatna → Prāṇāyāma → retreats → enquiry.
Journey intent: *"I want consistent Sādhana."*

| # | Section | Visual idea |
|---|---|---|
| 01 | Hero | sustained practice, not performance |
| 02 | Why sustained practice | consistency over intensity — motion that repeats |
| 03 | Regular practice | what a week actually looks like |
| 04 | Prāṇāyāma | breath as the section's own mechanic |
| 05 | Retreats and immersions | duration made visible |
| 06 | Enquire | |

### 4. Heal — `/heal/`
Blueprint §6 names four areas: Yoga Therapy · Ayurveda · Nutrition · Women's Wellness, under
Praṇava Svasthya. The Website brief §7 is explicit: **a simple page saying the area is being
developed.** Designed, not empty — but it must not pretend to offer what has no description.

### 5. Insights — `/insights/`
Website brief §7: **writings and resources will be added here.** No articles exist. The page
is the promise of a journal, made properly — not a fake article grid.

### 6. Events — `/events/`
Blueprint §6: upcoming events → details → registration → past events later. **No events
supplied.** An honest calendar with a real enquiry route.

### 7. Enquire — `/contact/`
Blueprint §6: contact routes → enquiry form → location/mode → social → FAQs. This page EXISTS
and is good — eight photographic doorways. It is a **rewrite for Praṇava-wide enquiries**, not
a rebuild. Keep the doorways; change who they route to.
Blocked facts: no postal address, no email addresses. Both must render as nothing.

---

## Order of work

1. Media pipeline — audit, select, encode. Everything else waits on it.
2. Content extraction into `content/copy.ts`, so `npm run check:copy` can verify every
   client sentence is verbatim.
3. About (the only page with complete content) — sets the pattern.
4. Learn, Practice — structures with honest empty states.
5. Heal, Insights, Events — designed placeholders, per the brief.
6. Enquire — rewrite of the existing page.
7. Full visual review of all seven, then refine until no section reads as generic.
