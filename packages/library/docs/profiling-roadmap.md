# FHIR Extension and Profiling Roadmap

This document captures the current state of FHIR extension and profiling support
and breaks the remaining work into implementation tasks.

## Current Assessment

Tasks 1–3 are complete. The profiling system has moved from a rough prototype to
a working internal model with generic validation.

What exists today:

- A stable profile DSL in `src/profiling`:
  - `profile`, `define`, `extend`, `slice`, `StructureDefinition`
  - Extension location metadata (`root`, `primitive`, `modifier`, `nested`)
  - Label and display fields on extension definitions
  - Storage keys separated from declared element keys; `clone()` preserves both
- A generic validation engine in `src/profiling/validation`:
  - `validateProfile` replaces the old ad-hoc logic in `StructureDefinition`
  - Cardinality enforcement (`0..1`, `1..1`, `0..*`, `1..*`)
  - Property constraints with profile-name suffix
  - Inline `Choice[]` binding validation for `code`, `Coding`, and
    `CodeableConcept` values
  - Root extension validation by URL and cardinality
  - Primitive extension validation (`_field.extension`) by URL and value type
  - Nested complex extension validation
  - No more hard-coded CH Core paths — all errors come from profile metadata
- Component integration:
  - FHIR components accept a `.profile` property.
  - `FhirDataElement` invokes `validateProfile` during data preparation.
- Extension rendering:
  - `<fhir-extension>` can render many `value[x]` shapes.
  - Normal `extension` arrays are rendered by the base presentable element.
  - Primitive and complex extension rendering still requires custom `extendRender`
    callbacks; generic rendering is the next milestone.

Remaining concerns:

- Primitive type narrowing (e.g. Reference target types) is not yet enforced.
- Primitive and complex extension rendering is not yet driven automatically by
  profile metadata.
- `modifierExtension` display is still unimplemented.
- The internal model is not yet an adapter for real HL7 `StructureDefinition` JSON.

## Scope Decision

The next milestone should be an internal Beacon profile system with FHIR-inspired
semantics. Full HL7 `StructureDefinition` import should come after the internal
profile model and validator are reliable.

The supported first milestone should cover:

- Profile-defined fields.
- Cardinality checks.
- Required value checks.
- `value[x]` choice checks.
- Code and `CodeableConcept` binding checks.
- Root extensions.
- Primitive extensions using `_field.extension`.
- Basic complex extensions.
- Explicit `modifierExtension` display.

Out of scope for the first milestone:

- Full FHIRPath evaluation.
- Full slicing/discriminator semantics.
- Complete IG package loading.
- Full HL7 `StructureDefinition.snapshot.element[]` import.
- Terminology expansion beyond the existing local value set support.

## Standard Verification Criteria

Unless a task is documentation-only or explicitly marked otherwise, completed
work should pass both:

- `npm test -- src/profiling src/components/special/extension`
- `npm run build`

Run both commands from `packages/library`.

## Tasks

### 1. Stabilize The Baseline

- [x] Remove accidental `.DS_Store` files from the working tree.
- [x] Remove or replace noisy `console.log` calls in profiling tests.
- [x] Fix `StructureDefinition.clone()` so cloned definitions preserve the
      original property key and choice metadata.
- [x] Add regression tests for choice keys such as `valueQuantity` and
      `effectiveDateTime`.
- [x] Verify the skipped extension story files still work.
- [x] Rename working extension stories from `.stories.skip.ts` to `.stories.ts`.
- [x] Run targeted profiling and extension tests.

Acceptance criteria:

- `npm test -- src/profiling src/components/special/extension` passes.
- `npm run build` passes from `packages/library`.
- Profile string output no longer contains duplicated choice prefixes such as
  `valuevalueQuantity` or `effectiveeffectiveDateTime`.
- Storybook discovers the extension stories without manual file renames.

### 2. Formalize The Internal Profile Model

- [x] Document the internal profile format as Beacon profile definitions.
- [x] Decide whether to rename the internal class or docs language to avoid
      implying full HL7 `StructureDefinition` support.
- [x] Separate map storage keys from declared profile element keys.
- [x] Add explicit extension location metadata:
  - root `extension`
  - primitive `_field.extension`
  - `modifierExtension`
