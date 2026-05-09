import { html } from "lit";
import { deepQuerySelectorAll } from "shadow-dom-testing-library";
import { describe, expect, it } from "vitest";
import { aTimeout } from "../../../../tests/aTimeout";
import { fixture } from "../../../../tests/lit/lit-vitest-fixture";
import { Patient } from "./patient";
import { newbornPatient } from "./patient.story.data";

describe("Patient", () => {
	it("renders root extensions once in structure mode", async () => {
		const patient = await fixture<Patient>(
			html`
        <fhir-shell mode="structure" open>
          <fhir-patient .data=${newbornPatient}></fhir-patient>
        </fhir-shell>
      `,
			"fhir-patient",
		).first();

		await aTimeout(300);

		const mothersMaidenNameExtensions = (
			deepQuerySelectorAll(patient, "fhir-extension", {
				depth: 20,
			}) as Array<HTMLElement & { data?: { url?: string } }>
		).filter(
			(extension) =>
				extension.data?.url ===
				"http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName",
		);

		expect(mothersMaidenNameExtensions).toHaveLength(1);
	});
});
