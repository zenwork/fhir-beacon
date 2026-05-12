import { html } from "lit";
import { deepQuerySelectorAll } from "shadow-dom-testing-library";
import { describe, expect, it } from "vitest";
import { aTimeout } from "../../tests/aTimeout";
import { fixture } from "../../tests/lit/lit-vitest-fixture";
import { DatatypeDef, ContactPoint as ContactPointDef } from "../DatatypeDef";
import { code } from "../PrimitiveDef";
import { ContactPointData } from "../components";
import { ContactPoint } from "../components/complex/contact-point/contact-point";
import { Shell } from "../shell";
import { define, extend, profile } from "./index";

describe("profile extension rendering", () => {
	const primitiveUrl = "http://example.org/fhir/StructureDefinition/use-category";
	const rootUrl = "http://example.org/fhir/StructureDefinition/contact-note";
	const complexUrl = "http://example.org/fhir/StructureDefinition/contact-trial";
	const modifierUrl = "http://example.org/fhir/StructureDefinition/do-not-call";

	it("renders profile-defined primitive extensions without custom render callbacks", async () => {
		const contactPointProfile = profile<ContactPointData>({
			type: new DatatypeDef("ContactPoint", "ProfiledContactPoint"),
			base: profile<ContactPointData>({
				type: ContactPointDef,
				props: [define.oneOf("system", code).optional()],
			}),
			props: [
				extend.primitive("use", primitiveUrl, [
					{
						key: "useCategory",
						url: primitiveUrl,
						label: "Use category",
						valueType: "CodeableConcept",
						bindings: [{ value: "home", display: "Home" }],
					},
				]),
			],
		});

		const el = await fixture<ContactPoint>(html`
      <fhir-shell showerror>
        <fhir-contact-point
          .profile=${contactPointProfile}
          .data=${{
						system: "phone",
						value: "+15551234567",
						use: "home",
						_use: {
							extension: [
								{
									url: primitiveUrl,
									valueCodeableConcept: {
										coding: [{ code: "bad" }],
									},
								},
							],
						},
					}}
        ></fhir-contact-point>
      </fhir-shell>
    `, "fhir-contact-point").first();

		await aTimeout(300);

		const label = el.queryShadow<HTMLElement>({
			select: ["fhir-extension", "fhir-codeable-concept"],
		});
		expect(label).toHaveAttribute("label", "Use category");

		const error = el.queryShadow<HTMLElement>({
			select: [
				"fhir-extension",
				"fhir-codeable-concept",
				"fhir-coding",
				"fhir-primitive",
				"fhir-error",
				"div",
			],
		});
		expect(error).toHaveTextContent("'bad' is not a valid choice");
	});

	it("renders profile-defined root extensions with profile labels", async () => {
		const contactPointProfile = profile<ContactPointData>({
			type: new DatatypeDef("ContactPoint", "ProfiledContactPoint"),
			props: [
				extend.withOne("contactNote", {
					url: rootUrl,
					label: "Contact note",
					valueType: "string",
				}),
			],
		});

		const el = await fixture<ContactPoint>(html`
      <fhir-contact-point
        .profile=${contactPointProfile}
        .data=${{
					system: "phone",
					value: "+15551234567",
					extension: [{ url: rootUrl, valueString: "Call after 5pm" }],
				}}
      ></fhir-contact-point>
    `).first();

		await aTimeout(200);

		const primitive = el.queryShadow<HTMLElement>({
			select: ["fhir-extension", "fhir-primitive", "fhir-value", "div"],
		});
		expect(primitive).toHaveTextContent("Call after 5pm");
		const primitiveHost = el.queryShadow<HTMLElement>({
			select: ["fhir-extension", "fhir-primitive"],
		});
		expect(primitiveHost).toHaveAttribute("label", "Contact note");
	});

	it("groups display-mode extensions by mapped or derived extension labels", async () => {
		const mappedUrl = "http://example.org/fhir/StructureDefinition/preferred-note";
		const derivedUrl = "http://example.org/fhir/StructureDefinition/contact-window";

		const el = await fixture<ContactPoint>(html`
      <fhir-contact-point
        .extensionLabels=${{ [mappedUrl]: "Preferred note" }}
        .data=${{
					system: "phone",
					value: "+15551234567",
					extension: [
						{ url: mappedUrl, valueString: "Call after 5pm" },
						{ url: derivedUrl, valueString: "Weekdays" },
					],
				}}
      ></fhir-contact-point>
    `).first();

		await aTimeout(200);

		const extensionHosts = deepQuerySelectorAll(el, "fhir-extension", {
			depth: 20,
		}) as Array<HTMLElement & { label?: string }>;
		const labels = extensionHosts.map((host) => host.label);
		expect(labels).toContain("Preferred note");
		expect(labels).toContain("contact window");
		expect(labels).not.toContain("1");

		const wrappers = deepQuerySelectorAll(el, "fhir-wrapper", {
			depth: 20,
		}) as HTMLElement[];
		expect(wrappers.map((wrapper) => wrapper.getAttribute("label"))).not.toContain(
			"extensions",
		);
	});

	it("separates repeated display-mode complex extension instances", async () => {
		const repeatedUrl =
			"http://hl7.org/fhir/StructureDefinition/individual-recordedSexOrGender";
		const data = {
			system: "phone",
			value: "+15551234567",
			extension: [
				{
					url: repeatedUrl,
					extension: [
						{
							url: "value",
							valueCodeableConcept: {
								coding: [{ code: "male", display: "Male" }],
							},
						},
						{
							url: "type",
							valueCodeableConcept: {
								coding: [
									{ code: "birth-certificate", display: "Birth certificate" },
								],
							},
						},
						{ url: "sourceField", valueString: "SEX" },
					],
				},
				{
					url: repeatedUrl,
					extension: [
						{
							url: "value",
							valueCodeableConcept: {
								coding: [{ code: "male", display: "Male" }],
							},
						},
						{
							url: "type",
							valueCodeableConcept: {
								coding: [{ code: "insurance-card", display: "Insurance card" }],
							},
						},
						{ url: "sourceField", valueString: "SEX" },
					],
				},
			],
		};

		const el = await fixture<ContactPoint>(html`
      <fhir-contact-point .data=${data}></fhir-contact-point>
    `).first();

		await aTimeout(200);

		const wrapperLabels = (
			deepQuerySelectorAll(el, "fhir-wrapper", { depth: 20 }) as HTMLElement[]
		).map((wrapper) => wrapper.getAttribute("label"));

		expect(wrapperLabels).toContain("individual recorded Sex Or Gender");
		expect(wrapperLabels).toContain("1");
		expect(wrapperLabels).toContain("2");
		expect(wrapperLabels).not.toContain("individual recorded Sex Or Gender 1");
		expect(wrapperLabels).not.toContain("individual recorded Sex Or Gender 2");
		expect(wrapperLabels).not.toContain("extensions");

		const primitiveLabels = (
			deepQuerySelectorAll(el, "fhir-primitive", { depth: 20 }) as HTMLElement[]
		).map((primitive) => primitive.getAttribute("label"));
		expect(primitiveLabels).toContain("source Field");
		expect(primitiveLabels).toContain("coding");
	});

	it("recursively groups repeated nested extensions by mapped labels", async () => {
		const parentUrl = "http://example.org/fhir/StructureDefinition/parent-note";
		const nestedUrl = "http://example.org/fhir/StructureDefinition/nested-note";
		const data = {
			system: "phone",
			value: "+15551234567",
			extension: [
				{
					url: parentUrl,
					extension: [
						{ url: nestedUrl, valueString: "first nested value" },
						{ url: nestedUrl, valueString: "second nested value" },
					],
				},
			],
		};

		const el = await fixture<ContactPoint>(html`
      <fhir-contact-point
        .extensionLabels=${{
					[parentUrl]: "Parent note",
					[nestedUrl]: "Nested note",
				}}
        .data=${data}
      ></fhir-contact-point>
    `).first();

		await aTimeout(200);

		const wrapperLabels = (
			deepQuerySelectorAll(el, "fhir-wrapper", { depth: 20 }) as HTMLElement[]
		).map((wrapper) => wrapper.getAttribute("label"));

		expect(wrapperLabels).toContain("Parent note");
		expect(wrapperLabels).toContain("Nested note");
		expect(wrapperLabels).toContain("1");
		expect(wrapperLabels).toContain("2");
		expect(wrapperLabels).not.toContain("Nested note 1");
		expect(wrapperLabels).not.toContain("Nested note 2");
		expect(wrapperLabels).not.toContain("extensions");
	});

	it("renders repeated CodeableReference extension values", async () => {
		const parentUrl =
			"http://hl7.org/fhir/StructureDefinition/patient-sexParameterForClinicalUse";
		const data = {
			system: "phone",
			value: "+15551234567",
			extension: [
				{
					url: parentUrl,
					extension: [
						{
							url: "supportingInfo",
							valueCodeableReference: {
								reference: { reference: "Observation/1" },
							},
						},
						{
							url: "supportingInfo",
							valueCodeableReference: {
								reference: { reference: "MedicationStatement/2" },
							},
						},
					],
				},
			],
		};

		const el = await fixture<ContactPoint>(html`
      <fhir-contact-point .data=${data}></fhir-contact-point>
    `).first();

		await aTimeout(200);

		const wrapperLabels = (
			deepQuerySelectorAll(el, "fhir-wrapper", { depth: 20 }) as HTMLElement[]
		).map((wrapper) => wrapper.getAttribute("label"));
		expect(wrapperLabels).toContain("supporting Info");
		expect(wrapperLabels).toContain("1");
		expect(wrapperLabels).toContain("2");
		expect(wrapperLabels).not.toContain("supporting Info 1");
		expect(wrapperLabels).not.toContain("supporting Info 2");

		const primitiveValues = (
			deepQuerySelectorAll(el, "fhir-primitive", { depth: 20 }) as Array<
				HTMLElement & { value?: string }
			>
		).map((primitive) => primitive.value);
		expect(primitiveValues).toContain("Observation/1");
		expect(primitiveValues).toContain("MedicationStatement/2");
	});

	it("displays an error for unsupported extension value rendering", async () => {
		const unsupportedUrl = "http://example.org/fhir/StructureDefinition/address-note";
		const unknownUrl = "http://example.org/fhir/StructureDefinition/meta-note";
		const el = await fixture<ContactPoint>(html`
      <fhir-contact-point
        .data=${{
					system: "phone",
					value: "+15551234567",
					extension: [
						{
							url: unsupportedUrl,
							valueAddress: { city: "Toronto" },
						},
						{
							url: unknownUrl,
							valueMeta: { source: "example" },
						},
					],
				}}
      ></fhir-contact-point>
    `).first();

		await aTimeout(200);

		const unsupported = deepQuerySelectorAll(el, "fhir-not-supported", {
			depth: 20,
		}) as HTMLElement[];
		expect(unsupported).toHaveLength(2);
		expect(
			unsupported.map((element) => element.getAttribute("description")),
		).toContain("Extension value valueAddress cannot be rendered.");
		expect(
			unsupported.map((element) => element.getAttribute("description")),
		).toContain("Extension value valueMeta cannot be rendered.");
	});

	it("renders nested complex extensions in display and structure modes", async () => {
		const contactPointProfile = profile<ContactPointData>({
			type: new DatatypeDef("ContactPoint", "ProfiledContactPoint"),
			props: [
				extend.withComplex("contactTrial", {
					url: complexUrl,
					label: "Contact trial",
					extensions: [
						{
							url: "trialNumber",
							label: "Trial number",
							valueType: "string",
						},
					],
				}),
			],
		});
		const data = {
			system: "phone",
			value: "+15551234567",
			extension: [
				{
					url: complexUrl,
					extension: [{ url: "trialNumber", valueString: "NCT-123" }],
				},
			],
		};

		const display = await fixture<ContactPoint>(html`
      <fhir-contact-point .profile=${contactPointProfile} .data=${data}></fhir-contact-point>
    `).first();
		const structure = await fixture<ContactPoint>(html`
      <fhir-shell mode="structure" open>
        <fhir-contact-point .profile=${contactPointProfile} .data=${data}></fhir-contact-point>
      </fhir-shell>
    `, "fhir-contact-point").first();

		await aTimeout(300);

		for (const el of [display, structure]) {
			const primitives = deepQuerySelectorAll(el, "fhir-primitive", {
				depth: 20,
			}) as HTMLElement[];
			expect(
				primitives.some(
					(primitive) => primitive.getAttribute("label") === "Trial number",
				),
			).toBe(true);
			expect(
				primitives.some(
					(primitive) => primitive.getAttribute("value") === "NCT-123",
				),
			).toBe(true);
		}

		const displayWrappers = deepQuerySelectorAll(display, "fhir-wrapper", {
			depth: 20,
		}) as HTMLElement[];
		const displayWrapperLabels = displayWrappers.map((wrapper) =>
			wrapper.getAttribute("label"),
		);
		expect(displayWrapperLabels).toContain("Contact trial");
		expect(displayWrapperLabels).not.toContain("Contact trial 1");
		expect(displayWrapperLabels).not.toContain("extensions");
	});

	it("renders modifier extensions distinctly", async () => {
		const contactPointProfile = profile<ContactPointData>({
			type: new DatatypeDef("ContactPoint", "ProfiledContactPoint"),
			props: [
				extend.withModifier("doNotCall", {
					url: modifierUrl,
					label: "Do not call",
					valueType: "boolean",
				}),
			],
		});

		const el = await fixture<Shell>(html`
      <fhir-shell showerror>
        <fhir-contact-point
          .profile=${contactPointProfile}
          .data=${{
						system: "phone",
						value: "+15551234567",
						modifierExtension: [{ url: modifierUrl, valueBoolean: true }],
					}}
        ></fhir-contact-point>
      </fhir-shell>
    `).first();

		await aTimeout(200);

		const primitive = el.queryShadow<HTMLElement>({
			select: ["fhir-extension", "fhir-primitive", "fhir-value", "div"],
		});
		expect(primitive).toHaveTextContent("true");
		const primitiveHost = el.queryShadow<HTMLElement>({
			select: ["fhir-extension", "fhir-primitive"],
		});
		expect(primitiveHost).toHaveAttribute("label", "Modifier: Do not call");
	});
});
