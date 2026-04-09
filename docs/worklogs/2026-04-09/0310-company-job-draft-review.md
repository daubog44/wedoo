# 2026-04-09 03:10 - company-job-draft-review

- task: review finale wizard annuncio azienda contro Figma, route e test mirati
- node: 258:847, 259:1050
- viewport: desktop
- files: .codexpotter/projects/2026/04/09/1/MAIN.md, docs/worklogs/2026-04-09/0310-company-job-draft-review.md
- action: avviata review stretta del blocco `Portale annunci` dopo i commit dei frame `258:847` e `259:1050`; in corso rilettura di metadata e design context Figma per verificare che non ci siano gap residui su layout, copy, flow e parity.
- action: dalla review Figma sul frame `259:1050` emerge un gap reale: la guida laterale richiede `scelta multipla` per gli SDG, mentre il componente attuale usa un select singolo; aggiunti task espliciti in `prd.md` e riallineato il tracker interno sul fix del secondo step.
- files: src/components/portal/company-job-draft-step-two.tsx, tests/e2e/portal/company-job-draft-step-2.spec.ts, prd.md
- action: sostituito il select SDG singolo con accumulo multi-select che conserva l'empty state del frame Figma; i chip removibili compaiono solo dopo una scelta, quindi la baseline parity del frame `259:1050` resta invariata.
- tests: npm run lint; npm run typecheck; npx vitest run tests/integration/job-draft.test.ts; $env:CI='1'; $env:WEDOO_DEV_PORT='4706'; npx playwright test tests/e2e/portal/company-job-draft-step-1.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts; $env:CI='1'; $env:WEDOO_DEV_PORT='4707'; npm run test:all
- note: controllato anche GitHub sul branch `codex/ralph-loop-bootstrap`; nessuna PR aperta per `daubog44:codex/ralph-loop-bootstrap`, quindi non ci sono check remoti aggiuntivi da validare in questa sessione.
