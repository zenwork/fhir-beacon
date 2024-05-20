import {css, html}               from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {FhirElement}             from '../data/primitive/FhirElement'
import '@shoelace-style/shoelace/dist/components/tree/tree'
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends FhirElement {

  static styles = css`

    label {
      font-size: var(--sl-font-size-medium);
      color: var(--sl-color-neutral-500);
      font-style: oblique;
    }


    #arrow {
      color: var(--sl-color-gray-300);
      font-style: italic;
      font-size: var(--sl-font-size-medium);
      font-weight: var(--sl-font-weight-medium);
      font-family: var(--sl-font-serif), serif;
    }

    #content {
      display: table;
      margin-left: var(--sl-spacing-medium);

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

      <div id="label">
        ${this.fhirType
          ? html`
              <sl-tooltip content="${this.fhirType}"><label>${this.label}</label></sl-tooltip>`
          : html`<label>${this.label}</label>`}<span id="arrow">&#x21B4;</span>
      </div>

      <slot id="content"></slot>


    `
  }


}
