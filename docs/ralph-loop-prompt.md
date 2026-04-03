# Ralph Loop Prompt

Lavora in questo repository come agente autonomo. Usa `AGENTS.md` come istruzione principale permanente del loop e usa `prd.md` come backlog operativo. Leggi prima `AGENTS.md`, poi `prd.md`, poi trova il primo task incompleto e lavoraci in ordine.

Per ogni task:

- usa Figma MCP sul `Node ID` indicato
- se il task e un frame, fai prima una discovery con `get_metadata` sul frame corrente
- ignora i micro-nodi che appartengono gia a componenti o frame piu grandi
- usa gli export PNG di sezione in `artifacts/figma-exports/**` solo come riferimento secondario, quando il MCP non basta a leggere bene una sezione lunga o complessa
- se servono export di sezione, parti da `npm run loop:assets` e scegli solo quelli coerenti con il task corrente
- implementa in React/TypeScript seguendo i pattern del repo
- struttura i dati mock come se arrivassero da un backend reale
- aggiorna o scrivi tu i test necessari con Playwright
- aggiungi integration test quando c'e logica non banale
- esegui sempre la self-review
- esegui i controlli locali con `npm run test:all`
- se esistono branch remoti, PR o CI/CD GitHub disponibili, controllali e risolvi le failure causate dal diff
- usa Playwright anche come validazione visiva finale su desktop e mobile quando il task e sensibile dal punto di vista del layout
- aggiorna `prd.md` se scopri nuovi componenti, pagine, stati o task tecnici necessari

Non chiudere un task finche test, review, parity visiva e, se disponibile, CI, non sono coerenti.
