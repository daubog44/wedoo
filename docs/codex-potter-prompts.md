# Prompt Per Codex Potter

## Prompt 1: Audit Figma -> PRD

Usa il Figma MCP per analizzare il file con ID `N33nOmzNxMuVBWz3HwPGhC` e parti dal nodo root `0:1`.

Obiettivo:
esplora l'albero del documento, individua tutti i frame principali di prodotto e i componenti UI riusabili principali.

Istruzioni operative:

1. Parti da `get_metadata` sul root per mappare la struttura.
2. Considera come "frame principali" solo screen, modali, wizard step e layout completi.
3. Considera come "componenti principali" solo componenti riusabili come button, input, checkbox, select, link testuali, navbar block, card CTA.
4. Ignora nodi troppo piccoli come icone, vettori e layer decorativi se fanno gia parte di un componente piu grande.
5. Se un nodo piccolo appartiene chiaramente a un master component o a un frame piu grande, traccia il contenitore e non il micro-layer.
6. Quando un frame o componente e rilevante, annota nome esatto e node ID esatto.
7. Se un frame e complesso, usa `get_design_context` e `get_screenshot` sui node ID trovati per chiarire gerarchia e ruolo.
8. Genera un file `prd.md` strutturato come checklist di task.

Formato richiesto per `prd.md`:

- una sezione `Frame principali`
- una sezione `Componenti riusabili principali`
- una sezione `Ordine di implementazione`
- una sezione `Strategia E2E`

Ogni task deve contenere:

- nome del frame o componente
- node ID esatto
- una breve nota sullo scopo del task

## Prompt 2: Implementazione Screen-by-Screen

Usa il Figma MCP per implementare il frame Figma `[INSERISCI_NODE_ID]` del file `N33nOmzNxMuVBWz3HwPGhC` nel progetto React corrente.

Regole:

1. Recupera prima `get_design_context` e `get_screenshot` del node.
2. Riusa i componenti e i pattern gia presenti nel repo quando possibile.
3. Non introdurre dati hardcoded sparsi: crea o aggiorna mock data tipizzati in `src/data/**` come se arrivassero da API.
4. Mantieni fedelta visiva a Figma su spacing, tipografia, gerarchia e CTA.
5. Alla fine aggiorna anche la suite Playwright con almeno un test E2E che copra il frame implementato.
6. Se esiste una PR o una CI remota, controlla anche quello stato e prova a risolvere eventuali failure causate dal diff.
7. Nel report finale indica:
   - file toccati
   - node ID Figma usato
   - route impattata
   - test aggiunti o aggiornati

## Prompt 3: Parita Visiva + E2E

Usa Playwright e il Figma MCP per verificare che la route `[INSERISCI_ROUTE]` rispecchi il frame Figma `[INSERISCI_NODE_ID]`.

Flusso:

1. Leggi il frame con `get_design_context` e `get_screenshot`.
2. Avvia l'app locale.
3. Apri la route con Playwright.
4. Verifica presenza di heading, CTA, gruppi di contenuto e stati interattivi coerenti con Figma.
5. Aggiorna o crea il test E2E corrispondente.
6. Se trovi discrepanze, proponi fix concreti con riferimento al node ID.
