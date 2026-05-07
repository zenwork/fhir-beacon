import { StoryObj } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit";
import {
	ShellArgs,
	argtypes,
	wrapInShell,
} from "../../../../stories/storybook-utils";
import { data, masterDetail } from "./bundle.story.data";

const path = "Components/Foundation/Bundle";
const elementName = "fhir-bundle";

const meta = {
	title: path,
	component: elementName,
	...argtypes(),
};

export default meta;
type Story = StoryObj;

export const Display: Story = {
	args: {
		data: data,
		mode: "display",
		showerror: false,
		verbose: false,
		open: true,
	},
};

export const Structure: Story = {
	args: {
		data: data,
		mode: "structure",
		showerror: true,
		verbose: true,
		open: true,
	},
};

export const MasterDetail: Story = {
	args: {
		data: masterDetail,
		mode: "display",
		showerror: false,
		verbose: false,
		open: false,
	},
	render: wrapInShell(
		(args: ShellArgs): TemplateResult => html`
        <fhir-bundle-everything .data=${args.data}></fhir-bundle-everything>`,
	),
};
