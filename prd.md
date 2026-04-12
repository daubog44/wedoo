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
- sincronizza `docs/visual-backlog.md` per route attiva, route sospette e audit no-op con capture reali

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
- [x] [TECH][node=n/a][route=n/a][test=scripts/potter-yolo.ps1] Separare readiness e quality gate del Ralph bootstrap, registrando i failure di `npm run test:all` nel worklog senza bloccare l'avvio del loop.

## Audit Design Drift Attuale

- [x] [FRAME][node=660:725][route=/assistenza-clienti][test=tests/e2e/parity/password-recovery-flow.visual.spec.ts] Riaprire e riallineare la route `assistenza clienti` contro il frame Figma desktop `660:725` e l'inferenza mobile `660:1217`, correggendo il canvas desktop oggi troppo basso che clipppa copy e CTA fuori shape nonostante la parity risulti verde.
- [x] [TEST][node=n/a][route=/password-dimenticata,/assistenza-clienti][test=tests/e2e/parity/password-recovery-flow.visual.spec.ts] Investigare e riallineare i failure parity che oggi bloccano il quality gate del bootstrap, coprendo i frame `657:658`, `660:725` e `660:774` e correggendo UI o baseline solo dopo confronto con Figma, capture reali e diff Playwright.
- [x] [FRAME][node=280:1000][route=/registrati/candidato/:stepIndex][test=tests/e2e/wizards/candidate-work-preferences.spec.ts] Implementare `pop up preferenze di lavoro` come step candidato riusabile, introducendo un contratto strutturato per modalita, localita, tipologia di azienda, orari e contratto e rimuovendo gli hardcode corrispondenti dalla preview CV.
- [x] [DATA][node=n/a][route=/registrati/candidato/:stepIndex][test=tests/integration/candidate-onboarding.test.ts] Definire `CandidateOnboardingDraft` per il flow pubblico candidato, coprendo registrazione account, localita, SDG e mansioni prima dei modal profilo.
- [x] [FRAME][node=273:1313][route=/registrati/candidato/1][test=tests/e2e/public/public-routes.spec.ts] Auditare e riallineare il primo step pubblico candidato contro i frame Figma desktop `273:1313` e mobile `234:590`, correggendo layout, campi, consensi e CTA `continua`.
- [x] [FRAME][node=273:1384][route=/registrati/candidato/2][test=tests/e2e/wizards/candidate-preferences.spec.ts] Implementare lo step pubblico candidato `Dicci qualcosa in più` contro i frame Figma desktop `273:1384` e mobile `234:813`, collegandolo al draft candidato e riallineando la sequenza del wizard successivo.
- [x] [TEST][node=273:1313][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-registration-flow.visual.spec.ts] Creare e mantenere una parity desktop/mobile dei due step pubblici candidato quando il flow si stabilizza sul design vivo.
- [x] [TEST][node=n/a][route=*][test=tests/e2e/public/not-found-page.spec.ts] Coprire la route pubblica 404 finche non esiste un frame o export dedicato, verificando messaggio di fallback e CTA di ritorno alla home.
- [x] [TECH][node=n/a][route=/articoli,/podcast][test=n/a] Mappare la source of truth delle route knowledge hub pubbliche `/articoli` e `/podcast`, verificando se esistono frame Figma o export dedicati oppure se la shared page va trattata come route legacy senza parity Figma esplicita.
- [x] [TEST][node=n/a][route=/articoli,/podcast][test=tests/e2e/public/knowledge-hub-page.spec.ts] Coprire le route knowledge hub pubbliche finche non esistono frame Figma dedicati, verificando reachability, hero copy, CTA cross-link e assenza di regressioni shell.
- [x] [FRAME][node=288:1266][route=/portale/candidato/cv][test=tests/e2e/portal/candidate-cv-page.spec.ts] Auditare e riallineare la preview CV candidato contro i frame Figma desktop `288:1266` e mobile `288:1325`, correggendo la `DetailCard` legacy, la shell portale e le CTA `modifica` `carica CV` `attivita`.
- [x] [TEST][node=288:1266][route=/portale/candidato/cv][test=tests/e2e/parity/candidate-cv-page.visual.spec.ts] Creare e mantenere una parity desktop/mobile della preview CV candidato quando il layout si stabilizza sul frame Figma reale.
- [x] [FRAME][node=271:938][route=/portale/azienda/annunci][test=tests/e2e/portal/company-published-jobs-page.spec.ts] Auditare e implementare la vista azienda `visualizza annunci` contro il frame Figma desktop `271:938` e gli export coerenti, correggendo il CTA `visualizza annunci` che oggi non porta ancora alla lista annunci pubblicati.
- [x] [TEST][node=271:938][route=/portale/azienda/annunci][test=tests/e2e/parity/company-published-jobs-page.visual.spec.ts] Creare e mantenere una parity desktop/mobile della vista `visualizza annunci` quando la lista annunci azienda si stabilizza.
- [x] [TECH][node=n/a][route=/portale/azienda/annunci/:jobId][test=n/a] Mappare il frame Figma o gli export vivi della preview annuncio azienda e decidere se la route legacy `/portale/azienda/annunci/:jobId` va riallineata o assorbita dal nuovo shell `/portale/azienda/annunci`.
- [x] [FRAME][node=172:1273][route=/portale/azienda/annunci/:jobId][test=tests/e2e/portal/company-job-page.spec.ts] Riallineare la preview annuncio azienda al frame Figma `Annuncio di Lavoro` desktop `172:1273` e mobile `178:1640`, adattando le CTA recruiter della preview e rimuovendo la shell legacy con navbar.
- [x] [TEST][node=172:1273][route=/portale/azienda/annunci/:jobId][test=tests/e2e/parity/company-job-page.visual.spec.ts] Creare e mantenere una parity desktop/mobile della preview annuncio azienda quando la shell standalone si stabilizza.
- [x] [FRAME][node=185:1738][route=/portale/azienda/annunci][test=tests/e2e/portal/company-jobs-page.spec.ts] Auditare la sezione portale azienda `crea/modifica annuncio` contro il frame Figma desktop `185:1738` e i corrispettivi mobile della pagina `Form di accesso per mobile`, correggendo launcher/lista annunci legacy e navigazione verso preview e bozza.
- [x] [TEST][node=185:1738][route=/portale/azienda/annunci][test=tests/e2e/parity/company-jobs-page.visual.spec.ts] Creare e mantenere una parity desktop/mobile della sezione `crea/modifica annuncio` quando il layout si stabilizza sul frame Figma reale.
- [x] [FRAME][node=181:608][route=/portale/azienda/candidati/:candidateId][test=tests/e2e/portal/company-candidate-page.spec.ts] Auditare e riallineare il detail candidato azienda contro i frame Figma desktop `181:608` e mobile `184:795`, correggendo il pannello mint legacy, la shell detail e le CTA recruiter del profilo.
- [x] [TEST][node=181:608][route=/portale/azienda/candidati/:candidateId][test=tests/e2e/parity/company-candidate-page.visual.spec.ts] Creare e mantenere una parity desktop/mobile del detail candidato azienda quando il layout si stabilizza sul frame Figma reale.
- [x] [FRAME][node=172:1273][route=/portale/candidato/annuncio/:jobId][test=tests/e2e/portal/candidate-job-page.spec.ts] Auditare e riallineare il detail annuncio candidato contro i frame Figma desktop `172:1273` e mobile `178:1640`, correggendo la shell detail legacy, i blocchi contenuto e la resa responsive del CTA di candidatura.
- [x] [TEST][node=172:1273][route=/portale/candidato/annuncio/:jobId][test=tests/e2e/parity/candidate-job-page.visual.spec.ts] Creare e mantenere una parity desktop/mobile del detail annuncio candidato quando il layout si stabilizza sul frame Figma reale.
- [x] [FRAME][node=337:701][route=/registrati/azienda/:stepIndex][test=tests/e2e/wizards/company-registration-wizard.spec.ts] Auditare e riallineare il wizard azienda pubblico contro i frame Figma step 1 `337:701/253:474`, recruiter `153:793/256:458`, dettagli azienda `256:640/256:707`, offerta `258:847/258:956` e sostenibilita `259:1050/259:1162`, correggendo shell legacy, responsive e CTA del flow.
- [x] [TEST][node=337:701][route=/registrati/azienda/:stepIndex][test=tests/e2e/parity/company-registration-wizard.visual.spec.ts] Creare e mantenere una parity desktop/mobile del wizard azienda pubblico sui frame stabili del flow quando il layout e allineato.
- [x] [FRAME][node=n/a][route=/portale/azienda][test=tests/e2e/portal/company-dashboard-page.spec.ts] Auditare la dashboard azienda contro il frame/export Figma `Interfaccia account AZIENDA`, correggendo shell portale, card candidati, profilo azienda laterale e drift desktop/mobile.
- [x] [TEST][node=n/a][route=/portale/azienda][test=tests/e2e/parity/company-dashboard-page.visual.spec.ts] Creare e mantenere una baseline visuale dedicata per la dashboard azienda quando il layout si stabilizza.
- [x] [FRAME][node=159:2896][route=/portale/candidato][test=tests/e2e/portal/candidate-dashboard-page.spec.ts] Auditare la dashboard candidato contro il frame Figma `Interfaccia account CANDIDATO`, verificando shell, navigazione, card profilo/annunci e copertura Playwright dedicata.
- [x] [FRAME][node=n/a][route=/azienda][test=tests/e2e/public/company-showcase-page.spec.ts] Auditare la route showcase azienda contro gli export Figma aggiornati desktop/mobile `Sezione _azienda_*.png`, correggendo shell, carousel condiviso e baseline VRT in modo intenzionale.
- [x] [FRAME][node=n/a][route=/candidato][test=tests/e2e/public/candidate-showcase-page.spec.ts] Auditare la route showcase candidato contro gli export Figma aggiornati desktop/mobile `Sezione _candidato_*.png`, correggendo shell legacy, carousel e baseline VRT in modo intenzionale.
- [x] [FRAME][node=n/a][route=/info][test=tests/e2e/public/info-page.spec.ts] Auditare la route info contro gli export Figma aggiornati desktop/mobile `noi x noi`, `17 obiettivi per il futuro` e `dubbi? le FAQ ti aiutano!`, correggendo layout legacy, shell header/footer e baseline VRT in modo intenzionale.
- [x] [FRAME][node=143:1822][route=/][test=tests/e2e/parity/landing-page.visual.spec.ts] Auditare la landing pubblica contro Figma ed export di sezione aggiornati, correggendo drift desktop/mobile, layout macroscopici e baseline VRT obsolete prima di ulteriori raffinamenti.
- [x] [FRAME][node=658:667][route=/accedi][test=tests/e2e/parity/login-page.visual.spec.ts] Auditare la route login contro Figma ed export aggiornati, riallineando layout desktop/mobile, stato errore e baseline VRT se il design attuale e cambiato.
- [x] [FRAME][node=336:593][route=/registrati][test=tests/e2e/parity/register-page.visual.spec.ts] Auditare la route registrazione pubblica contro i frame Figma aggiornati desktop `336:593` e mobile `336:643`, correggendo eventuali divergenze visuali o strutturali e riallineando la baseline in modo intenzionale.
- [x] [FRAME][node=281:1207][route=/registrati/candidato/:stepIndex][test=tests/e2e/parity/candidate-contacts.visual.spec.ts] Auditare il wizard candidato contro i frame Figma aggiornati, verificando contatti, formazione, esperienze e competenze e correggendo i drift prima di considerare stabili i VRT dei modal step.
- [x] [FRAME][node=258:847][route=/portale/azienda/annunci/nuovo][test=tests/e2e/parity/company-job-draft-step-1.visual.spec.ts] Auditare il wizard annuncio azienda contro i frame Figma aggiornati, correggendo i drift degli step 1 e 2 e mantenendo coerenti UI reale, export rilevanti e baseline VRT.

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

- [x] [FRAME][node=657:658][route=/password-dimenticata][test=tests/e2e/public/password-recovery-flow.spec.ts] Implementare il flow pubblico `password dimenticata` contro i frame Figma desktop `657:658`, mobile `660:774/660:1217` e la schermata collegata `assistenza clienti` `660:725`, collegando la CTA del login oggi non navigabile.
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
- [x] [TEST][node=159:2896][route=/portale/candidato][test=tests/e2e/parity/candidate-dashboard-page.visual.spec.ts] Creare e mantenere una baseline visuale dedicata per la dashboard candidato quando il layout si stabilizza.
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
