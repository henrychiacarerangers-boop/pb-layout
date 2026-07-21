import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../PMO corporate/unit-trust/statements.html', import.meta.url), 'utf8');
const fundReportsPanel = html.match(/<div class="tab-pane fade" id="fundreports"[\s\S]*?(?=<!-- PRS Tab -->)/)?.[0] ?? '';

test('Fund Reports has an explicit Show action and visible language PDF download buttons', () => {
    assert.match(fundReportsPanel, /id="showFundReports"/);
    assert.match(fundReportsPanel, /data-keep-download-column/);
    assert.match(fundReportsPanel, />English<\/th>/);
    assert.match(fundReportsPanel, />Bahasa Malaysia<\/th>/);
    assert.match(fundReportsPanel, />Mandarin<\/th>/);
    assert.match(fundReportsPanel, /iconoir-download/);
});
