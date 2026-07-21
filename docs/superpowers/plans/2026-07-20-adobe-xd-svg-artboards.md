# Adobe XD SVG Artboards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Export each project HTML screen as a visually faithful Adobe XD-importable SVG artboard.

**Architecture:** A small Node script enumerates the page sources and invokes local Chrome in headless mode to capture each page through a temporary local HTTP server. A companion Node script wraps the capture PNG in a correctly sized SVG and writes a manifest. The source project is read-only; all generated files are contained in `Adobe-XD-Import/`.

**Tech Stack:** Node.js built-ins, macOS local Google Chrome headless mode, HTML/CSS project assets.

## Global Constraints

- Never modify a source HTML, CSS, JavaScript, font, or image file.
- Write generated files only beneath `Adobe-XD-Import/`.
- Capture at a 1440px desktop viewport and full document height.
- Each SVG contains a PNG data URI for reliable Adobe XD import.
- Preserve source paths containing spaces.

---

### Task 1: Build and test the single-page SVG exporter

**Files:**
- Create: `tools/export-adobe-xd-artboards.mjs`
- Create: `tools/export-adobe-xd-artboards.test.mjs`
- Create: `Adobe-XD-Import/PMO-corporate/unit-trust/dashboard.svg`
- Create: `Adobe-XD-Import/manifest.json`

**Interfaces:**
- Consumes: HTML source path supplied through `--source` and output root supplied through `--output`.
- Produces: one `.svg` and a manifest object `{ source, output, width, height, status }`.

- [ ] **Step 1: Write the failing SVG-wrapper test**

```js
import assert from 'node:assert/strict';
import { buildSvg } from './export-adobe-xd-artboards.mjs';

const svg = buildSvg(Buffer.from('png').toString('base64'), 1440, 900);
assert.match(svg, /^<svg /);
assert.match(svg, /width="1440"/);
assert.match(svg, /height="900"/);
assert.match(svg, /data:image\/png;base64,cG5n/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node tools/export-adobe-xd-artboards.test.mjs`
Expected: failure because `buildSvg` does not yet exist.

- [ ] **Step 3: Implement minimal capture and SVG wrapper code**

```js
export function buildSvg(base64Png, width, height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="data:image/png;base64,${base64Png}"/></svg>`;
}
```

The command-line mode must run Chrome headlessly against a temporary local server, record image dimensions, write the SVG, and append a successful dashboard manifest entry.

- [ ] **Step 4: Run unit and dashboard-output checks**

Run: `node tools/export-adobe-xd-artboards.test.mjs && node tools/export-adobe-xd-artboards.mjs --source 'PMO corporate/unit-trust/dashboard.html' --output Adobe-XD-Import`
Expected: PASS and `Adobe-XD-Import/PMO-corporate/unit-trust/dashboard.svg` exists with a successful manifest entry.

### Task 2: Export all selected page sources and document import

**Files:**
- Modify: `tools/export-adobe-xd-artboards.mjs`
- Create: `Adobe-XD-Import/README.md`
- Modify: `Adobe-XD-Import/manifest.json`
- Create: `Adobe-XD-Import/**/*.svg`

**Interfaces:**
- Consumes: automatic source discovery below `PMO corporate/`, `PMO/`, `UTC/`, and `Corporate Website/`.
- Produces: a manifest entry for every selected source and an SVG at the matching exported path.

- [ ] **Step 1: Write the failing source-discovery test**

```js
import assert from 'node:assert/strict';
import { sourceToOutput } from './export-adobe-xd-artboards.mjs';

assert.equal(
  sourceToOutput('PMO corporate/unit-trust/dashboard.html'),
  'PMO-corporate/unit-trust/dashboard.svg',
);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node tools/export-adobe-xd-artboards.test.mjs`
Expected: failure because `sourceToOutput` does not yet exist.

- [ ] **Step 3: Implement source discovery and batch export**

```js
export function sourceToOutput(source) {
  return source.replace(/^PMO corporate\//, 'PMO-corporate/').replace(/\.html$/, '.svg');
}
```

Discover HTML with Node directory traversal, capture each independently, and retain failure entries instead of stopping the batch.

- [ ] **Step 4: Export and verify the complete set**

Run: `node tools/export-adobe-xd-artboards.mjs --all --output Adobe-XD-Import && node tools/export-adobe-xd-artboards.test.mjs`
Expected: every manifest entry has an existing SVG for `status: "success"`; output SVG count equals successful manifest count; tests PASS.

- [ ] **Step 5: Write the import guide**

```md
# Adobe XD import

Drag one or more `.svg` files into an Adobe XD document. Each imported SVG is a full-page 1440px desktop artboard snapshot. It is visually faithful but flattened as an image layer; edit the original HTML/CSS for component-level changes.
```
