import {consume}                 from '@lit/context'
import {html, nothing}           from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {displayConfigContext}    from '../../../internal/contexts/context'
import {DisplayConfig}           from '../../../internal/contexts/context.data'
import {defaultDisplayConfig}    from '../../../internal/contexts/context.defaults'
import {hostStyles}              from '../../../styles/hostStyles'
import {ShoelaceStyledElement}   from '../../shoelace-styled-element'
import {componentStyles}         from './structure-wrapper.styles'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-structure-wrapper
 * @slot wrapper
 */
@customElement('fhir-structure-wrapper')
export class StructureWrapper extends ShoelaceStyledElement {

  @consume({context: displayConfigContext, subscribe: true})
  protected displayConfig: DisplayConfig = defaultDisplayConfig

  static styles = [hostStyles, componentStyles]

  @property()
  label: string = ''

  @property()
  resourceId: string = ''

  @property()
  fhirType: string = ''

  @property()
  public hide: boolean = false

  @property({type: Boolean})
  public open: boolean = false

  protected render(): unknown {
    return this.hide
           ? html`
          <slot part="value"></slot >
      `
           : html`
          <sl-details part="base" ?open=${this.displayConfig.open}>
            <div slot="summary">
              <label ><b >${this.label}</b > ${this.resourceId ? html`<i >(id: ${this.resourceId})</i >` : nothing}</label >
              ${this.fhirType ? html`
                <sl-badge pill>${this.fhirType}</sl-badge >` : html``}
              ${this.label || this.fhirType ? html`<span id="arrow">&#x21B4;</span >` : nothing}
            </div >
            <ul >
              <slot part="value"></slot >
            </ul >
          </sl-details >
      `
  }

}
