# PMO Shared Design System — Phase One

## Problem Statement

PMO and PMO Corporate represent closely related portal experiences but maintain overlapping visual rules separately. Their repeated navigation, form, PAC, status, table, card, and metric patterns have diverged through local CSS, legacy classes, and inline design overrides. This makes portal changes costly, produces inconsistent desktop and mobile experiences, and leaves accessibility behavior uneven across high-trust financial workflows.

## Solution

Establish one shared core for PMO and PMO Corporate: a common foundation, six first-wave components, and a documented migration contract. Validate the core by migrating the PMO Corporate Unit Trust Dashboard, then the matching PMO Dashboard, followed by the Authorisation journey. Preserve existing data, business actions, permissions, links, and approved copy; this is a UI-only migration.

The resulting experience retains Public Mutual red, navy, and Montserrat while adopting a calm financial workspace: precise hierarchy, readable data density, restrained motion, and surfaces that communicate meaningful grouping.

## User Stories

1. As a PMO portal user, I want Dashboard and Authorisation to use a consistent interface, so that familiar actions behave predictably across the portal.
2. As a PMO Corporate portal user, I want the same core interaction patterns as PMO, so that moving between related portal experiences does not require relearning controls.
3. As an authorised user, I want navigation to clearly show my current destination, so that I can orient myself within account and approval work.
4. As a mobile portal user, I want navigation to become an accessible drawer, so that I can reach every permitted destination on a narrow screen.
5. As a keyboard user, I want navigation, drawer controls, menus, and modal dialogs to expose clear focus and keyboard behavior, so that I can complete portal tasks without a mouse.
6. As a portal user, I want primary, secondary, destructive, and disabled buttons to look and behave consistently, so that I understand the consequence of an action before taking it.
7. As an authoriser, I want PAC fields and supporting form controls to provide clear labels, validation, and error feedback, so that I can complete secure approval without ambiguity.
8. As a user completing a form, I want errors to include readable text as well as visual styling, so that I can recover without relying on colour alone.
9. As an authoriser, I want pending, approved, rejected, warning, and draft states to be consistently named and styled, so that I can assess work safely and quickly.
10. As a dashboard user, I want cards and metric panels to distinguish summaries from actionable work, so that information hierarchy remains clear without unnecessary visual noise.
11. As a transaction user, I want data tables to have one consistent hierarchy for headers, values, dates, statuses, actions, and empty results, so that financial data remains scannable.
12. As a mobile transaction user, I want tables to preserve readable information and reachable actions, so that responsive behavior does not hide critical financial detail.
13. As a portal user, I want confirmation dialogs to clearly distinguish ordinary confirmation, destructive confirmation, and PAC verification, so that I do not make an unintended decision.
14. As a portal user, I want alerts, notifications, empty states, loading states, and recovery actions to follow common patterns, so that system feedback is understandable and dependable.
15. As a user who prefers reduced motion, I want non-essential transitions reduced, so that the portal remains comfortable and usable.
16. As a product owner, I want PMO and PMO Corporate to retain deliberate identity, role, and product-label differences, so that a shared core does not erase meaningful product context.
17. As a product owner, I want product modifiers to be limited and documented, so that local styling cannot become a hidden component fork.
18. As a designer, I want every first-wave component documented with variants, states, usage, responsive behavior, and accessibility requirements, so that new work uses the system consistently.
19. As a developer, I want one component source of truth, so that a visual or accessibility fix benefits both PMO and PMO Corporate.
20. As a developer, I want an explicit compatibility path for legacy classes, so that migration can proceed safely without permitting indefinite duplication.
21. As a quality reviewer, I want the shared core and migrated pages checked through one portal design-system contract suite, so that regression feedback is focused on user-visible behavior.
22. As a quality reviewer, I want the dashboard migration tested at both 1440px and 390px behavior targets, so that desktop data density and mobile task completion are equally protected.
23. As a delivery team member, I want the PMO Corporate Dashboard to be the reference migration, so that the first implementation proves the shared core before the scope expands.
24. As a delivery team member, I want the matching PMO Dashboard to follow the reference migration, so that cross-shell reuse is validated before Authorisation work begins.
25. As a delivery team member, I want Authorisation, including details, PAC, approval, and rejection states, migrated after the dashboards, so that the core is proven in the highest-risk workflow.
26. As a maintainer, I want migrated pages to stop introducing inline design overrides and new legacy component classes, so that completed work does not immediately drift again.
27. As a maintainer, I want the design-system library to show all governed component families and migration status, so that product, design, and engineering share the same reference.

