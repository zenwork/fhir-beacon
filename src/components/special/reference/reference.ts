import {consume}                         from '@lit/context'
import {html, nothing, TemplateResult}   from 'lit'
import {customElement, state}            from 'lit/decorators.js'
import {choose}                          from 'lit/directives/choose.js'
import {otherwise, when}                 from '../../.././utilities/when'
import {BaseElement, FhirDataDecoration} from '../../../internal'
import {containedDataContext}            from '../../../internal/contexts/context'

import {ResourceData}            from '../../../internal/resource/domain-resource.data'
import {renderResourceComponent} from '../../../internal/resource/renderResourceComponent'
import {PrimitiveType}           from '../../primitive/type-converters/type-converters'
import {asReadable}              from '../../primitive/type-presenters/asReadable'
import {ReferenceData}           from './reference.data'

@customElement('fhir-reference')
export class Reference extends BaseElement<ReferenceData> {

  @consume({context: containedDataContext, subscribe: true})
  private contained: ResourceData[] = []

  @state()
  private containedResource: ResourceData | undefined

  @state()
  private referenceType: ReferenceType = ReferenceType.unknown

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
                ReferenceType.contained,
                () => html`
                  <fhir-primitive
                          key="${this.key}"
                          label="${this.label}"
                          value=${this.containedResource?.resourceType || 'contained'}
                          summary
                  ></fhir-primitive >
                  <fhir-wrapper label="${this.verbose ? 'loaded ref ' + data.reference : ''}">
                  ${renderResourceComponent(this.containedResource, this.getDisplayConfig())}
                  </fhir-wrapper >

                `
              ],
          [
            ReferenceType.display,
                () => html`
                  <fhir-primitive
                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                      .value=${data.display}
                      .link=${data.reference}
                      summary
                  ></fhir-primitive>`
              ],
              [
                ReferenceType.reference,
                () => html`
                  <fhir-primitive
                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                      .value=${data.display ? data.display : data.reference}
                      .link=${data.reference}
                      summary
                  ></fhir-primitive>`
              ],
              [
                ReferenceType.identifier,
                () => html`
                  <fhir-identifier
                      label="identifier"
                      .data=${data.identifier}
                      summary
                  ></fhir-identifier>`
              ],
              [
                ReferenceType.extension,
                () => html`
                  <fhir-not-supported description="unable to render reference of type ${ReferenceType.extension}" variant="no-impl"></fhir-not-supported >`
              ],
              [
                ReferenceType.unknown,
                () => this.data
                      ? html`
                    <fhir-not-supported description="unable to render reference of type ${ReferenceType.unknown}" variant="no-impl"></fhir-not-supported >`
                      : nothing
              ]

        ])
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
      <fhir-primitive label="reference" .value=${data.reference} summary></fhir-primitive >
      <fhir-primitive type=${PrimitiveType.uri_type} label="type" .value=${data.type} summary></fhir-primitive >
      <fhir-identifier
          label="identifier"
          .data=${data.identifier}
          summary
      ></fhir-identifier>
      <fhir-primitive label="display" .value=${data.display} summary></fhir-primitive >
    `
  }


  protected extend(data: ReferenceData): ReferenceData & FhirDataDecoration {

    //TODO: Rule Ref-1: SHALL have a contained resource if a local reference is provided. see:
    // https://www.hl7.org/fhir/R5/domainresource-definitions.html#DomainResource.contained TODO: This requires being able to request data that is in the
    // payload of the parent resource. Have to do this later with signals but when resolving the link call not here.
    const isContainedRef = data?.reference?.startsWith('#')
    const containedDataExists = this.contained.length > 0

    if (isContainedRef && containedDataExists) {
      this.containedResource = this.contained.find(r => '#' + r.id === data.reference)
    }

    if (this.containedResource) {
      this.referenceType = ReferenceType.contained
    }
    if (this.referenceType == ReferenceType.unknown) {
      //Rule Ref-2: At least one of reference, identifier and display SHALL be present (unless an extension is provided).
      this.referenceType = when<ReferenceData, ReferenceType>(data)(
        [d => !!d.extension, () => ReferenceType.extension],
        [d => !!d.reference, () => ReferenceType.reference],
        [d => !!d.identifier, () => ReferenceType.identifier],
        [d => !!d.display, () => ReferenceType.display],
        otherwise(() => ReferenceType.unknown)
      )
    }

    return data
  }
}

enum ReferenceType {
  unknown = 'unknown',
  reference = 'reference',
  identifier = 'identifier',
  display = 'display',
  extension = 'extension',
  contained = 'contained'
}
