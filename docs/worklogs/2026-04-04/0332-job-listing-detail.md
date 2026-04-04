# 2026-04-04 03:32 - job-listing-detail

- task: definire `JobListing` e `JobDetail` per card annuncio e pagina dettaglio
- node: n/a
- viewport: n/a
- files: src/data/jobs.ts, src/data/types.ts, src/pages/portal/candidate-job-page.tsx, src/pages/portal/company-job-page.tsx, src/pages/portal/company-jobs-page.tsx, tests/integration/job-listing-detail.test.ts
- action: avvio sessione e discovery dei consumer del dataset `jobs`
- tests: non ancora eseguiti
- note: `jobs.ts` contiene oggi sia dati preview sia dati dettaglio; dashboard, card e due route dettaglio dipendono da un unico shape legacy `JobEntry`

- action: introdotti `JobListing` e `JobDetail` con lookup separati, mapper `mapJobListingDetailToEntry()` e helper `getJobEntryById()` per mantenere stabile l'UI esistente
- files: src/data/jobs.ts, src/data/types.ts, src/pages/portal/candidate-job-page.tsx, src/pages/portal/company-job-page.tsx, tests/integration/job-listing-detail.test.ts, prd.md
- tests: `npm run typecheck`, `npm run lint`, `npx vitest run tests/integration/job-listing-detail.test.ts tests/integration/job-draft.test.ts tests/integration/candidate-profile-summary.test.ts`, `npm run test:all`
- decision: mantenuto l'export legacy `jobs` come adapter per dashboard, card e select esistenti; le route dettaglio ora risolvono l'entry tramite helper dedicato invece di duplicare fallback locali
- ci: nessuna PR aperta per `codex/ralph-loop-bootstrap`; ricerca GitHub su branch head senza risultati
- status: task completato e PRD aggiornato
