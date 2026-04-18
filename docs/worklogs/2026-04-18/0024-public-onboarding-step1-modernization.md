# 2026-04-18 00:24 - public-onboarding-step1-modernization

## 00:24 - task /registrati/candidato/1,/registrati/azienda/1 - node 273:1313,337:701

- touched area: discovery of candidate/company account step 1 desktop shells after public auth modernization
- tests run: `npm run loop:capture -- /registrati/candidato/1 modern-candidate-step1-sweep`; `npm run loop:capture -- /registrati/azienda/1 modern-company-step1-sweep`
- findings or errors: both step-1 account pages still use the older prototype shell with split hard canvas, faded chip and older CTA geometry; candidate and company are functionally correct but visually behind the newly modernized login/recovery/register family
- next step: rebuild both step-1 pages on the shared public auth shell while preserving headings, labels, providers and route flow expected by the existing public specs

## 00:31 - task /registrati/candidato/1,/registrati/azienda/1 - node 273:1313,337:701

- touched area: candidate and company step-1 account pages
- tests run: `npm run lint`; `npm run typecheck`; `npx playwright test 'tests/e2e/public/public-routes.spec.ts'`; `npx playwright test 'tests/e2e/wizards/company-registration-wizard.spec.ts'`; `npx playwright test 'tests/e2e/parity/candidate-registration-flow.visual.spec.ts' --update-snapshots`; `npx playwright test 'tests/e2e/parity/company-registration-wizard.visual.spec.ts' --update-snapshots`; parity reruns without snapshot update; `npm run loop:capture -- /registrati/candidato/1 modern-candidate-step1-after`; `npm run loop:capture -- /registrati/azienda/1 modern-company-step1-after`; `npm run test:all`
- findings or errors: both step-1 public account pages now use the shared modern public shell, preserve their exact headings/labels/provider buttons and no longer sit on the older hard-split prototype canvas; after captures live in `artifacts/loop-captures/2026-04-18/0027-modern-candidate-step1-after` and `artifacts/loop-captures/2026-04-18/0027-modern-company-step1-after`
- next step: close the PRD row and stop until another route shows evidence-backed drift
