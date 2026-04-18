## ADDED Requirements

### Requirement: Shared Wedoo UI grammar stays consistent across route families

Shared primitives for panels, buttons, fields, and loaders MUST use a tighter and more coherent visual language across public and portal routes.

#### Scenario: Buttons and panels look related across product families

- **WHEN** a user navigates between public and portal routes
- **THEN** the repeated UI primitives should feel like the same product system
- **AND** they should not switch between unrelated shadow, radius, and motion behaviors

### Requirement: Editorial routes remain readable without excess copy

Public editorial routes MUST prioritize clear headings, shorter support text, and easier scanning.

#### Scenario: A user opens info or knowledge routes

- **WHEN** a user lands on `/info`, `/articoli`, or `/podcast`
- **THEN** the route should present shorter support copy and clearer section grouping
- **AND** the experience should feel editorial, not bloated

### Requirement: Modernization must improve stability, not only appearance

Modernization changes MUST reduce perceived instability in layout, hover behavior, and loading.

#### Scenario: A route contains media, cards, or loaders

- **WHEN** images, cards, or loaders render
- **THEN** they should keep stable space and restrained motion
- **AND** the route should avoid aggressive scale effects or noisy shimmer behavior
