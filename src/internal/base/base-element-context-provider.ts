import {ContextProvider, ContextRoot}      from '@lit/context'
import {PropertyValues}                    from 'lit'
import {contextData, displayConfigContext} from '../contexts/context'
import {FhirDataContextImpl}               from '../contexts/FhirContextData'
import {BaseElement}                       from './base-element'
import {BaseElementData}                   from './base-element.data'

export abstract class BaseElementContextProvider<T extends BaseElementData> extends BaseElement<T> {

  protected display = new ContextProvider(this, {context: displayConfigContext})
  private contextRoot = new ContextRoot()

  protected contextDataReducer = new ContextProvider(this, { context: contextData })


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

    if (_changedProperties.has('data')) {
      const context = new FhirDataContextImpl()
      context.data = this.data
      this.contextDataReducer.setValue(context)
      // console.log(this.type,'mode',this.mode, this.display.value)
    }
    if (_changedProperties.has('mode')) {
      this.display.setValue({...this.display.value, mode: this.mode})
      // console.log(this.type,'mode',this.mode, this.display.value)
    }
    if (_changedProperties.has('showerror')) {
      this.display.setValue({...this.display.value, showerror: this.showerror})
      // console.log(this.type,'showerror',this.showerror, this.display.value)
    }
    if (_changedProperties.has('verbose')) {
      this.display.setValue({...this.display.value, verbose: this.verbose})
      // console.log(this.type,'verbose',this.verbose, this.display.value)
    }
    if (_changedProperties.has('open')) {
      this.display.setValue({...this.display.value, open: this.open})
      // console.log(this.type,'open', this.open, this.display.value)
    }
  }
}
