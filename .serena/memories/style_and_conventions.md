# Style and Conventions

All files in the Corporate PMO Portal must conform to these styling and structural specifications:

## 1. Typography & Hierarchy
- **Font**: Google Fonts **Montserrat** loaded as `'Montserrat', sans-serif`.
- **Primary Section Headings**: `font-weight: 700` (Bold) using commanding sizes (e.g., `2.2rem` for onboarding welcomes).
- **Subheadings / Secondary Labels**: `font-weight: 600` (Semi-bold) or `500` (Medium) in darker slates (`#373761`).
- **Body / Standard Content**: `font-weight: 400` (Regular) in dark charcoal (`#404041`) to maintain readable contrast.

## 2. Color Scheme & Usage
- **Primary Trigger Colors**:
  - Primary Action / Call to Action: Brand Red (`#ff1700`). Must hover to `#c41219` with a smooth 0.3s transition.
  - Secondary / Supporting action: Transparent/white background with `#ced4da` border (Ghost style).
- **Brand Foundations**: Brand Navy (`#000000`) or Accent Navy (`#373761`) for structural borders, background fills, or navbar branding.

## 3. Surface Specifications
- **Cards**: Customize `.card` classes with `border-radius: 15px` and a diffused shadow `box-shadow: 0 10px 30px rgba(0,0,0,0.2)`.
- **Buttons**: Every button must be shaped as a pill (`border-radius: 25px`).
- **Form Inputs**: Every input should have a soft rounded contour (`border-radius: 8px`) and confortable vertical/horizontal padding (`12px`). Overlap standard focus borders with a subtle glow `#ff1700` soft shadow.

## 4. Javascript Best Practices
- **Scope Isolation**: Always wrap script code in a `DOMContentLoaded` event listener wrapper:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
      // Logic
  });
  ```
- **Prototyping Delays**: Use `setTimeout` (1.2s to 1.8s) to emulate network requests and display temporary Bootstrap spinner elements inside primary buttons when performing client-side operations (e.g., mock login or submission processes).
- **Descriptive IDs**: Ensure every interactive item has an explicit, descriptive, and unique `id` attribute.
