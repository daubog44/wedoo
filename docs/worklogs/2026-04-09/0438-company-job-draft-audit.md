# 2026-04-09 04:38 - company-job-draft-audit

- task: strict review finale del blocco wizard annuncio azienda
- node: 258:847, 259:1050
- viewport: desktop come riferimento Figma principale per entrambi i frame (1440px); review responsive aggiuntiva su mobile
- files: src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, src/pages/portal/company-job-draft-page.tsx, tests/e2e/portal/company-job-draft-step-1.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts
- action: avviata review indipendente dal commit base del tracker con verifica Figma, audit route e rilancio test mirati
- tests: `npm run lint`; `npm run typecheck`; `npx vitest run tests/integration/job-draft.test.ts tests/integration/mock-services.test.ts`; `CI=1 WEDOO_DEV_PORT=4710 npx playwright test tests/e2e/portal/company-job-draft-step-1.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts`
- note: nessun gap residuo emerso. Figma conferma shell desktop con pannello informativo destro; route reale resta coerente, footer assente, persistence della bozza integra e VRT desktop/mobile verdi. GitHub: nessuna PR aperta per `codex/ralph-loop-bootstrap`, quindi nessuna CI remota aggiornata per l'HEAD locale.
