# Wedoo Visual Reset

## Intent

Rebuild Wedoo with one direction only:

- product/workspace structure from Linear
- framing and restraint from Vercel
- marketing rhythm from Stripe
- motion restraint from Raycast
- text density discipline from Notion

This is not a polish pass.
This reset removes route-by-route overrides and replaces them with one shared system.

## Visual Thesis

Wedoo should feel like a serious product workspace wrapped in a sharp public brand: pale editorial light surfaces outside, deep controlled dark surfaces inside, one mint-violet accent axis, very few decorative shapes, and typography that makes the product name and user action scan first.

## Content Plan

1. Hero
   Brand first, manifesto second, CTA third, product proof fourth.
2. Support
   One explanation block for how Wedoo works for candidates and companies.
3. Detail
   One section proving credibility: impact criteria, showcase narratives, verified workflow.
4. Final CTA
   Register, access, or contact.

## Interaction Thesis

1. Hero reveal
   Fast staged fade and translate for eyebrow, title, body, CTAs.
2. Surface lift
   Minimal lift and border brightening on hover for product cards and portal panels.
3. Scroll depth
   Sticky or layered feeling through section backgrounds, not through floating gadget clutter.

## Core Rules

- one accent family: violet for primary action, mint for supportive action
- no route-specific button inventions
- no framed mobile-canvas look on desktop
- no card mosaics as the primary marketing composition
- no dark mode colors outside tokenized surfaces
- no isolated gradients unless they help hierarchy
- no duplicate shell patterns across auth, onboarding, showcase and portal

## Token Direction

### Light Foundation

- background: warm near-white
- elevated surface: translucent white with cool border
- text primary: near-black blue
- text secondary: muted slate

### Dark Foundation

- workspace background: deep navy
- workspace panel: blue-charcoal
- workspace raised panel: slightly lighter slate
- workspace text: cool white
- workspace line: low-contrast blue-gray

### Accent System

- primary: Wedoo violet
- primary hover: deeper violet
- support accent: Wedoo mint
- support hover: darker mint
- warning/highlight: restrained gold only when semantically needed

## Component Grammar

### Buttons

- Primary: solid violet, light text, medium radius, subtle shadow
- Secondary: dark/ink outline on light surfaces, light outline on dark surfaces
- Supportive action: mint only when the action is a role choice or secondary conversion
- Pills and tags: low-contrast surface, never mini-buttons pretending to be CTAs

### Radius And Spacing

- macro panels: 28px to 36px
- controls: 14px to 18px
- no mixed 8/20/30/40 radius logic in the same route
- spacing steps should follow one scale instead of per-route magic numbers

### Shells

- public shell: airy editorial white
- auth/onboarding shell: split composition with one dominant media or color plane
- portal shell: dark workspace with bright panels

## Target Surfaces

- home hero + manifesto
- auth pages and recovery
- role choice
- full onboarding shell
- candidate and company showcase
- candidate and company portal surfaces

## Audit Evidence Before Reset

- home: `artifacts/loop-captures/2026-04-20/2205-visual-reset-home-audit`
- onboarding: `artifacts/loop-captures/2026-04-20/2205-visual-reset-onboarding-audit`
- portal: `artifacts/loop-captures/2026-04-20/2205-visual-reset-portal-audit`
- showcase: `artifacts/loop-captures/2026-04-20/2205-visual-reset-showcase-audit`

## Closure Condition For This Macro Task

This task closes only when:

- shared tokens exist
- button grammar is unified
- home, auth, onboarding, showcase and portal all visibly read as one system
- captures prove desktop and mobile coherence
- touched parity baselines are updated intentionally
