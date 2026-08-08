import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const productionRoots = ['PMO', 'PMO corporate', 'Corporate Website', 'UTC'];
const semanticUtilities = [
  'text-meta', 'text-caption', 'text-table', 'text-body', 'text-lead',
  'text-section', 'text-title', 'text-display', 'icon-size-xs', 'icon-size-sm'
];
const mappedSizes = '(?:0\\.(?:5|6|62|65|7|72|75|78|8|82|85|9|95)|1(?:\\.0?5)?|1\\.(?:1|2|25|3|35)|2(?:\\.(?:2|3|5|8))?|3)rem';

function findPages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = join(directory, entry.name);
    return entry.isDirectory() ? findPages(target) : entry.name.endsWith('.html') ? [target] : [];
  });
}

test('design tokens expose the canonical type scale and semantic utilities', () => {
  const tokens = readFileSync(join(root, 'design-tokens.css'), 'utf8');
  for (const token of ['--type-meta', '--type-caption', '--type-table', '--type-body', '--type-lead', '--type-section', '--type-title', '--type-display']) {
    assert.match(tokens, new RegExp(token));
  }
  for (const utility of semanticUtilities) assert.match(tokens, new RegExp('\\.' + utility + '\\b'));
});

test('every production page loads design tokens before PMO core', () => {
  const pages = productionRoots.flatMap((directory) => findPages(join(root, directory)));
  assert.equal(pages.length, 43);
  for (const page of pages) {
    const source = readFileSync(page, 'utf8');
    const tokenIndex = source.indexOf('design-tokens.css');
    const coreIndex = source.indexOf('pmo-core.css');
    assert.ok(tokenIndex >= 0, relative(root, page) + ' is missing design-tokens.css');
    assert.ok(coreIndex >= 0, relative(root, page) + ' is missing pmo-core.css');
    assert.ok(tokenIndex < coreIndex, relative(root, page) + ' loads PMO core before design tokens');
  }
});

test('production markup contains no legacy type utilities or mapped fixed inline text sizes', () => {
  const pages = productionRoots.flatMap((directory) => findPages(join(root, directory)));
  const legacyUtility = /\bfs-(?:7|8|9|10)\b/;
  const inlineSize = new RegExp('font-size\\s*:\\s*' + mappedSizes, 'i');
  for (const page of pages) {
    const source = readFileSync(page, 'utf8');
    assert.doesNotMatch(source, legacyUtility, relative(root, page) + ' retains a legacy fs utility');
    assert.doesNotMatch(source, inlineSize, relative(root, page) + ' retains a mapped inline font size');
  }
});
