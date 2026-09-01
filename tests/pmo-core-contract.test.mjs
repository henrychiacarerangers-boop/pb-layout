import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const core = readFileSync(join(root, 'pmo-core.css'), 'utf8');
const corporateTableSystem = readFileSync(join(root, 'PMO corporate/css/table-system.css'), 'utf8');
const corporateEopStyles = readFileSync(join(root, 'PMO corporate/css/eop-dashboard.css'), 'utf8');
const corporateDashboard = readFileSync(join(root, 'PMO corporate/unit-trust/dashboard.html'), 'utf8');
const pmoDashboard = readFileSync(join(root, 'PMO/unit-trust/dashboard.html'), 'utf8');
const corporateAuthorise = readFileSync(join(root, 'PMO corporate/unit-trust/authorise.html'), 'utf8');
const corporateAuthoriseTopup = readFileSync(join(root, 'PMO corporate/unit-trust/authorise_topup.html'), 'utf8');
const corporateAuthoriseRedemption = readFileSync(join(root, 'PMO corporate/unit-trust/authorise_redemption.html'), 'utf8');
const pmoAuthoriseTopup = readFileSync(join(root, 'PMO/unit-trust/authorise_topup.html'), 'utf8');
const pmoAuthoriseRedemption = readFileSync(join(root, 'PMO/unit-trust/authorise_redemption.html'), 'utf8');
const corporateTopup = readFileSync(join(root, 'PMO corporate/unit-trust/top_up.html'), 'utf8');
const corporateRedemption = readFileSync(join(root, 'PMO corporate/unit-trust/redemption.html'), 'utf8');
const pmoTopup = readFileSync(join(root, 'PMO/unit-trust/top_up.html'), 'utf8');
const pmoRedemption = readFileSync(join(root, 'PMO/unit-trust/redemption.html'), 'utf8');
test('PMO core declares the shared component contracts', () => {
    for (const selector of [
        '.badge-alert', '.view-tab', '.gateway-tab-btn', '.pmo-data-table',
        '.pmo-app-shell', '.pmo-primary-nav', '.pmo-button', '.pmo-alert',
        '.pmo-card', '.pmo-metric', '.pmo-field', '.pmo-transaction-form', '.pmo-auth-shell', '.pmo-auth-form', '.pmo-status'
    ]) {
        assert.ok(core.includes(selector), `missing ${selector}`);
    }
});

test('the Corporate Dashboard is the shared-core reference migration', () => {
    for (const contract of [
        'design-tokens.css', 'pmo-core.css', 'pmo-app-shell', 'pmo-primary-nav',
        'pmo-button', 'pmo-alert', 'pmo-card', 'pmo-metric', 'pmo-status',
        'aria-current="page"'
    ]) {
        assert.match(corporateDashboard, new RegExp(contract), `missing ${contract}`);
    }
});

test('the reference migration loads the root PMO core stylesheet after its tokens', () => {
    for (const [name, markup] of [['Corporate Dashboard', corporateDashboard], ['PMO Dashboard', pmoDashboard]]) {
        const tokenIndex = markup.indexOf('design-tokens.css');
        const coreIndex = markup.indexOf('pmo-core.css');

        assert.ok(tokenIndex >= 0, `${name} is missing design tokens`);
        assert.ok(coreIndex >= 0, `${name} is missing PMO core`);
        assert.ok(tokenIndex < coreIndex, `${name} loads PMO core before design tokens`);
    }
});

test('the PMO Dashboard maps its navigation, buttons, cards, and metrics to the shared core', () => {
    for (const contract of ['pmo-app-shell', 'pmo-primary-nav', 'pmo-button', 'pmo-card', 'pmo-metric', 'aria-current="page"']) {
        assert.match(pmoDashboard, new RegExp(contract), `missing ${contract}`);
    }
});

test('the Corporate Authorisation workspace adopts shared navigation, table, and tab contracts', () => {
    for (const contract of [
        'design-tokens.css', 'pmo-core.css', 'pmo-app-shell', 'pmo-primary-nav',
        'pmo-card', 'pmo-table-frame', 'pmo-data-table', 'role="tablist"',
        'role="tab"', 'aria-current="page"', 'aria-controls="topup"',
        'aria-selected', 'ArrowRight', 'ArrowLeft'
    ]) {
        assert.match(corporateAuthorise, new RegExp(contract), `missing ${contract}`);
    }
});

test('Corporate Authorisation detail pages inherit the shared shell and data-display contracts', () => {
    for (const [name, markup] of [
        ['Corporate Top-Up Authorisation', corporateAuthoriseTopup],
        ['Corporate Redemption Authorisation', corporateAuthoriseRedemption]
    ]) {
        for (const contract of [
            'design-tokens.css', 'pmo-core.css', 'pmo-app-shell', 'pmo-primary-nav',
            'pmo-primary-nav__link', 'pmo-card', 'pmo-card__body', 'pmo-table-frame',
            'pmo-data-table', 'pmo-button', 'aria-current="page"'
        ]) {
            assert.match(markup, new RegExp(contract), `${name} missing ${contract}`);
        }
    }
});

