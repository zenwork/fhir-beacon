import {css, html}               from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from './FhirElement'

@customElement('fhir-value')
export class PrimitiveValue extends FhirElement {


  static styles = css`
    div {
      color: var(--sl-color-gray-800);
      padding-left: var(--sl-spacing-3x-small);
    }

    .placeholder {
      color: var(--sl-color-gray-300);
      font-style: italic;
      font-family: var(--sl-font-serif);
    }
  `
  @property()
  public placeholder = 'n/a'

  @property()
  public text = ''

  @property()
  public link = ''

  protected render(): unknown {
    return html`
      <div id=${this.id}>
        ${(this.computeValue())}
      </div>`
  }

  private computeValue = () => {

    if (this.link) {
      return html`
        <a href=${this.link}>
          <slot name="before"></slot>
          ${this.text}
          <slot name="after"></slot>
        </a>
      `
    }
    if (!this.text && this.placeholder) {
      return html`<span class="placeholder">${this.placeholder}</span>`
    }
    return html`
      <slot name="before"></slot>${this.text}
      <slot name="after"></slot>`

  }
}
