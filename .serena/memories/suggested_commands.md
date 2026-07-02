# Suggested Commands for PMO Corporate Portal

Use these commands to develop, run, and maintain the frontend prototype files on your local machine (Darwin / macOS).

## 1. Running a Local Server
Since this is a static prototype without a server-side build pipeline, running a simple local static file server is the easiest way to inspect pages and handle multi-page navigation seamlessly:

```bash
# Option A: Python 3 static server (built-in on macOS)
python3 -m http.server 8000

# Option B: Node.js static http-server
npx http-server -p 8000
```
Once started, open your browser and navigate to `http://localhost:8000/index.html`.

## 2. Code Quality & Formatting
We can run local linting and formatting on HTML, CSS, and JS files using Prettier:

```bash
# Run Prettier to format all files in the project
npx prettier --write "**/*.html" "css/**/*.css" "js/**/*.js"

# Check if files conform to formatting standards
npx prettier --check "**/*.html" "css/**/*.css" "js/**/*.js"
```

## 3. Basic System & Repository Maintenance
Essential workspace utility commands on macOS:

```bash
# Check repository status and modified files
git status

# Add and stage changed files
git add .

# Create a commit with a descriptive message
git commit -m "Standardized header layouts and added design guidelines"

# Search files for a specific selector or token
grep -rn "Montserrat" ./css/
```
