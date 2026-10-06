import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../design-system-library.html', import.meta.url), 'utf8');
const corporateReview = readFileSync(
    new URL('../corporate-pmo-component-review.html', import.meta.url),
    'utf8'
);

test('design system library exposes all curated component families', () => {
    const families = [
        'navigation', 'buttons', 'forms', 'cards', 'status', 'tables',
        'data-display', 'feedback', 'stepper', 'tabs', 'marketing', 'analytics'
    ];

    for (const family of families) {
        assert.match(html, new RegExp(`data-component-family="${family}"`));
    }
});

test('design system library exposes the complete audited inventory', () => {
    const families = [
        'application-shell', 'drawer', 'dropdown', 'modal', 'accordion',
        'download-badge', 'empty-state', 'support-widget'
    ];

    for (const family of families) {
        assert.match(html, new RegExp(`data-component-family="${family}"`));
    }
});

test('design system library documents every first-wave shared-core contract', () => {
    for (const contract of [
        'pmo-app-shell', 'pmo-primary-nav', 'pmo-button', 'pmo-field',
        'pmo-alert', 'pmo-status', 'pmo-table-frame', 'pmo-data-table',
        'pmo-card', 'pmo-metric'
    ]) {
        assert.match(html, new RegExp(contract));
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

test('Corporate PMO review presents every current shared component family', () => {
    for (const contract of [
        'design-tokens.css', 'pmo-core.css', 'PMO corporate/css/table-system.css',
        'pmo-primary-nav', 'pmo-button--primary', 'pmo-button--secondary',
        'pmo-button--quiet', 'pmo-button--success', 'pmo-button--danger-outline',
        'pmo-button--danger', 'pmo-button--compact', 'pmo-action-region',
        'pmo-alert--info', 'pmo-alert--attention', 'pmo-card', 'pmo-card--summary', 'pmo-metric',
        'pmo-outcome-header', 'pmo-outcome-icon', 'pmo-outcome-title', 'pmo-outcome-copy',
        'pmo-field', 'pmo-transaction-form', 'pmo-auth-form', 'pmo-status--success',
        'pmo-status--pending', 'pmo-status--danger', 'pmo-status--neutral',
        'pmo-table-frame', 'pmo-data-table', 'pmo-data-table--documents',
        'pmo-data-table--document-download'
    ]) {
        assert.match(corporateReview, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }

    for (const section of ['foundations', 'navigation', 'actions', 'feedback', 'data', 'forms', 'auth', 'tables']) {
        assert.match(corporateReview, new RegExp(`id="${section}"`));
    }

    assert.doesNotMatch(corporateReview, /badge-alert|pmo-btn-action|pmo-status-badge/);
});
