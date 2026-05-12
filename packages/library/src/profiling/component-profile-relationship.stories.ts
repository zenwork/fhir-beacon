import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { DatatypeDef } from "../DatatypeDef";
import { code } from "../PrimitiveDef";
import { ResourceDef } from "../ResourceDef";
import type { ContactPointData } from "../components";
import type { ObservationData } from "../components/resources/observation";
import type { PatientData } from "../components/resources/patient";
import { define, extend, profile, slice } from "./index";
import {
	type FhirStructureDefinition,
	importFhirStructureDefinition,
} from "./importer";

type DemoObservationData = ObservationData & {
	subject?: { reference?: string; identifier?: unknown };
};

type RelationshipStoryArgs = {
	mode: "display" | "structure";
};

const patientNoteUrl =
	"http://example.org/fhir/StructureDefinition/patient-note";
const birthDateAccuracyUrl =
	"http://example.org/fhir/StructureDefinition/birthdate-accuracy";

const contactPointRequiresPhoneProfile = profile<ContactPointData>({
	type: new DatatypeDef("ContactPoint", "ContactPointRequiresPhone"),
	props: [
		define.oneOf<ContactPointData>("system", code),
		slice.constraint(
			["system"],
			[
				(data: ContactPointData, fixedValue: string) => ({
					success: data.system === fixedValue,
					message: `system must be ${fixedValue}`,
				}),
			],
			["phone"],
		),
	],
});

const patientNoteExtensionProfile = profile<PatientData>({
	type: ResourceDef.Patient.profile("PatientNoteExtension"),
	props: [
		extend.withOne("patientNote", {
			url: patientNoteUrl,
			label: "Patient note",
			valueType: "string",
		}),
	],
});

const birthDateAccuracyProfile = profile<PatientData>({
	type: ResourceDef.Patient.profile("BirthDateAccuracy"),
	props: [
		extend.primitive("birthDate", birthDateAccuracyUrl, [
			{
				url: birthDateAccuracyUrl,
				label: "Birth date accuracy",
				valueType: "code",
				bindings: [{ value: "day", display: "Day known" }],
			},
		]),
	],
});

const observationStatusBindingProfile = profile<ObservationData>({
	type: ResourceDef.Observation.profile("ObservationStatusBinding"),
	props: [
		define.oneOf<ObservationData>("status", code).boundBy([
			{ value: "final", display: "Final" },
			{ value: "amended", display: "Amended" },
		]),
	],
});

const referenceOnlyStructureDefinition = {
	resourceType: "StructureDefinition",
	id: "observation-subject-patient-only",
	name: "ObservationSubjectPatientOnly",
	type: "Observation",
	snapshot: {
		element: [
			{
				id: "Observation",
				path: "Observation",
				min: 0,
				max: "*",
			},
			{
				id: "Observation.subject",
				path: "Observation.subject",
				min: 0,
				max: "1",
				type: [
					{
						code: "Reference",
						targetProfile: [
							"http://hl7.org/fhir/StructureDefinition/Patient",
						],
					},
				],
			},
		],
	},
} satisfies FhirStructureDefinition;

const statusPatternStructureDefinition = {
	resourceType: "StructureDefinition",
	id: "observation-status-final",
	name: "ObservationStatusFinal",
	type: "Observation",
	snapshot: {
		element: [
			{
				id: "Observation",
				path: "Observation",
				min: 0,
				max: "*",
			},
			{
				id: "Observation.status",
				path: "Observation.status",
				min: 0,
				max: "1",
				type: [{ code: "code" }],
				patternCode: "final",
			},
		],
	},
} satisfies FhirStructureDefinition;

const importedReferenceProfile = importFhirStructureDefinition<DemoObservationData>(
	referenceOnlyStructureDefinition,
).profile;

const importedPatternProfile = importFhirStructureDefinition<ObservationData>(
	statusPatternStructureDefinition,
).profile;

