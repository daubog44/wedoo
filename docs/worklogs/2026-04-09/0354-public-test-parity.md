# 2026-04-09 03:54 - public-test-parity

- task: sostituire lo smoke landing con E2E aderente a Figma e riallineare test/parity login
- node: 143:1822, 658:667
- viewport: desktop per i frame Figma di riferimento; review finale prevista anche mobile
- files: tests/e2e/public/landing-page.spec.ts, tests/e2e/public/login-page.spec.ts, tests/e2e/parity/login-page.visual.spec.ts, tests/e2e/parity/figma-backlog.spec.ts, prd.md
- action: avvio sessione dopo audit dei task aperti nel PRD e verifica che landing/login abbiano gia implementazione stabile ma bookkeeping incompleto
- figma: landing `143:1822` conferma struttura completa hero -> how it works -> impact -> feature card -> video -> patrocinio -> footer; login `658:667` conferma stato desktop `campi mancanti` con checkbox selezionata, provider button outline e prompt registrazione
- decision: trattare la sessione come rifinitura test-first e parity-first, evitando refactor ampi delle route gia allineate a Figma
- result: `landing-page.spec.ts` ora separa parity strutturale e mappa CTA del frame `143:1822`; `login-page.spec.ts` separa stato errore/consenso e submit positivo; aggiunto `login-page.visual.spec.ts` con baseline desktop/mobile del solo layout auth; `figma-backlog.spec.ts` non tiene piu `fixme` stantii per frame gia coperti
- tests-final: `npx playwright test tests/e2e/public/landing-page.spec.ts tests/e2e/public/login-page.spec.ts tests/e2e/parity/figma-backlog.spec.ts`, `CI=1 WEDOO_DEV_PORT=4705 npx playwright test tests/e2e/parity/login-page.visual.spec.ts --update-snapshots`, `npm run test:all`
- visual-review: login parity catturata sul layout visibile (`data-login-layout`) per rispettare il frame `658:667` senza includere il `SiteFooter` fuori canvas; landing desktop/mobile confermata coerente con l'ordine sezioni del frame `143:1822`
- github: branch `codex/ralph-loop-bootstrap`, nessuna PR aperta trovata su `daubog44/wedoo`
