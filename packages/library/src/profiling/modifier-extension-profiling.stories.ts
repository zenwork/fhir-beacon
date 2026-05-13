import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import jsonEdgeCases from "../../../data/r5/examples-json/json-edge-cases.json";
import { ResourceDef } from "../ResourceDef";
import type { PatientData } from "../components/resources/patient";
import { extend, profile } from "./index";
import {
	type FhirStructureDefinition,
	importFhirStructureDefinition,
} from "./importer";

type ModifierExtensionStoryArgs = {
	mode: "display" | "structure";
	scenario: "edge-cases" | "complex" | "imported-slice";
};

const piUrl = "http://example.org/fhir/StructureDefinition/pi";
const maxDecimalPrecisionUrl =
	"http://example.org/fhir/StructureDefinition/max-decimal-precision";
const recordedSexOrGenderUrl =
	"http://hl7.org/fhir/StructureDefinition/individual-recordedSexOrGender";

const modifierExtensionProfile = profile<PatientData>({
	type: ResourceDef.Patient.profile("ModifierExtensionMvp"),
	props: [
		extend.withModifier("pi", {
			url: piUrl,
			label: "Pi",
			valueType: "decimal",
		}),
		extend.withModifier("maxDecimalPrecision", {
			url: maxDecimalPrecisionUrl,
			label: "Max decimal precision",
			valueType: "decimal",
		}),
		extend.withModifierComplex("recordedSexOrGender", {
			url: recordedSexOrGenderUrl,
			label: "Recorded sex or gender",
			extensions: [
				{
					url: "sourceField",
					label: "Source field",
					valueType: "string",
				},
				{
					url: "type",
					label: "Type",
					valueType: "CodeableConcept",
				},
			],
		}),
	],
});

const importedModifierStructureDefinition = {
	resourceType: "StructureDefinition",
	id: "modifier-extension-patient",
	name: "ModifierExtensionPatient",
	type: "Patient",
	snapshot: {
		element: [
			{
				id: "Patient",
				path: "Patient",
				min: 0,
				max: "*",
			},
			{
				id: "Patient.modifierExtension",
				path: "Patient.modifierExtension",
				min: 0,
				max: "*",
				type: [{ code: "Extension" }],
			},
			{
				id: "Patient.modifierExtension:recordStatus",
				path: "Patient.modifierExtension",
				sliceName: "recordStatus",
				min: 1,
				max: "1",
				type: [{ code: "Extension" }],
			},
			{
				id: "Patient.modifierExtension:recordStatus.url",
				path: "Patient.modifierExtension.url",
				min: 1,
				max: "1",
				type: [{ code: "uri" }],
				fixedUri: "http://example.org/fhir/StructureDefinition/record-status",
			},
			{
				id: "Patient.modifierExtension:recordStatus.valueCode",
				path: "Patient.modifierExtension.valueCode",
				min: 1,
				max: "1",
				type: [{ code: "code" }],
			},
		],
	},
} satisfies FhirStructureDefinition;

const importedModifierProfile = importFhirStructureDefinition<PatientData>(
	importedModifierStructureDefinition,
).profile;

const edgeCasesData = jsonEdgeCases as PatientData;

const complexModifierData: PatientData = {
	...edgeCasesData,
	modifierExtension: [
		{
			url: recordedSexOrGenderUrl,
			extension: [
				{ url: "sourceField", valueString: "SEX" },
				{
					url: "type",
					valueCodeableConcept: {
						coding: [{ code: "birth-certificate", display: "Birth certificate" }],
					},
				},
			],
		},
	],
};

const importedSliceData: PatientData = {
	...edgeCasesData,
	modifierExtension: [
		{
			url: "http://example.org/fhir/StructureDefinition/record-status",
			valueCode: "archived",
		},
	],
};

const meta: Meta<ModifierExtensionStoryArgs> = {
	title: "Profiling/Modifier Extensions",
	argTypes: {
		mode: {
			control: { type: "inline-radio" },
			options: ["display", "structure"],
		},
		scenario: {
			control: { type: "inline-radio" },
			options: ["edge-cases", "complex", "imported-slice"],
		},
	},
	args: {
		mode: "display",
		scenario: "edge-cases",
	},
	render: (args) => {
		const data =
			args.scenario === "complex"
				? complexModifierData
				: args.scenario === "imported-slice"
					? importedSliceData
					: edgeCasesData;
		const profileToUse =
			args.scenario === "imported-slice"
				? importedModifierProfile
				: modifierExtensionProfile;
		return html`
      <fhir-shell .mode=${args.mode} showerror open>
        <fhir-patient .profile=${profileToUse} .data=${data}></fhir-patient>
      </fhir-shell>
    `;
	},
};

export default meta;

type Story = StoryObj<ModifierExtensionStoryArgs>;

export const EdgeCases: Story = {
	args: {
		scenario: "edge-cases",
	},
};

export const Complex: Story = {
	args: {
		scenario: "complex",
	},
};

export const ImportedSlice: Story = {
	args: {
		scenario: "imported-slice",
	},
};
