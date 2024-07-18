import {consume}                                                                from '@lit/context'
import {html, PropertyValues, TemplateResult}                                   from 'lit'
import {customElement, property}                                                from 'lit/decorators.js'
import {classMap}                                                               from 'lit/directives/class-map.js'
import {defaultDisplayConfig, DisplayConfig, displayConfigContext, DisplayMode} from '../../../internal'
import {hostStyles}                                                             from '../../../styles'
import {toBaseElementModeEnum}                                                  from '../../../utilities'
import {ShoelaceStyledElement}                                                  from '../../shoelace-styled-element'
import {componentStyles}                                                        from './wrapper-styles'


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
  variant: 'primary' | 'secondary' | 'validation-error' | 'none' = 'none'

  @property({type: Boolean, reflect: true})
  hide: boolean = false

  @property({ type: Boolean, reflect: true })
  declare open: boolean

  @property({ type: DisplayMode, reflect: true, converter: toBaseElementModeEnum })
  declare mode: DisplayMode

  @property({ type: Boolean, reflect: true })
  declare summary: boolean

  protected render(): unknown {
    if (!this.summaryMode() || (this.summary && this.summaryMode())) {
      const classes = { primary: this.variant === 'primary', secondary: this.variant === 'secondary', 'validation-error': this.variant === 'validation-error' }
      const borderClasses = { 'validation-error-border': this.variant === 'validation-error' }

      let label: TemplateResult
      if (!this.hide && this.label && this.fhirType) {
        label = html`
          <sl-tooltip content="${this.fhirType}" placement="left">
            <div id="label">
              <label class=${classMap(classes)}>${this.label}</label >
              <span id="arrow">&#x21B4;</span >
            </div >
          </sl-tooltip >
        `
      } else if (!this.hide && this.label) {
        label = html`
          <div id="label">
            <label class=${classMap(classes)}>${this.label}</label >
            <span id="arrow">&#x21B4;</span >
          </div >
        `
      } else if (!this.hide && this.fhirType) {
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
        <div class='base ${classMap(borderClasses)}'>
          ${label}
          <slot class="${classMap({ content: !this.hide })}"></slot >
        </div >
      `
    }

    return html``
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)
    if (this.displayConfig) {
      this.open = this.displayConfig.open
      this.mode = this.displayConfig.mode
    }
  }

  private summaryMode() {
    return this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary
  }


}
