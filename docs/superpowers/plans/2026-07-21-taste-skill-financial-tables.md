# Taste Skill Financial Tables Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver one calm, minimalist financial table system across EOP, Unit Trust, and shared analytics without changing content or behaviour.

**Architecture:** `table-system.css` remains the only source of table presentation. Production HTML carries only semantic table classes, while `tools/verify-table-system.mjs` enforces shared markup, stylesheet loading, link exceptions, and the semantic content hierarchy. No page stylesheet may introduce a competing table visual language.

**Tech Stack:** Static HTML, CSS, Bootstrap 5 utilities preserved only for non-presentation behaviour, Node.js static verification.

## Global Constraints

- Preserve every value, `href`, ID, name, data attribute, filter, tab, tooltip, download flow, JavaScript hook, dropdown, and existing control behaviour.
- Use navy `#002E77` as the sole ordinary accent; keep semantic success, warning, and danger colours only for status meaning.
- Use one 12px table-frame radius and an off-white/white visual theme; do not add gradients, vertical grid lines, or page-local table styling.
- Keep dates and numeric operational data charcoal `#16161A`; use muted slate only for supporting metadata.
- Normal table links are navy, 700 weight, and underlined. Dropdown items and only the Unit Trust Pending Approval `View Details` buttons remain control exceptions.
- Scope the semantic-markup audit to `PMO corporate/eop`, `PMO corporate/unit-trust`, and `PMO corporate/analytics`. The master system still loads on every current production table page.

---

## File Structure

- `table-system.css` owns all shared frame, header, cell, semantic, link, hover, focus, responsive, and status presentation.
- `tools/verify-table-system.mjs` is the no-dependency regression test for all production HTML table markup and CSS references.
- `PMO corporate/eop/*.html`, `PMO corporate/unit-trust/*.html`, and `PMO corporate/analytics/*.html` own semantic class placement only. They must not add presentation CSS or alter data/control behaviour.

### Task 1: Make the table verifier accurately inspect semantic table content

**Files:**
- Modify: `tools/verify-table-system.mjs:1-122`
- Test: `tools/verify-table-system.mjs`

**Interfaces:**
- Consumes: production HTML files under `PMO corporate`, `PMO`, and `Corporate Website`.
- Produces: exit code `0` with `Table-system verification passed: 32 production pages checked.`; exit code `1` plus a precise page/table reason on a regression.

- [ ] **Step 1: Confirm the current regression fails**

Run: `node tools/verify-table-system.mjs`

Expected: FAIL, reporting primary-column cells that contain the semantic class on nested content rather than exclusively on the `<td>` element.

- [ ] **Step 2: Add a semantic-content helper and use it for row checks**

Add this helper after `visibleText`:

```js
function hasSemanticClass(markup, className) {
  return new RegExp(`\\b${className}\\b`, 'i').test(markup);
}
```

Replace both direct semantic-class checks in the body-row loop with:

```js
if (cells[column] && !hasSemanticClass(cells[column][0], 'pmo-table-primary')) {
  failures.push(`${label}: table ${index + 1} primary column lacks pmo-table-primary`);
}

if (cells[column] && !hasSemanticClass(cells[column][0], 'pmo-table-meta')) {
  failures.push(`${label}: table ${index + 1} metadata column lacks pmo-table-meta`);
}
```

Keep the existing link-control exceptions and current-table-revision assertion unchanged.

- [ ] **Step 3: Run the verifier after the minimal correction**

Run: `node tools/verify-table-system.mjs`

Expected: Either PASS, or a short actionable set of real missing semantic classes for Task 3. No false failures caused by a class on nested table content.

- [ ] **Step 4: Commit the verifier correction**

```bash
git add tools/verify-table-system.mjs
git commit -m "test: verify nested table semantics"
```

### Task 2: Consolidate the Taste Skill visual system in the master stylesheet

