/**
 * Every client sentence in content/copy.ts must appear in the client's own document.
 *
 * This guards against the one failure mode reading cannot catch: paraphrase drift. A
 * sentence that has been "tightened" still reads perfectly well — it is simply no longer
 * what the client wrote. The previous build also published an invented membership figure
 * ("700+ teachers across India and abroad"), which is the same class of error one step on.
 *
 *   npx tsx tools/check-copy-fidelity.mts
 *
 * It imports the module and walks the actual exported values rather than regexing the
 * source: apostrophes in prose and in comments make string-literal matching unreliable,
 * and it is the shipped data we care about, not the file's text.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import * as copy from '../content/copy.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
/**
 * Three source documents now, not one. Praṇava's content lives in the two documents added
 * 21 Sep 2026; Yoga Mandala's remains in the original. A sentence is valid if it appears
 * verbatim in ANY of them — the pages draw from different briefs, and requiring a single
 * source would force either a false failure or a weakened check.
 */
const DOCX = [
  path.join(ROOT, 'Context', 'Website Pages Data.docx'),
  path.join(ROOT, 'Context', 'new', 'Pranava Website.docx'),
  path.join(ROOT, 'Context', 'new', 'Pranava About Page.docx'),
];

/**
 * The Blueprint is a PDF and is the master specification — the visitor journeys, the
 * programme names and the page requirements are quoted from it, so it has to be a source
 * too. Extracted at check time rather than kept as a stale text copy beside it.
 */
const PDF = [
  path.join(ROOT, 'Context', 'Pranava Website Blueprint.pdf'),
  // the client's own review and architecture brief (28 Sep 2026), which reword some copy
  path.join(ROOT, 'Context', 'Changes_v1', 'Pranava_About_Page_Review.pdf'),
  path.join(ROOT, 'Context', 'Changes_v1', 'Pranava_Website_Architecture.pdf'),
];

function extractPdf(file: string): string {
  // pypdf's text layer keeps the double spacing the PDF was authored with, which norm()
  // collapses anyway. The default `python` on this machine (3.14) lost its unicodedata
  // module in October 2026, so a broken interpreter falls through to the `py -3.13` launcher.
  const script =
    `-c "import sys,pypdf;sys.stdout.reconfigure(encoding='utf-8');` +
    `print(chr(10).join((p.extract_text() or '') for p in pypdf.PdfReader(sys.argv[1]).pages))" "${file}"`;
  const opts = { encoding: 'utf8' as const, maxBuffer: 32 * 1024 * 1024, stdio: 'pipe' as const, env: { ...process.env, PYTHONIOENCODING: 'utf-8' } };
  for (const py of ['python', 'py -3.13']) {
    try {
      return execSync(`${py} ${script}`, opts);
    } catch {
      /* try the next interpreter */
    }
  }
  throw new Error(`no working Python with pypdf could read ${file}`);
}

function extractDocx(file: string): string {
  // A .docx is a zip; word/document.xml holds the body. Paragraph tags become newlines so
  // sentences do not run together, then all remaining markup is stripped.
  const tmp = fs.mkdtempSync(path.join(process.env.TEMP ?? '/tmp', 'ym-'));
  try {
    execSync(`unzip -o -q "${file}" word/document.xml -d "${tmp}"`, { stdio: 'pipe' });
    return fs
      .readFileSync(path.join(tmp, 'word', 'document.xml'), 'utf8')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/**
 * Dashes were removed site-wide on 2026-09-27 at the owner's request, so punctuation may
 * differ from the source but wording may not. Both sides therefore drop dashes and sentence
 * punctuation before comparing (a dash that became a comma, colon or full stop still
 * matches); every word, and the order of the words, must still be the client's. A numeric
 * range dash reads as "to" ("2–6 October" is published as "2 to 6 October").
 */
const norm = (s: string) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/(\d)\s*[—–]\s*(\d)/g, '$1 to $2')
    .replace(/[—–]|\s-\s|[.,;:!?()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    // the client renamed the founder in the About review (28 Sep 2026); the older
    // documents still say Pranav Murthy, so both spellings compare as one name
    .replace(/praṇav śāstrī|pranav shastri/g, 'pranav murthy');

/** Every string anywhere in the exported content tree, with the path that reached it. */
function walk(node: unknown, at: string, out: Array<{ at: string; text: string }>) {
  if (typeof node === 'string') out.push({ at, text: node });
  else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${at}[${i}]`, out));
  else if (node && typeof node === 'object')
    for (const [k, v] of Object.entries(node)) walk(v, at ? `${at}.${k}` : k, out);
}

const found: Array<{ at: string; text: string }> = [];
walk(copy, '', found);

const source = [
  ...DOCX.map((f) => norm(extractDocx(f))),
  ...PDF.map((f) => norm(extractPdf(f))),
].join(' ');

/**
 * `action` and `title` fields are the section labels a designer writes onto a button or a
 * heading ("Get in touch", "Submit an offering") — the client's document brackets those as
 * [GET IN TOUCH] placeholders rather than spelling them out, so they are excluded here.
 * Everything else is prose and must match.
 */
const EXEMPT = /(^|\.)(action|title)$/;

const checked = found.filter((f) => f.text.split(' ').length >= 4 && !EXEMPT.test(f.at));
const missing = checked.filter((f) => !source.includes(norm(f.text)));

console.log(
  `checked ${checked.length} client sentences against ${DOCX.length + PDF.length} source documents`,
);
if (missing.length === 0) {
  console.log('PASS — every sentence is verbatim from the client document.');
} else {
  console.log(`FAIL — ${missing.length} not found in the source:`);
  for (const m of missing) console.log(`  · ${m.at}\n      "${m.text.slice(0, 100)}"`);
  process.exitCode = 1;
}
