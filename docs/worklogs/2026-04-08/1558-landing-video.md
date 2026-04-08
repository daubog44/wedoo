# 2026-04-08 15:58 - landing-video

- task: [FRAME][node=143:1822][route=/] Rifinire sezione video e placeholder media.
- node: 143:1822
- viewport: desktop
- files: src/data/mocks/public-home.ts, src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts
- action: discovery sul nodo video `144:1955` e confronto tra asset locali e Figma
- tests: n/a
- issue: il desktop usa ancora un asset hardcoded (`Rectangle-28@2x.png`) mentre il mock data espone un placeholder diverso (`home-video-placeholder-desktop.png`) usato solo dal mobile
- note: il placeholder Figma corretto corrisponde all'asset rounded `Rectangle-28@2x.png`; il task richiede riallineare contratto dati e consumer UI

- action: riallineato il contratto `video.previewImage` al placeholder Figma e rimosso l'hardcode desktop nel consumer della landing
- files: src/data/mocks/public-home.ts, src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts
- tests: npx playwright test tests/e2e/public/landing-page.spec.ts; npx playwright test tests/e2e/parity/landing-page.visual.spec.ts
- resolution: desktop e mobile consumano ora lo stesso asset `Rectangle-28@2x.png`; il test E2E verifica anche la presenza dell'immagine con alt testuale coerente
- note: nessun delta VRT aggiuntivo dopo il riallineamento del placeholder

- tests: npm run test:all
- note: quality gate completo verde dopo il riallineamento del binding video
