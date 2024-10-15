import {consume}                       from '@lit/context'
import {html, nothing, TemplateResult} from 'lit'
import {customElement, state}          from 'lit/decorators.js'
import {choose}                        from 'lit/directives/choose.js'
import {otherwise, when}               from '../../.././utilities/when'
import {BaseElement, Validations}      from '../../../internal'

import {containedResourcesContext} from '../../../internal/contexts/context'

import {ResourceData}            from '../../../internal/resource/domain-resource.data'
import {renderResourceComponent} from '../../../internal/resource/renderResourceComponent'
import {DisplayConfig}           from '../../../types'
import {PrimitiveType}           from '../../primitive/type-converters/type-converters'
import {asReadable}              from '../../primitive/type-presenters/asReadable'
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
    return [
      html`
          ${choose(this.referenceType, [
              [
                  ReferenceType.contained,
                  () => html`
                      <fhir-primitive
                              key="${this.key}"
                              label="${this.label}"
                              value=${this.mappedResource?.resourceType || 'contained'}
                              summary
                      ></fhir-primitive >
                      <fhir-wrapper label="${this.verbose ? 'loaded ref ' + data.reference : ''}"
                                      ?summaryonly=${this.getDisplayConfig().summaryonly}
                      >
                          ${renderResourceComponent(this.mappedResource, this.getDisplayConfig())}
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
                              .errormessage=${validation.errFor('*')}
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
                              .errormessage=${validation.errFor('*')}
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
                              .errormessage=${validation.errFor('*')}
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
                                      .errormessage=${validation.errFor('*')}
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
  public renderStructure(config: DisplayConfig, data: ReferenceData, validations: Validations): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="reference" .value=${data.reference} .errormessage=${validations.errFor('reference')} summary></fhir-primitive >
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

  public validate(data: ReferenceData, validations: Validations, fetched: boolean) {
    super.validate(data, validations, fetched)

    let isContainedRef: boolean = false

    if (this.data && this.data.reference) {
      isContainedRef = this.data.reference.startsWith('#')

      if (isContainedRef) this.referenceType = ReferenceType.contained

      if (this.containedData && this.containedData.length > 0) {
        const containedDataExists = this.containedData.length > 0

        if (isContainedRef && containedDataExists) {
          this.mappedResource = this.containedData.find(r => '#' + r.id === this.data.reference)

          if (this.mappedResource) {
            validations.remErr('*')
          }
        }

      } else {
        if (this.referenceType === ReferenceType.contained && !this.mappedResource) {
          validations.addErr({
                               key: '*',
                               err: 'ref-1: Does not have a contained resource when reference starts with #'
                             })
          this.referenceType = ReferenceType.unknown
        }
      }

    }

    if (this.referenceType == ReferenceType.unknown) {
      this.referenceType = when<ReferenceData, ReferenceType>(
        data,
        [d => !!d.extension, ReferenceType.extension],
        [d => !!d.reference, ReferenceType.reference],
        [d => !!d.identifier, ReferenceType.identifier],
        [d => !!d.display, ReferenceType.display],
        otherwise(() => {
          validations.addErr({
                               key: '*',
                               err: 'Ref-2: At least one of reference, identifier and display SHALL be present (unless an extension is provided).'
                             })
          return ReferenceType.unknown
        })
      )
    }

    if (this.referenceType == ReferenceType.extension) {
      validations.addErr({
                           key: '*',
                           err: 'Support for reference extensions is not implemented yet.'
                         })
    }
  }

}
