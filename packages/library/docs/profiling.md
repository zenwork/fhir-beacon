# Beacon Profile Definitions

FHIR Beacon currently uses an internal profile model to describe extra
constraints and extension metadata for components. This model is inspired by
FHIR `StructureDefinition`, but it is not a full HL7 `StructureDefinition`
implementation yet.

The current TypeScript class is still named `StructureDefinition` because it
represents the same kind of concept inside the library. In documentation, refer
to these objects as **Beacon profile definitions** unless discussing the class
name directly. Reserve **FHIR StructureDefinition** for real HL7 profile JSON.

Use this internal model when you want to:

- describe fields shown by a component;
- constrain cardinality;
- attach value set bindings;
- define profile-specific extensions;
- add custom render callbacks as an escape hatch.

## Core Concepts

A Beacon profile is a `StructureDefinition<T>` built with the `profile()` DSL:

```ts
import { ContactPoint } from "../src/DatatypeDef";
import { code } from "../src/PrimitiveDef";
import { define, profile } from "../src/profiling";
import type { ContactPointData } from "../src/components";

const contactPointBase = profile<ContactPointData>({
	type: ContactPoint,
	props: [
		define.oneOf("system", code).optional(),
		define.oneOf("value", code).optional(),
	],
});
```

The resulting object stores definition entries in `props`, a map keyed by the
flattened element path. The definition entry itself keeps the declared key,
choice metadata, type, cardinality, bindings, and render metadata. Stored
entries also include `storageKey`, which is the flattened key used by the map.
For example, a `value[x]` entry can have `key: "Quantity"`,
`choice: "value"`, and `storageKey: "valueQuantity"`.

## Properties

Use `define` for normal resource or datatype properties.

```ts
define.oneOf("status", code);
define.optionOf("issued", instant);
define.optionalListOf("identifier", Identifier);
```

Current property fields include:

- `key`: declared data key, or choice suffix for `value[x]` style elements.
- `storageKey`: flattened map key used for internal lookup.
- `choice`: optional choice prefix such as `value` or `effective`.
- `type`: primitive, datatype, or resource name.
- `typeNarrowing`: allowed target types for references and similar fields.
- `cardinality`: string such as `0..1`, `1..1`, `0..*`, or `1..*`.
- `bindings`: local value set id or inline choices.
- `bindingStrength`: FHIR-like binding strength metadata.
- `constraints`: custom validation callbacks.
- `subdefs`: nested definitions for backbone elements.

## Choice Elements

FHIR `value[x]` fields are represented by storing the choice prefix separately
from the concrete type suffix.

```ts
define.choiceOf("value", "Quantity", Quantity).optional();
define.choiceOf("value", "CodeableConcept", CodeableConcept).optional();
define.choiceOf("effective", "DateTime", dateTime).optional();
```

These produce flattened map keys like `valueQuantity` and
`effectiveDateTime`, while preserving the declared key and `choice` metadata on
the definition entry.

## Backbone Elements

Use a nested profile to describe backbone properties.

```ts
define.backboneListOf(
	"component",
	profile<ObservationData>({
		type: new ResourceDef("ObservationComponent"),
		props: [
			define.oneOf("code", CodeableConcept),
			define.choiceOf("value", "Quantity", Quantity).optional(),
		],
	}),
);
```

Backbone definitions are stored in the parent property's `subdefs` map.

## Extensions

Use `extend` for FHIR extensions.

### Root Extensions

```ts
extend.withOne("ParticipationAgreement", {
	url: "http://example.org/fhir/StructureDefinition/participation-agreement",
	valueType: "uri",
});
```

### Primitive Extensions

Primitive extensions describe data stored on underscore siblings such as
`_use.extension`.

```ts
extend.primitive("use", "http://example.org/fhir/StructureDefinition/use-extra", [
	{
		url: "http://example.org/fhir/StructureDefinition/use-extra",
		valueType: "CodeableConcept",
	},
]);
```

### Complex Extensions

```ts
extend.withComplex("ClinicalTrialParticipation", {
	url: "http://example.org/fhir/StructureDefinition/patient-clinicalTrial",
	extensions: [
		{ url: "NCT", valueType: "string" },
		{ url: "period", valueType: "Period" },
		{ url: "reason", valueType: "CodeableConcept" },
	],
});
```

## Validation Status

Profile validation is currently incomplete. The model can store cardinality,
binding, extension, and constraint metadata, but generic enforcement is still
being implemented.

Current reliable behavior:

- custom constraints attached through the DSL can run;
- component-level validation still runs normally;
- profile validation errors flow through the same `FqkMap` error map.

Planned behavior:

- generic cardinality enforcement;
- generic binding enforcement;
- choice validation;
- extension validation by URL and value type;
- nested backbone and complex extension validation.

## Relationship To FHIR StructureDefinition

Beacon profile definitions are an internal representation. They are not yet a
loader or validator for real FHIR `StructureDefinition.snapshot.element[]`
profiles.

The intended path is:

1. make the internal Beacon profile model reliable;
2. build generic validation and rendering against that model;
3. later add an adapter from real FHIR `StructureDefinition` JSON into the
   internal model.
