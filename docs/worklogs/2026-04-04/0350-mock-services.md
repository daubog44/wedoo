# 2026-04-04 03:50 - mock-services

- task: creare servizi mock condivisi con interfaccia async coerente
- node: n/a
- viewport: n/a
- files: src/data/*.ts, tests/integration/mock-services.test.ts
- action: discovery iniziale completata; i contratti server-like esistono gia in moduli separati ma mancano funzioni async uniformi per consumarli
- tests: non ancora eseguiti
- note: il service layer dovra restituire copie dei payload per evitare accoppiamento dei consumer ai riferimenti statici

- action: aggiunto `src/data/mock-services.ts` con getter async per public home, auth, candidate, company, contenuti e job flow
- decision: mantenuti array `readonly` anche nei return type del service layer per riflettere payload backend read-only
- files: src/data/mock-services.ts, src/data/site.ts, tests/integration/mock-services.test.ts, prd.md
- tests: `npm run test:integration -- tests/integration/mock-services.test.ts`, `npm run typecheck`, `npm run test:all`
- github: nessuna PR aperta sul branch remoto `codex/ralph-loop-bootstrap`
- status: task completato e PRD marcato `- [x]`
