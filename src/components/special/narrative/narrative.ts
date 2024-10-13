import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}              from 'lit/decorators.js'
import {unsafeHTML}                from 'lit/directives/unsafe-html.js'
import {BaseElement, NoDataObject} from '../../../internal'
import {DisplayConfig}             from '../../../types'

import {NarrativeData} from './narrative.data'

@customElement('fhir-narrative')
export class Narrative extends BaseElement<NarrativeData> {

  @property({ reflect: true })
  declare status: string

  constructor() {
    super('Narrative')
  }

  public renderNarrative(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <div part="narrative">${unsafeHTML(data.div)}</div >
      `
    ]
  }

  public renderDisplay(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <fhir-wrapper-2 label="${config.verbose ? `summary (status:${data.status})` : 'summary'}">
              <div part="narrative">${unsafeHTML(data.div)}</div >
          </fhir-wrapper-2>
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: NarrativeData): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="status" .value=${data.status}></fhir-primitive >
          <fhir-wrapper-2 label="div" variant="details">
              <fhir-primitive .value=${data.div}></fhir-primitive >
          </fhir-wrapper-2>
      `
    ]
  }

  protected createRenderRoot() {
    return this
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (_changedProperties.has('data') && this.data !== NoDataObject) {
      if (this.data?.status) this.status = this.data.status
    }
  }
}
