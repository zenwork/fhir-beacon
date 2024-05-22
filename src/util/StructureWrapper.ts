import {css, html, nothing}      from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from '../data/primitive/FhirElement'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-structure-wrapper
 * @slot wrapper
 */
@customElement('fhir-structure-wrapper')
export class StructureWrapper extends FhirElement {

  static styles = css`
    sl-details::part(base) {
      border: none;
      border-radius: 0;
      display: inline-flex;
      background: var(--sl-color-neutral-100);
      padding: 0;
    }

    sl-details::part(header) {
      padding: var(--sl-spacing-small);
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 0;
    }

    sl-details::part(header) {
      /*border-bottom: dotted var(--sl-spacing-3x-small) var(--sl-color-neutral-200);*/

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
      background-color: var(--sl-color-gray-50);
      border-color: var(--sl-color-gray-300);
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
      border-left-style: solid;
      border-left-width: 0.06rem;
      border-left-color: var(--sl-color-primary-300);
    }
  `
  @property()
  label: string = ''

  @property()
  fhirType: string = ''

  @property({type: Boolean})
  public open: boolean = false

  protected render(): unknown {
    return html`
      <sl-details part="base" ?open=${this.open}>
        <div slot="summary">
          <label><b>${this.label}</b></label>
          ${this.fhirType ? html`
            <sl-badge pill>${this.fhirType}</sl-badge>` : html``}
          ${this.label || this.fhirType ? html`<span id="arrow">&#x21B4;</span >` : nothing}
        </div>
        <ul>
          <slot part="value"></slot>
        </ul>
      </sl-details>
    `
  }

}
