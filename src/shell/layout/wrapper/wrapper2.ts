import {html, LitElement, nothing, TemplateResult} from 'lit'
import {customElement, property, query}            from 'lit/decorators.js'
import {hostStyles}                                from '../../../styles'
import {isDefined}                                 from '../directives'
import {componentStyles}                           from './wrapper2-styles'

export {SlDetails} from '@shoelace-style/shoelace'


@customElement('fhir-wrapper-2')
export class Wrapper2 extends LitElement {

  static styles = [hostStyles, componentStyles]

  @property({ type: Boolean })
  public details: boolean = false

  @property({ type: String })
  public key: string = 'items'

  @property({ type: String })
  public label: string = ''

  @property({ type: String, attribute: 'badge-resource' })
  public badgeResource: string = ''

  @property({ type: Boolean, attribute: 'badge-summary' })
  public badgeSummary: boolean = false

  @property({ type: Boolean, attribute: 'badge-constraint' })
  public badgeConstraint: boolean = false

  @property({ type: Boolean })
  public open: boolean = false

  @query('key')
  declare private content


  protected render(): TemplateResult | TemplateResult[] {
    let content: TemplateResult

    const arrow = this.details ? nothing : html`<span id="arrow">&#x21B4;</span>`
    const label = this.label
                  ? html`<label for="${this.key}">${this.label}${arrow}</label>`
                  : arrow

    if (!this.details) {

      content = html`
          ${label}
          <div id=${this.key} class="items">
              <slot id="${this.key}"></slot>
          </div>
      `

    } else {

      const summary = html`
          <div slot="summary">
              ${label}
              <fhir-badge-group badge-resource=${isDefined(this.badgeResource)}
                                ?badge-summary=${this.badgeSummary}
                                ?badge-constraint=${this.badgeConstraint}
              ></fhir-badge-group>
          </div>
          <sl-icon name="dash-square" slot="collapse-icon"></sl-icon>
          <sl-icon name="plus-square" slot="expand-icon"></sl-icon>
      `
      content = html`
          <sl-details class="custom-icons" ?open=${this.open}>
              ${summary}
              <div id=${this.key} class="details_items">
                  <slot></slot>
              </div>
          </sl-details>
      `

    }

    return html`
        <div id="wrapped" part="wrapped">
            ${content}
        </div>
    `
  }
}
