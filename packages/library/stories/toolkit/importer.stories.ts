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
	importFhirStructureDefinition,
} from "../../src/profiling";
import { ShellArgs } from "../storybook-utils";

type ImporterStoryArgs = ShellArgs<ObservationData> & {
	source: "supported" | "unsupported";
	invalidStatus: boolean;
	showDefinition: boolean;
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
	title: "Toolkit/Profile Importer",
	component: "fhir-observation",
	argTypes: {
		source: {
			control: { type: "inline-radio" },
			options: ["supported", "unsupported"],
		},
		invalidStatus: {
			control: { type: "boolean" },
		},
		showDefinition: {
			control: { type: "boolean" },
		},
		mode: {
			control: { type: "inline-radio" },
			options: ["display", "structure"],
		},
	},
	render: (args) => {
		const result = imports[args.source];
		const data = args.invalidStatus ? invalidObservation : profiledObservation;
		const props = Array.from(result.profile.props.values());

		return html`
			<style>
				.importer-demo {
					display: grid;
					grid-template-columns: minmax(20rem, 0.9fr) minmax(28rem, 1.2fr);
					gap: 1rem;
					width: min(1180px, calc(100vw - 3rem));
					align-items: start;
				}

				.importer-panel {
					border: 1px solid var(--sl-color-neutral-300);
					border-radius: 6px;
					padding: 1rem;
					background: var(--sl-color-neutral-0);
				}

				.importer-panel h2,
				.importer-panel h3 {
					margin: 0 0 0.75rem;
					font-size: 1rem;
					line-height: 1.25;
				}

				.importer-panel dl {
					display: grid;
					grid-template-columns: max-content 1fr;
					gap: 0.35rem 0.75rem;
					margin: 0 0 1rem;
				}

				.importer-panel dt {
					color: var(--sl-color-neutral-600);
				}

				.importer-panel dd {
					margin: 0;
				}

				.importer-panel ul {
					margin: 0 0 1rem;
					padding-left: 1.1rem;
				}

				.importer-panel li {
					margin: 0.25rem 0;
				}

				.importer-panel code {
					font-size: 0.875rem;
				}

				.importer-diagnostics {
					border-top: 1px solid var(--sl-color-neutral-200);
					padding-top: 0.85rem;
				}

				.importer-definition {
					max-height: 22rem;
					overflow: auto;
					margin: 0;
					padding: 0.75rem;
					background: var(--sl-color-neutral-100);
					border-radius: 4px;
					font-size: 0.75rem;
					line-height: 1.45;
				}

				@media (max-width: 860px) {
					.importer-demo {
						grid-template-columns: 1fr;
						width: calc(100vw - 2rem);
					}
				}
			</style>

			<div class="importer-demo">
				<section class="importer-panel">
					<h2>Imported Profile</h2>
					<dl>
						<dt>Source</dt>
						<dd>${args.source}</dd>
						<dt>Type</dt>
						<dd>${result.profile.type.toString()}</dd>
						<dt>Properties</dt>
						<dd>${props.length}</dd>
						<dt>Diagnostics</dt>
						<dd>${result.diagnostics.length}</dd>
					</dl>

					<h3>Imported Properties</h3>
					<ul>
						${props.map(
							(prop) => html`
								<li>
									<code>${prop.storageKey}</code>
									${"cardinality" in prop ? html`${prop.cardinality}` : ""}
									${"type" in prop ? html`${prop.type}` : ""}
								</li>
							`,
						)}
					</ul>

					<div class="importer-diagnostics">
						<h3>Diagnostics</h3>
						${result.diagnostics.length === 0
							? html`<p>No importer diagnostics for this source.</p>`
							: html`
									<ul>
										${result.diagnostics.map(
											(diagnostic) => html`
												<li>
													<strong>${diagnostic.severity}</strong>
													${diagnostic.path
														? html`<code>${diagnostic.path}</code>`
														: ""}
													${diagnostic.message}
												</li>
											`,
										)}
									</ul>
								`}
					</div>

					${args.showDefinition
						? html`
								<h3>Source Snapshot</h3>
								<pre class="importer-definition">${JSON.stringify(
									sourceDefinitions[args.source],
									null,
									2,
								)}</pre>
							`
						: ""}
				</section>

				<section class="importer-panel">
					<h2>Component Using Imported Profile</h2>
					<fhir-shell
						.mode=${args.mode}
						?showerror=${args.showerror}
						?verbose=${args.verbose}
						?open=${args.open}
					>
						<fhir-observation
							.data=${data}
							.profile=${result.profile}
							?showerror=${args.showerror}
							?verbose=${args.verbose}
							?open=${args.open}
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
		showDefinition: false,
		mode: "structure",
		showerror: true,
		verbose: true,
		open: true,
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
		showDefinition: true,
	},
};
