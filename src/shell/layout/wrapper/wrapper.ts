import {consume}                                    from '@lit/context'
import {html, LitElement, PropertyValues}           from 'lit'
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


      const label = this.generateLabel()

      const borderClasses = { 'validation-error-border': this.variant === 'validation-error' }

      return html`
        <div class='base ${classMap(borderClasses)}'>
          ${label}
          <slot class="${classMap({ content: !this.hide })}"></slot >
        </div >
      `
    }

    return html``
  }

  private generateLabel = () => {

    const classes = {
      primary: this.variant === 'primary',
      secondary: this.variant === 'secondary',
      'validation-error': this.variant === 'validation-error'
    }

    if (!this.hide && this.label && this.fhirType) {
      return html`
        <sl-tooltip content="${this.fhirType}" placement="left">
          <div id="label">
            <label class=${classMap(classes)}>${this.label}</label >
            <span id="arrow">&#x21B4;</span >
          </div >
        </sl-tooltip >
      `
    } else if (!this.hide && this.label) {
      return html`
        <div id="label">
          <label class=${classMap(classes)}>${this.label}</label >
          <span id="arrow">&#x21B4;</span >
        </div >
      `
    } else if (!this.hide && this.fhirType) {
      return html`
        <div id="label">
          <label class=${classMap(classes)}>${this.fhirType}</label >
          <span id="arrow">&#x21B4;</span >
        </div >
      `
    } else {
      return html``
    }
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (this.displayConfig) {
      this.open = this.displayConfig.open
      this.mode = this.displayConfig.mode
      // this.hide = !this.displayConfig.verbose
    }
  }

  private summaryMode() {
    return this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary
  }


}
