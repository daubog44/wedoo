# 2026-04-04 04:33 - smartphone-icon

- task: mappare l'icona Smartphone della CTA download landing
- node: 2:414 (istanza attuale 143:1914 dentro frame 143:1822)
- viewport: desktop
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, tests/e2e/parity/landing-page.visual.spec.ts
- action: avviata sessione dedicata al riallineamento dell'icona hero `scarica l'app`
- tests: not run yet
- note: `get_design_context` su `2:414` fallisce per node id storico, ma l'istanza `143:1914` espone lo stesso componente `Smartphone` e mostra il glyph corretto da mappare

- action: sostituito il vecchio glyph `smartphone-apps-line` con il `SiteIcon` `smartphone`, mantenendo dimensioni e posizionamento della CTA invariati
- files: src/components/public/home/home-primitives.tsx, src/components/public/home/home-download-app-button.tsx, tests/e2e/public/landing-page.spec.ts
- decision: il primitive home ora accetta sia `MajesticonName` sia `SiteIconName`, cosi il mapping Figma corretto resta locale senza introdurre un wrapper ad hoc per una singola CTA

- action: riallineata la baseline visuale della landing dopo verifica del diff minimo limitato al glyph della CTA
- files: __screenshots__/chromium-desktop/parity/landing-page.visual.spec.ts/landing-page.png, __screenshots__/chromium-mobile/parity/landing-page.visual.spec.ts/landing-page.png
- tests: npm run test:e2e -- tests/e2e/public/landing-page.spec.ts; npm run typecheck; npm run test:vrt -- tests/e2e/parity/landing-page.visual.spec.ts; npm run test:all
- note: `git@github.com:daubog44/wedoo.git` e raggiungibile ma non esiste una PR aperta per `codex/ralph-loop-bootstrap`, quindi nessun controllo CI remoto aggiuntivo
