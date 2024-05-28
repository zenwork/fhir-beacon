import {html, LitElement}        from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('fhir-not-supported')
export class NotSupported extends LitElement {

  @property()
  private description: string = ''

  protected render(): unknown {
    return html`
      <fhir-wrapper>Unsupported Feature:${this.description}
        <slot></slot>
      </fhir-wrapper>`
  }
}
