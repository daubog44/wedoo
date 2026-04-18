# 2026-04-17 20:36 - company-job-draft-step-2-drift

## 20:36 - task /portale/azienda/annunci/nuovo?step=2 - node 259:1050,259:1162

- touched area: short drift discovery sweep with Figma screenshots, current step-2 component, and real route capture
- tests run: `npm run loop:capture -- "/portale/azienda/annunci/nuovo?step=2" company-job-draft-step-2-sweep`
- findings or errors: real capture proves the second step is still macroscopically wrong against Figma; mobile still renders hero media plus desktop hint copy that the mobile frame never shows, while the desktop composition wraps and compresses badly before the canonical 1440 frame
- next step: open a follow-up frame task, patch `src/components/portal/company-job-draft-step-two.tsx`, then rerun route and parity checks with fresh after captures

## 20:42 - task /portale/azienda/annunci/nuovo?step=2 - node 259:1050,259:1162

- touched area: `src/components/portal/company-job-draft-step-two.tsx`, route spec and parity baseline
- tests run: `npx playwright test tests/e2e/portal/company-job-draft-step-2.spec.ts`; `npx playwright test tests/e2e/parity/company-job-draft-step-2.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/company-job-draft-step-2.visual.spec.ts`; `npx playwright test tests/e2e/portal/company-jobs-page.spec.ts`
- findings or errors: rebuilt the mobile frame on the real `259:1162` canvas, removed the wrong hero and hint copy, stacked the CTA sequence to match Figma, and made the desktop title plus form/help geometry hold together better outside the perfect 1440 viewport
- next step: task closed with before capture `artifacts/loop-captures/2026-04-17/2033-company-job-draft-step-2-sweep` and after capture `artifacts/loop-captures/2026-04-17/2039-company-job-draft-step-2-final`
