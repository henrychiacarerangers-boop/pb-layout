# Agent Rules

---
description: Enforces the "Pro Max" premium corporate design system rules, color palettes, Montserrat typography, and button/card curves.
globs: ["**/*.html", "**/*.css"]
alwaysApply: true
---
# PMO Corporate Design System Guidelines (Pro Max)

Whenever you edit HTML pages, write custom CSS rules, or create UI structures for the PMO Corporate Portal, you must enforce the following color, shape, font, and animation tokens:

## 1. Color Palette Tokens (Strict Specification)

### Primary & Brand Colors
- **Brand Red**: `#ff1700`
  - *Primary use*: Primary CTA buttons, key action highlights, error/alert text banners, main header accents.
- **Brand Navy**: `#000000`
  - *Primary use*: Base navbars, footer panels, branding elements, major structural container lines.

### Support Colors & Gradients
- **Dark Accent Navy/Purple**: `#373761`
  - *Primary use*: Standard heading text, dark theme elements, primary button outlines.
- **Active Accent Blue**: `#002e77`
  - *Primary use*: Focus outlines, active highlights, badges, tooltips.
- **Subtle Slate Blue**: `#5d678e`
  - *Primary use*: Form labels, borders, subtle text cards, icons.
- **Light Analytics Grey**: `#dce3e8`
  - *Primary use*: Overall page background fields, background shading, table header groupings.
- **Neutral Charcoal**: `#404041`
  - *Primary use*: Standard body copy, details summaries, labels text.

### Semantic Intent Scales
- **Success/Completed**: `#12a833`
- **Warning/Pending**: `#ce7226`
- **Error/Alert**: `#ff1700`

---

## 2. Typography Rules (Google Fonts Montserrat)
- **Primary Font Family**: `'Montserrat', sans-serif`.
- **H1 Titles (e.g., Welcome, Multi-step headings)**: `font-weight: 700` (Bold).
- **H2 & H3 Titles (Card Headers, Module Names)**: `font-weight: 700` (Bold).
- **Form Labels, Buttons, and Table Headers**: `font-weight: 600` (Semi-bold).
- **Paragraphs, Descriptions, Table Body Copy**: `font-weight: 400` (Regular).
- **Auxiliary Micro-copy, Footnotes**: `font-weight: 300` (Light) or `500` (Medium).

---

## 3. Surface & Layout Architecture

### Card Containers (`.card`)
- **Rounding**: All card containers must use `border-radius: 15px !important` (override default Bootstrap curves).
- **Elevation Shadow**: Use a deep, soft floating shadow profile:
  ```css
  box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
  ```
- **Padding**: Internal padding must be generous (`padding: 30px` to `padding: 40px`).

### Buttons (`.btn`)
- **Pills**: All primary and secondary trigger buttons must be pill-shaped (`border-radius: 25px`).
- **Transitions**: Every hover state must use smooth animations:
  ```css
  transition: all 0.3s ease;
  ```
- **Primary CTA**: Colored solid Brand Red (`#ff1700`), hovering to `#c41219` with a subtle elevation shift:
  ```css
  .btn-primary:hover {
      background-color: #c41219;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(237, 28, 36, 0.3);
  }
  ```

### Form Inputs
- **Rounding**: Form fields should have a soft rounded corner: `border-radius: 8px`.
- **Vertical Spacing**: Generous vertical and horizontal padding (`padding: 12px 16px`).
- **Focus glow**: Override default blue halos to a soft Brand Red overlay:
  ```css
  input:focus, select:focus {
      border-color: #ff1700 !important;
      box-shadow: 0 0 8px rgba(237, 28, 36, 0.25) !important;
      outline: none;
  }
  ```

---

## 4. Layout Composition
- **Negative Space**: Avoid cluttered margins; allow elements "breathing room" by utilizing Bootstrap's `mb-4`, `p-4`, or custom CSS spacing grids.
- **Asymmetry**: For login and initial portal forms, prefer offset, modern layouts (e.g., right-aligned cards with `justify-content: flex-end; padding-right: 5%`) rather than basic centered boxes.
- **Iconography**: Standardize on **Iconoir** minimalist outline icons to maintain crisp lines across all screens.


- **Do Not Run Tests on User System**: When making changes, do not run browser subagents, dev servers, or automated test commands to verify the work. The user will handle verification and testing themselves.
