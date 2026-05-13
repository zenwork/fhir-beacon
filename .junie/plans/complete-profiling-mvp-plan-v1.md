---
sessionId: session-260512-114951-hf5n
---

# Requirements

### Overview & Goals
The goal of this task is to complete the remaining MVP validation gap and improve importer coverage for common real-world FHIR profile metadata. This involves closing one remaining roadmap validation gap (Reference target type narrowing) and improving the importer to handle pattern constraints, nested backbone elements, and basic named slices.

### Scope
- **In Scope**:
    - **Task A**: Reference target type narrowing validation.
    - **Task D**: Pattern constraint import (`pattern[x]`).
    - **Task C**: Nested backbone element import (one-level deep).
    - **Task B**: Basic named slice import (with simple fixed/pattern discriminators).
    - **Task E**: Roadmap documentation update.
- **Out of Scope**:
    - Full FHIRPath evaluation.
    - FHIR element condition evaluation.
    - Full discriminator-based slicing semantics (ordering, open/closed rules, reslicing).
    - Multi-level discriminator paths.
    - Two-level (or more) backbone nesting.


# Technical Design

### Current Implementation
The current validator (`profileValidator.ts`) checks cardinality and some constraints but ignores `typeNarrowing` on Reference types. The importer (`fhirStructureDefinitionImporter.ts`) emits "not imported yet" diagnostics for many common FHIR features like slices, nested elements, and pattern constraints.

### Key Decisions
- **Reference Validation**: Implementation will focus on `Reference` types where a `reference` string is present. Relative, absolute, and versioned references will be supported for type extraction. Identifier-only references will be skipped as they require server-side lookup.
- **Pattern Matching**: A new `structurallyContains` helper will be used for partial matching of objects and scalars. For MVP, array-shaped patterns will be handled as exact-matches or reported as unsupported to avoid complex FHIR slicing logic.
- **Backbone Elements**: To maintain stability, backbone elements will be assigned stable internal type names derived from their path (e.g., `PatientContact` for `Patient.contact`).
- **Slicing**: Named slices will be implemented as simplified discriminator-filtered cardinality constraints on the parent property. This avoids the complexity of full FHIR slicing while providing value for common cases.

### Proposed Changes
- **Validator**:
    - `packages/library/src/profiling/validation/profileValidator.ts`: Add `validateReferenceTypeNarrowing` and `extractReferenceTargetType`. Integrate into `validatePropertyDef`.
- **Importer**:
    - `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts`:
        - Update `importElement` to handle `patternValue`.
        - Add `backboneRegistry` and `importNestedElement` for one-level backbone support.
        - Add `importNamedSlice` for basic slicing support.
- **Fixtures & Tests**:
    - `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts`: Add new fixtures for pattern constraints, backbone elements, and identifier slices.
    - `packages/library/src/profiling/validation/profileValidator.spec.ts`: Add tests for Reference narrowing.
    - `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.spec.ts`: Add tests for pattern, backbone, and slice import.

### File Structure
- `packages/library/src/profiling/validation/profileValidator.ts` (Modified)
- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts` (Modified)
- `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts` (Modified)
- `packages/library/docs/profiling-roadmap.md` (Modified)


# Testing

### Validation Approach
Verification will be performed through automated unit tests.

### Key Scenarios
- **Reference Narrowing**:
    - Correct/incorrect relative references (e.g., `Patient/123`).
    - Correct absolute URLs and versioned references.
    - Handling of identifier-only references (should pass).
    - Validation of repeated reference arrays.
- **Pattern Constraints**:
    - Scalar patterns (e.g., `status: "final"`).
    - Nested object patterns (e.g., `CodeableConcept` with specific coding).
    - Objects with extra keys matching a pattern (should pass).
- **Backbone Elements**:
    - Correct population of `subdefs` for one-level nested elements.
    - Graceful skipping of two-level nested elements with a diagnostic.
- **Named Slices**:
    - Filtering of parent arrays based on child discriminators.
    - Cardinality enforcement on the filtered results.
    - Unsupported diagnostic for slices without simple discriminators.


# Delivery Steps

###   Step 1: Task A: Implement Reference Target Type Narrowing Validation
Implement `validateReferenceTypeNarrowing` and its helper `extractReferenceTargetType` in `packages/library/src/profiling/validation/profileValidator.ts`.
Integrate the validation into `validatePropertyDef` after cardinality checks.
Add comprehensive tests in `packages/library/src/profiling/validation/profileValidator.spec.ts` covering relative/absolute/versioned references and array items.

###   Step 2: Task D: Implement Pattern Constraint Import
Update `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts` to support `pattern[x]` elements.
Implement `patternConstraint` and `structurallyContains` for partial structural matching of scalars and objects.
Update fixtures in `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts` and update importer specs to verify the new behavior and removal of "unsupported" diagnostics for patterns.

###   Step 3: Task C: Implement Nested Backbone Element Import
Update `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts` to support one-level deep `BackboneElement` import.
Implement `backboneRegistry` to track and populate `subdefs` for nested elements.
Derive stable internal type names for backbone elements (e.g., `PatientContact`).
Add `contactBackboneStructureDefinitionFixture` and verify that nested elements are correctly imported into `subdefs`.

###   Step 4: Task B: Implement Basic Named Slice Import
Restructure `importFhirStructureDefinition` to precompute slice information.
Implement `importNamedSlice` in `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts`.
Implement discriminator discovery from child elements and add filtered cardinality constraints to parent properties.
Add `identifierSliceStructureDefinitionFixture` and verify that slices produce the correct validation constraints and diagnostics.

###   Step 5: Task E: Update Profiling Roadmap Documentation
Update `packages/library/docs/profiling-roadmap.md` to mark completed items.
Clarify the status of reference narrowing and importer coverage.
Explicitly list out-of-scope items in the "Out of scope" section to manage expectations.