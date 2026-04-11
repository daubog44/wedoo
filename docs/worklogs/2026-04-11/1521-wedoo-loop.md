# 2026-04-11 15:21 - wedoo-loop

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- timestamp: 2026-04-11 15:32
- task: audit landing pubblica contro Figma/export/VRT
- node: 143:1822
- viewport: pending discovery
- files: prd.md, src/components/public/home/**, tests/e2e/public/landing-page.spec.ts, tests/e2e/parity/landing-page.visual.spec.ts
- action: riallineato tracker operativo e avviata discovery del primo task aperto del PRD sulla route `/`
- tests: pending
- note: audit iniziale richiesto prima di eventuali raffinamenti o update baseline

- timestamp: 2026-04-11 15:42
- task: audit landing pubblica contro Figma/export/VRT
- node: 143:1822
- viewport: desktop
- files: prd.md, docs/worklogs/2026-04-11/1521-wedoo-loop.md, .codexpotter/kb/public-home.md
- action: verificato frame Figma `143:1822` (1440x3109), baseline VRT desktop/mobile, capture reale `artifacts/loop-captures/2026-04-11/1524-landing-audit-before` ed export di sezione coerenti; nessun drift macroscopico nuovo rilevato, nessuna baseline da aggiornare
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`; `npm run test:e2e -- tests/e2e/parity/landing-page.visual.spec.ts`
- note: nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`; audit chiuso senza cambi di codice UI

- timestamp: 2026-04-11 16:02
- task: audit login pubblica contro Figma/export/VRT
- node: 658:667
- viewport: pending discovery
- files: src/pages/public/login-page.tsx, tests/e2e/public/login-page.spec.ts, tests/e2e/parity/login-page.visual.spec.ts, prd.md
- action: riaperto il loop sul primo task aperto del PRD per la route `/accedi`; allineato il tracker locale e avviata la lettura del codice auth esistente prima della discovery Figma
- tests: pending
- note: verificare prima se il design vivo conferma il frame `campi mancanti` o introduce drift/stati mancanti

- timestamp: 2026-04-11 16:47
- task: audit login pubblica contro Figma/export/VRT
- node: 658:667
- viewport: desktop
- files: src/data/auth.ts, tests/integration/auth-view-model.test.ts, tests/e2e/public/login-page.spec.ts, __screenshots__/chromium-desktop/parity/login-page.visual.spec.ts/login-page.png, prd.md, .codexpotter/kb/auth-flow.md
- action: discovery Figma `658:667` confermata sul frame desktop `1440x1024`; rilevato drift minimo nel prompt finale del login (`non hai già un account?` vs `non hai un account?` del design vivo), corretti i copy auth, estesa la copertura test e riallineata solo la baseline VRT desktop del login
- tests: `npx vitest run tests/integration/auth-view-model.test.ts`; `npx playwright test tests/e2e/public/login-page.spec.ts`; `npx playwright test tests/e2e/parity/login-page.visual.spec.ts`; `npx playwright test tests/e2e/parity/login-page.visual.spec.ts --update-snapshots`; `npm run test:all`
- note: Playwright MCP non ha aperto Chrome per errore di launch, quindi audit visuale fatto via `npm run loop:capture -- /accedi login-audit-before` e `npm run loop:capture -- /accedi login-audit-after`; nessuna PR aperta sul branch corrente

- timestamp: 2026-04-11 16:50
- task: audit registrazione pubblica contro Figma/export/VRT
- node: 658:667 (da verificare contro il frame reale della route `/registrati`)
- viewport: pending discovery
- files: src/pages/public/role-choice-page.tsx, tests/e2e/parity/register-page.visual.spec.ts, prd.md
- action: aperto il task successivo del PRD dopo commit dedicato al login; in corso verifica del mapping tra route `/registrati`, baseline attuale e node ID Figma tracciato
- tests: pending
- note: possibile backlog stantio se il node `658:667` non descrive davvero la route registrazione pubblica

- timestamp: 2026-04-11 16:58
- task: audit registrazione pubblica contro Figma/export/VRT
- node: desktop `336:593`, mobile `336:643`
- viewport: desktop + mobile
- files: prd.md, src/pages/public/role-choice-page.tsx, tests/e2e/parity/register-page.visual.spec.ts
- action: discovery Figma via `use_figma` ha corretto il mapping del PRD: la route `/registrati` corrisponde ai frame `Form di accesso per pc` `336:593` e `Form di accesso per mobile` `336:643`, non al login `658:667`
- tests: pending
- note: la route corrente e la baseline `register-page` vanno rivalutate contro questi frame, perche il design vivo mostra una role choice minimal senza footer nel canvas e con copy/CTA diversi

- timestamp: 2026-04-11 17:06
- task: audit registrazione pubblica contro Figma/export/VRT
- node: desktop `336:593`, mobile `336:643`
- viewport: desktop + mobile
- files: src/pages/public/role-choice-page.tsx, tests/e2e/public/public-routes.spec.ts, tests/e2e/parity/register-page.visual.spec.ts, tests/fixtures/public-copy.ts, __screenshots__/chromium-desktop/parity/register-page.visual.spec.ts/register-page.png, __screenshots__/chromium-mobile/parity/register-page.visual.spec.ts/register-page.png, prd.md, .codexpotter/kb/register-choice.md
- action: sostituita la role choice legacy con una composizione dedicata aderente ai frame Figma desktop/mobile, corretto il VRT per fotografare solo il canvas del frame invece del full page legacy e riallineate le baseline desktop/mobile
- tests: `npx playwright test tests/e2e/public/public-routes.spec.ts`; `npx playwright test tests/e2e/parity/register-page.visual.spec.ts`; `npx playwright test tests/e2e/parity/register-page.visual.spec.ts --update-snapshots`; `npm run test:all`
- note: capture di audit `artifacts/loop-captures/2026-04-11/1554-register-audit-before` e `artifacts/loop-captures/2026-04-11/1600-register-audit-after`; nessuna PR aperta sul branch corrente

- timestamp: 2026-04-11 17:10
- task: audit wizard candidato contro Figma/export/VRT
- node: `281:1207`, `280:1079`, `280:860`, `280:951`
- viewport: pending discovery
- files: src/pages/public/candidate-wizard-page.tsx, src/components/public/candidate-*.tsx, tests/e2e/wizards/*.spec.ts, tests/e2e/parity/candidate-*.visual.spec.ts
- action: aperto il task successivo del PRD dopo commit dedicato alla register page; in corso rilettura del modulo wizard candidato e delle baseline parity prima della discovery Figma aggiornata
- tests: pending
- note: verificare se i VRT verdi attuali riflettono ancora i frame Figma dei modal step o stanno congelando drift piu recenti

- timestamp: 2026-04-11 17:19
- task: audit wizard candidato contro Figma/export/VRT
- node: `281:1207`, `280:1079`, `280:860`, `280:951`
- viewport: desktop + mobile
- files: src/components/public/candidate-contacts-step.tsx, src/components/public/candidate-education-step.tsx, src/components/public/candidate-work-experience-step.tsx, src/components/public/candidate-skills-step.tsx, src/components/public/candidate-wizard-fields.tsx, src/components/public/candidate-wizard-step-frame.tsx, tests/e2e/parity/candidate-*.visual.spec.ts
- action: discovery Figma confermata sui quattro modal `650px`; rilevato che i VRT precedenti congelavano il pannello menta/full page invece del frame reale e che su mobile il riepilogo contatti poteva tracimare. Estratto un wrapper condiviso `CandidateWizardStepFrame`, riallineati bordo grigio, canvas interno e tipografia responsive del wizard
- tests: `npx playwright test tests/e2e/parity/candidate-contacts.visual.spec.ts tests/e2e/parity/candidate-education.visual.spec.ts tests/e2e/parity/candidate-work-experience.visual.spec.ts tests/e2e/parity/candidate-skills.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/wizards/candidate-contacts.spec.ts tests/e2e/wizards/candidate-education.spec.ts tests/e2e/wizards/candidate-work-experience.spec.ts tests/e2e/wizards/candidate-skills.spec.ts`
- note: capture finali `artifacts/loop-captures/2026-04-11/1625-candidate-contacts-audit-after`, `1625-candidate-education-audit-after`, `1626-candidate-work-experience-audit-after`, `1626-candidate-skills-audit-after`

- timestamp: 2026-04-11 17:29
- task: audit wizard candidato contro Figma/export/VRT
- node: `281:1207`, `280:1079`, `280:860`, `280:951`
- viewport: desktop + mobile
- files: prd.md, docs/worklogs/2026-04-11/1521-wedoo-loop.md, .codexpotter/kb/candidate-wizard.md
- action: audit chiuso con parity e flow dei quattro modal riallineati al frame Figma; confermata assenza di PR aperte sul branch `codex/ralph-loop-bootstrap` verso `daubog44/wedoo`
- tests: `npm run test:all`
- note: le baseline parity ora fotografano il frame modal candidato invece del full page legacy

- timestamp: 2026-04-11 17:33
- task: audit wizard annuncio azienda contro Figma/export/VRT
- node: `258:847`, `259:1050`
- viewport: desktop + mobile
- files: src/pages/portal/company-job-draft-page.tsx, src/components/portal/company-job-draft-step-one.tsx, src/components/portal/company-job-draft-step-two.tsx, tests/e2e/portal/company-job-draft-step-1.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts, tests/e2e/parity/company-job-draft-step-1.visual.spec.ts, tests/e2e/parity/company-job-draft-step-2.visual.spec.ts
- action: riaperto il task finale del backlog e verificati metadata/screenshot/design context Figma dei frame `258:847` e `259:1050`; controllo visuale del browser reale conferma che layout, shell senza footer, hero desktop/mobile, pannelli form e help copy restano coerenti con il design vivo senza introdurre nuovi drift
- tests: `npm run loop:capture -- /portale/azienda/annunci/nuovo company-job-draft-step-1-audit-before`; `npm run loop:capture -- "/portale/azienda/annunci/nuovo?step=2" company-job-draft-step-2-audit-before`; `npx playwright test tests/e2e/parity/company-job-draft-step-1.visual.spec.ts tests/e2e/parity/company-job-draft-step-2.visual.spec.ts tests/e2e/portal/company-job-draft-step-1.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts`
- note: nessuna PR aperta sul branch `codex/ralph-loop-bootstrap` verso `daubog44/wedoo`; audit chiuso come no-op intenzionale perche VRT, UI reale e Figma sono allineati

- timestamp: 2026-04-11 17:47
- task: audit route info contro export Figma/VRT
- node: n/a (export `noi x noi`, `17 obiettivi per il futuro`, `dubbi? le FAQ ti aiutano!`)
- viewport: desktop + mobile
- files: prd.md, src/pages/public/info-page.tsx, src/components/site/faq-board.tsx, tests/e2e/public/info-page.spec.ts, tests/e2e/parity/info-page.visual.spec.ts
- action: review stretta post-backlog completato ha individuato `/info` come gap residuo: baseline parity legacy e pagina reale non corrispondono agli export Figma aggiornati; avviato riallineamento del task e raccolto il confronto visivo iniziale
- tests: `npm run loop:capture -- /info info-page-audit-before` (fallito per `Execution context was destroyed` durante la navigazione interna dello script); confronto manuale tra export di sezione e baseline `__screenshots__/chromium-*/parity/info-page.visual.spec.ts/info-page.png`
- note: la route usa ancora il vecchio stack `components/site` con footer e immagini non presenti nel design vivo; serve riscrittura dedicata con shell minimale

- timestamp: 2026-04-11 17:58
- task: audit route info contro export Figma/VRT
- node: n/a (export `noi x noi`, `17 obiettivi per il futuro`, `dubbi? le FAQ ti aiutano!`)
- viewport: desktop + mobile
- files: src/data/info-page.ts, src/components/public/info-sections.tsx, src/components/site/faq-board.tsx, src/data/core.ts, src/pages/public/info-page.tsx, src/styles/wedoo.css, tests/e2e/public/info-page.spec.ts, tests/fixtures/public-copy.ts, __screenshots__/chromium-desktop/parity/info-page.visual.spec.ts/info-page.png, __screenshots__/chromium-mobile/parity/info-page.visual.spec.ts/info-page.png, prd.md, .codexpotter/kb/info-page.md
- action: sostituita la pagina info legacy con una composizione dedicata desktop/mobile aderente agli export attuali, rimosso il footer dal frame reale, introdotto il contratto `infoPageResponseMock`, riallineato il pattern FAQ e rigenerate le baseline parity desktop/mobile
- tests: `npm run lint`; `npm run typecheck`; `npx playwright test tests/e2e/public/info-page.spec.ts tests/e2e/public/public-routes.spec.ts`; `npx playwright test tests/e2e/parity/info-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/info-page.visual.spec.ts`; `npm run test:all`
- note: nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`; per l'audit visuale finale sono stati usati gli export PNG e le baseline rigenerate perche `loop:capture` resta instabile su `/info`

