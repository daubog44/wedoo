# 2026-04-09 04:57 - company-job-draft-primitives

- task: estrarre primitive shared del wizard annuncio azienda e rimuovere l'import diretto step2 -> step1
- node: 258:847, 259:1050
- viewport: desktop
- files: src/components/portal/company-job-draft-*.tsx, tests/integration/**
- action: review indipendente del blocco azienda dal commit base `1232695`; Figma riaperto sui due frame e individuato gap strutturale nel riuso delle primitive
- decision: trattare l'estrazione come hardening del goal "route dedicata e primitive shared utili", senza cambiare il comportamento visuale del wizard
- tests: da eseguire dopo il refactor mirato
- files: src/components/portal/company-job-draft-fields.tsx, src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, tests/integration/company-job-draft-fields.test.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts
- action: estratte le primitive condivise (`LanguageChip`, `SectionHeading`, `FieldLabel`, `SelectField`, `HintText`) in modulo dedicato; step 1 e step 2 ora dipendono dallo stesso layer shared
- issue: il test E2E desktop di resume bozza andava vicino al timeout in run parallelo per un ritorno ridondante via CTA portale
- resolution: mantenuto l'assert sulla landing `/portale/azienda/annunci` dopo `bozza`, ma riapertura della route fatta con `page.goto()` perche il click CTA e gia coperto dallo step 1; durata scesa sotto soglia e flake sparita
- tests: npm run lint; npm run typecheck; npm run test:integration -- tests/integration/company-job-draft-fields.test.ts tests/integration/job-draft.test.ts tests/integration/mock-services.test.ts; CI=1 WEDOO_DEV_PORT=4714 npx playwright test tests/e2e/portal/company-job-draft-step-1.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts
- github: nessuna PR aperta per `daubog44/wedoo` con head `codex/ralph-loop-bootstrap`, quindi nessuna CI remota aggiornata sull'HEAD locale