test('the Corporate Redemption approval flow uses shared PAC fields, explicit status, and accessible errors', () => {
    for (const contract of [
        'pmo-field', 'pmo-field__label', 'pmo-field__control', 'pmo-field__feedback',
        'aria-describedby="pac-error"', 'aria-invalid', 'pmo-field--error',
        'pmo-button--primary', 'pmo-button--danger', 'pmo-status--success',
        'pmo-status--danger', 'Confirm rejection', 'Confirm approval'
    ]) {
        assert.match(corporateAuthoriseRedemption, new RegExp(contract), `missing ${contract}`);
    }
});

test('PMO Authorisation details use the same shared shell, display, PAC, and decision contracts', () => {
    for (const [name, markup] of [
        ['PMO Top-Up Authorisation', pmoAuthoriseTopup],
        ['PMO Redemption Authorisation', pmoAuthoriseRedemption]
    ]) {
        for (const contract of [
            'design-tokens.css', 'pmo-core.css', 'pmo-app-shell', 'pmo-primary-nav',
            'pmo-primary-nav__link', 'pmo-card', 'pmo-card__body', 'pmo-table-frame',
            'pmo-data-table', 'pmo-button', 'aria-current="page"'
        ]) {
            assert.match(markup, new RegExp(contract), `${name} missing ${contract}`);
        }
    }

    for (const contract of [
        'pmo-field', 'pmo-field__control', 'pmo-field__feedback', 'aria-describedby="pac-error"',
        'pmo-field--error', 'pmo-button--primary', 'pmo-button--danger',
        'pmo-status--success', 'pmo-status--danger', 'Confirm rejection', 'Confirm approval'
    ]) {
        assert.match(pmoAuthoriseRedemption, new RegExp(contract), `PMO Redemption missing ${contract}`);
    }
});

test('transaction creation flows use the shared form, PAC, card, navigation, and action contracts', () => {
    for (const [name, markup] of [
        ['Corporate Top-Up', corporateTopup],
        ['Corporate Redemption', corporateRedemption],
        ['PMO Top-Up', pmoTopup],
        ['PMO Redemption', pmoRedemption]
    ]) {
        for (const contract of [
            'design-tokens.css', 'pmo-core.css', 'pmo-app-shell', 'pmo-primary-nav',
            'pmo-primary-nav__link', 'pmo-transaction-form', 'pmo-field',
            'pmo-field__control', 'pmo-button', 'pmo-card', 'aria-current="page"'
        ]) {
            assert.match(markup, new RegExp(contract), `${name} missing ${contract}`);
        }
    }

    for (const markup of [corporateTopup, corporateRedemption, pmoTopup, pmoRedemption]) {
        assert.match(markup, /aria-describedby="pac-error"/, 'PAC input must identify its error feedback');
        assert.match(markup, /aria-live="polite"/, 'PAC feedback must announce changes');
    }
});

test('local shell styles do not redeclare first-wave shared contracts', () => {
    for (const file of ['PMO/css/styles.css', 'PMO corporate/css/styles.css', 'UTC/css/styles.css', 'Corporate Website/css/styles.css']) {
        const stylesheet = readFileSync(join(root, file), 'utf8');
        assert.doesNotMatch(stylesheet, /^\.pmo-(?:app-shell|primary-nav|button|alert|card|metric|field|status)\b/m, file);
    }
});

test('every Corporate PMO page loads the shared core directly or through its final portal bridge', () => {
    const accessPages = ['index.html', 'forgot.html', 'register.html', 'internet_risk.html'];
    const portalPages = [
        'analytics/eop.html', 'analytics/unit-trust.html',
        'eop/abort_payment.html', 'eop/authorise.html', 'eop/authorise_detail.html',
        'eop/contribution.html', 'eop/dashboard.html', 'eop/payment.html',
        'eop/payment_detail.html', 'eop/statements.html', 'eop/transaction_detail.html',
        'eop/transactions.html', 'eop/upload.html',
        'unit-trust/authorise.html', 'unit-trust/authorise_redemption.html',
        'unit-trust/authorise_topup.html', 'unit-trust/dashboard.html', 'unit-trust/redemption.html',
        'unit-trust/settings.html', 'unit-trust/statements.html', 'unit-trust/top_up.html',
        'unit-trust/transactions.html', 'unit-trust/view_account.html', 'unit-trust/view_account_detail.html'
    ];

    assert.match(corporateTableSystem, /@import url\("\.\.\/\.\.\/design-tokens\.css"\)/);
    assert.match(corporateTableSystem, /@import url\("\.\.\/\.\.\/pmo-core\.css"\)/);
    assert.match(corporateEopStyles, /@import url\("\.\.\/\.\.\/pmo-core\.css"\)/);

    for (const page of accessPages) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.match(markup, /design-tokens\.css/, `Corporate access page missing tokens: ${page}`);
        assert.match(markup, /pmo-core\.css/, `Corporate access page missing core: ${page}`);
        assert.match(markup, /pmo-app-shell/, `Corporate access page missing shared shell: ${page}`);
        assert.match(markup, /pmo-auth-shell/, `Corporate access page missing authentication shell: ${page}`);
    }

    for (const page of portalPages) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.match(markup, /data-pmo-shell/, `Corporate portal page missing shell marker: ${page}`);
        assert.ok(
            markup.includes('pmo-core.css') || markup.includes('table-system.css') || markup.includes('eop-dashboard.css'),
            `Corporate portal page missing a final shared-core bridge: ${page}`
        );
    }
});
