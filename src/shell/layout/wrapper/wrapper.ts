import {consume}                                    from '@lit/context'
import {html, LitElement, nothing, PropertyValues} from 'lit'
import {customElement, property}                    from 'lit/decorators.js'
import {classMap}                                   from 'lit/directives/class-map.js'
import {defaultDisplayConfig, displayConfigContext} from '../../../internal'
import {hostStyles}                                 from '../../../styles'
import {DisplayConfig, DisplayMode}                 from '../../../types'
import {toBaseElementModeEnum}                      from '../../../utilities'
import {componentStyles}                            from './wrapper-styles'


/**
 * Custom element for wrapping primitive content.
 * @element fhir-wrapper
 * @slot wrapper
 */
@customElement('fhir-wrapper')
export class Wrapper extends LitElement {

  static styles = [hostStyles, componentStyles]

  @property({ type: String })
  label: string = ''

  @property({ type: String })
  fhirType: string = ''

  @property()
  variant: 'primary' | 'secondary' | 'validation-error' | 'none' = 'none'

  @property({ type: Boolean, reflect: true })
  public hidelabel: boolean = false

  @property({ type: Boolean, reflect: true })
  public open: boolean = false

  @property({ type: DisplayMode, reflect: true, converter: toBaseElementModeEnum })
  declare mode: DisplayMode

  @property({ type: Boolean, reflect: true })
  public summary: boolean = false

  @property({ type: Boolean, reflect: true })
  public summaryonly: boolean = false

  @consume({ context: displayConfigContext, subscribe: true })
  protected displayConfig: DisplayConfig = defaultDisplayConfig

  protected render(): unknown {
    if (!this.summaryonly || (this.summary && this.summaryonly)) {

      const borderClasses = { 'validation-error-border': this.variant === 'validation-error' }

      return html`
          <div class='base ${classMap(borderClasses)}'>
              ${this.hidelabel ? nothing : this.generateLabel()}
              <slot class="${classMap({ content: !this.hidelabel })}"></slot >
          </div >
      `
    }

    return html``
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (this.displayConfig) {
      this.open = this.displayConfig.open
      this.mode = this.displayConfig.mode
    }
  }

  private generateLabel = () => {

    const classes = {
      primary: this.variant === 'primary',
      secondary: this.variant === 'secondary',
      'validation-error': this.variant === 'validation-error'
    }

    if (this.label && this.fhirType) {
      return html`
          <sl-tooltip content="${this.fhirType}" placement="left">
              <div id="label">
                  <label class=${classMap(classes)}>${this.label}</label >
                  <span id="arrow">&#x21B4;</span >
              </div >
          </sl-tooltip >
      `
    } else if (this.label) {
      return html`
          <div id="label">
              <label class=${classMap(classes)}>${this.label}</label >
              <span id="arrow">&#x21B4;</span >
          </div >
      `
    } else if (this.fhirType) {
      return html`
          <div id="label">
              <label class=${classMap(classes)}>${this.fhirType}</label >
              <span id="arrow">&#x21B4;</span >
          </div >
      `
    }
  }

}
