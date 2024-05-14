import {css, html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}                   from 'lit/decorators.js'
import {unsafeHTML}                                from 'lit/directives/unsafe-html.js'
import {BaseElement}                               from '../BaseElement'

import {NarrativeData} from './structures'

@customElement('fhir-narrative')
export class Narrative extends BaseElement<NarrativeData> {

  static styles = css`

  `

  constructor() {super('Narrative')}

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
    console.log(data.div)
    return html`
        <fhir-wrapper .label=${this.label}>
            <div part="narrative">${unsafeHTML(data.div)}</div>
        </fhir-wrapper>
    `
  }
}
