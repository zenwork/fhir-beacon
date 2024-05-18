import {css, html}               from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from '../data/primitive/FhirElement'
import '@shoelace-style/shoelace/dist/components/details/details'
import '@shoelace-style/shoelace/dist/components/badge/badge.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends FhirElement {

  static styles = css`
    sl-details::part(base) {
      border: none;
      display: inline-flex;

    }

    sl-details::part(header) {
      padding: var(--sl-spacing-small);
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 0;
    }

    sl-details::part(summary-icon) {
      padding: 0 0 0 0;
      margin: 0 0 0 var(--sl-spacing-large);
    }

    sl-details::part(content) {
      padding: var(--sl-spacing-small);
    }

    label {
      font-size: var(--sl-font-size-medium);
      color: var(--sl-color-primary-700);
    }

    sl-badge {
      padding-left: var(--sl-spacing-x-small)
    }

    sl-badge::part(base) {
      color: var(--sl-color-gray-400);
      background-color: var(--sl-color-gray-100);
      font-weight: var(--sl-font-weight-normal);
      font-style: italic;
    }

    #arrow {
      color: var(--sl-color-gray-300);
      font-style: italic;
      font-size: var(--sl-font-size-medium);
      font-weight: var(--sl-font-weight-medium);
      font-family: var(--sl-font-serif), serif;
    }

    ul {
      padding: 0 0 0 var(--sl-spacing-x-small);
      margin: 0;
      border: none;
    }
  `
  @property({type: String})
  label: string = ''

  @property({type: String})
  fhirType: string = ''

  @property({type: Boolean})
  open: boolean = true

  protected render(): unknown {
    return html`
      <sl-details part="base" ?open=${this.open}>
        <div slot="summary"><label>${this.label}</label>
          ${this.fhirType ? html`
            <sl-badge pill>${this.fhirType}</sl-badge>` : html``}<span id="arrow">&#x21B4;</span></div>
        <ul>
          <slot part="value"></slot>
        </ul>
      </sl-details>
    `
  }


}
