import { describe, expect, it } from "vitest";
import type { CodeIds } from "../../codes";
import type { FhirElementData } from "../../internal";
import type {
	KeyErrorPair,
	Validations,
} from "../../internal/base/Validations.type";
import type { Choices } from "../../valuesets";
import {
	observationStructureDefinitionFixture,
	unsupportedStructureDefinitionFixture,
} from "../fixtures/fhirStructureDefinitionFixtures";
import { Required } from "../util";
import { validateProfile } from "../validation";
import { importFhirStructureDefinition } from "./fhirStructureDefinitionImporter";

type ObservationFixtureData = FhirElementData & {
	status?: string;
	valueString?: string;
	valueQuantity?: unknown;
	subject?: unknown;
};

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
				expect.stringContaining("FHIR slicing and named slices"),
				expect.stringContaining("Nested backbone and nested extension"),
				expect.stringContaining("FHIRPath constraints are not imported yet"),
				expect.stringContaining("FHIR patternCode metadata"),
			]),
		);
		expect(result.diagnostics.every((diagnostic) => diagnostic.severity)).toBe(
			true,
		);
	});
});
