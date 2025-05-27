import {html, TemplateResult}                                                   from 'lit'
import {customElement}                                                          from 'lit/decorators.js'
import {BaseElement, Decorated, FhirExtensionData, Validations, ValuePrefixKey} from '../../internal'
import {OpenTypeNameEnum}                                                       from '../../OpenType'
import {DisplayConfig}                                                          from '../../shell'
import {PrimitiveType}                                                          from '../primitive'



@customElement('fhir-extension')
export class Extension extends BaseElement<FhirExtensionData> {

  #openType: OpenTypeNameEnum | null = null
  constructor() {
    super('Extension')
  }

  public renderDisplay(_config: DisplayConfig, _data: Decorated<FhirExtensionData>, _validations: Validations): TemplateResult[] {
    return this.renderAll(_config, _data, _validations)
  }


  public renderStructure(_config: DisplayConfig, _data: Decorated<FhirExtensionData>, _validations: Validations): TemplateResult[] {
    return this.renderAll(_config, _data, _validations)
  }

  public renderAll(config: DisplayConfig,
                   data: Decorated<FhirExtensionData>,
                   validations: Validations): TemplateResult[] {

    const templates: TemplateResult[] = [
      html`
          <fhir-primitive key="url" type=${PrimitiveType.uri} .value=${data.url}></fhir-primitive>`
    ]

    if (this.#openType) {
      // console.log(this.#openType)
      switch (this.#openType) {
        case OpenTypeNameEnum.Age:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Annotation:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Attachment:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Base64Binary:
          templates.push(valueTemplate(data, 'valueBase64Binary', PrimitiveType.base64))
          break
        case OpenTypeNameEnum.Boolean:
          templates.push(valueTemplate(data, 'valueBoolean', PrimitiveType.boolean))
          break
        case OpenTypeNameEnum.Canonical:
          templates.push(valueTemplate(data, 'valueCanonical', PrimitiveType.canonical))
          break
        case OpenTypeNameEnum.Code:
          templates.push(valueTemplate(data, 'valueCode', PrimitiveType.code))
          break
        case OpenTypeNameEnum.CodeableConcept:
          templates.push(html`
              <fhir-codeable-concept key="valueCodeableConcept" .data=${data.valueCodeableConcept}></fhir-codeable-concept>
          `)
          break
        case OpenTypeNameEnum.Coding:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.ContactDetail:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.ContactPoint:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Count:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.DataRequirement:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Date:
          templates.push(valueTemplate(data, 'valueDate', PrimitiveType.date))
          break
        case OpenTypeNameEnum.DateTime:
          templates.push(valueTemplate(data, 'valueDateTime', PrimitiveType.datetime))
          break
        case OpenTypeNameEnum.Decimal:
          templates.push(valueTemplate(data, 'valueDecimal', PrimitiveType.decimal))
          break
        case OpenTypeNameEnum.Distance:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Dosage:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Duration:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Expression:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.HumanName:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Id:
          templates.push(valueTemplate(data, 'valueId', PrimitiveType.id))
          break
        case OpenTypeNameEnum.Identifier:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Instant:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Integer:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Markdown:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Money:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Oid:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.ParameterDefinition:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Period:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.PositiveInt:
          templates.push(valueTemplate(data, 'valuePositiveInt', PrimitiveType.positiveInt))
          break
        case OpenTypeNameEnum.Quantity:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Range:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Ratio:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Reference:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.RelatedArtifact:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.SampledData:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Signature:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.String:
          templates.push(valueTemplate(data, 'valueString', PrimitiveType.fhir_string))
          break
        case OpenTypeNameEnum.Time:
          templates.push(valueTemplate(data, 'valueTime', PrimitiveType.time))
          break
        case OpenTypeNameEnum.Timing:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.TriggerDefinition:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.UnsignedInt:
          templates.push(valueTemplate(data, 'valueUnsignedInt', PrimitiveType.unsigned_int))
          break
        case OpenTypeNameEnum.Uri:
          templates.push(valueTemplate(data, 'valueUri', PrimitiveType.uri))
          break
        case OpenTypeNameEnum.Url:
          templates.push(valueTemplate(data, 'valueUrl', PrimitiveType.url))
          break
        case OpenTypeNameEnum.UsageContext:
          templates.push(this.notImplementedYet())
          break
        case OpenTypeNameEnum.Uuid:
          templates.push(valueTemplate(data, 'valueUuid', PrimitiveType.none))
          break
      }

    }


    return templates
  }
  public decorate(_data: Decorated<FhirExtensionData>,
                  _validations: Validations,
                  _fetched: boolean): void {

    const typeName: string = Object.keys(_data)
                                   .filter(k => k.startsWith('value'))
                                   .map(k => k.substring(5))
                                   .find(k => !!k)!

    if (typeName) {
      const normalizedType = typeName.toLowerCase()

      this.#openType
        = Object.values(OpenTypeNameEnum)
                .find(type => type.toLowerCase() === normalizedType) ?? null

    }


  }
  private notImplementedYet(): TemplateResult<1> {
    return html`
        <fhir-not-supported label="value${this.#openType}" description="${this.#openType} not supported yet" variant="no-impl"></fhir-not-supported>`
  }
}

function valueTemplate(data: Decorated<FhirExtensionData>, valueKey: ValuePrefixKey, type: PrimitiveType): TemplateResult<1> {
  return html`
      <fhir-primitive key=${valueKey}
                      label=${valueKey}
                      type=${type}
                      .value=${data[valueKey as keyof Decorated<FhirExtensionData>]}
      ></fhir-primitive> `
}
