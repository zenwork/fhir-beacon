import { describe, expect, it } from "vitest";
import type { CodeIds } from "../../codes";
import type { FhirElementData } from "../../internal";
import type {
	KeyErrorPair,
	Validations,
} from "../../internal/base/Validations.type";
import type { Choices } from "../../valuesets";
import {
	contactBackboneStructureDefinitionFixture,
	identifierSliceStructureDefinitionFixture,
	modifierExtensionStructureDefinitionFixture,
	observationStructureDefinitionFixture,
	patternStructureDefinitionFixture,
	unsupportedSliceStructureDefinitionFixture,
	unsupportedStructureDefinitionFixture,
} from "../fixtures/fhirStructureDefinitionFixtures";
import type { PropertyDef } from "../definition";
import { Required } from "../util";
import { validateProfile } from "../validation";
import { importFhirStructureDefinition } from "./fhirStructureDefinitionImporter";

type ObservationFixtureData = FhirElementData & {
	status?: string;
	valueString?: string;
	valueQuantity?: unknown;
	code?: unknown;
	category?: unknown[];
	subject?: unknown;
};

type PatientFixtureData = FhirElementData & {
	identifier?: Array<{ system?: string; value?: string }>;
};

const patternCode = {
	coding: [
		{
			system: "http://loinc.org",
			code: "85354-9",
		},
	],
};

const patternCategory = [
	{
		coding: [
			{
				system: "http://terminology.hl7.org/CodeSystem/observation-category",
				code: "vital-signs",
			},
		],
	},
];

class StubValidations implements Validations {
	private _errors: KeyErrorPair[] = [];
	private _choices = new Map<string, Choices>();

	withChoices(id: CodeIds, choices: Choices): this {
		this._choices.set(id, choices);
		return this;
	}

	add(pair: KeyErrorPair) {
		this._errors.push(pair);
	}

	all() {
		return this._errors;
	}

	has() {
		return false;
	}

	// biome-ignore lint/suspicious/noExplicitAny: validation interface stub
	mapForAll(): any {
		return null;
	}

	// biome-ignore lint/suspicious/noExplicitAny: validation interface stub
	sliceForFQK(): any {
		return null;
	}

	msgFor() {
		return undefined;
	}

	rm() {
		return false;
	}

	rmAll() {
		return false;
	}

	inspectCode() {
		return false;
	}

	inspectCodeableConcept() {}

	choices(id: CodeIds): Choices {
		const choices = this._choices.get(id);
		if (!choices) throw new Error(`choices(${id}) not configured in stub`);
		return choices;
	}
}

