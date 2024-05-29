import {consume}                                                   from '@lit/context'
import {html, nothing}                                             from 'lit'
import {customElement, property}                                   from 'lit/decorators.js'
import {defaultDisplayConfig, DisplayConfig, displayConfigContext} from '../../../internal/contexts/context'
import {hostStyles}                                                from '../../../styles/hostStyles'
import {ShoelaceStyledElement}                                     from '../../shoelace-styled-element'
import {styles}                                                    from './structure-wrapper.styles'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-structure-wrapper
 * @slot wrapper
 */
@customElement('fhir-structure-wrapper')
export class StructureWrapper extends ShoelaceStyledElement {

  @consume({context: displayConfigContext, subscribe: true})
  protected displayConfig: DisplayConfig = defaultDisplayConfig

  static styles = [hostStyles, styles]

  @property()
  label: string = ''

  @property()
  fhirType: string = ''

  @property({type: Boolean})
  public open: boolean = false

  protected render(): unknown {
    return html`
      <sl-details part="base" ?open=${this.displayConfig.open}>
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
