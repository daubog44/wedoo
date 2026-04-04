# 2026-04-04 03:05 - candidate-profile-summary

- task: definire `CandidateProfileSummary` per card e dettaglio profilo
- node: n/a
- files: src/data/candidate-profile-summary.ts, src/data/candidates.ts, tests/integration/candidate-profile-summary.test.ts
- action: avvio analisi dei consumer attuali dei dati candidati su dashboard azienda, card e dettaglio profilo
- tests: non ancora eseguiti
- note: i consumer reali leggono ancora `CandidateEntry[]` da `src/data/candidates.ts`, quindi il nuovo contratto deve adattarsi senza rifattorizzare le pagine

- task: definire `CandidateProfileSummary` per card e dettaglio profilo
- node: n/a
- files: src/data/candidate-profile-summary.ts, src/data/candidates.ts, tests/integration/candidate-profile-summary.test.ts
- action: introdotto summary server-like con mapper verso `CandidateEntry[]` per mantenere compatibili card, dashboard e pagina dettaglio esistenti
- tests: `npm run test:integration -- tests/integration/candidate-profile-summary.test.ts`, `npm run test:integration`, `npm run typecheck`, `npm run lint`
- decision: nessun refactor dei consumer UI; `src/data/candidates.ts` resta il punto d'ingresso legacy e deriva i dati dal nuovo summary
- status: task chiuso e PRD aggiornato
