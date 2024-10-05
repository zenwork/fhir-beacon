import {ContextProvider}                     from '@lit/context'
import {ReactiveController, ReactiveElement} from 'lit'
import {FhirElementData} from '../base'
import {BaseElement}                         from '../BaseElement'

import {containedResourcesContext, dataContext, displayConfigContext} from './context'
import {FhirDataContextImpl}                                          from './FhirContextData'

//TODO: maybe shoudl be split into two separate controllers
export class ContextProviderController<T extends FhirElementData, B extends BaseElement<T>> implements ReactiveController {

  private host: B
  private displayCtx: ContextProvider<typeof displayConfigContext>

  private dataCtx: ContextProvider<typeof dataContext>

  private containedCtx: ContextProvider<typeof containedResourcesContext>

  constructor(host: B) {

    this.host = host
    host.addController(this)

    const reactive = host as unknown as ReactiveElement
    this.displayCtx = new ContextProvider(reactive, { context: displayConfigContext })
    this.dataCtx = new ContextProvider(reactive, { context: dataContext })
    this.containedCtx = new ContextProvider(reactive, { context: containedResourcesContext })
  }

  hostUpdated() {

    const data = this.host.data

    if (data && data != this.dataCtx.value?.data) {
      const context = new FhirDataContextImpl()
      context.data = data
      this.dataCtx.setValue(context)
      if ((data as any).contained) {
        this.containedCtx.setValue((data as any).contained)
      }
    }

    const mode = this.host.mode
    const showerror = this.host.showerror
    const verbose = this.host.verbose
    const open = this.host.open
    const summaryonly = this.host.summaryonly

    this.displayCtx.setValue({ ...this.displayCtx.value, mode, showerror, verbose, open, summaryonly })


  }
}
