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
