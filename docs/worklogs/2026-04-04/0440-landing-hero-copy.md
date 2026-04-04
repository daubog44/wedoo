# 2026-04-04 04:40 - landing-hero-copy

- task: rifinire hero copy, titolo e subtitle della landing
- node: 143:1822
- viewport: desktop
- files: src/data/mocks/public-home.ts, src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts, tests/e2e/parity/landing-page.visual.spec.ts
- action: avviata sessione sul primo task FRAME aperto della landing, dopo chiusura del mapping smartphone
- tests: not run yet
- note: discovery iniziale conferma frame desktop 1440x3109 con hero nella fascia alta e nodi testo principali `143:1832` e `143:1833`

- action: confermato via `get_design_context` che la copy Figma e gia corretta, quindi la rifinitura si concentra sulla resa: titolo desktop riallineato al box `1000px` e subtitle reso come due paragrafi espliciti, sia desktop sia mobile
- files: src/components/public/home/home-sections.tsx, tests/fixtures/public-copy.ts, tests/e2e/public/landing-page.spec.ts
- decision: la spezzatura del subtitle resta una concern di view e non del mock server-like; il payload continua a esporre una sola stringa con newline, mentre la UI la materializza in righe distinte per aderire al frame

- tests: npm run test:e2e -- tests/e2e/public/landing-page.spec.ts; npm run test:vrt -- tests/e2e/parity/landing-page.visual.spec.ts; npm run test:all
- note: nessuna baseline aggiornata per la landing, il VRT passa con le snapshot correnti; nessuna PR aperta sul branch remoto `codex/ralph-loop-bootstrap`
