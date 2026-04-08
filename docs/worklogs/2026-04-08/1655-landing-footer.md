# 2026-04-08 16:55 - landing-footer

- task: rifinire footer legale e contatti landing
- node: 143:1828, 143:1842, 143:1856
- viewport: desktop
- files: src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts, tests/fixtures/public-copy.ts
- action: avvio task e confronto Figma/footer reale
- figma: background footer `143:1828`, blocco copy `143:1842`, logo `143:1856`; il layout base e corretto ma il testo e molto piu compatto della resa corrente
- audit: il footer desktop reale taglia l’ultima riga del disclaimer per eccesso di spaziatura verticale; il mobile usa una variante molto compressa e poco leggibile
- result: estratto un blocco `FooterLegalCopy` condiviso per desktop e mobile, ridotte le spaziature verticali del copy legale e riallineato il logo mobile all’asset `Frame-2@2x.png`
- visual-review: desktop senza overflow nel box viola, copy completo e centrato; mobile con footer piu leggibile e gerarchia visiva coerente con il desktop
- tests-final: `npx playwright test tests/e2e/public/landing-page.spec.ts`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts`, `npm run test:all`
- github: branch remoto presente (`codex/ralph-loop-bootstrap`), nessuna PR aperta per la branch al momento del check
