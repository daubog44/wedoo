# Ralph Loop Prompt

Comando consigliato con `Taskfile` per avviare il loop con Codex Potter in modalita `--yolo` dalla root del repository:

```powershell
task potter:yolo SLUG=landing-page ROUNDS=25
```

Dry run del bootstrap senza lanciare davvero Potter:

```powershell
task potter:yolo:dry SLUG=landing-page ROUNDS=25
```

Variante con preflight esterno completo prima del loop:

```powershell
task potter:yolo:checked SLUG=landing-page ROUNDS=25
```

Variante che usa la home globale di Codex senza isolamento:

```powershell
task potter:yolo:global SLUG=landing-page ROUNDS=25
```

Comando CLI diretto equivalente, se vuoi bypassare `task`:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\potter-yolo.ps1 -Slug landing-page -Rounds 25
```

Prerequisito operativo:

- esporta `GITHUB_PAT_TOKEN` nella sessione prima di usare i comandi sopra, perche il bootstrap configura GitHub MCP e il preflight valida anche il token

La procedura standard sopra:

- avvia prima il dev server locale su `http://127.0.0.1:4173`
- esegue `loop:ready`
- crea il worklog di sessione
- usa una home Codex locale isolata in `.codex-potter-home`
- copia i file di autenticazione Codex necessari dalla home globale, cosi OAuth Figma continua a essere disponibile
- avvia `codex-potter exec` con `--yolo`, `danger-full-access` e reasoning `xhigh`

La variante `potter:yolo:checked` aggiunge anche un preflight esterno e bloccante su Figma MCP, GitHub MCP e Playwright locale.

La variante `potter:yolo:global` usa invece direttamente la home globale di Codex.

Per eseguire solo il preflight esterno senza lanciare il loop:

```powershell
task potter:preflight SLUG=landing-page ROUNDS=1
```

Lavora in questo repository come agente autonomo dentro un Ralph Loop.
Usa `AGENTS.md` come istruzione principale permanente del loop e usa `prd.md` come backlog operativo vivo.
Usa `docs/ralph-loop-worklog.md` come policy del diario operativo e usa `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md` come worklog reale di sessione.
Leggi prima `AGENTS.md`, poi `prd.md`, poi `docs/ralph-loop-worklog.md`, poi il worklog di sessione corrente, poi trova il primo task incompleto e lavoraci in ordine rigoroso.

Contesto prodotto:

- il progetto e `Wedoo`
- e un prototipo navigabile, mobile friendly, pensato come una sorta di LinkedIn per giovani talenti e aziende che offrono opportunita di lavoro, stage e tirocini coerenti con valori di sostenibilita
- anche se il backend reale non esiste ancora, il codice deve essere scritto come se i dati arrivassero da un backend ipotetico

Vincoli operativi:

- non rifondare il progetto
- mantieni React, TypeScript, Vite, React Router e i pattern gia presenti nel repo
- non saltare task
- lavora su un solo task principale alla volta
- non trattare il codice gia presente come fonte di verita visuale
- se una pagina esiste gia ma e incoerente con Figma, correggila
- non inventare feature fuori da Figma o fuori da `prd.md`, salvo prerequisiti tecnici realmente necessari
- se scopri nuovi task necessari, aggiorna `prd.md` nel punto corretto invece di tenerli impliciti
- registra nel worklog di sessione le decisioni rilevanti, i problemi trovati, come li hai risolti e lo stato dei test

Per ogni task:

- leggi il `Node ID` dal task attivo in `prd.md`
- se il task e un `FRAME`, fai prima discovery con `get_metadata` sul frame corrente
- classifica il frame come `mobile`, `tablet` o `desktop` usando dimensioni del frame, naming e struttura
- usa Figma MCP come fonte primaria: `get_design_context`, `get_screenshot`, `get_metadata` quando serve
- ignora micro-nodi, icone singole, vettori decorativi e layer minuti gia contenuti in componenti o frame piu grandi
- se individui child frame, componenti principali, stati UI o task tecnici mancanti, aggiorna subito `prd.md`
- registra nel worklog le discovery Figma davvero rilevanti
- registra nel worklog quale viewport Figma e il riferimento principale del task
- se la route esiste gia, fai prima un audit visuale rapido della pagina corrente e correggi subito eventuali discrepanze macroscopiche
- usa gli export PNG di sezione in `artifacts/figma-exports/**` solo come riferimento secondario, quando il MCP non basta a leggere bene una sezione lunga, densa o croppata
- se servono export di sezione, parti da `npm run loop:assets` e scegli solo quelli coerenti con il task corrente
- se un export di sezione contraddice Figma MCP, prevale Figma MCP

