# 2026-04-09 06:00 - company-job-draft-reverification

- task: reverifica finale post-closeout wizard annuncio azienda
- node: 258:847, 259:1050
- viewport: desktop (frame Figma 1440px), con controllo responsive mobile
- files: src/components/portal/company-job-draft-fields.tsx, src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, src/pages/portal/company-job-draft-page.tsx, tests/e2e/portal/company-job-draft-step-*.spec.ts, tests/e2e/parity/company-job-draft-step-*.visual.spec.ts, tmp/manual-audit/results.json
- action: riletti metadata, design context e screenshot Figma dei frame `258:847` e `259:1050`; riletta anche l'implementazione corrente e il diff storico dal commit base `1232695e80906eeb42cf0d57151710e9f8b3ab77`
- tests: `CI=1 WEDOO_DEV_PORT=4722 npm run test:all`; audit Playwright fuori suite su `4724` con screenshot `tmp/manual-audit/*.png` e metriche salvate in `tmp/manual-audit/results.json`
- note: nessuna modifica al codice del prodotto; il quality gate completo resta verde (`33` integration, `50` Playwright)
- note: verifica GitHub aggiornata su `daubog44/wedoo`: il branch `origin/codex/ralph-loop-bootstrap` non ha PR aperte, quindi per l'HEAD corrente non esiste una CI remota piu recente del gate locale
- resolution: nessun gap nuovo emerso. I frame desktop restano coerenti con Figma (`h1` step1 `x=103 y=51`, step2 `x=149 y=162`), il footer resta assente, `scrollWidth == clientWidth` su desktop `1440` e mobile `412`, e il mobile hero mantiene il titolo separato dall'area immagine su entrambi gli step (`heading.right=216 < media.left=236`)
