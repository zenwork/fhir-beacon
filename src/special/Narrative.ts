import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}              from 'lit/decorators.js'
import {unsafeHTML}                           from 'lit/directives/unsafe-html.js'
import {ConsumerBaseElement}                  from '../ConsumerBaseElement'

import {NarrativeData} from './structures'
import '../util/Wrapper'

@customElement('fhir-narrative')
export class Narrative extends ConsumerBaseElement<NarrativeData> {

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
    if (_changedProperties.has('data')) {
      this.status = this.data.status
    }
  }

  protected renderDisplay(data: NarrativeData): TemplateResult {
    return html`
      <div part="narrative">${unsafeHTML(data.div)}</div>
    `
  }

  protected renderStructure(data: NarrativeData): TemplateResult {
    return html`
      <fhir-structure-wrapper .label=${this.type}>
        <fhir-primitive label="status" .value=${data.status}></fhir-primitive >
        <fhir-primitive label="div" .value=${data.div}></fhir-primitive >
      </fhir-structure-wrapper>
    `
  }
}
