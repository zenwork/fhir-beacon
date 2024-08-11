import {consume}                                    from '@lit/context'
import {html, LitElement, nothing, PropertyValues}  from 'lit'
import {customElement, property}                    from 'lit/decorators.js'
import {classMap}                                   from 'lit/directives/class-map.js'
import {defaultDisplayConfig, displayConfigContext} from '../../../internal/contexts'
import {hostStyles}                                 from '../../../styles'
import {DisplayConfig, DisplayMode}                 from '../../../types'
import {toBaseElementModeEnum}                      from '../../../utilities'
import {componentStyles}                            from './structure-wrapper.styles'

/**
 * Custom element for wrapping primitive content.
 * @element fhir-structure-wrapper
 * @slot wrapper
 */
@customElement('fhir-structure-wrapper')
export class StructureWrapper extends LitElement {

  @consume({context: displayConfigContext, subscribe: true})
  protected displayConfig: DisplayConfig = defaultDisplayConfig

  static styles = [hostStyles, componentStyles]

  @property()
  variant: 'primary' | 'secondary' | 'validation-error' | undefined

  @property()
  label: string = ''

  @property()
  resourceId: string = ''

  @property()
  fhirType: string = ''

  @property()
  public hide: boolean = false

  @property({ type: Boolean, reflect: true })
  public open: boolean = false

  @property({ type: Boolean, reflect: true })
  public forceclose: boolean = false

  @property({ type: Boolean, reflect: true })
  public summary: boolean = false

  @property({ type: Boolean, reflect: true, converter: toBaseElementModeEnum })
  private mode: DisplayMode = DisplayMode.structure



  protected render(): unknown {
      let open = false
      if (this.displayConfig.open) open = true
      if (this.forceclose) open = false
    const borderClasses = { 'validation-error-border': this.variant === 'validation-error' }
    const classes = {
      primary: this.variant === 'primary',
      secondary: this.variant === 'secondary',
      'validation-error': this.variant === 'validation-error'
    }

      return this.hide
             ? html`
            <slot part="value"></slot > `
             : html`
            <div class="${classMap(borderClasses)}">
            <sl-details part="base" ?open=${open}>
              <div slot="summary" >
                <label class=${classMap(classes)}><b >${this.label}</b > ${this.resourceId ? html`<i >(id: ${this.resourceId})</i >` : nothing}</label >
                ${this.fhirType ? html`
                  <sl-badge pill>${this.fhirType}</sl-badge >` : nothing}
                ${this.summary && this.displayConfig?.mode === DisplayMode.structure ? html`
                  <sl-badge id="summary" pill>&sum;</sl-badge >` : nothing}
                ${this.label || this.fhirType ? html`<span id="arrow">&#x21B4;</span >` : nothing}
              </div >
              <ul >
                <slot part="value"></slot >
              </ul >
            </sl-details >
            </div>
        `
  }


  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    if (this.displayConfig) {
      this.open = this.displayConfig.open
      this.mode = this.displayConfig.mode
    }
  }

  private summaryMode() {
    return this.mode === DisplayMode.display_summary || this.mode === DisplayMode.structure_summary
  }

}
