# 2026-04-17 20:45 - candidate-cv-drift

## 20:45 - task /portale/candidato/cv - node 288:1266,288:1325

- touched area: short drift discovery sweep on already audited portal routes with real browser captures
- tests run: `npm run loop:capture -- /portale/candidato/cv candidate-cv-sweep`
- findings or errors: the real desktop capture shows the top strip and right-side panel clipped outside the canvas again, so the earlier closeout is no longer trustworthy on the current route shell
- next step: reopen the frame task, compare directly against Figma `288:1266/288:1325`, patch `src/components/portal/candidate-cv-view.tsx`, then rerun route and parity checks

## 20:48 - task /portale/candidato/cv - node 288:1266,288:1325

- touched area: `src/components/portal/candidate-cv-view.tsx`
- tests run: `npm run loop:capture -- /portale/candidato/cv candidate-cv-after-3`
- findings or errors: the rigid 1440 desktop canvas was clipping again in the browser; added a responsive scale wrapper to keep the Figma desktop geometry inside narrower desktop widths, but the top photo note was still hidden behind the two desktop panels
- next step: treat the photo note as an explicit overlay above the panels, tighten its width and rerun real captures plus candidate CV route/parity checks

## 20:51 - task /portale/candidato/cv - node 288:1266,288:1325

- touched area: `src/components/portal/candidate-cv-view.tsx`
- tests run: `npm run loop:capture -- /portale/candidato/cv candidate-cv-after-4`, `npx playwright test "tests/e2e/portal/candidate-cv-page.spec.ts"`, `npx playwright test "tests/e2e/parity/candidate-cv-page.visual.spec.ts" --update-snapshots`, `npx playwright test "tests/e2e/parity/candidate-cv-page.visual.spec.ts"`
- findings or errors: the desktop note now renders above the clipped mint panels instead of disappearing behind them; design inference used here was to keep the note as a centered overlay in the top gap, with narrower width and smaller desktop type so the shell stays visually stable while preserving the surrounding Figma hierarchy
- next step: task closed; use `artifacts/loop-captures/2026-04-17/2051-candidate-cv-after-4` as the final real capture for this drift reopen
