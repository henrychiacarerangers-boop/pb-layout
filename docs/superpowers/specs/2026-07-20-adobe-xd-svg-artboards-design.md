# Adobe XD SVG Artboards — Design

## Goal

Create an Adobe XD-importable SVG artboard for each source HTML screen, beginning with the approved Corporate PMO Unit Trust dashboard.

## Source and scope

- Initial source: `PMO corporate/unit-trust/dashboard.html`.
- Full delivery: every HTML file beneath `PMO corporate/`, `PMO/`, `UTC/`, and `Corporate Website/` that represents a page.
- Existing HTML, CSS, JavaScript, fonts, images, and user changes are read-only inputs. The exporter must never modify them.

## Output design

- Create `Adobe-XD-Import/` at the repository root.
- Mirror the page's source folder below that directory and write a same-named `.svg` file, for example `Adobe-XD-Import/PMO-corporate/unit-trust/dashboard.svg`.
- Each SVG is a 1440px-wide desktop artboard whose height equals the rendered document height, with a white canvas and a single embedded PNG snapshot. This preserves the exact screen appearance when dragged into Adobe XD.
- Provide `Adobe-XD-Import/README.md` with import instructions and an explicit limitation: screens are flattened image layers inside SVG containers, not reconstructed individual XD components.
- Provide `Adobe-XD-Import/manifest.json` recording source path, output path, rendered width, rendered height, and capture status for every page.

## Rendering rules

- Render from a local HTTP server rather than `file://`, so relative assets and browser security behave consistently.
- Use a 1440px viewport, wait for fonts, and capture full-page dimensions after layout settles.
- URLs and paths with spaces must be handled without shell word-splitting.
- A failed page must be captured in the manifest with an error and must not abort exports of the other pages.

## Validation

- Verify the dashboard source loads all declared local stylesheets.
- Verify the dashboard SVG has an SVG root, uses width `1440`, embeds a PNG data URI, and its manifest entry is successful.
- Verify output count equals the count of selected HTML source pages, with no source files altered.

## Non-goals

- Producing Adobe's proprietary `.xd` binary format.
- Turning every card, text, or control into individually editable XD layers.
- Changing the UI design or source implementation.
