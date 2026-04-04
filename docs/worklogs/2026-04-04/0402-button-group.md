# 2026-04-04 04:02 - button-group

- task: estrarre button group header landing
- node: 199:591
- viewport: desktop
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avviata sessione dedicata al primo task aperto del PRD per rendere riusabile il gruppo auth dell'header landing
- tests: not run yet
- note: in attesa di verifica Figma MCP sul nodo componente prima dell'estrazione

- action: Figma `199:591` conferma gap `16px`, due bottoni da `49px` e copy `accedi` / `registrati`; estratto `HomeAuthButtonGroup` e riutilizzato in header desktop e mobile
- files: src/components/public/home/home-auth-button-group.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts
- decision: aggiunto `role=\"group\"` con label accessibile per dare un hook stabile ai test senza alterare il layout Figma

- action: aggiornata la copertura landing per verificare il gruppo auth come unita semantica
- files: tests/e2e/public/landing-page.spec.ts, tests/fixtures/public-copy.ts, prd.md
- tests: npm run test:e2e -- tests/e2e/public/landing-page.spec.ts; npm run test:all
- note: nessuna PR aperta per `codex/ralph-loop-bootstrap`; ricerca GitHub su `head:codex/ralph-loop-bootstrap state:open` restituisce 0 risultati
