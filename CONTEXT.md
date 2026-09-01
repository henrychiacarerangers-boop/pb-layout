# Public Mutual Design System

This context defines the language and scope for consolidating the Public Mutual portal UI. It keeps the first migration focused on the two PMO portals before extending common foundations to other product sites.

## Design-System Scope

**Phase-one scope**:
The PMO and PMO Corporate portal experiences, including their dashboard, account, authorisation, transaction, statement, and authentication journeys.
_Avoid_: Whole-site redesign, all Public Mutual products

**Deferred shells**:
UTC, Corporate Website, and PMO Plus. They are not part of the first migration, although they may later consume shared foundation tokens.
_Avoid_: Phase-one targets, portal variants

**Shared core**:
The single set of design tokens, components, interaction rules, and accessibility contracts used by both PMO and PMO Corporate.
_Avoid_: Separate PMO system, separate Corporate system

**Product modifier**:
An intentional, limited difference applied to the shared core for a portal's identity, role, product label, or content; it does not redefine a component's base interaction or visual structure.
_Avoid_: Component fork, local override

**Calm financial workspace**:
The retained Public Mutual red, navy, and Montserrat brand language applied with precise hierarchy, restrained motion, readable data density, and purposeful surfaces for task-focused portal work.
_Avoid_: Marketing redesign, decorative dashboard, generic glassmorphism

**First-wave components**:
The six shared components that establish the first migration foundation: application navigation, button, form controls including PAC input, status and alert, data table, and card or metric panel.
_Avoid_: Page-specific feature, complete page redesign

**Component source of truth**:
The shared `design-tokens.css` and `pmo-core.css` files that define the first-wave components for both PMO and PMO Corporate. Shell stylesheets may contain only layout and approved product modifiers.
_Avoid_: Shell-level component fork, inline component override

**Reference migration**:
PMO Corporate Unit Trust Dashboard, followed by the matching PMO Dashboard, used to validate the shared core before it is applied to additional portal pages.
_Avoid_: Broad first release, untested bulk migration

**UI-only migration**:
A design-system migration that preserves existing portal data, business actions, permissions, links, and approved copy while changing shared visual and interaction presentation.
_Avoid_: Workflow redesign, business-rule change

**Accessibility baseline**:
WCAG 2.2 AA is the minimum acceptance standard for first-wave components and the reference migration, including keyboard operation, visible focus, non-colour state cues, modal and drawer behavior, and reduced-motion support.
_Avoid_: Best-effort accessibility, colour-only status

**Responsive baseline**:
The first-wave components are designed from a 1440px financial-workspace view and must provide complete, task-safe behavior at 390px mobile width, with an intentional tablet transition between them.
_Avoid_: Desktop-only portal, scaled-down desktop UI

**Migration order**:
The reference migration proceeds from Dashboard to the Authorisation journey, including detail, PAC, approval, and rejection states, before moving to transactions, statements, or settings.
_Avoid_: Page order by convenience, parallel unvalidated migration

**Migration discipline**:
Once a component is migrated, new portal code must use its shared-core contract. Duplicate shell rules are reduced to a minimal temporary compatibility alias and then removed with the dependent pages.
_Avoid_: New legacy class, indefinite compatibility layer

**Phase-one completion**:
Both PMO and PMO Corporate Dashboard and Authorisation journeys use the six first-wave components; their 1440px and 390px experiences meet the accessibility baseline; migrated pages add no legacy component classes or inline design overrides; and the library documents variants, states, use, and migration guidance.
_Avoid_: Visual-only approval, partial component adoption
