# Wedoo Implementation Contract

## Working Mode

- implement immediately once the user goal is clear
- do not block on `prd.md`, visual backlog rituals, or round bookkeeping before coding
- inspect the live route first, then edit, then validate
- docs exist only to support implementation, never to replace it

## Product Direction

- Wedoo must feel like one product, not a stack of route-level experiments
- inspiration must come from world-class UI/UX benchmarks adapted to Wedoo, not copied blindly
- preferred benchmark mix:
  - product structure and clarity from Linear
  - marketing rhythm from Stripe
  - framing and polish from Vercel
  - restrained motion/depth inspired by top-tier modern web apps
- never collage unrelated references just because they look trendy

## Non-Negotiables

- same public navbar language across the public routes
- same footer language across the public routes
- dark mode and light mode must be fully governed by shared tokens
- no random white cards leaking into dark mode
- spacing and vertical rhythm must be explicit and consistent
- media semantics must be honest:
  - image stays image
  - video stays video
  - no fake player chrome on static artwork
- use 3D or depth only when it improves hierarchy, not as decoration spam

## Build Rules

- keep React, TypeScript, Vite, React Router, Playwright
- reuse architecture when it helps; replace it when it is clearly causing drift
- prefer shared shells, shared primitives, and token-driven surfaces
- do not preserve bad UI because tests are green

## Validation

For visible UI work, always finish with:

- typecheck
- at least the relevant Playwright flow or route test when feasible
- real desktop capture
- real mobile capture

If time is tight, implementation still comes first; bookkeeping can stay minimal.
