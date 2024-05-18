import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}              from 'lit/decorators.js'
import {unsafeHTML}                           from 'lit/directives/unsafe-html.js'
import {BaseElement}                          from '../BaseElement'

import {NarrativeData} from './structures'
import '../util/Wrapper'

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
    if (_changedProperties.has('data')) {
      this.status = this.data.status
    }
  }

  protected renderDisplay(data: NarrativeData): TemplateResult {
    return html`  bar
        <fhir-wrapper .label=${this.type}>
          foo
            <div part="narrative">${unsafeHTML(data.div)}</div>
        </fhir-wrapper>
    `
  }

  protected renderStructure(data: NarrativeData): TemplateResult {
    return html`
      <fhir-structure-wrapper .label=${this.type}>
        <fhir-primitive label="status" .value=${data.status} .verbose=${this.verbose}} .showError=${this.showError}></fhir-primitive>
        <fhir-primitive label="div" .value=${data.div} .verbose=${this.verbose}} .showError=${this.showError}></fhir-primitive>
      </fhir-structure-wrapper>
    `
  }
}