- timestamp: 2026-04-11 18:06
- task: audit showcase candidato contro export Figma/VRT
- node: n/a (export `Sezione _candidato_*.png`)
- viewport: pending discovery
- files: src/pages/public/candidate-showcase-page.tsx, src/components/site/showcase-carousel.tsx, src/data/showcases.ts, tests/e2e/public/candidate-showcase-page.spec.ts, tests/e2e/parity/candidate-showcase-page.visual.spec.ts, prd.md
- action: review successiva dopo il commit di `/info` ha identificato la route `/candidato` come prossimo gap pubblico con export Figma disponibili ma shell ancora legacy (`TopLogoBar` + `SiteFooter`) e senza parity/E2E dedicate
- tests: pending
- note: gli asset export `Sezione _candidato_*.png` indicano un carousel multi-slide con top bar minimale; va verificato se il codice attuale sta solo riusando uno showcase generico fuori parity

- timestamp: 2026-04-11 18:25
- task: audit showcase candidato contro export Figma/VRT
- node: n/a (export `Sezione _candidato_*.png`)
- viewport: desktop + mobile
- files: src/components/site/showcase-carousel.tsx, src/pages/public/candidate-showcase-page.tsx, src/pages/public/company-showcase-page.tsx, tests/e2e/public/candidate-showcase-page.spec.ts, tests/e2e/parity/candidate-showcase-page.visual.spec.ts, tests/fixtures/public-copy.ts, __screenshots__/chromium-desktop/parity/candidate-showcase-page.visual.spec.ts/candidate-showcase-page.png, __screenshots__/chromium-mobile/parity/candidate-showcase-page.visual.spec.ts/candidate-showcase-page.png, prd.md, .codexpotter/kb/candidate-showcase.md
- action: riallineata la route `/candidato` agli export desktop/mobile con shell minima interna al carousel, frecce e dots coerenti, CTA `registrati` confinata all'ultimo slide desktop e rimozione del footer legacy dal frame reale; aggiunte copertura E2E/parity dedicate e baseline VRT rigenerate dopo confronto con gli export e capture reali `artifacts/loop-captures/2026-04-11-candidate-showcase`
- tests: `npm run lint`; `npm run typecheck`; `npx playwright test tests/e2e/public/candidate-showcase-page.spec.ts`; `npx playwright test tests/e2e/parity/candidate-showcase-page.visual.spec.ts`; `npx playwright test tests/e2e/parity/candidate-showcase-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/public/public-routes.spec.ts`; `npm run test:all`
- note: `ShowcaseCarousel` resta condiviso con `/azienda`, quindi il prossimo audit deve verificare esplicitamente gli export `Sezione _azienda_*.png` e non assumere che la nuova shell candidata basti anche per il percorso azienda

