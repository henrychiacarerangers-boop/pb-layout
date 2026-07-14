# Public Mutual Corporate Portal Design System 101

This document is a practical inventory of the current website UI system based on the HTML/CSS in this workspace.

It covers:
- Foundational design tokens
- Reusable components
- Page patterns
- Design system basics for handoff and governance

## 1. System Overview

The site is not one single UI. It is a family of related shells:

- `Corporate Website` - public landing / marketing shell
- `PMO` - retail portal shell
- `PMO corporate` - corporate portal shell
- `UTC` - UTC Connect shell

Across these shells, the visual language is shared:

- Montserrat typography
- Public Mutual red + navy brand palette
- Bootstrap 5 layout/grid foundation
- Iconoir iconography
- Rounded cards, pill buttons, subtle shadows
- Premium finance motifs like gradient headers, ticker bars, dot grids, and chart watermarks

## 2. Foundations

### 2.1 Color Tokens

The codebase repeatedly uses these core colors:

| Token | Value | Meaning |
|---|---:|---|
| `--brand-primary` | `#ff1700` | Primary brand red, danger, urgent action |
| `--brand-navy` | `#002e77` or `#0E0D3B` in some shells | Core structural navy |
| `--accent-primary` | `#002e77` | Primary action accent |
| `--action-primary` | `#002e77` | Interactive primary button / active state |
| `--interactive-hover` | `#5d678e` | Hover / secondary interaction tone |
| `--bg-container` | `#FCFCFC` | Surface background |
| `--bg-main` | `#FCFCFC` / `#f8fafc` | Page background |
| `--ui-support` | `#8e9ab0` | Muted labels, helper text |
| `--text-primary` | `#16161a` | Main body text |
| `--text-secondary` | `#48484b` | Secondary body text |

Semantic colors in the UI:

- Success: `#12a833`
- Warning: `#ce7226`
- Neutral / disabled: gray family
- Info / support: muted blue-gray family

### 2.2 Typography

Primary typeface:

- `Montserrat`

Observed usage:

- Headings: 600 to 700 weight
- Body copy: 400 to 500 weight
- Labels / captions: 700 uppercase in some nav and status areas
- Compact metadata: `fs-8`, `fs-9`, `fs-10` scale in dashboards

### 2.3 Spacing and Rhythm

The system uses Bootstrap spacing plus a few recurring rhythms:

- Card padding: `24px`, `30px`, `32px`, `40px`, `50px`
- Section spacing: `20px`, `24px`, `30px`, `40px`, `60px`
- Grid gaps: `g-2`, `g-3`, `g-4`
- Pill controls often use `8px 20px` or similar compact horizontal rhythm

### 2.4 Radius

Core radius scale:

| Token | Value | Use |
|---|---:|---|
| `--radius-sm` | `8px` | Inputs, small cards, chips |
| `--radius-md` | `16px` | Standard cards, modal-like surfaces |
| `--radius-pill` | `50rem` | Pills, badges, CTA buttons |

Additional observed radius values:

- `12px` for scrollable legal boxes, popovers, and some cards
- `20px` to `24px` for premium glass cards

### 2.5 Shadows

| Token | Value | Use |
|---|---:|---|
| `--shadow-sm` | `0 4px 12px rgba(0, 0, 0, 0.03)` | Light elevation |
| `--shadow-md` | `0 8px 24px rgba(0, 0, 0, 0.04)` | Standard card depth |
| `shadow-premium` | `0 15px 45px rgba(0, 0, 0, 0.08)` | Premium dashboard surfaces |

### 2.6 Motion

The motion language is subtle and premium:

- Hover lift on cards
- Button hover darkening and slight translateY
- Smooth tab underline transitions
- Carousel fade
- Ticker marquee scrolling
- Toast slide-in with spring-like ease
- Scroll indicator animation

### 2.7 Background System

The site uses several reusable financial background motifs:

- Dot grid
- Rising trend line
- Diagonal stripes
- Topographic contour
- Circuit / security nodes
- Candlestick watermark
- Glass white overlay
- Dark hero gradients

These are defined as utility backgrounds such as:

- `.bg-fin-dot-grid`
- `.bg-fin-trend`
- `.bg-fin-circuit`
- `.bg-fin-candlestick`
- `.bg-fin-hero-panel`
- `.bg-fin-utc-hero`

## 3. Component Library

Below is the current reusable component inventory. This is a mix of Bootstrap overrides, custom components, and page-specific patterns that already behave like design system primitives.

