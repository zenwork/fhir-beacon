import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import {
	ShellArgs,
	renderTemplateInShell,
} from "../../../../stories/storybook-utils";
import { Extension } from "./extension";
import * as data from "./extension-fhir-examples.story.data";

customElements.get("fhir-extension") ||
	customElements.define("fhir-extension", Extension);

const meta = {
	title: "Components/Datatypes/Special Type/Extension/FHIR R5 Examples",
	component: "fhir-extension",
	...renderTemplateInShell(
		(args: ShellArgs) => html`
        <fhir-extension .data=${args.data} summary ?headless=${args.headless}></fhir-extension>`,
	),
};

export default meta;
type Story = StoryObj;

export const MothersMaidenName: Story = {
	name: "Mothers Maiden Name (valueString)",
	args: { data: data.mothersMaidenName },
};

export const BirthTime: Story = {
	name: "Birth Time (valueDateTime)",
	args: { data: data.birthTime },
};

export const ClinicalTrial: Story = {
	name: "Clinical Trial (valueCode)",
	args: { data: data.clinicalTrial },
};

export const DicomPatientAge: Story = {
	name: "DICOM Patient Age (valueQuantity)",
	args: { data: data.dicomPatientAge },
};

export const DicomPatientHeight: Story = {
	name: "DICOM Patient Height (valueQuantity)",
	args: { data: data.dicomPatientHeight },
};

export const DicomPatientWeight: Story = {
	name: "DICOM Patient Weight (valueQuantity)",
	args: { data: data.dicomPatientWeight },
};

export const GenderIdentity: Story = {
	name: "Gender Identity (complex)",
	args: { data: data.genderIdentity },
};

export const Pronouns: Story = {
	name: "Pronouns (complex)",
	args: { data: data.pronouns },
};

export const RecordedSexOrGender: Story = {
	name: "Recorded Sex or Gender (complex)",
	args: { data: data.recordedSexOrGender },
};
