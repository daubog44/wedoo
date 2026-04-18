## Why

Wedoo still feels inconsistent across routes even after the previous fidelity passes. The main problems are cross-cutting:

- too much explanatory text in public editorial shells
- shared buttons, cards, inputs, and panels still read as different design systems
- loading and layout feel heavy because surfaces overuse blur, radius, and shadow
- dashboards and editorial pages still look like multiple prototypes stitched together

This change treats the web app as one product family and improves the shared grammar before doing more isolated parity work.

## What Changes

- refine shared UI primitives and global surface styling
- reduce text density on public editorial routes without losing Wedoo tone
- modernize candidate/company dashboard shells and card rails with the same visual grammar
- tighten loading skeletons and repeated container behavior to reduce perceived layout instability
- validate the affected routes with Playwright and refreshed parity targets

## Non-Goals

- replacing the current brand identity with a third-party aesthetic
- introducing a full external component library as the primary design system
- changing route structure or backend-like mock contracts unless required by UI clarity
