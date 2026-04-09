# 2026-04-09 05:16 - company-job-draft-strict-review

- task: strict review finale wizard annuncio azienda
- node: 258:847, 259:1050
- viewport: desktop (frame Figma 1440px), con verifica responsive mobile in review finale
- files: src/pages/portal/company-job-draft-page.tsx, src/components/portal/company-job-draft-*.tsx, src/data/job-draft.ts, src/data/mock-services.ts, tests/e2e/portal/company-job-draft-step-*.spec.ts, tests/e2e/parity/company-job-draft-step-*.visual.spec.ts
- action: riaperti metadata, design context e screenshot Figma dei due frame; avviata strict review contro route `/portale/azienda/annunci/nuovo` e diff dal commit base `1232695e80906eeb42cf0d57151710e9f8b3ab77`
- tests: pending
- note: worktree sporco anche su file non legati al task (`AGENTS.md`, `package.json`, `playwright.config.ts`, `scripts/potter-yolo.ps1`); review centrata solo sul blocco azienda e senza revert di modifiche preesistenti
- action: trovata una regressione mobile non coperta dai test strutturali iniziali, con H1 del wizard che invadeva il pannello immagine in entrambi i frame; estratta la primitive shared `JobDraftMobileHero`, ridotto l'overlap del form mobile e aggiunto un assert E2E sulla separazione heading/media.
- files: src/components/portal/company-job-draft-fields.tsx, src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, tests/integration/company-job-draft-fields.test.ts, tests/e2e/portal/company-job-draft-step-1.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts, __screenshots__/chromium-mobile/parity/company-job-draft-step-1.visual.spec.ts/company-job-draft-step-1.png, __screenshots__/chromium-mobile/parity/company-job-draft-step-2.visual.spec.ts/company-job-draft-step-2.png
- tests: `npx vitest run tests/integration/company-job-draft-fields.test.ts tests/integration/mock-services.test.ts tests/integration/job-draft.test.ts`; `npx playwright test tests/e2e/portal/company-job-draft-step-1.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts`; `npx playwright test tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts --update-snapshots`; `npm run test:all`
- resolution: audit visuale locale desktop/mobile via screenshot Playwright su `tmp/strict-review/*.png` conferma che il desktop resta fedele ai frame `258:847`/`259:1050` e il mobile mostra ora un hero leggibile senza clipping del titolo o label del primo campo