- timestamp: 2026-04-11 18:26
- task: audit showcase azienda contro export Figma/VRT
- node: n/a (export `Sezione _azienda_*.png`)
- viewport: pending discovery
- files: src/pages/public/company-showcase-page.tsx, src/components/site/showcase-carousel.tsx, tests/e2e/public/company-showcase-page.spec.ts, tests/e2e/parity
- action: aperto il task successivo dopo la chiusura di `/candidato`; la route `/azienda` usa lo stesso carousel condiviso ma non ha ancora audit dedicato contro gli export desktop/mobile aggiornati
- tests: pending
- note: verificare prima la shell reale e l'eventuale drift specifico di copy, CTA finale e navigazione rispetto agli export `Sezione _azienda_*.png`

- timestamp: 2026-04-11 18:40
- task: audit showcase azienda contro export Figma/VRT
- node: n/a (export `Sezione _azienda_*.png`)
- viewport: desktop + mobile
- files: src/components/site/showcase-carousel.tsx, tests/fixtures/public-copy.ts, tests/e2e/public/company-showcase-page.spec.ts, tests/e2e/parity/company-showcase-page.visual.spec.ts, __screenshots__/chromium-desktop/parity/company-showcase-page.visual.spec.ts/company-showcase-page.png, __screenshots__/chromium-mobile/parity/company-showcase-page.visual.spec.ts/company-showcase-page.png, __screenshots__/chromium-mobile/parity/candidate-showcase-page.visual.spec.ts/candidate-showcase-page.png, prd.md, .codexpotter/kb/company-showcase.md
- action: verificati export desktop `Sezione _azienda_-6/-11.png` e mobile `Sezione _azienda_.png`, riallineato il carousel condiviso con titolo responsive per il percorso azienda e bubble mobile piu vicina al design vivo, aggiunte copertura E2E/parity dedicate per `/azienda` e rigenerate le baseline VRT di `/azienda` piu la baseline mobile di `/candidato` resa piu fedele dopo l'update shared
- tests: `npm run lint`; `npm run typecheck`; `npx playwright test tests/e2e/public/candidate-showcase-page.spec.ts tests/e2e/public/company-showcase-page.spec.ts tests/e2e/parity/candidate-showcase-page.visual.spec.ts tests/e2e/parity/company-showcase-page.visual.spec.ts`; `npx playwright test tests/e2e/parity/candidate-showcase-page.visual.spec.ts tests/e2e/parity/company-showcase-page.visual.spec.ts --update-snapshots`; `npm run test:all`
- note: capture di review `artifacts/loop-captures/2026-04-11-company-showcase` e `artifacts/loop-captures/2026-04-11-candidate-showcase`; lo stato finale con CTA desktop e confermato contro l'export `Sezione _azienda_-11.png`

- timestamp: 2026-04-11 18:41
- task: audit knowledge hub pubblico contro design vivo
- node: n/a
- viewport: pending discovery
- files: src/components/public/knowledge-hub-page.tsx, src/pages/public/articles-page.tsx, src/pages/public/podcasts-page.tsx, tests/e2e/public/knowledge-hub-page.spec.ts, tests/e2e/parity
- action: aperto il task successivo dopo la chiusura di `/azienda`; la shared page `KnowledgeHubPage` alimenta sia `/articoli` sia `/podcast` ma non ha ancora audit Figma-first ne copertura E2E dedicata
- tests: pending
- note: verificare prima se esistono frame/export contenuti coerenti e se la route reale usa ancora una shell legacy non allineata al design vivo

- timestamp: 2026-04-11 18:46
- task: discovery next audit dopo showcase pubblici
- node: `0:1` -> `159:2896`
- viewport: pending discovery
- files: prd.md, docs/worklogs/2026-04-11/1521-wedoo-loop.md
- action: verificato via Figma MCP che non esistono frame pubblici dedicati a `/articoli` o `/podcast`; le uniche occorrenze `Articoli`/`Podcast` stanno dentro `Interfaccia account CANDIDATO` e `Interfaccia account AZIENDA`. Reindirizzato quindi il prossimo audit al primo frame reale disponibile `159:2896`
- tests: pending
- note: la knowledge hub pubblica resta una route legacy senza sorgente Figma esplicita; non va riallineata per supposizione finche non esiste un frame dedicato

- timestamp: 2026-04-11 18:47
- task: audit dashboard candidato contro Figma/VRT
- node: `159:2896`
- viewport: pending discovery
- files: src/pages/portal/candidate-dashboard-page.tsx, src/components/portal, tests/e2e/portal/candidate-dashboard-page.spec.ts, tests/e2e/parity
- action: aperto il task successivo sul primo frame Figma reale rimasto non auditato dopo le route pubbliche showcase
- tests: pending
- note: prima verificare metadata/design context del frame `Interfaccia account CANDIDATO`, la route reale `/portale/candidato` e l'eventuale assenza di copertura Playwright dedicata

- timestamp: 2026-04-11 18:52
- task: audit dashboard candidato contro Figma/VRT
- node: `159:2896`
- viewport: desktop
- files: src/pages/portal/candidate-dashboard-page.tsx, src/components/layout/portal-layout.tsx, src/components/site/portal-navbar.tsx, src/components/site/portal-cards.tsx, src/data/jobs.ts, artifacts/loop-captures/2026-04-11/1748-candidate-dashboard-audit-before
- action: discovery Figma completata sul frame desktop `1440x1119`; confermato drift macroscopico della shell reale rispetto al design vivo: footer legacy, 5 card, toolbar separata e assenza del profilo laterale. Capture iniziale salvato in `artifacts/loop-captures/2026-04-11/1748-candidate-dashboard-audit-before`
- tests: `npm run loop:capture -- /portale/candidato candidate-dashboard-audit-before`
- note: i testi lunghi visibili nel frame sono annotazioni Figma e non UI di prodotto; il layout utile da implementare resta top bar, 4 card annunci e profilo laterale minimale

- timestamp: 2026-04-11 19:10
- task: audit dashboard candidato contro Figma/VRT
- node: `159:2896`
- viewport: desktop + mobile
- files: src/data/candidate-dashboard.ts, src/data/mock-services.ts, src/data/site-content.ts, src/data/types.ts, src/components/layout/portal-layout.tsx, src/components/site/portal-navbar.tsx, src/components/portal/candidate-dashboard-job-card.tsx, src/components/portal/candidate-dashboard-profile-rail.tsx, src/pages/portal/candidate-dashboard-page.tsx, tests/fixtures/portal-copy.ts, tests/integration/candidate-dashboard-response.test.ts, tests/integration/mock-services.test.ts, tests/e2e/portal/candidate-dashboard-page.spec.ts, tests/e2e/parity/candidate-dashboard-page.visual.spec.ts, __screenshots__/chromium-desktop/parity/candidate-dashboard-page.visual.spec.ts/candidate-dashboard-page.png, __screenshots__/chromium-mobile/parity/candidate-dashboard-page.visual.spec.ts/candidate-dashboard-page.png, prd.md, .codexpotter/kb/candidate-dashboard.md, .codexpotter/kb/README.md
- action: introdotto `CandidateDashboardResponse` server-like per il frame candidato, rimossa la shell legacy dal portale, riallineata la top bar candidato al frame desktop, costruite 4 card dedicate + profilo laterale, aggiunte copertura E2E e parity dedicate e verificata la UI reale con capture finale `artifacts/loop-captures/2026-04-11/1809-candidate-dashboard-audit-final`
- tests: `npm run lint`; `npm run typecheck`; `npx vitest run tests/integration/candidate-dashboard-response.test.ts tests/integration/mock-services.test.ts`; `npx playwright test tests/e2e/portal/candidate-dashboard-page.spec.ts`; `npx playwright test tests/e2e/parity/candidate-dashboard-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/candidate-dashboard-page.visual.spec.ts`; `npm run loop:capture -- /portale/candidato candidate-dashboard-audit-final`; `npm run test:all`
- note: nessuna PR aperta sul branch remoto `codex/ralph-loop-bootstrap`; `search_pull_requests` su `daubog44/wedoo` restituisce `0` risultati aperti per l'head corrente

