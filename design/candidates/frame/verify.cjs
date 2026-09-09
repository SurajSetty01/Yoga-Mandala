/* ═══════════════════════════════════════════════════════════════════════════
   VERIFICATION for the FRAME candidate.  NOT part of the page — index.html
   loads only frame.css and frame.js.

     node verify.cjs           (from this folder; needs the live server on 4321)

   One Chromium at a time, contexts closed promptly: this machine has OOM-killed
   itself on this project. Contrast is measured from RENDERED PIXELS — the text
   is hidden, its own box is screenshotted, and the worst-luminance pixel in it
   is taken as the ground — rather than from what the CSS claims.
   ═══════════════════════════════════════════════════════════════════════════ */
const { chromium } = require(require('path').resolve(__dirname, '../../../node_modules/playwright'));
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const URL = 'http://localhost:4321/candidates/frame/';
const OUT = process.argv[2] || path.join(require('os').tmpdir(), 'frame-shots');
fs.mkdirSync(OUT, { recursive: true });

/* ---------- minimal PNG reader (8-bit RGB/RGBA, non-interlaced) ---------- */
function decodePNG(buf) {
  let p = 8, w = 0, h = 0, bitDepth = 8, colorType = 6, idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    const data = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    p += 12 + len;
  }
  if (bitDepth !== 8) throw new Error('bitDepth ' + bitDepth);
  const ch = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : null;
  if (!ch) throw new Error('colorType ' + colorType);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * ch;
  const out = Buffer.alloc(h * stride);
  let ptr = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[ptr++];
    const line = raw.subarray(ptr, ptr + stride); ptr += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= ch ? prev[x - ch] : 0;
      let v = line[x];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) {
        const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
        v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      }
      cur[x] = v & 255;
    }
  }
  return { w, h, ch, data: out };
}
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

/* worst-case (highest and lowest luminance) pixel inside a PNG buffer */
function extremes(buf) {
  const im = decodePNG(buf);
  let mx = -1, mn = 2, mxc = null, mnc = null;
  for (let i = 0; i < im.w * im.h; i++) {
    const o = i * im.ch;
    const L = lum(im.data[o], im.data[o + 1], im.data[o + 2]);
    if (L > mx) { mx = L; mxc = [im.data[o], im.data[o + 1], im.data[o + 2]]; }
    if (L < mn) { mn = L; mnc = [im.data[o], im.data[o + 1], im.data[o + 2]]; }
  }
  return { max: mx, min: mn, maxColor: mxc, minColor: mnc };
}
function parseColor(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const n = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
  return { r: n[0], g: n[1], b: n[2] };
}

const problems = [];
const notes = [];
const ok = (cond, msg) => { (cond ? notes : problems).push((cond ? 'PASS  ' : 'FAIL  ') + msg); };

