import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../design-system-library.html', import.meta.url), 'utf8');

test('design system library exposes all curated component families', () => {
    const families = [
        'navigation', 'buttons', 'forms', 'cards', 'status', 'tables',
        'data-display', 'feedback', 'stepper', 'tabs', 'marketing', 'analytics'
    ];

    for (const family of families) {
        assert.match(html, new RegExp(`data-component-family="${family}"`));
    }
});

test('design system library retains its navigable foundations, patterns, and source map', () => {
    for (const section of ['foundations', 'tokens', 'components', 'previews', 'patterns', 'source']) {
        assert.match(html, new RegExp(`<section id="${section}">`));
        assert.match(html, new RegExp(`href="#${section}"`));
    }
});

test('interactive examples provide an accessible name and visible focus treatment', () => {
    assert.match(html, /\.btn:focus-visible/);
    assert.match(html, /<button[^>]*aria-label=/);
    assert.match(html, /role="tablist"/);
});
