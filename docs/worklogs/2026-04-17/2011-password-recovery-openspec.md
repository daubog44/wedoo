## 20:11 - task /password-dimenticata,/assistenza-clienti - node 657:658,660:774,660:725,660:1217

- touched area: OpenSpec change `wedoo-ui-modernization-layout-stability`, password recovery parity blocker
- tests run: `npx playwright test "tests\\e2e\\parity\\password-recovery-flow.visual.spec.ts"`
- findings or errors: rerun is green now, but real captures plus Figma still show the recovery consent row and form finish reading weaker than the target frame
- next step: patch `src/pages/public/password-recovery-page.tsx`, then rerun parity and capture after

## 20:13 - task /password-dimenticata - node 657:658,660:774

- touched area: `src/pages/public/password-recovery-page.tsx`
- tests run: `npx playwright test "tests\\e2e\\public\\password-recovery-flow.spec.ts"`
- findings or errors: made the consent row visibly match Figma again and strengthened the recovery card shell; public flow stayed green on desktop and mobile
- next step: update the password-recovery parity baseline intentionally and rerun the parity spec in sequence

## 20:14 - task /password-dimenticata,/assistenza-clienti - node 657:658,660:774,660:725,660:1217

- touched area: parity baseline plus OpenSpec/visual-tracking artifacts
- tests run: `npx playwright test "tests\\e2e\\parity\\password-recovery-flow.visual.spec.ts" --update-snapshots`; `npx playwright test "tests\\e2e\\parity\\password-recovery-flow.visual.spec.ts"`; `npx playwright test "tests\\e2e\\public\\password-recovery-flow.spec.ts"`
- findings or errors: recovery baseline needed refresh after the intentional consent-row fix; sequential rerun is green and support parity remained unchanged
- next step: task closed with capture after `artifacts/loop-captures/2026-04-17/2014-password-recovery-openspec-final` and supporting audit captures `artifacts/loop-captures/2026-04-17/2009-password-recovery-openspec-audit`, `artifacts/loop-captures/2026-04-17/2009-customer-support-openspec-audit`
