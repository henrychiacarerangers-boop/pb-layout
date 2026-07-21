# Tax Voucher on Distribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Tax Voucher on Distribution view beside Annual/Interim in Unit Trust Statements.

**Architecture:** Extend the existing static Statements tab controller with a `tax` panel and route. The new panel presents one compact, responsive index row per voucher while the downloadable PDF remains the source of the detailed tax calculation.

**Tech Stack:** Static HTML, Bootstrap 5, inline vanilla JavaScript, Node.js static assertions.

## Global Constraints

- Preserve unrelated uncommitted work.
- Follow the existing Statements card, tab, table, and URL-query patterns.
- The table must include Fund Name, Account No., Distribution Type, Financial Year Ended, Entitlement Date, Distribution Date, Gross Distribution, Net Distribution, and Download.

---

### Task 1: Tax Voucher view

**Files:**
- Modify: `PMO corporate/unit-trust/statements.html`
- Test: `tests/tax-voucher-distribution.test.mjs`

**Interfaces:**
- Consumes: `#utStmtViewTabs`, `#statementsTabContent`, and the existing query-param tab switcher.
- Produces: `#utStmtTabTax`, `#tax`, and a `tax` query-param route.

- [ ] **Step 1: Write the failing test**

```js
assert.match(html, /id="utStmtTabTax"/);
assert.match(html, /Tax Voucher on Distribution/);
assert.match(html, /Fund Name/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/tax-voucher-distribution.test.mjs`
Expected: FAIL because the tab and voucher table do not exist.

- [ ] **Step 3: Write minimal implementation**

Add the tab next to Annual/Interim, render a responsive voucher table with the required fields and example rows, and include the `tax` query-param route.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/tax-voucher-distribution.test.mjs`
Expected: PASS.

- [ ] **Step 5: Verify the static page structure**

Run: `node --check tests/tax-voucher-distribution.test.mjs && git diff --check`
Expected: both commands exit 0.
