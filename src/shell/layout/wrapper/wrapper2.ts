import {html, LitElement, nothing, TemplateResult} from 'lit'
import {customElement, property, query}            from 'lit/decorators.js'
import {classMap}    from 'lit/directives/class-map.js'
import {EmptyResult} from '../../../internal'
import {hostStyles}                                from '../../../styles'
import {isDefined}                                 from '../directives'
import {componentStyles}                           from './wrapper2-styles'

export {SlDetails} from '@shoelace-style/shoelace'


@customElement('fhir-wrapper-2')
export class Wrapper2 extends LitElement {

  static styles = [hostStyles, componentStyles]

  @property({ type: String })
  public variant: 'none' | 'details' | 'error' = 'none'

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

  @property({ type: Boolean, reflect: true })
  public summary: boolean = false

  @property({ type: Boolean, reflect: true })
  public summaryonly: boolean = false

  @query('key')
  declare private content


  protected render(): TemplateResult | TemplateResult[] {
    if (!this.summaryonly || (this.summary && this.summaryonly)) {
      let content: TemplateResult

      const arrow = this.variant === 'details' ? nothing : html`<span id="arrow">&#x21B4;</span>`
      const label = this.label
                    ? html`<label for="${this.key}"
                                  class=${classMap({ 'variant-error-label': (this.variant === 'error') })}
              >${this.label}${arrow}</label>`
                    : arrow

      switch (this.variant) {
        case 'none':
          content = html`
              ${label}
              <div id=${this.key} class="items">
                  <slot id="${this.key}"></slot>
              </div>
          `
          break
        case 'details': {
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
          break
        }
        case 'error':
          content = html`
              <div class="variant-error">
                  ${label}
                  <div id='error' class="items">
                      <slot id="${this.key}"></slot>
                  </div>
              </div>
          `
          break
      }

      return html`
          <div id="wrapped" part="wrapped">
              ${content}
          </div>
      `
    }

    return EmptyResult
  }
}
