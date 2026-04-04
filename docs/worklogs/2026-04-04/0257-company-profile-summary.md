# 2026-04-04 02:57 - company-profile-summary

- task: definire `CompanyProfileSummary` per showcase azienda
- node: n/a
- files: src/data/company-profile.ts, src/data/showcases.ts, tests/integration/company-profile-summary.test.ts
- action: avvio analisi del dominio azienda e dei punti di aggancio esistenti su `/azienda`
- tests: non ancora eseguiti
- note: il componente reale collegato alla route e `ShowcaseCarousel`, alimentato oggi da `roleShowcases.company`

- task: definire `CompanyProfileSummary` per showcase azienda
- node: n/a
- files: src/data/company-profile.ts, src/data/showcases.ts, tests/integration/company-profile-summary.test.ts, .codexpotter/kb/company-profile.md
- action: introdotto summary server-like con mapper esplicito verso `RoleShowcase`; `roleShowcases.company` ora deriva dal nuovo contratto senza cambiare la UI
- tests: `npm run test:integration -- company-profile-summary`, `npm run test:integration -- candidate-profile-draft`, `npm run typecheck`
- issue: `showcases.ts` aveva alcune stringhe candidato alterate durante il rewrite completo del file
- resolution: ripristinato il copy candidato e limitato il diff al solo percorso azienda
- note: nessuna PR aperta per `codex/ralph-loop-bootstrap`; branch remoto presente, nessuna verifica CI aggiuntiva disponibile via PR