- timestamp: 2026-04-11 19:22
- task: audit dashboard azienda contro export/Figma `Interfaccia account AZIENDA`
- node: n/a (frame export `Interfaccia account AZIENDA.png`)
- viewport: desktop come riferimento principale, mobile derivato dagli export `Sezione _candidati di interesse_*.png`
- files: prd.md, src/pages/portal/company-dashboard-page.tsx, src/components/site/portal-navbar.tsx, src/components/portal/**, tests/e2e/portal, tests/e2e/parity
- action: riaperto il backlog dopo la review del portale; gli export azienda mostrano una shell moderna con top bar viola, 4 card candidati e identita azienda laterale mentre la route reale usa ancora `BoardToolbar` legacy. `loop:capture` su `/portale/azienda` fallisce per `Execution context was destroyed`, quindi il confronto iniziale usa export Figma, codice attuale e successiva verifica Playwright dedicata
- tests: `npm run loop:assets`; `npm run loop:capture -- /portale/azienda company-dashboard-audit-before` (fallito per navigation context destroyed)
- note: task promosso in cima al PRD perche il backlog era vuoto ma la route portale azienda non era ancora stata auditata

- timestamp: 2026-04-11 19:38
- task: audit dashboard azienda contro export/Figma `Interfaccia account AZIENDA`
- node: n/a (frame export `Interfaccia account AZIENDA.png`)
- viewport: desktop + mobile
- files: src/data/company-dashboard.ts, src/data/mock-services.ts, src/data/site-content.ts, src/data/types.ts, src/components/site/portal-navbar.tsx, src/components/site/site-icon.tsx, src/components/portal/company-dashboard-candidate-card.tsx, src/components/portal/company-dashboard-profile-rail.tsx, src/pages/portal/company-dashboard-page.tsx, tests/fixtures/portal-copy.ts, tests/integration/company-dashboard-response.test.ts, tests/integration/mock-services.test.ts, tests/e2e/portal/company-dashboard-page.spec.ts, tests/e2e/parity/company-dashboard-page.visual.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts, __screenshots__/chromium-*/parity/company-dashboard-page.visual.spec.ts/company-dashboard-page.png, __screenshots__/chromium-*/parity/candidate-dashboard-page.visual.spec.ts/candidate-dashboard-page.png, prd.md, .codexpotter/kb/company-dashboard.md, .codexpotter/kb/README.md
- action: sostituita la dashboard azienda legacy con shell Figma-first su contratto `CompanyDashboardResponse`, introdotte 4 card candidati e rail identita azienda, riallineata la navbar company al top bar viola del design vivo e corretto globalmente `SiteIcon.filter` da glyph menu a funnel reale; estesi i test del wizard annunci che dipendevano ancora dal vecchio copy `bacheca candidati`
- tests: `npm run lint`; `npm run typecheck`; `npx vitest run tests/integration/company-dashboard-response.test.ts tests/integration/mock-services.test.ts`; `npx playwright test tests/e2e/portal/company-dashboard-page.spec.ts`; `npx playwright test tests/e2e/parity/company-dashboard-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/candidate-dashboard-page.visual.spec.ts tests/e2e/parity/company-dashboard-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/candidate-dashboard-page.visual.spec.ts tests/e2e/parity/company-dashboard-page.visual.spec.ts`; `npx playwright test tests/e2e/portal/candidate-dashboard-page.spec.ts tests/e2e/portal/company-dashboard-page.spec.ts`; `npx playwright test tests/e2e/portal/company-job-draft-step-2.spec.ts`; `npm run test:all`
- note: nessuna PR aperta sul branch `codex/ralph-loop-bootstrap` verso `daubog44/wedoo` (`search_pull_requests` = `0`); review visuale finale fatta su baseline parity desktop/mobile perche `loop:capture` resta instabile sulla route

- timestamp: 2026-04-11 19:52
- task: audit wizard azienda pubblico contro Figma/VRT
- node: step 1 `337:701/253:474`, recruiter `153:793/256:458`, dettagli azienda `256:640/256:707`, offerta `258:847/258:956`, sostenibilita `259:1050/259:1162`
- viewport: desktop + mobile
- files: prd.md, src/pages/public/company-wizard-page.tsx, src/data/forms.ts, src/data/auth.ts, src/data/job-draft.ts, tests/e2e/wizards, tests/e2e/parity
- action: review post-backlog completato ha individuato `/registrati/azienda/:stepIndex` come flow ancora fuori PRD ma tracciato in router; discovery Figma ha confermato tutti i frame desktop/mobile del wizard e ha mostrato che la route reale usa ancora `BackdropPageShell` legacy con footer, senza parity o E2E dedicati
- tests: pending
- note: il frame desktop `338:772` / mobile `338:796` `pagina "sei un'azienda?"` e stato trovato durante la discovery ma non e collegato a una route esplicita; da trattare come eventuale backlog separato solo se emerge un entry point reale

