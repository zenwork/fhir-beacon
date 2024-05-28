import {provide}                                       from '@lit/context'
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {choose}                                        from 'lit/directives/choose.js'

import {BaseElementProvider}              from '../base/base-element-provider'
import {BaseElementMode}                  from '../base/base-element.data'
import {containedDataContext}             from '../contexts/context'
import {DomainResourceData, ResourceData} from './domain-resource.data'
import {renderResourceComponent}          from './renderResourceComponent'

import '../../utilities'
import '../../components/special/narrative/narrative'


export abstract class DomainResource<T extends DomainResourceData> extends BaseElementProvider<T> {

  @provide({context: containedDataContext})
  declare contained: ResourceData[]

  protected render(): TemplateResult {
    let data = this.convertData(this.data)
    return html`${choose(this.mode,
            [
                [BaseElementMode.narrative, () => this.renderNarrative(data)],
              [
                BaseElementMode.combined,
                () => html`
                  <fhir-not-supported description="combined mode is not supported on resources... probably should be removed"></fhir-not-supported >`
              ]
            ],
      () => super.render())}`

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

  protected renderStructure(data: T): TemplateResult | TemplateResult[] {
    return html`
      ${(this.data.contained) ? html`
        <fhir-structure-wrapper label="contained">
          ${this.renderStructureContained()}
        </fhir-structure-wrapper >
      ` : nothing}
      ${(!this.data.contained && this.verbose) ? html`
        <fhir-structure-wrapper label="contained">
          <fhir-empty-set ></fhir-empty-set >
        </fhir-structure-wrapper >` : nothing}
    `
  }

  protected getContainedData(id: string) {
    return this.data?.contained?.find((c: ResourceData) => c.id === id)
  }

  protected renderStructureContained(): TemplateResult[] {
    if (this.data?.contained) {
      return this.data.contained.map((c: ResourceData) => {
        return renderResourceComponent(c, this.display.value)
      })
    }
    return []
  }


  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (_changedProperties.has('data')) {
      this.contained = this.data?.contained || []
    }
  }
}
