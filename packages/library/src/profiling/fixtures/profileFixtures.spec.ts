import { describe, expect, it } from "vitest";
import type { CodeIds } from "../../codes";
import type { FhirElementData } from "../../internal/base/FhirElement.type";
import type {
	FullyQualifiedKey,
	KeyErrorPair,
	Validations,
} from "../../internal/base/Validations.type";
import type { Choices } from "../../valuesets";
import { validateProfile } from "../validation/profileValidator";
import {
	bloodPressureObservationFixture,
	chCoreContactPointFixture,
	complexPatientExtensionFixture,
	primitiveBirthDateExtensionFixture,
	simplePatientExtensionFixture,
} from "./profileFixtures";

class FixtureValidations implements Validations {
	private readonly errors: KeyErrorPair[] = [];

	add(pair: KeyErrorPair): void {
		this.errors.push(pair);
	}

	all(): KeyErrorPair[] {
		return this.errors;
	}

	has(_path: FullyQualifiedKey): boolean {
		return false;
	}

	mapForAll(): any {
		return null;
	}

	sliceForFQK(): any {
		return null;
	}

	msgFor(): string | undefined {
		return undefined;
	}

	rm(): boolean {
		return false;
	}

	rmAll(): boolean {
		this.errors.length = 0;
		return true;
	}

	inspectCode(): boolean {
		return false;
	}

	inspectCodeableConcept(): void {}

	choices(_id: CodeIds): Choices {
		throw new Error("CodeId-backed choices are not used by these fixtures");
	}
}

function validateFixture<T extends FhirElementData>(
	fixture: {
		profile: { validate: (data: T, validations: Validations, fetched: boolean) => void };
		valid: T;
		invalid: T;
	},
	data: T,
): KeyErrorPair[] {
	const validations = new FixtureValidations();
	fixture.profile.validate(data, validations, false);
	return validations.all();
}

describe("representative profile fixtures", () => {
	it("simple Patient extension fixture has valid and invalid examples", () => {
		expect(
			validateFixture(simplePatientExtensionFixture, simplePatientExtensionFixture.valid),
		).toHaveLength(0);

		const errors = validateFixture(
			simplePatientExtensionFixture,
			simplePatientExtensionFixture.invalid,
		);
		expect(errors).toHaveLength(1);
		expect(errors[0].message).toContain("Extension");
		expect(errors[0].message).toContain("is required");
	});

	it("complex Patient extension fixture has valid and invalid examples", () => {
		expect(
			validateFixture(complexPatientExtensionFixture, complexPatientExtensionFixture.valid),
		).toHaveLength(0);

		const errors = validateFixture(
			complexPatientExtensionFixture,
			complexPatientExtensionFixture.invalid,
		);
		expect(errors).toHaveLength(1);
		expect(errors[0].message).toContain("clinical-trial");
		expect(errors[0].message).toContain("is required");
	});

	it("primitive extension fixture has valid and invalid examples", () => {
		expect(
			validateFixture(
				primitiveBirthDateExtensionFixture,
				primitiveBirthDateExtensionFixture.valid,
			),
		).toHaveLength(0);

		const errors = validateFixture(
			primitiveBirthDateExtensionFixture,
			primitiveBirthDateExtensionFixture.invalid,
		);
		expect(errors).toHaveLength(1);
		expect(errors[0].message).toContain("'century' is not a valid choice");
		expect(errors[0].message).toContain("day, month, year");
	});

	it("CH Core ContactPoint fixture has valid and invalid examples", () => {
		expect(
			validateFixture(chCoreContactPointFixture, chCoreContactPointFixture.valid),
		).toHaveLength(0);

		const errors = validateFixture(
			chCoreContactPointFixture,
			chCoreContactPointFixture.invalid,
		);
		expect(errors).toHaveLength(2);
		expect(errors.map((error) => error.message).join("\n")).toContain(
			"Must be fixed value:phone",
		);
		expect(errors.map((error) => error.message).join("\n")).toContain(
			"'12' is not a valid choice",
		);
	});

	it("blood pressure Observation fixture has valid and invalid examples", () => {
		expect(
			validateFixture(
				bloodPressureObservationFixture,
				bloodPressureObservationFixture.valid,
			),
		).toHaveLength(0);

		const errors = validateFixture(
			bloodPressureObservationFixture,
			bloodPressureObservationFixture.invalid,
		);
		expect(errors).toHaveLength(3);
		const messages = errors.map((error) => error.message).join("\n");
		expect(messages).toContain("'registered' is not a valid choice");
		expect(messages).toContain("Observation.code must be LOINC 85354-9");
		expect(messages).toContain("component is required");
	});
});
