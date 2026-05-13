# Profiling MVP Completion Plan

## Context

The profiling roadmap Tasks 1–7 are complete with one remaining MVP validation
gap: Reference target type narrowing is not yet enforced where feasible.

Additionally, the FHIR StructureDefinition importer
(`packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts`)
currently emits "not imported yet" diagnostics for several features commonly
seen in real-world FHIR profiles:

1. Named slices (`sliceName` elements)
2. Nested backbone elements (`Patient.contact.name`)
3. Pattern constraints (`pattern[x]`)
4. FHIRPath constraints and element conditions

The goal is to close the remaining MVP validation gap and improve importer
coverage for common real-world profile metadata without implying full FHIR
profiling support.

Reference target narrowing and pattern constraints are MVP closure work. Named
slices and nested backbone import should be implemented with intentionally narrow
semantics so the importer does not imply full FHIR slicing, nested validation, or
full HL7 StructureDefinition support.

FHIRPath constraints and element conditions remain out of scope.

---

## Implementation Order

Recommended order:

```text
A → D → C → B → E
```

Rationale:

1. **Task A** closes the one remaining roadmap validation checkbox and is
   validator-only.
2. **Task D** is a localized importer improvement for `pattern[x]`.
3. **Task C** establishes stable one-level backbone import/subdef metadata.
4. **Task B** is the highest-risk importer task because named slice import
   requires looking at related snapshot elements and generating
   discriminator-filtered cardinality constraints.
5. **Task E** updates roadmap documentation after behavior is finalized.

Alternative acceptable order:

```text
D → A → C → B → E
```

Tasks A and D are required for MVP closure. Tasks B and C are importer coverage
improvements with scoped semantics. If B or C expands beyond the limits below,
move the extra work to post-MVP rather than widening the milestone.

---

## Task A: Reference Target Type Narrowing Validation

**Files:**

- `packages/library/src/profiling/validation/profileValidator.ts`
- `packages/library/src/profiling/validation/profileValidator.spec.ts`

**What to do:**

In `validatePropertyDef`, after the cardinality check and before the constraint
loop, validate `typeNarrowing` only for `Reference` properties:

```typescript
if (def.type === "Reference" && def.typeNarrowing.length > 0 && value != null) {
	validateReferenceTypeNarrowing(
		def.typeNarrowing,
		value,
		fqk,
		validations,
		profileName,
		storageKey,
	);
}
```

Add `validateReferenceTypeNarrowing` near the bottom of the file.

Validation logic:

1. If `value` is an array, validate each item independently.
2. Attach repeated-reference errors to an indexed path, preferably:
    - scalar reference:
      `[{ node: storageKey }, { node: "reference" }]`
    - repeated reference:
      `[{ node: storageKey, index }, { node: "reference" }]`
3. If an item is not a non-null object, skip it.
    - Non-Reference shape validation is not this rule's job.
4. Extract:

   ```typescript
   (item as Record<string, unknown>).reference
   ```

5. If `reference` is not a string, skip it.
    - Identifier-only Reference data is unvalidatable without server lookup.
6. Extract a target resource type from the reference string using a private
   helper such as:

   ```typescript
   function extractReferenceTargetType(
   	reference: string,
   	allowedTypes: readonly string[],
   ): string | null
   ```

7. Extraction rules:
    - For relative references like `Patient/123`, take the first segment.
    - For versioned relative references like `Patient/123/_history/4`, still take
      the first segment.
    - For absolute URLs like `https://example.org/fhir/Patient/123`, scan URL path
      segments and return a segment included in the allowed narrowing list.
    - The MVP implementation should not try to fully parse every legal FHIR
      reference form.
8. If an extracted type is not included in `def.typeNarrowing`, add a validation
   error.

**Tests to add:**

- Wrong relative reference type produces one error.
- Correct relative reference passes.
- Correct absolute URL reference passes.
- Correct versioned relative reference passes.
- Identifier-only Reference object passes without error.
- Repeated `Reference[]` with one invalid item produces an indexed error.
- No validation occurs when `typeNarrowing` is empty.
- No validation occurs for non-`Reference` properties even if a future definition
  has `typeNarrowing`.

**Acceptance:**

Reference target type narrowing is enforced where feasible. No error is produced
when the narrowing list is empty, when `reference` is absent, or when
identifier-only Reference data is used. Repeatable Reference fields are validated
item-by-item.

