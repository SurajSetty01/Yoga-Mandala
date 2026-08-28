/**
 * Per-section image search. Downloads candidates to .review/<tag>/ and builds
 * a contact sheet so every image is looked at before it is used.
 *
 *   node scripts/imgsearch.mjs --tag hero --n 8 \
 *     --q "wikimedia:yoga shala Mysore" --q "openverse:yoga class india"
 *
 * Sources: wikimedia | openverse | met
 * Licence policy: commercial use + modification allowed. ND is rejected —
 * the art direction crops, and a No-Derivatives image cannot be cropped.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const UA = "YogaMandala/1.0 (portal build)";
const args = process.argv.slice(2);
const get = (f) => {
  const i = args.indexOf(f);
  return i === -1 ? undefined : args[i + 1];
};
const all = (f) => args.map((a, i) => (a === f ? args[i + 1] : null)).filter(Boolean);

const tag = get("--tag") ?? "misc";
const perQuery = Number(get("--n") ?? 8);
const queries = all("--q");
const REVIEW = path.resolve(".review", tag);

const BAD =
  /(logo|flag|\bmap\b|chart|diagram|screenshot|poster|banner|graph|ambigram|coat of arms|signature|stamp|coin|currency|clipart|icon|book cover|title page|johnson|europe|american)/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Openverse allows 20 anonymous requests/minute and answers 401 (not 429) when
 * that burst is tripped, which silently looks like "no results". Pace and retry.
 */
