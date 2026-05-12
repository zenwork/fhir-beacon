import { TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { OpenType, OpenTypeNameEnum } from "../../../OpenType";
import {
	BaseElement,
	Decorated,
	ErrorNodeKey,
	FqkMap,
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

	@property({ type: Object, attribute: false })
	public labelMap: Record<string, string> = {};

	@property({ type: Boolean })
	public modifier: boolean = false;

	constructor() {
		super("Extension");
	}

	public renderStructure(
		config: DisplayConfig,
		data: Decorated<FhirExtensionData<OpenType>>,
		validations: Validations,
	): TemplateResult[] {
		let templates: TemplateResult[] = [];
		templates = [
			html`<fhir-primitive key="url" label=${this.modifier ? "modifierExtension url" : "url"} type=${PrimitiveType.none} .value=${data.url} .errormessage=${extensionErrorMessage(validations, data)} ?showerror=${this.showerror}></fhir-primitive>`,
		];

		if (this.#extensionType === "simple" && this.#valueType) {
			this.addTemplate(templates, data, this.#valueType[0], validations);
		} else if (hasValueKey(data)) {
			this.addUnsupportedValueTemplate(templates, data);
		}

		return [
			html`
          <fhir-wrapper
                  label=${toLabel(data, this.labelMap, this.modifier)}
                  variant="details"
                  ?open=${config.open}
                  ?summaryonly=${config.summaryonly}
          >
              ${templates}
          </fhir-wrapper>
      `,
		];
	}

	public renderDisplay(
		_config: DisplayConfig,
		data: Decorated<FhirExtensionData<OpenType>>,
		validations: Validations,
	): TemplateResult[] {
		let templates: TemplateResult[] = [];
		if (this.mode !== DisplayMode.display) {
			templates = [
				html`<fhir-primitive key="url" label=${this.modifier ? "modifierExtension url" : "url"} type=${PrimitiveType.uri} .value=${data.url} .errormessage=${extensionErrorMessage(validations, data)} ?showerror=${this.showerror}></fhir-primitive>`,
			];
		}
		if (this.#extensionType === "simple" && this.#valueType) {
			this.addTemplate(templates, data, this.#valueType[0], validations);
		} else if (hasValueKey(data)) {
			this.addUnsupportedValueTemplate(templates, data);
		}

		return templates;
	}

	public decorate(
		data: Decorated<FhirExtensionData<OpenType>>,
		_validations: Validations,
		_fetched: boolean,
	): void {
		this.#valueType = [];
		this.#extensionType = "unknown";
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
		validations: Validations,
	): void {
		const headless = false;
		const label = toLabel(data, this.labelMap, this.modifier);
		const valueKey = `value${valueType}` as ValuePrefixKey;
		const valueErrors = valueErrorSlice(validations, data, valueKey);
		switch (valueType) {
			case OpenTypeNameEnum.Age:
			case OpenTypeNameEnum.Count:
			case OpenTypeNameEnum.Distance:
			case OpenTypeNameEnum.Duration:
				templates.push(html`
              <fhir-quantity key=${data.url} label=${label} ?headless=${headless} .data=${data[valueKey as keyof FhirExtensionData<OpenType>]} .errors=${valueErrors}></fhir-quantity>
          `);
				break;
			case OpenTypeNameEnum.Annotation:
				templates.push(html`
              <fhir-annotation key=${data.url} label=${label} ?headless=${headless} .data=${data.valueAnnotation} .errors=${valueErrors}></fhir-annotation>
          `);
				break;
			case OpenTypeNameEnum.Attachment:
				templates.push(html`
              <fhir-attachment key=${data.url} label=${label} ?headless=${headless} .data=${data.valueAttachment} .errors=${valueErrors}></fhir-attachment>
          `);
				break;
			case OpenTypeNameEnum.Base64Binary:
				templates.push(
					valueTemplate(
						data,
						"valueBase64Binary",
						PrimitiveType.base64,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Boolean:
				templates.push(
					valueTemplate(data, "valueBoolean", PrimitiveType.boolean, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Canonical:
				templates.push(
					valueTemplate(
						data,
						"valueCanonical",
						PrimitiveType.canonical,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Code:
				templates.push(
					valueTemplate(data, "valueCode", PrimitiveType.code, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.CodeableConcept:
				templates.push(html`
              <fhir-codeable-concept key=${data.url} label=${label} ?headless=${headless} .data=${data.valueCodeableConcept} .errors=${valueErrors}></fhir-codeable-concept>
          `);
				break;
			case OpenTypeNameEnum.Coding:
				templates.push(html`
              <fhir-coding key=${data.url} label=${label} ?headless=${headless} .data=${data.valueCoding} .errors=${valueErrors}></fhir-coding>
          `);
				break;
			case OpenTypeNameEnum.CodeableReference:
				templates.push(html`
              <fhir-codeable-reference key=${data.url} label=${label} ?headless=${headless} .data=${data.valueCodeableReference} .errors=${valueErrors}></fhir-codeable-reference>
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
	                              label=${label}
	                              type=${PrimitiveType.fhir_string}
	                              .value=${JSON.stringify(data[valueKey as keyof FhirExtensionData<OpenType>])}
	                              .errormessage=${valueErrorMessage(
																	validations,
																	data,
																	valueKey,
																	this.mode === DisplayMode.display,
																)}
	                              ?showerror=${this.showerror}
	              ></fhir-primitive>
          `);
				break;
			case OpenTypeNameEnum.ContactPoint:
				templates.push(html`
              <fhir-contact-point key=${data.url} label=${label} ?headless=${headless} .data=${data.valueContactPoint} .errors=${valueErrors}></fhir-contact-point>
          `);
				break;
			case OpenTypeNameEnum.Date:
				templates.push(
					valueTemplate(data, "valueDate", PrimitiveType.date, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.DateTime:
				templates.push(
					valueTemplate(
						data,
						"valueDateTime",
						PrimitiveType.datetime,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Decimal:
				templates.push(
					valueTemplate(data, "valueDecimal", PrimitiveType.decimal, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.HumanName:
				templates.push(html`
              <fhir-human-name key=${data.url} label=${label} ?headless=${headless} .data=${data.valueHumanName} .errors=${valueErrors}></fhir-human-name>
          `);
				break;
			case OpenTypeNameEnum.Id:
				templates.push(
					valueTemplate(data, "valueId", PrimitiveType.id, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Identifier:
				templates.push(html`
              <fhir-identifier key=${data.url} label=${label} ?headless=${headless} .data=${data.valueIdentifier} .errors=${valueErrors}></fhir-identifier>
          `);
				break;
			case OpenTypeNameEnum.Instant:
				templates.push(
					valueTemplate(data, "valueInstant", PrimitiveType.instant, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Integer:
				templates.push(
					valueTemplate(data, "valueInteger", PrimitiveType.integer, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Markdown:
				templates.push(
					valueTemplate(
						data,
						"valueMarkdown",
						PrimitiveType.markdown,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Money:
				templates.push(html`
              <fhir-money key=${data.url} label=${label} ?headless=${headless} .data=${data.valueMoney} .errors=${valueErrors}></fhir-money>
          `);
				break;
			case OpenTypeNameEnum.Oid:
				templates.push(
					valueTemplate(data, "valueOid", PrimitiveType.uri, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Period:
				templates.push(html`
              <fhir-period key=${data.url} label=${label} ?headless=${headless} .data=${data.valuePeriod} .errors=${valueErrors}></fhir-period>
          `);
				break;
			case OpenTypeNameEnum.PositiveInt:
				templates.push(
					valueTemplate(
						data,
						"valuePositiveInt",
						PrimitiveType.positiveInt,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Quantity:
				templates.push(html`
              <fhir-quantity key=${data.url} label=${label} ?headless=${headless} .data=${data.valueQuantity} .errors=${valueErrors}></fhir-quantity>
          `);
				break;
			case OpenTypeNameEnum.Range:
				templates.push(html`
              <fhir-range key=${data.url} label=${label} ?headless=${headless} .data=${data.valueRange} .errors=${valueErrors}></fhir-range>
          `);
				break;
			case OpenTypeNameEnum.Ratio:
				templates.push(html`
              <fhir-ratio key=${data.url} label=${label} ?headless=${headless} .data=${data.valueRatio} .errors=${valueErrors}></fhir-ratio>
          `);
				break;
			case OpenTypeNameEnum.Reference:
				templates.push(html`
              <fhir-reference key=${data.url} label=${label} ?headless=${headless} .data=${data.valueReference} .errors=${valueErrors}></fhir-reference>
          `);
				break;
			case OpenTypeNameEnum.SampledData:
				templates.push(html`
              <fhir-sampled-data key=${data.url} label=${label} ?headless=${headless} .data=${data.valueSampledData} .errors=${valueErrors}></fhir-sampled-data>
          `);
				break;
			case OpenTypeNameEnum.Signature:
				templates.push(html`
              <fhir-signature key=${data.url} label=${label} ?headless=${headless} .data=${data.valueSignature} .errors=${valueErrors}></fhir-signature>
          `);
				break;
			case OpenTypeNameEnum.String:
				templates.push(
					valueTemplate(
						data,
						"valueString",
						PrimitiveType.fhir_string,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Time:
				templates.push(
					valueTemplate(data, "valueTime", PrimitiveType.time, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Timing:
				templates.push(html`
              <fhir-timing key=${data.url} label=${label} ?headless=${headless} .data=${data.valueTiming} .errors=${valueErrors}></fhir-timing>
          `);
				break;
			case OpenTypeNameEnum.UnsignedInt:
				templates.push(
					valueTemplate(
						data,
						"valueUnsignedInt",
						PrimitiveType.unsigned_int,
						this.mode, label, validations, this.showerror,
					),
				);
				break;
			case OpenTypeNameEnum.Uri:
				templates.push(
					valueTemplate(data, "valueUri", PrimitiveType.uri, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Url:
				templates.push(
					valueTemplate(data, "valueUrl", PrimitiveType.url, this.mode, label, validations, this.showerror),
				);
				break;
			case OpenTypeNameEnum.Uuid:
				templates.push(
					valueTemplate(data, "valueUuid", PrimitiveType.uuid, this.mode, label, validations, this.showerror),
				);
				break;
			default:
				this.addUnsupportedValueTemplate(templates, data, valueType);
				break;
		}
	}

	private addUnsupportedValueTemplate(
		templates: TemplateResult[],
		data: FhirExtensionData<OpenType>,
		valueType?: string,
	): void {
		const label = toLabel(data, this.labelMap, this.modifier);
		const valueKey = extensionValueKey(data);
		templates.push(html`
        <fhir-not-supported
                label=${label}
                description=${`Extension value ${valueKey ?? valueType ?? "value[x]"} cannot be rendered.`}
                error=${`Rendering support for extension value type ${valueType ?? valueTypeFromKey(valueKey) ?? "unknown"} is not implemented.`}
        ></fhir-not-supported>
    `);
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

function hasValueKey(ext: FhirExtensionData<OpenType>): boolean {
	return !!extensionValueKey(ext);
}

function extensionValueKey(ext: FhirExtensionData<OpenType>): string | undefined {
	return Object.keys(ext).find((key) => key.startsWith("value"));
}

function valueTypeFromKey(valueKey: string | undefined): string | undefined {
	return valueKey?.substring(5);
}

function findType(simpleExtensionName: string): OpenTypeNameEnum | null {
	const normalizedType = simpleExtensionName.toLowerCase();
	const type =
		Object.values(OpenTypeNameEnum).find(
			(type) => type.toLowerCase() === normalizedType,
		) ?? null;
	return type;
}

function toLabel(data: FhirExtensionData<OpenType>, labelMap?: Record<string, string>, modifier = false): string {
	const prefix = modifier ? "Modifier: " : "";
	if (labelMap && data.url && labelMap[data.url]) return `${prefix}${labelMap[data.url]}`;
	if (!data.url) return `${prefix}${data.id ?? "n/a"}`;
	const url = data.url;
	const separatorIdx = Math.max(url.lastIndexOf("#"), url.lastIndexOf("/"));
	return `${prefix}${asReadable(url.substring(separatorIdx + 1))}`;
}


function valueTemplate(
	data: FhirExtensionData<OpenType>,
	valueKey: ValuePrefixKey,
	type: PrimitiveType,
	mode: DisplayMode,
	label: string,
	validations: Validations,
	showerror: boolean,
): TemplateResult<1> {
	if (mode === DisplayMode.display) {
		return html`
        <fhir-primitive key=${data.url}
                        label=${label}
                        context=${data.url}
                        type=${type}
                        .value=${data[valueKey as keyof FhirExtensionData<OpenType>]}
                        .errormessage=${valueErrorMessage(
													validations,
													data,
													valueKey,
													true,
												)}
                        ?showerror=${showerror}
        ></fhir-primitive> `;
	} else {
		return html`
        <fhir-primitive key=${data.url}
                      label=${label}
                      type=${type}
                        .value=${data[valueKey as keyof FhirExtensionData<OpenType>]}
                        .errormessage=${valueErrorMessage(
													validations,
													data,
													valueKey,
													false,
												)}
                        ?showerror=${showerror}
      ></fhir-primitive> `;
	}
}

function valueErrorSlice(
	validations: Validations,
	data: FhirExtensionData<OpenType>,
	valueKey: ValuePrefixKey,
): FqkMap {
	const direct = sliceErrorsForPath(validations, [{ node: valueKey }]);
	if (direct.entries().length > 0) return direct;
	return sliceErrorsForPath(validations, [{ node: data.url }, { node: valueKey }]);
}

function sliceErrorsForPath(
	validations: Validations,
	path: ErrorNodeKey[],
): FqkMap {
	const sliced = validations.sliceForFQK({ path });
	const additionalNodesToRemove = Math.max(path.length - 1, 0);
	if (additionalNodesToRemove === 0) return sliced;

	return new FqkMap(
		sliced.entries().map(([fqk, messages]) => [
			{
				...fqk,
				path: fqk.path.slice(additionalNodesToRemove),
			},
			messages,
		]),
	);
}

function valueErrorMessage(
	validations: Validations,
	data: FhirExtensionData<OpenType>,
	valueKey: ValuePrefixKey,
	includeExtensionError: boolean,
): string | undefined {
	return (
		validations.msgFor(valueKey) ??
		validations.msgFor({ path: [{ node: data.url }, { node: valueKey }] }) ??
		(includeExtensionError ? extensionErrorMessage(validations, data) : undefined)
	);
}

function extensionErrorMessage(
	validations: Validations,
	data: FhirExtensionData<OpenType>,
): string | undefined {
	if (!data.url) return undefined;
	return validations.msgFor(data.url);
}
