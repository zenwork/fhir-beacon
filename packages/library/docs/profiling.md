# Beacon Profile Definitions

FHIR Beacon uses an internal TypeScript profile model to describe constraints,
bindings, and extension metadata for components. The model is inspired by FHIR
`StructureDefinition`, but it is not a full HL7 `StructureDefinition`
implementation.

Use Beacon profile definitions when you want to:

- require or relax fields;
- constrain a field with a callback;
- bind a `code`, `Coding`, or `CodeableConcept` to known choices;
- define root, primitive, modifier, or complex extensions;
- render profile-defined extensions without writing custom component code.

The examples below use the public DSL from `src/profiling`.

## Minimal Profile

A profile is created with `profile<T>()`. The `type` is the FHIR resource or
datatype being profiled, and `props` is a list of definition builders.

```ts
import { ContactPoint } from "../src/DatatypeDef";
import { code, string as fhirString } from "../src/PrimitiveDef";
import type { ContactPointData } from "../src/components/complex/contact-point/contact-point.data";
import { define, profile } from "../src/profiling";

export const contactPointProfile = profile<ContactPointData>({
	type: ContactPoint,
	props: [
		define.oneOf("system", code),
		define.optionOf("value", fhirString),
	],
});
```

Common property builders:

```ts
define.oneOf("status", code); // 1..1
define.optionOf("value", fhirString); // 0..1
define.listOf("telecom", ContactPoint); // 1..*
define.optionalListOf("telecom", ContactPoint); // 0..*
```

Profiles can be passed directly to components:

```ts
html`
	<fhir-contact-point
		.data=${contactPoint}
		.profile=${contactPointProfile}
		showerror
	></fhir-contact-point>
`;
```

During data preparation, Beacon runs the component's normal validation and then
the active profile validation. Errors flow through the same `FqkMap` mechanism
used by components.

## Field Constraints

Use `slice.constraint()` to attach a constraint to an existing property
definition. The property must already exist in the base or current profile.

```ts
import { ContactPoint, DatatypeDef } from "../src/DatatypeDef";
import { code } from "../src/PrimitiveDef";
import type { ContactPointData } from "../src/components/complex/contact-point/contact-point.data";
import { define, profile, slice } from "../src/profiling";

const base = profile<ContactPointData>({
	type: ContactPoint,
	props: [define.oneOf("system", code).optional()],
});

export const phoneOnly = profile<ContactPointData>({
	type: new DatatypeDef("ContactPoint", "PhoneOnly"),
	base,
	props: [
		slice.constraint(
			["system"],
			[
				(data: ContactPointData, fixedValue: string) => ({
					success: data.system === fixedValue,
					message: `Must be fixed value:${fixedValue}`,
				}),
			],
			["phone"],
		),
	],
});
```

The third argument is optional fixed-value metadata. The constraint receives it
as its second parameter.

## Code Bindings

Inline choices can bind primitive `code` values:

```ts
import { Observation } from "../src/ResourceDef";
import { code } from "../src/PrimitiveDef";
import type { ObservationData } from "../src/components/resources/observation/observation.data";
import { define, profile } from "../src/profiling";

export const observationStatusProfile = profile<ObservationData>({
	type: Observation.profile("ObservationStatusExample"),
	props: [
		define.oneOf<ObservationData>("status", code).boundBy([
			{ value: "final", display: "Final" },
			{ value: "amended", display: "Amended" },
		]),
	],
});
```

The same inline choices are also enforced for extension values whose
`valueType` is `code`, `Coding`, or `CodeableConcept`.

## Value Choices

FHIR choice fields such as `value[x]` keep the choice prefix separate from the
concrete type suffix:

```ts
import { CodeableConcept, Quantity } from "../src/DatatypeDef";
import { define } from "../src/profiling";

define.choiceOf("value", "Quantity", Quantity).optional();
define.choiceOf("value", "CodeableConcept", CodeableConcept).optional();
```

These entries are stored under flattened keys such as `valueQuantity` and
`valueCodeableConcept`, while still preserving the declared choice metadata.
Profile validation reports an error if more than one option from the same
choice group is present.

