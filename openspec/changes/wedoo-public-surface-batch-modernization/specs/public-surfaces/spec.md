## ADDED Requirements

### Requirement: Public Editorial Family Must Feel Cohesive

The public editorial routes `/info`, `/candidato`, and `/azienda` MUST present as one coherent Wedoo family rather than mixed legacy screens.

#### Scenario: User moves between public editorial routes

- **GIVEN** the user opens `/info`, `/candidato`, and `/azienda`
- **WHEN** those routes are rendered on desktop and mobile
- **THEN** they share a modern Wedoo shell language, spacing rhythm, and visual hierarchy
- **AND** no route should feel like a leftover legacy screen beside the others

### Requirement: Public Marketing Layouts Must Remain Stable

The public marketing family MUST avoid obvious layout shifts, clipping, cramped desktop canvases, and overflow at audited viewports.

#### Scenario: Visual audit of public marketing surfaces

- **GIVEN** real browser captures and route-level parity tests
- **WHEN** `/info`, `/candidato`, or `/azienda` are validated
- **THEN** content should remain within its intended canvas
- **AND** desktop should not read as a stretched mobile layout
- **AND** visual targets should prefer stable section or canvas capture over fragile full-page parity when appropriate