## Implementation Decisions

- Phase one covers PMO and PMO Corporate only. UTC, Corporate Website, and PMO Plus are deferred shells; they may consume common foundations later but are not migration targets now.
- The shared core is the sole authority for first-wave component foundations, visual structure, interaction rules, responsive behavior, and accessibility contracts.
- Product modifiers are restricted to intentional portal identity, role, product-label, or content differences. They cannot redefine base component behavior or create local component forks.
- The first-wave components are application navigation, button, form controls including PAC input, status and alert, data table, and card or metric panel.
- Multi-step transaction creation is a governed composition pattern: its forms use `.pmo-transaction-form`, with `.pmo-field` for PAC and other security-critical controls. The shared pattern owns focus, invalid state, feedback, and action hierarchy; page JavaScript continues to own calculations and workflow transitions.
- The system retains Public Mutual red, navy, and Montserrat. The component direction is a calm financial workspace: clear hierarchy, readable financial density, purposeful grouping, and restrained motion.
- The reference migration sequence is PMO Corporate Unit Trust Dashboard, matching PMO Dashboard, then the Authorisation journey including detail, PAC, approval, and rejection states.
- The migration is UI-only. Existing data, business rules, permissions, links, approved copy, and workflow outcomes remain unchanged.
- The responsive baseline begins at a 1440px financial-workspace view and requires complete, task-safe behavior at 390px, with an intentional tablet transition.
- WCAG 2.2 AA is the minimum acceptance baseline. It includes keyboard operation, visible focus, non-colour state cues, accessible form errors, modal and drawer focus behavior, and reduced-motion support.
- Existing duplicate component rules may remain only as minimal, temporary compatibility aliases while dependent pages are migrated. New code must use the shared-core contract immediately after a component is introduced.
- Corporate portal pages not yet carrying explicit `.pmo-*` component markup are covered by the shared-core legacy bridge through `data-pmo-shell`. The bridge maps shell, navigation, cards, focusable form controls, and validation feedback to the same token source; it is a migration aid, not a second design system.
- The design-system library is the human-readable catalog for governed components. Every first-wave component records its purpose, variants, states, responsive behavior, accessibility requirements, and migration guidance.
- The decision to centralise the component source of truth is a durable architectural choice and should be recorded as an ADR before implementation begins.

## Testing Decisions

- Use one portal design-system contract suite as the highest test seam. It verifies externally observable markup contracts and user-facing behavior rather than internal CSS implementation details.
- Extend the existing design-system library checks to require documentation and discoverability for all six first-wave components and their required variants and states.
- Extend the shared-core contract checks to ensure both PMO and PMO Corporate load the shared foundation and core in the correct order, and that their local styles do not redefine first-wave base contracts.
- Add contract checks for migrated Dashboard and Authorisation markup: shared component usage, absence of newly introduced legacy component classes, and absence of inline design overrides within migrated component boundaries.
- Add accessibility checks for real interactive semantics: visible focus styling, keyboard-operable tab, drawer, menu, and dialog behavior, labels and error relationships for form controls, and non-colour status text.
- Add transaction creation checks for both PMO and PMO Corporate Top-Up and Redemption: shared shell, navigation, card, form, PAC feedback, and action contracts must be present without changing the existing transaction logic.
- Add responsive behavior checks for the 1440px and 390px targets. Tests should assert behavior and required controls, not pixel-perfect implementation details.
- Keep the current Node test runner as the automated contract gate. Visual review of the reference migration at both target widths complements, rather than replaces, automated checks.

## Out of Scope

- Migrating UTC, Corporate Website, or PMO Plus.
- Rebranding Public Mutual or replacing its red, navy, or Montserrat identity.
- Changing business logic, API behavior, portal data, permissions, links, workflow outcomes, or approved copy.
- Redesigning every PMO or PMO Corporate page in phase one.
- Replacing every existing CSS rule before the dependent page has migrated.
- Marketing-site visual redesign, campaign components, or public-site conversion optimization.

## Further Notes

- Phase-one completion requires both PMO and PMO Corporate Dashboard and Authorisation journeys to use the six first-wave components, pass desktop and mobile review, meet the accessibility baseline, avoid new legacy component classes and inline design overrides, and have complete design-system library documentation.
- The existing audit identifies legacy tests and component contracts that are currently incomplete. These failures are the migration baseline; they are not to be bypassed or weakened to obtain a passing result.
- Follow-on work should proceed only after the reference migration proves that the shared core can serve both portal shells without a component fork.
