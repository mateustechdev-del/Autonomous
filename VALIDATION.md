# Validation report

Validated on 2026-10-16.

- `npm run build`: passed (strict TypeScript and Vite production build).
- `npm run lint`: passed.
- `npm test`: 5 adapter/data contract tests passed.
- `scripts/browser-check.py`: passed in headless local Chrome at 1440×1000 and 390×844.
- Browser checks: all routes, mission advancement/reset, JSON download, vision annotation loading/selection, all five research metric selectors, architecture selection, 3D animation/camera reset, mobile menu, horizontal overflow and not-found route.
- No uncaught browser page errors during the checked workflows.
- Desktop and mobile screenshots inspected manually.

The build emits a size advisory for the lazy-loaded Three.js scene (~869 kB uncompressed / 234 kB gzip). This is the main performance limitation; the scene is separated from the application bundle. These checks do not constitute a full accessibility audit, cross-browser suite or robotics validation.

## Optional browser smoke test

Install Python Playwright in your own development environment and provide Chrome at the path used in the script (or adapt that path). Start `npm run dev`, then run `python scripts/browser-check.py`. Screenshots are written to `/tmp/autonomous-desktop.png` and `/tmp/autonomous-mobile.png`. This optional script is independent of `npm test`; no Python dependency is needed to run the application.
