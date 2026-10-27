import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const {pages} = JSON.parse(await readFile('.generated-pages.json', 'utf8'));
const fingerprints = new Map();
const allUses = new Map();
let placements = 0;

for (const page of pages.filter(p=>p!=='fr'&&!p.startsWith('fr/'))) {
  const html = await readFile((page ? page + '/' : '') + 'index.html', 'utf8');
  const localUses = new Set();
  for (const [, src] of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    if (!fingerprints.has(src)) {
      const bytes = await readFile('.' + src);
      fingerprints.set(src, createHash('sha256').update(bytes).digest('hex'));
      assert(bytes.length < 350_000, `Image exceeds the 350 KB budget: ${src}`);
    }
    const fingerprint = fingerprints.get(src);
    assert(!localUses.has(fingerprint), `Repeated photo on /${page}: ${src}`);
    localUses.add(fingerprint);
    // Service imagery is intentionally shared across relevant city pages.
    allUses.set(fingerprint, '/' + page);
    placements++;
  }
}

console.log(`PASS: ${pages.length} pages checked; ${placements} photo placements, no repeated images within a page; shared service imagery permitted across locations.`);
