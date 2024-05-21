import {css, html}               from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from './FhirElement'

@customElement('fhir-error')
export class PrimitiveError extends FhirElement {
  static styles = css`
    :host {
      padding-left: var(--sl-spacing-small);
      padding-top: var(--sl-spacing-2x-small);
      padding-bottom: var(--sl-spacing-2x-small);
    }
    #message {
      padding-left: var(--sl-spacing-2x-small);
      padding-right: var(--sl-spacing-2x-small);
      background: var(--sl-color-danger-200);
      color: var(--sl-color-danger-950);
      font-style: italic;
      border-radius: var(--sl-border-radius-small);
    }
  `
  @property()
  declare text: string

  protected render(): unknown {
    return html`
      <div part="message" id="message">${this.text}</div>`
  }
}