**Files:**
- Modify: `table-system.css:1-155`
- Test: `tools/verify-table-system.mjs`

**Interfaces:**
- Consumes: `pmo-table-frame`, `pmo-data-table`, `pmo-table-primary`, `pmo-table-date`, `pmo-table-meta`, `pmo-table-link`, `pmo-table-status`, `pmo-table-action-button`, and `pmo-table-dropdown-action` markup.
- Produces: a single consistent table surface and hierarchy, with no page-level table visual overrides.

- [ ] **Step 1: Define the financial visual tokens at the top of the master stylesheet**

Use one token set and apply it throughout the file:

```css
.pmo-table-frame,
.table-responsive:has(> .pmo-data-table) {
  --pmo-table-navy: #002E77;
  --pmo-table-navy-hover: #001F52;
  --pmo-table-ink: #16161A;
  --pmo-table-slate: #64748B;
  --pmo-table-border: #E8EEF5;
  --pmo-table-divider: #EEF3F8;
  --pmo-table-header: #F8FAFC;
  --pmo-table-hover: #EAF2FF;
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--pmo-table-border);
  border-radius: 12px;
  background: #FFFFFF;
  box-shadow: 0 1px 2px rgba(15, 40, 78, 0.025);
}
```

- [ ] **Step 2: Apply the shared hierarchy without special-case page rules**

Keep all table cells left-aligned and use these semantic rules:

```css
.pmo-data-table .pmo-table-primary {
  color: var(--pmo-table-navy) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  letter-spacing: -0.005em;
}

.pmo-data-table .pmo-table-date {
  color: var(--pmo-table-ink) !important;
  font-size: 13px !important;
  font-weight: 500 !important;
}

.pmo-data-table .pmo-table-meta {
  color: #6B7A90 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 18px;
}

.pmo-data-table :is(.pmo-table-link, .pmo-table-action),
.pmo-data-table a[href]:not(.pmo-table-action-button):not(.pmo-table-dropdown-action) {
  color: var(--pmo-table-navy) !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: underline !important;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
```

Retain the existing pale-blue hover/focus treatment, semantic status variants, responsive padding, details table layout, and analytics 40/20/20/20 profile. Do not add fixed pixel column widths elsewhere.

- [ ] **Step 3: Assert no page CSS competes with the master system**

Run: `rg -n --glob '*.css' '\\.(?:custom-table(?:-details)?|pmo-table(?!-)|mini-table|prs-analytics-table)\\b' 'PMO corporate' PMO 'Corporate Website'`

Expected: no output.

- [ ] **Step 4: Commit the master stylesheet consolidation**

```bash
git add table-system.css
git commit -m "style: refine financial table hierarchy"
```

### Task 3: Apply semantic hierarchy across EOP, Unit Trust, and analytics tables

**Files:**
- Modify: `PMO corporate/eop/Abort_payment.html`, `PMO corporate/eop/analytics.html`, `PMO corporate/eop/authorise.html`, `PMO corporate/eop/authorise_detail.html`, `PMO corporate/eop/contribution.html`, `PMO corporate/eop/dashboard.html`, `PMO corporate/eop/einvoice.html`, `PMO corporate/eop/intro.html`, `PMO corporate/eop/invoice.html`, `PMO corporate/eop/payment.html`, `PMO corporate/eop/payment_detail.html`, `PMO corporate/eop/prs_fund_detail.html`, `PMO corporate/eop/statements.html`, `PMO corporate/eop/transaction_detail.html`, `PMO corporate/eop/transactions.html`
- Modify: `PMO corporate/unit-trust/analytics.html`, `PMO corporate/unit-trust/authorise.html`, `PMO corporate/unit-trust/authorise_redemption.html`, `PMO corporate/unit-trust/authorise_topup.html`, `PMO corporate/unit-trust/dashboard.html`, `PMO corporate/unit-trust/online_activities.html`, `PMO corporate/unit-trust/settings.html`, `PMO corporate/unit-trust/statements.html`, `PMO corporate/unit-trust/transactions.html`, `PMO corporate/unit-trust/view_account.html`, `PMO corporate/unit-trust/view_account_detail.html`
- Modify: `PMO corporate/analytics/eop.html`, `PMO corporate/analytics/unit-trust.html`
- Test: `tools/verify-table-system.mjs`