- [x] Add explicit fields for extension label/display metadata.
- [x] Add unit tests for simple, primitive, and complex extension definitions.

Acceptance criteria:

- Internal definitions can represent root, primitive, and complex extensions
  without custom renderer-only metadata.
- Tests assert the internal model shape directly.

### 3. Build Generic Profile Validation

- [x] Create a reusable profile validation engine instead of embedding validation
      logic directly in `StructureDefinition.validate()`.
- [x] Add a generic path resolver for:
  - object fields
  - arrays
  - nested backbone elements
  - primitive underscore elements
- [x] Enforce cardinality:
  - `0..1`
  - `1..1`
  - `0..*`
  - `1..*`
- [x] Enforce required/present values.
- [x] Enforce `value[x]` choice constraints.
- [ ] Validate primitive type narrowing where feasible.
- [x] Validate `code` bindings through existing `Codes`/`ValueSets` support.
- [x] Validate `Coding` bindings.
- [x] Validate `CodeableConcept` bindings.
- [x] Validate root extensions by URL and value type.
- [x] Validate primitive extensions by URL and value type.
- [x] Validate nested complex extensions.
- [x] Remove the hard-coded `"wrong binding value"` validation path.
- [x] Add tests for each validation rule.

Acceptance criteria:

- Profile validation errors are generated from profile metadata, not hard-coded
  profile-specific branches.
- Existing component validation and profile validation errors share the same
  `FqkMap` error flow.
- ContactPoint primitive extension binding validation works without CH Core
  hard-coded paths.

### 4. Finish Extension Rendering

- [x] Render profile-defined primitive extensions automatically.
- [x] Render profile-defined root extensions with profile labels where available.
- [x] Render nested complex extensions consistently in display and structure
      modes.
- [x] Pass validation errors into nested extension components.
- [x] Render `modifierExtension` distinctly from normal `extension`.
- [x] Avoid requiring custom `extendRender` callbacks for ordinary profile
      extension display.
- [x] Keep custom `extendRender` and `overrideRender` as escape hatches.

Acceptance criteria:

- Primitive extension data like `_use.extension` appears automatically when the
  active profile defines it.
- Validation errors appear next to the rendered extension value.
- `modifierExtension` is visible and distinguishable.

### 5. Add Representative Fixtures

- [x] Simple Patient extension fixture.
- [x] Complex Patient extension fixture.
- [x] Primitive extension fixture such as `_birthDate` or `_use`.
- [x] CH Core ContactPoint fixture.
- [x] Blood pressure Observation profile fixture.
- [x] Invalid variants for each fixture to exercise validation errors.

Acceptance criteria:

- Fixtures are small enough to understand quickly.
- Each fixture has at least one passing and one failing validation test.

### 6. Documentation And Examples

- [x] Replace the stub `docs/profiling.md` with actual usage docs.
- [x] Document the difference between Beacon profile definitions and full FHIR
      `StructureDefinition` JSON.
- [x] Add examples for:
  - defining a base profile
  - constraining a field
  - binding a code
  - defining a root extension
  - defining a primitive extension
  - defining a complex extension
- [x] Add a short "known limitations" section.

Acceptance criteria:

- A user can create a small profile from the docs without reading tests.
- The docs are explicit about unsupported FHIR profiling features.

### 7. Optional Later Milestone: FHIR StructureDefinition Import

- [x] Add an adapter from FHIR R5 `StructureDefinition.snapshot.element[]` to the
      internal Beacon profile model.
- [x] Support basic cardinality, type, binding, and fixed value metadata from
      real FHIR definitions.
- [x] Add importer tests using small checked-in FHIR profile fixtures.
- [x] Defer full slicing/discriminator support until the basic importer is
      stable.

Acceptance criteria:

- A small real FHIR profile can be imported into the internal model.
- Unsupported features are reported clearly instead of silently ignored.

## Suggested Implementation Order

1. Stabilize the baseline.
2. Fix the internal model key/choice behavior.
3. Build profile validation for normal properties.
4. Build profile validation for extensions.
5. Generalize extension rendering.
6. Expand examples and docs.
7. Consider real FHIR `StructureDefinition` import.

## Verification Commands

Run from `packages/library`:

```sh
npm test -- src/profiling src/components/special/extension
npm run build
npm run storybook
```

Use Storybook to manually inspect extension rendering after story activation.
