# 2026-04-04 03:21 - job-draft

- task: definire `JobDraft` per creazione annuncio azienda a step
- node: n/a
- viewport: n/a
- files: src/data/forms.ts, src/data/job-draft.ts, tests/integration/job-draft.test.ts
- action: avvio sessione, analisi dei moduli dati esistenti e del wizard azienda basato su `companyForms`
- tests: non ancora eseguiti
- note: il wizard usa step statici 2-5; il task richiede un contratto server-like riusabile che alimenti i form senza duplicare opzioni e placeholder nel JSX

- action: introdotto `src/data/job-draft.ts` con payload tipizzato, cataloghi riusabili e mapper `createCompanyJobDraftFormConfigs()`
- files: src/data/job-draft.ts, src/data/forms.ts, tests/integration/job-draft.test.ts, prd.md
- tests: `npm run typecheck`, `npm run lint`, `npx vitest run tests/integration/job-draft.test.ts tests/integration/auth-view-model.test.ts`, `npm run test:all`
- decision: mantenuto `companyForms` come adapter UI e spostata la sorgente dati nel nuovo modulo `JobDraft`, cosi il wizard pubblico non cambia contratto runtime
- ci: nessuna PR aperta per `codex/ralph-loop-bootstrap`; nessun check remoto da verificare
- status: task completato e PRD aggiornato
