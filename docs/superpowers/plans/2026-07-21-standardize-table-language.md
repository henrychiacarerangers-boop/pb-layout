# Table Language Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every production table one consistent hierarchy for headers, cells, key values, detail labels, spacing, and hover state.

**Architecture:** Keep the existing `.custom-table` and `.custom-table-details` API for dashboard pages, strengthen its semantic styles in the shared dashboard stylesheet, and introduce `.pmo-table` for legacy marketing, PRS, and Hexabox tables. No page-specific inline typography is used for the standard styles.

**Tech Stack:** Static HTML, CSS, Bootstrap, Montserrat.

## Global Constraints

- Header: 12px / 700 / `#64748b` / `#f8fafc`.
- Body: 13px / 500 / `#16161a`; key values use 600 only.
- Detail labels: 12px / 600 / `#64748b`; detail values: 13px / 600 / `#16161a`.
- Preserve all existing table data, controls, and responsive wrappers.

---

### Task 1: Strengthen the shared dashboard component

**Files:**
- Modify: `PMO corporate/css/dashboard-styles.css`

- [ ] Set the shared header and body typography, colour, padding, divider, and hover tokens for `.custom-table`.
- [ ] Split `.custom-table-details` label and value cells by column so the detail hierarchy remains visible.
- [ ] Verify all corporate dashboard tables still use either `.custom-table` or `.custom-table-details`.

### Task 2: Migrate legacy tables

**Files:**
- Modify: `PMO corporate/css/styles.css`
- Modify: `PMO corporate/css/hexabox/brand-overrides.css`
- Modify: `PMO corporate/index.html`
- Modify: `PMO corporate/eop/prs_fund_detail.html`
- Modify: `PMO corporate/hexabox_demo.html`
- Modify: `PMO/index.html`
- Modify: `PMO/css/styles.css`
- Modify: `Corporate Website/landing.html`
- Modify: `Corporate Website/css/styles.css`

- [ ] Add the reusable `.pmo-table` component in every stylesheet used by a legacy table.
- [ ] Add `.pmo-table` to each legacy table without changing table semantics or content.
- [ ] Verify no production table remains outside the shared table language.

### Task 3: Verify static consistency

**Files:**
- Verify only.

- [ ] Run markup searches to confirm all dashboard tables retain shared classes and all legacy tables have `.pmo-table`.
- [ ] Inspect the final diff to confirm no pre-existing user edits were modified.
