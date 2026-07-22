import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const core = readFileSync(join(root, 'pmo-core.css'), 'utf8');
const productionRoots = ['PMO', 'PMO corporate', 'Corporate Website', 'UTC'];

function findPages(directory, results = []) {
    for (const entry of readdirSync(directory)) {
        const file = join(directory, entry);
        if (statSync(file).isDirectory()) findPages(file, results);
        else if (file.endsWith('.html')) results.push(file);
    }
    return results;
}

test('PMO core declares the shared component contracts', () => {
    for (const selector of ['.badge-alert', '.view-tab', '.gateway-tab-btn', '.pmo-data-table']) {
        assert.ok(core.includes(selector), `missing ${selector}`);
    }
});

test('every production page loads the root PMO core stylesheet', () => {
    const pages = productionRoots.flatMap((folder) => findPages(join(root, folder)));
    assert.equal(pages.length, 43);

    for (const page of pages) {
        const markup = readFileSync(page, 'utf8');
        assert.match(markup, /pmo-core\.css/, relative(root, page));
    }
});

test('local shell styles do not redeclare the shared alert badge contract', () => {
    for (const file of ['PMO/css/styles.css', 'PMO corporate/css/styles.css', 'UTC/css/styles.css', 'Corporate Website/css/styles.css']) {
        const stylesheet = readFileSync(join(root, file), 'utf8');
        assert.doesNotMatch(stylesheet, /^\.badge-alert\s*\{/m, file);
    }
});
