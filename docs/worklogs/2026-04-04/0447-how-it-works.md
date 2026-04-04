# 2026-04-04 04:47 - how-it-works

- task: rifinire la sezione "come funziona"
- node: 143:1822
- viewport: desktop
- files: src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts, tests/fixtures/public-copy.ts
- action: avvio sessione; discovery Figma del frame landing e verifica del blocco how-it-works desktop/mobile
- figma: `143:1822` conferma che il blocco desktop usa titolo `144:1942` su box `1093px`, eyebrow `143:1928`, body `144:1943` e CTA `144:1944/144:1949`; non emerge una variante mobile dedicata nel file, quindi l'adattamento mobile resta derivato ma coerente
- decision: corretto il box desktop del titolo `how-it-works` da `1083px` a `1093px` e trasformato il blocco mobile da paragrafo unico a gerarchia reale `title/eyebrow/body` per evitare compressione e copy indistinto
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`; `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --project=chromium-mobile --update-snapshots`; `npm run test:all`
- visual-review: desktop coerente con il frame Figma; mobile piu leggibile e con CTA distanziate, baseline VRT mobile aggiornata in modo intenzionale
- github: nessuna PR aperta trovata per `head:codex/ralph-loop-bootstrap`