This closes the remaining roadmap item currently described as primitive type
narrowing.

---

## Task D: Pattern Constraint Import

**Files:**

- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts`
- `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts`
- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.spec.ts`

**What to do:**

1. Remove the `pattern*` diagnostic loop from
   `reportUnsupportedElementMetadata`.

2. Rename the existing `FixedValue` helper type to something generic, for
   example:

   ```typescript
   type FhirElementValueConstraint = {
   	key: string;
   	value: unknown;
   };
   ```

   Use this type for both fixed and pattern value helpers.

3. Keep the existing fixed-value import behavior, but update type names
   accordingly:

   ```typescript
   function fixedValueFor(
   	element: FhirElementDefinition,
   ): FhirElementValueConstraint | undefined {
   	const record = element as Record<string, unknown>;
   	const fixedKeys = Object.keys(element).filter(
   		(key) => key.startsWith("fixed") && record[key] !== undefined,
   	);
   	if (fixedKeys.length === 0) return undefined;
   	const key = fixedKeys[0];
   	return { key, value: record[key] };
   }
   ```

4. Add `patternValueFor(element)` parallel to `fixedValueFor`:

   ```typescript
   function patternValueFor(
   	element: FhirElementDefinition,
   ): FhirElementValueConstraint | undefined {
   	const record = element as Record<string, unknown>;
   	const patternKeys = Object.keys(element).filter(
   		(key) => key.startsWith("pattern") && record[key] !== undefined,
   	);
   	if (patternKeys.length === 0) return undefined;
   	const key = patternKeys[0];
   	return { key, value: record[key] };
   }
   ```

5. Add `patternConstraint<T>(storageKey, patternValue)` that creates a
   `DefConstraintAssertion<T>` using partial structural matching.

6. Add a private helper such as:

   ```typescript
   function structurallyContains(actual: unknown, pattern: unknown): boolean
   ```

   MVP semantics:

    - `null` and `undefined`: compare directly with `Object.is`.
    - scalar values: compare with `Object.is`, falling back to JSON equality only
      if necessary.
    - objects: every key in `pattern` must exist in `actual` and recursively
      match.
    - arrays:
        - either exact JSON equality only, with tests/comments documenting that this
          is not complete FHIR `pattern[x]` array semantics; or
        - leave array-shaped patterns unsupported with a diagnostic.

7. In `importElement`, after extracting `fixedValue`, also extract
   `patternValue`.

   Add constraints for both when present:

   ```typescript
   const fixedValue = fixedValueFor(element);
   const patternValue = patternValueFor(element);
   const constraints = [
   	...(fixedValue ? [fixedValueConstraint<T>(storageKey, fixedValue.value)] : []),
   	...(patternValue ? [patternConstraint<T>(storageKey, patternValue.value)] : []),
   ];
   ```

8. Keep fixed and pattern constraints self-contained where possible.

   If the validator continues to call all constraints as:

   ```typescript
   constraint(data, fixedValue)
   ```

   then pattern constraints should simply ignore the second argument.

   Optionally set metadata for test/debug visibility:

   ```typescript
   constraint._constraintType = "pattern";
   ```

9. In `fhirStructureDefinitionFixtures.ts`, move the existing `patternCode`
   element out of `unsupportedStructureDefinitionFixture` into a new
   `patternStructureDefinitionFixture`.

10. Update importer specs so supported `pattern*` elements no longer produce the
    old "not imported yet" diagnostic.

**Tests to add:**

- Import with `patternCode: "final"`:
    - no unsupported pattern warning
    - one imported constraint
    - validating `"final"` passes
    - validating `"preliminary"` fails
- Import with nested `patternCodeableConcept`:
    - matching object passes
    - object with extra keys still passes when all pattern keys match
    - object missing a required pattern key fails
    - object with wrong nested scalar fails
- If array-shaped patterns are exact-match only, add a test name/comment
  explicitly documenting that array pattern matching is exact-match MVP behavior,
  not complete FHIR semantics.
- If array-shaped patterns are unsupported, assert a clear diagnostic.

**Acceptance:**

Pattern elements import as partial-match constraints for scalar and object
values. Array-shaped patterns are either exact-match only with explicit
documentation, or unsupported with a diagnostic. The old "FHIR pattern* metadata
is not imported yet" diagnostic is gone for supported pattern values.

