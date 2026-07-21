import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const productionRoots = ['PMO corporate', 'PMO', 'Corporate Website'];
const legacy = /\.(?:custom-table(?:-details)?|pmo-table(?!-)|mini-table|prs-analytics-table)\b/;
const tableInlinePresentation = /<(?:table|thead|tbody|tr|th|td)\b[^>]*\sstyle=(?:"[^"]*(?:width|text-align|font|color|border|background)[^"]*"|'[^']*(?:width|text-align|font|color|border|background)[^']*')/i;
const conflictingTableLinkClass = /\b(?:text-(?:primary|dark|white|decoration-(?:none|underline))|fw-[^\s"]+|fs-[^\s"]+|btn(?:-[^\s"]+)?|dropdown-item|table-action-btn)\b/;
const primaryHeader = /\b(?:fund|account|reference|ref\.?\s*no\.?|e?-?invoice)\b/i;
const metaHeader = /\b(?:date|time|description|scheme|user|prepared)\b/i;

function visibleText(markup) {
  return markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function walk(directory, extension, results = []) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name);
    const info = statSync(file);
    if (info.isDirectory()) walk(file, extension, results);
    else if (file.endsWith(extension)) results.push(file);
  }
  return results;
}

const failures = [];
const tablePages = [];

for (const folder of productionRoots) {
  for (const file of walk(join(root, folder), '.html')) {
    const source = readFileSync(file, 'utf8');
    if (!/<table\b/i.test(source)) continue;
    tablePages.push(file);
    const label = relative(root, file);
    const tables = [...source.matchAll(/<table\b[^>]*>.*?<\/table>/gis)].map((match) => match[0]);
    tables.forEach((table, index) => {
      if (!/\bclass=(?:"[^"]*\bpmo-data-table\b[^"]*"|'[^']*\bpmo-data-table\b[^']*')/i.test(table)) {
        failures.push(`${label}: table ${index + 1} is not a pmo-data-table`);
      }
      const links = table.match(/<a\b(?=[^>]*\bhref=)[^>]*>/gi) ?? [];
      links.forEach((link) => {
        const isPreservedAction = /\bpmo-table-action-button\b/i.test(link);
        const isDropdownAction = /\bpmo-table-dropdown-action\b/i.test(link);
        if (!isPreservedAction && !isDropdownAction && !/\bclass=(?:"[^"]*\bpmo-table-link\b[^"]*"|'[^']*\bpmo-table-link\b[^']*')/i.test(link)) {
          failures.push(`${label}: table ${index + 1} contains a link without pmo-table-link`);
        }
        if (!isPreservedAction && !isDropdownAction && conflictingTableLinkClass.test(link)) {
          failures.push(`${label}: table ${index + 1} contains a link with a legacy presentation class`);
        }
        if (isPreservedAction && (label !== 'PMO corporate/unit-trust/authorise.html' || !/\bhref="authorise_topup\.html\?[^\"]*"/i.test(link))) {
          failures.push(`${label}: table ${index + 1} uses the View Details action exception outside its approved action`);
        }
        if (isDropdownAction && !/\bdropdown-item\b/i.test(link)) {
          failures.push(`${label}: table ${index + 1} uses the dropdown exception outside a dropdown item`);
        }
      });
      if (/^PMO corporate\/(?:eop|unit-trust|analytics)\//.test(label)) {
        const headerMarkup = table.match(/<thead\b[^>]*>(.*?)<\/thead>/is)?.[1] ?? '';
        const headers = [...headerMarkup.matchAll(/<th\b[^>]*>(.*?)<\/th>/gis)].map((header) => visibleText(header[1]));
        const primaryColumns = headers.map((header, index) => primaryHeader.test(header) ? index : -1).filter((index) => index >= 0);
        const metaColumns = headers.map((header, index) => metaHeader.test(header) && !primaryHeader.test(header) ? index : -1).filter((index) => index >= 0);
        const bodyMarkup = table.match(/<tbody\b[^>]*>(.*?)<\/tbody>/is)?.[1] ?? '';
        for (const row of bodyMarkup.matchAll(/<tr\b[^>]*>(.*?)<\/tr>/gis)) {
          const cells = [...row[1].matchAll(/<td\b([^>]*)>.*?<\/td>/gis)];
          for (const column of primaryColumns) {
            if (cells[column] && !/\bpmo-table-primary\b/i.test(cells[column][0])) {
              failures.push(`${label}: table ${index + 1} primary column lacks pmo-table-primary`);
            }
          }
          for (const column of metaColumns) {
            if (cells[column] && !/\bpmo-table-meta\b/i.test(cells[column][0])) {
              failures.push(`${label}: table ${index + 1} metadata column lacks pmo-table-meta`);
            }
          }
        }
      }
    });
    if (!/href=(?:"[^"]*table-system\.css\?v=table-links-20260721"|'[^']*table-system\.css\?v=table-links-20260721')/i.test(source)) {
      failures.push(`${label}: missing the current table-system.css revision`);
    }
    if (legacy.test(source)) failures.push(`${label}: contains a legacy table class`);
    if (tableInlinePresentation.test(source)) failures.push(`${label}: contains a table presentation inline style`);
  }
}

for (const folder of productionRoots) {
  for (const file of walk(join(root, folder), '.css')) {
    const source = readFileSync(file, 'utf8');
    if (legacy.test(source)) failures.push(`${relative(root, file)}: legacy table selector remains`);
  }
}

if (tablePages.length !== 32) failures.push(`Expected 32 production table pages, found ${tablePages.length}`);
if (failures.length) {
  console.error('Table-system verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Table-system verification passed: ${tablePages.length} production pages checked.`);
