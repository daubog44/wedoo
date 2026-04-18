## Context

Wedoo already has a strong Figma-first contract, but route work still suffers from two problems:

- visual stability work is mixed with normal feature work and can be closed too loosely
- modernization choices risk drifting into generic AI-generated styling when Figma leaves gaps

The repo also lacks a local design-language document that AI can read quickly. Figma remains primary, but a repo-local design file is useful for controlled inference and for deciding when external UI snippets are acceptable.

## Goals / Non-Goals

**Goals:**
- Define a repeatable modernization path for Wedoo routes that still centers Figma.
- Make layout stability an explicit capability with verifiable expectations.
- Add a repo-local `DESIGN.md` that narrows design inference and modernization choices.
- Enable optional React Bits component discovery through MCP inside the repo bootstrap.
- Keep Playwright as the runtime visual verifier for modernization work.

**Non-Goals:**
- Replace Figma with React Bits, Stitch, or any external design system.
- Introduce a full component-library rewrite.
- Permit generic effect-heavy redesigns across forms, nav, and portal shells.
- Make external MCPs mandatory for the loop to function.

## Decisions

### 1. Add a repo-local `DESIGN.md`

**Decision:** Create a local `DESIGN.md` and add it to the loop read order.

**Why:** Figma is still the source of truth, but missing or inconsistent areas need a stable inference guide. A local design file gives the loop a project-specific rulebook faster than re-reading scattered code and worklogs.

**Alternative considered:** Use an external `DESIGN.md` from `awesome-design-md` unchanged.
**Why not:** Those files are useful examples, but they encode other brands and would push Wedoo toward a foreign visual language instead of tightening the existing one.

### 2. Use OpenSpec to scope modernization and stability work

**Decision:** Track UI modernization/stability as an OpenSpec change with capability specs.

**Why:** The repo already has a strong execution loop, but no formal spec artifact for this quality track. OpenSpec adds a durable planning layer without changing the coding workflow.

**Alternative considered:** Keep everything in `prd.md` only.
**Why not:** `prd.md` is fine for route sequencing, but weak for capturing cross-cutting visual quality expectations.

### 3. Treat React Bits as optional accent infrastructure

**Decision:** Add React Bits MCP to the repo-local Codex bootstrap, but constrain its use to accent layers and non-core shells.

**Why:** React Bits can accelerate tasteful motion, hero accents, and showcase polish. It is not reliable as visual truth for auth shells, dashboards, or structured form geometry.

**Alternative considered:** Use Stitch as the primary modernization engine.
**Why not:** Stitch is stronger for ideation and design exploration. This repo already has Figma as canonical design, so Stitch would be secondary unless the product deliberately moves to Stitch-led design exploration.

### 4. Keep Playwright as the deciding runtime verifier

**Decision:** Modernization work remains gated by Playwright route checks, targeted parity, and saved captures.

**Why:** The problem to solve is not lack of ideas; it is layout instability and stale parity. Playwright is the fastest way to verify the rendered result.

## Risks / Trade-offs

- **React Bits misuse** -> Restrict usage in `DESIGN.md` to accents and require local adaptation plus reduced-motion review.
- **Extra process overhead** -> Keep OpenSpec scoped to this modernization track, not every tiny route tweak.
- **Confusion between Figma and design guidance** -> `AGENTS.md` and `DESIGN.md` explicitly rank Figma above local guidance.
- **Bootstrap fragility from extra MCP** -> Keep React Bits MCP optional and stdio-based; if unavailable, loop should continue without it.

## Migration Plan

1. Add `DESIGN.md` and update loop read order.
2. Initialize OpenSpec and create the modernization/stability change with specs and tasks.
3. Add React Bits MCP to repo-local Codex bootstrap config.
4. Validate OpenSpec artifacts and loop readiness.
5. Use the new capability/task structure to drive the next UI stabilization rounds.

## Open Questions

- Which public routes should receive React Bits accents first, if any: landing, showcase, or info?
- Should a second capability be added later for portal motion restraint separately from public-route modernization?
