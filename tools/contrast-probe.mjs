/**
 * Rendered-pixel contrast probe — glyph-accurate.
 *
 * CSS colour values are meaningless for text sitting over a photograph: the background is
 * whatever the image happens to be under that glyph, after the scrim. So this measures the
 * composited pixels for real.
 *
 * The naive version of this — hide the text, then sample the worst pixel in the element's
 * bounding box — OVERSTATES failures badly. A bounding box includes the gaps between letters,
 * the space above the x-height and below the baseline, and the trailing run to the end of the
 * line. A bright highlight sitting in a gap that no glyph ever touches gets reported as a
 * contrast failure that no reader could ever experience.
 *
 * So instead:
 *   1. screenshot with the text painted            → A
 *   2. screenshot with the same text transparent   → B
 *   3. the glyph mask is where A and B differ; those are the only pixels a reader sees text on
 *   4. sample B at exactly those coordinates
 *
 * Antialiased glyph edges are excluded (they are partial coverage, not text), and the result
 * reports both the single worst pixel and the 5th percentile, because one stray pixel under a
 * serif is not the same as a whole word being unreadable.
 *
 *   node tools/contrast-probe.mjs <url> [--width 1440] [--height 900] [selector ...]
 */
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = argv.indexOf(name);
  if (i === -1) return dflt;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};
const width = +flag('--width', 1440);
const height = +flag('--height', 900);
/**
 * --scroll-to <selector>  measure a section that is not in the fold.
 * Without it this only ever samples scroll position 0, which silently means most of a long
 * page is never measured at all — a page can report 0 FAIL while a section below the fold
 * is unreadable.
 * --settle <ms>  extra wait after scrolling, for sections whose fill or reveal animates in.
 */
const scrollTo = flag('--scroll-to', null);
const settle = +flag('--settle', 2200);
const [url, ...rest] = argv;
const SELECTORS = rest.length ? rest : ['h1', 'h2', 'p', 'a', 'button', 'li', 'span', 'em', 'figcaption'];

const lum = (r, g, b) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const l1 = lum(...a), l2 = lum(...b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(3200);

if (scrollTo) {
  // Walk the whole page first so lazy images have loaded and scroll-driven reveals have
  // fired; a section measured before its own images arrive reports the ground, not the design.
  const docH = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < docH; y += 600) {
    await page.evaluate((t) => scrollTo({ top: t, behavior: 'instant' }), y);
    await page.waitForTimeout(140);
  }
  const target = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    // land the section's top just under the fixed navigation rather than at y=0
    return Math.round(r.top + scrollY - 110);
  }, scrollTo);
  if (target === null) {
    console.error(`--scroll-to: no element matches "${scrollTo}"`);
    await browser.close();
    process.exit(2);
  }
  await page.evaluate((t) => scrollTo({ top: t, behavior: 'instant' }), target);
  await page.waitForTimeout(settle);
}

/** Only leaf text elements: a <p> wrapping three <span>s would otherwise be measured twice,
 *  and its box would span all of them including whatever sits between. */
