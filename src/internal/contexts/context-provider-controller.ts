import {ContextProvider}                     from '@lit/context'
import {ReactiveController, ReactiveElement} from 'lit'
import {BaseElement}                         from '../base/base-element'
import {FhirDataElementData}                 from '../base/fhir-data-element.data'

import {contextData, displayConfigContext} from './context'
import {FhirDataContextImpl}               from './FhirContextData'

//TODO: maybe shoudl be split into two separate controllers
export class ContextProviderController<T extends FhirDataElementData, B extends BaseElement<T>> implements ReactiveController {

  private host: B
  private displayCtx: ContextProvider<typeof displayConfigContext>
  private dataCtx: ContextProvider<typeof contextData>

  constructor(host: B) {

    this.host = host
    host.addController(this)

    const reactive = host as unknown as ReactiveElement
    this.displayCtx = new ContextProvider(reactive, { context: displayConfigContext })
    this.dataCtx = new ContextProvider(reactive, { context: contextData })
  }

  hostUpdated() {

    const data = this.host.data

    if (data && data != this.dataCtx.value?.data) {
      const context = new FhirDataContextImpl()
      context.data = data
      this.dataCtx.setValue(context)
      // console.log(this.type,'mode',this.mode, this.display.value)
    }

    const mode = this.host.mode
    const showerror = this.host.showerror
    const verbose = this.host.verbose
    const open = this.host.open

    if (mode && this.displayCtx.value?.mode !== mode) {
      this.displayCtx.setValue({ ...this.displayCtx.value, mode })
      // console.log(this.type,'mode',this.mode, this.display.value)
    }

    if (showerror && this.displayCtx.value?.showerror !== showerror) {
      this.displayCtx.setValue({ ...this.displayCtx.value, showerror })
      // console.log(this.type,'showerror',this.showerror, this.display.value)
    }

    if (verbose && this.displayCtx.value?.verbose !== verbose) {
      this.displayCtx.setValue({ ...this.displayCtx.value, verbose })
      // console.log(this.type,'verbose',this.verbose, this.display.value)
    }

    if (open && this.displayCtx.value?.open !== open) {
      this.displayCtx.setValue({ ...this.displayCtx.value, open })
      // console.log(this.type,'open', this.open, this.display.value)
    }
  }
}
