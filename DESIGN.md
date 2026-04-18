# Wedoo DESIGN.md

## Purpose

This file defines Wedoo's local design language for AI-assisted implementation when Figma is incomplete, inconsistent, or missing responsive detail.

It does not replace Figma.
It narrows inference so the UI becomes more modern without drifting into random library aesthetics.

## Design Priority

Use visual sources in this order:

1. Figma node and surrounding sibling frames
2. coherent Figma exports and saved browser captures
3. this `DESIGN.md`
4. curated external component inspiration such as React Bits

External libraries are support only.
Do not import outside visual language directly into core shells, auth flows, dashboards, or form layouts.

## Brand Character

Wedoo should feel:

- editorial, not generic SaaS
- youthful, but not toy-like
- clean and spacious, but not sterile
- energetic through color and rhythm, not through visual noise
- credible as a future hiring platform, not a demo landing full of gimmicks

## Foundations

### Typography

- Headings: keep `Oxygen` for major display moments and route titles
- Accent labels and compact UI headings: `Ubuntu`
- Body copy and form text: `Roboto`
- Avoid adding extra font families unless Figma explicitly changes

### Color

Primary Wedoo palette already lives in `src/styles/wedoo.css`.

Use it with these roles:

- violet: structural emphasis, recruiter shells, active navigation, strong CTA
- mint: candidate emphasis, success, supportive panels, secondary hero accents
- gold: editorial highlights, impact or discovery accents
- rose: warnings, special highlight chips, occasional soft contrast

Do not introduce off-brand neon gradients, black-heavy dark themes, or generic blue startup palettes.

## Modernization Direction

Modernize by improving composition, not by changing brand identity.

Preferred upgrades:

- clearer hierarchy between hero, content blocks, and side rails
- stronger spacing rhythm with fewer cramped panels
- larger, cleaner canvases on desktop
- softer surfaces with glass or blur only when subtle and purposeful
- restrained motion on entrance, hover, and scroll
- more deliberate section framing and edge treatment

Avoid:

- UI that looks like a centered mobile card pasted into desktop
- overuse of floating pills, random gradients, or shiny 3D effects
- generic bento-card overproduction
- decorative motion on form controls

## Modernization First Surfaces

Preferred first surfaces for tasteful modernization:

- landing and editorial public sections
- candidate and company showcase routes
- info and knowledge-style sections with large content blocks
- hero or discovery areas that benefit from richer motion or atmospheric framing

Lower priority surfaces:

- auth shells
- registration wizards
- dashboards
- recruiter or candidate detail routes

Core product flows should modernize mostly through spacing, stability, and hierarchy.
Do not push them toward novelty-first visuals.

## Layout Stability Rules

When a route is touched, it should become more stable, not merely prettier.

Required:

- reserve media and illustration space up front
- avoid content jumps caused by async copy or image loading
- keep desktop and mobile as deliberate layouts, not scaled versions of each other
- preserve stable heights for repeated cards when possible
- prevent horizontal overflow at every audited viewport
- prefer element or section parity targets over full-page snapshots when Figma maps to an inner canvas

If a route still has visible layout shift, clipping, or overflow, modernization is not done.

## Shell Rules

### Public Routes

- hero areas can be expressive, but auth and onboarding shells must stay focused
- top navigation should feel light and deliberate
- footer should not dominate the viewport or appear where Figma does not expect it

### Portal Routes

- candidate and company portals may diverge in emphasis, but should still share spacing discipline
- standalone detail views should feel intentional, not like leftover cards inside a generic layout
- side rails must read as part of the main composition, not attached after the fact

## Motion Rules

Motion is allowed only when it improves hierarchy or feedback.

Preferred:

- subtle staggered reveals
- gentle hover depth
- controlled marquee or background movement
- reduced-motion safe defaults

Forbidden:

- motion on every component
- long looping animations inside forms
- animation that changes layout measurements after paint

## React Bits Usage Policy

React Bits is allowed as a curated accent library, not as global UI replacement.

Good use cases:

- hero text reveals
- tasteful background accents
- premium showcase transitions
- editorial hover or scroll accents on marketing sections

Bad use cases:

- auth forms
- primary app navigation
- dashboard information architecture
- modal shells
- anything that fights Figma geometry or introduces unstable measurements

Before using a React Bits component:

1. confirm it matches Figma or an acceptable inference gap
2. copy code locally and adapt it to Wedoo tokens
3. add reduced-motion handling when motion is involved
4. check overflow and parity stability with Playwright

## Capture And Review

Every modernization change should leave:

- a real desktop capture
- a real mobile capture
- a note on whether the change was direct Figma implementation or design inference

If the result looks more "AI fancy" than "Wedoo credible", it is wrong even if the code is clean.
