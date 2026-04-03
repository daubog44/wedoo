# Ralph Loop Worklog Policy

Non usare un unico file infinito o un unico file per tutta la giornata.

Il diario operativo del loop deve vivere in file di sessione:

- `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md`

Esempi:

- `docs/worklogs/2026-04-04/0915-landing-page.md`
- `docs/worklogs/2026-04-04/1430-company-wizard-step-1.md`

## Perche questa struttura

- evita file giornalieri troppo lunghi
- separa bene le sessioni o i macro-task
- rende piu facile riprendere il contesto
- mantiene il log leggibile e versionabile

## Regole

- usa un file per sessione o macro-task, non un unico file giornaliero
- se il task continua in un secondo momento, puoi riaprire lo stesso file o crearne uno nuovo con un nuovo orario
- mantieni ogni file corto e leggibile
- se una sessione supera circa 150-200 righe, apri un nuovo file
- `prd.md` resta il backlog; il worklog non lo sostituisce

## Cosa registrare

- timestamp
- task attivo
- `Node ID` se esiste
- file o area toccata
- discovery Figma importanti
- test eseguiti
- problemi trovati
- come sono stati risolti
- decisioni tecniche non banali
- nuovi task aggiunti a `prd.md`
- stato finale della sessione

## Cosa non fare

- non usare il worklog come backlog
- non copiare interi diff
- non annotare ogni minima modifica cosmetica
- non creare file inutili per micro-eventi irrilevanti

## Formato consigliato

```md
# 2026-04-04 09:15 - landing-page

- task: implement landing page
- node: 143:1822
- files: src/pages/public/home-page.tsx, tests/e2e/parity/landing-page.visual.spec.ts
- action: analizzato frame e aggiornati hero, card e VRT
- tests: npm run test:all
- issue: immagini non caricate in tempo nei VRT
- resolution: attesa esplicita del route loader e riallineamento baseline
- note: aggiunto task secondario in prd per sezione FAQ mobile
```
