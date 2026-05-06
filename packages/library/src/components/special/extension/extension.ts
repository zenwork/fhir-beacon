import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { OpenType, OpenTypeNameEnum } from "../../../OpenType";
import {
	BaseElement,
	Decorated,
	FhirExtensionData,
	Validations,
	ValuePrefixKey,
} from "../../../internal";
import { DisplayConfig, DisplayMode } from "../../../shell";
import { PrimitiveType, asReadable } from "../../primitive";

@customElement("fhir-extension")
export class Extension extends BaseElement<FhirExtensionData<OpenType>> {
	#valueType: OpenTypeNameEnum[] = [];
	#extensionType: "unknown" | "simple" | "complex" = "unknown";

	constructor() {
		super("Extension");
	}

	public renderStructure(
		_config: DisplayConfig,
		data: Decorated<FhirExtensionData<OpenType>>,
		_validations: Validations,
	): TemplateResult[] {
		let templates: TemplateResult[] = [];
		templates = [
			html`<fhir-primitive key="url" type=${PrimitiveType.none} .value=${data.url}></fhir-primitive>`,
		];

		this.addTemplate(templates, data, this.#valueType[0]);

		return [html`${templates}`];
	}

	public renderDisplay(
		_config: DisplayConfig,
		data: Decorated<FhirExtensionData<OpenType>>,
		_validations: Validations,
	): TemplateResult[] {
		let templates: TemplateResult[] = [];
		if (this.mode !== DisplayMode.display) {
			templates = [
				html`<fhir-primitive key="url" type=${PrimitiveType.uri} .value=${data.url}></fhir-primitive>`,
			];
		}
		if (this.#extensionType === "simple" && this.#valueType) {
			this.addTemplate(templates, data, this.#valueType[0]);
		}
		if (this.#extensionType === "complex") {
			const subs: TemplateResult[] = [];
			data.extension!.forEach((extension, index) =>
				this.addTemplate(subs, extension, this.#valueType[index]),
			);
			templates.push(html`${subs}`);
		}

		return templates;
	}

	public decorate(
		data: Decorated<FhirExtensionData<OpenType>>,
		_validations: Validations,
		_fetched: boolean,
	): void {
		reduceValueType(this.#valueType, data);
		if (this.#valueType.length === 1) this.#extensionType = "simple";

		if (data.extension && data.extension.length > 0) {
			this.#extensionType = "complex";
			data.extension.reduce(reduceValueType, this.#valueType);
		}
	}

	public validate(
		data: FhirExtensionData<OpenType>,
		validations: Validations,
		_fetched: boolean,
	): void {
		if (!data.url) {
			validations.add({
				fqk: { path: [{ node: "url" }] },
				message: "url is required",
			});
		}
	}

	private addTemplate(
		templates: TemplateResult[],
		data: FhirExtensionData<OpenType>,
		valueType: OpenTypeNameEnum,
	): void {
		switch (valueType) {
			case OpenTypeNameEnum.Age:
			case OpenTypeNameEnum.Count:
			case OpenTypeNameEnum.Distance:
			case OpenTypeNameEnum.Duration:
				templates.push(html`
              <fhir-quantity key=${data.url} label=${toLabel(data)} .data=${data[`value${valueType}` as keyof FhirExtensionData<OpenType>]}></fhir-quantity>
          `);
				break;
			case OpenTypeNameEnum.Annotation:
				templates.push(html`
              <fhir-annotation key=${data.url} label=${toLabel(data)} .data=${data.valueAnnotation}></fhir-annotation>
          `);
				break;
			case OpenTypeNameEnum.Attachment:
				templates.push(html`
              <fhir-attachment key=${data.url} label=${toLabel(data)} .data=${data.valueAttachment}></fhir-attachment>
          `);
				break;
			case OpenTypeNameEnum.Base64Binary:
				templates.push(
					valueTemplate(
						data,
						"valueBase64Binary",
						PrimitiveType.base64,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Boolean:
				templates.push(
					valueTemplate(data, "valueBoolean", PrimitiveType.boolean, this.mode),
				);
				break;
			case OpenTypeNameEnum.Canonical:
				templates.push(
					valueTemplate(
						data,
						"valueCanonical",
						PrimitiveType.canonical,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Code:
				templates.push(
					valueTemplate(data, "valueCode", PrimitiveType.code, this.mode),
				);
				break;
			case OpenTypeNameEnum.CodeableConcept:
				templates.push(html`
              <fhir-codeable-concept key=${data.url} label=${toLabel(data)} .data=${data.valueCodeableConcept}></fhir-codeable-concept>
          `);
				break;
			case OpenTypeNameEnum.Coding:
				templates.push(html`
              <fhir-coding key=${data.url} label=${toLabel(data)} .data=${data.valueCoding}></fhir-coding>
          `);
				break;
			case OpenTypeNameEnum.ContactDetail:
			case OpenTypeNameEnum.DataRequirement:
			case OpenTypeNameEnum.Dosage:
			case OpenTypeNameEnum.Expression:
			case OpenTypeNameEnum.ParameterDefinition:
			case OpenTypeNameEnum.RelatedArtifact:
			case OpenTypeNameEnum.TriggerDefinition:
			case OpenTypeNameEnum.UsageContext:
				templates.push(html`
              <fhir-primitive key=${data.url}
                              label=${toLabel(data)}
                              type=${PrimitiveType.fhir_string}
                              .value=${JSON.stringify(data[`value${valueType}` as keyof FhirExtensionData<OpenType>])}
              ></fhir-primitive>
          `);
				break;
			case OpenTypeNameEnum.ContactPoint:
				templates.push(html`
              <fhir-contact-point key=${data.url} label=${toLabel(data)} .data=${data.valueContactPoint}></fhir-contact-point>
          `);
				break;
			case OpenTypeNameEnum.Date:
				templates.push(
					valueTemplate(data, "valueDate", PrimitiveType.date, this.mode),
				);
				break;
			case OpenTypeNameEnum.DateTime:
				templates.push(
					valueTemplate(
						data,
						"valueDateTime",
						PrimitiveType.datetime,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Decimal:
				templates.push(
					valueTemplate(data, "valueDecimal", PrimitiveType.decimal, this.mode),
				);
				break;
			case OpenTypeNameEnum.HumanName:
				templates.push(html`
              <fhir-human-name key=${data.url} label=${toLabel(data)} .data=${data.valueHumanName}></fhir-human-name>
          `);
				break;
			case OpenTypeNameEnum.Id:
				templates.push(
					valueTemplate(data, "valueId", PrimitiveType.id, this.mode),
				);
				break;
			case OpenTypeNameEnum.Identifier:
				templates.push(html`
              <fhir-identifier key=${data.url} label=${toLabel(data)} .data=${data.valueIdentifier}></fhir-identifier>
          `);
				break;
			case OpenTypeNameEnum.Instant:
				templates.push(
					valueTemplate(data, "valueInstant", PrimitiveType.instant, this.mode),
				);
				break;
			case OpenTypeNameEnum.Integer:
				templates.push(
					valueTemplate(data, "valueInteger", PrimitiveType.integer, this.mode),
				);
				break;
			case OpenTypeNameEnum.Markdown:
				templates.push(
					valueTemplate(
						data,
						"valueMarkdown",
						PrimitiveType.markdown,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Money:
				templates.push(html`
              <fhir-money key=${data.url} label=${toLabel(data)} .data=${data.valueMoney}></fhir-money>
          `);
				break;
			case OpenTypeNameEnum.Oid:
				templates.push(
					valueTemplate(data, "valueOid", PrimitiveType.uri, this.mode),
				);
				break;
			case OpenTypeNameEnum.Period:
				templates.push(html`
              <fhir-period key=${data.url} label=${toLabel(data)} .data=${data.valuePeriod}></fhir-period>
          `);
				break;
			case OpenTypeNameEnum.PositiveInt:
				templates.push(
					valueTemplate(
						data,
						"valuePositiveInt",
						PrimitiveType.positiveInt,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Quantity:
				templates.push(html`
              <fhir-quantity key=${data.url} label=${toLabel(data)} .data=${data.valueQuantity}></fhir-quantity>
          `);
				break;
			case OpenTypeNameEnum.Range:
				templates.push(html`
              <fhir-range key=${data.url} label=${toLabel(data)} .data=${data.valueRange}></fhir-range>
          `);
				break;
			case OpenTypeNameEnum.Ratio:
				templates.push(html`
              <fhir-ratio key=${data.url} label=${toLabel(data)} .data=${data.valueRatio}></fhir-ratio>
          `);
				break;
			case OpenTypeNameEnum.Reference:
				templates.push(html`
              <fhir-reference key=${data.url} label=${toLabel(data)} .data=${data.valueReference}></fhir-reference>
          `);
				break;
			case OpenTypeNameEnum.SampledData:
				templates.push(html`
              <fhir-sampled-data key=${data.url} label=${toLabel(data)} .data=${data.valueSampledData}></fhir-sampled-data>
          `);
				break;
			case OpenTypeNameEnum.Signature:
				templates.push(html`
              <fhir-signature key=${data.url} label=${toLabel(data)} .data=${data.valueSignature}></fhir-signature>
          `);
				break;
			case OpenTypeNameEnum.String:
				templates.push(
					valueTemplate(
						data,
						"valueString",
						PrimitiveType.fhir_string,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Time:
				templates.push(
					valueTemplate(data, "valueTime", PrimitiveType.time, this.mode),
				);
				break;
			case OpenTypeNameEnum.Timing:
				templates.push(html`
              <fhir-timing key=${data.url} label=${toLabel(data)} .data=${data.valueTiming}></fhir-timing>
          `);
				break;
			case OpenTypeNameEnum.UnsignedInt:
				templates.push(
					valueTemplate(
						data,
						"valueUnsignedInt",
						PrimitiveType.unsigned_int,
						this.mode,
					),
				);
				break;
			case OpenTypeNameEnum.Uri:
				templates.push(
					valueTemplate(data, "valueUri", PrimitiveType.uri, this.mode),
				);
				break;
			case OpenTypeNameEnum.Url:
				templates.push(
					valueTemplate(data, "valueUrl", PrimitiveType.url, this.mode),
				);
				break;
			case OpenTypeNameEnum.Uuid:
				templates.push(
					valueTemplate(data, "valueUuid", PrimitiveType.uuid, this.mode),
				);
				break;
		}
	}
}

function reduceValueType(
	types: OpenTypeNameEnum[],
	ext: FhirExtensionData<OpenType>,
): OpenTypeNameEnum[] {
	const extensionName: string = Object.keys(ext)
		.filter((k) => k.startsWith("value"))
		.map((k) => k.substring(5))
		.find((k) => !!k)!;

	if (extensionName) {
		const type: OpenTypeNameEnum | null = findType(extensionName);
		if (type) types.push(type);
	}

	return types;
}

function findType(simpleExtensionName: string): OpenTypeNameEnum | null {
	const normalizedType = simpleExtensionName.toLowerCase();
	const type =
		Object.values(OpenTypeNameEnum).find(
			(type) => type.toLowerCase() === normalizedType,
		) ?? null;
	return type;
}

function toLabel(data: FhirExtensionData<OpenType>): string {
	return data.url
		? asReadable(data.url.substring(data.url.lastIndexOf("/") + 1))
		: data.id
			? data.id
			: "n/a";
}


function valueTemplate(
	data: FhirExtensionData<OpenType>,
	valueKey: ValuePrefixKey,
	type: PrimitiveType,
	mode: DisplayMode,
): TemplateResult<1> {
	if (mode === DisplayMode.display) {
		return html`
        <fhir-primitive key=${data.url}
                        label=${toLabel(data)}
                        context=${data.url}
                        type=${type}
                        .value=${data[valueKey as keyof FhirExtensionData<OpenType>]}
        ></fhir-primitive> `;
	} else {
		return html`
        <fhir-primitive key=${data.url}
                      label=${valueKey}
                      type=${type}
                        .value=${data[valueKey as keyof FhirExtensionData<OpenType>]}
      ></fhir-primitive> `;
	}
}
