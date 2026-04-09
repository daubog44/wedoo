# 2026-04-09 02:50 - company-job-draft-step-2

- task: [FRAME][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-2.spec.ts] Implementare step contratto, modalita, SDG e certificazioni del wizard annuncio azienda.
- node: 259:1050
- viewport: desktop
- files: docs/worklogs/2026-04-09/0250-company-job-draft-step-2.md
- action: avviata nuova sessione dopo il commit `feat: add company job draft step 1 figma 258:847`; il task successivo lavora sulla stessa route portale e richiede discovery Figma dedicata per capire se il passaggio di step va modellato con stato interno, query string o altra variante coerente.
- tests: nessuno eseguito in questa fase
- action: discovery Figma completata sul frame `259:1050`, confermato desktop 1440x1024 con stessa route del frame precedente, background dedicato, CTA multiple (`cancella`, `bozza`, `anteprima`, `invia`) e note laterali su contratto/modalita/SDG/certificazioni.
- decision: usare `?step=2` sulla stessa route `/portale/azienda/annunci/nuovo` per allineare il PRD senza duplicare path, cosi lo step `1` puo inoltrare al frame `2` restando nel flusso portale appena introdotto.
- files: src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, src/pages/portal/company-job-draft-page.tsx, tests/e2e/portal/company-job-draft-step-1.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts, tests/fixtures/portal-copy.ts, prd.md
- action: implementato lo step `259:1050` con UI desktop/mobile, query `?step=2`, upload certificazioni, CTA finali e aggiornato il flow dello step `1` verso questo secondo frame.
- tests: npm run lint; npm run typecheck; npx vitest run tests/integration/job-draft.test.ts; npx playwright test tests/e2e/portal/company-job-draft-step-1.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts; $env:CI='1'; $env:WEDOO_DEV_PORT='4700'; npm run test:all
- issue: `npm run test:all` su server locale riusato ha dato failure intermittenti sui VRT desktop `landing` e `info`; il rerun su porta nuova `4700` con `reuseExistingServer` disattivato e server pulito e risultato verde.
