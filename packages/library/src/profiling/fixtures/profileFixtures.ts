import { DatatypeDef } from "../../DatatypeDef";
import { code } from "../../PrimitiveDef";
import { Observation, Patient, ResourceDef } from "../../ResourceDef";
import type { CodeableConceptData, ContactPointData } from "../../components";
import type { ObservationData } from "../../components/resources/observation/observation.data";
import type { PatientData } from "../../components/resources/patient/patient.data";
import { define, extend, profile, slice } from "../index";

const patientNoteUrl =
	"http://example.org/fhir/StructureDefinition/patient-note";
const patientTrialUrl =
	"http://example.org/fhir/StructureDefinition/patient-clinical-trial";
const birthDateAccuracyUrl =
	"http://example.org/fhir/StructureDefinition/birthdate-accuracy";
const chCorePhoneCategoryUrl =
	"https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html";

export const patientBaseFixture: PatientData = {
	resourceType: "Patient",
	name: [{ family: "Fixture", given: ["Pat"], prefix: [], suffix: [] }],
	telecom: [],
	address: [],
	contact: [],
	communication: [],
	generalPractitioner: [],
	link: [],
};

export const simplePatientExtensionFixture = {
	profile: profile<PatientData>({
		type: Patient.profile("SimplePatientExtensionFixture"),
		props: [
			extend.withOne("patientNote", {
				url: patientNoteUrl,
				label: "Patient note",
				valueType: "string",
			}),
		],
	}),
	valid: {
		...patientBaseFixture,
		extension: [{ url: patientNoteUrl, valueString: "Needs interpreter" }],
	} as PatientData,
	invalid: {
		...patientBaseFixture,
	} as PatientData,
};

export const complexPatientExtensionFixture = {
	profile: profile<PatientData>({
		type: Patient.profile("ComplexPatientExtensionFixture"),
		props: [
			extend.withComplex("clinicalTrial", {
				url: patientTrialUrl,
				label: "Clinical trial",
				extensions: [
					{
						url: "nct",
						label: "NCT number",
						valueType: "string",
					},
					{
						url: "enrollmentStatus",
						label: "Enrollment status",
						valueType: "code",
					},
				],
			}),
		],
	}),
	valid: {
		...patientBaseFixture,
		extension: [
			{
				url: patientTrialUrl,
				extension: [
					{ url: "nct", valueString: "NCT-0001" },
					{ url: "enrollmentStatus", valueCode: "active" },
				],
			},
		],
	} as PatientData,
	invalid: {
		...patientBaseFixture,
	} as PatientData,
};

export const primitiveBirthDateExtensionFixture = {
	profile: profile<PatientData>({
		type: Patient.profile("PrimitiveBirthDateExtensionFixture"),
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
	}),
	valid: {
		...patientBaseFixture,
		birthDate: "1970-01-01",
		_birthDate: {
			extension: [{ url: birthDateAccuracyUrl, valueCode: "day" }],
		},
	} as PatientData,
	invalid: {
		...patientBaseFixture,
		birthDate: "1970-01-01",
		_birthDate: {
			extension: [{ url: birthDateAccuracyUrl, valueCode: "century" }],
		},
	} as PatientData,
};

const chCorePhoneCategoryChoices = [
	{ value: "1", display: "PrivatePhone" },
	{ value: "2", display: "PrivateMobile" },
	{ value: "3", display: "PrivateFax" },
	{ value: "4", display: "PrivateInternetVoice" },
	{ value: "5", display: "BusinessCentral" },
	{ value: "6", display: "BusinessDirect" },
	{ value: "7", display: "BusinessMobile" },
	{ value: "8", display: "BusinessFax" },
	{ value: "9", display: "BusinessInternetVoice" },
	{ value: "10", display: "Pager" },
];

export const chCoreContactPointFixture = {
	profile: profile<ContactPointData>({
		type: new DatatypeDef("ContactPoint", "CHCoreContactPointFixture"),
		base: profile<ContactPointData>({
			type: DatatypeDef.ContactPoint,
			props: [define.oneOf("system", code).optional()],
		}),
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
			extend.primitive("use", chCorePhoneCategoryUrl, [
				{
					key: "phoneCategory",
					url: chCorePhoneCategoryUrl,
					label: "Phone category",
					valueType: "CodeableConcept",
					bindings: chCorePhoneCategoryChoices,
				},
			]),
		],
	}),
	valid: {
		system: "phone",
		value: "+41 78 123 4567",
		use: "home",
		_use: {
			extension: [
				{
					url: chCorePhoneCategoryUrl,
					valueCodeableConcept: {
						coding: [{ code: "2", display: "PrivateMobile" }],
					},
				},
			],
		},
	} as ContactPointData,
	invalid: {
		system: "email",
		value: "pat@example.org",
		use: "home",
		_use: {
			extension: [
				{
					url: chCorePhoneCategoryUrl,
					valueCodeableConcept: {
						coding: [{ code: "12", display: "Unknown" }],
					},
				},
			],
		},
	} as ContactPointData,
};

function hasCoding(concept: CodeableConceptData | undefined, codeValue: string) {
	return concept?.coding?.some((coding) => coding.code === codeValue) ?? false;
}

export const bloodPressureObservationFixture = {
	profile: profile<ObservationData>({
		type: Observation.profile("BloodPressureObservationFixture"),
		props: [
				define.oneOf<ObservationData>("status", code).boundBy([
					{ value: "final", display: "Final" },
					{ value: "amended", display: "Amended" },
				]),
				define.oneOf<ObservationData>("code", DatatypeDef.CodeableConcept),
				slice.constraint<ObservationData>(
					["code"],
				[
					(data: ObservationData) => ({
						success: hasCoding(data.code, "85354-9"),
						message: "Observation.code must be LOINC 85354-9",
					}),
				],
			),
				define.listOf<ObservationData>(
					"component",
					new ResourceDef("ObservationComponent"),
				),
		],
	}),
	valid: {
		resourceType: "Observation",
		status: "final",
		code: {
			coding: [{ system: "http://loinc.org", code: "85354-9" }],
		},
		component: [
			{
				code: { coding: [{ system: "http://loinc.org", code: "8480-6" }] },
				valueQuantity: { value: 120, unit: "mmHg" },
			},
			{
				code: { coding: [{ system: "http://loinc.org", code: "8462-4" }] },
				valueQuantity: { value: 80, unit: "mmHg" },
			},
		],
	} as ObservationData,
	invalid: {
		resourceType: "Observation",
		status: "registered",
		code: {
			coding: [{ system: "http://loinc.org", code: "8310-5" }],
		},
		component: [],
	} as ObservationData,
};
