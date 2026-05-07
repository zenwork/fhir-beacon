import { OpenType } from "../../../OpenType";
import { FhirExtensionData } from "../../../internal";

// From patient-example-newborn.json — simple string extension
export const mothersMaidenName: FhirExtensionData<OpenType> = {
	url: "http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName",
	valueString: "Everywoman",
};

// From patient-example-newborn.json — primitive extension on birthDate
export const birthTime: FhirExtensionData<OpenType> = {
	url: "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
	valueDateTime: "2017-05-09T17:11:00+01:00",
};

// From patient-glossy-example.json — simple code extension
export const clinicalTrial: FhirExtensionData<OpenType> = {
	url: "http://example.org/StructureDefinition/trials",
	valueCode: "renal",
};

// From patient-example-dicom.json — quantity extensions (DICOM demographics)
export const dicomPatientAge: FhirExtensionData<OpenType> = {
	url: "http://nema.org/fhir/extensions#0010:1010",
	valueQuantity: { value: 56, unit: "Y" },
};

export const dicomPatientHeight: FhirExtensionData<OpenType> = {
	url: "http://nema.org/fhir/extensions#0010:1020",
	valueQuantity: { value: 1.83, unit: "m" },
};

export const dicomPatientWeight: FhirExtensionData<OpenType> = {
	url: "http://nema.org/fhir/extensions#0010:1030",
	valueQuantity: { value: 72.58, unit: "kg" },
};

// From patient-example-sex-and-gender.json — complex nested extensions
export const genderIdentity: FhirExtensionData<OpenType> = {
	url: "http://hl7.org/fhir/StructureDefinition/individual-genderIdentity",
	extension: [
		{
			url: "value",
			valueCodeableConcept: {
				coding: [
					{
						system: "http://snomed.info/sct",
						code: "446141000124107",
						display: "Identifies as female gender (finding)",
					},
				],
			},
		},
		{ url: "period", valuePeriod: { start: "2001-05-06" } },
		{ url: "comment", valueString: "Patient transitioned from male to female in 2001." },
	],
};

export const pronouns: FhirExtensionData<OpenType> = {
	url: "http://hl7.org/fhir/StructureDefinition/individual-pronouns",
	extension: [
		{
			url: "value",
			valueCodeableConcept: {
				coding: [
					{
						system: "http://loinc.org",
						code: "LA29519-8",
						display: "she/her/her/hers/herself",
					},
				],
			},
		},
		{ url: "period", valuePeriod: { start: "2001-05-06" } },
		{ url: "comment", valueString: "Patient transitioned from male to female in 2001." },
	],
};

export const recordedSexOrGender: FhirExtensionData<OpenType> = {
	url: "http://hl7.org/fhir/StructureDefinition/individual-recordedSexOrGender",
	extension: [
		{
			url: "value",
			valueCodeableConcept: {
				coding: [{ system: "http://hl7.org/fhir/administrative-gender", code: "male", display: "Male" }],
			},
		},
		{
			url: "type",
			valueCodeableConcept: {
				coding: [{ system: "http://loinc.org", code: "76689-9", display: "Sex Assigned At Birth" }],
			},
		},
		{ url: "effectivePeriod", valuePeriod: { start: "1974-12-25" } },
		{ url: "acquisitionDate", valueDateTime: "2005-12-06" },
		{ url: "sourceField", valueString: "SEX" },
		{
			url: "jurisdiction",
			valueCodeableConcept: {
				coding: [{ system: "https://www.usps.com/", code: "OH", display: "Ohio" }],
			},
		},
		{
			url: "comment",
			valueString: "Patient transitioned from male to female in 2001, but their birth certificate still indicates male.",
		},
	],
};
