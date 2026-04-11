# Wedoo PRD

## Obiettivo Prodotto

Wedoo e una web app prototipale, mobile friendly, pensata come una sorta di LinkedIn per giovani talenti e aziende che offrono lavoro sostenibile, stage e tirocini coerenti con valori ESG e con gli SDG.

Il prototipo deve:

- riflettere con alta fedelta il design Figma
- usare dati mock strutturati come se arrivassero da un backend reale
- restare credibile come base di prodotto futura
- crescere task per task con copertura Playwright e, quando serve, integration test

## Sorgente Di Verita

- Figma file key: `N33nOmzNxMuVBWz3HwPGhC`
- Root node: `0:1`
- URL: [bozza-wedoo--Copy-](https://www.figma.com/design/N33nOmzNxMuVBWz3HwPGhC/bozza-wedoo--Copy-?node-id=0-1&p=f&t=we0vwcclyBGEFSZS-0)

## Regole Di Lettura Del PRD

Ogni task usa tag machine-friendly.

Formato:

`- [ ] [TIPO][node=NODE_ID][route=ROUTE][test=TEST_PATH] Descrizione`

Tipi usati:

- `TECH` per infrastruttura tecnica
- `FRAME` per schermate, frame o modali completi
- `COMP` per componenti riusabili
- `DATA` per contratti mock e servizi dati
- `TEST` per lavoro di test e parity

Regole:

- esegui i task in ordine top-down
- il primo `- [ ]` e il task attivo
- se scopri un prerequisito nuovo, inseriscilo prima del task che dipende da esso
- se scopri un task successivo o opzionale, inseriscilo nella sezione corretta dopo i prerequisiti

## Base Tecnica Completata

- [x] [TECH][node=n/a][route=n/a][test=n/a] Popolare `.codexignore` con esclusioni standard per il progetto React/Vite.
- [x] [TECH][node=n/a][route=n/a][test=tests/e2e/public/public-routes.spec.ts] Integrare Playwright E2E e la config base del progetto.
- [x] [TECH][node=n/a][route=n/a][test=tests/e2e/public/public-routes.spec.ts] Riordinare la suite E2E in cartelle standard `public`, `portal`, `wizards`, `parity`.
- [x] [TECH][node=n/a][route=n/a][test=tests/integration/site-utils.test.ts] Configurare Vitest e Testing Library per integration test mirati.
- [x] [TECH][node=n/a][route=n/a][test=.github/workflows/ci.yml] Creare quality gate unico `npm run test:all` e pipeline CI GitHub Actions.
- [x] [TECH][node=n/a][route=n/a][test=n/a] Definire `AGENTS.md` come istruzione principale del loop e rafforzarlo con policy di test, git e validazione visiva.
- [x] [TECH][node=n/a][route=n/a][test=scripts/loop-ready.mjs] Creare il bootstrap `npm run loop:ready` per verificare prerequisiti del loop e avviare il quality gate.
- [x] [TECH][node=n/a][route=n/a][test=tests/fixtures/public-copy.ts] Creare una cartella `tests/fixtures` per fixture e copy condivisi dei test.
- [x] [TECH][node=n/a][route=/][test=tests/e2e/parity/landing-page.visual.spec.ts] Stabilizzare e mantenere una baseline VRT reale per la landing pubblica su desktop e mobile.
- [x] [TECH][node=n/a][route=n/a][test=scripts/prd-node-report.mjs] Creare un report automatico dei `node ID` tracciati nel PRD e integrarlo nel bootstrap del loop.
- [x] [TECH][node=n/a][route=n/a][test=docs/vrt-policy.md] Definire una policy esplicita su dove salvare le baseline VRT e quando aggiornarle.
- [x] [TECH][node=n/a][route=n/a][test=.github/workflows/ci.yml] Pubblicare in CI gli artifact di Playwright e dei diff visuali.

## Audit Design Drift Attuale

- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/parity/landing-page.visual.spec.ts] Auditare la landing pubblica contro Figma ed export di sezione aggiornati, correggendo drift desktop/mobile, layout macroscopici e baseline VRT obsolete prima di ulteriori raffinamenti.
- [ ] [FRAME][node=658:667][route=/accedi][test=tests/e2e/parity/login-page.visual.spec.ts] Auditare la route login contro Figma ed export aggiornati, riallineando layout desktop/mobile, stato errore e baseline VRT se il design attuale e cambiato.
- [ ] [FRAME][node=658:667][route=/registrati][test=tests/e2e/parity/register-page.visual.spec.ts] Auditare la route registrazione pubblica contro Figma ed export aggiornati, correggendo eventuali divergenze visuali o strutturali e riallineando la baseline in modo intenzionale.
- [ ] [FRAME][node=281:1207][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-contacts.visual.spec.ts] Auditare il wizard candidato contro i frame Figma aggiornati, verificando contatti, formazione, esperienze e competenze e correggendo i drift prima di considerare stabili i VRT dei modal step.
- [ ] [FRAME][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/parity/company-job-draft-step-1.visual.spec.ts] Auditare il wizard annuncio azienda contro i frame Figma aggiornati, correggendo i drift degli step 1 e 2 e mantenendo coerenti UI reale, export rilevanti e baseline VRT.

