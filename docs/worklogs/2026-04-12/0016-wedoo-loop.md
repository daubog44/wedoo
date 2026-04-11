# 2026-04-12 00:16 - wedoo-loop

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- timestamp: 2026-04-12 00:28
- task: implementare il flow pubblico `password dimenticata`
- node: `657:658`, `660:774`, `660:725`, `660:1217`
- files: `src/pages/public/password-recovery-page.tsx`, `src/pages/public/customer-support-page.tsx`, `src/data/auth-recovery.ts`, `tests/e2e/public/password-recovery-flow.spec.ts`, `tests/e2e/parity/password-recovery-flow.visual.spec.ts`
- action: ripresa la route gia presente nel worktree e completata la discovery Figma con metadata, design context e screenshot per recovery + assistenza.
- tests: pending
- note: viewport di riferimento confermato desktop `1440x1024` e mobile `360x800`; il frame mobile `660:1217` mescola copy e CTA tra audience, quindi la base coerente resta `660:725` con inferenza mobile limitata alla disposizione responsive.

- timestamp: 2026-04-12 00:40
- task: implementare il flow pubblico `password dimenticata`
- node: `657:658`, `660:774`, `660:725`, `660:1217`
- files: `src/components/public/auth/auth-checkbox.tsx`, `src/pages/public/password-recovery-page.tsx`, `src/pages/public/customer-support-page.tsx`
- action: audit reale con capture ha trovato drift concreto: desktop `assistenza clienti` con card e copy che collidevano, checkbox recovery non allineato al frame auth.
- tests: `npm run loop:capture -- /password-dimenticata ...`, `npm run loop:capture -- /assistenza-clienti ...`
- note: chiuso il gap implementando un row checkbox dedicato per il recovery e riallineando il desktop support su posizioni/copy break coerenti con Figma, mantenendo l'inferenza mobile normalizzata per audience.

- timestamp: 2026-04-12 01:10
- task: implementare il flow pubblico `password dimenticata`
- node: `657:658`, `660:774`, `660:725`, `660:1217`
- files: `prd.md`, `docs/visual-backlog.md`, `docs/worklogs/2026-04-12/0016-wedoo-loop.md`, `__screenshots__/chromium-desktop/parity/password-recovery-flow.visual.spec.ts/*`, `__screenshots__/chromium-mobile/parity/password-recovery-flow.visual.spec.ts/*`
- action: validazione finale completata e baseline parity aggiornata intenzionalmente sullo stato live della route recovery + assistenza.
- tests: `npx playwright test tests/e2e/public/password-recovery-flow.spec.ts`, `vitest run tests/integration/auth-recovery-view-model.test.ts`, `npx playwright test tests/e2e/parity/password-recovery-flow.visual.spec.ts --update-snapshots`, `npx playwright test tests/e2e/parity/password-recovery-flow.visual.spec.ts`, `npm run typecheck`, `npm run lint`
- note: capture finali salvate in `artifacts/loop-captures/2026-04-12/0110-password-recovery-final` e `artifacts/loop-captures/2026-04-12/0110-customer-support-final`; desktop e mobile verificati contro screenshot Figma e il task puo essere chiuso.