- timestamp: 2026-04-11 19:34
- task: audit wizard azienda pubblico contro Figma/VRT
- node: step 1 `337:701/253:474`, recruiter `153:793/256:458`, dettagli azienda `256:640/256:707`, offerta `258:847/258:956`, sostenibilita `259:1050/259:1162`
- viewport: desktop + mobile
- files: src/pages/public/company-wizard-page.tsx, src/components/public/company-*.tsx, src/data/company-onboarding.ts, src/data/auth.ts, tests/e2e/wizards/company-registration-wizard.spec.ts, tests/e2e/parity/company-registration-wizard.visual.spec.ts, tests/e2e/public/public-routes.spec.ts, tests/integration/company-onboarding.test.ts, tests/integration/auth-view-model.test.ts, tests/fixtures/public-copy.ts, prd.md, .codexpotter/kb/company-registration-wizard.md
- action: rimossa la shell auth legacy dal flow `/registrati/azienda/:stepIndex`, separati i cinque step su primitive dedicate e contratto tipizzato `CompanyRegistrationDraft`/`JobDraft`, allineati copy e campi del primo step al Figma vivo (`partita IVA`, `ragione sociale`, `e-mail`, `numero di telefono`, privacy) e aggiunte coperture E2E/parity dedicate piu il controllo di reachability dal role choice pubblico
- tests: `npm run typecheck`; `npm run lint`; `npx vitest run tests/integration/auth-view-model.test.ts tests/integration/company-onboarding.test.ts`; `npx playwright test tests/e2e/wizards/company-registration-wizard.spec.ts`; `npx playwright test tests/e2e/parity/company-registration-wizard.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/company-registration-wizard.visual.spec.ts`; `npx playwright test tests/e2e/public/public-routes.spec.ts`; `npm run test:all`
- note: audit visuale finale confermato con capture `artifacts/loop-captures/2026-04-11/1923-company-registration-step-1-after` e `artifacts/loop-captures/2026-04-11/1923-company-registration-step-5-after`; nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`

- timestamp: 2026-04-11 19:35
- task: audit detail annuncio candidato contro Figma/VRT
- node: desktop `172:1273`, mobile `178:1640`
- viewport: pending discovery
- files: prd.md, src/pages/portal/candidate-job-page.tsx, src/data/jobs.ts, tests/e2e/portal, tests/e2e/parity
- action: review globale delle route residue ha promosso `/portale/candidato/annuncio/:jobId` a prossimo audit: Figma espone frame desktop/mobile espliciti `Annuncio di Lavoro`, mentre la route reale usa ancora una `DetailCard` legacy senza task PRD o parity dedicata
- tests: pending
- note: i detail page portale rimanenti condividono pattern legacy, ma il candidato detail e il primo con match diretto sia nel router sia nel naming Figma

- timestamp: 2026-04-11 19:58
- task: audit detail annuncio candidato contro Figma/VRT
- node: desktop `172:1273`, mobile `178:1640`
- viewport: desktop + mobile
- files: src/components/layout/portal-layout.tsx, src/data/types.ts, src/data/jobs.ts, src/data/candidate-job-detail.ts, src/components/portal/candidate-job-detail-view.tsx, src/pages/portal/candidate-job-page.tsx, tests/integration/job-listing-detail.test.ts, tests/integration/candidate-job-detail-response.test.ts, tests/e2e/portal/candidate-job-page.spec.ts, tests/e2e/parity/candidate-job-page.visual.spec.ts, tests/fixtures/portal-copy.ts, prd.md, .codexpotter/kb/candidate-job-detail.md
- action: nascosta la `PortalNavbar` legacy sulla route detail, introdotta `CandidateJobDetailResponse` con meta presentazionale dedicata e riscritta la pagina su shell Figma-first desktop/mobile con pannello lilla, editor box, note sostenibilita, CTA finali e mobile dock dedicata
- tests: `npx tsc -p tsconfig.test.json --noEmit`; `npx vitest run tests/integration/job-listing-detail.test.ts tests/integration/candidate-job-detail-response.test.ts`; `npx playwright test tests/e2e/portal/candidate-job-page.spec.ts`; `npx playwright test tests/e2e/parity/candidate-job-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/candidate-job-page.visual.spec.ts`
- note: capture finale `artifacts/loop-captures/2026-04-11/1951-candidate-job-detail-after`; nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`

- timestamp: 2026-04-11 19:59
- task: audit detail candidato azienda contro Figma/VRT
- node: desktop `181:608`, mobile `184:795`
- viewport: pending discovery
- files: prd.md, src/pages/portal/company-candidate-page.tsx, src/data/candidates.ts, tests/e2e/portal, tests/e2e/parity
- action: il prossimo gap residuo con frame esplicito e route attiva e `/portale/azienda/candidati/:candidateId`; Figma mostra gia pannello mint e CTA recruiter desktop/mobile, mentre il codice attuale resta sul detail generico legacy
- tests: pending
- note: il frame `Annuncio di Candidato/Anteprima annuncio` letto in discovery corrisponde meglio al profilo candidato visto da azienda che alla preview di un annuncio job

- timestamp: 2026-04-11 20:01
- task: audit detail candidato azienda contro Figma/VRT
- node: desktop `181:608`, mobile `184:795`
- viewport: desktop + mobile
- files: src/pages/portal/company-candidate-page.tsx, src/data/candidate-profile-summary.ts, src/components/portal/candidate-job-detail-view.tsx, artifacts/loop-captures/2026-04-11/2000-company-candidate-detail-before
- action: discovery Figma completata con metadata, screenshot e design context; confermato che il detail usa un canvas standalone menta senza `PortalNavbar`, con close interno, CTA recruiter dedicate e dock mobile a 5 icone. La route reale catturata in `artifacts/loop-captures/2026-04-11/2000-company-candidate-detail-before` resta invece un `DetailCard` legacy non allineato e alimentato da mock troppo poveri per esperienze/certificazioni
- tests: `npm run loop:capture -- /portale/azienda/candidati/azzurra-signorelli company-candidate-detail-before`
- note: serve un contratto dati dedicato al detail azienda, analogo al lavoro gia fatto su `/portale/candidato/annuncio/:jobId`

- timestamp: 2026-04-11 20:11
- task: audit detail candidato azienda contro Figma/VRT
- node: desktop `181:608`, mobile `184:795`
- viewport: desktop + mobile
- files: src/data/company-candidate-detail.ts, src/data/types.ts, src/components/layout/portal-layout.tsx, src/components/portal/company-candidate-detail-view.tsx, src/pages/portal/company-candidate-page.tsx, tests/fixtures/portal-copy.ts, tests/integration/company-candidate-detail-response.test.ts, tests/e2e/portal/company-candidate-page.spec.ts, tests/e2e/parity/company-candidate-page.visual.spec.ts, __screenshots__/chromium-*/parity/company-candidate-page.visual.spec.ts/company-candidate-page.png, prd.md, .codexpotter/kb/company-candidate-detail.md
- action: introdotto `CompanyCandidateDetailResponse` server-like con presentazione dedicata per le candidate, nascosta la `PortalNavbar` sulla route `/portale/azienda/candidati/*`, riscritta la pagina in shell standalone menta desktop/mobile con close interno, rich text box, CTA recruiter e dock mobile a 5 icone, poi aggiunte coperture integration/E2E/parity e baseline dedicate. Capture finale salvato in `artifacts/loop-captures/2026-04-11/2009-company-candidate-detail-after`
- tests: `npm run lint`; `npm run typecheck`; `npx vitest run tests/integration/company-candidate-detail-response.test.ts`; `npx playwright test tests/e2e/portal/company-candidate-page.spec.ts tests/e2e/portal/company-dashboard-page.spec.ts`; `npx playwright test tests/e2e/parity/company-candidate-page.visual.spec.ts --update-snapshots`; `npm run loop:capture -- /portale/azienda/candidati/azzurra-signorelli company-candidate-detail-after`; `npm run test:all`
- note: controllo GitHub eseguito su `daubog44/wedoo` con `search_pull_requests head:codex/ralph-loop-bootstrap state:open = 0`; dalla review router+Figma il prossimo gap promosso nel PRD e `/portale/azienda/annunci` contro il frame `185:1738`

- timestamp: 2026-04-11 20:18
- task: audit launcher/lista annunci azienda contro Figma/VRT
- node: desktop `185:1738`
- viewport: desktop
- files: src/pages/portal/company-jobs-page.tsx, prd.md, .codexpotter/projects/2026/04/11/1/MAIN.md
- action: avviata discovery del nuovo primo task aperto del PRD. La route reale `/portale/azienda/annunci` e ancora un launcher minimale a due card, mentre Figma `185:1738` mostra una sezione portale completa con rail azienda a sinistra, area form recruiter a destra e CTA `visualizza anteprima`
- tests: n/a
- note: resta da identificare il frame mobile corrispondente nella pagina `Form di accesso per mobile`; il task resta aperto come prossimo blocco di implementazione

