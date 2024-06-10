import {consume}                       from '@lit/context'
import {html, nothing, PropertyValues} from 'lit'
import {customElement, property}       from 'lit/decorators.js'
import {BaseElementMode}               from '../../../internal/base/base-element.data'
import {displayConfigContext}          from '../../../internal/contexts/context'
import {DisplayConfig}                 from '../../../internal/contexts/context.data'
import {defaultDisplayConfig}          from '../../../internal/contexts/context.defaults'
import {hostStyles}                    from '../../../styles/hostStyles'
import {toBaseElementModeEnum}         from '../../../utilities/toBaseElementModeEnum'
import {ShoelaceStyledElement}         from '../../shoelace-styled-element'
import {componentStyles}               from './structure-wrapper.styles'

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

  @property({ type: Boolean, reflect: true })
  public open: boolean = false

  @property({ type: Boolean, reflect: true })
  public forceclose: boolean = false

  @property({ type: Boolean, reflect: true })
  public summary: boolean = false

  @property({ type: Boolean, reflect: true, converter: toBaseElementModeEnum })
  private mode: BaseElementMode = BaseElementMode.structure



  protected render(): unknown {
    // console.log(this.label,this.fhirType,this.summary,this.displayConfig.mode)
    if (!this.summaryMode() || (this.summary && this.summaryMode())) {
      let open = false
      if (this.displayConfig.open) open = true
      if (this.forceclose) open = false

      return this.hide
             ? html`
            <slot part="value"></slot > `
             : html`
            <sl-details part="base" ?open=${open}>
              <div slot="summary">
                <label ><b >${this.label}</b > ${this.resourceId ? html`<i >(id: ${this.resourceId})</i >` : nothing}</label >
                ${this.fhirType ? html`
                  <sl-badge pill>${this.fhirType}</sl-badge >` : nothing}
                ${this.summary && this.displayConfig?.mode === BaseElementMode.structure ? html`
                  <sl-badge id="summary" pill>&sum;</sl-badge >` : nothing}
                ${this.label || this.fhirType ? html`<span id="arrow">&#x21B4;</span >` : nothing}
              </div >
              <ul >
                <slot part="value"></slot >
              </ul >
            </sl-details >
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
    return this.mode === BaseElementMode.display_summary || this.mode === BaseElementMode.structure_summary
  }

}
