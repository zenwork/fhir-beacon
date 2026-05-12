import { beforeEach, describe, expect, it } from "vitest";
import { ContactPoint, Reference } from "../../DatatypeDef";
import { code } from "../../PrimitiveDef";
import { Observation, Patient } from "../../ResourceDef";
import type { CodeIds } from "../../codes";
import type { FhirElementData } from "../../internal/base/FhirElement.type";
import type {
	KeyErrorPair,
	Validations,
} from "../../internal/base/Validations.type";
import type { Choices } from "../../valuesets";
import { define, extend, profile, slice } from "../index";
import { validateProfile } from "./profileValidator";

type TestData = FhirElementData & {
	value?: string;
	status?: string;
	subject?: { reference?: string; identifier?: unknown };
	performer?: Array<{ reference?: string; identifier?: unknown }>;
	// biome-ignore lint/suspicious/noExplicitAny: test data
	items?: any[];
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
	// biome-ignore lint/suspicious/noExplicitAny: stub
	mapForAll(): any {
		return null;
	}
	// biome-ignore lint/suspicious/noExplicitAny: stub
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
		const c = this._choices.get(id);
		if (!c) throw new Error(`choices(${id}) not configured in stub`);
		return c;
	}
}

describe("validateProfile", () => {
	let validations: StubValidations;

	beforeEach(() => {
		validations = new StubValidations();
	});

	describe("cardinality", () => {
		it("reports error when required 1..1 field is absent", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.oneOf("value", code)],
			});

			validateProfile(def, {} as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({ path: [{ node: "value" }] });
			expect(validations.all()[0].message).toContain("required");
			expect(validations.all()[0].message).toContain("1..1");
		});

		it("does not report error when required 1..1 field is present", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.oneOf("value", code)],
			});

			validateProfile(def, { value: "phone" } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report error when optional 0..1 field is absent", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("value", code)],
			});

			validateProfile(def, {} as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});

		it("reports error when required 1..* array is empty", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.listOf("items", ContactPoint)],
			});

			validateProfile(def, { items: [] } as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({ path: [{ node: "items" }] });
			expect(validations.all()[0].message).toContain("required");
			expect(validations.all()[0].message).toContain("1..*");
		});

		it("does not report error when optional 0..* array is empty", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionalListOf("items", ContactPoint)],
			});

			validateProfile(def, { items: [] } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report error when 1..* array has elements", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.listOf("items", ContactPoint)],
			});

			validateProfile(def, { items: ["a", "b"] } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});
	});

	describe("constraints", () => {
		it("reports error when constraint fails, appending profile name", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					define.optionOf("value", code).constrainedBy([
						(data: TestData) => ({
							success: data.value === "expected",
							message: "value must be expected",
						}),
					]),
				],
			});

			validateProfile(def, { value: "other" } as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].message).toContain("value must be expected");
			expect(validations.all()[0].message).toContain("ContactPoint");
		});

		it("does not report error when constraint passes", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					define.optionOf("value", code).constrainedBy([
						(data: TestData) => ({
							success: data.value === "expected",
							message: "value must be expected",
						}),
					]),
				],
			});

			validateProfile(def, { value: "expected" } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});

		it("supports slice constraints with fixed values", () => {
			const base = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("value", code)],
			});

			const def = profile<TestData>({
				type: ContactPoint,
				base,
				props: [
					slice.constraint(
						["value"],
						[
							(data: TestData, fixedValue: string) => ({
								success: data.value === fixedValue,
								message: `Must be fixed value: ${fixedValue}`,
							}),
						],
						["phone"],
					),
				],
			});

			validateProfile(def, { value: "email" } as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].message).toContain("Must be fixed value: phone");
		});
	});

	describe("property inline binding", () => {
		it("reports error for invalid code in inline Choice[] binding", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					define
						.optionOf("status", code)
						.boundBy([
							{ value: "active", display: "Active" },
							{ value: "inactive", display: "Inactive" },
						]),
				],
			});

			validateProfile(def, { status: "unknown" } as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [{ node: "status" }],
			});
			expect(validations.all()[0].message).toContain(
				"'unknown' is not a valid choice",
			);
			expect(validations.all()[0].message).toContain("active, inactive");
		});

		it("does not report error for valid code in inline Choice[] binding", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					define
						.optionOf("status", code)
						.boundBy([
							{ value: "active", display: "Active" },
							{ value: "inactive", display: "Inactive" },
						]),
				],
			});

			validateProfile(def, { status: "active" } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});
	});

	describe("Reference type narrowing", () => {
		it("reports an error for a wrong relative reference target type", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("subject", Reference, [Patient])],
			});

			validateProfile(
				def,
				{ subject: { reference: "Observation/123" } } as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [{ node: "subject" }, { node: "reference" }],
			});
			expect(validations.all()[0].message).toContain(
				"reference target must be one of: Patient; found Observation",
			);
		});

		it("does not report an error for a correct relative reference target type", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("subject", Reference, [Patient])],
			});

			validateProfile(
				def,
				{ subject: { reference: "Patient/123" } } as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report an error for a correct absolute URL reference target type", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("subject", Reference, [Patient])],
			});

			validateProfile(
				def,
				{ subject: { reference: "https://example.org/fhir/Patient/123" } } as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report an error for a correct versioned relative reference target type", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("subject", Reference, [Patient])],
			});

			validateProfile(
				def,
				{ subject: { reference: "Patient/123/_history/4" } } as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report an error for identifier-only Reference objects", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("subject", Reference, [Patient])],
			});

			validateProfile(
				def,
				{ subject: { identifier: { value: "abc" } } } as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(0);
		});

		it("reports indexed errors for invalid items in repeated References", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionalListOf("performer", Reference, [Patient])],
			});

			validateProfile(
				def,
				{
					performer: [
						{ reference: "Patient/123" },
						{ reference: "Observation/456" },
					],
				} as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [{ node: "performer", index: 1 }, { node: "reference" }],
			});
		});

		it("does not report an error when type narrowing is empty", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("subject", Reference)],
			});

			validateProfile(
				def,
				{ subject: { reference: "Observation/123" } } as TestData,
				validations,
			);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report an error for non-Reference properties with type narrowing metadata", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [define.optionOf("status", code, [Observation])],
			});

			validateProfile(def, { status: "Observation/123" } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});
	});

	describe("root extension validation", () => {
		const url = "http://example.com/ext/my-ext";

		it("reports error when required root extension is absent", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [extend.withOne("myExt", { url, valueType: "string" })],
			});

			validateProfile(def, {} as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [{ node: "extension" }, { node: url }],
			});
			expect(validations.all()[0].message).toContain("is required");
		});

		it("reports error when extension URL does not match any entry", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [extend.withOne("myExt", { url, valueType: "string" })],
			});

			const data = {
				extension: [
					{ url: "http://other.com/ext", valueString: "hello" },
				],
			} as TestData;

			validateProfile(def, data, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].message).toContain("is required");
		});

		it("does not report error when required extension is present", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [extend.withOne("myExt", { url, valueType: "string" })],
			});

			const data = {
				extension: [{ url, valueString: "hello" }],
			} as TestData;

			validateProfile(def, data, validations);

			expect(validations.all()).toHaveLength(0);
		});
	});

	describe("primitive extension validation", () => {
		const url = "http://example.com/ext/cat";
		const choices = [
			{ value: "cat1", display: "Category 1" },
			{ value: "cat2", display: "Category 2" },
		];

		it("reports binding error for invalid CodeableConcept in primitive extension", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					extend.primitive("value", url, [
						{ key: "category", url, valueType: "CodeableConcept", bindings: choices },
					]),
				],
			});

			const data = {
				value: "phone",
				_value: {
					extension: [
						{
							url,
							valueCodeableConcept: {
								coding: [{ code: "invalid", system: "http://example.com/cs" }],
							},
						},
					],
				},
			} as TestData;

			validateProfile(def, data, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [
					{ node: "extension" },
					{ node: url },
					{ node: "valueCodeableConcept" },
					{ node: "coding" },
					{ node: "code" },
				],
			});
			expect(validations.all()[0].message).toContain(
				"'invalid' is not a valid choice",
			);
			expect(validations.all()[0].message).toContain("cat1, cat2");
		});

		it("does not report error for valid CodeableConcept in primitive extension", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					extend.primitive("value", url, [
						{ key: "category", url, valueType: "CodeableConcept", bindings: choices },
					]),
				],
			});

			const data = {
				value: "phone",
				_value: {
					extension: [
						{
							url,
							valueCodeableConcept: {
								coding: [{ code: "cat1", system: "http://example.com/cs" }],
							},
						},
					],
				},
			} as TestData;

			validateProfile(def, data, validations);

			expect(validations.all()).toHaveLength(0);
		});

		it("reports required error when primitive extension parent is absent", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					extend.primitive("value", url, [
						{ key: "category", url, valueType: "CodeableConcept", bindings: choices },
					]),
				],
			});

			const data = { value: "phone" } as TestData;

			validateProfile(def, data, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].message).toContain("is required");
		});
	});

	describe("value[x] choice constraints", () => {
		type ChoiceData = FhirElementData & {
			valueString?: string;
			// biome-ignore lint/suspicious/noExplicitAny: test data
			valueQuantity?: any;
		};

		it("reports error when multiple choice alternatives are present", () => {
			const def = profile<ChoiceData>({
				type: ContactPoint,
				props: [
					define.choiceOf("value", "String", code),
					define.choiceOf("value", "Quantity", ContactPoint),
				],
			});

			validateProfile(
				def,
				{ valueString: "hello", valueQuantity: { value: 5 } } as ChoiceData,
				validations,
			);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [{ node: "value[x]" }],
			});
			expect(validations.all()[0].message).toContain("value[x]");
			expect(validations.all()[0].message).toContain("valueString");
			expect(validations.all()[0].message).toContain("valueQuantity");
		});

		it("does not report error when only one choice alternative is present", () => {
			const def = profile<ChoiceData>({
				type: ContactPoint,
				props: [
					define.choiceOf("value", "String", code),
					define.choiceOf("value", "Quantity", ContactPoint),
				],
			});

			validateProfile(
				def,
				{ valueString: "hello" } as ChoiceData,
				validations,
			);

			expect(validations.all()).toHaveLength(0);
		});

		it("does not report error when no choice alternative is present", () => {
			const def = profile<ChoiceData>({
				type: ContactPoint,
				props: [
					define.choiceOf("value", "String", code),
					define.choiceOf("value", "Quantity", ContactPoint),
				],
			});

			validateProfile(def, {} as ChoiceData, validations);

			expect(validations.all()).toHaveLength(0);
		});
	});

	describe("CodeIds binding", () => {
		const testChoices: Choices = {
			id: "vs-contact-point-use",
			type: "ValueSet",
			name: "ContactPointUse",
			choices: [
				{ value: "home", display: "Home" },
				{ value: "work", display: "Work" },
				{ value: "mobile", display: "Mobile" },
			],
			valid: true,
		};

		it("reports error for invalid code against CodeIds binding", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					define
						.optionOf("status", code)
						.boundBy("vs-contact-point-use" as CodeIds),
				],
			});

			validations.withChoices("vs-contact-point-use" as CodeIds, testChoices);
			validateProfile(def, { status: "unknown" } as TestData, validations);

			expect(validations.all()).toHaveLength(1);
			expect(validations.all()[0].fqk).toEqual({
				path: [{ node: "status" }],
			});
			expect(validations.all()[0].message).toContain(
				"'unknown' is not a valid vs-contact-point-use code",
			);
			expect(validations.all()[0].message).toContain("home, work, mobile");
		});

		it("does not report error for valid code against CodeIds binding", () => {
			const def = profile<TestData>({
				type: ContactPoint,
				props: [
					define
						.optionOf("status", code)
						.boundBy("vs-contact-point-use" as CodeIds),
				],
			});

			validations.withChoices("vs-contact-point-use" as CodeIds, testChoices);
			validateProfile(def, { status: "home" } as TestData, validations);

			expect(validations.all()).toHaveLength(0);
		});
	});
});