const targets = await page.evaluate((sels) => {
  const seen = new Set();
  const out = [];
  for (const sel of sels) {
    for (const el of document.querySelectorAll(sel)) {
      if (seen.has(el)) continue;
      const ownText = [...el.childNodes]
        .filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
      if (!ownText) continue;                    // container, not a leaf — skip
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width < 8 || r.height < 6) continue;
      if (r.top > innerHeight || r.bottom < 0) continue;
      if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      // Visually-hidden accessible labels are not seen by anyone and have no contrast to fail.
      if (r.width <= 1 || r.height <= 1) continue;
      if (cs.clipPath === 'inset(50%)' || cs.clip === 'rect(0px, 0px, 0px, 0px)') continue;
      /**
       * Image-filled type (`background-clip: text` + a transparent text fill) cannot be
       * measured by this method at all: the glyph's colour is a photograph, not a value,
       * and setting `color: transparent` does not hide it, so the painted/unpainted diff
       * is meaningless and the element reports a phantom ~1:1 failure.
       * Skip it here and measure it with tools/check-image-text.mjs, which compares the
       * painted glyph pixels against the ground behind them.
       */
      const clip = cs.webkitBackgroundClip || cs.backgroundClip;
      const fill = cs.webkitTextFillColor || '';
      if (clip === 'text' && /transparent|rgba\(0, 0, 0, 0\)/.test(fill)) continue;
      seen.add(el);
      const size = parseFloat(cs.fontSize);
      const weight = +cs.fontWeight || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      out.push({
        sel, text: ownText.slice(0, 40), size: +size.toFixed(1), large,
        need: large ? 3.0 : 4.5, color: cs.color,
        box: { x: Math.floor(r.x), y: Math.floor(r.y), w: Math.ceil(r.width), h: Math.ceil(r.height) },
      });
    }
  }
  return out;
}, SELECTORS);

const withText = PNG.sync.read(await page.screenshot());
const hide = targets.map((t) => t.sel).join(',');
await page.addStyleTag({ content: `${hide}{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;}` });
await page.waitForTimeout(400);
const noText = PNG.sync.read(await page.screenshot());

const parse = (c) => c.match(/[\d.]+/g).slice(0, 3).map(Number);
const results = [];

for (const t of targets) {
  const fg = parse(t.color);
  const samples = [];
  const { x, y, w, h } = t.box;
  for (let py = Math.max(0, y); py < Math.min(noText.height, y + h); py++) {
    for (let px = Math.max(0, x); px < Math.min(noText.width, x + w); px++) {
      const i = (noText.width * py + px) << 2;
      const dr = Math.abs(withText.data[i] - noText.data[i]);
      const dg = Math.abs(withText.data[i + 1] - noText.data[i + 1]);
      const db = Math.abs(withText.data[i + 2] - noText.data[i + 2]);
      // A strong difference means a glyph core covered this pixel. A weak one is an
      // antialiased edge, which is partial coverage and not what a reader reads.
      if (dr + dg + db < 90) continue;
      samples.push(ratio(fg, [noText.data[i], noText.data[i + 1], noText.data[i + 2]]));
    }
  }
  if (samples.length < 12) continue;             // nothing actually painted here
  samples.sort((a, b) => a - b);
  results.push({
    ...t,
    worst: +samples[0].toFixed(2),
    p5: +samples[Math.floor(samples.length * 0.05)].toFixed(2),
    px: samples.length,
  });
}

/**
 * De-duplicate the "two complementary copies" technique.
 *
 * A headline can be rendered twice — say cream-on-dark and ink-on-cream — with each copy
 * clipped so only one is ever visible at a given scroll position. Measured naively the hidden
 * copy scores ~1:1 against its own ground and reports a false failure. Same text in the same
 * place is one thing to the reader, so keep the best-scoring copy.
 */
const byIdentity = new Map();
for (const r of results) {
  const key = `${r.text}@${Math.round(r.box.x / 8)},${Math.round(r.box.y / 8)}`;
  const prev = byIdentity.get(key);
  if (!prev || r.p5 > prev.p5) byIdentity.set(key, r);
}
results.length = 0;
results.push(...byIdentity.values());

results.sort((a, b) => a.p5 - b.p5);
let fails = 0;
for (const r of results) {
  const ok = r.p5 >= r.need;
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  p5 ${String(r.p5).padStart(6)}:1  worst ${String(r.worst).padStart(6)}:1  ` +
    `need ${r.need}  ${String(r.size).padStart(5)}px${r.large ? ' lg' : '   '}  "${r.text}"`
  );
}
console.log(`\n${results.length} painted text runs sampled at ${width}x${height} — ${fails} FAIL (judged on p5)`);
await browser.close();
process.exitCode = fails ? 1 : 0;
