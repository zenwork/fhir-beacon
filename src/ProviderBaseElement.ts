import {ContextProvider, ContextRoot} from '@lit/context'
import {PropertyValues}               from 'lit'
import {BaseData}                     from './BaseData'
import {BaseElement}                  from './BaseElement'
import {displayConfigContext}         from './resources/context'

export class ProviderBaseElement<T extends BaseData> extends BaseElement<T> {

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
}
