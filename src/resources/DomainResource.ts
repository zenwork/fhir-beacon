import {provide}                              from '@lit/context'
import {html, PropertyValues, TemplateResult} from 'lit'
import {choose}                               from 'lit/directives/choose.js'

import {BaseElementMode}         from '../BaseElementMode'
import {ProviderBaseElement}     from '../util/ProviderBaseElement'
import {renderResourceComponent} from '../util/renderResourceComponent'
import {containedDataContext}    from './context'

import {DomainResourceData, ResourceData} from './structures'
import '../util/Wrapper'
import '../special/Narrative'


export abstract class DomainResource<T extends DomainResourceData> extends ProviderBaseElement<T> {

  @provide({context: containedDataContext})
  declare contained: ResourceData[]

  protected render(): TemplateResult {
    let data = this.convertData(this.data)
    return html`${choose(this.mode,
            [
                [BaseElementMode.narrative, () => this.renderNarrative(data)],
            ],
        () => html`
          <fhir-wrapper .label=${this.type}>${super.render()}`)}</fhir-wrapper>`

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
      <fhir-structure-wrapper label="contained" ?open=${this.open}>
        ${this.renderStructureContained()}
      </fhir-structure-wrapper >
    `
  }

  protected getContainedData(id: string) {
    return this.data?.contained?.find((c: ResourceData) => c.id === id)
  }

  protected renderStructureContained(): TemplateResult[] {
    if (this.data?.contained) {
      return this.data.contained.map((c: ResourceData) => {
        return renderResourceComponent(c)
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