const plainContactPoint: ContactPointData = {
	system: "email",
	value: "pat@example.org",
};
const profiledContactPoint = plainContactPoint;
const patientBase: PatientData = {
	resourceType: "Patient",
	name: [],
	telecom: [],
	address: [],
	contact: [],
	communication: [],
	generalPractitioner: [],
	link: [],
};
const patientWithProfiledRootExtension: PatientData = {
	...patientBase,
	extension: [
		{ url: patientNoteUrl, valueString: "Needs interpreter" },
		{
			url: patientNoteUrl,
			valueString: "Second note",
		},
	],
};
const patientWithPrimitiveExtension: PatientData = {
	...patientBase,
	birthDate: "1970-01-01",
	_birthDate: {
		extension: [{ url: birthDateAccuracyUrl, valueCode: "century" }],
	},
};

const referenceObservation: DemoObservationData = {
	resourceType: "Observation",
	status: "final",
	subject: { reference: "Observation/not-a-patient" },
	code: {
		coding: [{ system: "http://loinc.org", code: "85354-9" }],
	},
};

const patternObservation: ObservationData = {
	resourceType: "Observation",
	status: "preliminary",
	code: {
		coding: [{ system: "http://loinc.org", code: "85354-9" }],
	},
	category: [
		{
			coding: [
				{
					system: "http://terminology.hl7.org/CodeSystem/observation-category",
					code: "vital-signs",
				},
			],
		},
	],
};

const bindingObservation: ObservationData = {
	resourceType: "Observation",
	status: "preliminary",
	code: {
		coding: [{ system: "http://loinc.org", code: "85354-9" }],
	},
	category: [
		{
			coding: [
				{
					system: "http://terminology.hl7.org/CodeSystem/observation-category",
					code: "vital-signs",
				},
			],
		},
	],
};

const meta: Meta<RelationshipStoryArgs> = {
	title: "Profiling/Component Relationship",
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		mode: {
			control: { type: "inline-radio" },
			options: ["display", "structure"],
		},
	},
	render: (args) => html`
		<style>
			.relationship-demo {
				box-sizing: border-box;
				width: min(1760px, calc(100vw - 40px));
				margin: 0 auto;
				padding: 28px 0 36px;
				color: #172033;
				font: 14px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
			}

			.relationship-demo h1 {
				margin: 0 0 6px;
				font-size: 26px;
				line-height: 1.2;
			}

			.relationship-demo h2 {
				margin: 0 0 8px;
				font-size: 18px;
				line-height: 1.25;
			}

			.relationship-demo h3 {
				margin: 0 0 8px;
				font-size: 14px;
				line-height: 1.25;
			}

			.relationship-demo p {
				margin: 0;
				color: #4c5870;
			}

			.relationship-demo .lead {
				max-width: 920px;
				margin-bottom: 24px;
			}

			.relationship-row {
				padding: 24px 0;
				border-top: 1px solid #dce1ea;
			}

			.relationship-row:first-of-type {
				border-top: 0;
			}

			.relationship-copy {
				max-width: 940px;
				margin-bottom: 14px;
			}

			.stage {
				display: grid;
				grid-template-columns: minmax(340px, 0.7fr) minmax(760px, 1.3fr);
				gap: 16px;
				align-items: start;
			}

			.stage.single {
				grid-template-columns: minmax(0, 1fr);
			}

			.panel {
				border: 1px solid #d7dce5;
				border-radius: 8px;
				padding: 14px;
				background: #fff;
				min-width: 0;
				overflow: hidden;
			}

			.panel.plain {
				background: #fafbfc;
			}

			.panel.profiled {
				border-color: #a7bfdc;
				background: #f8fbff;
			}

			.profiled-content {
				display: grid;
				grid-template-columns: minmax(360px, 0.95fr) minmax(440px, 1.05fr);
				gap: 14px;
				align-items: start;
			}

			.component-preview {
				min-width: 0;
			}

			.profile-code {
				min-width: 0;
			}

			.profile-code summary {
				cursor: pointer;
				font-weight: 700;
				color: #38465c;
				margin-bottom: 8px;
			}

			.profile-code pre {
				box-sizing: border-box;
				width: 100%;
				max-height: 520px;
				overflow: auto;
				margin: 0;
				padding: 10px;
				border: 1px solid #d7dce5;
				border-radius: 6px;
				background: #f6f8fb;
				color: #1f2937;
				font-size: 12px;
				line-height: 1.45;
				white-space: pre;
				word-break: normal;
			}

			.badge {
				display: inline-block;
				margin-bottom: 10px;
				padding: 3px 7px;
				border-radius: 6px;
				background: #eef2f7;
				color: #38465c;
				font-size: 12px;
				font-weight: 700;
			}

			.badge.profile {
				background: #e5f0ff;
				color: #1f5f9f;
			}

			code {
				color: #30384a;
			}

			@media (max-width: 1280px) {
				.stage {
					grid-template-columns: 1fr;
				}
			}

			@media (max-width: 920px) {
				.profiled-content {
					grid-template-columns: 1fr;
				}
			}

			@media (max-width: 720px) {
				.relationship-demo {
					width: min(100% - 24px, 1760px);
					padding-top: 20px;
				}
			}
		</style>

		<section class="relationship-demo">
			<h1>Components, extensions, and profiles</h1>
			<p class="lead">
				Each row renders the same data twice. The left panel is the standard
				component with no profile. The right panel attaches a Beacon profile to
				the same component and data.
			</p>

			${renderContactPointComparison(args.mode)}
			${renderRootExtensionComparison(args.mode)}
			${renderPrimitiveExtensionComparison(args.mode)}
			${renderReferenceProfileComparison(args.mode)}
			${renderBindingProfileComparison(args.mode)}
			${renderPatternProfileComparison(args.mode)}
		</section>
	`,
};

