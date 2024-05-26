import {consume}                              from '@lit/context'
import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement, state}                 from 'lit/decorators.js'
import {choose}                               from 'lit/directives/choose.js'
import {ConsumerBaseElement}                  from '../ConsumerBaseElement'
import {PrimitiveType}                        from '../data/primitive/converters'
import {asReadable}                           from '../data/primitive/presenters/asReadable'
import {containedDataContext}                 from '../resources/context'
import {ResourceData}                         from '../resources/structures'
import {renderResourceComponent}              from '../util/renderResourceComponent'
import {otherwise, when}                      from '../util/when'
import {ReferenceData}                        from './structures'
import '../data/primitive/Primitive'
import '../util/Wrapper'
import '../data/complex/Identifier'
import '../util/NotSupported'

@customElement('fhir-reference')
export class Reference extends ConsumerBaseElement<ReferenceData> {

  @consume({context: containedDataContext, subscribe: true})
  private contained: ResourceData[] = []

  @state()
  private containedResource: ResourceData | undefined

  @state()
  private referenceType: ReferenceType = ReferenceType.unknown

  constructor() {super('Reference')}


  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)

  }

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
                  ${renderResourceComponent(this.containedResource, this.displayConfig)}
                `
              ],
          [
            ReferenceType.display,
                () => html`
                  <fhir-primitive
                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                      .value=${data.display}
                      .link=${data.reference}
                  ></fhir-primitive>`
              ],
              [
                ReferenceType.reference,
                () => html`
                  <fhir-primitive
                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                      .value=${data.display ? data.display : data.reference}
                      .link=${data.reference}
                  ></fhir-primitive>`
              ],
              [
                ReferenceType.identifier,
                () => html`
                  <fhir-identifier
                      label="identifier"
                      .data=${data.identifier}
                  ></fhir-identifier>`
              ],
              [
                ReferenceType.extension,
                () => html`
                  <fhir-not-supported description="unable to render when reference sub-type is ${ReferenceType.extension}"></fhir-not-supported >`
              ],
              [
                ReferenceType.unknown,
                () => html`
                  <fhir-not-supported description="unable to render when reference sub-type is ${ReferenceType.unknown}"></fhir-not-supported >`
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
      <fhir-primitive label="reference" .value=${data.reference}></fhir-primitive >
      <fhir-primitive type=${PrimitiveType.uri_type} label="type" .value=${data.type}></fhir-primitive >
      <fhir-identifier
          label="identifier"
          .data=${data.identifier}

      ></fhir-identifier>
      <fhir-primitive label="display" .value=${data.display}></fhir-primitive >
    `
  }


  protected convertData(data: ReferenceData): ReferenceData {
    //TODO: Rule Ref-1: SHALL have a contained resource if a local reference is provided. see:
    // https://www.hl7.org/fhir/R5/domainresource-definitions.html#DomainResource.contained TODO: This requires being able to request data that is in the
    // payload of the parent resource. Have to do this later with signals but when resolving the link call not here.
    let isContainedRef = data?.reference?.startsWith('#')
    let containedDataExists = this.contained.length > 0

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