**Interfaces:**
- Consumes: the semantic CSS classes from `table-system.css`.
- Produces: uniform semantic markup for each production financial table while preserving all existing DOM hooks and control classes.

- [ ] **Step 1: Mark primary content in each identified table column**

For every header matching Fund, Account, Reference/Ref No., or e-Invoice, apply `pmo-table-primary` to the existing cell or its existing primary child. Preserve all original values and markup. Examples:

```html
<td class="pmo-table-primary">
  <a href="view_account_detail.html" class="pmo-table-link">094766567</a>
</td>

<td class="pmo-table-link pmo-table-primary">
  <span class="d-block">TR2600004083678</span>
</td>
```

- [ ] **Step 2: Mark operational dates and supporting metadata separately**

Apply `pmo-table-date` to dates/times and `pmo-table-meta` only to secondary description, scheme, user, and prepared information. Do not mute dates. Example:

```html
<td class="pmo-table-date">28 Apr 2026</td>
<td class="pmo-table-meta">Cash scheme</td>
```

- [ ] **Step 3: Normalize anchors without changing controls**

Every normal table anchor keeps its original `href`, ID, attributes, and event hooks and gains `pmo-table-link`. Remove only conflicting colour, text-decoration, weight, and size utility classes. Leave these two exceptions unchanged:

```html
<a class="dropdown-item pmo-table-dropdown-action" ...>
<a class="btn ... pmo-table-action-button" href="authorise_topup.html?...">View Details</a>
```

- [ ] **Step 4: Verify all semantic pages and page references**

Run: `node tools/verify-table-system.mjs`

Expected: `Table-system verification passed: 32 production pages checked.`

- [ ] **Step 5: Commit the semantic HTML pass**

```bash
git add 'PMO corporate/eop' 'PMO corporate/unit-trust' 'PMO corporate/analytics'
git commit -m "refactor: unify financial table semantics"
```

### Task 4: Run the design pre-flight and regression checks

**Files:**
- Verify: `table-system.css`
- Verify: `tools/verify-table-system.mjs`
- Verify: all production table pages

**Interfaces:**
- Consumes: completed Tasks 1 through 3.
- Produces: a shippable, consistently styled table system with unchanged page behaviour.

- [ ] **Step 1: Run static table-system verification**

Run: `node tools/verify-table-system.mjs`

Expected: `Table-system verification passed: 32 production pages checked.`

- [ ] **Step 2: Run whitespace and scope checks**

Run:

```bash
git diff --check
git diff --name-only -- 'PMO corporate/eop' 'PMO corporate/unit-trust' 'PMO corporate/analytics' table-system.css tools/verify-table-system.mjs
```

Expected: no whitespace errors; changed paths limited to the master system, verifier, and intended financial HTML pages.

- [ ] **Step 3: Review representative tables against the design read**

Inspect EOP and Unit Trust dashboard Fund Analytics, account holdings, transactions, statements/downloads, authorisation, and analytics tables. Confirm: left-aligned headers, dark dates, navy primary identifiers, navy bold underlined links, light horizontal dividers, no vertical rules, and unchanged dropdown/View Details controls.

- [ ] **Step 4: Commit the verification checkpoint if it contains changes**

```bash
git status --short
git add table-system.css tools/verify-table-system.mjs 'PMO corporate/eop' 'PMO corporate/unit-trust' 'PMO corporate/analytics'
git commit -m "test: verify financial table system"
```

Skip the commit if Task 4 introduced no file changes.
