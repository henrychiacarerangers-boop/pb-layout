# Public Mutual Online (PMO) - Master Project Root

Welcome to the Master Root documentation for the Public Mutual Online portal design system. This project establishes a premium, unified "Pro Max" design standard across three distinct platforms.

## 📁 Repository Structure

The project is organized into three primary folders, each representing a specific part of the user journey. While they serve different purposes, they all share a singular, high-impact Brand Identity.

### 1. [Corporate Website](./Corporate%20Website)
*   **Purpose**: The central landing page and public-facing gateway.
*   **Role**: Serves as the primary entry point where users (Individual or Corporate) can learn about services and access their respective portals.
*   **Key Action**: Contains clear call-to-actions (CTAs) to login to the **PMO (Individual)** or **PMO Corporate** portals.

### 2. [PMO (Individual)](./PMO)
*   **Purpose**: Individual Personal Mutual Online portal.
*   **User Base**: Individual investors and retail customers.
*   **Features**: Personalized investment tracking, personal account management, and unit trust operations for retail users.

### 3. [PMO Corporate](./PMO%20corporate)
*   **Purpose**: High-fidelity prototype for Corporate Public Mutual Online.
*   **User Base**: Corporate entities, authorized signatories, and investment managers.
*   **Features**: Complex transaction Authorisation workflows (Maker/Checker), corporate account auditing, and multi-user role management.

---

## 🎨 Unified Brand Design Guide ("Pro Max" Standard)

All three projects adhere to the same premium UI/UX standards to ensure a cohesive brand experience.

### 1. Core Typography
*   **Font Family**: **Montserrat** (Geometric sans-serif)
*   **Weights**: 
    *   **Bold (700)**: Headlines and commanding titles.
    *   **Semi-Bold (600)**: Form labels and navigation.
    *   **Regular (400)**: Primary body text.
    *   **Light (300)**: Secondary microcopy.

### 2. Signature Color Palette
*   **Brand Primary (Red)**: `#ff1700` (Primary actions, key highlights, urgency).
*   **PMO Brand Primary (Navy)**: `#002e77` (Structural foundation, trust, stability).
*   **Accent Primary (Navy/Purple)**: `#373761` (Headers, standard text).
*   **Action Primary (Bright Blue)**: `#002e77` (Active states, tooltips).
*   **Neutral Gray/Blue**: `#dce3e8` (Analytics backgrounds, card containers).

### 3. Visual Components
*   **Card Surfaces**: `15px` border-radius with deep diffused shadows (`0 10px 30px rgba(0,0,0,0.2)`).
*   **Action Buttons**: Pill-shaped (`25px` border-radius) for an approachable yet modern feel.
*   **Form Inputs**: `8px` border-radius with generous `12px` padding and subtle focus glows.
*   **Glassmorphism**: Subtle use of backdrop filters and semi-transparent layers to create depth.

### 4. Iconography
*   **Library**: **Iconoir**
*   **Style**: Minimalist, clean-lined icons that align with the professional corporate aesthetic.

---

## 🛠 Technical Foundation
*   **Core**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS.
*   **Framework**: Bootstrap 5.3.0 (used strictly for layout utilities, with custom design system overrides).
*   **Standardization Documents**: 
    *   `PMO corporate/ui_ux_standards.md`
    *   `PMO corporate/quad_core_prototype.md`

---

## 🚀 Navigation Flow
1.  **Landing**: User visits the **Corporate Website**.
2.  **Selection**: User identifies as an Individual or Corporate user.
3.  **Authentication**: User clicks the login button which redirects them to the specific **PMO** or **PMO Corporate** login screen.
4.  **Action**: Upon successful login, the user is presented with a dashboard tailored to their role (Retail vs. Corporate).
