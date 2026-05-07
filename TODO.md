# TODO

## Extension Stories (skipped)

Two story files were added in branch `122-add-master-detail-feature-to-bundle` but deliberately skipped. They contain complete, working stories and all data fixtures are ready — they just need renaming to activate.

- `packages/library/src/components/special/extension/extension-simple1.stories.skip.ts`
  — 14 stories covering primitive extension types (string, boolean, date, decimal, uri, code, etc.)

- `packages/library/src/components/special/extension/extension-simple2.stories.skip.ts`
  — 15+ stories covering complex extension types (CodeableConcept, Coding, HumanName, Quantity, Reference, etc.)

Data fixtures: `packages/library/src/components/special/extension/extension-simple.story.data.ts`

To activate: rename both files from `.stories.skip.ts` → `.stories.ts`.