## Root Extensions

Root extensions live in `data.extension`.

```ts
import { Patient } from "../src/ResourceDef";
import type { PatientData } from "../src/components/resources/patient/patient.data";
import { extend, profile } from "../src/profiling";

const patientNoteUrl =
	"http://example.org/fhir/StructureDefinition/patient-note";

export const patientNoteProfile = profile<PatientData>({
	type: Patient.profile("PatientNoteExample"),
	props: [
		extend.withOne("patientNote", {
			url: patientNoteUrl,
			label: "Patient note",
			valueType: "string",
		}),
	],
});

export const patientWithNote: PatientData = {
	resourceType: "Patient",
	name: [{ family: "Fixture", given: ["Pat"], prefix: [], suffix: [] }],
	telecom: [],
	address: [],
	contact: [],
	communication: [],
	generalPractitioner: [],
	link: [],
	extension: [{ url: patientNoteUrl, valueString: "Needs interpreter" }],
};
```

When rendered with `patientNoteProfile`, Beacon displays the extension using the
profile label if one is available.

## Primitive Extensions

Primitive extensions live on underscore siblings such as `_birthDate.extension`
or `_use.extension`. Define them with `extend.primitive()`.

```ts
import { Patient } from "../src/ResourceDef";
import type { PatientData } from "../src/components/resources/patient/patient.data";
import { extend, profile } from "../src/profiling";

const birthDateAccuracyUrl =
	"http://example.org/fhir/StructureDefinition/birthdate-accuracy";

export const birthDateAccuracyProfile = profile<PatientData>({
	type: Patient.profile("BirthDateAccuracyExample"),
	props: [
		extend.primitive("birthDate", birthDateAccuracyUrl, [
			{
				key: "birthDateAccuracy",
				url: birthDateAccuracyUrl,
				label: "Birth date accuracy",
				valueType: "code",
				bindings: [
					{ value: "day", display: "Day known" },
					{ value: "month", display: "Month known" },
					{ value: "year", display: "Year known" },
				],
			},
		]),
	],
});

export const patientWithBirthDateAccuracy: PatientData = {
	resourceType: "Patient",
	name: [{ family: "Fixture", given: ["Pat"], prefix: [], suffix: [] }],
	telecom: [],
	address: [],
	contact: [],
	communication: [],
	generalPractitioner: [],
	link: [],
	birthDate: "1970-01-01",
	_birthDate: {
		extension: [{ url: birthDateAccuracyUrl, valueCode: "day" }],
	},
};
```

With an active profile, primitive extension data is rendered automatically. No
ordinary `extendRender()` callback is required.

## Complex Extensions

Complex extensions contain nested `extension` entries.

```ts
import { Patient } from "../src/ResourceDef";
import type { PatientData } from "../src/components/resources/patient/patient.data";
import { extend, profile } from "../src/profiling";

const clinicalTrialUrl =
	"http://example.org/fhir/StructureDefinition/patient-clinical-trial";

export const clinicalTrialProfile = profile<PatientData>({
	type: Patient.profile("ClinicalTrialExample"),
	props: [
		extend.withComplex("clinicalTrial", {
			url: clinicalTrialUrl,
			label: "Clinical trial",
			extensions: [
				{ url: "nct", label: "NCT number", valueType: "string" },
				{
					url: "enrollmentStatus",
					label: "Enrollment status",
					valueType: "code",
				},
			],
		}),
	],
});
```

Valid data:

```ts
const patientInTrial: PatientData = {
	resourceType: "Patient",
	name: [{ family: "Fixture", given: ["Pat"], prefix: [], suffix: [] }],
	telecom: [],
	address: [],
	contact: [],
	communication: [],
	generalPractitioner: [],
	link: [],
	extension: [
		{
			url: clinicalTrialUrl,
			extension: [
				{ url: "nct", valueString: "NCT-0001" },
				{ url: "enrollmentStatus", valueCode: "active" },
			],
		},
	],
};
```

Nested extension labels are used during display and structure rendering.

## Modifier Extensions

Modifier extensions are defined separately and render with a distinct modifier
label.

