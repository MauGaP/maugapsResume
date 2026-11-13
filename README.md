# Mauro Pedano · maugap.com

Personal CV and portfolio, served directly from the repository root by GitHub Pages. Plain HTML, CSS and vanilla JavaScript: no framework, bundler or build step.

## Structure

- `index.html`: semantic page content, native exclusive experience accordions, project grid, CV links and Formspree contact form.
- `css/style.css`: design tokens, typography, responsive layouts and reduced-motion support.
- `js/index.js`: hero-to-navbar identity animation, accessible mobile navigation and current footer year. Experience accordions work without JavaScript.
- `asset/profile/maugap.webp`: optimized summit portrait; the original JPG remains the fallback.
- `asset/resume/`: one-page and detailed CV PDFs.
- `asset/project/`: project illustrations and logos.
- `tests/`: Playwright smoke, responsive, keyboard interaction and axe accessibility checks.
- `docs/redesign/`: before/after screenshots at desktop, tablet and phone widths.

Existing assets are retained, including unused images. `CNAME` and `favicon.ico` are unchanged. External page resources are limited to Google Fonts; the contact form submits directly to the existing Formspree endpoint.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765>. No npm installation is needed to serve the website.

## Tests

Use Node.js 22 or newer and Python 3:

```sh
npm ci
npx playwright install --with-deps chromium
npm test
npm run test:report
```

Playwright starts the local Python server automatically (or reuses it locally). Tests cover 1440, 1024, 768, 390 and 360px widths, PDF responses, image loading, menu and accordion keyboard behavior, local form validation, and serious/critical accessibility violations. Form tests do not send messages to Formspree.

GitHub Actions runs the suite on pull requests and pushes to `main`, and uploads the HTML report, including failure traces, for 14 days.

For a mobile Lighthouse audit, start the preview server and run:

```sh
mkdir -p .lighthouse
CHROME_PATH=$(node -e "process.stdout.write(require('playwright').chromium.executablePath())") npx lighthouse http://127.0.0.1:8765 --chrome-flags='--headless --no-sandbox' --output=html --output-path=.lighthouse/mobile.html
```
