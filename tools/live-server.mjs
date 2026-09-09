/**
 * Live preview server for the hero work-in-progress.
 *
 * Plain Node, no dependencies: serves a directory, injects a tiny SSE client into
 * every HTML response, and pushes a reload whenever anything under the root
 * changes. Deliberately not `next dev` — during design iteration the artefact is a
 * standalone HTML file, and a full framework rebuild between every edit would put
 * seconds between a change and seeing it.
 *
 *   node tools/live-server.mjs [--root <dir>] [--port <n>]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const arg = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const ROOT = path.resolve(arg('--root', path.join(HERE, '..', 'design', 'hero')));
const PORT = Number(arg('--port', 4321));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
};

/* The injected client. Reconnects on its own, so restarting the server or a
   transient drop does not silently leave the page stale. */
const CLIENT = `
<script>
(() => {
  let backoff = 250;
  const connect = () => {
    const es = new EventSource('/__live');
    es.onopen = () => { backoff = 250; };
    es.onmessage = (e) => { if (e.data === 'reload') location.reload(); };
    es.onerror = () => {
      es.close();
      setTimeout(connect, backoff);
      backoff = Math.min(backoff * 2, 4000);
    };
  };
  connect();
})();
</script>`;

const clients = new Set();

/* Debounced: one save can fire several fs events, and an editor writing a file in
   two steps would otherwise reload the page mid-write and serve a truncated file. */
let timer = null;
const notify = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    for (const res of clients) {
      try { res.write('data: reload\n\n'); } catch { clients.delete(res); }
    }
  }, 90);
};

fs.watch(ROOT, { recursive: true }, (_e, file) => {
  if (file && /(^|[\\/])\.|~$|\.tmp$/.test(file)) return; // dotfiles and editor scratch
  notify();
});

const listing = (dir, urlPath) => {
  const rows = fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => !d.name.startsWith('.'))
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name))
    .map((d) => {
      const href = path.posix.join(urlPath, d.name) + (d.isDirectory() ? '/' : '');
      return `<li><a href="${href}">${d.isDirectory() ? '📁 ' : ''}${d.name}</a></li>`;
    }).join('');
  return `<!doctype html><meta charset="utf-8"><title>${urlPath}</title>
<style>body{font:15px/1.7 ui-sans-serif,system-ui;margin:3rem auto;max-width:40rem;padding:0 1.5rem;background:#FBF7F2;color:#241D18}
h1{font:500 1.1rem/1.3 ui-monospace,monospace;color:#5C5049}ul{list-style:none;padding:0}
li{border-bottom:1px solid rgba(36,29,24,.1)}a{display:block;padding:.6rem .2rem;color:#2C6E6B;text-decoration:none}
a:hover{background:#F2E9DE}</style>
<h1>${urlPath}</h1><ul>${rows}</ul>${CLIENT}`;
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  if (urlPath === '/__live') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('retry: 500\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // Contain every request to ROOT: a `..` in the path must not escape the folder.
  const target = path.join(ROOT, urlPath);
  if (!target.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }

  let file = target;
  try {
    if (fs.statSync(file).isDirectory()) {
      const index = path.join(file, 'index.html');
      if (fs.existsSync(index)) file = index;
      else { res.writeHead(200, { 'Content-Type': TYPES['.html'] }).end(listing(file, urlPath)); return; }
    }
  } catch {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] })
       .end(`<!doctype html><meta charset="utf-8"><body style="font:15px ui-sans-serif;padding:3rem">
             <b>404</b> — ${urlPath}${CLIENT}`);
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';

  if (ext === '.html') {
    let html = fs.readFileSync(file, 'utf8');
    html = html.includes('</body>') ? html.replace('</body>', CLIENT + '</body>') : html + CLIENT;
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' }).end(html);
    return;
  }

  // no-store throughout: a cached poster or stylesheet defeats the whole point.
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`live  http://localhost:${PORT}`);
  console.log(`root  ${ROOT}`);
});
