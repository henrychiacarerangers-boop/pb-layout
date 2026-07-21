import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../PMO corporate/unit-trust/statements.html', import.meta.url), 'utf8');
const taxPanel = html.match(/<div class="tab-pane fade" id="tax"[\s\S]*?(?=<!-- Fund Reports Tab -->)/)?.[0] ?? '';

test('Statements provides a Tax Voucher on Distribution tab with the required listing fields', () => {
    assert.match(html, /id="utStmtTabTax"/);
    assert.match(html, /Tax Voucher on Distribution/);

    [
        'Fund Name',
        'Account No.',
        'Distribution Type',
        'Financial Year Ended',
        'Entitlement Date',
        'Distribution Date',
        'Gross Distribution',
        'Net Distribution'
    ].forEach((column) => assert.match(html, new RegExp(column)));

    assert.match(taxPanel, /class="tax-voucher-download/);
    assert.doesNotMatch(taxPanel, /<th[^>]*>Download<\/th>/);
    assert.match(taxPanel, /0193922094/);
    assert.doesNotMatch(taxPanel, /UT-001-234567/);
});
