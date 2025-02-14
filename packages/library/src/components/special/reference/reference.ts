import {consume}                             from '@lit/context'
import {html, nothing, TemplateResult}       from 'lit'
import {customElement, state}                from 'lit/decorators.js'
import {choose}                              from 'lit/directives/choose.js'
import {otherwise, when}                     from '../../.././utilities/when'
import {BaseElement, Decorated, Validations} from '../../../internal'

import {containedResourcesContext} from '../../../internal/contexts/context'

import {ResourceData}            from '../../../internal/resource/domain-resource.data'
import {renderResourceComponent} from '../../../internal/resource/renderResourceComponent'
import {DisplayConfig}           from '../../../shell/types'
import {isBlank}                 from '../../../utilities'
import {asReadable}              from '../../primitive/./type-formatters/asReadable'
import {PrimitiveType}           from '../../primitive/type-converters/type-converters'
import {ReferenceData}           from './reference.data'



enum ReferenceType {
  unknown = 'unknown',
  reference = 'reference',
  identifier = 'identifier',
  display = 'display',
  extension = 'extension',
  contained = 'contained'
}

@customElement('fhir-reference')
export class Reference extends BaseElement<ReferenceData> {

  @state()
  @consume({ context: containedResourcesContext, subscribe: true })
  private containedData: ResourceData[] = []

  @state()
  private mappedResource: ResourceData | undefined

  @state()
  private referenceType: ReferenceType = ReferenceType.unknown

  constructor() {super('Reference')}

  public renderDisplay(config: DisplayConfig, data: ReferenceData, validation: Validations): TemplateResult[] {
    const summary: boolean = true
    return [
      html`
          ${choose(this.referenceType, [
              [
                  ReferenceType.contained,
                  () => html`
                      <fhir-wrapper label="${this.verbose ? 'contained ref ' + data.reference : ''}"
                                    summary
                                    ?summaryonly=${config.summaryonly}
                      >
                          ${renderResourceComponent(this.mappedResource, config, summary)}
                      </fhir-wrapper>

                  `
              ],
              [
                  ReferenceType.display,
                  () => html`
                      <fhir-primitive
                              label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                              .value=${data.display}
                              .link=${data.reference}
                              .errormessage=${validation.msgFor('*')}
                              summary
                      ></fhir-primitive >`
              ],
              [
                  ReferenceType.reference,
                  () => html`
                      <fhir-primitive
                              label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                              .value=${data.display ? data.display : data.reference}
                              .link=${data.reference}
                              .errormessage=${validation.msgFor('*')}
                              summary
                      ></fhir-primitive >`
              ],
              [
                  ReferenceType.identifier,
                  () => html`
                      <fhir-identifier
                              label="identifier"
                              .data=${data.identifier}
                              summary
                      ></fhir-identifier >`
              ],
              [
                  ReferenceType.extension,
                  () => html`
                      <fhir-primitive
                              label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                              .value=${data.display || data.display || data.reference || 'undefined'}
                              .link=${data.reference}
                              .errormessage=${validation.msgFor('*')}
                              summary
                      ></fhir-primitive >`
              ],
              [
                  ReferenceType.unknown,
                  () => this.data
                        ? html`
                              <fhir-primitive
                                      label=${data.type ? asReadable(data.type.toString()) : 'reference'}
                                      .value=${data.display || data.display || data.reference || 'undefined'}
                                      .link=${data.reference}
                                      .errormessage=${validation.msgFor('*')}
                                      summary
                              ></fhir-primitive >
                          `
                        : nothing
              ]

          ])
          }
      `
    ]
  }


  /**
   * @param config
   * @param data
   * @param validations
   * @protected
   */
  public renderStructure(_config: DisplayConfig, data: ReferenceData, validations: Validations): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="reference"
                          .value=${data.reference}
                          .errormessage=${validations.msgFor('reference')}
                          summary
          ></fhir-primitive>
          <fhir-primitive type=${PrimitiveType.uri_type} label="type" .value=${data.type} summary></fhir-primitive >
          <fhir-identifier
                  label="identifier"
                  .data=${data.identifier}
                  summary
          ></fhir-identifier >
          <fhir-primitive label="display" .value=${data.display} summary></fhir-primitive >
      `
    ]
  }

  public renderEditableDisplay(_config: DisplayConfig,
                               data: Decorated<ReferenceData>,
                               validations: Validations): TemplateResult[] {
    //TODO: need better way to pass complex errors. Error message can not be passed to identifier
    return [
      html`
          <fhir-primitive key="reference"
                          .value=${data.reference}
                          .errormessage=${validations.msgFor('*')}
                          summary
          ></fhir-primitive>
          <fhir-primitive type=${PrimitiveType.uri_type}
                          key="type"
                          .value=${data.type}
                          summary
                          .input=${false}
          ></fhir-primitive>
          <fhir-identifier key="identifier"
                           .data=${data.identifier}
                           summary
          ></fhir-identifier>
          <fhir-primitive key="display"
                          .value=${data.display}
                          summary
                          .errormessage=${validations.msgFor('*')}
          ></fhir-primitive>
      `
    ]
  }

  public validate(data: ReferenceData, validations: Validations, fetched: boolean) {
    super.validate(data, validations, fetched)

    this.referenceType = ReferenceType.unknown

    let isContainedRef: boolean = false

    if (this.data && this.data.reference) {
      isContainedRef = this.data.reference.startsWith('#')

      if (isContainedRef) this.referenceType = ReferenceType.contained

      if (this.containedData && this.containedData.length > 0) {
        const containedDataExists = this.containedData.length > 0

        if (isContainedRef && containedDataExists) {
          this.mappedResource = this.containedData.find(r => '#' + r.id === this.data.reference)

          if (this.mappedResource) {
            validations.rmAll()
          }
        }

      } else {
        if (this.referenceType === ReferenceType.contained && !this.mappedResource) {
          validations.add({
                            fqk: { path: [{ node: '*' }] },
                            message: 'ref-1: Does not have a contained resource when reference starts with #'
                             })
          this.referenceType = ReferenceType.unknown
        }
      }

    }

    if (this.referenceType == ReferenceType.unknown) {
      this.referenceType = when<ReferenceData, ReferenceType>(
        data,
        [d => !isBlank(d.extension), ReferenceType.extension],
        [d => !isBlank(d.reference), ReferenceType.reference],
        [d => !isBlank(d.identifier), ReferenceType.identifier],
        [d => !isBlank(d.display), ReferenceType.display],
        otherwise(() => {
          validations.add({
                            fqk: { path: [{ node: '*' }] },
                            message: 'Ref-2: At least one of reference, identifier and display SHALL be present (unless an extension is provided).'
                             })
          return ReferenceType.unknown
        })
      )
    }

    if (this.referenceType == ReferenceType.extension) {
      validations.add({
                        fqk: { path: [{ node: '*' }] },
                        message: 'Support for reference extensions is not implemented yet.'
                         })
    }

    this.requestUpdate()
  }

}
