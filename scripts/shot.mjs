import { chromium } from "playwright";

const OUT = process.argv[2];
const URL = process.argv[3] || "http://localhost:3001/";
const WIDTH = Number(process.argv[4] || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: WIDTH > 700 ? 900 : 844 },
});
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
page.on("requestfailed", (r) => console.log("FAILED:", r.url().slice(0, 80)));
await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate(async () => {
  const step = window.innerHeight * 0.5;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 140));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2500);
await page.screenshot({ path: OUT, fullPage: true });
console.log("saved", OUT);
await browser.close();
