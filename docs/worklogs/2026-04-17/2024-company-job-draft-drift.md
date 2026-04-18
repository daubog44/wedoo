## 20:24 - task /portale/azienda/annunci/nuovo - node 258:847,258:956

- touched area: short drift discovery sweep with real captures
- tests run: `npm run loop:capture -- /articoli articles-drift-sweep`; `npm run loop:capture -- /podcast podcasts-drift-sweep`; `npm run loop:capture -- /portale/azienda/annunci/nuovo company-job-draft-sweep`
- findings or errors: `/articoli` and `/podcast` look coherent enough for now, but `/portale/azienda/annunci/nuovo` is still macroscopically wrong against Figma; the descriptive copy spills into the hero image area on desktop and the mobile shell remains vertically compressed
- next step: treat this as a follow-up frame task, rerun step-1 route/parity in the next round, then fix containment and spacing before touching more routes

## 20:29 - task /portale/azienda/annunci/nuovo - node 258:847,258:956

- touched area: `src/components/portal/company-job-draft-step-one.tsx`, route spec and parity baseline
- tests run: `npx playwright test "tests\\e2e\\portal\\company-job-draft-step-1.spec.ts"`; `npx playwright test "tests\\e2e\\parity\\company-job-draft-step-1.visual.spec.ts" --update-snapshots`; `npx playwright test "tests\\e2e\\parity\\company-job-draft-step-1.visual.spec.ts"`
- findings or errors: removed mobile-only hint debt that Figma never showed, tightened the desktop hint column, and added a soft readability veil so the right-side copy no longer fights the compass media asset
- next step: task closed with before capture `artifacts/loop-captures/2026-04-17/2022-company-job-draft-sweep` and after capture `artifacts/loop-captures/2026-04-17/2029-company-job-draft-after-4`
