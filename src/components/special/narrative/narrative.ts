import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}              from 'lit/decorators.js'
import {unsafeHTML}                           from 'lit/directives/unsafe-html.js'
import {BaseElement, NoDataSet}               from '../../../internal'
import {DisplayConfig}                        from '../../../types'

import {NarrativeData} from './narrative.data'

@customElement('fhir-narrative')
export class Narrative extends BaseElement<NarrativeData> {

  constructor() {
    super('Narrative')
  }

  @property({reflect: true})
  declare status: string

  protected createRenderRoot() {
    return this
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (_changedProperties.has('data') && this.data !== NoDataSet) {
      if (this.data?.status) this.status = this.data.status
    }
  }

  public renderNarrative(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <div part="narrative">${unsafeHTML(data.div)}</div >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="status" .value=${data.status}></fhir-primitive >
          <fhir-structure-wrapper label="div" forceclose>
              <fhir-primitive .value=${data.div}></fhir-primitive >
          </fhir-structure-wrapper >
      `
    ]
  }
}
