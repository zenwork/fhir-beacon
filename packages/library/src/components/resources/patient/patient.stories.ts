import { StoryObj } from "@storybook/web-components-vite";
import { argtypes } from "../../../../stories/storybook-utils";
import { data, dicomPatient, glossyPatient, newbornPatient, sexAndGenderPatient, synthiaPatient } from "./patient.story.data";

const path = "Components/Resources/Patient/Patient";
const elementName = "fhir-patient";

const meta = {
	title: path,
	component: elementName,
	...argtypes(),
};

export default meta;
type Story = StoryObj;

export const Display: Story = {
	args: {
		data,
		mode: "display",
		showerror: false,
		verbose: false,
		open: true,
	},
};

export const DisplayWithExtensions: Story = {
	args: {
		data: newbornPatient,
		mode: "display",
		showerror: false,
		verbose: false,
		open: true,
	},
};

export const DisplayWithQuantityExtensions: Story = {
	args: {
		data: dicomPatient,
		mode: "display",
		extensionLabels: {
			"http://nema.org/fhir/extensions#0010:1010": "Patient Age",
			"http://nema.org/fhir/extensions#0010:1020": "Patient Height",
			"http://nema.org/fhir/extensions#0010:1030": "Patient Weight",
		},
		showerror: false,
		verbose: false,
		open: true,
	},
};

export const DisplayWithComplexNestedExtensions: Story = {
	args: {
		data: sexAndGenderPatient,
		mode: "display",
		showerror: false,
		verbose: false,
		open: true,
	},
};

export const DisplayWithSimpleCodeExtension: Story = {
	args: {
		data: glossyPatient,
		mode: "display",
		showerror: false,
		verbose: false,
		open: true,
	},
};

export const Structure: Story = {
	args: {
		data: synthiaPatient,
		mode: "structure",
		showerror: true,
		verbose: true,
		open: true,
	},
};
