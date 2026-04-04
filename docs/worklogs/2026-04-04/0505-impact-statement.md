# 2026-04-04 05:05 - impact-statement

- task: rifinire la sezione statement impatto
- node: 143:1822
- viewport: desktop
- files: src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts, tests/fixtures/public-copy.ts
- action: avvio sessione; confronto geometria del testo impatto desktop/mobile rispetto al frame landing dopo chiusura del task how-it-works
- figma: nel frame desktop il testo impatto e il nodo `143:1916` (`x: 73`, `y: 912`, `width: 1295`, `height: 123`); rispetto all'header `112px` e alla hero `761px`, il box parte `39px` sotto la sezione precedente
- decision: abbassato il blocco desktop fino alla quota Figma e riallineato il mobile al tono tipografico della landing usando `font-wedoo-accent`, senza toccare ancora la geometria delle feature card che resta task successivo
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`; `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots`; `npm run test:all`
- visual-review: desktop piu vicino al ritmo verticale del frame `143:1916`; mobile con statement piu coerente al resto della landing, baseline VRT desktop/mobile aggiornata intenzionalmente
- github: nessuna PR aperta trovata per `head:codex/ralph-loop-bootstrap`
