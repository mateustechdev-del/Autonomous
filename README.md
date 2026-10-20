# Autonomous AI Robotics Lab

A responsive engineering portfolio for an autonomous industrial inspection concept. Built with React, TypeScript, Vite, Tailwind CSS, Lucide, Recharts, React Router, Framer Motion and React Three Fiber / Three.js.

**This is a frontend demonstration. No Webots simulation, robotics controller, trained perception model, backend or database is connected. All operational values are deterministic fixtures, explicitly labeled DEMO / SIMULATED.**

## Quick start

Requirements: Node.js 22.14+ and npm; a modern WebGL-capable browser for 3D.

```sh
npm install
cp .env.example .env
npm run dev
```

```sh
npm run build
npm run preview
npm run lint
npm test
```

Vite prints the development URL (normally http://localhost:5173). Production files are generated in `dist`. Configure your static host to rewrite non-file routes to `/index.html` for BrowserRouter deep links. No hosting deployment is included.

## Implemented experiences

- Overview: technical presentation, interactive 3D concept, fixture metrics and honest implementation status.
- Mission Control: manually advance a deterministic mission through Idle → Navigating → Inspecting → Completed, reset it, review historical success/error samples, sensors, events and velocity chart; export a clearly marked JSON fixture.
- Simulation Viewer: orbit, pan, zoom, reset camera and animate a mobile robot among obstacles and inspection stations. This is an independent visualization, not Webots or validated physics; its motion loop and illustrative route are decorative, not a planner output.
- Computer Vision: local authored SVG equipment illustration, delayed fixture annotation loading, selectable bounding boxes and results. Confidence values are illustrative; no inference executes. History contains one sample frame.
- Research: selectable charts for all five requested metric categories, hypothesis, methodology, limitations and next experiments. No genuine experimental findings.
- Architecture: interactive component responsibilities, inputs/outputs and implementation status.
- Documentation: requirements, setup, repository structure, planned integrations, roadmap and licensing status.
- Responsive navigation, semantic controls, keyboard focus, skip link, reduced motion preference, loading, empty, error and not-found states. WebGL failures show an alternative message.

## Structure

```text
public/inspection.svg         Local illustrative inspection asset
src/components/Scene.tsx      Lazy-loaded independent 3D preview
src/data/demo.ts              All operational fixtures and architecture content
src/services/lab.ts           LabAdapter, DemoAdapter, proposed FastApiAdapter
src/services/lab.test.ts      Adapter and data boundary tests
src/types.ts                 Robot, Mission, Telemetry, Detection, Experiment
src/App.tsx                  Application shell, pages and navigation
src/styles.css               Responsive design system with Tailwind entry points
```

The page views live in `App.tsx`, while domain contracts, fixtures, data access and the heavy 3D module are separated. The HTTP adapter is prepared but deliberately not selected by configuration: switching to real data requires reviewing provenance labels and supporting views first. The overview and telemetry chart currently use demo fixtures directly.

## Configuration

Set `VITE_GITHUB_URL` to your actual HTTPS repository URL. Until configured, the UI explains that the repository is unavailable and links to setup instructions. Never put secrets in Vite variables; they are public bundle content. `VITE_API_URL` documents the future backend address; it does not activate an integration. Fonts use Google Fonts with local system fallbacks.

## Future FastAPI / Webots integration

1. Create a Webots world and mobile robot with camera, LiDAR, IMU and odometry. Select and document a supported Webots release. There is no simulator launch command or world file in this repository yet.
2. Implement a Python robot controller for mission lifecycle, movement, sensor sampling and failure reporting.
3. Implement navigation and perception independently, then evaluate them on repeatable trials and labeled data.
4. Implement `GET /api/v1/snapshot` in FastAPI returning the `Snapshot` structure in `src/types.ts`: robot, missions and telemetry arrays. Match units: meters, seconds, m/s, battery percent and milliseconds. The prepared adapter validates required primitive fields against the fixture shape before exposing a response.
5. Add explicit source (`demo`, `webots`, `hardware`), ISO timestamps, sequence IDs, units, schema version, WebSocket lifecycle, stale-data handling and mission command endpoints. These extensions are planned, not included in the current contract.
6. Persist telemetry and missions in PostgreSQL. Configure restricted CORS for your actual frontend origin and add authentication before remote mission commands.
7. Serve recorded Webots video/images and real detection results; replace the local illustration and sample confidence values. Add media loading and unavailable states.
8. Select `FastApiAdapter` at the composition boundary, update chart/views to consume returned data, and replace every demo label only when provenance is verified. Current mission buttons are local scenario controls, never robot commands.

## Validation and limitations

`npm test` verifies deterministic cloned fixtures, snapshot validation, HTTP failure propagation and valid/invalid backend responses. Build checks strict TypeScript; lint covers TypeScript and hooks. Browser and hardware validation are separate from unit tests. Test actual desktop/mobile browsers, keyboard flows and WebGL availability before sharing publicly. The current fixture validator is an initial contract guard, not full production schema validation: add numeric ranges, finite-number checks, every enum, timestamps and versioned schema validation for real integration.

No performance, safety, autonomy or accuracy claims can be inferred from this demo. There is no real-time telemetry, model training, navigation algorithm, physics validation, authentication or persistence. The mission timer displays scenario timestamps and does not count wall time. Research charts show invented sample values solely to demonstrate reporting.

## Roadmap

- [x] Frontend, seven routes and responsive design system
- [x] Deterministic demo adapter, 3D preview and local visual annotations
- [x] Adapter tests and developer documentation
- [ ] Webots world and Python controller
- [ ] Navigation and perception baselines
- [ ] FastAPI service and PostgreSQL persistence
- [ ] Recorded media, timestamped streams and reconnect handling
- [ ] Repeated experiments, labeled evaluation data and measured results
- [x] Desktop/mobile Chrome smoke checks (see VALIDATION.md)
- [ ] Broader cross-browser testing and accessibility audit

## License

No license has been selected. No open-source license grant is implied. Choose and add a LICENSE file before distributing under an open-source license. The inspection illustration is authored within this project; third-party dependencies retain their respective licenses.
