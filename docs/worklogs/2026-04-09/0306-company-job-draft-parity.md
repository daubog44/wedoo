# 2026-04-09 03:06 - company-job-draft-parity

- task: [TEST][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/parity/company-job-draft-step-1.visual.spec.ts] Aggiungere parity visuale desktop/mobile per il primo step annuncio azienda quando il layout si stabilizza.
- task: [TEST][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/parity/company-job-draft-step-2.visual.spec.ts] Aggiungere parity visuale desktop/mobile per il secondo step annuncio azienda quando il layout si stabilizza.
- node: 258:847, 259:1050
- viewport: desktop + mobile
- files: tests/e2e/parity/company-job-draft-step-1.visual.spec.ts, tests/e2e/parity/company-job-draft-step-2.visual.spec.ts, __screenshots__/chromium-desktop/parity/company-job-draft-step-1.visual.spec.ts/company-job-draft-step-1.png, __screenshots__/chromium-mobile/parity/company-job-draft-step-1.visual.spec.ts/company-job-draft-step-1.png, __screenshots__/chromium-desktop/parity/company-job-draft-step-2.visual.spec.ts/company-job-draft-step-2.png, __screenshots__/chromium-mobile/parity/company-job-draft-step-2.visual.spec.ts/company-job-draft-step-2.png, tests/e2e/parity/figma-backlog.spec.ts, prd.md
- action: aggiunti i due visual test dedicati e generate baseline intenzionali desktop/mobile su server pulito (`CI=1`, `WEDOO_DEV_PORT=4702`), poi rimosse dal backlog parity le due voci `fixme` appena coperte.
- tests: $env:CI='1'; $env:WEDOO_DEV_PORT='4702'; npx playwright test tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts --update-snapshots; $env:CI='1'; $env:WEDOO_DEV_PORT='4703'; npm run test:all
- note: il backlog `tests/e2e/parity/figma-backlog.spec.ts` resta aperto per `landing`, `login` e frame candidato; il blocco azienda non e piu in fixme.
