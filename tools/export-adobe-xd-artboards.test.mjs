import assert from 'node:assert/strict';
import { buildSvg, isDirectExecution, sourceToOutput } from './export-adobe-xd-artboards.mjs';

const svg = buildSvg(Buffer.from('png').toString('base64'), 1440, 900);
assert.match(svg, /^<svg /);
assert.match(svg, /width="1440"/);
assert.match(svg, /height="900"/);
assert.match(svg, /data:image\/png;base64,cG5n/);

assert.equal(
  sourceToOutput('PMO corporate/unit-trust/dashboard.html'),
  'PMO-corporate/unit-trust/dashboard.svg',
);
assert.equal(
  isDirectExecution('/Users/henrychia/Desktop/PB design/Public Mutual/tools/export-adobe-xd-artboards.mjs'),
  true,
);
assert.equal(isDirectExecution(undefined), false);

console.log('SVG wrapper test passed');
