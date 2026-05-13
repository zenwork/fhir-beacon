---
"fhir-beacon": minor
---

Add StructureDefinition importer, validation, and extension rendering coverage

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
