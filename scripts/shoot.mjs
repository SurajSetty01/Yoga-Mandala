// Screenshot pipeline for the Yoga Mandala root site review loop.
// Usage: node scripts/shoot.mjs [route ...]
//   node scripts/shoot.mjs                 -> shoots the default route set
//   node scripts/shoot.mjs /learn /about   -> shoots specific routes
//
// IMPORTANT: images are capped so NO dimension exceeds MAX_PX (default 7600).
// The model that reviews these refuses images taller/wider than 8000px, so we
// never use fullPage:true. Instead we capture capped-height "band" tiles that
// walk down the page, plus a single above-the-fold shot. Every tile is a safe
// size and can be read back into chat without wedging the conversation.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3002";
const OUT = path.resolve(".review/root");
const MAX_PX = Number(process.env.MAX_PX ?? 7600); // hard ceiling per dimension
const BANDS = Number(process.env.BANDS ?? 3); // max vertical tiles per route

const DEFAULT_ROUTES = [
  "/",
  "/learn",
  "/learn/initiatives",
  "/learn/bulletin",
  "/learn/library",
  "/learn/reading-circle",
  "/learn/teachers-desk",
  "/connect",
  "/connect/directory",
  "/connect/experts",
  "/collaborate",
  "/events",
  "/discover",
  "/about",
  "/about/principles",
  "/about/governance",
  "/about/contact",
  "/guidelines",
  "/join",
  "/submit",
  "/submit/event",
  "/privacy",
  "/terms",
];

const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "_"));

async function shoot() {
  const routes = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_ROUTES;
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const results = [];

  for (const [label, width, viewH] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    // deviceScaleFactor 1 keeps pixel dims == CSS dims, so viewH stays < MAX_PX.
    const ctx = await browser.newContext({
      viewport: { width, height: viewH },
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();

    for (const route of routes) {
      const url = `${BASE}${route}`;
      try {
        const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
        const status = resp?.status() ?? 0;
        await page.evaluate(() => document.fonts?.ready);

        // Walk the page to trigger reveal animations, then return to top.
        const pageH = await page.evaluate(async () => {
          await new Promise((r) => {
            let y = 0;
            const step = () => {
              y += window.innerHeight * 0.8;
              window.scrollTo(0, y);
              if (y < document.body.scrollHeight) setTimeout(step, 60);
              else setTimeout(r, 200);
            };
            step();
          });
          window.scrollTo(0, 0);
          return document.body.scrollHeight;
        });
        await page.waitForTimeout(400);

        // Capture capped-height bands so no image exceeds MAX_PX.
        // We resize the viewport to the band height and scroll band-by-band so
        // each screenshot is a plain viewport capture (robust, no clip math).
        const bandH = Math.min(viewH * 4, MAX_PX); // desktop 3600 / mobile 3376
        const bandCount = Math.min(BANDS, Math.max(1, Math.ceil(pageH / bandH)));
        await page.setViewportSize({ width, height: bandH });
        await page.waitForTimeout(150);
        for (let i = 0; i < bandCount; i++) {
          const top = i * bandH;
          await page.evaluate((y) => window.scrollTo(0, y), top);
          await page.waitForTimeout(200);
          const suffix = bandCount === 1 ? "" : `-${i + 1}`;
          const file = path.join(OUT, `${slug(route)}--${label}${suffix}.png`);
          await page.screenshot({ path: file }); // viewport-sized, <= MAX_PX
        }
        await page.setViewportSize({ width, height: viewH });
        results.push(
          `${status === 200 ? "OK " : "!! "} ${label.padEnd(7)} ${route} -> ${bandCount} band(s), pageH=${pageH}`
        );
      } catch (err) {
        results.push(`ERR ${label.padEnd(7)} ${route} :: ${err.message.split("\n")[0]}`);
      }
    }
    await ctx.close();
  }

  await browser.close();
  console.log(results.join("\n"));
}

shoot();