export default meta;
type Story = StoryObj<RelationshipStoryArgs>;

export const HowProfilesAttachToComponents: Story = {
	args: {
		mode: "structure",
	},
};

function renderContactPointComparison(mode: RelationshipStoryArgs["mode"]) {
	return html`
		<section class="relationship-row">
			<div class="relationship-copy">
				<h2>1. Same component, profile optional</h2>
				<p>
					Without a profile, <code>fhir-contact-point</code> renders the data as
					received. With a profile, the same component also checks that
					<code>system</code> is fixed to <code>phone</code>.
				</p>
			</div>
			<div class="stage">
				<div class="panel plain">
					<span class="badge">standard component</span>
					<fhir-shell .mode=${mode} open showerror>
						<fhir-contact-point
							.data=${plainContactPoint}
							open
							showerror
						></fhir-contact-point>
					</fhir-shell>
				</div>
				<div class="panel profiled">
					<span class="badge profile">same component + Beacon profile</span>
					<div class="profiled-content">
						<div class="component-preview">
							<fhir-shell .mode=${mode} open showerror>
								<fhir-contact-point
									.data=${profiledContactPoint}
									.profile=${contactPointRequiresPhoneProfile}
									open
									showerror
								></fhir-contact-point>
							</fhir-shell>
						</div>
						${renderProfileCode(contactPointRequiresPhoneProfile.toJSON())}
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderRootExtensionComparison(mode: RelationshipStoryArgs["mode"]) {
	return html`
		<section class="relationship-row">
			<div class="relationship-copy">
				<h2>2. Root extensions become readable</h2>
				<p>
					The raw Patient contains a normal FHIR <code>extension</code> array.
					The profile declares exactly one Patient note extension, so the second
					note is a profile error.
				</p>
			</div>
			<div class="stage">
				<div class="panel plain">
					<span class="badge">standard component</span>
					<fhir-shell .mode=${mode} open showerror>
						<fhir-patient
							.data=${patientWithProfiledRootExtension}
							open
							showerror
						></fhir-patient>
					</fhir-shell>
				</div>
				<div class="panel profiled">
					<span class="badge profile">same data + root extension profile</span>
					<div class="profiled-content">
						<div class="component-preview">
							<fhir-shell .mode=${mode} open showerror>
								<fhir-patient
									.data=${patientWithProfiledRootExtension}
									.profile=${patientNoteExtensionProfile}
									open
									showerror
								></fhir-patient>
							</fhir-shell>
						</div>
						${renderProfileCode(patientNoteExtensionProfile.toJSON())}
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderPrimitiveExtensionComparison(mode: RelationshipStoryArgs["mode"]) {
	return html`
		<section class="relationship-row">
			<div class="relationship-copy">
				<h2>3. Primitive extensions get validation</h2>
				<p>
					Primitive extensions live under underscore fields such as
					<code>_birthDate.extension</code>. The profile lets the same patient
					component render the extension and validate its allowed code.
				</p>
			</div>
			<div class="stage">
				<div class="panel plain">
					<span class="badge">standard component</span>
					<fhir-shell .mode=${mode} open showerror>
						<fhir-patient
							.data=${patientWithPrimitiveExtension}
							open
							showerror
						></fhir-patient>
					</fhir-shell>
				</div>
				<div class="panel profiled">
					<span class="badge profile">same data + primitive extension profile</span>
					<div class="profiled-content">
						<div class="component-preview">
							<fhir-shell .mode=${mode} open showerror>
								<fhir-patient
									.data=${patientWithPrimitiveExtension}
									.profile=${birthDateAccuracyProfile}
									open
									showerror
								></fhir-patient>
							</fhir-shell>
						</div>
						${renderProfileCode(birthDateAccuracyProfile.toJSON())}
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderReferenceProfileComparison(mode: RelationshipStoryArgs["mode"]) {
	return html`
		<section class="relationship-row">
			<div class="relationship-copy">
				<h2>4. Imported profiles constrain references</h2>
				<p>
					The imported Observation profile narrows <code>subject</code> to
					Patient references. The standard component renders the reference; the
					profiled component flags the wrong target type.
				</p>
			</div>
			<div class="stage">
				<div class="panel plain">
					<span class="badge">standard component</span>
					<fhir-shell .mode=${mode} open showerror>
						<fhir-observation
							.data=${referenceObservation}
							open
							showerror
						></fhir-observation>
					</fhir-shell>
				</div>
				<div class="panel profiled">
					<span class="badge profile">same data + imported Reference profile</span>
					<div class="profiled-content">
						<div class="component-preview">
							<fhir-shell .mode=${mode} open showerror>
								<fhir-observation
									.data=${referenceObservation}
									.profile=${importedReferenceProfile}
									open
									showerror
								></fhir-observation>
							</fhir-shell>
						</div>
						${renderProfileCode(referenceOnlyStructureDefinition)}
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderPatternProfileComparison(mode: RelationshipStoryArgs["mode"]) {
	return html`
		<section class="relationship-row">
			<div class="relationship-copy">
				<h2>6. Imported profiles constrain values</h2>
				<p>
					The imported pattern profile requires <code>status</code> to match
					<code>final</code>. The data is unchanged; only the attached profile
					changes what the component can validate.
				</p>
			</div>
			<div class="stage">
				<div class="panel plain">
					<span class="badge">standard component</span>
					<fhir-shell .mode=${mode} open showerror>
						<fhir-observation
							.data=${patternObservation}
							open
							showerror
						></fhir-observation>
					</fhir-shell>
				</div>
				<div class="panel profiled">
					<span class="badge profile">same data + imported pattern profile</span>
					<div class="profiled-content">
						<div class="component-preview">
							<fhir-shell .mode=${mode} open showerror>
								<fhir-observation
									.data=${patternObservation}
									.profile=${importedPatternProfile}
									open
									showerror
								></fhir-observation>
							</fhir-shell>
						</div>
						${renderProfileCode(statusPatternStructureDefinition)}
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderBindingProfileComparison(mode: RelationshipStoryArgs["mode"]) {
	return html`
		<section class="relationship-row">
			<div class="relationship-copy">
				<h2>5. Profile bindings validate allowed codes</h2>
				<p>
					The base Observation allows <code>preliminary</code>, but this profile
					binds <code>status</code> to the smaller list <code>final</code> and
					<code>amended</code>.
				</p>
			</div>
			<div class="stage">
				<div class="panel plain">
					<span class="badge">standard component</span>
					<fhir-shell .mode=${mode} open showerror>
						<fhir-observation
							.data=${bindingObservation}
							open
							showerror
						></fhir-observation>
					</fhir-shell>
				</div>
				<div class="panel profiled">
					<span class="badge profile">same data + status binding profile</span>
					<div class="profiled-content">
						<div class="component-preview">
							<fhir-shell .mode=${mode} open showerror>
								<fhir-observation
									.data=${bindingObservation}
									.profile=${observationStatusBindingProfile}
									open
									showerror
								></fhir-observation>
							</fhir-shell>
						</div>
						${renderProfileCode(observationStatusBindingProfile.toJSON())}
					</div>
				</div>
			</div>
		</section>
	`;
}

function renderProfileCode(source: unknown) {
	return html`
		<details class="profile-code" open>
			<summary>Profile</summary>
			<pre><code>${JSON.stringify(source, null, 2)}</code></pre>
		</details>
	`;
}
