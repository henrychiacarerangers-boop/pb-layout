import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const core = readFileSync(join(root, 'pmo-core.css'), 'utf8');
const corporateTableSystem = readFileSync(join(root, 'PMO corporate/css/table-system.css'), 'utf8');
const corporateEopStyles = readFileSync(join(root, 'PMO corporate/css/eop-dashboard.css'), 'utf8');
const corporateDashboardStyles = readFileSync(join(root, 'PMO corporate/css/dashboard-styles.css'), 'utf8');
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
const corporateEopPayment = readFileSync(join(root, 'PMO corporate/eop/payment.html'), 'utf8');
const corporateEopPaymentDetail = readFileSync(join(root, 'PMO corporate/eop/payment_detail.html'), 'utf8');
const corporateEopAbortPayment = readFileSync(join(root, 'PMO corporate/eop/abort_payment.html'), 'utf8');
const corporateEopTransactionDetail = readFileSync(join(root, 'PMO corporate/eop/transaction_detail.html'), 'utf8');
test('PMO core declares the shared component contracts', () => {
    for (const selector of [
        '.badge-alert', '.view-tab', '.gateway-tab-btn', '.pmo-data-table',
        '.pmo-app-shell', '.pmo-primary-nav', '.pmo-button', '.pmo-alert',
        '.pmo-card', '.pmo-metric', '.pmo-field', '.pmo-transaction-form', '.pmo-auth-shell', '.pmo-auth-form', '.pmo-status',
        '.pmo-payment-account'
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

    assert.match(core, /\.pmo-card--summary\s*\{\s*height: auto;/, 'summary card must fit its content');
    for (const [name, markup] of [
        ['Corporate Top-Up Authorisation', corporateAuthoriseTopup],
        ['Corporate Redemption Authorisation', corporateAuthoriseRedemption]
    ]) {
        assert.match(markup, /pmo-card--summary/, `${name} must not stretch its summary card`);
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

test('the EOP payment journey uses one shared workspace language from batch to receipt', () => {
    for (const [name, markup] of [
        ['Payment List', corporateEopPayment],
        ['Payment Detail', corporateEopPaymentDetail],
        ['Abort Payment', corporateEopAbortPayment],
        ['Transaction Detail', corporateEopTransactionDetail]
    ]) {
        for (const contract of ['pmo-card', 'pmo-table-frame', 'pmo-data-table', 'pmo-button']) {
            assert.match(markup, new RegExp(contract), `${name} missing ${contract}`);
        }
    }

    for (const [name, markup] of [
        ['Payment Detail', corporateEopPaymentDetail],
        ['Abort Payment', corporateEopAbortPayment],
        ['Transaction Detail', corporateEopTransactionDetail]
    ]) {
        assert.match(markup, /pmo-card--summary/, `${name} summary card must fit its content`);
        assert.match(markup, /pmo-action-region/, `${name} must use the shared action region`);
        assert.doesNotMatch(markup, /btn btn-danger rounded-pill px-5/, `${name} retains a legacy primary action`);
    }

    assert.match(corporateEopPayment, /pmo-alert pmo-alert--attention d-none/, 'Payment List cancellation feedback must use the shared alert');
    assert.match(corporateEopPaymentDetail, /pmo-alert pmo-alert--info mt-3/, 'Payment Detail bank guidance must use the shared alert');
});

test('Top-Up and EOP payment use the shared compact payment account guidance', () => {
    assert.match(corporateTopup, /pmo-payment-account/, 'Top-Up must use the shared payment account component');
    assert.match(corporateEopPaymentDetail, /pmo-payment-account/, 'EOP payment must use the shared payment account component');
    assert.match(corporateTopup, /id="topUpStep2" class="row g-4 d-none"/, 'Top-Up confirmation must use the shared two-column payment workspace');
    assert.match(corporateTopup, /<section class="pmo-card mb-4">/, 'Top-Up confirmation must use the shared card surface');
    assert.match(corporateTopup, /pmo-card pmo-card--summary/, 'Top-Up confirmation must use the compact shared summary');
    assert.doesNotMatch(corporateTopup, /id="topUpStep2"[\s\S]{0,180}card border-0 shadow-sm/, 'Top-Up confirmation retains the legacy card wrapper');
    assert.doesNotMatch(corporateTopup, /Selected Bank Notice Alert/, 'Top-Up retains its oversized bank alert');
    assert.match(corporateTopup, /topUpPaymentBankBrand/, 'Top-Up must show the selected Public Bank payment brand');
    assert.match(corporateEopPaymentDetail, /eopPayVisualBankBrand/, 'EOP must show the selected Public Bank payment brand');

    for (const contract of [
        '.pmo-payment-account__header', '.pmo-payment-account__icon',
        '.pmo-payment-account__label', '.pmo-payment-account__value', '.pmo-payment-account__note',
        '.pmo-payment-account__brand'
    ]) {
        assert.match(core, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
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

test('Corporate feedback uses canonical alerts and centralised label and status specifications', () => {
    for (const page of [
        'eop/dashboard.html', 'unit-trust/dashboard.html', 'unit-trust/top_up.html', 'unit-trust/redemption.html'
    ]) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.doesNotMatch(markup, /badge-alert/, `legacy alert remains in ${page}`);
    }

    for (const contract of [
        '.pmo-alert--info', '.pmo-alert--success', '.pmo-alert__content--start',
        '.pmo-alert__title', '.pmo-alert__body', 'body[data-pmo-shell] .form-label', 'text-transform: none !important',
        '.pmo-status--success', '.pmo-status--pending', '.pmo-status--danger', '.pmo-status--neutral'
    ]) {
        assert.match(core, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
    }

    for (const contract of ['min-height: 26px !important', 'padding: 4px 9px !important', 'font-weight: 750 !important']) {
        assert.match(corporateTableSystem, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `status system missing ${contract}`);
    }
});

test('Corporate detail and analytics pages use the shared alert pattern without local overrides', () => {
    const attentionPages = [
        'analytics/eop.html', 'analytics/unit-trust.html',
        'eop/abort_payment.html', 'eop/authorise_detail.html',
        'eop/payment_detail.html', 'eop/transaction_detail.html',
        'unit-trust/authorise_topup.html'
    ];

    for (const page of attentionPages) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.match(markup, /pmo-alert/, `${page} must use the shared alert`);
        assert.doesNotMatch(markup, /border-start border-4 border-(?:danger|success)/, `${page} retains a legacy alert border`);
        assert.doesNotMatch(markup, /background-color:\s*#(?:fffbfb|f6fcf8)/i, `${page} retains a legacy alert fill`);
    }

    for (const page of ['eop/abort_payment.html', 'eop/authorise_detail.html', 'eop/payment_detail.html']) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.doesNotMatch(markup, /Pro Max Corporate Design Guidelines Overrides/, `${page} retains page-wide component overrides`);
        assert.doesNotMatch(markup, /^\s*\.(?:card|btn-danger|btn-outline-dark|btn-outline-danger)\s*\{/m, `${page} retains a global component override`);
    }

    const corporateRoot = join(root, 'PMO corporate');
    assert.match(core, /body\[data-pmo-shell="true"\] \.top-landing-wrapper/, 'shared portal landing treatment is missing');
    const allPages = [
        'index.html', 'forgot.html', 'register.html', 'internet_risk.html',
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

    for (const page of allPages) {
        const markup = readFileSync(join(corporateRoot, page), 'utf8');
        assert.doesNotMatch(markup, /\.pac-group\s*\{|\.btn-request-pac\s*\{/, `${page} retains an unused PAC style`);
    }

    for (const page of allPages.slice(4)) {
        const markup = readFileSync(join(corporateRoot, page), 'utf8');
        assert.doesNotMatch(markup, /style="background: radial-gradient\(circle at 20% 30%/, `${page} retains the shared portal gradient inline`);
    }
});

test('Corporate portal source uses the canonical navigation, action, and status component names', () => {
    const corporateRoot = join(root, 'PMO corporate');
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

    for (const page of portalPages) {
        const markup = readFileSync(join(corporateRoot, page), 'utf8');
        assert.match(markup, /pmo-primary-nav/, `${page} missing canonical primary navigation`);
        assert.doesNotMatch(markup, /pmo-status-badge|pmo-btn-(?:approve|reject|transact)|badge-alert/, `${page} contains retired component markup`);
    }

    for (const contract of ['.pmo-button--success', '.pmo-button--danger-outline', '.pmo-button--compact']) {
        assert.match(core, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
    }

    assert.doesNotMatch(corporateTableSystem, /pmo-btn-(?:approve|reject|transact)|pmo-status-badge/, 'table system retains retired component aliases');
});

test('Corporate action bars use one footer-safe shared pattern', () => {
    const actionPages = new Map([
        ['eop/abort_payment.html', { bars: 2, regions: 1 }],
        ['eop/authorise_detail.html', { bars: 2, regions: 1 }],
        ['eop/payment_detail.html', { bars: 3, regions: 2 }],
        ['unit-trust/authorise_redemption.html', { bars: 2, regions: 1 }],
        ['unit-trust/authorise_topup.html', { bars: 1, regions: 1 }],
        ['unit-trust/redemption.html', { bars: 3, regions: 2 }],
        ['unit-trust/top_up.html', { bars: 3, regions: 2 }]
    ]);

    for (const [page, expected] of actionPages) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.equal((markup.match(/\bpmo-action-bar\b/g) || []).length, expected.bars, `${page} action bar count drifted`);
        assert.equal((markup.match(/\bpmo-action-region\b/g) || []).length, expected.regions, `${page} needs its full-width action region`);
        assert.doesNotMatch(markup, /pmo-btn-action|pmo-action-bar flex-wrap/, `${page} retains a legacy action treatment`);
    }

    for (const contract of ['.pmo-action-region', '.pmo-action-bar', '.pmo-action-region .pmo-action-bar']) {
        assert.match(core, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
    }

    assert.doesNotMatch(corporateDashboardStyles, /^\.pmo-action-bar\b/m, 'legacy Corporate action-bar contract remains outside the shared core');
});

test('Corporate completion screens use the compact shared transaction outcome header', () => {
    const completionPages = [
        'unit-trust/authorise_redemption.html', 'unit-trust/top_up.html', 'unit-trust/redemption.html',
        'eop/authorise_detail.html', 'eop/payment_detail.html', 'eop/abort_payment.html'
    ];

    for (const page of completionPages) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        for (const contract of ['pmo-outcome-header', 'pmo-outcome-icon', 'pmo-outcome-title']) {
            assert.match(markup, new RegExp(contract), `${page} missing ${contract}`);
        }
        assert.doesNotMatch(markup, /Clean Success Hero Header|<!-- Status Header -->/, `${page} retains a large legacy outcome header`);
        assert.doesNotMatch(markup, /width:\s*(?:60|72)px;\s*height:\s*(?:60|72)px/, `${page} retains an oversized outcome icon`);
    }

    for (const contract of ['.pmo-outcome-header', '.pmo-outcome-icon', '.pmo-outcome-icon--success', '.pmo-outcome-title', '.pmo-outcome-copy']) {
        assert.match(core, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
    }
});

test('Corporate statement registers distinguish documents from financial data', () => {
    const unitTrustStatements = readFileSync(join(root, 'PMO corporate/unit-trust/statements.html'), 'utf8');
    const eopStatements = readFileSync(join(root, 'PMO corporate/eop/statements.html'), 'utf8');

    assert.equal((unitTrustStatements.match(/pmo-data-table--documents/g) || []).length, 6, 'Unit Trust must classify every document register');
    assert.match(unitTrustStatements, /pmo-data-table--statement-financial/, 'Tax voucher must retain a financial table treatment');
    assert.equal((eopStatements.match(/pmo-data-table--documents/g) || []).length, 4, 'EOP must classify every statement register');

    for (const contract of [
        '.pmo-data-table--documents', '.pmo-data-table--document-download',
        '.pmo-data-table--document-downloads-3', '.pmo-data-table--statement-financial'
    ]) {
        assert.match(corporateTableSystem, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
    }
});

test('Corporate statement workspaces use one surface rather than cards within cards', () => {
    for (const [name, page] of [
        ['Unit Trust Statements', 'unit-trust/statements.html'],
        ['EOP Statements', 'eop/statements.html']
    ]) {
        const markup = readFileSync(join(root, 'PMO corporate', page), 'utf8');
        assert.match(markup, /pmo-card__body/, `${name} needs the shared workspace surface`);
        assert.match(markup, /pmo-statement-section/, `${name} needs the shared flat section pattern`);
        assert.doesNotMatch(markup, /document-register|border rounded-4 overflow-hidden/, `${name} retains a nested statement card`);
    }

    for (const contract of ['.pmo-statement-section', '.pmo-statement-empty']) {
        assert.match(core, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing ${contract}`);
    }
});
