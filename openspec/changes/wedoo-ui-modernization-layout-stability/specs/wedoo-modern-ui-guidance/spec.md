## ADDED Requirements

### Requirement: Figma remains the primary visual authority

Wedoo modernization SHALL use Figma as the primary visual source, with local design guidance only as a fallback for inference.

#### Scenario: Figma is partial or contradictory

- GIVEN a route has incomplete or contradictory Figma detail
- WHEN the implementation team must continue
- THEN the team SHALL use the nearest valid sibling frame, export, and `DESIGN.md`
- AND the inferred result SHALL remain coherent with established Wedoo brand tokens and spacing rhythm

### Requirement: External component libraries are support-only

External UI sources such as React Bits SHALL be treated as optional accelerators and SHALL NOT override core shell geometry or Wedoo brand rules.

#### Scenario: Adding an accent component

- GIVEN a developer wants to use a React Bits component
- WHEN the component is added to a Wedoo route
- THEN it SHALL be copied or adapted locally to Wedoo tokens and motion rules
- AND it SHALL be limited to accent, hero, showcase, or background use cases
- AND it SHALL NOT replace core forms, navigation, dashboards, or modal shells without explicit design support

### Requirement: Modernization must improve credibility, not just novelty

Modernization SHALL increase hierarchy, stability, and visual coherence rather than merely adding effects.

#### Scenario: Proposed UI enhancement

- GIVEN a proposed visual enhancement introduces extra motion, glass, gradients, or decorative behavior
- WHEN it is reviewed for inclusion
- THEN the enhancement SHALL be accepted only if it strengthens hierarchy or polish without destabilizing layout
- AND the route SHALL still read as Wedoo rather than a generic AI-generated marketing page