### 3.1 Navigation

#### 3.1.1 Top Utility Nav

Used on landing pages and portal shells.

Common traits:
- Brand logo left
- Utility icons / profile menu right
- Search / notification / language / dropdowns

Representative classes:
- `.top-nav`
- `.widescreen-header`
- `.widescreen-header-links`
- `.header-utility-icon`
- `.pmo-user-dropdown-btn`
- `.pmo-user-dropdown-menu`

#### 3.1.2 Primary Nav / Section Tabs

Used for portal shell switching and section navigation.

Variants:
- Top portal switch pills
- Dashboard tabs
- View tabs
- Explorer tabs
- Gateway tabs

Representative classes:
- `.nav-pill`
- `.active-pill`
- `.dashboard-tabs`
- `.view-tab`
- `.explorer-tabs`
- `.explorer-tab-btn`
- `.gateway-tabs`
- `.gateway-tab-btn`
- `.top-tab`
- `.top-link-item`

#### 3.1.3 Offcanvas Sidebar

Used for mobile / compact navigation.

Representative classes:
- `#sidebarMenu`
- `#eopSidebarOffcanvas`
- `.eop-sidebar-offcanvas`

### 3.2 Buttons

#### Core Buttons

| Component | Use |
|---|---|
| `.btn-primary` | Main action in forms and generic CTA |
| `.btn-danger` | High priority / destructive / urgent action |
| `.btn-dark` | Structural or secondary dark action |
| `.btn-navy` | Portal-specific primary dark button |
| `.btn-outline-navy` | Secondary action with navy emphasis |

#### Special Buttons

| Component | Use |
|---|---|
| `.btn-log-in` | Login submit |
| `.btn-clear` | Reset / clear form |
| `.btn-log-in-inline` | Inline login CTA |
| `.btn-clear-inline` | Inline login reset |
| `.btn-hero-cta` | Hero primary CTA |
| `.btn-hero-outline-cta` | Hero secondary CTA |
| `.btn-back-circle` | Back navigation |
| `.btn-legal-agree` | Terms acceptance |
| `.btn-legal-disagree` | Terms decline |
| `.btn-request-pac` | PAC request action |
| `.header-cta-btn` | Header-level promotional CTA |
| `.btn-gold-card-cta` | Premium solution card CTA |

Button states observed:
- Default
- Hover
- Disabled
- Active
- Loading in some pages via spinner patterns

### 3.3 Forms

#### Inputs

Observed form primitives:
- `.form-control`
- `.input-group-text`
- `.border-end-0`
- `.border-start-0`
- `.form-label`
- `.form-check-input`
- `.custom-checkbox`
- `.custom-check-list`
- `.pac-group`

#### Form Patterns

| Pattern | Description |
|---|---|
| Login form | Credential input, clear button, visibility controls |
| Registration form | Multi-step onboarding with terms acceptance |
| PAC verification | Inline request button inside input group |
| Legal acknowledgement | Long scrollable legal text + checkbox + agree/disagree |
| Security verification | Checkbox-heavy confirmation flows |

#### Validation / Feedback

Observed feedback elements:
- `.invalid-feedback`
- `.valid`
- `.sms-toast`
- `.scroller-badge`

### 3.4 Cards / Surfaces

This is one of the strongest parts of the system.

| Component | Role |
|---|---|
| `.card` | Base surface and general container |
| `.login-card` | Login panel |
| `.register-card` | Registration panel |
| `.legal-card` | Policy / agreements page container |
| `.inline-login-card` | Premium hero-side login module |
| `.fund-card` | Fund summary card |
| `.insight-card` | Insights / explorer card |
| `.solution-glass-card` | Premium sales / product card |
| `.financial-card` | Marketing / solution hover card |
| `.pac-verification-card` | PAC verification block |
| `.eop-last-contribution-badge` | Dashboard summary strip |
| `.portal-sidebar-profile-card` | Sidebar profile summary |
| `.filter-sidebar-card` | Filters panel card |
| `.txn-panel` | Transaction workspace panel |

Common card traits:
- White or glass surface
- 1px subtle border
- Rounded corners
- Soft shadow
- Card header/body/footer separation
- Hover lift on premium cards

### 3.5 Badges / Status

#### Alert Badges

Base:
- `.badge-alert`

Variants:
- `.badge-alert-solid-danger`
- `.badge-alert-solid-success`
- `.badge-alert-solid-warning`
- `.badge-alert-solid-secondary`
- `.badge-alert-solid-primary`
- `.badge-alert-outline-danger`
- `.badge-alert-outline-success`
- `.badge-alert-outline-warning`
- `.badge-alert-outline-secondary`
- `.badge-alert-outline-primary`

