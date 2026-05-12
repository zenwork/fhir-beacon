import type { FhirStructureDefinition } from "../importer";

export const observationStructureDefinitionFixture = {
	resourceType: "StructureDefinition",
	id: "example-observation",
	url: "http://example.org/fhir/StructureDefinition/example-observation",
	name: "ExampleObservation",
	type: "Observation",
	snapshot: {
		element: [
			{
				id: "Observation",
				path: "Observation",
				min: 0,
				max: "*",
				type: [{ code: "Observation" }],
			},
			{
				id: "Observation.status",
				path: "Observation.status",
				min: 1,
				max: "1",
				type: [{ code: "code" }],
				mustSupport: true,
				binding: {
					strength: "required",
					valueSet: "http://hl7.org/fhir/ValueSet/observation-status",
				},
				fixedCode: "final",
			},
			{
				id: "Observation.value[x]",
				path: "Observation.value[x]",
				min: 0,
				max: "1",
				type: [{ code: "Quantity" }, { code: "string" }],
			},
			{
				id: "Observation.subject",
				path: "Observation.subject",
				min: 1,
				max: "1",
				type: [
					{
						code: "Reference",
						targetProfile: [
							"http://hl7.org/fhir/StructureDefinition/Patient",
						],
					},
				],
			},
		],
	},
} satisfies FhirStructureDefinition;

export const unsupportedStructureDefinitionFixture = {
	resourceType: "StructureDefinition",
	id: "unsupported-observation",
	name: "UnsupportedObservation",
	type: "Observation",
	snapshot: {
		element: [
			{
				id: "Observation",
				path: "Observation",
				min: 0,
				max: "*",
			},
			{
				id: "Observation.component",
				path: "Observation.component",
				min: 0,
				max: "*",
				type: [{ code: "BackboneElement" }],
				slicing: {
					discriminator: [{ type: "pattern", path: "code" }],
					rules: "open",
				},
			},
			{
				id: "Observation.component:systolic",
				path: "Observation.component",
				sliceName: "systolic",
				min: 1,
				max: "1",
				type: [{ code: "BackboneElement" }],
			},
			{
				id: "Observation.component.code",
				path: "Observation.component.code",
				min: 1,
				max: "1",
				type: [{ code: "CodeableConcept" }],
			},
			{
				id: "Observation.status",
				path: "Observation.status",
				min: 1,
				max: "1",
				type: [{ code: "code" }],
				constraint: [{ key: "obs-1", expression: "status.exists()" }],
			},
		],
	},
} satisfies FhirStructureDefinition;

export const patternStructureDefinitionFixture = {
	resourceType: "StructureDefinition",
	id: "pattern-observation",
	name: "PatternObservation",
	type: "Observation",
	snapshot: {
		element: [
			{
				id: "Observation",
				path: "Observation",
				min: 0,
				max: "*",
			},
			{
				id: "Observation.status",
				path: "Observation.status",
				min: 0,
				max: "1",
				type: [{ code: "code" }],
				patternCode: "final",
			},
			{
				id: "Observation.code",
				path: "Observation.code",
				min: 0,
				max: "1",
				type: [{ code: "CodeableConcept" }],
				patternCodeableConcept: {
					coding: [
						{
							system: "http://loinc.org",
							code: "85354-9",
						},
					],
				},
			},
			{
				id: "Observation.category",
				path: "Observation.category",
				min: 0,
				max: "*",
				type: [{ code: "CodeableConcept" }],
				patternCodeableConcept: [
					{
						coding: [
							{
								system: "http://terminology.hl7.org/CodeSystem/observation-category",
								code: "vital-signs",
							},
						],
					},
				],
			},
		],
	},
} satisfies FhirStructureDefinition;
