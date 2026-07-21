# Calm Financial Table Design

## Taste Skill Direction

**Design read:** a minimalist financial workspace for people checking money, not a generic dashboard. It should feel precise, calm, and immediately scannable, with one navy accent carrying all interactive and primary-identifier emphasis.

This is an audit-first redesign. Existing table structure, URLs, labels, filters, form fields, IDs, downloads, and control behaviour are preserved. Only inconsistent presentation is consolidated.

### Consistency Locks

- **Colour lock:** navy `#002E77` is the only ordinary accent. Semantic status colours remain reserved for status meaning.
- **Shape lock:** a single 12px frame radius applies to data-table containers. Buttons and dropdowns keep their existing component shapes.
- **Theme lock:** clean off-white page backgrounds and white table surfaces. No gradients, tinted dashboard cards, or competing section themes.

## Purpose

Make every production EOP and Unit Trust table easy to scan: one obvious identifier, clear operational data, visible links, and minimal visual noise. The design must preserve every existing value, link, filter, download, status, button, and menu behaviour.

## Visual Hierarchy

- **Primary identifiers:** fund names, account numbers, reference numbers, invoice numbers, and statement numbers use navy `#002E77`, 600 weight, 13px. They are not automatically underlined unless interactive.
- **Operational data:** dates, transaction amounts, units, prices, volatility, and returns use charcoal `#16161A`, 500 weight, 13px. Dates are never muted.
- **Supporting metadata:** descriptions, scheme details, user names, and secondary labels use slate `#6B7A90`, 12px, 500 weight.
- **Links/downloads:** regular table anchors use navy, 700 weight, and a 1px underline. Hover uses darker navy.
- **Statuses:** retain semantic green, amber, red, or neutral colours. No status colour is repurposed for ordinary text.

The result avoids decorative typography, excess pills, vertical grid lines, and hard-coded layout tricks. Meaning comes from the data hierarchy, not from competing visual effects.

## Layout and Interaction

- Use a white, 12px-radius table frame with a 1px `#E8EEF5` border and subtle shadow.
- Use a pale `#F8FAFC` header, 12px/700 slate labels, and only horizontal `#EEF3F8` row dividers. Long tables use dividers sparingly and never vertical grid lines.
- Use 14px × 16px cells, left aligned, and content-driven columns by default. Dashboard Fund Analytics uses its shared responsive 40/20/20/20 profile in EOP and Unit Trust.
- Hover and keyboard-focus rows use a pale blue `#EAF2FF` state. Clickable rows also show a pointer cursor and a navy focus edge. Hover is the only decorative interaction state.
- Dropdown menu entries and the Pending Approval “View Details” buttons stay as controls; they are excluded from text-link styling.

## Semantic Contract

- `pmo-table-primary`: main row identifiers only.
- `pmo-table-date`: dates and times; always charcoal.
- `pmo-table-meta`: supporting descriptions and secondary details only.
- `pmo-table-link`: normal navigational and download anchors.
- `pmo-table-dropdown-action` and `pmo-table-action-button`: preserved control exceptions.

## Scope and Validation

- Apply the design consistently across EOP, Unit Trust, and shared analytics tables. Corporate landing and Hexabox demo tables remain outside this hierarchy pass.
- The table verifier must require semantic primary/metadata classes in identified columns, reject legacy table styling, and preserve control exceptions.
- Validate dashboard analytics, account holdings, transactions, statements/downloads, authorisation, and analytics tables in both portals. Run the table verifier and `git diff --check`.
