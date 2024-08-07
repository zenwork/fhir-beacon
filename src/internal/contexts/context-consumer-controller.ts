import {ContextConsumer, ContextRoot}        from '@lit/context'
import {ReactiveController, ReactiveElement} from 'lit'
import {DisplayConfig, DisplayMode}          from '../../types'
import {FhirDataElement}                     from '../base/fhir-data-element'
import {FhirDataElementData}                 from '../base/fhir-data-element.data'
import {FhirPresentableElement}              from '../base/fhir-presentable-element'
import {contextData, displayConfigContext}   from './context'

import {FhirDataContext, FhirDataContextImpl} from './FhirContextData'

//TODO: adding this context root to the document.body is a bit of a hack and may or may not work when there are multiple shells in one document.
(function init() {
  // console.debug('adding a context root to the body')
  new ContextRoot().attach(document.body)
})()

/**
 * The DataContextConsumerController class is a controller that allows a custom element to consume data from a data context.
 *
 * @typeparam {T extends FhirDataElementData} - The type of data to consume from the data context.
 * @implements {ReactiveController}
 */
export class DataContextConsumerController<T extends FhirDataElementData> implements ReactiveController {

  private host: FhirDataElement<T> & ReactiveElement

  constructor(host: FhirDataElement<T> & ReactiveElement) {
    this.host = host
    host.addController(this)

    host.dataContext = new FhirDataContextImpl()
    host.dataContext.data = {}

    new ContextConsumer(host,
      {
        context: contextData,
        subscribe: true,
        callback: (data: FhirDataContext) => {
          host.dataContext = data
        }
      }
    )

  }

  hostUpdated() {}

}

/**
 * The DisplayContextConsumerController class is responsible for handling the display configuration context
 * for a given host element. It subscribes to changes in the displayConfigContext and updates the host element
 * accordingly.
 *
 * This class implements the ReactiveController interface and can be added to a host element using the addController method.
 *
 * @template T - The type of FhirDataElementData that the host element extends
 *
 * @param {FhirPresentableElement<T> & ReactiveElement} host - The host element that will be updated based on the display configuration context
 */
export class DisplayContextConsumerController<T extends FhirDataElementData> implements ReactiveController {
  private host: FhirPresentableElement<T> & ReactiveElement
  private isOverridden: boolean = false

  constructor(host: FhirPresentableElement<T> & ReactiveElement) {
    this.host = host
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
              host.mode = config.mode ?? host.mode
            }

            host.showerror = config.showerror ?? host.showerror
            host.open = config.open ?? host.open
            host.verbose = config.verbose ?? host.verbose
          }

        }
      }
    )
  }

  public hostConnected(): void {
  }

}
