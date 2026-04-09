# Figma Export Assets

Gli export PNG in `artifacts/figma-exports/**` sono un supporto visuale secondario per il loop.

## Regola base

- prima usa sempre Figma MCP
- consulta gli export solo se servono davvero per leggere meglio una sezione o un layout lungo
- considera gli export coerenti come segnale di possibile aggiornamento del design, non solo come immagine di supporto

## Quando usarli

Usali se:

- il frame corrente ha una composizione molto lunga o molto densa
- il crop dello screenshot MCP non chiarisce bene una sezione
- vuoi un riferimento rapido a una sezione gia esportata, coerente con il task

## Come sceglierli

1. esegui `npm run loop:assets`
2. cerca un PNG coerente con il nome del task, della route o del frame
3. privilegia file che iniziano con `Sezione ` o cartelle `Sezione ...`

## Quando cambiano il lavoro

Se un export coerente con il task mostra:

- una sezione nuova non presente nel codice
- una gerarchia diversa
- una composizione desktop o mobile diversa
- una CTA, card o stato UI che non corrisponde piu alla pagina reale

allora devi:

1. verificare in Figma MCP che il design attuale confermi quel cambiamento
2. aggiornare `prd.md` se manca un task di allineamento o di nuova implementazione
3. riallineare UI, test e VRT prima di chiudere il task

## Limiti

- non usare gli export come fonte primaria
- non creare task partendo da micro-export rumorosi
- se c'e conflitto tra export e MCP, prevale il MCP
- non usare un VRT verde come scusa per ignorare un export coerente che mostra un design piu aggiornato