describe("importFhirStructureDefinition", () => {
	it("imports direct properties, value choices, bindings, and narrowing", () => {
		const result = importFhirStructureDefinition<ObservationFixtureData>(
			observationStructureDefinitionFixture,
		);

		expect(result.diagnostics).toEqual([]);
		expect(result.profile.type.value).toBe("Observation");
		expect(result.profile.type.profileName).toBe("ExampleObservation");

		const status = result.profile.getProperty("status");
		expect(status).toMatchObject({
			cardinality: "1..1",
			type: "code",
			bindings: "vs-observation-status",
			bindingStrength: Required,
			mustSupport: true,
		});
		expect(status?.constraints).toHaveLength(1);

		const valueQuantity = result.profile.getProperty("Quantity", "value");
		expect(valueQuantity).toMatchObject({
			key: "Quantity",
			storageKey: "valueQuantity",
			choice: "value",
			type: "Quantity",
			cardinality: "0..1",
		});

		const valueString = result.profile.getProperty("String", "value");
		expect(valueString).toMatchObject({
			key: "String",
			storageKey: "valueString",
			choice: "value",
			type: "string",
		});

		const subject = result.profile.getProperty("subject");
		expect(subject?.typeNarrowing).toEqual(["Patient"]);
	});

	it("imports fixed values as profile validation constraints", () => {
		const { profile } = importFhirStructureDefinition<ObservationFixtureData>(
			observationStructureDefinitionFixture,
		);
		const validations = new StubValidations().withChoices(
			"vs-observation-status" as CodeIds,
			{
				id: "vs-observation-status",
				type: "ValueSet",
				name: "ObservationStatus",
				valid: true,
				choices: [{ value: "final", display: "Final" }],
			},
		);

		validateProfile(
			profile,
			{ status: "preliminary", subject: { reference: "Patient/1" } },
			validations,
		);

		expect(validations.all()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					fqk: { path: [{ node: "status" }] },
					message: expect.stringContaining(
						'status must equal fixed value "final"',
					),
				}),
				expect.objectContaining({
					fqk: { path: [{ node: "status" }] },
					message: expect.stringContaining(
						"'preliminary' is not a valid vs-observation-status code",
					),
				}),
			]),
		);
	});

	it("reports unsupported FHIR profiling features instead of silently importing them", () => {
		const result = importFhirStructureDefinition<ObservationFixtureData>(
			unsupportedStructureDefinitionFixture,
		);
		const messages = result.diagnostics.map((diagnostic) => diagnostic.message);

		expect(messages).toEqual(
			expect.arrayContaining([
				expect.stringContaining("FHIR slicing metadata is not imported yet"),
				expect.stringContaining(
					"no simple fixed or pattern discriminator child was found",
				),
				expect.stringContaining("supports one child level only"),
				expect.stringContaining("FHIRPath constraints are not imported yet"),
			]),
		);
		expect(messages).not.toEqual(
			expect.arrayContaining([expect.stringContaining("FHIR pattern")]),
		);
		expect(result.diagnostics.every((diagnostic) => diagnostic.severity)).toBe(
			true,
		);
	});

	it("imports one-level nested backbone elements into parent subdefs", () => {
		const result = importFhirStructureDefinition(
			contactBackboneStructureDefinitionFixture,
		);

		expect(result.diagnostics).toEqual([]);

		const contact = result.profile.getProperty("contact");
		expect(contact).toMatchObject({
			key: "contact",
			type: "PatientContact",
			cardinality: "0..*",
		});
		expect(contact?.subdefs).toBeDefined();

		const name = contact?.subdefs?.get("name") as
			| PropertyDef<ObservationFixtureData>
			| undefined;
		expect(name).toMatchObject({
			key: "name",
			type: "HumanName",
			cardinality: "0..1",
		});
	});

	it("imports simple named slices as discriminator-filtered cardinality constraints", () => {
		const result = importFhirStructureDefinition<PatientFixtureData>(
			identifierSliceStructureDefinitionFixture,
		);
		const identifier = result.profile.getProperty("identifier");

		expect(identifier?.constraints).toHaveLength(1);
		expect(result.diagnostics.map((diagnostic) => diagnostic.message)).toEqual(
			expect.arrayContaining([
				expect.stringContaining(
					"Imported named slice as a simplified discriminator-filtered cardinality constraint",
				),
			]),
		);

		const missingValidations = new StubValidations();
		validateProfile(result.profile, { identifier: [] }, missingValidations);
		expect(missingValidations.all()).toEqual([
			expect.objectContaining({
				fqk: { path: [{ node: "identifier" }] },
				message: expect.stringContaining("identifier slice mr requires 1..1"),
			}),
		]);

		const unrelatedValidations = new StubValidations();
		validateProfile(
			result.profile,
			{ identifier: [{ system: "urn:other", value: "123" }] },
			unrelatedValidations,
		);
		expect(unrelatedValidations.all()).toHaveLength(1);

		const passingValidations = new StubValidations();
		validateProfile(
			result.profile,
			{ identifier: [{ system: "urn:mr", value: "123" }] },
			passingValidations,
		);
		expect(passingValidations.all()).toHaveLength(0);

		const tooManyValidations = new StubValidations();
		validateProfile(
			result.profile,
			{
				identifier: [
					{ system: "urn:mr", value: "123" },
					{ system: "urn:mr", value: "456" },
				],
			},
			tooManyValidations,
		);
		expect(tooManyValidations.all()).toEqual([
			expect.objectContaining({
				fqk: { path: [{ node: "identifier" }] },
				message: expect.stringContaining("identifier slice mr requires 1..1"),
			}),
		]);
	});

	it("skips named slices without a simple discriminator", () => {
		const result = importFhirStructureDefinition<PatientFixtureData>(
			unsupportedSliceStructureDefinitionFixture,
		);
		const identifier = result.profile.getProperty("identifier");

		expect(identifier?.constraints).toHaveLength(0);
		expect(result.diagnostics.map((diagnostic) => diagnostic.message)).toEqual(
			expect.arrayContaining([
				expect.stringContaining(
					"no simple fixed or pattern discriminator child was found",
				),
			]),
		);
	});

	it("imports scalar pattern values as profile validation constraints", () => {
		const result = importFhirStructureDefinition<ObservationFixtureData>(
			patternStructureDefinitionFixture,
		);
		const status = result.profile.getProperty("status");

		expect(result.diagnostics).toEqual([]);
		expect(status?.constraints).toHaveLength(1);

		const passingValidations = new StubValidations();
		validateProfile(
			result.profile,
			{ status: "final", code: patternCode, category: patternCategory },
			passingValidations,
		);
		expect(passingValidations.all()).toHaveLength(0);

		const failingValidations = new StubValidations();
		validateProfile(
			result.profile,
			{
				status: "preliminary",
				code: patternCode,
				category: patternCategory,
			},
			failingValidations,
		);
		expect(failingValidations.all()).toEqual([
			expect.objectContaining({
				fqk: { path: [{ node: "status" }] },
				message: expect.stringContaining(
					'status must match pattern "final"',
				),
			}),
		]);
	});

	it("imports object pattern values as partial structural constraints", () => {
		const { profile } = importFhirStructureDefinition<ObservationFixtureData>(
			patternStructureDefinitionFixture,
		);
		const matchingCode = {
			coding: [
				{
					system: "http://loinc.org",
					code: "85354-9",
				},
			],
			text: "Blood pressure",
		};

		const passingValidations = new StubValidations();
		validateProfile(
			profile,
			{ status: "final", code: matchingCode, category: patternCategory },
			passingValidations,
		);
		expect(passingValidations.all()).toHaveLength(0);

		const missingKeyValidations = new StubValidations();
		validateProfile(
			profile,
			{
				status: "final",
				code: { coding: [{}] },
				category: patternCategory,
			},
			missingKeyValidations,
		);
		expect(missingKeyValidations.all()).toHaveLength(1);

		const wrongNestedScalarValidations = new StubValidations();
		validateProfile(
			profile,
			{
				status: "final",
				code: {
					coding: [{ system: "http://loinc.org", code: "wrong" }],
				},
				category: patternCategory,
			},
			wrongNestedScalarValidations,
		);
		expect(wrongNestedScalarValidations.all()).toHaveLength(1);
	});

	it("uses exact-match MVP behavior for array-shaped pattern values", () => {
		const { profile } = importFhirStructureDefinition<ObservationFixtureData>(
			patternStructureDefinitionFixture,
		);

		const passingValidations = new StubValidations();
		validateProfile(
			profile,
			{ status: "final", code: patternCode, category: patternCategory },
			passingValidations,
		);
		expect(passingValidations.all()).toHaveLength(0);

		const extraKeyValidations = new StubValidations();
		validateProfile(
			profile,
			{
				status: "final",
				code: patternCode,
				category: [{ ...patternCategory[0], text: "Vital Signs" }],
			},
			extraKeyValidations,
		);
		expect(extraKeyValidations.all()).toEqual([
			expect.objectContaining({
				fqk: { path: [{ node: "category" }] },
				message: expect.stringContaining("category must match pattern"),
			}),
		]);
	});

	it("imports modifier extension named slices as profiled modifier extension defs", () => {
		const result = importFhirStructureDefinition<PatientFixtureData>(
			modifierExtensionStructureDefinitionFixture,
		);

		const modifier = result.profile.getExtension("recordStatus");
		expect(modifier).toMatchObject({
			defType: "extension",
			url: "http://example.org/fhir/StructureDefinition/record-status",
			extensionLocation: { kind: "modifier", path: "modifierExtension" },
			cardinality: "1..1",
			valueType: "code",
			isModifier: true,
			bindings: "vs-record-status",
			bindingStrength: Required,
		});

		const validations = new StubValidations();
		validateProfile(result.profile, { identifier: [] }, validations);
		expect(validations.all()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					fqk: {
						path: [
							{ node: "modifierExtension" },
							{ node: "http://example.org/fhir/StructureDefinition/record-status" },
						],
					},
					message: expect.stringContaining("is required"),
				}),
			]),
		);
	});
});
