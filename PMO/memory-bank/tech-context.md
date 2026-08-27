# Technical Context

## Frontend Stack
This project uses a static, serverless frontend architecture, built for presentation and mock workflow demonstrations.

- **HTML5**: Standard markup using responsive layouts.
- **CSS3 / Bootstrap 5**: Page layouts utilize CSS grid, flexbox, and Bootstrap 5.3 columns.
- **JavaScript (ES6+)**: Vanilla client-side script blocks.
- **Icons**: Iconoir CDN or local vector sets.
- **Fonts**: Google Fonts Montserrat family (`Montserrat:wght@300;400;500;600;700`).

## Development & Runtime Environment
- **Platform**: Cross-platform (runs on Mac Darwin, Windows, Linux).
- **Execution**: Can be executed directly by opening any `.html` file in a browser, or served using a light development server.
- **No Build Pipelines**:
  - No Babel/Webpack/Vite compiler.
  - No TypeScript compilation (native browser-supported JS only).
  - No SASS/SCSS compiler (plain CSS styles are stored directly in `css/`).

## Local Servers (Recommended)
Since there are no backend services, any static file server works perfectly for viewing pages locally:
- **Python http.server**:
  ```bash
  python3 -m http.server 8000
  ```
- **Node.js http-server**:
  ```bash
  npx http-server -p 8000
  ```

## Integration & API Guidelines
All API integration references in this mockup are simulated. Forms do not submit to real endpoints. Transition screens and actions use mock timeouts (`setTimeout`) of 1 to 2 seconds to simulate network request delay before triggering redirects or showing success alerts.
- To maintain consistency during simulation, success classes should leverage standard Bootstrap 5 alerts or modal dialogues, styled according to the design standards (pill buttons, Montserrat text).
