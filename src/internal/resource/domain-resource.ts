import {provide}                                       from '@lit/context'
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {choose}                                        from 'lit/directives/choose.js'
import {PrimitiveType}                                 from '../../components/primitive/type-converters'
import {DisplayMode}                                   from '../base/base-element.data'
import {containedDataContext}                          from '../contexts/context'
import {DomainResourceData, ResourceData}              from './domain-resource.data'
import {renderResourceComponent}                       from './renderResourceComponent'

import '../../utilities'
import '../../components/special/narrative/narrative'
import {Resource}                                      from './resource'


export abstract class DomainResource<T extends DomainResourceData> extends Resource<T> {

  @provide({context: containedDataContext})
  declare contained: ResourceData[]


  protected constructor(type: string) {
    super(type)
    this.addStructureTempateGenerator('domain-resource', (data: T) => { return this.renderDomainResourceStructure(data) })
  }

  protected render(): TemplateResult {
    let data = this.convertData(this.data)
    return html`
      <div part="domain-resource">${choose(this.mode,
            [
              [DisplayMode.narrative, () => this.renderNarrative(data)],
              [
                DisplayMode.combined,
                () => html`
                  <fhir-not-supported description="combined mode is not supported on resources... probably should be removed"></fhir-not-supported >`
              ]
            ],
          () => super.render())}
      </div >`

  }

  protected renderNarrative(data: T): TemplateResult {
    if (data.text) {
      return html`
          <fhir-wrapper .label=${this.type}>
              <fhir-narrative .data=${data.text}></fhir-narrative>
          </fhir-wrapper>`
    }
    return html``
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (_changedProperties.has('data')) {
      this.contained = this.data?.contained || []
    }
  }

  protected renderDomainResourceStructure(data: T): TemplateResult | TemplateResult[] {
    return [
      html`
        <fhir-narrative label="text" .data=${data.text} ?forceclose=${true}></fhir-narrative >
      `,
      html`
      ${(this.data.contained) ? html`
        <fhir-structure-wrapper label="contained" ?forceclose=${true}>
          ${this.renderStructureContained()}
        </fhir-structure-wrapper >
      ` : nothing}
      ${(!this.data.contained && this.verbose) ? html`
        <fhir-structure-wrapper label="contained" ?forceclose=${true}>
          <fhir-empty-list ></fhir-empty-list >
        </fhir-structure-wrapper >` : nothing}
      `,
      html`
        <fhir-primitive label="extension" value="not implemented" .type=${PrimitiveType.none}></fhir-primitive >
        <fhir-primitive label="modifierExtension" value="not implemented" .type=${PrimitiveType.none}></fhir-primitive >
    `
    ]
  }

  protected renderStructureContained(): TemplateResult[] {
    if (this.data?.contained) {
      return this.data.contained.map((c: ResourceData) => {
        return renderResourceComponent(c, this.display.value)
      })
    }
    return []
  }
}
