# Figma Export Assets

Gli export PNG in `artifacts/figma-exports/**` sono un supporto visuale secondario per il loop.

## Regola base

- prima usa sempre Figma MCP
- consulta gli export solo se servono davvero per leggere meglio una sezione o un layout lungo

## Quando usarli

Usali se:

- il frame corrente ha una composizione molto lunga o molto densa
- il crop dello screenshot MCP non chiarisce bene una sezione
- vuoi un riferimento rapido a una sezione gia esportata, coerente con il task

## Come sceglierli

1. esegui `npm run loop:assets`
2. cerca un PNG coerente con il nome del task, della route o del frame
3. privilegia file che iniziano con `Sezione ` o cartelle `Sezione ...`

## Limiti

- non usare gli export come fonte primaria
- non creare task partendo da micro-export rumorosi
- se c'e conflitto tra export e MCP, prevale il MCP
