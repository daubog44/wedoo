# 2026-04-08 15:34 - landing-page

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- action: preflight ok
- note: Figma MCP e GitHub MCP rispondono; Playwright locale apre correttamente http://127.0.0.1:4173.

- task: [FRAME][node=143:1822][route=/] Auditare e correggere la parity desktop/mobile della landing esistente prima di proseguire con altri raffinamenti della homepage.
- node: 143:1822
- viewport: desktop
- files: src/components/public/home/home-sections.tsx, src/components/public/home/public-home-page.tsx, tests/e2e/public/landing-page.spec.ts, tests/e2e/parity/landing-page.visual.spec.ts
- action: discovery Figma completata sul frame desktop 1440x3109 e audit locale della route esistente
- tests: npm run test:e2e -- tests/e2e/public/landing-page.spec.ts; npm run test:e2e -- tests/e2e/parity/landing-page.visual.spec.ts
- issue: sotto 1440px la route mostra ancora la composizione mobile stretta anche su viewport desktop/laptop; screenshot locale a 1280px conferma una regressione macroscopica di parity responsive
- note: il frame Figma disponibile in PRD resta desktop-first; la correzione deve mantenere fedelta a 1440px e introdurre un adattamento desktop sensato su laptop

- action: corretta la landing con breakpoint desktop `1024px`, top bar responsive e posizionamenti desktop fluidi derivati dal canvas Figma `1440px`
- files: src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts, __screenshots__/chromium-desktop/parity/landing-page.visual.spec.ts/landing-page.png
- tests: npm run test:all; screenshot audit locale a 1280px e 1024px
- resolution: la route ora mantiene una composizione desktop credibile su laptop senza perdere la parity `1440px`; il test E2E desktop controlla che le CTA `scopri` restino sulla stessa riga, mentre il mobile conferma lo stacking verticale
- note: baseline VRT desktop aggiornata in modo intenzionale dopo verifica col frame `143:1822`; nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`, quindi nessuna check remota dedicata da chiudere
