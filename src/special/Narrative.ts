import {css, html, PropertyValues, TemplateResult} from 'lit'
import {customElement, property}                   from 'lit/decorators.js'
import {unsafeHTML}                                from 'lit/directives/unsafe-html.js'
import {BaseElement}                               from '../BaseElement'
import {NarrativeData}                             from '../resources/structures'

@customElement('fhir-narrative')
export class Narrative extends BaseElement<NarrativeData> {

  static styles = css`

  `

  @property({reflect: true})
  declare status: string

  protected createRenderRoot() {
    return this
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    if (_changedProperties.has('data')) {
      this.status = this.data.status
    }
  }

  protected renderDisplay(data: NarrativeData): TemplateResult {
    return html`
        <div part="narrative">${unsafeHTML(data.div)}</div>`
  }
}
