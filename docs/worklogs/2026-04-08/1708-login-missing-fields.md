# 2026-04-08 17:08 - login-missing-fields

- task: implementare stato login campi mancanti
- node: 658:667
- viewport: desktop
- files: src/pages/public/login-page.tsx, src/data/auth.ts, tests/e2e/public/login-page.spec.ts, tests/fixtures/public-copy.ts
- action: avvio task dopo audit route esistente `/accedi`
- figma: frame desktop `1440x1024`; form specifico con errori inline rossi, checkbox selezionata, provider button outline e prompt registrazione
- audit: la route esistente usa ancora `BackdropPageShell` + `FormPageContent`, mismatch macroscopico su titolo, CTA, stato errore, checkbox e densita layout
- decision: sostituire solo la pagina login con una composizione dedicata che continua a leggere il dominio da `loginAuthViewModel`, lasciando intatto il form shell legacy per registrazione e wizard
- result: `login-page.tsx` ora renderizza un layout dedicato desktop/mobile con stato `campi mancanti` gia presente, messaggi inline, CTA `accedi`, provider button coerenti e navigazione al portale solo dopo compilazione dei campi richiesti
- tests-final: `npm run typecheck`, `npx vitest run tests/integration/auth-view-model.test.ts`, `npx playwright test tests/e2e/public/login-page.spec.ts`, `npm run test:all`
- visual-review: desktop allineato al frame `658:667`; mobile derivato senza riusare il form shell legacy e senza overlap tra form, provider button e footer
- github: branch remoto presente (`codex/ralph-loop-bootstrap`), nessuna PR aperta per la branch al momento del check
