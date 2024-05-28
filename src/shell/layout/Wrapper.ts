import {consume}                                                   from '@lit/context'
import {css, html, nothing}                                        from 'lit'
import {customElement, property}                                   from 'lit/decorators.js'
import {classMap}                                                  from 'lit/directives/class-map.js'
import {defaultDisplayConfig, DisplayConfig, displayConfigContext} from '../../contexts/context'
import {FhirElement}                                               from '../FhirElement'


/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends FhirElement {

  @consume({context: displayConfigContext, subscribe: true})
  protected displayConfig: DisplayConfig = defaultDisplayConfig

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

    .primary {
      color: var(--sl-color-primary-700);
    }

    .secondary {
      color: var(--sl-color-gray-700);
    }
  `

  @property({type: String})
  label: string = ''

  @property({type: String})
  fhirType: string = ''

  @property()
  variant: 'primary' | 'secondary' | 'none' = 'none'

  @property({type: Boolean})
  open: boolean = true

  protected render(): unknown {
    const classes = {primary: this.variant === 'primary', secondary: this.variant === 'secondary'}
    return html`
      ${this.label ?
        html`
          <div id="label">
            ${this.fhirType
              ? html`
                  <sl-tooltip content="${this.fhirType}"><label >${this.label}</label ></sl-tooltip >`
              : html`<label class=${classMap(classes)}>${this.label}</label >`}${this.label || this.fhirType
                                                                                 ? html`<span id="arrow">&#x21B4;</span >`
                                                                                 : nothing}
          </div >
        ` : nothing}

      <slot id="content"></slot>


    `
  }


}