- timestamp: 2026-04-11 20:58
- task: audit launcher/lista annunci azienda contro Figma/VRT
- node: desktop `185:1738`, mobile `267:442`
- viewport: desktop + mobile
- files: src/data/types.ts, src/data/company-job-management.ts, src/data/mock-services.ts, src/components/layout/portal-layout.tsx, src/components/portal/company-job-management-view.tsx, src/pages/portal/company-jobs-page.tsx, tests/fixtures/portal-copy.ts, tests/integration/company-job-management-response.test.ts, tests/e2e/portal/company-jobs-page.spec.ts, tests/e2e/portal/company-job-draft-step-1.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts, tests/e2e/parity/company-jobs-page.visual.spec.ts, __screenshots__/chromium-*/parity/company-jobs-page.visual.spec.ts/company-jobs-page.png, prd.md, .codexpotter/kb/company-job-management.md, .codexpotter/kb/README.md
- action: discovery Figma completata sui frame desktop/mobile e sui sibling recruiter/azienda/offerta/publishing; sostituito il launcher legacy con una shell standalone `CompanyJobManagementView`, introdotto il contratto `CompanyJobManagementResponse`, nascosta la `PortalNavbar` sulla route, mantenuta la persistenza bozza via `mock-services` e aggiunte coperture integration/E2E/parity dedicate. Capture finale reale salvato in `artifacts/loop-captures/2026-04-11/2054-company-jobs-page-after`
- tests: `npm run typecheck`; `npm run lint`; `npx vitest run tests/integration/company-job-management-response.test.ts`; `npx playwright test "tests/e2e/portal/company-jobs-page.spec.ts"`; `npx playwright test "tests/e2e/portal/company-job-draft-step-1.spec.ts" "tests/e2e/portal/company-job-draft-step-2.spec.ts"`; `npx playwright test "tests/e2e/parity/company-jobs-page.visual.spec.ts" --update-snapshots`; `npx playwright test "tests/e2e/parity/company-jobs-page.visual.spec.ts"`
- note: `search_pull_requests` su `daubog44/wedoo` con head `codex/ralph-loop-bootstrap` restituisce `0`; i test del wizard annunci sono stati riallineati perche il vecchio launcher a due card non esiste piu su `/portale/azienda/annunci`

- timestamp: 2026-04-11 21:08
- task: review post-audit route preview annuncio azienda
- node: n/a
- viewport: pending discovery
- files: prd.md, src/pages/portal/company-job-page.tsx, src/router.tsx
- action: review stretta del router dopo la chiusura di `/portale/azienda/annunci`: emersa la route `/portale/azienda/annunci/:jobId` ancora legata a `CompanyJobPage` legacy, mentre il nuovo shell e il wizard continuano a puntare alla preview. Promosso in PRD un task tecnico di mapping Figma/export prima di qualunque riallineamento della preview.
- tests: n/a
- note: `get_metadata` root `0:1` non ha fornito un mapping affidabile della preview annuncio nel payload troncato; serve discovery dedicata senza assumere che il frame `Anteprima annuncio` letto in audit precedenti corrisponda davvero a questa route

- timestamp: 2026-04-11 21:14
- task: mapping preview annuncio azienda contro Figma/export
- node: desktop `172:1273`, mobile `178:1640`
- viewport: desktop + mobile
- files: prd.md, src/pages/portal/company-job-page.tsx, artifacts/loop-captures/2026-04-11/2102-company-job-preview-before, artifacts/figma-exports/from-public-assets-2026-04-03/Annuncio di Lavoro.png
- action: discovery Figma via search testuale e screenshot ha escluso `Annuncio di Candidato/Anteprima annuncio` come target della route: quel frame coincide con il detail candidato azienda gia implementato. L'unico frame vivo coerente col bottone `visualizza anteprima` resta `Annuncio di Lavoro` desktop/mobile; non esiste una preview recruiter separata nel file. Decisione: mantenere `/portale/azienda/annunci/:jobId` come route standalone e riallinearla a `172:1273/178:1640`, adattando le CTA finali al contesto azienda invece di assorbirla nel management shell.
- tests: `npm run loop:capture -- /portale/azienda/annunci/addetto-comunicazione company-job-preview-before`
- note: scoperto anche il frame Figma `271:938` `Sezione "visualizza annunci"` come possibile backlog successivo distinto dalla preview

- timestamp: 2026-04-11 21:17
- task: riallineamento preview annuncio azienda contro Figma/VRT
- node: desktop `172:1273`, mobile `178:1640`
- viewport: desktop + mobile
- files: src/data/types.ts, src/data/company-job-preview.ts, src/components/layout/portal-layout.tsx, src/components/portal/company-job-preview-view.tsx, src/pages/portal/company-job-page.tsx, tests/fixtures/portal-copy.ts, tests/integration/company-job-preview-response.test.ts, tests/e2e/portal/company-job-page.spec.ts, tests/e2e/portal/company-jobs-page.spec.ts, tests/e2e/portal/company-job-draft-step-2.spec.ts, tests/e2e/parity/company-job-page.visual.spec.ts, __screenshots__/chromium-*/parity/company-job-page.visual.spec.ts/company-job-page.png, prd.md, .codexpotter/kb/company-job-preview.md
- action: sostituita `CompanyJobPage` legacy con una shell standalone lilla coerente col frame `Annuncio di Lavoro`, nascosta la navbar portale anche su `/portale/azienda/annunci/:jobId`, introdotto `CompanyJobPreviewResponse` con hydration da `JobDraft` persistito quando disponibile e riallineati i flow preview da management shell e wizard step 2
- tests: `npm run typecheck`; `npm run lint`; `npx vitest run tests/integration/company-job-preview-response.test.ts`; `npx playwright test tests/e2e/portal/company-job-page.spec.ts tests/e2e/portal/company-jobs-page.spec.ts tests/e2e/portal/company-job-draft-step-2.spec.ts`; `npx playwright test tests/e2e/parity/company-job-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/company-job-page.visual.spec.ts`; `npm run loop:capture -- /portale/azienda/annunci/addetto-comunicazione company-job-preview-after`; `npm run test:all`
- note: capture finale `artifacts/loop-captures/2026-04-11/2114-company-job-preview-after`; dalla review finale resta aperto il frame Figma `271:938` `Sezione "visualizza annunci"` come gap successivo per il CTA `visualizza annunci`

- timestamp: 2026-04-11 21:24
- task: audit vista azienda `visualizza annunci`
- node: desktop `271:938`
- viewport: desktop come riferimento principale, mobile derivato
- files: prd.md, src/pages/portal/company-jobs-page.tsx, src/components/portal/company-job-management-view.tsx, src/components/portal/managed-job-card.tsx, artifacts/figma-exports/from-public-assets-2026-04-03/Sezione _visualizza annunci_.png
- action: review post-preview ha confermato che il CTA `visualizza annunci` della shell annunci non porta ancora alla lista Figma `271:938`; avviata implementazione come stato dedicato `published-jobs` sullo stesso route `/portale/azienda/annunci`, evitando un nuovo path e mantenendo la preview sulle singole card
- tests: pending
- note: il frame Figma e solo desktop; la variante mobile verra derivata in coerenza con la shell azienda gia stabilizzata

