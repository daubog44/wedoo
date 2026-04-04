# 2026-04-04 03:45 - content-preview

- task: definire ArticlePreview e PodcastPreview per hub contenuti
- node: n/a
- viewport: n/a
- files: src/data/core.ts, src/data/types.ts, src/components/public/knowledge-hub-page.tsx, tests/integration/content-preview.test.ts
- action: avviata discovery del modulo knowledge; individuati mock inline e dati legacy condivisi tra `/articoli` e `/podcast`
- tests: non ancora eseguiti
- note: il consumer principale e `KnowledgeHubPage`; serve contratto server-like con mapper/adapters per non rompere le route esistenti

- action: creato `src/data/content-preview.ts` con `ArticlePreview`, `PodcastPreview` e mapper verso `KnowledgeEntry`
- files: src/data/content-preview.ts, src/data/core.ts, src/data/types.ts, tests/integration/content-preview.test.ts, prd.md
- tests: `npm run test:integration -- tests/integration/content-preview.test.ts`, `npm run typecheck`, `npm run test:all`
- decision: mantenuto `knowledgeContent` in `src/data/core.ts` come adapter legacy per evitare refactor UI anticipati
- github: branch remoto `origin/codex/ralph-loop-bootstrap` presente; nessuna PR aperta per il branch al momento
- status: task completato e PRD marcato `- [x]`
