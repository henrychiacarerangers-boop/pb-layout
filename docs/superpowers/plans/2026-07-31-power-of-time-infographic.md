# Power of Time Infographic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce three high-resolution Public Mutual infographic image concepts that explain why an earlier investment start can give compounding more time to work.

**Architecture:** The deliverable is a self-contained image set, not a website component. Each variation uses the same approved text, values, disclaimer, and colour roles while changing only the composition. Inspect the concepts at native size and website-preview size so the labels remain readable.

**Tech Stack:** AI image generation, local image inspection, static PNG output.

## Global Constraints

- Use the approved English copy and amounts from `docs/superpowers/specs/2026-07-31-power-of-time-infographic-design.md`.
- Clearly label all values as illustrative and include: “Illustration only. Values and returns are assumptions, not guaranteed.”
- Use Public Mutual navy as structure, red for Jack, blue for Jill, and gold only for final outcomes.
- Use friendly editorial illustrated people; no stock photography, bullet lists, calculator UI, CTA, or personal performance claims.
- Deliver high-resolution static PNGs, each legible when displayed at website content width.

---

### Task 1: Generate the timeline-comparison concept

**Files:**
- Create: `Corporate Website/images/infographics/power-of-time-timeline.png`

**Interfaces:**
- Consumes: Approved story, copy, figures, and visual direction in `docs/superpowers/specs/2026-07-31-power-of-time-infographic-design.md`.
- Produces: The recommended shared-horizontal-timeline visual option.

- [ ] **Step 1: Generate the PNG with the image-generation skill**

Use a landscape infographic showing Jack on the left contributing from ages 25–34 in red, Jill contributing from ages 35–64 in blue, shared age markers from 25 to 65, two rising curves, and final outcome cards. Include the exact approved headline, support statement, figures, closing insight, and footer disclaimer.

- [ ] **Step 2: Inspect the image at full size**

Run: `sips -g pixelWidth -g pixelHeight Corporate\\ Website/images/infographics/power-of-time-timeline.png`

Expected: A landscape PNG with sufficient resolution for a 1440px-wide content section.

- [ ] **Step 3: Visually validate copy and hierarchy**

Open the image using the image-viewing tool. Confirm that Jack is consistently red, Jill is consistently blue, final values are legible, and the disclaimer remains visible but subordinate.

- [ ] **Step 4: Commit the isolated deliverable**

```bash
git add Corporate\\ Website/images/infographics/power-of-time-timeline.png
git commit -m "feat: add power of time timeline infographic"
```

### Task 2: Generate the stair-step-to-growth concept

**Files:**
- Create: `Corporate Website/images/infographics/power-of-time-stair-step.png`

**Interfaces:**
- Consumes: The same locked content as Task 1.
- Produces: An editorial composition in which repeated contribution marks become diverging growth curves.

- [ ] **Step 1: Generate the PNG with the image-generation skill**

Use a landscape infographic where red and blue recurring-deposit indicators lead to a refined stair-step composition, then become two divergent compounding curves. Use all approved values and copy unchanged. Make the visual narrative clearer than chart precision, while retaining an explicit shared age-65 comparison.

- [ ] **Step 2: Inspect dimensions and visual hierarchy**

Run: `sips -g pixelWidth -g pixelHeight Corporate\\ Website/images/infographics/power-of-time-stair-step.png`

Expected: A landscape PNG suitable for desktop website content width, with no clipped text or labels.

- [ ] **Step 3: Visually validate the outcome contrast**

Open the image using the image-viewing tool. Confirm that readers can identify the different starting ages, equal RM200,000 contribution total, and respective illustrative final values in under ten seconds.

- [ ] **Step 4: Commit the isolated deliverable**

```bash
git add Corporate\\ Website/images/infographics/power-of-time-stair-step.png
git commit -m "feat: add stair step power of time infographic"
```

### Task 3: Generate the split-path comparison concept

**Files:**
- Create: `Corporate Website/images/infographics/power-of-time-split-path.png`

**Interfaces:**
- Consumes: The same locked content as Task 1.
- Produces: A mobile-friendly vertically stacked two-path comparison that reunites at age 65.

- [ ] **Step 1: Generate the PNG with the image-generation skill**

Use a portrait or near-square infographic. Present Jack’s red path and Jill’s blue path in vertically stacked bands with their contribution period, total contribution, and final illustrative value. Both paths terminate at one shared “Age 65” outcome moment, with gold used only to highlight the key result.

- [ ] **Step 2: Inspect dimensions and small-display readability**

Run: `sips -g pixelWidth -g pixelHeight Corporate\\ Website/images/infographics/power-of-time-split-path.png`

Expected: A high-resolution PNG whose primary headline, person labels, and outcome figures remain readable in a 390px-wide preview.

- [ ] **Step 3: Visually validate consistency across all concepts**

Open all three images using the image-viewing tool. Confirm exact copy, amounts, disclosure, colour semantics, and illustration treatment are consistent while each composition is visibly distinct.

- [ ] **Step 4: Commit the isolated deliverable**

```bash
git add Corporate\\ Website/images/infographics/power-of-time-split-path.png
git commit -m "feat: add split path power of time infographic"
```