```ts
extend.withModifier("doNotCall", {
	url: "http://example.org/fhir/StructureDefinition/do-not-call",
	label: "Do not call",
	valueType: "boolean",
});
```

The data is stored in `modifierExtension` rather than `extension`.

## Custom Rendering Escape Hatches

Most profile-defined extensions should render generically. For unusual cases,
the DSL still supports custom rendering callbacks:

```ts
import { html } from "lit";
import { DisplayMode } from "../src/shell";

extend
	.withOne("patientNote", {
		url: patientNoteUrl,
		label: "Patient note",
		valueType: "string",
	})
	.extendRender(DisplayMode.display, (_config, data) => [
		html`<strong>${data.extension?.[0]?.valueString}</strong>`,
	]);
```

Use custom rendering only when the generic extension display cannot represent
the intended UI.

## FHIR StructureDefinition Importer

Beacon can import a small, direct subset of real FHIR R5
`StructureDefinition.snapshot.element[]` JSON into the internal profile model.
Use `importFhirStructureDefinition()` when you already have profile JSON and
want Beacon to enforce basic constraints without hand-authoring the same
profile with the TypeScript DSL.

```ts
import type { ObservationData } from "../src/components/resources/observation/observation.data";
import { importFhirStructureDefinition } from "../src/profiling";

const result = importFhirStructureDefinition<ObservationData>(
	observationStructureDefinitionJson,
);

const observationProfile = result.profile;

for (const diagnostic of result.diagnostics) {
	console.warn(diagnostic.message);
}
```

The returned `profile` is a normal Beacon profile definition and can be passed
to components:

```ts
html`
	<fhir-observation
		.data=${observation}
		.profile=${observationProfile}
		showerror
	></fhir-observation>
`;
```

Imported today:

- root resource or datatype profile identity;
- direct, top-level element definitions from `snapshot.element[]`;
- basic cardinality from `min` and `max`;
- primitive, datatype, and resource type names;
- `value[x]` choice entries;
- `binding.strength` and `binding.valueSet` metadata;
- `fixed[x]` values as validation constraints;
- `profile` and `targetProfile` type narrowing when the target type is known.

The importer returns diagnostics for FHIR features it sees but does not import,
such as slicing, named slices, nested backbone paths, FHIRPath constraints,
conditions, and `pattern[x]` metadata. Treat non-empty diagnostics as a prompt
to review the imported profile before using it as a faithful representation of
an implementation guide.

Storybook includes a runnable demo under `Toolkit/Profile Importer`.

## Relationship To HL7 StructureDefinition

Beacon profile definitions are an internal representation. They are not a full
loader, serializer, or validator for real HL7 `StructureDefinition` JSON.

The class is currently named `StructureDefinition` because it fills a similar
role inside Beacon, but the semantics are narrower:

- Beacon profiles are authored in TypeScript with `profile()`, `define()`,
  `slice()`, and `extend()`.
- Real HL7 `StructureDefinition.snapshot.element[]` JSON can be imported only
  for the basic feature subset listed above.
- Unsupported FHIR profile features are reported as importer diagnostics instead
  of being silently interpreted.

Complete FHIR `StructureDefinition` parity remains a later milestone.

## Known Limitations

Current profiling support intentionally does not implement the full FHIR
profiling specification.

Not currently supported:

- full FHIRPath evaluation;
- full slicing and discriminator semantics;
- IG package loading;
- complete import of HL7 `StructureDefinition.snapshot.element[]`;
- terminology expansion beyond local `CodeIds` and inline choices;
- complete primitive type narrowing, such as all `Reference` target checks.

Supported today:

- cardinality checks for profile-defined properties and extensions;
- required value checks;
- `value[x]` choice exclusivity checks;
- inline `Choice[]` binding checks for `code`, `Coding`, and
  `CodeableConcept`;
- root, primitive, nested complex, and modifier extension validation/rendering;
- basic HL7 `StructureDefinition.snapshot.element[]` import for direct
  properties;
- profile validation errors flowing into component error rendering.

See `src/profiling/fixtures/profileFixtures.ts` for compact complete examples
with valid and invalid data variants.
