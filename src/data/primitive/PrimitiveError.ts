import {css, html}               from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from './FhirElement'

@customElement('fhir-error')
export class PrimitiveError extends FhirElement {
  static styles = css`
    #message {
      background: lightpink;
    }
  `
  @property()
  declare text: string

  protected render(): unknown {
    return html`
      <div part="message" id="message">(${this.text})</div>`
  }
}
