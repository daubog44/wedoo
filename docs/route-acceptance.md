# Route Acceptance

Use this file before closing any route-level or frame-level task.

## Hard Gate

Do not close route if one of these is missing:

- exact Figma node or explicit statement that route has no dedicated node
- viewport classification
- real desktop capture
- real mobile capture
- relevant E2E pass
- VRT handled intentionally when route is stable
- explicit comparison between real UI and design source
- updated `prd.md`
- updated `docs/visual-backlog.md`
- updated worklog

## Tests Are Not Enough

These are never sufficient alone:

- green unit/integration tests
- green E2E
- green VRT
- existing baseline matching old UI

One of Figma, coherent export or explicit design inference must also support closure.

## No-Op Audit Checklist

No-op close allowed only with:

- current route already implemented
- route audited in browser
- capture path recorded
- frame path or export path recorded
- tests recorded
- precise reason code change not needed

If route still feels suspicious, keep task open.

## Design Inference

If Figma is incomplete, contradictory or missing small implementation details:

- infer from nearest valid sibling, parent frame or coherent export
- preserve Wedoo visual language already established in adjacent audited routes
- prefer concrete implementation over placeholder gap
- write one short inference note in worklog

Examples:

- missing mobile footer spacing but clear desktop rhythm -> derive responsive spacing from audited mobile siblings
- contradictory CTA label across sibling frames -> keep label matching current flow intent and record decision

If inference creates separate follow-up surface, add task to `prd.md`.

## Capture Discipline

Preferred:

```powershell
npm run loop:capture -- <route> <task-slug>
```

Use saved paths in worklog and visual backlog.
If Playwright MCP browser is unstable, saved captures are mandatory fallback, not optional.
