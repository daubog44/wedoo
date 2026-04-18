# 2026-04-17 23:58 - public-auth-modernization

## 23:58 - task /accedi,/password-dimenticata,/assistenza-clienti,/registrati - node 658:667,657:658,660:725,336:593

- touched area: visual audit of current public auth/support/register family before redesign
- tests run: `npm run loop:capture -- /accedi modern-login-before`; `npm run loop:capture -- /password-dimenticata modern-recovery-before`; `npm run loop:capture -- /assistenza-clienti modern-support-before`; `npm run loop:capture -- /registrati modern-register-before`
- findings or errors: the pages still feel like separate legacy prototypes rather than one deliberate public system; language chip, CTA geometry, poster shell and footer treatment are inconsistent across routes even where copy and routing are correct
- next step: introduce shared public-shell primitives and unify login, recovery, support and role-choice around the same modern Wedoo grammar, then rerun the relevant public + parity suites

## 00:08 - task /accedi,/password-dimenticata,/assistenza-clienti,/registrati - node 658:667,657:658,660:725,336:593

- touched area: shared public auth shell primitives plus login, recovery, support and register pages
- tests run: `npm run lint`; `npm run typecheck`
- findings or errors: introduced a shared glass/poster/header/button grammar in `src/components/public/auth/auth-shell.tsx`; login, recovery, support and register were rebuilt on the same public shell and the legacy footer treatment was removed; the recovery copy contract in `src/data/auth-recovery.ts` was normalized while keeping route and CTA semantics intact
- next step: rerun the public route flows, save real after captures and update parity intentionally only if the browser output stays coherent

## 00:15 - task /accedi,/password-dimenticata,/assistenza-clienti,/registrati - node 658:667,657:658,660:725,336:593

- touched area: runtime verification and Playwright readiness helper
- tests run: `npx playwright test 'tests/e2e/public/login-page.spec.ts'`; `npx playwright test 'tests/e2e/public/password-recovery-flow.spec.ts'`; `npx playwright test 'tests/e2e/public/public-routes.spec.ts'`
- findings or errors: the first concurrent desktop rerun timed out inside `waitForWedooPageReady`; root cause was unbounded asset waiting in `tests/fixtures/playwright-helpers.ts`, which became brittle once the modernized desktop shells loaded larger real imagery in parallel workers
- next step: bound font/image waiting in the helper, rerun the same public suite under normal parallelism, then capture real desktop/mobile output

## 00:22 - task /accedi,/password-dimenticata,/assistenza-clienti,/registrati - node 658:667,657:658,660:725,336:593

- touched area: visual validation and parity refresh
- tests run: `npm run loop:capture -- /accedi modern-login-after`; `npm run loop:capture -- /password-dimenticata modern-recovery-after`; `npm run loop:capture -- /assistenza-clienti modern-support-after`; `npm run loop:capture -- /registrati modern-register-after`; `npx playwright test 'tests/e2e/parity/login-page.visual.spec.ts' --update-snapshots`; `npx playwright test 'tests/e2e/parity/register-page.visual.spec.ts' --update-snapshots`; `npx playwright test 'tests/e2e/parity/password-recovery-flow.visual.spec.ts' --update-snapshots`; parity rerun without snapshot update
- findings or errors: real captures confirmed the new public shell is coherent across all four routes; login/support/register now share one clear hierarchy and recovery no longer looks like an isolated legacy screen
- next step: run the full gate and close the PRD row only if lint, typecheck, integration and the complete E2E matrix remain green

## 00:23 - task /accedi,/password-dimenticata,/assistenza-clienti,/registrati - node 658:667,657:658,660:725,336:593

- touched area: full quality gate and closeout
- tests run: `npm run test:all`
- findings or errors: full repo gate is green after the helper fix and the public auth modernization; after captures live in `artifacts/loop-captures/2026-04-18/0012-modern-login-after`, `artifacts/loop-captures/2026-04-18/0012-modern-recovery-after`, `artifacts/loop-captures/2026-04-18/0012-modern-support-after` and `artifacts/loop-captures/2026-04-18/0012-modern-register-after`
- next step: mark the public auth/support/register modernization task closed in `prd.md`, clear the visual backlog row and only open a new task if another route shows concrete evidence-backed drift