- timestamp: 2026-04-11 21:47
- task: audit vista azienda `visualizza annunci`
- node: desktop `271:938`
- viewport: desktop come riferimento principale, mobile derivato
- files: src/data/types.ts, src/data/company-job-management.ts, src/pages/portal/company-jobs-page.tsx, src/components/portal/company-published-jobs-view.tsx, tests/fixtures/portal-copy.ts, tests/integration/company-job-management-response.test.ts, tests/e2e/portal/company-published-jobs-page.spec.ts, tests/e2e/parity/company-published-jobs-page.visual.spec.ts, __screenshots__/chromium-*/parity/company-published-jobs-page.visual.spec.ts/company-published-jobs-page.png, prd.md, .codexpotter/kb/company-published-jobs.md, .codexpotter/kb/README.md
- action: chiuso il gap `visualizza annunci` introducendo lo stato query-driven `section=published-jobs` sullo stesso shell `/portale/azienda/annunci`, con lista card pubblicate desktop coerente al frame `271:938`, preview CTA verso `/portale/azienda/annunci/:jobId`, filtri desktop e variante mobile derivata senza navbar legacy
- tests: `npm run typecheck`; `npm run lint`; `npx vitest run tests/integration/company-job-management-response.test.ts`; `npx playwright test tests/e2e/portal/company-published-jobs-page.spec.ts tests/e2e/portal/company-jobs-page.spec.ts`; `npx playwright test tests/e2e/parity/company-published-jobs-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/company-published-jobs-page.visual.spec.ts`; `npm run test:all`
- note: `npm run loop:capture -- "/portale/azienda/annunci?section=published-jobs" company-published-jobs-after` e andato in timeout due volte e ha lasciato cartelle vuote (`2137-...`, `2139-...`); review finale chiusa con parity desktop/mobile, E2E dedicati e quality gate completo. Verifica GitHub: nessuna PR aperta su `codex/ralph-loop-bootstrap`

- timestamp: 2026-04-11 21:54
- task: audit preview CV candidato contro Figma/VRT
- node: desktop `288:1266`, mobile `288:1325`
- viewport: desktop + mobile
- files: prd.md, src/pages/portal/candidate-cv-page.tsx, tests/e2e/portal, tests/e2e/parity
- action: review post-backlog vuoto ha promosso `/portale/candidato/cv` come prossimo gap reale del router; discovery Figma ha trovato i frame `Profilo utente` desktop `288:1266` e mobile `288:1325`, mentre la route corrente monta ancora una `DetailCard` mint legacy senza shell o dock coerenti
- tests: pending
- note: il frame desktop mostra due pannelli standalone con avatar, CTA `modifica`/`carica CV`, dropdown `attivita` e blocchi dati personali/preferenze/Agenda 2030; il mobile conferma bottom dock e top bar candidate

- timestamp: 2026-04-11 22:02
- task: audit preview CV candidato contro Figma/VRT
- node: desktop `288:1266`, mobile `288:1325`
- viewport: desktop + mobile
- files: src/data/types.ts, src/data/candidate-cv.ts, src/components/portal/candidate-cv-view.tsx, src/pages/portal/candidate-cv-page.tsx, src/components/layout/portal-layout.tsx, tests/fixtures/portal-copy.ts, tests/integration/candidate-cv-response.test.ts, tests/e2e/portal/candidate-cv-page.spec.ts, tests/e2e/parity/candidate-cv-page.visual.spec.ts, __screenshots__/chromium-*/parity/candidate-cv-page.visual.spec.ts/candidate-cv-page.png, prd.md, .codexpotter/kb/candidate-cv.md, .codexpotter/kb/README.md
- action: sostituita la preview CV legacy con una shell standalone Figma-first desktop/mobile, introdotto `CandidateCvResponse`, nascosta la `PortalNavbar` su `/portale/candidato/cv`, riallineate top bar/dock mobile e aggiunte coperture integration/E2E/parity dedicate
- tests: `npm run typecheck`; `npm run lint`; `npx vitest run tests/integration/candidate-cv-response.test.ts`; `npx playwright test tests/e2e/portal/candidate-cv-page.spec.ts`; `npx playwright test tests/e2e/parity/candidate-cv-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/candidate-cv-page.visual.spec.ts`; `npm run loop:capture -- /portale/candidato/cv candidate-cv-before`; `npm run loop:capture -- /portale/candidato/cv candidate-cv-after`; `npm run test:all`
- note: capture finali disponibili in `artifacts/loop-captures/2026-04-11/2152-candidate-cv-before` e `2159-candidate-cv-after`; verifica GitHub su `codex/ralph-loop-bootstrap`: nessuna PR aperta

- timestamp: 2026-04-11 22:05
- task: mapping knowledge hub pubblico `/articoli` `/podcast`
- node: n/a
- viewport: n/a
- files: prd.md, src/router.tsx, src/components/public/knowledge-hub-page.tsx
- action: review del router a backlog vuoto: confermato che le route pubbliche `/articoli` e `/podcast` restano attive e linkate da header/portale, ma la discovery Figma precedente non aveva trovato frame pubblici dedicati. Promosso quindi un task tecnico esplicito gia risolto in PRD e aperta la copertura E2E minima per mettere in sicurezza la shared page senza inventare un redesign fuori source of truth
- tests: pending
- note: le uniche occorrenze Figma di `Articoli`/`Podcast` restano dentro i frame account candidato/azienda, quindi finche non compare un frame pubblico dedicato la route va trattata come legacy controllata

- timestamp: 2026-04-11 22:09
- task: copertura knowledge hub pubblico `/articoli` `/podcast`
- node: n/a
- viewport: desktop + mobile
- files: tests/fixtures/public-copy.ts, tests/e2e/public/knowledge-hub-page.spec.ts, prd.md, .codexpotter/kb/knowledge-hub.md, .codexpotter/kb/README.md
- action: aggiunta copertura E2E dedicata alla shared page `KnowledgeHubPage`, verificando render corrente di `/articoli`, CTA verso `/podcast` e `/info`, e switch bidirezionale tra articoli e podcast senza introdurre una parity Figma inesistente
- tests: `npx playwright test tests/e2e/public/knowledge-hub-page.spec.ts`; `npm run test:all`
- note: nessuna PR aperta su `codex/ralph-loop-bootstrap`; la review finale conferma che queste route restano legacy controllate finche non esiste un frame pubblico dedicato

- timestamp: 2026-04-11 22:12
- task: copertura route pubblica 404
- node: n/a
- viewport: desktop + mobile
- files: prd.md, src/pages/public/not-found-page.tsx, tests/e2e/public
- action: backlog vuoto ma router ancora con fallback `*`: aperto task minimo di hardening per la 404 pubblica, limitato a messaggio e CTA home per non lasciare scoperta l'ultima route non mappata
- tests: pending
- note: nessun frame Figma dedicato noto; qui serve solo protezione funzionale

- timestamp: 2026-04-11 22:16
- task: copertura route pubblica 404
- node: n/a
- viewport: desktop + mobile
- files: tests/fixtures/public-copy.ts, tests/e2e/public/not-found-page.spec.ts, prd.md, docs/worklogs/2026-04-11/1521-wedoo-loop.md
- action: aggiunta copertura E2E dedicata alla route fallback `*`, verificando render del messaggio 404 pubblico e ritorno effettivo alla landing tramite CTA `torna alla home`
- tests: `npx playwright test tests/e2e/public/not-found-page.spec.ts`; `npm run test:e2e`
- note: `npm run test:all` ha avuto un singolo fallimento VRT flakey fuori task sulla parity `company-published-jobs` mobile (diff 11 pixel), subito verificato con rerun dedicato verde; la successiva `npm run test:e2e` completa e passata

- timestamp: 2026-04-11 22:41
- task: discovery flow pubblico candidato non tracciato
- node: desktop `273:1313` `273:1384`, mobile `234:590` `234:813`
- viewport: desktop + mobile
- files: prd.md, .codexpotter/projects/2026/04/11/1/MAIN.md, docs/worklogs/2026-04-11/1521-wedoo-loop.md
- action: review root Figma con `use_figma` ha trovato due frame candidato top-level non presenti nel PRD ma coerenti con la route esistente `/registrati/candidato/:stepIndex`: registrazione account `Benvenut*!` e onboarding `Dicci qualcosa in più`. Promossi in backlog insieme al prerequisito dati `CandidateOnboardingDraft`, perche il flow attuale salta il secondo step e usa ancora il form shell generico legacy.
- tests: n/a
- note: il frame `280:1000` `pop up preferenze di lavoro` e correlato ma distinto; verra trattato come backlog successivo del profilo candidato, non come sostituto del nuovo step pubblico `273:1384`

