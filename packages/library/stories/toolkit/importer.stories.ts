import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import type { ObservationData } from "../../src/components/resources/observation";
import { data as observationData } from "../../src/components/resources/observation/observation.story.data";
import {
	observationStructureDefinitionFixture,
	unsupportedStructureDefinitionFixture,
} from "../../src/profiling/fixtures/fhirStructureDefinitionFixtures";
import {
	type FhirStructureDefinition,
	type FhirStructureDefinitionImportResult,
	importFhirStructureDefinition,
} from "../../src/profiling";
import { ShellArgs } from "../storybook-utils";

type ImporterStoryArgs = ShellArgs<ObservationData> & {
	source: "supported" | "unsupported";
	invalidStatus: boolean;
};

const supportedImport = importFhirStructureDefinition<ObservationData>(
	observationStructureDefinitionFixture,
);
const unsupportedImport = importFhirStructureDefinition<ObservationData>(
	unsupportedStructureDefinitionFixture,
);

const sourceDefinitions: Record<
	ImporterStoryArgs["source"],
	FhirStructureDefinition
> = {
	supported: observationStructureDefinitionFixture,
	unsupported: unsupportedStructureDefinitionFixture,
};

const imports = {
	supported: supportedImport,
	unsupported: unsupportedImport,
};

const profiledObservation: ObservationData = {
	...observationData,
	status: "final",
	subject: { reference: "Patient/f001", display: "P. van de Heuvel" },
};

const invalidObservation: ObservationData = {
	...profiledObservation,
	status: "preliminary",
};

const meta: Meta<ImporterStoryArgs> = {
	title: "Profiling/Profile Importer",
	component: "fhir-observation",
	argTypes: {
		source: {
			control: { type: "inline-radio" },
			options: ["supported", "unsupported"],
		},
		invalidStatus: {
			control: { type: "boolean" },
		},
	},
	render: (args) => {
		const result = imports[args.source];
		const data = args.invalidStatus ? invalidObservation : profiledObservation;
		const output = importOutput(result);
		const source = sourceDefinitions[args.source];
		const unsupportedProfileMessage = unsupportedProfileError(result);

		return html`
			<style>
				.importer-demo {
					display: flex;
					flex-direction: column;
					gap: 1.25rem;
					width: min(1180px, calc(100vw - 3rem));
				}

				.importer-panel {
					border: 1px solid var(--sl-color-neutral-300);
					border-radius: 6px;
					padding: 1rem;
					background: var(--sl-color-neutral-0);
				}

				.importer-panel h2 {
					margin: 0 0 0.75rem;
					font-size: 1rem;
					line-height: 1.25;
				}

				.importer-step {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 1.5rem;
					height: 1.5rem;
					margin-right: 0.5rem;
					border-radius: 999px;
					background: var(--sl-color-primary-100);
					color: var(--sl-color-primary-700);
					font-size: 0.8rem;
					font-weight: 700;
				}

				.importer-heading {
					display: flex;
					align-items: center;
				}

				.importer-panel p {
					color: var(--sl-color-neutral-700);
					margin: 0;
				}

				.importer-panel code {
					font-size: 0.875rem;
				}

				.importer-json {
					max-height: 22rem;
					overflow: auto;
					margin: 0.75rem 0 0;
					padding: 0.75rem;
					background: var(--sl-color-neutral-100);
					border-radius: 4px;
					font-size: 0.75rem;
					line-height: 1.45;
				}
			</style>

			<div class="importer-demo">
				<section class="importer-panel">
					<h2 class="importer-heading">
						<span class="importer-step">1</span>
						Original FHIR R5 JSON
					</h2>
					<p>Input <code>StructureDefinition</code> used by the importer.</p>
					<pre class="importer-json">${JSON.stringify(source, null, 2)}</pre>
				</section>

				<section class="importer-panel">
					<h2 class="importer-heading">
						<span class="importer-step">2</span>
						Importer Output
					</h2>
					<p>
						Normalized Beacon import result with generated profile JSON and
						diagnostics.
					</p>
					<pre class="importer-json">${JSON.stringify(output, null, 2)}</pre>
				</section>

				<section class="importer-panel">
					<h2 class="importer-heading">
						<span class="importer-step">3</span>
						Profile Applied To Component (Display Mode)
					</h2>
					<p>
						<code>fhir-observation</code> rendered in display mode with the
						imported profile applied.
					</p>
					${unsupportedProfileMessage
						? html`
								<fhir-wrapper variant="error" label="Profile Importer Error">
									<fhir-error text=${unsupportedProfileMessage}></fhir-error>
								</fhir-wrapper>
							`
						: ""}
					<fhir-shell
						mode="display"
						?showerror=${args.showerror}
						?verbose=${args.verbose}
					>
						<fhir-observation
							.data=${data}
							.profile=${result.profile}
							?showerror=${args.showerror}
							?verbose=${args.verbose}
						></fhir-observation>
					</fhir-shell>
				</section>
			</div>
		`;
	},
};

export default meta;
type Story = StoryObj<ImporterStoryArgs>;

export const ImportedObservation: Story = {
	args: {
		source: "supported",
		invalidStatus: false,
		showerror: true,
		verbose: false,
	},
};

export const FixedValueError: Story = {
	args: {
		...ImportedObservation.args,
		invalidStatus: true,
	},
};

export const UnsupportedDiagnostics: Story = {
	args: {
		...ImportedObservation.args,
		source: "unsupported",
	},
};

function importOutput(result: FhirStructureDefinitionImportResult<ObservationData>) {
	return {
		profileType: result.profile.type.toString(),
		profile: result.profile.toJSON(),
		diagnostics: result.diagnostics,
	};
}

function unsupportedProfileError(
	result: FhirStructureDefinitionImportResult<ObservationData>,
): string | undefined {
	const unsupported = result.diagnostics.filter(
		(diagnostic) =>
			diagnostic.code === "unsupported-feature" ||
			diagnostic.code === "unsupported-type",
	);
	if (unsupported.length === 0) return undefined;
	const details = unsupported.map((diagnostic) => diagnostic.message).join(" | ");
	return `Unsupported FHIR profile features were detected during import. The generated profile may be incomplete. ${details}`;
}
