# 2026-04-09 00:03 - candidate-contacts

- task: implementare `pop up contatti`
- node: 281:1207
- viewport: desktop confermato dal frame `650x839`; serve adattamento mobile dedicato, non semplice canvas centrato
- files: src/components/public/candidate-contacts-step.tsx, src/pages/public/candidate-wizard-page.tsx, src/data/candidate-profile.ts, tests/e2e/wizards/candidate-contacts.spec.ts, tests/integration/candidate-profile-draft.test.ts, tests/integration/mock-services.test.ts
- figma: shell mint `#d5fbee`, card interna `510x603` con bordo `#58cba5`, summary contatti con valore corrente sopra ai campi editabili; `provincia` e `città` sono select, `CAP` e i due campi successivi sono text field
- audit: la route `/registrati/candidato/2` mostrava ancora il form generico `Dicci qualcosa in piu` con hero illustrata; mismatch totale con il frame `pop up contatti` sia su desktop sia su mobile
- decision: sostituire solo lo step `/registrati/candidato/2` con un componente dedicato, lasciando invariato lo step `1` finché i frame successivi non saranno implementati
- implementation: route riallineata al frame `281:1207` con shell mint, card interna, summary bullets, select `provincia`/`città`, input `CAP`, email e telefono, close verso step `1`, save verso `/portale/candidato`
- tests: `npx eslint src/components/public/candidate-contacts-step.tsx src/pages/public/candidate-wizard-page.tsx src/data/candidate-profile.ts tests/e2e/wizards/candidate-contacts.spec.ts tests/integration/candidate-profile-draft.test.ts tests/fixtures/public-copy.ts`, `npx vitest run tests/integration/candidate-profile-draft.test.ts`, `npx playwright test tests/e2e/wizards/candidate-contacts.spec.ts --project=chromium-desktop --project=chromium-mobile`, `npm run test:all`
- visual-review: screenshot finali desktop e mobile confermano assenza di overflow, rimozione del vecchio form generico e correzione del doppio label visibile su email e telefono emerso nella prima review
- status: task frame contatti pronto; PRD aggiornato anche per il test E2E contatti già coperto