## Backlog Prioritario

### Fondazioni Dati E Domini

- [x] [DATA][node=n/a][route=n/a][test=tests/integration/public-home-response.test.ts] Definire `PublicHomeResponse` come contratto mock server-like per la landing pubblica.
- [x] [DATA][node=n/a][route=/accedi][test=tests/integration/auth-view-model.test.ts] Definire `AuthViewModel` per login, registrazione e stati errore.
- [x] [DATA][node=n/a][route=/registrati/candidato/:stepIndex][test=tests/integration/candidate-profile-draft.test.ts] Definire `CandidateProfileDraft` con contatti, formazione, esperienze e competenze.
- [x] [DATA][node=n/a][route=/candidato][test=tests/integration/candidate-profile-summary.test.ts] Definire `CandidateProfileSummary` per card e dettaglio profilo.
- [x] [DATA][node=n/a][route=/azienda][test=tests/integration/company-profile-summary.test.ts] Definire `CompanyProfileSummary` per showcase azienda.
- [x] [DATA][node=n/a][route=/portale/azienda/annunci][test=tests/integration/job-draft.test.ts] Definire `JobDraft` per creazione annuncio azienda a step.
- [x] [DATA][node=n/a][route=/portale/candidato/annuncio/:jobId][test=tests/integration/job-listing-detail.test.ts] Definire `JobListing` e `JobDetail` per card annuncio e pagina dettaglio.
- [x] [DATA][node=n/a][route=/articoli][test=tests/integration/content-preview.test.ts] Definire `ArticlePreview` e `PodcastPreview` per hub contenuti.
- [x] [DATA][node=n/a][route=n/a][test=tests/integration/mock-services.test.ts] Creare servizi mock `get*Mock()` o `mock*Service()` per simulare chiamate server in modo consistente.

### Landing Pubblica

- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/parity/landing-page.visual.spec.ts] Auditare e correggere la parity desktop/mobile della landing esistente prima di proseguire con altri raffinamenti della homepage.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Implementare la `Landing Page` come baseline visiva pubblica e riferimento per i token principali.
- [x] [COMP][node=199:591][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre `Button Group` come pattern auth header riusabile.
- [x] [COMP][node=143:1908][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre la CTA download app come variante primaria con icona.
- [x] [COMP][node=144:1944][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre la CTA ruolo candidato come variante secondaria menta.
- [x] [COMP][node=144:1949][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre la CTA ruolo azienda come variante secondaria viola.
- [x] [COMP][node=146:2252][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre la CTA card "scopri" gialla come variante riusabile.
- [x] [COMP][node=222:529][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre la CTA card "scopri" rosa come variante riusabile.
- [x] [COMP][node=222:540][route=/][test=tests/e2e/public/landing-page.spec.ts] Estrarre la CTA card "scopri" lilla come variante riusabile.
- [x] [COMP][node=2:414][route=/][test=tests/e2e/public/landing-page.spec.ts] Mappare l'icona `Smartphone` per la CTA download.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire hero copy, titolo e subtitle della landing.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire la sezione "come funziona".
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire la sezione statement impatto.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire le tre feature card.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire sezione video e placeholder media.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire sezione patrocinio.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Rifinire footer legale e contatti.

### Auth E Stati Errore

- [x] [FRAME][node=658:667][route=/accedi][test=tests/e2e/public/login-page.spec.ts] Implementare il frame `campi mancanti` come stato login con error handling coerente con Figma.
- [x] [COMP][node=658:688][route=/accedi][test=tests/e2e/public/login-page.spec.ts] Estrarre `Checkbox` come base per consensi e toggle form.
- [x] [COMP][node=658:684][route=/accedi][test=tests/e2e/public/login-page.spec.ts] Estrarre `Text Link` come link testuale secondario per auth e form.

### Wizard Candidato

- [x] [FRAME][node=281:1207][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-contacts.spec.ts] Implementare `pop up contatti` come modal o step del profilo candidato.
- [x] [FRAME][node=280:1079][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-education.spec.ts] Implementare `pop up formazione` come modal o step del profilo candidato.
- [x] [FRAME][node=280:860][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-work-experience.spec.ts] Implementare `pop up esperienze lavorative` come modal o step del profilo candidato.
- [x] [FRAME][node=280:951][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-skills.spec.ts] Implementare `pop up competenze` come modal o step del profilo candidato.
- [x] [COMP][node=280:1093][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-education.spec.ts] Estrarre il pattern `Input` select grande come base dei campi a tendina.
- [x] [COMP][node=280:1099][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-education.spec.ts] Estrarre il pattern `Input` select anno come variante select compatta.
- [x] [COMP][node=281:1255][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-contacts.spec.ts] Estrarre il pattern `Input` text field come base dei campi testuali.
- [x] [COMP][node=2:543][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-education.spec.ts] Mappare il componente `Chevron down` per i campi select.

### Wizard Azienda E Creazione Annuncio

- [x] [FRAME][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-1.spec.ts] Implementare `Portale annunci` step geografia e descrizione come primo step di creazione annuncio.
- [x] [FRAME][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-2.spec.ts] Implementare `Portale annunci` step contratto, modalita, SDG e certificazioni come secondo step di creazione annuncio.
- [x] [FRAME][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-2.spec.ts] Allineare lo step `Portale annunci` a selezione multipla SDG coerente con la guida Figma.
- [x] [DATA][node=n/a][route=/portale/azienda/annunci/nuovo][test=tests/integration/mock-services.test.ts] Persistire la bozza `JobDraft` tra step, CTA `bozza` e riapertura della route dedicata.

### Strategia Test E Parity

- [x] [TEST][node=143:1822][route=/][test=tests/e2e/public/landing-page.spec.ts] Sostituire lo smoke generico della landing con un test E2E piu aderente al frame Figma.
- [x] [TEST][node=143:1822][route=/][test=tests/e2e/parity/landing-page.visual.spec.ts] Creare e mantenere la baseline visuale della landing aggiornata e intenzionale man mano che il frame evolve.
- [x] [TEST][node=143:1822][route=/info][test=tests/e2e/parity/info-page.visual.spec.ts] Creare e mantenere una baseline visuale dedicata per la route info quando il layout evolve.
- [x] [TEST][node=143:1822][route=/registrati][test=tests/e2e/parity/register-page.visual.spec.ts] Creare e mantenere una baseline visuale dedicata per la route registrazione quando il layout evolve.
- [x] [TEST][node=658:667][route=/accedi][test=tests/e2e/public/login-page.spec.ts] Coprire i principali stati errore e il consenso del login pubblico.
- [x] [TEST][node=658:667][route=/accedi][test=tests/e2e/parity/login-page.visual.spec.ts] Aggiungere snapshot VRT reali per la route login quando il frame auth si stabilizza.
- [x] [TEST][node=281:1207][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-contacts.spec.ts] Coprire il flow contatti del wizard candidato.
- [x] [TEST][node=281:1207][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-contacts.visual.spec.ts] Aggiungere snapshot VRT reali per il frame contatti quando il flow si stabilizza.
- [x] [TEST][node=280:1079][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-education.spec.ts] Coprire il flow formazione del wizard candidato.
- [x] [TEST][node=280:1079][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-education.visual.spec.ts] Aggiungere snapshot VRT reali per il frame formazione quando il flow si stabilizza.
- [x] [TEST][node=280:860][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-work-experience.spec.ts] Coprire il flow esperienze lavorative del wizard candidato.
- [x] [TEST][node=280:860][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-work-experience.visual.spec.ts] Aggiungere snapshot VRT reali per il frame esperienze quando il flow si stabilizza.
- [x] [TEST][node=280:951][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-skills.spec.ts] Coprire il flow competenze del wizard candidato.
- [x] [TEST][node=280:951][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-skills.visual.spec.ts] Aggiungere snapshot VRT reali per il frame competenze quando il flow si stabilizza.
- [x] [TEST][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-1.spec.ts] Coprire il primo step del wizard annuncio azienda.
- [x] [TEST][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/parity/company-job-draft-step-1.visual.spec.ts] Aggiungere snapshot VRT reali per il primo step annuncio azienda quando il flow si stabilizza.
- [x] [TEST][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-2.spec.ts] Coprire il secondo step del wizard annuncio azienda.
- [x] [TEST][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/parity/company-job-draft-step-2.visual.spec.ts] Aggiungere snapshot VRT reali per il secondo step annuncio azienda quando il flow si stabilizza.
- [x] [TEST][node=259:1050][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-2.spec.ts] Estendere il flow del secondo step a selezione multipla SDG e CTA `cancella` `bozza` `invia`.
- [x] [TEST][node=n/a][route=/portale/azienda/annunci/nuovo][test=tests/e2e/portal/company-job-draft-step-2.spec.ts] Coprire il resume della bozza `JobDraft` dopo il salvataggio e la riapertura del wizard azienda.
- [x] [TEST][node=n/a][route=n/a][test=tests/e2e/parity/figma-backlog.spec.ts] Ridurre progressivamente il backlog `fixme` di parity Figma man mano che le schermate vengono implementate.

## Regola Operativa

Per ogni task UI:

1. leggi il task in questo file
2. usa Figma MCP sul `node` esatto
3. implementa seguendo i pattern del repo
4. popola con dati mock server-like
5. aggiorna o crea il test indicato in `test`
6. esegui review e validazione visiva
7. marca il task come completato solo quando i test passano