#### Status Chips

| Component | Meaning |
|---|---|
| `.status-badge` | Generic status pill |
| `.status-muted` | Neutral / pending / disabled |
| `.status-success` | Approved / successful |
| `.status-failed` | Rejected / failed |
| `.fund-risk-badge` | Risk level marker |
| `.risk-low` | Low risk |
| `.risk-med` | Medium risk |
| `.risk-high` | High risk |
| `.scroller-badge` | Small label badge |
| `.card-title-badge` | Hero login label |

### 3.6 Tables

#### Standard Tables

| Component | Role |
|---|---|
| `.custom-table` | Main system table style |
| `.mini-table` | Compact summary table |
| `.custom-table-details` | Detail view table variant |
| `.table-action-btn` | Row action control |
| `.summary-row` | Key totals / summary row |

Table language:
- Strong header typography
- Light row hover tint
- Compact body rows
- Responsive wrapping via `.table-responsive`

### 3.7 Data Display / KPI Blocks

| Component | Role |
|---|---|
| `.stat-box` | KPI tile |
| `.amount-value` | Masked / revealable figures |
| `.profile-label` / `.profile-value` | Profile detail pair |
| `.financial-label` / `.financial-val` | Financial metric pair |
| `.legend-item` / `.legend-mark` | Chart legend |
| `.dot` | Carousel / pager indicator |
| `.bubble-info` | Helper info block |

### 3.8 Feedback / Notices

| Component | Role |
|---|---|
| `.alert-banner` | Top warning / maintenance banner |
| `.badge-alert` | Inline alert strip |
| `.sms-toast` | Success / notification toast |
| `.security-popover-box` | Security advisory popover |
| `.popover-divider` | Popover content separator |
| `.invalid-feedback` | Validation feedback |

### 3.9 Process / Stepper

Used in registration and gated workflows.

| Component | Role |
|---|---|
| `.stepper-container` | Stepper row |
| `.step` | Single step |
| `.step.active` | Current step state |
| `.step-circle` | Step number / icon node |
| `.step-text` | Step label |
| `.step-line` | Connecting line |
| `.step-line.active` | Completed line state |

### 3.10 Tabs / Segment Controls

Observed tab-like controls:

- `.dashboard-tabs`
- `.view-tab`
- `.top-tab`
- `.explorer-tab-btn`
- `.gateway-tab-btn`
- `.chart-tab-mock-btn`
- `.platform-tab`

These represent a common segmented-control pattern even when implemented with different class names.

### 3.11 Hero / Marketing / Promo

| Component | Role |
|---|---|
| `.hero-section` | Landing hero |
| `.hero-slider` | Carousel wrapper |
| `.carousel-indicators` | Slide pagination |
| `.banner-slide-wrapper` | Hero banner image wrapper |
| `.ticker-section` | Market ticker / marquee |
| `.ticker-label` | Ticker label block |
| `.ticker-text-scroll` | Scrolling ticker content |
| `.pmo-plus-promo` | Promotional callout section |
| `.promo-card` | Promo card |
| `.solution-glass-card` | High-end product showcase |
| `.showcase-icon-wrapper` | Icon highlight circle |
| `.imac-device-mockup` | Desktop device mock visualization |

### 3.12 Analytics / Charting

| Component | Role |
|---|---|
| `.chart-container-mock` | Chart card container |
| `.chart-tabs-mock` | Chart range selector |
| `.chart-graph-svg` | Chart rendering area |
| `.chart-container-mock` | Chart shell |
| `.chart-bar` | Mock chart bar |

## 4. Canonical Page Patterns

These are the recurring screen archetypes in the site.

### 4.1 Login Pattern

Used by:
- `PMO/index.html`
- `UTC/index.html`
- `PMO corporate/index.html`

Structure:
- Top header with brands and utilities
- Hero background or image panel
- Login card or inline login card
- Support links / utility footer

### 4.2 Registration Pattern

Used by:
- `register.html`

Structure:
- Stepper
- Title + subtitle
- Terms box
- Checklists
- PAC input section
- CTA buttons

### 4.3 Legal / Agreement Pattern

Used by:
- `internet_risk.html`
- other policy screens

Structure:
- Centered card
- Scrollable content box
- Agreement actions

### 4.4 Dashboard Shell

