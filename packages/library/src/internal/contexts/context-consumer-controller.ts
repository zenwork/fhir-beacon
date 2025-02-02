import {ContextConsumer, ContextRoot}        from '@lit/context'
import {ReactiveController, ReactiveElement} from 'lit'
import {DisplayConfig, DisplayMode}          from '../../types'
import {FhirElementData}                     from '../base'

import {FhirDataElement}                   from '../base/data/fhir-data-element'
import {FhirPresentableElement}            from '../base/presentable/fhir-presentable-element'
import {dataContext, displayConfigContext} from './context'


import {FhirDataContext, FhirDataContextImpl} from './FhirContextData'

//TODO: adding this context root to the document.body is a bit of a hack and may or may not work when there are
// multiple shells in one document.
(function init() {
  // console.debug('adding a context root to the body')
  new ContextRoot().attach(document.body)
})()

/**
 * The DataContextConsumerController class is a controller that allows a custom element to consume data from a data
 * context.
 *
 * @typeparam {T extends FhirDataElementData} - The type of data to consume from the data context.
 * @implements {ReactiveController}
 */
export class DataContextConsumerController<T extends FhirElementData> implements ReactiveController {


  constructor(host: FhirDataElement<T> & ReactiveElement) {
    host.addController(this)

    host.dataContext = new FhirDataContextImpl()
    host.dataContext.data = {} as FhirElementData

    new ContextConsumer(host,
                        {
                          context: dataContext,
                          subscribe: true,
                          callback: (dataCtx: FhirDataContext) => {
                            if (dataCtx && host.dataContext.data !== dataCtx.data) {
                              host.dataContext = dataCtx
                            }
                          }
                        })

  }

  // biome-ignore lint/suspicious/noEmptyBlockStatements: unused
  hostUpdated() {}

}

/**
 * The DisplayContextConsumerController class is responsible for handling the display configuration context
 * for a given host element. It subscribes to changes in the displayConfigContext and updates the host element
 * accordingly.
 *
 * This class implements the ReactiveController interface and can be added to a host element using the addController
 * method.
 *
 * @template T - The type of FhirDataElementData that the host element extends
 *
 * @param {FhirPresentableElement<T> & ReactiveElement} host - The host element that will be updated based on the
 *   display configuration context
 */
export class DisplayContextConsumerController<T extends FhirElementData> implements ReactiveController {

  constructor(host: FhirPresentableElement<T> & ReactiveElement) {
    host.addController(this)

    new ContextConsumer(host,
                        {
                          context: displayConfigContext,
                          subscribe: true,
                          callback: (config: DisplayConfig) => {
                            if (config) {
                              // never propagate override because there is an external template providing the rendering
                              // TODO: this is not the best way to solve this
                              if (config.mode !== DisplayMode.override) {
                                if (config.mode !== undefined) host.mode = config.mode
                              }

                              if (config.showerror !== undefined) host.showerror = config.showerror
                              if (config.open !== undefined) host.open = config.open
                              if (config.verbose !== undefined) host.verbose = config.verbose
                              if (config.summaryonly !== undefined) host.summaryonly = config.summaryonly
                              if (config.input !== undefined) host.input = config.input

                              host.requestUpdate()
                            }

                          }
                        })
  }

  // biome-ignore lint/suspicious/noEmptyBlockStatements: unused
  public hostConnected(): void {}

}
