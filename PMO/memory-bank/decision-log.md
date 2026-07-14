# Decision Log

## ADR-001: Adoption of "Pro Max" Premium Design System
- **Status**: Accepted
- **Context**: The existing prototype risked feeling like a generic Bootstrap portal, which fails the premium aesthetic requirements of high-value corporate products.
- **Decision**: Standardize on Montserrat typography, solid Brand Red (`#ff1700`) actions, deep Brand Navy (`#002e77`) foundations, Iconoir crisp minimal outline icons, soft rounded surfaces (`15px` card, `8px` inputs), and smooth hover effects (`transition: 0.3s ease`).
- **Consequences**: Every screen must override Bootstrap defaults. Inlines are discouraged in favor of global utilities.

## ADR-002: Client-side Scope Encapsulation in JavaScript
- **Status**: Accepted
- **Context**: Since this is a multi-page prototype that can load multiple individual scripts, global variable leakage or DOM selector overlaps can break interactions.
- **Decision**: Enforce a strict practice of wrapping all Javascript logic in a standard `DOMContentLoaded` event listener wrapper.
- **Consequences**: Variables and event listeners remain inside block scopes. All interactive items must have clear unique ID attributes.

## ADR-003: Memory Bank, Rule File, and Custom Skill Co-Existence
- **Status**: Accepted
- **Context**: The user requested creating a MD file, a rule, and a skill to support future development.
- **Decision**: 
  1. Initialize the standard **Memory Bank** framework inside the repository.
  2. Write `.cursorrules` and `.clinerules` in the root folder to guide coding assistants during live file edits.
  3. Package a custom **PMO design skill** under `skills/pmo-design/` to outline templates and layout schemes for creating brand-aligned pages.
- **Consequences**: Developers and agentic AI models have a multi-layered automation layer: high-level context (Memory Bank), editor rules (.cursorrules), and procedural skills (custom skill package).

## ADR-004: Standardizing Unit Trust Transaction Types
- **Status**: Accepted
- **Context**: The Transaction Enquiry screens previously had mismatched, duplicate, and incomplete filters for Transaction Types (e.g. duplicating "Transfer" and lacking key options).
- **Decision**: Restrict and standardise the Transaction Types allowed for all Unit Trust Portals across the project to exactly: **Distribution, Investment, Others, Regular Investment, Redemption, Switching, Transfer**.
- **Consequences**: This set must be strictly used in all Unit Trust filter sidebars (in both `transactions.html` and `online_activities.html` pages for both PMO and PMO corporate portfolios), ensuring unified data categorization and a highly consistent layout.