- timestamp: 2026-04-11 23:00
- task: riallineamento flow pubblico candidato `/registrati/candidato/:stepIndex`
- node: desktop `273:1313` `273:1384`, mobile `234:590` `234:813`
- viewport: desktop + mobile
- files: `src/data/candidate-onboarding.ts`, `src/data/auth.ts`, `src/pages/public/candidate-wizard-page.tsx`, `src/components/public/candidate-onboarding-*`, `src/components/public/candidate-contacts-step.tsx`, `src/components/public/candidate-education-step.tsx`, `src/components/public/candidate-work-experience-step.tsx`, `src/components/public/candidate-skills-step.tsx`, `tests/fixtures/public-copy.ts`, `tests/integration/candidate-onboarding.test.ts`, `tests/integration/auth-view-model.test.ts`, `tests/e2e/public/public-routes.spec.ts`, `tests/e2e/wizards/candidate-preferences.spec.ts`, `tests/e2e/parity/candidate-registration-flow.visual.spec.ts`, `__screenshots__/chromium-*/parity/candidate-registration-flow.visual.spec.ts/*`, `prd.md`
- action: introdotti `CandidateOnboardingDraft` e le shell pubbliche Figma-first per step 1-2 candidato, rimosso il vecchio auth shell generico da `/registrati/candidato/1`, spostati i modal profilo alle route `/registrati/candidato/3-6`, riallineati fixture e test, aggiunte parity desktop/mobile dedicate e hydration del `CandidateProfileDraft` dai dati pubblici del nuovo onboarding
- tests: `npm run typecheck`; `npx vitest run tests/integration/auth-view-model.test.ts tests/integration/candidate-onboarding.test.ts`; `npx playwright test tests/e2e/public/public-routes.spec.ts tests/e2e/wizards/candidate-preferences.spec.ts tests/e2e/wizards/candidate-contacts.spec.ts tests/e2e/wizards/candidate-education.spec.ts tests/e2e/wizards/candidate-work-experience.spec.ts tests/e2e/wizards/candidate-skills.spec.ts`; `npm run loop:capture -- /registrati/candidato/1 candidate-registration-step-1-review`; `npm run loop:capture -- /registrati/candidato/2 candidate-registration-step-2-review`; `npx playwright test tests/e2e/parity/candidate-registration-flow.visual.spec.ts --update-snapshots`; `npm run test:all`
- note: audit visuale finale basato su `artifacts/loop-captures/2026-04-11/2254-candidate-registration-step-1-review` e `2254-candidate-registration-step-2-review`; un falso diff parity e apparso quando update e verify sono stati lanciati in parallelo, risolto con rerun seriale verde

- timestamp: 2026-04-11 23:11
- task: discovery gap candidato `preferenze di lavoro`
- node: `280:1000`
- viewport: desktop
- files: `prd.md`, `.codexpotter/projects/2026/04/11/1/MAIN.md`, `.codexpotter/kb/candidate-profile.md`, `src/data/candidate-profile.ts`, `src/data/candidate-cv.ts`, `src/components/public/candidate-preferences-step.tsx`, `src/pages/public/candidate-wizard-page.tsx`
- action: review root Figma a backlog vuoto ha trovato il frame top-level non tracciato `280:1000 pop up preferenze di lavoro`; il codice attuale copre solo lo step pubblico `273:1384` con provincia/citta/CAP/SDG/mansioni, mentre `CandidateProfileDraft` non ha un contratto strutturato per modalita, localita, tipologia azienda, orari e contratto e `candidateCvResponseMock` continua a esporre queste informazioni come stringhe hardcoded. Aggiunto un solo task concreto al PRD e riallineato il tracker interno, senza implementazione nello stesso round.
- tests: n/a
- note: prossimo round da aprire sul task `280:1000`, con probabile estensione del flow `/registrati/candidato/:stepIndex` e riuso dei dati nella preview CV

- timestamp: 2026-04-11 23:26
- task: implementazione modal candidato `preferenze di lavoro`
- node: `280:1000`
- viewport: desktop come riferimento principale, mobile derivato
- files: `src/data/candidate-profile.ts`, `src/data/candidate-cv.ts`, `src/pages/public/candidate-wizard-page.tsx`, `src/components/public/candidate-work-preferences-step.tsx`, `tests/integration/*`, `tests/e2e/wizards/*`
- action: discovery Figma completata su frame `650x1213`; confermato che il modal riusa la shell dei modal candidato gia implementati ma introduce un dominio nuovo con cinque famiglie di preferenze (`modalita`, `localita`, `tipologia di azienda`, `orari`, `tipologia di contratto`). Avviata l'estensione del draft candidato e del flow `/registrati/candidato/:stepIndex` per eliminare gli hardcode dalla preview CV.
- tests: pending
- note: nessun sibling mobile dedicato trovato nello stesso cluster Figma; la resa mobile verra derivata mantenendo tipografia, pannello e gerarchia dei modal candidato esistenti

- timestamp: 2026-04-11 23:34
- task: implementazione modal candidato `preferenze di lavoro`
- node: `280:1000`
- viewport: desktop come riferimento principale, mobile derivato
- files: `src/data/candidate-profile.ts`, `src/data/candidate-cv.ts`, `src/pages/public/candidate-wizard-page.tsx`, `src/components/public/candidate-work-preferences-step.tsx`, `tests/fixtures/public-copy.ts`, `tests/integration/candidate-{profile-draft,cv-response}.test.ts`, `tests/e2e/wizards/candidate-{skills,work-preferences}.spec.ts`, `tests/e2e/parity/candidate-work-preferences.visual.spec.ts`, `__screenshots__/chromium-*/parity/candidate-work-preferences.visual.spec.ts/candidate-work-preferences-step.png`, `prd.md`, `.codexpotter/kb/candidate-profile.md`
- action: esteso `CandidateProfileDraft` con `workPreferences`, aggiunto formatter CV riusabile, inserito il nuovo step `/registrati/candidato/7` dopo `competenze`, aggiunta parity dedicata come per gli altri modal candidato e rimossa la dipendenza da stringhe hardcoded in `candidate-cv.ts`.
- tests: `npm run typecheck`; `npm run lint`; `npx vitest run tests/integration/candidate-profile-draft.test.ts tests/integration/candidate-cv-response.test.ts`; `npx playwright test tests/e2e/wizards/candidate-skills.spec.ts tests/e2e/wizards/candidate-work-preferences.spec.ts tests/e2e/portal/candidate-cv-page.spec.ts`; `npx playwright test tests/e2e/parity/candidate-work-preferences.visual.spec.ts tests/e2e/parity/candidate-cv-page.visual.spec.ts --update-snapshots`; `npx playwright test tests/e2e/parity/candidate-work-preferences.visual.spec.ts tests/e2e/parity/candidate-cv-page.visual.spec.ts`; `npm run loop:capture -- /registrati/candidato/7 candidate-work-preferences-after`; `npm run loop:capture -- /portale/candidato/cv candidate-cv-work-preferences-after`; `npm run test:all`
- note: capture finali in `artifacts/loop-captures/2026-04-11/2326-candidate-work-preferences-after` e `artifacts/loop-captures/2026-04-11/2326-candidate-cv-work-preferences-after`; review GitHub conferma `search_pull_requests head:codex/ralph-loop-bootstrap state:open = 0`
