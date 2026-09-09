/**
 * Contrast check for IMAGE-FILLED TYPE (`background-clip: text` with a transparent fill).
 *
 * The general probe cannot measure this. It models text as one colour over a background and
 * hides the text to sample what is underneath — but here the glyph's "colour" is a
 * photograph, `color: transparent` does not hide it, and the result is a phantom ~1:1 fail.
 *
 * The correct model is the other way round: the GLYPH is the picture and the BACKGROUND is
 * the section's ground. So this renders the word twice —
 *
 *   1. normally, with the photograph clipped into the letterforms
 *   2. with `background-image: none`, so the glyphs paint nothing and the ground shows
 *
 * The pixels that differ are exactly the glyph coverage. Antialiased edges are dropped
 * (they are partial coverage, not letterform), and each surviving pixel is compared against
 * the ground colour sampled from pass 2 at that same coordinate.
 *
 * Reports the 5th percentile rather than the single worst pixel: one dark pixel inside a
 * 500px letter is not the same as a word being unreadable. Also reports mean saturation,
 * because the whole point of this treatment is that the picture stays vivid — a word that
 * passes by being washed to near-white has failed at the thing it was for.
 *
 *   node tools/check-image-text.mjs <url> <selector> [--width 1440] [--height 900] [--need 3]
 */
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); if (i === -1) return d; const v = argv[i + 1]; argv.splice(i, 2); return v; };
const width = +flag('--width', 1440);
const height = +flag('--height', 900);
const need = +flag('--need', 3);          // image-filled display type is always "large text"
const [url, selector] = argv;

if (!url || !selector) {
  console.error('usage: node tools/check-image-text.mjs <url> <selector> [--width] [--height] [--need]');
  process.exit(2);
}

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
await page.waitForTimeout(2500);

// walk the page so lazy images load and reveals fire, then bring the word into view
const docH = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < docH; y += 600) {
  await page.evaluate((t) => scrollTo({ top: t, behavior: 'instant' }), y);
  await page.waitForTimeout(140);
}
const target = await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  return Math.round(el.getBoundingClientRect().top + scrollY - 140);
}, selector);
if (target === null) { console.error(`no element matches "${selector}"`); await browser.close(); process.exit(2); }
await page.evaluate((t) => scrollTo({ top: t, behavior: 'instant' }), target);
await page.waitForTimeout(2500);

const box = await page.evaluate((sel) => {
  const r = document.querySelector(sel).getBoundingClientRect();
  return { x: Math.max(0, Math.floor(r.x)), y: Math.max(0, Math.floor(r.y)), w: Math.ceil(r.width), h: Math.ceil(r.height) };
}, selector);

const painted = PNG.sync.read(await page.screenshot());
await page.addStyleTag({ content: `${selector}{background-image:none!important;}` });
await page.waitForTimeout(500);
const bare = PNG.sync.read(await page.screenshot());

/**
 * The antialiasing threshold has to ADAPT to the fill.
 *
 * A fixed cut-off assumes a bright glyph on a dark ground, where a fully covered pixel
 * differs from the ground by a lot. But a fill deliberately floored to mid-grey — the way an
 * image-in-text treatment guarantees its contrast — has a small maximum difference to begin
 * with, so a fixed cut-off admits half-covered EDGE pixels. Those are darker than any real
 * glyph core, they dominate the 5th percentile, and the word gets reported as failing when
 * every pixel a reader actually sees is fine.
 *
 * So: find the largest difference anywhere in the box, and count a pixel as glyph core only
 * if it reaches 70% of it. That is the same rule at every fill brightness.
 */
const diffs = [];
for (let y = box.y; y < Math.min(painted.height, box.y + box.h); y++) {
  for (let x = box.x; x < Math.min(painted.width, box.x + box.w); x++) {
    const i = (painted.width * y + x) << 2;
    diffs.push(
      Math.abs(painted.data[i] - bare.data[i]) +
      Math.abs(painted.data[i + 1] - bare.data[i + 1]) +
      Math.abs(painted.data[i + 2] - bare.data[i + 2])
    );
  }
}
diffs.sort((a, b) => b - a);
const peak = diffs[Math.floor(diffs.length * 0.002)] ?? 0;   // robust max, ignoring stray pixels
const cut = Math.max(60, peak * 0.7);

const ratios = [];
let sat = 0, n = 0;
for (let y = box.y; y < Math.min(painted.height, box.y + box.h); y++) {
  for (let x = box.x; x < Math.min(painted.width, box.x + box.w); x++) {
    const i = (painted.width * y + x) << 2;
    const fg = [painted.data[i], painted.data[i + 1], painted.data[i + 2]];
    const bg = [bare.data[i], bare.data[i + 1], bare.data[i + 2]];
    const d = Math.abs(fg[0] - bg[0]) + Math.abs(fg[1] - bg[1]) + Math.abs(fg[2] - bg[2]);
    if (d < cut) continue;                      // ground, or a partially covered edge
    ratios.push(ratio(fg, bg));
    const mx = Math.max(...fg), mn = Math.min(...fg);
    if (mx > 0) { sat += (mx - mn) / mx; n++; }
  }
}

if (ratios.length < 50) {
  console.error('almost nothing painted — is the selector right, and did the image load?');
  await browser.close();
  process.exit(2);
}

ratios.sort((a, b) => a - b);
const p5 = ratios[Math.floor(ratios.length * 0.05)];
const median = ratios[Math.floor(ratios.length * 0.5)];
const ok = p5 >= need;

console.log(
  `${ok ? 'PASS' : 'FAIL'}  ${width}x${height}  "${selector}"\n` +
  `   glyph vs ground : p5 ${p5.toFixed(2)}:1   median ${median.toFixed(2)}:1   (need ${need})\n` +
  `   vividness       : mean saturation ${(sat / n).toFixed(3)}  over ${ratios.length.toLocaleString()} glyph pixels`
);

await browser.close();
process.exitCode = ok ? 0 : 1;