const CACHE = path.resolve(".review", "_cache");
async function j(u, tries = 4) {
  await fs.mkdir(CACHE, { recursive: true });
  const key = path.join(CACHE, Buffer.from(String(u)).toString("base64url").slice(0, 120) + ".json");
  try {
    return JSON.parse(await fs.readFile(key, "utf8"));
  } catch {}
  for (let i = 0; i < tries; i++) {
    const r = await fetch(u, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (r.ok) {
      const d = await r.json();
      await fs.writeFile(key, JSON.stringify(d));
      return d;
    }
    if (r.status === 401 || r.status === 429 || r.status >= 500) {
      const wait = 4000 * (i + 1);
      console.log(`   (${r.status} — waiting ${wait / 1000}s)`);
      await sleep(wait);
      continue;
    }
    throw new Error(String(r.status));
  }
  throw new Error("rate-limited");
}

async function wikimedia(q, n) {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  Object.entries({
    action: "query", format: "json", generator: "search", gsrnamespace: "6",
    gsrsearch: q, gsrlimit: String(n * 4), prop: "imageinfo",
    iiprop: "url|size|extmetadata|mime", iiurlwidth: "2200",
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  const d = await j(u).catch(() => null);
  return Object.values(d?.query?.pages ?? {})
    .map((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii || !/jpeg|png/i.test(ii.mime ?? "")) return null;
      const m = ii.extmetadata ?? {};
      const lic = (m.LicenseShortName?.value ?? "").replace(/<[^>]+>/g, "");
      if (!/^(cc0|pdm|public domain|cc by)/i.test(lic)) return null;
      if (/\bND\b|NoDeriv|NonCommercial|\bNC\b/i.test(lic)) return null;
      if ((ii.width ?? 0) < 1000) return null;
      const title = (p.title ?? "").replace(/^File:/, "").replace(/\.[a-z]+$/i, "");
      if (BAD.test(title)) return null;
      return {
        url: ii.thumburl || ii.url, title,
        author: (m.Artist?.value ?? "Unknown").replace(/<[^>]+>/g, "").trim().slice(0, 80),
        licence: lic, source: "Wikimedia Commons", page: ii.descriptionurl,
        dim: `${ii.width}x${ii.height}`,
      };
    })
    .filter(Boolean);
}

async function openverse(q, n, source) {
  const u = new URL("https://api.openverse.org/v1/images/");
  Object.entries({
    q, license_type: "commercial,modification",
    page_size: String(n * 4), mature: "false",
    ...(source ? { source } : {}),
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  const d = await j(u).catch(() => null);
  return (d?.results ?? [])
    .map((r) => {
      const title = (r.title ?? "").replace(/<[^>]+>/g, "").trim();
      if (!r.url || BAD.test(title)) return null;
      if ((r.width ?? 0) < 800) return null;
      if ((r.license ?? "").includes("nd")) return null;
      return {
        url: r.url, title: title || q, author: (r.creator ?? "Unknown").slice(0, 80),
        licence: `CC ${(r.license ?? "").toUpperCase()} ${r.license_version ?? ""}`.trim(),
        source: r.source ?? "Openverse", page: r.foreign_landing_url ?? r.url,
        dim: `${r.width}x${r.height}`,
      };
    })
    .filter(Boolean);
}

async function met(q, n) {
  const s = new URL("https://collectionapi.metmuseum.org/public/collection/v1/search");
  s.searchParams.set("q", q);
  s.searchParams.set("hasImages", "true");
  const ids = (await j(s).catch(() => null))?.objectIDs ?? [];
  const out = [];
  for (const id of ids.slice(0, n * 3)) {
    if (out.length >= n * 2) break;
    const o = await j(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    ).catch(() => null);
    if (!o?.isPublicDomain || !o.primaryImage) continue;
    out.push({
      url: o.primaryImage, title: (o.title ?? "Untitled").slice(0, 70),
      author: o.artistDisplayName || o.culture || "Unknown",
      licence: "CC0 / Public domain", source: "The Met",
      page: o.objectURL, dim: [o.objectDate, o.medium].filter(Boolean).join(" · ").slice(0, 60),
    });
  }
  return out;
}

const ov = (source) => (q, n) => openverse(q, n, source);
async function artic(q, n) {
  const u = new URL("https://api.artic.edu/api/v1/artworks/search");
  u.searchParams.set("q", q);
  u.searchParams.set("limit", String(n * 3));
  u.searchParams.set("fields", "id,title,image_id,artist_display,date_display,medium_display,is_public_domain");
  const d = await j(u).catch(() => null);
  return (d?.data ?? [])
    .filter((o) => o.is_public_domain && o.image_id)
    .map((o) => ({
      url: `https://www.artic.edu/iiif/2/${o.image_id}/full/1686,/0/default.jpg`,
      title: (o.title ?? "Untitled").slice(0, 70),
      author: o.artist_display?.split(String.fromCharCode(10))[0] ?? "Unknown",
      licence: "CC0 / Public domain",
      source: "Art Institute of Chicago",
      page: `https://www.artic.edu/artworks/${o.id}`,
      dim: [o.date_display, o.medium_display].filter(Boolean).join(" · ").slice(0, 60),
    }));
}

async function cleveland(q, n) {
  const u = new URL("https://openaccess-api.clevelandart.org/api/artworks/");
  u.searchParams.set("q", q);
  u.searchParams.set("limit", String(n * 3));
  u.searchParams.set("cc0", "1");
  u.searchParams.set("has_image", "1");
  const d = await j(u).catch(() => null);
  return (d?.data ?? [])
    .filter((o) => o?.images?.web?.url)
    .map((o) => ({
      url: o.images.print?.url ?? o.images.web.url,
      title: (o.title ?? "Untitled").slice(0, 70),
      author: o.creators?.[0]?.description ?? o.culture?.[0] ?? "Unknown",
      licence: "CC0 / Public domain",
      source: "Cleveland Museum of Art",
      page: o.url,
      dim: [o.creation_date, o.technique].filter(Boolean).join(" · ").slice(0, 60),
    }));
}

const SRC = {
  artic,
  cleveland,
  wikimedia,
  met,
  openverse,
  stocksnap: ov("stocksnap"),
  rawpixel: ov("rawpixel"),
  wellcome: ov("wellcome_collection"),
  stock: ov("stocksnap,rawpixel"),
  flickr: ov("flickr"),
};
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 46) || "img";

await fs.rm(REVIEW, { recursive: true, force: true });
await fs.mkdir(REVIEW, { recursive: true });

const found = [];
const seen = new Set();

for (const spec of queries) {
  const [src, ...rest] = spec.split(":");
  const q = rest.join(":");
  let res = [];
  try {
    res = await SRC[src](q, perQuery);
  } catch (e) {
    console.log(`! ${src} "${q}" ${e.message}`);
  }
  await sleep(5000);
  let kept = 0;
  for (const r of res) {
    if (kept >= perQuery || seen.has(r.url)) continue;
    seen.add(r.url);
    const i = found.length + 1;
    const name = `${String(i).padStart(2, "0")}-${slug(r.title)}.jpg`;
    try {
      const resp = await fetch(r.url, { headers: { "User-Agent": UA } });
      if (!resp.ok) continue;
      const buf = Buffer.from(await resp.arrayBuffer());
      if (buf.length < 20_000) continue;
      await fs.writeFile(path.join(REVIEW, name), buf);
      found.push({ ...r, n: i, file: name, q, src });
      kept++;
      process.stdout.write(".");
    } catch {
      process.stdout.write("x");
    }
  }
  console.log(` ${src.padEnd(10)} ${kept}/${perQuery}  "${q}"`);
}

await fs.writeFile(path.join(REVIEW, "_candidates.json"), JSON.stringify(found, null, 2));

// contact sheet
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#141414;color:#eee;font:12px system-ui;padding:14px}
h1{font:600 14px system-ui;margin:0 0 10px}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
img{width:100%;aspect-ratio:3/2;object-fit:cover;background:#222;display:block}
b{color:#ffd479}
figcaption{font-size:10px;opacity:.8;margin-top:3px;line-height:1.3}
</style><h1>${tag} — ${found.length} candidates</h1><div class="g">
${found
  .map(
    (f) =>
      `<figure style="margin:0"><img src="file:///${path.join(REVIEW, f.file).replace(/\\/g, "/")}"><figcaption><b>#${f.n}</b> ${f.title.slice(0, 46)}<br>${f.dim} · ${f.src}</figcaption></figure>`,
  )
  .join("")}
</div>`;
const sheetHtml = path.join(REVIEW, "_sheet.html");
await fs.writeFile(sheetHtml, html);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("file:///" + sheetHtml.replace(/\\/g, "/"));
await p.waitForTimeout(2500);
await p.screenshot({ path: path.join(REVIEW, "_sheet.png"), fullPage: true });
await b.close();

console.log(`\n${found.length} candidates → ${REVIEW}\\_sheet.png`);