(async () => {
  const browser = await chromium.launch();
  const errs = [];
  const failedReq = [];

  async function newPage(opts = {}) {
    const ctx = await browser.newContext(Object.assign({ deviceScaleFactor: 1 }, opts));
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push('[' + m.type() + '] ' + m.text()); });
    page.on('pageerror', e => errs.push('[pageerror] ' + e.message));
    page.on('requestfailed', r => failedReq.push(r.url() + ' :: ' + (r.failure() && r.failure().errorText)));
    page.on('response', r => { if (r.status() >= 400) failedReq.push(r.url() + ' :: HTTP ' + r.status()); });
    return { ctx, page };
  }

  async function setP(page, target) {
    // drive the real scroll position, never a fake progress value
    const y = await page.evaluate((t) => {
      const hero = document.getElementById('hero'), pin = document.getElementById('pin');
      const top = hero.getBoundingClientRect().top + window.scrollY;
      const range = hero.offsetHeight - pin.offsetHeight;
      return Math.round(top + range * t);
    }, target);
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(260);
  }

  /* ══════════ DESKTOP 1440x900 ══════════ */
  {
    const { ctx, page } = await newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      await setP(page, t);
      await page.screenshot({ path: path.join(OUT, `d-${String(Math.round(t * 100)).padStart(3, '0')}.png`) });
    }
    // the section that follows
    await page.evaluate(() => window.scrollTo(0, document.querySelector('.four').getBoundingClientRect().top + window.scrollY - 40));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, 'd-four.png') });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    /* structure */
    const audit = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img')];
      return {
        h1: document.querySelectorAll('h1').length,
        h1text: (document.querySelector('h1') || {}).textContent,
        noAlt: imgs.filter(i => !i.alt || !i.alt.trim()).map(i => i.currentSrc || i.src),
        broken: imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src),
        imgSrcs: imgs.map(i => ({ src: i.currentSrc, nw: i.naturalWidth, nh: i.naturalHeight, box: i.getBoundingClientRect().width + 'x' + Math.round(i.getBoundingClientRect().height) })),
        video: (() => { const v = document.getElementById('vid'); return { src: v.currentSrc, on: v.dataset.on, muted: v.muted, loop: v.loop, playsinline: v.hasAttribute('playsinline'), poster: !!v.poster, paused: v.paused, rs: v.readyState }; })(),
        stage: (() => { const r = document.getElementById('stage').getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), ratio: +(r.width / r.height).toFixed(2), x: Math.round(r.x), y: Math.round(r.y) }; })(),
        coverage: (() => { const r = document.getElementById('stage').getBoundingClientRect(); return +((r.width * r.height) / (innerWidth * innerHeight) * 100).toFixed(1); })(),
      };
    });
    ok(audit.h1 === 1, 'exactly one <h1> (found ' + audit.h1 + '): "' + (audit.h1text || '').replace(/\s+/g, ' ') + '"');
    ok(audit.noAlt.length === 0, 'every <img> has alt' + (audit.noAlt.length ? ' — missing: ' + audit.noAlt.join(', ') : ''));
    ok(audit.broken.length === 0, 'every <img> actually decoded' + (audit.broken.length ? ' — broken: ' + audit.broken.join(', ') : ''));
    ok(audit.video.on === '1' && !audit.video.paused, 'hero loop is playing (src=' + audit.video.src + ' paused=' + audit.video.paused + ')');
    ok(audit.video.muted && audit.video.loop && audit.video.playsinline && audit.video.poster, 'video muted+loop+playsinline+poster');
    notes.push('INFO  desktop plate ' + audit.stage.w + 'x' + audit.stage.h + ' = ' + audit.stage.ratio + ':1 at load; covers ' + audit.coverage + '% of the viewport');
    notes.push('INFO  images: ' + JSON.stringify(audit.imgSrcs));

    /* CONTRAST: measure the real rendered ground under each text block by
       hiding the text and reading the worst-case pixel in its own box. */
    async function groundUnderScrolled(pg, sel, label, t) {
      const box = await pg.evaluate((s) => {
        const el = document.querySelector(s); if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(r.width, innerWidth - r.x), height: Math.min(r.height, innerHeight - r.y) };
      }, sel);
      if (!box || box.width < 2 || box.height < 2) { problems.push('FAIL  contrast: no box for ' + sel); return; }
      const col = await pg.evaluate(s => getComputedStyle(document.querySelector(s)).color, sel);
      await pg.addStyleTag({ content: `${sel}{visibility:hidden!important}` });
      await pg.waitForTimeout(120);
      const shot = await pg.screenshot({ clip: box });
      const ext = extremes(shot);
      const c = parseColor(col);
      const Lt = lum(c.r, c.g, c.b);
      const worst = Math.min(contrast(Lt, ext.max), contrast(Lt, ext.min));
      ok(worst >= 4.5, `contrast ${label}: ${worst.toFixed(2)}:1 (text ${col}, worst ground rgb(${ext.maxColor}) / rgb(${ext.minColor}))`);
      await pg.reload({ waitUntil: 'networkidle' });
      await pg.waitForTimeout(700);
    }

    async function groundUnder(sel, label, textColorSel) {
      const box = await page.evaluate((s) => {
        const el = document.querySelector(s); if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(r.width, innerWidth - r.x), height: Math.min(r.height, innerHeight - r.y) };
      }, sel);
      if (!box || box.width < 2 || box.height < 2) { problems.push('FAIL  contrast: no box for ' + sel); return; }
      const col = await page.evaluate(s => getComputedStyle(document.querySelector(s)).color, textColorSel || sel);
      await page.addStyleTag({ content: `${sel}{visibility:hidden!important}` });
      await page.waitForTimeout(120);
      const shot = await page.screenshot({ clip: box });
      const ext = extremes(shot);
      const c = parseColor(col);
      const Ltext = lum(c.r, c.g, c.b);
      const worst = Math.min(contrast(Ltext, ext.max), contrast(Ltext, ext.min));
      ok(worst >= 4.5, `contrast ${label}: ${worst.toFixed(2)}:1 (text ${col}, worst ground rgb(${ext.maxColor}) / rgb(${ext.minColor}))`);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(700);
    }
    await groundUnder('.type--light h1', 'headline on the plinth (p=0)');
    await groundUnder('.type--light .eyebrow', 'eyebrow on the plinth (p=0)');
    await groundUnder('.foot .lede', 'lede on the mat');
    await groundUnder('.mast__mark', 'wordmark on the mat');

    // headline in its ink state, mid-scroll
    await setP(page, 1);
    await groundUnderScrolled(page, '.type--dark .h1x', 'headline in ink on the mat (p=1)', 1);
    await setP(page, 1);
    await groundUnderScrolled(page, '.type--dark .eyebrow', 'eyebrow in ink on the mat (p=1)', 1);

    /* buttons */
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const btn = await page.evaluate(() => {
      const b = document.querySelector('.foot .btn--solid');
      const cs = getComputedStyle(b);
      return { color: cs.color, bg: cs.backgroundColor, r: b.getBoundingClientRect() };
    });
    {
      const c = parseColor(btn.color), b = parseColor(btn.bg);
      const cr = contrast(lum(c.r, c.g, c.b), lum(b.r, b.g, b.b));
      ok(cr >= 4.5, 'contrast primary button label: ' + cr.toFixed(2) + ':1');
    }

    /* the caption panel must be gone, not a black remnant strip, by the end */
    {
      await setP(page, 1);
      const r = await page.evaluate(() => {
        const cs = getComputedStyle(document.getElementById('pin'));
        return { o: +getComputedStyle(document.querySelector('.plinth')).opacity, cb: cs.getPropertyValue('--cb').trim() };
      });
      ok(r.o < 0.02, 'the caption panel is fully consumed at the end of the scroll (opacity ' + r.o + ')');
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    }

    /* THE HEADER-OVER-A-PHOTOGRAPH TRAP: sweep the whole scroll and assert the
       bar never sits transparent over the picture. */
    {
      const sweep = await page.evaluate(async () => {
        const out = [];
        const stage = document.getElementById('stage');
        const mast = document.getElementById('mast');
        const H = document.body.scrollHeight;
        for (let y = 0; y < H - innerHeight; y += 60) {
          window.scrollTo(0, y);
          await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
          const m = mast.getBoundingClientRect();
          const s = stage.getBoundingClientRect();
          const overPicture = m.bottom > s.top + 2 && m.top < s.bottom - 2;
          const cs = getComputedStyle(mast);
          const transparent = cs.backgroundColor === 'rgba(0, 0, 0, 0)';
          const hidden = mast.dataset.hidden === '1';
          if (overPicture && transparent && !hidden) out.push({ y, state: mast.dataset.state, bg: cs.backgroundColor });
        }
        window.scrollTo(0, 0);
        return out;
      });
      ok(sweep.length === 0, 'the masthead never sits transparent over the picture across the whole scroll' + (sweep.length ? ' — ' + JSON.stringify(sweep.slice(0, 4)) : ''));
    }

    /* and when the pill IS over the picture, measure it rather than trust it */
    {
      await page.evaluate(() => {
        const f = document.querySelector('.four').getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, f - 300);
      });
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollBy(0, -40));   /* scroll up so it returns */
      await page.waitForTimeout(900);
      const st = await page.evaluate(() => {
        const m = document.getElementById('mast');
        const r = m.getBoundingClientRect();
        const s = document.getElementById('stage').getBoundingClientRect();
        return { state: m.dataset.state, hidden: m.dataset.hidden, over: r.top < s.bottom && r.bottom > s.top };
      });
      if (st.state === 'pill' && st.hidden !== '1' && st.over) {
        await groundUnderScrolled(page, '.mast__mark', 'wordmark on the glass pill, over the picture', 1);
      } else {
        notes.push('INFO  pill/picture overlap not reproduced in this pass (' + JSON.stringify(st) + ')');
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    }

    /* the inverted pill, over the reversed-out section */
    {
      await page.evaluate(() => {
        const f = document.querySelector('.four').getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, f + 200);
      });
      await page.waitForTimeout(400);
      await page.evaluate(() => window.scrollBy(0, -50));
      await page.waitForTimeout(900);
      const st = await page.evaluate(() => ({ dark: document.getElementById('mast').dataset.dark, hidden: document.getElementById('mast').dataset.hidden }));
      if (st.dark === '1' && st.hidden !== '1') await groundUnderScrolled(page, '.mast__mark', 'wordmark on the inverted pill over the dark section', 1);
      else notes.push('INFO  inverted pill not reproduced (' + JSON.stringify(st) + ')');
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    }

    /* type scale in the section that follows (a .four p selector once ate this) */
    {
      const t = await page.evaluate(() => {
        const l = document.querySelector('.four__lead');
        return { lead: parseFloat(getComputedStyle(l).fontSize), body: parseFloat(getComputedStyle(document.querySelector('.four__list p')).fontSize) };
      });
      ok(t.lead > 28, 'the section lead keeps its display size (' + t.lead + 'px vs body ' + t.body + 'px)');
    }

    /* the hover fill must be legible too — a clay that looks right at 3.9:1 is
       the easy mistake here, so the hover ground is a darkened clay. */
    {
      const h = await page.evaluate(() => {
        const b = document.querySelector('.foot .btn--solid');
        return { label: getComputedStyle(b).color, hover: getComputedStyle(b, '::before').backgroundColor };
      });
      const c = parseColor(h.label), g = parseColor(h.hover);
      const cr = contrast(lum(c.r, c.g, c.b), lum(g.r, g.g, g.b));
      ok(cr >= 4.5, 'contrast primary button label on its HOVER fill: ' + cr.toFixed(2) + ':1 (' + h.hover + ')');
    }

    /* 60fps through the reshape — the whole thesis rests on this being smooth */
    {
      /* warm once so first-decode of the second plate is not counted as a
         dropped frame, then measure */
      await page.evaluate(() => window.scrollTo(0, innerHeight));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      const fr = await page.evaluate(() => new Promise(res => {
        const d = []; let last = performance.now(), n = 0;
        function step(t) {
          d.push(t - last); last = t; window.scrollBy(0, 10);
          if (++n < 150) requestAnimationFrame(step);
          else { const s = d.slice(5).sort((a, b) => a - b); res({ median: +s[s.length >> 1].toFixed(2), p95: +s[Math.floor(s.length * .95)].toFixed(2), max: +s[s.length - 1].toFixed(2), over20: s.filter(x => x > 20).length, n: s.length }); }
        }
        requestAnimationFrame(step);
      }));
      ok(fr.p95 <= 18 && fr.over20 <= 2, 'scroll through the reshape holds 60fps (median ' + fr.median + 'ms, p95 ' + fr.p95 + 'ms, max ' + fr.max + 'ms, ' + fr.over20 + ' frames over 20ms)');
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    }

    /* focus states */
    await page.locator('.mast__mark').focus();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(220);
    await page.screenshot({ path: path.join(OUT, 'd-focus-nav.png') });
    const fo = await page.evaluate(() => {
      const a = document.activeElement;
      const cs = getComputedStyle(a);
      return { tag: a.tagName, txt: (a.textContent || '').trim().slice(0, 30), outline: cs.outlineWidth + ' ' + cs.outlineStyle + ' ' + cs.outlineColor };
    });
    ok(/px/.test(fo.outline) && !/none/.test(fo.outline) && parseFloat(fo.outline) > 0, 'visible focus ring on ' + fo.tag + ' "' + fo.txt + '" → ' + fo.outline);

    /* hover on the primary CTA */
    await page.hover('.foot .btn--solid');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, 'd-hover-cta.png'), clip: { x: 40, y: 900 - 200, width: 700, height: 190 } });

    await ctx.close();
  }

  /* ══════════ MOBILE 390x844 ══════════ */
  {
    const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    for (const t of [0, 0.35, 0.7, 1]) {
      await setP(page, t);
      await page.screenshot({ path: path.join(OUT, `m-${String(Math.round(t * 100)).padStart(3, '0')}.png`) });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const m = await page.evaluate(() => {
      const r = document.getElementById('stage').getBoundingClientRect();
      const img = document.getElementById('still');
      return {
        ratio: +(r.width / r.height).toFixed(2), w: Math.round(r.width), h: Math.round(r.height),
        src: img.currentSrc, alt: img.alt,
        vidSrc: document.getElementById('vid').currentSrc,
        coverage: +((r.width * r.height) / (innerWidth * innerHeight) * 100).toFixed(1)
      };
    });
    notes.push('INFO  mobile portal ' + m.w + 'x' + m.h + ' = ' + m.ratio + ':1, covers ' + m.coverage + '%; src=' + m.src);
    ok(/dsc07120/.test(m.src), 'mobile uses the portrait art direction');
    ok(/palms together/.test(m.alt), 'mobile alt matches the picture shown');
    ok(!m.vidSrc, 'no video fetched on the narrow viewport');

    // mobile menu
    await page.click('#burger');
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, 'm-menu.png') });
    const menu = await page.evaluate(() => {
      const s = document.getElementById('sheet');
      const a = s.querySelector('a');
      return { hidden: s.hidden, open: s.dataset.open, expanded: document.getElementById('burger').getAttribute('aria-expanded'), linkVisible: a.getBoundingClientRect().height > 10 && a.getBoundingClientRect().top > 0, focus: document.activeElement.textContent.trim() };
    });
    ok(menu.open === '1' && menu.expanded === 'true' && menu.linkVisible, 'mobile menu opens with visible links (focus moved to "' + menu.focus + '")');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(700);
    const closed = await page.evaluate(() => document.getElementById('burger').getAttribute('aria-expanded'));
    ok(closed === 'false', 'Escape closes the mobile menu');
    await ctx.close();
  }

  /* ══════════ REDUCED MOTION ══════════ */
  {
    const { ctx, page } = await newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT, 'rm-desktop.png') });
    const rm = await page.evaluate(() => {
      const pin = document.getElementById('pin');
      const cs = getComputedStyle(pin);
      const v = document.getElementById('vid');
      const stage = document.getElementById('stage').getBoundingClientRect();
      const cb = parseFloat(cs.getPropertyValue('--cb'));
      const inset = document.getElementById('inset');
      const ir = inset.getBoundingClientRect();
      return {
        p: cs.getPropertyValue('--p').trim(), cb: cb,
        apertureH: Math.round(stage.height - cb - parseFloat(cs.getPropertyValue('--ct'))),
        apertureRatio: +(stage.width / (stage.height - cb - parseFloat(cs.getPropertyValue('--ct')))).toFixed(2),
        videoSrc: v.currentSrc, videoPaused: v.paused,
        insetOpacity: +getComputedStyle(inset).opacity,
        insetOnScreen: ir.top > 0 && ir.bottom < innerHeight + 2,
        h1Visible: (() => { const h = document.querySelector('h1').getBoundingClientRect(); return h.top > 0 && h.bottom < innerHeight; })(),
        ctaVisible: (() => { const b = document.querySelector('.foot .btn--solid').getBoundingClientRect(); return b.top > 0 && b.bottom <= innerHeight + 1; })(),
        heroH: document.getElementById('hero').offsetHeight, vh: innerHeight,
        anims: document.getAnimations().length
      };
    });
    ok(+(await page.evaluate(() => getComputedStyle(document.querySelector('.plinth')).opacity)) < 0.02,
       'reduced motion: no leftover caption-panel strip');
    ok((await page.evaluate(() => document.getElementById('mast').dataset.state)) === 'mast',
       'reduced motion: the masthead starts as the bar on the mat, not a pill');
    ok(!rm.videoSrc, 'reduced motion: no video autoplay (poster only) — src="' + rm.videoSrc + '"');
    ok(rm.h1Visible && rm.ctaVisible, 'reduced motion: headline and primary action both on screen');
    ok(rm.heroH <= rm.vh * 1.05, 'reduced motion: no pinned scroll region (hero ' + rm.heroH + 'px vs viewport ' + rm.vh + 'px)');
    ok(rm.insetOpacity === 1 && rm.insetOnScreen, 'reduced motion: the second plate is present without motion (opacity ' + rm.insetOpacity + ')');
    notes.push('INFO  reduced-motion resting aperture: ' + rm.apertureRatio + ':1 (p=' + rm.p + ')');

    // contrast of the ink headline at rest
    const box = await page.evaluate(() => { const r = document.querySelector('.type--dark .h1x').getBoundingClientRect(); return { x: Math.max(0, r.x), y: Math.max(0, r.y), width: r.width, height: r.height }; });
    const col = await page.evaluate(() => getComputedStyle(document.querySelector('.type--dark .h1x')).color);
    await page.addStyleTag({ content: '.type--dark .h1x{visibility:hidden!important}' });
    await page.waitForTimeout(150);
    const shot = await page.screenshot({ clip: box });
    const ext = extremes(shot);
    const c = parseColor(col); const Lt = lum(c.r, c.g, c.b);
    const worst = Math.min(contrast(Lt, ext.max), contrast(Lt, ext.min));
    ok(worst >= 4.5, 'reduced motion: headline contrast ' + worst.toFixed(2) + ':1');

    await ctx.close();
  }

  /* ══════════ OVERFLOW SWEEP 320 → 2560 ══════════ */
  {
    const { ctx, page } = await newPage({ viewport: { width: 1440, height: 900 } });
    const widths = [320, 360, 375, 390, 414, 480, 600, 720, 768, 834, 900, 1024, 1180, 1280, 1440, 1600, 1920, 2200, 2560];
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(420);
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad = [];
        const clipped = (el) => {
          for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
            const c = getComputedStyle(n);
            if (c.overflowX !== 'visible' || c.clipPath !== 'none') return true;
          }
          return false;
        };
        document.querySelectorAll('body *').forEach(el => {
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
          const b = el.getBoundingClientRect();
          if (b.width === 0 && b.height === 0) return;
          if ((b.right > vw + 1.5 || b.left < -1.5) && !clipped(el)) bad.push((el.className || el.tagName) + ' ' + Math.round(b.left) + '..' + Math.round(b.right));
        });
        return { vw, scrollW: document.documentElement.scrollWidth, bodyScrollW: document.body.scrollWidth, bad: bad.slice(0, 12) };
      });
      const clean = r.bad.length === 0 && r.scrollW <= r.vw + 1;
      ok(clean, `no horizontal overflow at ${w}px (scrollWidth ${r.scrollW} / ${r.vw})` + (r.bad.length ? ' — ' + JSON.stringify(r.bad) : ''));
      if (w === 320 || w === 768 || w === 2560) {
        await page.screenshot({ path: path.join(OUT, `w-${w}.png`) });
      }
    }
    await ctx.close();
  }

  await browser.close();

  const uniqErr = [...new Set(errs)];
  const uniqReq = [...new Set(failedReq)];
  ok(uniqErr.length === 0, 'no console/page errors' + (uniqErr.length ? ':\n        ' + uniqErr.join('\n        ') : ''));
  ok(uniqReq.length === 0, 'no failed requests' + (uniqReq.length ? ':\n        ' + uniqReq.join('\n        ') : ''));

  console.log('\n──────── RESULTS ────────');
  notes.forEach(n => console.log(n));
  console.log('');
  problems.forEach(n => console.log(n));
  console.log('\n' + (problems.length ? problems.length + ' PROBLEM(S)' : 'ALL CHECKS PASSED'));
  process.exitCode = problems.length ? 1 : 0;   /* not process.exit(): it truncates piped stdout */
})().catch(e => { console.error('RUNNER ERROR', e); process.exitCode = 2; });
