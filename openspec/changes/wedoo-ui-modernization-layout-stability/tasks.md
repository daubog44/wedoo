## 1. Setup

- [x] 1.1 Keep `DESIGN.md` in the loop read order and loop readiness checks.
- [x] 1.2 Keep OpenSpec initialized for Codex with this modernization change tracked in `openspec/changes/`.
- [x] 1.3 Keep React Bits MCP configured in the repo-local Codex bootstrap as an optional discovery tool.

## 2. Stability Workflow

- [x] 2.1 Use Playwright reruns, captures, and Figma comparison to investigate active parity or layout-shift failures before broader discovery.
- [x] 2.2 Fix UI instability on the active route before refreshing any baseline.
- [x] 2.3 Record the audited route state in `prd.md`, `docs/visual-backlog.md`, and the current session worklog with real artifact paths.

## 3. Modernization Adoption

- [x] 3.1 Define a shortlist of route surfaces where tasteful modernization is allowed first, favoring public marketing and showcase surfaces over auth shells and dashboards.
- [x] 3.2 Use React Bits only for curated accent or motion treatments that survive reduced-motion and parity review.
- [x] 3.3 Reject any modernization change that improves novelty while worsening Figma fidelity, brand coherence, or layout stability.
