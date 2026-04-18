## Why

Wedoo still has visible layout shifts, parity churn, and some routes that feel visually dated even after Figma alignment work. The project needs a tighter modernization track so UI stabilization, design inference, and selective component acceleration happen under one explicit contract instead of ad hoc fixes.

## What Changes

- Establish a spec-driven track for route visual stability so active UI work must remove layout shift, clipping, overflow, and stale parity debt before closure.
- Add a local Wedoo `DESIGN.md` that defines modernization rules for AI-assisted implementation when Figma is partial or inconsistent.
- Allow curated external component usage, specifically React Bits, as an optional accent/component discovery source without replacing Figma as visual truth.
- Wire React Bits MCP into the local Codex bootstrap for this repo so the loop can inspect components when a modern accent or motion treatment is justified.
- Use Playwright-driven visual review as the required runtime verifier for modernization work.

## Capabilities

### New Capabilities
- `route-visual-stability`: Defines how audited routes are kept free of obvious layout shift, clipping, overflow, and stale parity before closure.
- `wedoo-modern-ui-guidance`: Defines how Wedoo modernizes UI through local design rules and curated external component inspiration without losing Figma fidelity.

### Modified Capabilities
- None.

## Impact

- Affected code: `AGENTS.md`, loop bootstrap scripts, Codex MCP bootstrap config, route acceptance/read-order docs.
- New artifacts: `DESIGN.md`, OpenSpec change artifacts, capability specs under `openspec/changes/**`.
- Dependencies/systems: OpenSpec CLI, local Codex bootstrap, optional React Bits MCP server, Playwright-based visual audits.
