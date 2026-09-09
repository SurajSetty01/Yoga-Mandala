/**
 * Post-build fix for Next 16's static export: the RSC prefetch payloads are written to a
 * path the client never asks for.
 *
 * For `/within/`, the export writes:      out/within/__next.within/__PAGE__.txt
 * but the browser requests:               /within/__next.within.__PAGE__.txt
 *
 * A directory separator where the client expects a dot. Every prefetch 404s, so `<Link>`
 * falls back to a full document load: the site works, but client-side navigation is gone and
 * each nav click reloads the page. On a four-page brochure that is survivable and easy to
 * miss — the pages render correctly and nothing errors visibly.
 *
 * This copies each payload to the flat path as well, leaving the original in place, so the
 * export satisfies both shapes on any static host without a rewrite rule.
 *
 *   node tools/fix-export-prefetch.mjs [outDir]
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.argv[2] ?? 'out');

if (!fs.existsSync(OUT)) {
  console.error(`no such directory: ${OUT} — run \`next build\` first`);
  process.exit(1);
}

let copied = 0;

/** Any directory named `__next.<segment>` holds payloads the client wants at a flat path. */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('__next.')) {
      for (const file of fs.readdirSync(full)) {
        const from = path.join(full, file);
        if (!fs.statSync(from).isFile()) continue;
        const to = path.join(dir, `${entry.name}.${file}`);
        if (!fs.existsSync(to)) {
          fs.copyFileSync(from, to);
          copied++;
        }
      }
    }
    walk(full);
  }
}

walk(OUT);
console.log(
  copied
    ? `export prefetch: wrote ${copied} flat-path copies so <Link> can prefetch`
    : 'export prefetch: nothing to do'
);
