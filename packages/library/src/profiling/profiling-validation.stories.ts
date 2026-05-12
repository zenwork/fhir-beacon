import type { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import type { CodeIds } from "../codes";
import type { FhirElementData } from "../internal";
import type {
	KeyErrorPair,
	Validations,
} from "../internal/base/Validations.type";
import type { Choices } from "../valuesets";
import {
	observationStructureDefinitionFixture,
	patternStructureDefinitionFixture,
} from "./fixtures/fhirStructureDefinitionFixtures";
import { importFhirStructureDefinition } from "./importer";
import { validateProfile } from "./validation";

type ObservationDemoData = FhirElementData & {
	status?: string;
	subject?: { reference?: string; identifier?: unknown };
	code?: unknown;
	category?: unknown[];
};

type Scenario = {
	name: string;
	profile: "reference" | "pattern";
	data: ObservationDemoData;
	expected: "Pass" | "Fail";
};

class StoryValidations implements Validations {
	private readonly errors: KeyErrorPair[] = [];
	private readonly valueSets = new Map<string, Choices>();

	withChoices(id: CodeIds, choices: Choices): this {
		this.valueSets.set(id, choices);
		return this;
	}

	add(pair: KeyErrorPair) {
		this.errors.push(pair);
	}

	all() {
		return this.errors;
	}

	has() {
		return false;
	}

	// biome-ignore lint/suspicious/noExplicitAny: Storybook validation stub
	mapForAll(): any {
		return null;
	}

	// biome-ignore lint/suspicious/noExplicitAny: Storybook validation stub
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
		const choices = this.valueSets.get(id);
		if (!choices) throw new Error(`choices(${id}) not configured in story`);
		return choices;
	}
}

const observationStatusChoices: Choices = {
	id: "vs-observation-status",
	type: "ValueSet",
	name: "ObservationStatus",
	valid: true,
	choices: [{ value: "final", display: "Final" }],
};

const patternCode = {
	coding: [
		{
			system: "http://loinc.org",
			code: "85354-9",
		},
	],
};

const patternCategory = [
	{
		coding: [
			{
				system: "http://terminology.hl7.org/CodeSystem/observation-category",
				code: "vital-signs",
			},
		],
	},
];

const referenceProfile = importFhirStructureDefinition<ObservationDemoData>(
	observationStructureDefinitionFixture,
).profile;

const patternProfile = importFhirStructureDefinition<ObservationDemoData>(
	patternStructureDefinitionFixture,
).profile;

const scenarios: Scenario[] = [
	{
		name: "Reference narrowing accepts Patient",
		profile: "reference",
		expected: "Pass",
		data: {
			status: "final",
			subject: { reference: "Patient/123" },
		},
	},
	{
		name: "Reference narrowing rejects Observation",
		profile: "reference",
		expected: "Fail",
		data: {
			status: "final",
			subject: { reference: "Observation/123" },
		},
	},
	{
		name: "Identifier-only Reference is skipped",
		profile: "reference",
		expected: "Pass",
		data: {
			status: "final",
			subject: { identifier: { value: "local-id" } },
		},
	},
	{
		name: "Pattern status accepts final",
		profile: "pattern",
		expected: "Pass",
		data: {
			status: "final",
			code: patternCode,
			category: patternCategory,
		},
	},
	{
		name: "Pattern status rejects preliminary",
		profile: "pattern",
		expected: "Fail",
		data: {
			status: "preliminary",
			code: patternCode,
			category: patternCategory,
		},
	},
	{
		name: "Object pattern allows extra keys",
		profile: "pattern",
		expected: "Pass",
		data: {
			status: "final",
			code: { ...patternCode, text: "Blood pressure" },
			category: patternCategory,
		},
	},
	{
		name: "Object pattern rejects wrong nested code",
		profile: "pattern",
		expected: "Fail",
		data: {
			status: "final",
			code: {
				coding: [{ system: "http://loinc.org", code: "wrong" }],
			},
			category: patternCategory,
		},
	},
];

const meta = {
	title: "Profiling/Validation MVP",
	render: () => html`
		<style>
			.profiling-demo {
				box-sizing: border-box;
				max-width: 980px;
				padding: 24px;
				color: #172033;
				font: 14px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
			}

			.profiling-demo h1 {
				margin: 0 0 6px;
				font-size: 24px;
				font-weight: 700;
			}

			.profiling-demo p {
				margin: 0 0 20px;
				color: #4c5870;
			}

			.profiling-demo table {
				width: 100%;
				border-collapse: collapse;
				border: 1px solid #d7dce5;
				border-radius: 8px;
				overflow: hidden;
			}

			.profiling-demo th,
			.profiling-demo td {
				padding: 12px 14px;
				border-bottom: 1px solid #e6e9ef;
				text-align: left;
				vertical-align: top;
			}

			.profiling-demo th {
				background: #f6f8fb;
				font-size: 12px;
				letter-spacing: 0;
				text-transform: uppercase;
				color: #5b667a;
			}

			.profiling-demo tr:last-child td {
				border-bottom: 0;
			}

			.status {
				display: inline-block;
				min-width: 48px;
				padding: 2px 8px;
				border-radius: 6px;
				font-weight: 700;
				text-align: center;
			}

			.pass {
				background: #dff6e7;
				color: #16643a;
			}

			.fail {
				background: #fde2e1;
				color: #9b2420;
			}

			code {
				white-space: pre-wrap;
				color: #30384a;
			}
		</style>
		<section class="profiling-demo">
			<h1>Profiling validation MVP</h1>
			<p>
				Imported FHIR StructureDefinitions are validated against Reference target
				narrowing and pattern constraints.
			</p>
			<table>
				<thead>
					<tr>
						<th>Scenario</th>
						<th>Expected</th>
						<th>Actual</th>
						<th>Validation output</th>
					</tr>
				</thead>
				<tbody>
					${scenarios.map(renderScenario)}
				</tbody>
			</table>
		</section>
	`,
};

export default meta;
type Story = StoryObj;

export const ReferenceNarrowingAndPatterns: Story = {};

function renderScenario(scenario: Scenario) {
	const errors = validateScenario(scenario);
	const actual = errors.length === 0 ? "Pass" : "Fail";

	return html`
		<tr>
			<td>${scenario.name}</td>
			<td><span class=${`status ${scenario.expected.toLowerCase()}`}>${scenario.expected}</span></td>
			<td><span class=${`status ${actual.toLowerCase()}`}>${actual}</span></td>
			<td>
				${errors.length === 0
					? html`<code>No validation errors</code>`
					: html`<code>${errors.map((error) => error.message).join("\n")}</code>`}
			</td>
		</tr>
	`;
}

function validateScenario(scenario: Scenario): KeyErrorPair[] {
	const validations = new StoryValidations().withChoices(
		"vs-observation-status" as CodeIds,
		observationStatusChoices,
	);
	const profile =
		scenario.profile === "reference" ? referenceProfile : patternProfile;

	validateProfile(profile, scenario.data, validations);
	return validations.all();
}