---

## Task C: Nested Backbone Element Import

**Files:**

- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts`
- `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts`
- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.spec.ts`

**What to do:**

1. Do not add raw `"BackboneElement" as TypeName`.

   Instead, special-case FHIR `BackboneElement` in the importer and derive a
   stable internal backbone type name from the element path.

   Example mappings:

   ```text
   Patient.contact -> PatientContact
   Observation.component -> ObservationComponent
   ```

   Add a helper such as:

   ```typescript
   function backboneTypeNameFor(rootPath: string, relativePath: string): TypeName {
   	return `${rootPath}${capitalizePath(relativePath)}` as TypeName;
   }
   ```

   where `capitalizePath("contact")` returns `Contact`.

2. Update top-level element import so a top-level `BackboneElement` can be
   imported as a normal `PropertyDef` with this stable internal type name.

   Without this special case, a top-level element like `Patient.contact` will be
   skipped as an unsupported type and cannot be registered for nested import.

3. Add a `Map<string, PropertyDef<T>>` called `backboneRegistry` in
   `importFhirStructureDefinition`.

   Pass it into `importElement`.

4. After a top-level backbone property is imported successfully, register it by
   full FHIR path:

   ```typescript
   backboneRegistry.set(element.path, importedPropDef);
   ```

5. Replace the current early-return for nested paths with a call to:

   ```typescript
   importNestedElement(profile, rootPath, element, backboneRegistry, diagnostics)
   ```

6. `importNestedElement<T>` logic:

    - Compute `relativePath` by removing `${rootPath}.`.
    - Split `relativePath` at the first `.`:
        - `parentRelPath`
        - `childRelPath`
    - If `childRelPath` contains another `.`, emit a warning and return.
        - Two-level nesting remains post-MVP.
    - Look up the parent `PropertyDef` from `backboneRegistry` by full path:

      ```typescript
      `${rootPath}.${parentRelPath}`
      ```

    - If no parent is found, emit `skipped-element` and return.
    - Initialize `parent.subdefs` if undefined.
    - Process the child element using existing helper functions:
        - type
        - cardinality
        - bindings
        - binding strength
        - fixed constraints
        - pattern constraints, if Task D is already complete
        - `mustSupport`
        - `isModifier`
        - `isSummary`
    - Call `definitionProperty(...)` to create the child `PropertyDef`.
    - Store the child property in:

      ```typescript
      parent.subdefs.set(storageKey, childPropDef);
      ```

7. Keep nested backbone subdefs as importer metadata only.

   Do not claim that normal property `subdefs` are validated by
   `validateProfile` unless a separate validator task is added.

8. Update the existing unsupported fixture:
    - One-level nested backbone elements should no longer trigger the old
      unsupported warning.
    - Keep a two-level nested element in the unsupported fixture to continue
      testing the skipped/unsupported path.

**Fixture to add:**

`contactBackboneStructureDefinitionFixture`

Minimal Patient StructureDefinition with:

- `Patient`
- `Patient.contact`
    - type: `BackboneElement`
    - cardinality: `0..*`
- `Patient.contact.name`
    - type: `HumanName`
    - cardinality: `0..1`

**Tests to add:**

- Importing the contact backbone fixture creates a top-level `contact` property.
- The `contact` property has a stable internal type name, e.g.
  `PatientContact`.
- The `contact` property has `subdefs`.
- `contact.subdefs` contains `name`.
- `name` subdef has cardinality `0..1`.
- `name` subdef has type `HumanName`.
- A two-level nested path still emits a warning and is skipped.
- Tests do not assert validator behavior for normal backbone subdefs unless a
  validator task is added.

**Acceptance:**

One-level backbone sub-fields populate `subdefs` on the parent property.
Top-level `BackboneElement` properties are represented using stable internal
profiled backbone type names such as `PatientContact`. Two-level nesting is
gracefully skipped with a warning. Backbone subdefs are importer metadata only.

---

## Task B: Basic Named Slice Import

**Files:**

- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts`
- `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts`
- `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.spec.ts`

**What to do:**

Implement deliberately narrow named slice support.

This task should not imply full FHIR slicing support.

### Required importer restructuring

The current importer processes each snapshot element independently:

```typescript
for (const element of elements) {
	importElement(profile, rootPath, element, diagnostics);
}
```

Named slice import needs access to related slice child elements such as:

```text
Patient.identifier:mr.system
```

when processing the slice root:

```text
Patient.identifier:mr
```

Therefore, add one of the following:

1. Pass the full `elements` array into `importElement`/`importNamedSlice`; or
2. Precompute a map of slice root paths to child elements, for example:

   ```typescript
   Map<string, FhirElementDefinition[]>
   ```

The precomputed map approach is preferred for clarity.

### Slice detection

Replace the current early-return block for slicing with logic equivalent to:

```typescript
if (element.sliceName) {
	importNamedSlice(profile, rootPath, element, sliceChildrenByRootPath, diagnostics);
	return;
}

if (relativePath.includes(":")) {
	diagnostics.push({
		severity: "warning",
		code: "unsupported-feature",
		path: element.path,
		message: "FHIR slice child element is not imported outside named slice processing",
	});
	return;
}
```

### Parent lookup

For a slice root like:

```text
Patient.identifier:mr
```

do not look up the parent by the full relative path `identifier:mr`.

Instead derive the unsliced parent key:

```typescript
const parentRelativePath = relativePath.split(":")[0];
const parent = profile.get(parentRelativePath);
```

If the parent property is missing, emit a `skipped-element` diagnostic and
return.

### Supported MVP slice semantics

Only import a named slice as a validation constraint when a simple fixed or
pattern discriminator can be discovered from one of the slice's child elements.

Supported child examples:

```text
Patient.identifier:mr.system
Patient.identifier:mr.type
```

MVP limitations:

- The discriminator child path must be one segment below the slice root.
- Multi-level discriminator paths are post-MVP.
- Reslicing is unsupported.
- Ordered slicing is unsupported.
- Open/closed slicing rule enforcement is unsupported.
- Full discriminator semantics are unsupported.
- Do not create a count-only slice constraint without a discriminator, because
  that can validate the wrong data.

### Discriminator discovery

For a slice root:

```text
Patient.identifier:mr
```

inspect child elements with paths beginning:

```text
Patient.identifier:mr.
```

Find the first child element where:

- the child path below the slice root is exactly one segment, and
- the child has either a scalar `fixed[x]` value or a supported scalar/object
  `pattern[x]` value.

Examples:

```text
Patient.identifier:mr.system fixedUri = "urn:mr"
Patient.identifier:mr.type patternCodeableConcept = { ... }
```

If no simple discriminator is found, emit an `unsupported-feature` diagnostic and
do not add a slice constraint.

### Slice cardinality constraint

Append a constraint to the parent `PropertyDef.constraints`.

The constraint should:

1. Resolve the parent array from the data using the parent storage key.
2. If the parent value is not an array:
    - allow normal cardinality validation to handle absent/non-array shape where
      applicable; and
    - avoid throwing.
3. Filter array items whose discriminator child value structurally matches the
   fixed or pattern discriminator value.
4. Run `checkCardinality` against the filtered matching items using the slice
   root's `min..max`.
5. Return a validation failure when the matching item count violates the slice
   cardinality.

Pseudo-logic:

```typescript
const matchingItems = parentArray.filter((item) => {
	const actual = resolveValue(item, discriminatorChildPath);
	return structurallyContains(actual, discriminatorValue);
});

