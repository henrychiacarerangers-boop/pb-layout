import playwright from '/Users/henrychia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
import path from 'node:path';

const { chromium } = playwright;

const root = '/Users/henrychia/Desktop/PB design/Public Mutual';
const out = path.join(root, '.tmp-presentation/assets');
const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const page = await browser.newPage({ viewport: { width: 1440, height: 940 }, deviceScaleFactor: 1 });

async function shot(relativePath, output, action) {
  await page.goto(`file://${path.join(root, relativePath)}`, { waitUntil: 'networkidle' });
  if (action) await action();
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(out, output), fullPage: false });
}

await shot('PMO corporate/register.html', 'registration-terms.png');
await shot('PMO corporate/register.html', 'registration-details.png', async () => {
  await page.locator('#btn-next-1').click();
});
await shot('PMO corporate/register.html', 'registration-security.png', async () => {
  await page.locator('#btn-next-1').click();
  await page.locator('#btn-next-2').click();
});
await shot('PMO corporate/unit-trust/dashboard.html', 'dashboard.png');
await shot('PMO corporate/unit-trust/authorise.html', 'authorise.png');
await shot('PMO corporate/analytics/unit-trust.html', 'analytics.png');

await browser.close();
