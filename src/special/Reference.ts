import {html, TemplateResult}         from 'lit'
import {customElement, state}         from 'lit/decorators.js'
import {choose}                       from 'lit/directives/choose.js'
import {BaseElement, BaseElementMode} from '../BaseElement'
import {PrimitiveType}                from '../data/primitive/converters'
import {asReadable}                   from '../data/primitive/presenters/asReadable'
import {otherwise, when}              from '../util/when'
import {ReferenceData}                from './structures'
import '../data/primitive/Primitive'
import '../util/Wrapper'
import '../data/complex/Identifier'
import '../util/NotSupported'

@customElement('fhir-reference')
export class Reference extends BaseElement<ReferenceData> {

  @state()
  private referenceType: ReferenceType_Ref2 = ReferenceType_Ref2.unknown

  constructor() {super('Reference')}

  //TODO: I think an extra attribute to describe the reference of what is needed here as a lot of examples rely on the key this is
  // assigned to rather than defining the `type` property
  //TODO: need to figure out how to add all special rules and corner cases for references. see:
  // http://hl7.org/fhir/R5/datatypes.html#identifier

  protected renderDisplay(data: ReferenceData): TemplateResult | TemplateResult[] {
    return [
      html`

        ${choose(this.referenceType, [
              [
                ReferenceType_Ref2.display,
                () => html`
                  <fhir-primitive
                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                      .value=${data.display}
                      .link=${data.reference}
                  ></fhir-primitive>`
              ],
              [
                ReferenceType_Ref2.reference,
                () => html`
                  <fhir-primitive
                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                      .value=${data.display ? data.display : data.reference}
                      .link=${data.reference}
                  ></fhir-primitive>`
              ],
              [
                ReferenceType_Ref2.identifier,
                () => html`
                  <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier>`
              ],
              [
                ReferenceType_Ref2.extension,
                () => html`
                  <fhir-not-supported description="unable to render when reference sub-type is ${ReferenceType_Ref2.extension}"></fhir-not-supported>`
              ],
              [
                ReferenceType_Ref2.unknown,
                () => html`
                  <fhir-not-supported description="unable to render when reference sub-type is ${ReferenceType_Ref2.unknown}"></fhir-not-supported>`
              ]

            ]
        )
        }

      `
    ]
  }


  /**
   * @param data
   * @protected
   */
  protected renderStructure(data: ReferenceData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="reference" .value=${data.reference} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive type=${PrimitiveType.uri_type} label="type" .value=${data.type} .verbose=${this.verbose}></fhir-primitive>
      <fhir-identifier
          label="identifier"
          .data=${data.identifier}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
          .open=${this.open}
      ></fhir-identifier>
      <fhir-primitive label="display" .value=${data.display} .verbose=${this.verbose}></fhir-primitive>
    `
  }


  protected convertData(data: ReferenceData): ReferenceData {
    //TODO: Rule Ref-1: SHALL have a contained resource if a local reference is provided. see:
    // https://www.hl7.org/fhir/R5/domainresource-definitions.html#DomainResource.contained TODO: This requires being able to request data that is in the
    // payload of the parent resource. Have to do this later with signals but when resolving the link call not here.

    //Rule Ref-2: At least one of reference, identifier and display SHALL be present (unless an extension is provided).
    this.referenceType = when<ReferenceData, ReferenceType_Ref2>(data)(
      [d => !!d.extension, () => ReferenceType_Ref2.extension],
      [d => !!d.reference, () => ReferenceType_Ref2.reference],
      [d => !!d.identifier, () => ReferenceType_Ref2.identifier],
      [d => !!d.display, () => ReferenceType_Ref2.display],
      otherwise(() => ReferenceType_Ref2.unknown)
    )
    return data
  }
}

enum ReferenceType_Ref2 {
  unknown = 'unknown',
  reference = 'reference',
  identifier = 'identifier',
  display = 'display',
  extension = 'extension'
}
