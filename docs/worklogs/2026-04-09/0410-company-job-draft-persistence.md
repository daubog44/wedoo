# 2026-04-09 04:10 - company-job-draft-persistence

- task: persistire la bozza `JobDraft` tra step, CTA `bozza` e riapertura wizard azienda
- node: 258:847, 259:1050
- viewport: desktop come riferimento primario dei frame Figma, review finale anche mobile
- files: prd.md, src/data/job-draft.ts, src/data/mock-services.ts, src/pages/portal/company-job-draft-page.tsx, src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, tests/integration/mock-services.test.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts
- action: review stretta post-parity; emerso gap di persistenza bozza non backend-like nel wizard annunci
- tests: da eseguire dopo wiring service + route + E2E
- note: i frame Figma restano vuoti allo stato iniziale, quindi la persistenza va introdotta senza rompere la baseline parity iniziale
- action: introdotti helper `createEmptyJobDraft` + merge step1/step2, service mock persistente con snapshot `sessionStorage`, route `/portale/azienda/annunci/nuovo` riletta dal service e handler centralizzati per `continua`, `bozza`, `anteprima`, `invia`
- tests: `npm run lint`; `npm run typecheck`; `npm run test:integration -- tests/integration/mock-services.test.ts tests/integration/job-draft.test.ts`; `npm run test:e2e -- tests/e2e/portal/company-job-draft-step-1.spec.ts`; `npm run test:e2e -- tests/e2e/portal/company-job-draft-step-2.spec.ts`; `npm run test:e2e -- tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts`
- issue: `cancella` svuotava lo state ma non l'`input[type=file]`, quindi ricaricare lo stesso PDF non rimetteva il nome nel draft
- resolution: remount controllato del campo upload tramite `uploadResetKey` incrementato al reset
- note: branch remoto `codex/ralph-loop-bootstrap` senza PR aperte su `daubog44/wedoo`
