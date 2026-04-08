# 2026-04-08 16:42 - landing-patronage

- task: rifinire sezione patrocinio landing
- node: 143:1822
- viewport: desktop
- files: src/components/public/home/home-sections.tsx, src/data/mocks/public-home.ts, tests/e2e/public/landing-page.spec.ts
- action: avvio task e discovery Figma su coda landing
- figma: `get_metadata`, `get_design_context` e `get_screenshot` confermano che il blocco patrocinio contiene solo bordo `144:1957` e titolo `144:1958`; nessun logo nel frame
- audit: la route `/` esistente renderizza invece una strip di loghi dentro il box patrocinio, mismatch macroscopico rispetto a Figma
- tests: audit visivo locale con screenshot desktop/mobile via Playwright CLI
- note: nessun export PNG pertinente per il patrocinio; MCP resta fonte di verita
- result: rimossa la strip di loghi dal rendering e dal contratto mock; il blocco patrocinio torna a essere un contenitore vuoto con titolo Ubuntu uppercase come nel frame
- visual-review: desktop confermato contro Figma `144:1957` e `144:1958`; mobile mantenuto come adattamento coerente senza canvas desktop ristretto
- tests-final: `npx playwright test tests/e2e/public/landing-page.spec.ts`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts`, `npm run test:all`
- github: branch remoto presente (`codex/ralph-loop-bootstrap`), nessuna PR aperta per la branch al momento del check
