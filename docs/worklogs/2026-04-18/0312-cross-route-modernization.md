## 03:12
- task: `wedoo-cross-route-modernization-pass`
- node: `no dedicated node`, `143:1822`, `159:2896`
- touched area: route inventory, OpenSpec scaffold, PRD and visual backlog reopen for cross-route batch
- tests run: none
- findings or errors: route family is visually cleaner than the legacy baseline, but public editorial routes are still text-heavy and portal dashboards still mix multiple UI grammars; shared surfaces and actions are the common root
- next step: refine shared UI primitives and global surfaces first, then simplify editorial and dashboard shells

## 03:58
- task: `wedoo-cross-route-modernization-pass`
- node: `no dedicated node`, `143:1822`
- touched area: public editorial family `knowledge-hub-page`, `faq-board`, `info-sections`, auth shell primitives, register shell
- tests run: `npm run lint`; `npm run typecheck`; `npx playwright test "tests/e2e/public/knowledge-hub-page.spec.ts" "tests/e2e/public/info-page.spec.ts" "tests/e2e/public/login-page.spec.ts" "tests/e2e/public/public-routes.spec.ts"`
- findings or errors: articles and podcasts were still too verbose and card-heavy; `/info` stayed calmer after FAQ refactor and the public family turned functionally green after restoring the missing info CTA and default-collapsed FAQ
- next step: rerun the broader gate, inspect real captures for dashboards and showcase routes, then tighten the portal shell

## 04:35
- task: `wedoo-cross-route-modernization-pass`
- node: `159:2896`, `no dedicated node`
- touched area: `portal-navbar`, candidate/company dashboard hero blocks, dashboard cards, dashboard profile rails
- tests run: `npx playwright test "tests/e2e/portal/candidate-dashboard-page.spec.ts" "tests/e2e/portal/company-dashboard-page.spec.ts" --workers=1`
- findings or errors: real captures proved the dashboards were still reading as proto-cards with oversized nav actions; tightening the navbar pill grammar and compressing rail/card copy removed the collage effect without breaking portal flows
- next step: capture desktop/mobile after state, update dashboard parity intentionally, then revisit the home hero because its support panel still looked wrong in the actual screenshot

## 04:47
- task: `wedoo-cross-route-modernization-pass`
- node: `143:1822`
- touched area: landing hero/right support panel and home footer sizing
- tests run: `npx playwright test "tests/e2e/public/landing-page.spec.ts" --workers=1`; manual Playwright captures in `artifacts/loop-captures/2026-04-18/0447-home-after-manual`
- findings or errors: the helper capture kept timing out on `/`, but manual Playwright proved the route was stable; the real issue was a washed-out hero support slab, fixed by replacing the overgrown white surface with a compact dark panel and smaller footer treatment
- next step: refresh the affected parity baselines for landing, dashboards, registration flows, and recruiter list pages; then run the full gate before closing PRD and visual backlog

## 04:52
- task: `wedoo-cross-route-modernization-pass`
- node: `143:1822`, `159:2896`, `185:1738`
- touched area: batch closeout across landing, dashboards, public onboarding shells, and recruiter list shells
- tests run: `npx playwright test "tests/e2e/public/landing-page.spec.ts" "tests/e2e/portal/candidate-dashboard-page.spec.ts" "tests/e2e/portal/company-dashboard-page.spec.ts" --workers=1`; `npx playwright test "tests/e2e/public/public-routes.spec.ts" "tests/e2e/wizards/company-registration-wizard.spec.ts" "tests/e2e/portal/company-jobs-page.spec.ts" "tests/e2e/portal/company-published-jobs-page.spec.ts" --workers=1`; `npx playwright test "tests/e2e/parity/landing-page.visual.spec.ts" "tests/e2e/parity/candidate-dashboard-page.visual.spec.ts" "tests/e2e/parity/company-dashboard-page.visual.spec.ts" "tests/e2e/parity/candidate-registration-flow.visual.spec.ts" "tests/e2e/parity/company-registration-wizard.visual.spec.ts" "tests/e2e/parity/company-jobs-page.visual.spec.ts" "tests/e2e/parity/company-published-jobs-page.visual.spec.ts" --update-snapshots`
- findings or errors: the remaining red VRTs were stale by design, not bugs; final captures for `/articoli`, `/podcast`, `/info`, `/portale/candidato`, `/portale/azienda`, and `/` are now coherent enough to close the modernization batch without opening new evidence-backed gaps
- next step: run `npm run test:all`, then sync OpenSpec, PRD, and visual backlog to zero open items
