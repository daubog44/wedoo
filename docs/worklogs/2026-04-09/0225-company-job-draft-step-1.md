# 2026-04-09 02:25 - company-job-draft-step-1

- task: [FRAME][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-1.spec.ts] Implementare step geografia e descrizione del wizard annuncio azienda in route portale dedicata.
- node: 258:847
- viewport: desktop
- files: .codexpotter/projects/2026/04/09/1/MAIN.md, docs/worklogs/2026-04-09/0225-company-job-draft-step-1.md
- action: avviata discovery Figma del frame `Portale annunci`, confermata viewport desktop 1440x1024 e identificato mismatch della route attuale: il portale non espone ancora `/portale/azienda/annunci/nuovo` e il CTA esistente rimanda al wizard pubblico legacy `/registrati/azienda/2`.
- tests: nessuno eseguito in questa fase
- decision: implementare una route portale dedicata per il job draft e non riusare direttamente `FormPageContent`, cosi la UI puo seguire il frame Figma mantenendo separato il vecchio onboarding pubblico.
- files: src/data/job-draft.ts, src/components/portal/company-job-draft-step-one.tsx, src/pages/portal/company-job-draft-page.tsx, src/pages/portal/company-jobs-page.tsx, src/router.tsx, tests/e2e/portal/company-job-draft-step-1.spec.ts, tests/fixtures/portal-copy.ts, tests/integration/job-draft.test.ts, prd.md
- action: implementata la route portale dedicata con shell desktop/mobile Figma-first, filtri geografia `provincia -> citta -> CAP`, CTA "crea" riallineata dal portale e submit temporaneo verso `/portale/azienda/annunci` finche il frame `259:1050` non sostituisce lo step successivo.
- tests: npm run lint; npm run typecheck; npx vitest run tests/integration/job-draft.test.ts; npx playwright test tests/e2e/portal/company-job-draft-step-1.spec.ts; npm run test:all
- note: GitHub controllato sul branch `codex/ralph-loop-bootstrap`, nessuna PR aperta da riallineare per questo task.
