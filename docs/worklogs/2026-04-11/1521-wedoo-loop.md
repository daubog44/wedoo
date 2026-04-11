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