Regole su viewport e responsive:

- non trattare un frame mobile come layout desktop semplicemente scalandolo o centrandolo nel mezzo della pagina
- non trattare un frame desktop come layout mobile semplicemente comprimendolo
- se esiste solo il frame mobile, implementa prima la resa mobile fedele e poi deriva una desktop version sensata
- se esiste solo il frame desktop, implementa prima la resa desktop fedele e poi deriva una mobile version sensata
- se esistono varianti mobile e desktop della stessa schermata, usa ciascuna variante per la viewport corretta e non mischiarle
- se una pagina pubblica esistente su desktop assomiglia ancora a una colonna mobile centrata, trattala come bug aperto da correggere

Implementazione:

- implementa in React/TypeScript seguendo i pattern del repo
- struttura i dati mock come se arrivassero da un backend reale
- non spargere mock direttamente nel JSX
- preferisci modelli dati, helper e servizi mock riusabili
- evita `any` se non strettamente inevitabile
- mantieni il codice leggibile, tipizzato e semanticamente accessibile
- non fare refactor larghi se non sono necessari per il task corrente

Testing e validazione:

- se tocchi UI, devi scrivere o aggiornare tu i test necessari
- Playwright E2E e il livello minimo obbligatorio per route pubbliche, auth, wizard, modali, dashboard e pagine portale principali
- aggiungi integration test quando c'e logica non banale su mapping, helper, servizi mock, filtri, stepper o trasformazioni dati
- quando una route o un macro-frame e stabile, deve esistere anche un file `*.visual.spec.ts` in `tests/e2e/parity`
- mantieni baseline VRT desktop e mobile in `__screenshots__`
- non aggiornare baseline VRT per nascondere bug o mismatch non capiti
- aggiorna una baseline solo se il cambiamento visuale e intenzionale, verificato e coerente con Figma
- annota nel worklog quando aggiorni una baseline e perche

Ordine di lavoro per ogni iterazione:

1. leggi `AGENTS.md`
2. leggi `prd.md`
3. leggi `docs/ralph-loop-worklog.md`
4. leggi o crea `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md`
5. trova il primo task incompleto
6. registra nel worklog l'inizio del task
7. interroga Figma MCP sul `Node ID` corretto
8. se il task e un frame, fai discovery iniziale con `get_metadata`
9. implementa il task
10. aggiorna mock data e contratti server-like se necessario
11. crea o aggiorna test E2E, integration test e VRT se pertinenti
12. fai self-review del diff prima dei test
13. esegui `npm run test:all`
14. se il task e visualmente sensibile, fai anche validazione finale con Playwright su desktop e mobile, dando priorita alla viewport corrispondente al frame Figma principale
15. se la route esisteva gia, conferma esplicitamente che non siano rimaste discrepanze macroscopiche preesistenti
16. se esiste un export PNG di sezione davvero utile, confrontalo nella review finale
17. se GitHub MCP e disponibile, controlla branch, PR e CI/CD e correggi le failure causate dal diff
18. aggiorna il worklog con test, problemi trovati, soluzioni, decisioni e stato finale del task
19. solo quando tutto e coerente, aggiorna `prd.md` marcando il task come completato

Regole Git e GitHub:

- lavora preferibilmente su branch `codex/...`
- mantieni commit piccoli e intenzionali
- non committare task rotti o incompleti
- non fare auto-merge
- non dare per chiuso un task se la CI remota e rotta per colpa del diff
- usa GitHub MCP per leggere PR, check, workflow e contesto di review quando disponibile

Definition of done di un task:

- Node ID letto e compreso
- implementazione completata
- mock data coerenti con backend futuro
- responsive sensato almeno su mobile e desktop
- test pertinenti scritti o aggiornati
- `npm run test:all` verde
- parity visiva verificata quando rilevante
- `prd.md` aggiornato
- `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md` aggiornato con una nota sintetica rilevante
- CI/GitHub verificata se disponibile

Non chiudere un task finche codice, test, parity visiva, `prd.md` e CI disponibile non sono coerenti.
