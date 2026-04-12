# 2026-04-12 02:31 - wedoo-loop

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- action: bootstrap quality gate ok
- note: Quality gate passed before loop start. Log: C:\Users\Utente\.codex\worktrees\d19e\progetto\.codexpotter\loop-gates\2026-04-12-023118-wedoo-loop-quality-gate.log

- 02:39 - task reopen customer support desktop drift - node 660:725 / 660:1217 - area Figma + responsive audit - tests Figma metadata/design/screenshot `660:725`; screenshot `660:1217`; capture `artifacts/loop-captures/2026-04-12/0200-customer-support-acceptance/desktop.png` - the live route matches the 1440 frame only superficially: on the default Desktop Chrome viewport the fixed 1440 canvas collapses, clipping the company copy and dropping the CTA row outside the purple shape - next patch the desktop shell so the full frame scales coherently below 1440 without regressing the 1440 parity target.

- 02:44 - task reopen customer support desktop drift - node 660:725 - area runtime validation - tests `Invoke-WebRequest http://127.0.0.1:4600/src/pages/public/customer-support-page.tsx` - port `4600` was serving a stale OneDrive repo, so the earlier auth captures and baselines were not trustworthy for this worktree; next rerun all auth validation against a fresh local server on `4610`.

- 02:46 - task reopen customer support desktop drift - node 660:725 / 660:1217 - area desktop shell + captures - tests `WEDOO_DEV_PORT=4610 npx playwright test tests/e2e/public/password-recovery-flow.spec.ts`; `WEDOO_BASE_URL=http://127.0.0.1:4610 npm run loop:capture -- /assistenza-clienti customer-support-after-fix-4610` - added a responsive 1440-frame scaler around the desktop support canvas so the purple and mint cards keep their geometry on the default desktop viewport; fresh evidence at `artifacts/loop-captures/2026-04-12/0246-customer-support-after-fix-4610` shows the CTA row back inside the intended shape on desktop while mobile stays coherent.

- 02:50 - task auth recovery parity refresh on current worktree - node 657:658 / 660:725 / 660:774 / 660:1217 - area baselines + Figma comparison - tests Figma screenshots `657:658`, `660:774`; `WEDOO_BASE_URL=http://127.0.0.1:4610 npm run loop:capture -- /password-dimenticata password-recovery-after-fix-4610`; `WEDOO_DEV_PORT=4610 npx playwright test tests/e2e/parity/password-recovery-flow.visual.spec.ts --update-snapshots` - the saved auth-recovery baselines were stale against the real current-worktree routes; refreshed desktop/mobile recovery and support screenshots intentionally and added a new desktop regression snapshot `customer-support-page-default-desktop.png` only after verifying the live renders against Figma and the fresh captures.

- 02:52 - task reopen customer support desktop drift - node 660:725 - area final acceptance - tests `WEDOO_DEV_PORT=4610 npx playwright test tests/e2e/public/password-recovery-flow.spec.ts`; `WEDOO_DEV_PORT=4610 npx playwright test tests/e2e/parity/password-recovery-flow.visual.spec.ts`; `npx vitest run tests/integration/auth-recovery-view-model.test.ts`; captures `artifacts/loop-captures/2026-04-12/0246-customer-support-after-fix-4610` and `artifacts/loop-captures/2026-04-12/0247-password-recovery-after-fix-4610` - desktop/mobile acceptance now pass on the correct server, the shared auth VRT is intentionally aligned again, and there is still no open PR CI surface targeting `codex/ralph-loop-bootstrap`, so the reopened `/assistenza-clienti` task can close.
