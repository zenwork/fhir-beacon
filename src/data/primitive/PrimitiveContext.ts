import {css, html, nothing}      from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from './FhirElement'

@customElement('fhir-context')
export class PrimitiveContext extends FhirElement {

  static styles = css`
    :host {
      padding-top: var(--sl-spacing-2x-small);
      padding-bottom: var(--sl-spacing-2x-small);
    }
    span {
      color: var(--sl-color-gray-300);
      font-style: italic;
      font-family: var(--sl-font-serif), serif;
      margin-left: var(--sl-spacing-x-small);
    }
  `
  @property()
  public text: string = ''

  protected render(): unknown {
    return this.text ? html`<span>${'(' + this.text + ')'}</span>` : nothing
  }
}
