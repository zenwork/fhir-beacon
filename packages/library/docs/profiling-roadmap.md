# FHIR Extension and Profiling Roadmap

This document captures the current state of FHIR extension and profiling support
and breaks the remaining work into implementation tasks.

## Current Assessment

The existing implementation is a useful prototype, not complete FHIR
`StructureDefinition` support yet.

What exists today:

- A small profile DSL in `src/profiling`:
  - `profile`
  - `define`
  - `extend`
  - `slice`
  - `StructureDefinition`
- Component integration:
  - FHIR components accept a `.profile` property.
  - `FhirDataElement` invokes profile validation during data preparation.
- Extension rendering:
  - `<fhir-extension>` can render many `value[x]` shapes.
  - Normal `extension` arrays are rendered by the base presentable element.
  - Some primitive extension examples work through custom `extendRender`
    callbacks.

Main concerns:

- Profile validation only executes hand-written constraints and one hard-coded
  primitive-extension binding error.
- Cardinality, type narrowing, value set bindings, choice constraints, and nested
  backbone validation are not generally enforced.
- Primitive extension rendering is not generic enough.
- `modifierExtension` is still effectively unimplemented.
- The current internal model resembles FHIR profiling concepts, but it is not yet
  an adapter for real HL7 `StructureDefinition` JSON.

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
- [ ] Separate map storage keys from declared profile element keys.
- [ ] Add explicit extension location metadata:
  - root `extension`
  - primitive `_field.extension`
  - `modifierExtension`
- [ ] Add explicit fields for extension label/display metadata.
- [ ] Add unit tests for simple, primitive, and complex extension definitions.

Acceptance criteria:

- Internal definitions can represent root, primitive, and complex extensions
  without custom renderer-only metadata.
- Tests assert the internal model shape directly.

### 3. Build Generic Profile Validation

- [ ] Create a reusable profile validation engine instead of embedding validation
      logic directly in `StructureDefinition.validate()`.
- [ ] Add a generic path resolver for:
  - object fields
  - arrays
  - nested backbone elements
  - primitive underscore elements
- [ ] Enforce cardinality:
  - `0..1`
  - `1..1`
  - `0..*`
  - `1..*`
- [ ] Enforce required/present values.
- [ ] Enforce `value[x]` choice constraints.
- [ ] Validate primitive type narrowing where feasible.
- [ ] Validate `code` bindings through existing `Codes`/`ValueSets` support.
- [ ] Validate `Coding` bindings.
- [ ] Validate `CodeableConcept` bindings.
- [ ] Validate root extensions by URL and value type.
- [ ] Validate primitive extensions by URL and value type.
- [ ] Validate nested complex extensions.
- [ ] Remove the hard-coded `"wrong binding value"` validation path.
- [ ] Add tests for each validation rule.

Acceptance criteria:

- Profile validation errors are generated from profile metadata, not hard-coded
  profile-specific branches.
- Existing component validation and profile validation errors share the same
  `FqkMap` error flow.
- ContactPoint primitive extension binding validation works without CH Core
  hard-coded paths.

### 4. Finish Extension Rendering

- [ ] Render profile-defined primitive extensions automatically.
- [ ] Render profile-defined root extensions with profile labels where available.
- [ ] Render nested complex extensions consistently in display and structure
      modes.
- [ ] Pass validation errors into nested extension components.
- [ ] Render `modifierExtension` distinctly from normal `extension`.
- [ ] Avoid requiring custom `extendRender` callbacks for ordinary profile
      extension display.
- [ ] Keep custom `extendRender` and `overrideRender` as escape hatches.

Acceptance criteria:

- Primitive extension data like `_use.extension` appears automatically when the
  active profile defines it.
- Validation errors appear next to the rendered extension value.
- `modifierExtension` is visible and distinguishable.

### 5. Add Representative Fixtures

- [ ] Simple Patient extension fixture.
- [ ] Complex Patient extension fixture.
- [ ] Primitive extension fixture such as `_birthDate` or `_use`.
- [ ] CH Core ContactPoint fixture.
- [ ] Blood pressure Observation profile fixture.
- [ ] Invalid variants for each fixture to exercise validation errors.

Acceptance criteria:

- Fixtures are small enough to understand quickly.
- Each fixture has at least one passing and one failing validation test.

### 6. Documentation And Examples

- [ ] Replace the stub `docs/profiling.md` with actual usage docs.
- [ ] Document the difference between Beacon profile definitions and full FHIR
      `StructureDefinition` JSON.
- [ ] Add examples for:
  - defining a base profile
  - constraining a field
  - binding a code
  - defining a root extension
  - defining a primitive extension
  - defining a complex extension
- [ ] Add a short "known limitations" section.

Acceptance criteria:

- A user can create a small profile from the docs without reading tests.
- The docs are explicit about unsupported FHIR profiling features.

### 7. Optional Later Milestone: FHIR StructureDefinition Import

- [ ] Add an adapter from FHIR R5 `StructureDefinition.snapshot.element[]` to the
      internal Beacon profile model.
- [ ] Support basic cardinality, type, binding, and fixed value metadata from
      real FHIR definitions.
- [ ] Add importer tests using small checked-in FHIR profile fixtures.
- [ ] Defer full slicing/discriminator support until the basic importer is
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
