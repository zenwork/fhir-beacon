# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FHIR Beacon is a web components library for displaying, editing, and validating FHIR (Fast Healthcare Interoperability Resources) data entirely in the browser — no backend required. Components map idiomatically to the FHIR standard and work with any framework (React, Vue, Angular, plain JS, Lit).

Status: **ALPHA** — exploratory, not production-ready.

## Monorepo Structure

npm workspaces with three main packages:
- `packages/library` — the web component library (primary development target)
- `packages/app` — Deno-based showcase application
- `packages/server` — server component
- `packages/data` — shared FHIR test/demo data fixtures

## Commands

All commands run from `packages/library` unless noted.

```bash
npm run build               # vite build + tsc --emitDeclarationOnly
npm run test                # HEADLESS=true vitest run (all tests)
npm run vitest::debug       # vitest watch (interactive, use for single test runs)
npm run vitest::coverage    # coverage report
npm run tsc                 # TypeScript type check only
npm run start               # Storybook dev server on port 9999
npm run storybook::build    # Production Storybook build
npm run manifest::build     # Regenerate Custom Elements Manifest
npm run generate-barrels    # Regenerate barrel index.ts files
```

**Run a single test file:**
```bash
npm run vitest::debug -- src/components/resources/patient/patient.spec.ts
```

**Run tests matching a pattern:**
```bash
npm run vitest::debug -- --grep "should render"
```

**Linting:** Biomejs (`@biomejs/biome`) — check `biome.json` for configuration.

## Key Technologies

**Runtime dependencies:**
- [Lit](https://lit.dev/docs/) — web component framework; all components extend `LitElement`
- [@lit/context](https://lit.dev/docs/data/context/) — context API used to propagate `DisplayConfig` down the component tree
- [Shoelace](https://shoelace.style/) — UI component library used for styling primitives and layout elements
- [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath) — JSON path querying used internally

**Build & dev tooling:**
- [Vite](https://vite.dev/) — build tool (`vite.config.js`)
- [Vitest](https://vitest.dev/) — test runner (browser mode via Playwright/Chromium)
- [Storybook](https://storybook.js.org/docs) — component development and documentation (port 9999)
- [Biome](https://biomejs.dev/docs/) — linter and formatter (`biome.json`)
- [TypeScript](https://www.typescriptlang.org/docs/) — strict mode; types in `src/fhirtypes/`
- [barrelsby](https://github.com/bencoveney/barrelsby) — auto-generates `index.ts` barrel files

## FHIR Reference

- [FHIR R5 Overview](https://hl7.org/fhir/R5/overview.html) — start here for general FHIR concepts
- [Resource Index](https://hl7.org/fhir/R5/resourcelist.html) — all resources (Patient, Observation, Medication, etc.)
- [Data Types](https://hl7.org/fhir/R5/datatypes.html) — complex and primitive types (`HumanName`, `Address`, `Coding`, etc.)
- [Extensibility](https://hl7.org/fhir/R5/extensibility.html) — how FHIR extensions work (relevant to `src/components/special/extension/`)
- [Profiling / StructureDefinition](https://hl7.org/fhir/R5/profiling.html) — underpins `src/profiling/`
- [Bundle](https://hl7.org/fhir/R5/bundle.html) — resource container used in `src/components/foundation/bundle/`
- [Narrative](https://hl7.org/fhir/R5/narrative.html) — the `narrative` display mode maps to this

## Architecture

### Class Hierarchy

All components extend a chain rooted in `LitElement`:

```
LitElement
  └─ ConfigurableElement   (display config, context provision)
      └─ DataElement        (typed .data property, change detection)
          └─ PresentableElement  (multi-mode rendering dispatch)
              └─ BaseElement     (validate + decorate lifecycle)
                  ├─ Resource         (abstract FHIR resource base)
                  │   └─ DomainResource  (adds narrative + contained resources)
                  │       ├─ Patient, Observation, Medication, ...
                  └─ Backbone    (nested FHIR backbone elements)
```

All base classes live under `src/internal/`.

### Display Modes

Every component renders in one of four modes, switchable at runtime via the `DisplayMode` enum (`src/shell/displayMode.ts`):
- `display` — human-readable summary (default)
- `structure` — full data structure with all fields
- `narrative` — FHIR narrative HTML
- `debug` — raw JSON

Global `DisplayConfig` is propagated via the Lit Context API (`@lit/context`) — no prop drilling.

### Component Rendering Lifecycle

Override these methods when implementing a component:

1. `validate()` — assert FHIR constraints on `this.data`
2. `decorate()` — enrich data with contextual formatting
3. `renderDisplay()` — display mode template
4. `renderStructure()` — structure mode template
5. `renderNarrative()` — narrative mode template
6. `renderDebug()` — debug mode template

### Source Layout

```
src/
├── internal/          # Base classes (ConfigurableElement → BaseElement)
├── components/
│   ├── resources/     # Top-level FHIR resources (<fhir-patient>, etc.)
│   ├── complex/       # Complex datatypes (<fhir-address>, <fhir-coding>, etc.)
│   ├── primitive/     # <fhir-primitive> (handles all primitive types)
│   ├── special/       # Meta, Narrative, Reference
│   └── foundation/    # Bundle, etc.
├── shell/             # Layout layer: display mode enum, wrapper components
├── fhirtypes/         # TypeScript interfaces for FHIR data structures
├── codes/             # FHIR value sets and code systems
└── styles/            # CSS utilities
```

### Conventions

**Naming:**
- Custom elements: `<fhir-patient>`, `<fhir-human-name>`, `<fhir-observation-reference-range>` (kebab-case, singular)
- Data interfaces: `PatientData`, `AddressData` (suffix `Data`)
- Backbone files: `*-backbone.ts`
- Tests: `*.spec.ts` co-located with source
- Stories: `*.stories.ts` co-located with source

**Barrel exports:** Each directory has an auto-generated `index.ts` (managed by `barrelsby`). Run `generate-barrels` after adding new exports — do not manually maintain these files.

**TypeScript:** Strict mode. All FHIR data types are in `src/fhirtypes/`.

### Testing

Vitest with custom shadow DOM utilities. Tests use lit's `fixture()` helper and custom `.queryShadow()` / `.queryShadowDefaultSlot()` helpers (defined in `tests/`).

```typescript
it('should render', async () => {
  const el = await fixture<Patient>(html`<fhir-patient .data=${patientData} />`).first()
  expect(el.queryShadow({ select: 'fhir-human-name' })).toBeDefined()
})
```