Used by:
- Unit Trust dashboard
- EOP dashboard
- Analytics shell variants

Structure:
- Full-width top utility bar
- Portal switch pills
- Hero header
- Section tabs
- Main content with cards and tables

### 4.5 Transaction / Authorisation Workspace

Used by:
- `transactions.html`
- `authorise.html`
- `authorise_topup.html`
- `authorise_redemption.html`

Structure:
- Filters sidebar
- Summary strip
- Table with row actions
- Status badges
- Pagination / detailed actions

### 4.6 Analytics / Reporting Pattern

Used by:
- `analytics.html`
- `unit-trust/analytics.html`
- `eop/analytics.html`

Structure:
- Metric cards
- Risk badges
- Tables
- Chart placeholders
- Segmented controls / tabs

## 5. Design System 101

If you want a simple way to think about this system:

### 5.1 Foundations

This is the raw material:
- Color
- Typography
- Spacing
- Radius
- Shadow
- Motion
- Iconography

### 5.2 Components

These are reusable UI building blocks:
- Buttons
- Inputs
- Cards
- Tabs
- Badges
- Tables
- Alerts
- Steppers
- Toasts

### 5.3 Patterns

These are larger compositions built from components:
- Login screen
- Registration flow
- Dashboard shell
- Authorisation workspace
- Analytics screen
- Legal acceptance screen

### 5.4 Templates

These are page-level blueprints:
- Public landing
- Portal login
- Dashboard
- Transaction list
- Detail view
- Settings

### 5.5 Governance

If this were a mature design system, the rules would be:

- One token source of truth
- One name for each pattern
- Variants documented before use
- Page-specific styling should be minimized
- New components should be added to the library, not re-invented inline

## 6. What Is Strong Already

This codebase already has several good design-system traits:

- Strong brand consistency
- Clear visual hierarchy
- Multiple reusable card patterns
- A status language for risk / approval / pending
- Consistent font and rounded control language
- A premium motion layer on key interactions

## 7. What Should Be Unified Next

These are the main consolidation opportunities I see:

1. Merge duplicated CSS across `PMO`, `PMO corporate`, `UTC`, and `Corporate Website`.
2. Standardize token names and keep one canonical palette.
3. Treat repeated patterns like `badge-alert`, `view-tab`, `gateway-tab-btn`, and `custom-table` as formal library components.
4. Extract page-specific classes only when a pattern is unique enough to deserve it.
5. Document component states and responsive behavior for every reusable pattern.

## 8. Recommended Canonical Library Map

If I were to normalize this into a design system, I would group it like this:

- `foundation/`
- `components/button`
- `components/input`
- `components/card`
- `components/badge`
- `components/table`
- `components/tab`
- `components/alert`
- `components/stepper`
- `components/toast`
- `patterns/login`
- `patterns/register`
- `patterns/dashboard-shell`
- `patterns/authorisation-workspace`
- `patterns/analytics`
- `patterns/legal`

## 9. Quick Reading Guide

If you only want the shortest possible map:

- Brand system: red + navy + muted blue-gray
- Typography: Montserrat
- Surface language: rounded white cards with soft shadow
- Action language: pill buttons and strong CTA hierarchy
- Status language: red / green / amber / gray badges
- Navigation language: tabs, pills, dropdowns, offcanvas sidebar
- Data language: tables, KPI cards, chart placeholders
- Premium layer: glassmorphism, gradients, dot grids, ticker, hover lift

## 10. Source Files Worth Looking At

- [`PMO corporate/css/styles.css`](/Users/henrychia/Desktop/PB%20design/Public%20Mutual/PMO%20corporate/css/styles.css)
- [`PMO corporate/css/dashboard-styles.css`](/Users/henrychia/Desktop/PB%20design/Public%20Mutual/PMO%20corporate/css/dashboard-styles.css)
- [`Corporate Website/css/styles.css`](/Users/henrychia/Desktop/PB%20design/Public%20Mutual/Corporate%20Website/css/styles.css)
- [`PMO corporate/index.html`](/Users/henrychia/Desktop/PB%20design/Public%20Mutual/PMO%20corporate/index.html)
- [`PMO corporate/unit-trust/dashboard.html`](/Users/henrychia/Desktop/PB%20design/Public%20Mutual/PMO%20corporate/unit-trust/dashboard.html)
- [`PMO corporate/eop/dashboard.html`](/Users/henrychia/Desktop/PB%20design/Public%20Mutual/PMO%20corporate/eop/dashboard.html)

