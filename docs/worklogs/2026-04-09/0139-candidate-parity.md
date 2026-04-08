# 2026-04-09 01:39 - candidate-parity

- task: stabilizzare parity visuale dei quattro step candidato
- node: 281:1207, 280:1079, 280:860, 280:951
- viewport: desktop modal reference da frame Figma larghi 650px; mobile derivata da validare con snapshot separati
- files: tests/e2e/parity/**, __screenshots__/**, prd.md, .codexpotter/projects/2026/04/09/1/MAIN.md
- action: strict review del blocco candidato dopo steps + primitive shared, con verifica screenshot/metadata Figma prima di introdurre VRT
- tests: `npx playwright test tests/e2e/parity/candidate-contacts.visual.spec.ts tests/e2e/parity/candidate-education.visual.spec.ts tests/e2e/parity/candidate-work-experience.visual.spec.ts tests/e2e/parity/candidate-skills.visual.spec.ts --update-snapshots`; `npm run lint`; `npm run typecheck`; `npx playwright test tests/e2e/wizards/candidate-contacts.spec.ts tests/e2e/wizards/candidate-education.spec.ts tests/e2e/wizards/candidate-work-experience.spec.ts tests/e2e/wizards/candidate-skills.spec.ts tests/e2e/parity/candidate-contacts.visual.spec.ts tests/e2e/parity/candidate-education.visual.spec.ts tests/e2e/parity/candidate-work-experience.visual.spec.ts tests/e2e/parity/candidate-skills.visual.spec.ts`
- decision: aggiunti quattro VRT dedicati con baseline desktop/mobile; nessuna PR aperta sul branch remoto `codex/ralph-loop-bootstrap`
- note: i frame contatti, esperienze e competenze condividono shell 650x839; formazione resta 650x2169 ma con lo stesso linguaggio visuale
