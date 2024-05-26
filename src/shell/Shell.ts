import {ContextProvider, ContextRoot} from '@lit/context'
import {LitElement, PropertyValues}   from 'lit'
import {customElement, property}      from 'lit/decorators.js'
import {converter}                    from '../BaseElement'
import {BaseElementMode}              from '../BaseElementMode'
import {displayConfigContext}         from '../resources/context'

@customElement('fhir-shell')
export class Shell extends LitElement {

  @property({type: BaseElementMode, converter})
  public mode: BaseElementMode = BaseElementMode.display
  @property({type: Boolean, reflect: true})
  declare open: boolean
  @property({type: Boolean, reflect: true})
  declare verbose: boolean
  @property({type: Boolean, reflect: true})
  declare showerror: boolean
  protected display = new ContextProvider(this, {context: displayConfigContext})
  private contextRoot = new ContextRoot()

  public connectedCallback() {
    super.connectedCallback()
    this.contextRoot.attach(this)
  }


  public disconnectedCallback() {
    super.disconnectedCallback()
    this.contextRoot.detach(this)
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties)

    if (_changedProperties.has('mode')) {
      this.display.setValue({...this.display.value, mode: this.mode})
      // console.log('mode',this.mode, this.display.value)
    }
    if (_changedProperties.has('showerror')) {
      this.display.setValue({...this.display.value, showerror: this.showerror})
      // console.log('showerror',this.showerror, this.display.value)
    }
    if (_changedProperties.has('verbose')) {
      this.display.setValue({...this.display.value, verbose: this.verbose})
      // console.log('verbose',this.verbose, this.display.value)
    }
    if (_changedProperties.has('open')) {
      this.display.setValue({...this.display.value, open: this.open})
      // console.log('open', this.open, this.display.value)
    }
  }


  protected createRenderRoot() {
    return this
  }
}
