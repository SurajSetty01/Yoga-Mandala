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
const PDF = [path.join(ROOT, 'Context', 'Pranava Website Blueprint.pdf')];

function extractPdf(file: string): string {
  // pypdf is present in this environment; its text layer keeps the double spacing the PDF
  // was authored with, which norm() collapses anyway.
  return execSync(
    `python -c "import sys,pypdf;sys.stdout.reconfigure(encoding='utf-8');` +
      `print(chr(10).join((p.extract_text() or '') for p in pypdf.PdfReader(sys.argv[1]).pages))" "${file}"`,
    { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, env: { ...process.env, PYTHONIOENCODING: 'utf-8' } },
  );
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

const norm = (s: string) =>
  s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();

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
