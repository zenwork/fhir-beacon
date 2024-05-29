import {consume}                                                   from '@lit/context'
import {html, TemplateResult}                                      from 'lit'
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

  protected render(): unknown {
    const classes = {primary: this.variant === 'primary', secondary: this.variant === 'secondary'}

    let label: TemplateResult
    if (this.label && this.fhirType) {
      label = html`
        <sl-tooltip content="${this.fhirType}" placement="left">
          <div id="label">
            <label class=${classMap(classes)}>${this.label}</label >
            <span id="arrow">&#x21B4;</span >
          </div >
        </sl-tooltip >
      `
    } else if (this.label) {
      label = html`
        <div id="label">
          <label class=${classMap(classes)}>${this.label}</label >
          <span id="arrow">&#x21B4;</span >
        </div >
      `
    } else if (this.fhirType) {
      label = html`
        <div id="label">
          <label class=${classMap(classes)}>${this.fhirType}</label >
          <span id="arrow">&#x21B4;</span >
        </div >
      `
    } else {
      label = html``
    }
    return html`
      ${label}
      <slot id="content"></slot>
    `
  }


}
