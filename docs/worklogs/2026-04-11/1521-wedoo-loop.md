# 2026-04-11 15:21 - wedoo-loop

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- timestamp: 2026-04-11 15:32
- task: audit landing pubblica contro Figma/export/VRT
- node: 143:1822
- viewport: pending discovery
- files: prd.md, src/components/public/home/**, tests/e2e/public/landing-page.spec.ts, tests/e2e/parity/landing-page.visual.spec.ts
- action: riallineato tracker operativo e avviata discovery del primo task aperto del PRD sulla route `/`
- tests: pending
- note: audit iniziale richiesto prima di eventuali raffinamenti o update baseline

- timestamp: 2026-04-11 15:42
- task: audit landing pubblica contro Figma/export/VRT
- node: 143:1822
- viewport: desktop
- files: prd.md, docs/worklogs/2026-04-11/1521-wedoo-loop.md, .codexpotter/kb/public-home.md
- action: verificato frame Figma `143:1822` (1440x3109), baseline VRT desktop/mobile, capture reale `artifacts/loop-captures/2026-04-11/1524-landing-audit-before` ed export di sezione coerenti; nessun drift macroscopico nuovo rilevato, nessuna baseline da aggiornare
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`; `npm run test:e2e -- tests/e2e/parity/landing-page.visual.spec.ts`
- note: nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`; audit chiuso senza cambi di codice UI

- timestamp: 2026-04-11 16:02
- task: audit login pubblica contro Figma/export/VRT
- node: 658:667
- viewport: pending discovery
- files: src/pages/public/login-page.tsx, tests/e2e/public/login-page.spec.ts, tests/e2e/parity/login-page.visual.spec.ts, prd.md
- action: riaperto il loop sul primo task aperto del PRD per la route `/accedi`; allineato il tracker locale e avviata la lettura del codice auth esistente prima della discovery Figma
- tests: pending
- note: verificare prima se il design vivo conferma il frame `campi mancanti` o introduce drift/stati mancanti

- timestamp: 2026-04-11 16:47
- task: audit login pubblica contro Figma/export/VRT
- node: 658:667
- viewport: desktop
- files: src/data/auth.ts, tests/integration/auth-view-model.test.ts, tests/e2e/public/login-page.spec.ts, __screenshots__/chromium-desktop/parity/login-page.visual.spec.ts/login-page.png, prd.md, .codexpotter/kb/auth-flow.md
- action: discovery Figma `658:667` confermata sul frame desktop `1440x1024`; rilevato drift minimo nel prompt finale del login (`non hai già un account?` vs `non hai un account?` del design vivo), corretti i copy auth, estesa la copertura test e riallineata solo la baseline VRT desktop del login
- tests: `npx vitest run tests/integration/auth-view-model.test.ts`; `npx playwright test tests/e2e/public/login-page.spec.ts`; `npx playwright test tests/e2e/parity/login-page.visual.spec.ts`; `npx playwright test tests/e2e/parity/login-page.visual.spec.ts --update-snapshots`; `npm run test:all`
- note: Playwright MCP non ha aperto Chrome per errore di launch, quindi audit visuale fatto via `npm run loop:capture -- /accedi login-audit-before` e `npm run loop:capture -- /accedi login-audit-after`; nessuna PR aperta sul branch corrente

- timestamp: 2026-04-11 16:50
- task: audit registrazione pubblica contro Figma/export/VRT
- node: 658:667 (da verificare contro il frame reale della route `/registrati`)
- viewport: pending discovery
- files: src/pages/public/role-choice-page.tsx, tests/e2e/parity/register-page.visual.spec.ts, prd.md
- action: aperto il task successivo del PRD dopo commit dedicato al login; in corso verifica del mapping tra route `/registrati`, baseline attuale e node ID Figma tracciato
- tests: pending
- note: possibile backlog stantio se il node `658:667` non descrive davvero la route registrazione pubblica

- timestamp: 2026-04-11 16:58
- task: audit registrazione pubblica contro Figma/export/VRT
- node: desktop `336:593`, mobile `336:643`
- viewport: desktop + mobile
- files: prd.md, src/pages/public/role-choice-page.tsx, tests/e2e/parity/register-page.visual.spec.ts
- action: discovery Figma via `use_figma` ha corretto il mapping del PRD: la route `/registrati` corrisponde ai frame `Form di accesso per pc` `336:593` e `Form di accesso per mobile` `336:643`, non al login `658:667`
- tests: pending
- note: la route corrente e la baseline `register-page` vanno rivalutate contro questi frame, perche il design vivo mostra una role choice minimal senza footer nel canvas e con copy/CTA diversi

- timestamp: 2026-04-11 17:06
- task: audit registrazione pubblica contro Figma/export/VRT
- node: desktop `336:593`, mobile `336:643`
- viewport: desktop + mobile
- files: src/pages/public/role-choice-page.tsx, tests/e2e/public/public-routes.spec.ts, tests/e2e/parity/register-page.visual.spec.ts, tests/fixtures/public-copy.ts, __screenshots__/chromium-desktop/parity/register-page.visual.spec.ts/register-page.png, __screenshots__/chromium-mobile/parity/register-page.visual.spec.ts/register-page.png, prd.md, .codexpotter/kb/register-choice.md
- action: sostituita la role choice legacy con una composizione dedicata aderente ai frame Figma desktop/mobile, corretto il VRT per fotografare solo il canvas del frame invece del full page legacy e riallineate le baseline desktop/mobile
- tests: `npx playwright test tests/e2e/public/public-routes.spec.ts`; `npx playwright test tests/e2e/parity/register-page.visual.spec.ts`; `npx playwright test tests/e2e/parity/register-page.visual.spec.ts --update-snapshots`; `npm run test:all`
- note: capture di audit `artifacts/loop-captures/2026-04-11/1554-register-audit-before` e `artifacts/loop-captures/2026-04-11/1600-register-audit-after`; nessuna PR aperta sul branch corrente