const cardResult = checkCardinality(matchingItems, sliceCardinality);
```

For fixed discriminators, exact equality is sufficient. For pattern
discriminators, reuse the Task D structural matching helper.

### Diagnostics

When a named slice is successfully imported, emit an informational warning-level
diagnostic such as:

```text
Imported named slice as a simplified discriminator-filtered cardinality constraint; full FHIR slicing semantics, ordering, open/closed rules, and reslicing are not enforced.
```

When a named slice cannot be imported, emit a clear `unsupported-feature`
diagnostic.

### Fixture to add

`identifierSliceStructureDefinitionFixture`

Minimal Patient StructureDefinition with:

- `Patient`
- `Patient.identifier`
    - type: `Identifier`
    - cardinality: `0..*`
- `Patient.identifier:mr`
    - `sliceName: "mr"`
    - cardinality: `1..1`
- `Patient.identifier:mr.system`
    - type: `uri`
    - `fixedUri: "urn:mr"`

### Tests to add

- Importing the fixture adds one constraint to the parent `identifier` property.
- Importing the fixture emits the simplified-slicing diagnostic.
- Validating data with zero matching identifiers produces an error.
- Validating data with one matching identifier passes.
- Validating data with unrelated identifiers but no matching discriminator
  produces an error.
- Validating data with more matching identifiers than the slice `max` produces an
  error.
- A slice without a simple discriminator emits an unsupported diagnostic and does
  not add a count-only constraint.
- Existing tests expecting `"FHIR slicing and named slices are not imported yet"`
  are updated to assert the new diagnostic behavior rather than deleted.

**Acceptance:**

Named slices with a simple fixed or supported pattern child discriminator are
imported as discriminator-filtered cardinality constraints on the unsliced parent
property. Slices without a simple discriminator are skipped with a clear
diagnostic. Complete FHIR slicing semantics remain out of scope.

---

## Task E: Roadmap Update

**File:**

- `packages/library/docs/profiling-roadmap.md`

**What to do:**

1. In Task 3, check off the remaining narrowing item.

   Prefer updating the wording from:

   ```markdown
   - [ ] Validate primitive type narrowing where feasible.
   ```

   to:

   ```markdown
   - [x] Validate Reference target type narrowing where feasible.
   ```

2. Update the "Current Assessment" / "Remaining concerns" prose.

   Remove or revise statements like:

   ```markdown
   - Primitive type narrowing (e.g. Reference target types) is not yet enforced.
   ```

   Replace with wording such as:

   ```markdown
   - Reference target type narrowing is enforced where a concrete `reference`
     string is available. Identifier-only references remain unvalidated without
     terminology/server resolution.
   ```

3. Add a new section after Task 7:

   ```markdown
   ### 8. Complete Importer Coverage (MVP Closure)

   - [x] Import supported `pattern[x]` constraints as scalar/object partial-match
         constraints.
   - [x] Validate Reference target type narrowing where feasible.
   - [x] Import one-level backbone element metadata into parent `subdefs`.
   - [x] Import simple named slices as discriminator-filtered cardinality
         constraints.
   ```

   If Tasks B or C are intentionally deferred, leave their items unchecked.

4. In the "Out of scope" section, explicitly add:

    - Full FHIRPath constraint evaluation.
    - FHIR element condition evaluation.
    - Full discriminator-based slicing semantics.
    - Slice ordering enforcement.
    - Open/closed slicing rule enforcement.
    - Reslicing.
    - Generic validator-side validation of normal property subdefs/backbone
      subdefs.
    - Complete FHIR `pattern[x]` array semantics if Task D implements exact array
      matching only.

5. Update the "Full HL7 StructureDefinition.snapshot.element[] import" wording if
   needed.

   Since the importer now supports more metadata, prefer wording such as:

   ```markdown
   - Complete HL7 `StructureDefinition.snapshot.element[]` semantics.
   ```

   instead of implying no importer exists.

**Acceptance:**

The roadmap accurately reflects the MVP closure work and clearly distinguishes
supported Beacon importer behavior from full FHIR profiling semantics.

---

## Critical Files

| File | Tasks |
| --- | --- |
| `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.ts` | B, C, D |
| `packages/library/src/profiling/importer/fhirStructureDefinitionImporter.spec.ts` | B, C, D |
| `packages/library/src/profiling/fixtures/fhirStructureDefinitionFixtures.ts` | B, C, D |
| `packages/library/src/profiling/validation/profileValidator.ts` | A |
| `packages/library/src/profiling/validation/profileValidator.spec.ts` | A |
| `packages/library/docs/profiling-roadmap.md` | E |

---

## Verification

Run from `packages/library`:

```sh
npm test -- src/profiling src/components/special/extension
npm run build
```

All existing tests must continue to pass.

Previously failing or warning-oriented assertions in
`fhirStructureDefinitionImporter.spec.ts` must be updated, not deleted, to
reflect the new diagnostic messages and the deliberately partial semantics.

---

## Explicit Non-Goals

The following remain out of scope for this MVP closure plan:

- Full FHIRPath evaluation.
- FHIR element condition evaluation.
- Complete FHIR slicing/discriminator semantics.
- Slice ordering enforcement.
- Open/closed slicing rule enforcement.
- Reslicing.
- Full IG/package loading.
- Terminology expansion beyond existing local value set support.
- Generic validator-side traversal of normal property `subdefs`.
- Complete FHIR `pattern[x]` array semantics unless explicitly implemented and
  tested.