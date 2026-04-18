# 2026-04-17 20:59 - candidate-job-detail-drift

## 20:59 - task /portale/candidato/annuncio/:jobId - node 172:1273,178:1640

- touched area: short drift discovery sweep on already audited candidate-facing routes with real browser captures and direct Figma comparison
- tests run: `npm run loop:capture -- /portale/candidato/annuncio/addetto-comunicazione candidate-job-page-sweep-2`
- findings or errors: the desktop detail shell is still visibly too compressed and left-heavy compared with Figma `172:1273`; the title block, subtitle and top CTA row no longer follow the real lavender canvas hierarchy even though route tests remain green
- next step: patch `src/components/portal/candidate-job-detail-view.tsx`, then rerun route, parity and final real captures before deciding whether mobile also needs adjustment

## 21:00 - task /portale/candidato/annuncio/:jobId - node 172:1273,178:1640

- touched area: `src/components/portal/candidate-job-detail-view.tsx`, `tests/e2e/parity/candidate-job-page.visual.spec.ts`
- tests run: `npx playwright test "tests/e2e/portal/candidate-job-page.spec.ts"`, `npm run loop:capture -- /portale/candidato/annuncio/addetto-comunicazione candidate-job-page-after-3`, `npx playwright test "tests/e2e/parity/candidate-job-page.visual.spec.ts" --update-snapshots`, `npx playwright test "tests/e2e/parity/candidate-job-page.visual.spec.ts"`
- findings or errors: rebuilt the desktop header to match the real frame hierarchy, tightened the first two content boxes to the lavender canvas rhythm, and moved the VRT to the actual desktop/mobile detail shell element instead of full-page noise; desktop and mobile now line up with the Figma screenshots without the earlier left-heavy compression
- next step: task closed with final real capture `artifacts/loop-captures/2026-04-17/2059-candidate-job-page-after-3`
