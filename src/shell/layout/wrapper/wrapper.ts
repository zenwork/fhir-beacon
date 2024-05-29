import {consume}                                                   from '@lit/context'
import {html, nothing}                                             from 'lit'
import {customElement, property}                                   from 'lit/decorators.js'
import {classMap}                                                  from 'lit/directives/class-map.js'
import {defaultDisplayConfig, DisplayConfig, displayConfigContext} from '../../../internal/contexts/context'
import {hostStyles}                                                from '../../../styles/hostStyles'
import {ShoelaceStyledElement}                                     from '../../shoelace-styled-element'
import {componentStyles}                                           from './wrapper-styles'


/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends ShoelaceStyledElement {

  @consume({context: displayConfigContext, subscribe: true})
  protected displayConfig: DisplayConfig = defaultDisplayConfig

  static styles = [hostStyles, componentStyles]

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
