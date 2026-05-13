# fhir-beacon

## 0.3.0

### Minor Changes

- 19453bb: Add StructureDefinition importer, validation, and extension rendering coverage

  - add FHIR StructureDefinition importer with diagnostics and support for:
    - value[x] mapping
    - fixed/pattern constraints
    - named slice cardinality constraints
    - modifier extension import handling
  - add profile validation layer:
    - cardinality checks
    - choice-group exclusivity checks
    - reference target narrowing checks
    - extension binding/cardinality checks
  - expand profiling fixtures, stories, and tests for importer/validator/rendering flows
  - improve extension rendering behavior and labels, including modifier-extension scenarios
  - add local JSON key/value search indexing in app file chooser and query URL normalization in remote chooser
  - integrate Storybook Vitest addon/workspace setup and update related build/test tooling
  - refresh profiling docs/roadmap and importer documentation

### Patch Changes

- 51b9f84: updated all library dependencies

## 0.2.0

### Minor Changes

- 0fccfee: - Implement comprehensive FHIR profiling support, including StructureDefinition builders and validation
  - Add Master/Detail feature for Bundle resources to support navigational patterns
  - Enhance FHIR Extension support:
    - Complete type coverage for all OpenType values
    - Fix primitive extension support for arrays
    - Integrate extensions into structure and narrative views
  - Upgrade Storybook from v8.6 to v10.3
  - Add codebase guidance and developer documentation

### Patch Changes

- 45cf91a: Fix README background link text.
- 25f044f: Treat falsy property values as defined in `hasAll`.

## 0.1.4

### Patch Changes

- cb95965: modified github workflows

## 0.1.3

### Patch Changes

- e412876: added checkbox display for boolean primitves
- 7c037a5: remove unecesary project files and dependencies

## 0.1.2

### Patch Changes

- 7e54b5b: bug fix: decimal primitve type must maintain/dsiplay trailing zeros after decimal.
- 7e54b5b: documented all primitive types in storybook and fixed a few converters and corresonding tests.

## 0.1.1

### Patch Changes

- updated package.json metadata

## 0.1.0

### Minor Changes

- 156552a: Added/Improved documentation for user-land

## 0.0.23

### Patch Changes

- Setup Changesets
